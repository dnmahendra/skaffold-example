import withApollo from 'next-with-apollo'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import config from 'config.js'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

const erroLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ))
  }

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const link = ApolloLink.from([
  erroLink,
  new HttpLink({
    // Both endpoints are the same, one is with protocol to support docker setup.
    uri: process.browser ? config.GRAPHQL_ENDPOINT_CLIENT : config.GRAPHQL_ENDPOINT_SERVER,
  }),
])

function createClient({ headers, initialState }) {
  return new ApolloClient({
    link,
    ssrMode: !process.browser,
    cache: new InMemoryCache().restore(initialState || {}),
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      })
    },
  })
}

export default withApollo(createClient)
