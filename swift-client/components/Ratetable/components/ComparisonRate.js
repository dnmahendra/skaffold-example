import { object } from 'prop-types'
import { Component } from 'react'

import RatetableContext from 'contexts/ratetable'

class ComparisonRate extends Component {
  static contextType = RatetableContext
  static propTypes = {
    product: object,
  }
  render () {
    const { product } = this.props
    const comparisonRate = product.comparisonRate(this.context)
    return (
      <div className="comparison-rate">
        {comparisonRate ? <p>{comparisonRate}</p> : null}
      </div>
    )
  }
}

export default ComparisonRate
