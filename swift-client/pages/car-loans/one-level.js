import { object } from 'prop-types'
import React, { Component } from 'react'
import Layout from 'components/Layout'

export default class OneLevel extends Component {
  static propTypes = {
    query: object,
  }
  static async getInitialProps ({ query }) {
    return {
      query,
      title: 'Car Loans | Search',
    }
  }
  render () {
    const { query } = this.props
    return (
      <Layout>
        <div className="hero">
          <h1 className="title">Search: {query.search}</h1>
        </div>
      </Layout>
    )
  }
}
