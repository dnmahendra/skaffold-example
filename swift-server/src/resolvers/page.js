import PageSearch from 'search/clients/PageSearch'

export default {
  Query: {
    page: async (parent, args) => {
      const client = new PageSearch()
      client.addParams(args)
      const { data } = await client.search()
      return data
    },
  },
}
