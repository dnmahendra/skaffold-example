import React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'

import withData from 'libs/withData'

class Swift extends App {
  static async getInitialProps ({ Component, ctx, router }) {
    let data = {}
    if (Component.getInitialProps) {
      data = await Component.getInitialProps(ctx)
    }
    return { data, router }
  }
  render () {
    const { Component, data = {}, router = {}, apollo } = this.props
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...data} router={router} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(Swift)
