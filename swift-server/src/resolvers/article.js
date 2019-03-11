import ArticleSearch from 'search/clients/ArticleSearch'

export default {
  Query: {
    articles: async (parent, args, context, info) => {
      const { useDefaults = true } = args
      const client = new ArticleSearch()
      if (useDefaults) client.addDefaultParams()
      client.addParams(args)
      const { articles } = await client.search()
      return articles
    },
  },
}
