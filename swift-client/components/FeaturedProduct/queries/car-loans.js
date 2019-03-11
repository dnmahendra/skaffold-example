import gql from 'graphql-tag'

export default gql`
  query {
    carLoans (featured: true) {
      data {
        uuid
        title
        specials {
          url
          introText
          blurb
          type
          name
        }
        description
        comparisonRateDisclaimer
        name
        pros
        defaultVariation
        company {
          acl
          logo
          name
        }
        variations {
          minRate
          maxRate
          comparisonRate
          headlineRate
        }
      }
    }
  }
`
