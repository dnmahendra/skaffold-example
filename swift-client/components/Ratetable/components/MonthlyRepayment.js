import { object } from 'prop-types'
import { Component } from 'react'

import RatetableContext from 'contexts/ratetable'

class MonthlyRepayment extends Component {
  static contextType = RatetableContext
  static propTypes = {
    product: object,
  }
  render () {
    const { product } = this.props
    const monthlyRepayment = `$${product.variation.monthlyRepayment.toFixed(0)}`
    return (
      <div className="monthly-repayment">
        {monthlyRepayment}
      </div>
    )
  }
}

export default MonthlyRepayment
