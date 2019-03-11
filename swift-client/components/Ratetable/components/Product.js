import { object } from 'prop-types'
import { Component } from 'react'
import get from 'lodash/get'

import RatetableContext from 'contexts/ratetable'
import { Wrapper, Name, Text, Label } from './styles/product'

class Product extends Component {
  static contextType = RatetableContext
  static propTypes = {
    product: object,
  }
  render () {
    const { product } = this.props
    const name = product.productName(this.context)
    const text = get(product, 'specials.0.introText')
    const badge = text ? (
      <div className="specials">
        {product.specials.map(special => <Label className="label" key={special.type}>{special.type}</Label>)}
        {text}
      </div>
    ) : null
    const condition = product.comparisonRateDisclaimer ? `*${product.comparisonRateDisclaimer}` : null
    return (
      <Wrapper className="product">
        <a href={product.productUrl} target="_self">
          <Name>{name}</Name>
          <Text>
            {badge}
            {condition}
          </Text>
        </a>
      </Wrapper>
    )
  }
}

export default Product
