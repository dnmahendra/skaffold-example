import { gql } from 'apollo-server'

export default gql`
  extend type Query {
    page (url: String!): Page
  }

  type Page {
    abTestBuckets: Int,
    name: String,
    header: String,
    title: String,
    description: String,
    variant: String,
    vertical: String,
    canonical: String,
    content: String,
    dfpCategory: String,
    tagline: String,
    type: String,
    keywords: String,
    url: ID,
    headerImage: String,
    featuredImage: String,
    wordDisclaimerRequired: Boolean,
    breadcrumbs: [ Breadcrumb ]
    google: Google,
    twitter: Twitter,
    og: Og,
  }

  type Google {
    title: String,
    description: String,
    image: String,
  }

  type Twitter {
    card: String,
    site: String,
    title: String,
    description: String,
    creator: String,
    image: String,
  }

  type Og {
    title: String,
    description: String,
    type: String,
    siteName: String,
    image: String,
    id: String,
  }

  type Breadcrumb {
    name: String,
    href: String,
  }
`
