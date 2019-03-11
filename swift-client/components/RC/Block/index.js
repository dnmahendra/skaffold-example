import { bool, node, string } from 'prop-types'
import React, { Component } from 'react'
import { Grid } from 'react-styled-flexboxgrid'
import classnames from 'classnames'

import { Wrapper } from './styles'

class Block extends Component {
  static propTypes = {
    children: node,
    className: string,
    full: bool,
    grey: bool,
    noPadding: bool,
  }
  static defaultProps = {
    full: false,
    grey: false,
    noPadding: false,
  }
  render () {
    const { children, className, grey, full, noPadding } = this.props
    if (!children) {
      return null
    }
    const content = full ? children : <Grid>{children}</Grid>
    return (
      <Wrapper className={classnames('rc-block', { 'rc-greyed': grey, 'no-padding': noPadding }, className)}>
        {content}
      </Wrapper>
    )
  }
}

export default Block
