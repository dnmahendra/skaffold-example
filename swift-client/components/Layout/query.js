import gql from 'graphql-tag'

export default gql`
  query fetchPage ($url: String!) {
    page (url: $url) {
      abTestBuckets
      name
      header
      title
      description
      variant
      vertical
      canonical
      content
      dfpCategory
      tagline
      type
      keywords
      url
      headerImage
      featuredImage
      wordDisclaimerRequired
      breadcrumbs {
        name
        href
      }
      google {
        title
        description
        image
      }
      twitter {
        card
        site
        title
        description
        creator
        image
      }
      og {
        title
        description
        type
        siteName
        image
        id
      }
    }
  }
`
