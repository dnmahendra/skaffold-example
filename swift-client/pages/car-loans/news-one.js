import { object } from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'routes'

import Layout from 'components/Layout'

export default class NewsOne extends Component {
  static propTypes = {
    query: object,
  }
  static async getInitialProps ({ query }) {
    return {
      query,
    }
  }
  render () {
    const { query } = this.props
    return (
      <Layout className="car-loans-news">
        <div className="container">
          <h1 className="title">News: {query.slug}</h1>
          <div>
            <Link route="/car-loans">
              <a>Car loan landing page</a>
            </Link>
          </div>
          <div>
            <Link route="/car-loans/companies">
              <a>Car loan companies page</a>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }
}
