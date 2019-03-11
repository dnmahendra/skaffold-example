import { node } from 'prop-types'
import { Component } from 'react'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'

import { getVertical } from 'libs/verticals'
import PageContext from 'contexts/page'
import Breadcrumbs from './Breadcrumbs'
import { Wrapper, Heading, Tagline } from './styles'

const Bgs = {
  'car-loans': '//production-content-assets.ratecity.com.au/20180716152720/Carloan-_Background.jpg',
}

class PageHeader extends Component {
  static contextType = PageContext
  static propTypes = {
    callToActionElement: node,
  }
  render () {
    const { callToActionElement } = this.props
    const { breadcrumbs, header, tagline, vertical } = this.context
    const slug = getVertical(vertical, 'slug')
    const taglineElement = tagline ? <Tagline>{tagline}</Tagline> : null
    return (
      <Wrapper className={slug} style={{ backgroundImage: `url(${Bgs[slug]})` }}>
        <Grid>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <Row>
            <Col xs={12} sm={6}>
              <Heading>{header}</Heading>
              {taglineElement}
              {callToActionElement}
            </Col>
            <Col xs={12} sm={6} />
          </Row>
        </Grid>
      </Wrapper>
    )
  }
}

export default PageHeader
