import { object } from 'prop-types'
import { Component } from 'react'
import styled from 'styled-components'

import { media } from 'styles/mediaQuery'

const Image = styled.img`
  max-width: 100px;
  ${media.phone`max-width: 100%;`}
`

class Company extends Component {
  static propTypes = {
    product: object,
  }
  render () {
    const { product } = this.props
    return (
      <div className="company">
        <Image src={product.company.logo} alt={product.company.name} />
      </div>
    )
  }
}

export default Company
