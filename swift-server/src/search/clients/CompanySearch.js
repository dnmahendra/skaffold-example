import client, {
  entityTypes,
  extractSearchMeta,
  extractHits,
  generateIndexName,
} from 'libs/elasticSearchUtils'

import { getVertical } from 'libs/verticals'
import Search from './Search'

const { aliasName } = generateIndexName(entityTypes.COMPANY)

class CompanySearch extends Search {
  constructor () {
    super()
    this.entityType = entityTypes.COMPANY
    this.vertical = ''
    this.defaultParams = {
      page: 1,
      per_page: 24,
      sort_field: 'default',
      sort_order: 'asc',
    }
  }

  query () {
    if (this.params.vertical) {
      this.vertical = getVertical(this.params.vertical).verticalKey
    }
    this.termFilter('uuid', 'uuid', this.params.uuid)
    this.termFilter('code', 'code', this.params.code)
    this.termFilter('popular', 'popular', this.params.popular)
    this.termsFilter('company_name', 'name', this.params.company_name)
    this.nestedExistsFilter('vertical', 'verticalData', this.vertical)

    return {
      bool: {
        filter: this.filters,
      },
    }
  }

  sort () {
    if (this.params.sort_field === 'popularityScore') {
      this.sorts.push({
        [`verticalData.${this.vertical}.popularityScore`]: {
          mode: 'max',
          order: this.params.sort_order,
          nested_path: `verticalData.${this.vertical}`,
          nested_filter: {
            range: {
              [`verticalData.${this.vertical}.popularityScore`]: {
                gt: 0,
              },
            },
          },
        },
      })
    } else {
      this.addSort(this.params.sort_field, this.params.sort_order)
    }

    return this.sorts
  }

  async search () {
    const body = {
      size: this.params.per_page || 24,
      query: this.query(),
      sort: this.sort(),
    }
    const result = await client.search({
      index: aliasName,
      type: this.entityType,
      body,
    })
    const meta = extractSearchMeta(result, this.params)
    const hits = extractHits(result)
    return {
      hits,
      meta,
    }
  }
}

module.exports = CompanySearch
