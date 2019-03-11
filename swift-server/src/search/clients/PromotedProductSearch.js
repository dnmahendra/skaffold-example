import changeCase from 'change-case'
import moment from 'moment'
import merge from 'lodash/merge'

import client, {
  entityTypes,
  extractHits,
  generateIndexName,
} from 'libs/elasticSearchUtils'
import shareOfVoiceProductSelector from 'search/utils/shareOfVoiceProductSelector'
import Search from './Search'
import ShareOfVoiceSearch from './ShareOfVoiceSearch'

class PromotedProductSearch extends Search {
  query () {
    this.termFilter('vertical', 'vertical', this.params.vertical)
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
    } else {
      this.termFilter('pagePath', 'pages', this.params.pagePath)
    }

    // only get products below order 4
    const order = this.params.order ? this.params.order : 4
    this.filters.push({
      range: {
        order: {
          lte: order,
        },
      },
    })

    return {
      function_score: {
        functions: this.functionList,
        query: {
          constant_score: {
            filter: {
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
    this.addSort('order', 'asc')

    return this.sorts
  }

  async search () {
    const body = {
      query: this.query(),
      sort: this.sort(),
      size: 50,
    }
    const searchResult = await client.search({
      index: generateIndexName(entityTypes.PROMOTEDPRODUCT).aliasName,
      type: entityTypes.PROMOTEDPRODUCT,
      body,
    })

    const hits = extractHits(searchResult)

    // transform data into collection of objects keyed by product order
    const productsPerOrder = hits.reduce((tally, item) => {
      tally[item.order] = tally[item.order] || { count: 0, products: [], shareOfVoiceSum: 0 }
      const shareOfVoiceSum = (parseInt(item.shareOfVoiceValue || 0) + parseInt(tally[item.order].shareOfVoiceSum))
      if (shareOfVoiceSum <= 100) {
        tally[item.order] = {
          count: tally[item.order].count + 1,
          products: tally[item.order].products.concat(item),
          shareOfVoiceSum,
        }
      }

      return tally
    }, {})

    let products = []
    for (const order in productsPerOrder) {
      products = products.concat(productsPerOrder[order].products)
    }

    const reduceDates = products.reduce((prev, curr) => {
      if (prev[curr.order]) {
        if (moment(prev[curr.order]) < moment(curr.dateStart)) {
          prev[curr.order] = curr.dateStart
        }
      } else {
        prev[curr.order] = curr.dateStart
      }
      return prev
    }, {})

    const paramArray = products.map((product) => {
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
      vertical: changeCase.noCase(this.params.vertical),
      promoted: true,
    })

    const stats = await shareOfVoiceClient.search()

    for (const order in productsPerOrder) {
      productsPerOrder[order].products = productsPerOrder[order].products.map((item) => {
        const productStat = stats.find((stat) => stat.uuid === item.uuid)
        merge(item, productStat)
        return item
      })
    }

    return shareOfVoiceProductSelector(productsPerOrder)
  }
}

export default PromotedProductSearch
