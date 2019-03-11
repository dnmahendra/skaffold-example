import { object } from 'prop-types'
import React, { Component, Fragment } from 'react'
import urlParse from 'url-parse'
import styled from 'styled-components'

import Layout from 'components/Layout'
import RC from 'components/RC'
import Heading from 'components/Heading'
import PageHeader from 'components/PageHeader'
import FeaturedProduct from 'components/FeaturedProduct'
import Ratetable from 'components/Ratetable'
import Faqs from 'components/Faqs'
import TrendingNews from 'components/TrendingNews'
import Companies from 'components/Company'
import { pull } from 'components/Ratetable/attributes'
import { transform } from 'libs/transformers'

const Page = styled(Layout)`
  .featured-product.banner {
    transform: translateY(-30px);
  }
`

class Landing extends Component {
  static propTypes = {
    router: object,
  }
  render () {
    const { router } = this.props
    const url = urlParse(router.asPath, true)
    const variables = Object.assign(
      { page: 1, pageSize: 20, pagePath: url.pathname, loanTerm: 5, borrowAmount: 30000, showAll: true },
      router.query,
    )
    const attributes = pull('car-loans', 'landing')
    return (
      <Page className="car-loans-landing">
        <Fragment>
          <PageHeader />
          <RC.Block grey noPadding>
            <FeaturedProduct banner vertical="car-loans" />
          </RC.Block>
          <RC.Block grey>
            <Heading heading="Popular car loans on RateCity" subline="Compare car loan rates. Find low rate car loans and calculate repayments." />
            <Ratetable variables={variables} attributes={attributes} />
          </RC.Block>
          <RC.Block>
            <Companies
              viewAllLink="/car-loans/companies"
              heading="Popular car loan leaders"
              subheading="Find popular car loan lenders from a wide range of Australian."
            />
          </RC.Block>
          <RC.Block>
            <TrendingNews heading="The latest in car loan news" />
          </RC.Block>
          <RC.Block>
            <Faqs />
          </RC.Block>
        </Fragment>
      </Page>
    )
  }
}

export default Landing
