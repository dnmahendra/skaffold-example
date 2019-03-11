import FAQSearch from 'search/clients/FAQSearch'

export default {
  Query: {
    faqs: async (parent, args, context, info) => {
      const client = new FAQSearch()
      client.addParams(args)
      const { faqs } = await client.search()
      return faqs
    },
  },
}
