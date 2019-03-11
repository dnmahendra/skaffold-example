import { concat, max, merge } from 'lodash'
import client, {
  entityTypes,
  extractHits,
  extractSearchMeta,
  generateIndexName,
} from 'libs/elasticSearchUtils'
import Search from './Search'

class ArticleSearch extends Search {
  constructor() {
    super()
    this.defaultParams = {
      page: 1,
      per_page: 5,
      sort_field: 'created_at',
      sort_order: 'desc',
    }
  }

  query () {
    // we accept both scalars and arrays here
    this.termsFilter('article_type', 'article_type', concat([], this.params.article_type))
    this.termsFilter('vertical', 'article_vertical', concat([], this.params.vertical))
    this.termsFilter('tags', 'category', concat([], this.params.tags))
    this.termsFilter('userJourneyStage', 'userJourneyStage', concat([], this.params.userJourneyStage))
    this.notFilter('exclude_article_type', 'article_type', concat([], this.params.exclude_article_type))

    this.termFilter('url', 'url', this.params.url)
    this.termFilter('id', '_id', this.params.id)
    this.termFilter('partnerName', 'partner_name', this.params.partnerName)
    this.termFilter('company_uuid', 'supplierReference', this.params.company_uuid)
    this.rangeFilterGT('next_created_at', this.params.next_created_at)
    this.dateFilterGT('pubDateTimestramp', 'pubDateTimestramp', this.params.pubDateTimestramp)
    this.rangeFilterLT('prev_created_at', this.params.prev_created_at)

    this.notFilter('excludeArticleId', '_id', concat([], this.params.excludeArticleId))
    this.queryStringFilter(this.params.query_string, ['title', 'body', 'short_description'])

    const query = {
      bool: {
        filter: this.filters,
      },
    }

    // related articles
    if (this.params.likeThisArticle) {
      merge(
        query,
        {
          bool: {
            must: {
              more_like_this: {
                fields: ['title', 'short_description', 'body'],
                like_text: this.params.likeThisArticle,
                min_term_freq: 1,
                min_doc_freq: 1,
                max_query_terms: 50,
              },
            },
          },
        }
      )
    }

    return query
  }

  sort () {
    this.addSort(this.params.sort_field, this.params.sort_order)
    return this.sorts
  }

  async search () {
    const body = {
      from: max([(this.params.page - 1) * this.params.per_page, 0]),
      size: this.params.per_page,
      query: this.query(),
      sort: this.sort(),
    }
    const searchResult = await client.search({
      index: generateIndexName(entityTypes.ARTICLE).aliasName,
      type: entityTypes.ARTICLE,
      body,
    })

    const result = {
      articles: extractHits(searchResult),
      meta: extractSearchMeta(searchResult, this.params),
      params: this.params,
    }

    /* Commenting amp logic for now */
    // if (this.params.amp) {
    //   const promises = result.articles.map((article) => {
    //     return new Promise((resolve) => {
    //       const amperize = new Amperize()
    //       // remove scripts from amp articles
    //       article.body = article.body ? article.body.replace(/<script .*<\/script>/g, '') : null
    //       // add "https" protocol to urls
    //       article.body = article.body ? article.body.replace(/(href|src)\=("|')\/\//g, '$1=$2https://') : null
    //       amperize.parse(article.body, (err, result) => {
    //         article.body = result
    //         resolve()
    //       })
    //     })
    //   })
    //   await Promise.all(promises)
    // }

    return result
  }
}

module.exports = ArticleSearch
