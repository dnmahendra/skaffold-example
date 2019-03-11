import { object } from 'prop-types'
import { Component } from 'react'
import styled from 'styled-components'

import RatetableContext from 'contexts/ratetable'

const SmallText = styled.p`
  font-size: 11px;
  margin: 2px 0;
`

class AdvertisedRate extends Component {
  static contextType = RatetableContext
  static propTypes = {
    product: object,
  }
  render () {
    const { product } = this.props
    const headLine = product.headLine(this.context)
    const advertisedRate = product.advertisedRate(this.context)
    return (
      <div className="advertised-rate">
        {headLine ? <SmallText>{headLine}</SmallText> : null}
        {advertisedRate ? <p>{advertisedRate}</p> : null}
        {product.repaymentType ? <SmallText>{product.repaymentType.toLowerCase()}</SmallText> : null}
      </div>
    )
  }
}

export default AdvertisedRate
