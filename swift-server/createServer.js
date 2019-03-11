import { ApolloServer } from 'apollo-server-express'
import resolvers from './src/resolvers'
import schema from './src/schema'
import PercentageDirective from './src/schema/global/directives'

function createServer () {
  return new ApolloServer({
    typeDefs: schema,
    resolvers,
    introspection: true,
    playground: true,
    schemaDirectives: {
      percentage: PercentageDirective,
    },
  })
}

export default createServer
