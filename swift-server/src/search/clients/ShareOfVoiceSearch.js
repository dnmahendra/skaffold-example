import { differenceBy } from 'lodash'

import client from 'libs/elasticSearchUtils'
import Search from './Search'

class ShareOfVoiceSearch extends Search {
  query () {
    this.termFilter('vertical', 'vertical', this.params.vertical)
    this.termFilter('promoted', 'promoted', this.params.promoted)
    this.termFilter('featured', 'featured', this.params.featured)

    if (this.params.paramArray) {
      const compoundFilters = this.params.paramArray.map((value) => {
        const filters = [
          {
            term: {
              product_uuid: value.uuid,
            },
          },
          {
            range: {
              created_at: {
                gte: value.date,
              },
            },
          },
        ]

        if (typeof value.pageUrl !== 'undefined') {
          filters.push({
            terms: {
              page_url: value.pageUrl,
            },
          })
        }
        return {
          bool: {
            filter: filters,
          },
        }
      })

      this.filters.push({
        bool: {
          should: compoundFilters,
        },
      })
    }

    return {
      bool: {
        must: {
          match_all: {},
        },
        filter: this.filters,
      },
    }
  }
  shareOfVoiceIndex = () => {
    const prefix = process.env.NODE_ENV === 'test' ? 'test-' : ''
    const aliasName = this.params.matrix === 'interactions' ? 'interactionstats' : 'impressionstats'
    return `${prefix}blaze-${aliasName}`
  }

  aggs () {
    return {
      impressionStats: {
        terms: {
          field: 'product_uuid',
        },
      },
    }
  }

  async search () {
    const indexName = this.shareOfVoiceIndex()
    const searchResult = await client.search({
      index: indexName,
      body: {
        size: 0,
        query: this.query(),
        aggs: this.aggs(),
      },
    })

    const stats = searchResult.aggregations.impressionStats.buckets.map((bucket) => {
      return {
        uuid: bucket.key,
        count: bucket.doc_count,
      }
    })

    const missingStats = differenceBy(this.params.paramArray, stats, 'uuid')

    missingStats.forEach((stat) => {
      stats.push({
        uuid: stat.uuid,
        count: 0,
      })
    })
    return stats
  }
}

export default ShareOfVoiceSearch
