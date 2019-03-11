import { bool, string } from 'prop-types'
import { Component } from 'react'
import { Query } from 'react-apollo'
import head from 'lodash/head'
import isEmpty from 'lodash/isEmpty'

import PageContext from 'contexts/page'
import { extract } from 'components/Ratetable/utils'
import Banner from './Banner'
import queries from './queries'

class FeaturedProduct extends Component {
  static contextType = PageContext
  static propTypes = {
    banner: bool,
    vertical: string,
  }
  render () {
    const { banner, vertical } = this.props
    const query = queries[vertical]
    if (!query) return null

    return (
      <Query query={query} variables={{ vertical }}>
        {({ data, error, loading }) => {
          if (error || loading) return null
          const { products } = extract(data, vertical)
          const featuredProduct = head(products)
          if (isEmpty(featuredProduct)) return null
          if (banner) return <Banner product={featuredProduct} />
          return null
        }}
      </Query>
    )
  }
}

export default FeaturedProduct
