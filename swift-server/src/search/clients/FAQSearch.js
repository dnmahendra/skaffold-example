import concat from 'lodash/concat'
import client, {
  extractHits,
  extractSearchMeta,
  entityTypes,
  generateIndexName,
} from 'libs/elasticSearchUtils'
import Search from './Search'
import { parseBool } from '../utils/validators'

class FAQSearch extends Search {
  constructor () {
    super()
    this.defaultParams = {
      page: 1,
      per_page: 20,
      sort_field: 'order_box_id',
      sort_order: 'asc',
    }
    this.addParams(this.defaultParams)
    this.paramTypes = {
      sort_field: {},
      sort_order: {},
      per_page: { transform: parseInt },
      page: { transform: parseInt },
      vertical: {},
      useDefaultValues: { transform: parseBool },
      id: { transform: parseInt },
      ids: {},
      category: {},
      type: {},
      faqUrl: {},
      slugs: {},
      variant: {},
    }
  }
  query () {
    this.termFilterStaticParam('status', 'publish')
    this.termFilter('id', 'id', this.params.id)
    this.termsFilter('vertical', 'vertical', concat([], this.params.vertical))
    this.termFilter('type', 'faq_type', this.params.type)
    this.termsFilter('slugs', 'slug', this.params.slugs)
    this.termsFilter('category', 'category', concat([], this.params.category))
    this.termsFilter('userJourneyStage', 'userJourneyStage', concat([], this.params.userJourneyStage))
    this.termsFilter('faqUrl', 'faq_url', concat([], this.params.faqUrl))
    this.termsFilter('variant', 'faq_variant', concat([], this.params.variant))
    this.termsFilter('ids', 'id', concat([], this.params.ids))

    return {
      bool: {
        must: this.filters,
      },
    }
  }

  sort () {
    this.addSort(this.params.sort_field, this.params.sort_order)
    return this.sorts
  }

  async search () {
    const searchResult = await client.search({
      index: generateIndexName(entityTypes.FAQ).aliasName,
      body: {
        from: (this.params.page - 1) * this.params.per_page,
        size: this.params.per_page,
        query: this.query(),
        sort: this.sort(),
      },
    })

    return {
      faqs: extractHits(searchResult),
      meta: extractSearchMeta(searchResult, this.params),
      params: this.params,
    }
  }
}

export default FAQSearch
