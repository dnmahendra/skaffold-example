import { array, bool, object } from 'prop-types'
import { Component } from 'react'
import classnames from 'classnames'

import PageContext from 'contexts/page'
import { getVertical } from 'libs/verticals'
import ControlBar from './controlbar'
import Header from './header'
import Product from './product'
import { Wrapper, Table, Thead, Tr } from './styles/table'

class RateTable extends Component {
  static contextType = PageContext
  static propTypes = {
    attributes: array,
    loading: bool,
    meta: object,
    products: array,
  }
  render () {
    const { attributes, loading, meta, products } = this.props
    if (products.length === 0) {
      return (
        <div className="no-result">
          <h3>Oops, your search produced 0 results.</h3>
        </div>
      )
    }
    const vertical = getVertical(this.context.vertical, 'slug')
    const renderHeaders = attributes.map(attribute => <Header key={attribute.key} attribute={attribute} />)
    const renderProducts = products.map(product => <Product key={product.uuid} product={product} attributes={attributes} />)
    return (
      <Wrapper className={classnames('rate-table', vertical, { loading })}>
        <ControlBar meta={meta} vertical={vertical} attributes={attributes} />
        <Table>
          <Thead>
            <Tr>{renderHeaders}</Tr>
          </Thead>
          <tbody>
            {renderProducts}
          </tbody>
        </Table>
      </Wrapper>
    )
  }
}

export default RateTable
