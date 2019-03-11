import { gql } from 'apollo-server'

export default gql`
  extend type Query {
    meta: Meta
  }

  type Meta {
    totalCount: Int,
    pageCount: Int,
    page: Int,
    pageSize: Int,
  }
`
