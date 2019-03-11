import { string } from 'prop-types'
import React, { Component } from 'react'

import { Wrapper, Title, Subline } from './styles'

class Heading extends Component {
  static propTypes = {
    heading: string,
    subline: string,
  }
  render () {
    const { heading, subline } = this.props
    return (
      <Wrapper>
        <Title>{heading}</Title>
        <Subline>{subline}</Subline>
      </Wrapper>
    )
  }
}

export default Heading
