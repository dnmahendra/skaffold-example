import { object } from 'prop-types'
import { Component } from 'react'

import RatetableContext from 'contexts/ratetable'

class LoanAmount extends Component {
  static contextType = RatetableContext
  static propTypes = {
    product: object,
  }
  render () {
    const { product } = this.props
    const loanAmount = product.loanAmount(this.context)
    return (
      <div className="loan-amount">
        {loanAmount}
      </div>
    )
  }
}

export default LoanAmount
