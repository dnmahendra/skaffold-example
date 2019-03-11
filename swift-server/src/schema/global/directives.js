import { SchemaDirectiveVisitor } from 'graphql-tools'
import { defaultFieldResolver, GraphQLString } from 'graphql'

class PercentageDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args)
      return `${result}%`
    }
    field.type = GraphQLString
  }
}

export default PercentageDirective
