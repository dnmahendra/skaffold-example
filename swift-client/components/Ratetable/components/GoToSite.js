import { object } from 'prop-types'
import { Component } from 'react'

import ApplyButton from 'components/ApplyButton'

class GoToSite extends Component {
  static propTypes = {
    product: object,
  }
  render () {
    const { product } = this.props
    return <ApplyButton product={product} />
  }
}

export default GoToSite
