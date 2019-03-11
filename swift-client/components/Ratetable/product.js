import { array, object } from 'prop-types'
import { Component } from 'react'

import { getVertical } from 'libs/verticals'
import Details from './details'
import { Tr, Td } from './styles/product'
import { renderAttribute } from './utils'
import { pull } from './attributes'

class Product extends Component {
  static propTypes = {
    attributes: array,
    product: object,
  }
  render () {
    const { attributes, product } = this.props
    const detailAttributes = pull(getVertical(product.type, 'slug'), 'details')
    const renderAttributes = attributes.map(attribute => {
      return (
        <Td className={attribute.key} key={attribute.key}>
          {renderAttribute(attribute, product)}
        </Td>
      )
    })
    return (
      <Tr className="product">
        {renderAttributes}
        <Details product={product} attributes={detailAttributes} />
      </Tr>
    )
  }
}

export default Product
