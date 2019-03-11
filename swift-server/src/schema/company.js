import { gql } from 'apollo-server'

export default gql`
  extend type Query {
    companies (
      vertical: String
      per_page: Int
      page: Int
      sort_field: String
      sort_order: String
      aggregate_company: Boolean
      uuid: String
      code: String
      popular: Boolean
      company_name: String
    ) : CompanyResponse
  }

  type CompanyResponse {
    data: [ Company ]
    meta: Meta
  }

  type Company {
    uuid: String
    url: String
    slug: String
    displayName: String
    name: String
    searchKeyword: [ String ]
    isDiscontinued: Boolean
    otherNames: [ String ]
    abnOrAcn: Int
    afsl: Int
    blurb: String
    logo: String
    phoneNumber: String
    shortName: String
    facebook: String
    google: String
    productReview: String
    displayClassification: String
    classificationType: [ String ]
    userHasOffers: Boolean
    boostScore: Float
    tier: String
    textColor: String
    primaryColor: String
    secondaryColor: String
    kId: String
    totalPopularityScore: Float
    verticalData: [ verticalData ]
  }

  type verticalData {
    vertical: String
    count: Int
    popularityScore: Float
    hasRepaymentWidget: Boolean
  }
`
