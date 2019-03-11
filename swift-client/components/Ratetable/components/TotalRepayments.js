import { object } from 'prop-types'
import { Component } from 'react'
import numeral from 'numeral'

import RatetableContext from 'contexts/ratetable'

class TotalRepayments extends Component {
  static contextType = RatetableContext
  static propTypes = {
    product: object,
  }
  render () {
    const { product } = this.props
    const totalRepayments = `$${product.variation.totalRepayments.toFixed(0)}`
    return (
      <div className="total-repayments">
        {totalRepayments}
      </div>
    )
  }
}

export default TotalRepayments
