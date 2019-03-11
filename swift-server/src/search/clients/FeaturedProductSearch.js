import moment from 'moment'
import changeCase from 'change-case'
import { merge } from 'lodash'

import client, {
  entityTypes,
  generateIndexName,
  extractHits,
} from 'libs/elasticSearchUtils'
import shareOfVoiceProductSelector from 'search/utils/shareOfVoiceProductSelector'
import CarLoanSearch from './CarLoanSearch'
import ShareOfVoiceSearch from './ShareOfVoiceSearch'
import Search from './Search'

class FeaturedProductSearch extends Search {
  getSearchClient (vertical) {
    switch (vertical) {
      case 'car-loans':
        return new CarLoanSearch()
      default:
        return null
    }
  }
  query () {
    this.termFilterStaticParam('vertical', this.params.vertical)
    this.termFilterStaticParam('monetized', true)

    if (this.params.pagePath) {
      this.filters.push({
        bool: {
          should: [
            {
              term: {
                pages: this.params.pagePath,
              },
            },
            {
              bool: {
                must_not: {
                  exists: {
                    field: 'pages',
                  },
                },
              },
            },
          ],
        },
      })
      this.addWeightBoost('pages', this.params.pagePath, 10)
    }

    // only get products below order 1
    this.filters.push({
      range: {
        sortOrder: {
          lte: 1,
        },
      },
    })

    return {
      function_score: {
        functions: this.functionList,
        query: {
          constant_score: {
            query: {
              bool: {
                filter: this.filters,
              },
            },
          },
        },
      },
    }
  }

  sort () {
    this.addSortScore('desc')
    this.addSort('sortOrder', 'asc')

    return this.sorts
  }

  async search () {
    const body = {
      size: 100,
      query: this.query(),
      sort: this.sort(),
    }
    const searchResult = await client.search({
      index: generateIndexName(entityTypes.FEATUREDPRODUCT).aliasName,
      type: entityTypes.FEATUREDPRODUCT,
      body,
    })

    const hits = extractHits(searchResult)

    // transform data into collection of objects keyed by product order
    const productsPerOrder = hits.reduce((tally, item) => {
      tally[item.sortOrder] = tally[item.sortOrder] || { count: 0, products: [], shareOfVoiceSum: 0 }
      const shareOfVoiceSum = (parseInt(item.shareOfVoiceValue || 0) + parseInt(tally[item.sortOrder].shareOfVoiceSum))
      if (shareOfVoiceSum <= 100) {
        tally[item.sortOrder] = {
          count: tally[item.sortOrder].count + 1,
          products: tally[item.sortOrder].products.concat(
            {
              uuid: item.uuid,
              order: item.sortOrder,
              title: item.title,
              description: item.description,
              dateStart: item.dateStart,
              shareOfVoiceValue: item.shareOfVoiceValue,
              pages: item.pages || [],
            }
          ),
          shareOfVoiceSum,
        }
      }

      return tally
    }, {})

    let featuredProducts = []
    for (const order in productsPerOrder) {
      featuredProducts = featuredProducts.concat(productsPerOrder[order].products)
    }

    const reduceDates = featuredProducts.reduce((prev, curr) => {
      if (prev[curr.order]) {
        if (moment(prev[curr.order]) < moment(curr.dateStart)) {
          prev[curr.order] = curr.dateStart
        }
      } else {
        prev[curr.order] = curr.dateStart
      }
      return prev
    }, {})

    const paramArray = featuredProducts.map((product) => {
      let pageUrl
      if (product.pages.length > 0) {
        pageUrl = product.pages
      }
      const paramObj = {
        uuid: product.uuid,
        date: moment(reduceDates[product.order]).format('YYYY-MM-DD HH:mm:ss'),
      }
      if (typeof pageUrl !== 'undefined') {
        paramObj.pageUrl = pageUrl
      }
      return paramObj
    })

    const shareOfVoiceClient = new ShareOfVoiceSearch()
    shareOfVoiceClient.addParams({
      paramArray,
      vertical: changeCase.noCase(this.vertical),
      featured: true,
    })

    const stats = await shareOfVoiceClient.search()
    for (const order in productsPerOrder) {
      productsPerOrder[order].products = productsPerOrder[order].products.map((item) => {
        const productStat = stats.find((stat) => stat.uuid === item.uuid)
        merge(item, productStat)
        return item
      })
    }

    const featuredProductsSelected = shareOfVoiceProductSelector(productsPerOrder)
    const selectedUuids = featuredProductsSelected.map((fp) => fp.uuid)

    const productSearchClient = this.getSearchClient(this.params.vertical)

    productSearchClient.addParams({ uuid: selectedUuids, showAll: false, per_page: 500 })
    const products = await productSearchClient.search()

    const productsByUuid = {}
    products.hits.forEach(product => {
      productsByUuid[product.uuid] = product
    })

    let result = null
    for (let i = 0; i < featuredProducts.length; i += 1) {
      const featuredProduct = featuredProducts[i]
      if (productsByUuid[featuredProduct.uuid]) {
        result = Object.assign({}, productsByUuid[featuredProduct.uuid], featuredProduct)
        break
      }
    }

    return result
  }
}

export default FeaturedProductSearch
