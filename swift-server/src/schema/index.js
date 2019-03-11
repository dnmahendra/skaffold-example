import { gql } from 'apollo-server'
import pageSchema from './page'
import metaSchema from './meta'
import faqSchema from './faq'
import carLoanSchema from './carLoan'
import companySchema from './company'
import articleSchema from './article'

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`

export default [linkSchema, pageSchema, metaSchema, faqSchema, carLoanSchema, companySchema, articleSchema]
