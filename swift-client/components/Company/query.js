import gql from 'graphql-tag'

export default gql`
  query companies ($vertical: String!) {
    companies (vertical: $vertical) {
      data {
        logo
        slug
        url
        displayName
      }
    }
  }
`
