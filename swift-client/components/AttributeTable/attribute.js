import { object } from 'prop-types'
import { Component } from 'react'

import RatetableContext from 'contexts/ratetable'
import { getValue } from 'components/Ratetable/attributes'
import { Wrapper, Title, Value } from './styles/attribute'

class Attribute extends Component {
  static contextType = RatetableContext
  static propTypes = {
    attribute: object,
    product: object,
  }
  render () {
    const { attribute, product } = this.props
    return (
      <Wrapper>
        <Title>{attribute.title}</Title>
        <Value>{getValue(attribute, product, this.context)}</Value>
      </Wrapper>
    )
  }
}

export default Attribute
