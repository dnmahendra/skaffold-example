import { head, merge } from 'lodash'
import client, {
  extractHits,
  extractSearchMeta,
  entityTypes,
  generateIndexName,
} from 'libs/elasticSearchUtils'
import Search from './Search'

const indexes = [
  generateIndexName(entityTypes.ARTICLEPAGES).aliasName,
  generateIndexName(entityTypes.BANKACCOUNTPAGES).aliasName,
  generateIndexName(entityTypes.BROKERPAGES).aliasName,
  generateIndexName(entityTypes.CARLOANPAGES).aliasName,
  generateIndexName(entityTypes.COMPANYPAGES).aliasName,
  generateIndexName(entityTypes.CREDITCARDPAGES).aliasName,
  generateIndexName(entityTypes.FAQPAGES).aliasName,
  generateIndexName(entityTypes.HOMELOANFAMILYPAGES).aliasName,
  generateIndexName(entityTypes.HOMELOANPAGES).aliasName,
  generateIndexName(entityTypes.HOMELOANREVIEWPAGES).aliasName,
  generateIndexName(entityTypes.LEADERBOARDPAGES).aliasName,
  generateIndexName(entityTypes.PAGES).aliasName,
  generateIndexName(entityTypes.PENSIONPAGES).aliasName,
  generateIndexName(entityTypes.PERSONALLOANPAGES).aliasName,
  generateIndexName(entityTypes.SAVINGSACCOUNTSPAGES).aliasName,
  generateIndexName(entityTypes.SUPERANNUATIONPAGES).aliasName,
  generateIndexName(entityTypes.TERMDEPOSITSPAGES).aliasName,
].join(',')

class PageSearch extends Search {
  query () {
    this.termFilter('url', 'url', this.params.url)
    return {
      bool: {
        filter: this.filters,
      },
    }
  }

  async search () {
    const searchResult = await client.search({
      index: indexes,
      body: {
        from: 0,
        size: 1,
        query: this.query(),
      },
    })

    const { page, url } = head(extractHits(searchResult))
    merge(page, await this.getMetaData(url))

    return {
      data: page,
      meta: {
        ...extractSearchMeta(searchResult, this.params),
      },
    }
  }

  async getMetaData (url) {
    const searchResult = await client.search({
      index: generateIndexName(entityTypes.METADATA).aliasName,
      body: {
        query: {
          term: { url },
        },
      },
    })
    return head(extractHits(searchResult))
  }
}

export default PageSearch
