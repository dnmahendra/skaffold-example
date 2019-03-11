import { object } from 'prop-types'
import { Component } from 'react'

import RatetableContext from 'contexts/ratetable'
import TextField from './TextField'

class UpfrontFee extends Component {
  static contextType = RatetableContext
  static propTypes = {
    product: object,
  }
  render () {
    const { product } = this.props
    const upfrontFees = product.upfrontFees(this.context)
    const upfrontFeesText = product.upfrontFeesText(this.context)
    return (
      <div className="upfront-fee">
        <TextField firstLine={upfrontFees} subLine={upfrontFeesText} />
      </div>
    )
  }
}

export default UpfrontFee
