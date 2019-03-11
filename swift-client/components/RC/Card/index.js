import { string } from 'prop-types'
import { Component } from 'react'
import classnames from 'classnames'

import { Wrapper } from './styles'

class Card extends Component {
  static propTypes = {
    className: string,
  }
  render () {
    return <Wrapper className={classnames('rc-card', this.props.className)}>{this.props.children}</Wrapper>
  }
}

export default Card
