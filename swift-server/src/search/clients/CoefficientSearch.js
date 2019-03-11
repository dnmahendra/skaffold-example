import client, {
  entityTypes,
  extractHits,
  generateIndexName,
} from 'libs/elasticSearchUtils'
import Search from './Search'

class CoefficientSearch extends Search {
  query () {
    this.termFilterStaticParam('vertical', this.params.vertical || 'home-loans')
    return {
      bool: {
        filter: this.filters,
      },
    }
  }

  async search () {
    const body = {
      query: this.query(),
    }
    const searchResult = await client.search({
      index: generateIndexName(entityTypes.COEFFICIENT).aliasName,
      type: entityTypes.COEFFICIENT,
      body,
    })
    return extractHits(searchResult)
  }
}

export default CoefficientSearch
