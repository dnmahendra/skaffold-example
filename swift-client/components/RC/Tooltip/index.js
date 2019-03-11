import { node, string } from 'prop-types'
import React, { Component, Fragment } from 'react'

import { Wrapper } from './styles'

class Tooltip extends Component {
  static propTypes = {
    id: string,
    effect: string,
    place: string,
    content: string,
    children: node,
  }
  static defaultProps = {
    effect: 'solid',
    place: 'bottom',
  }
  render () {
    const { id, effect, place, content, children } = this.props
    return (
      <Fragment>
        <span className="handler" data-tip data-for={id}>{children}</span>
        <Wrapper id={id} effect={effect} place={place} type="light">
          <span className="content" style={{ display: 'none' }}>{content}</span>
        </Wrapper>
      </Fragment>
    )
  }
}

export default Tooltip
