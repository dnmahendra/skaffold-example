import { object } from 'prop-types'
import React, { Component } from 'react'
import Layout from 'components/Layout'

export default class Product extends Component {
  static propTypes = {
    query: object,
  }
  static async getInitialProps ({ query }) {
    return {
      query,
      title: 'Car Loans | Product',
    }
  }
  render () {
    const { query } = this.props
    return (
      <Layout>
        <div className="hero">
          <h1 className="title">Product page</h1>
          <h2 className="title">Company: {query.company}</h2>
          <h2 className="title">Product: {query.product}</h2>
        </div>
      </Layout>
    )
  }
}
