import gql from 'graphql-tag'

export default gql`
  query faqs ($vertical: String!) {
    faqs (vertical: $vertical) {
      title
      url
      body
    }
  }
`
