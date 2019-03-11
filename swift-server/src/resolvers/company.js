import CompanySearch from 'search/clients/CompanySearch'
import { forEach, map } from 'lodash'

export default {
  Query: {
    companies: async (parent, args) => {
      const { useDefaults = true } = args
      const client = new CompanySearch()
      if (useDefaults) client.addDefaultParams()
      client.addParams(args)
      const response = await client.search()
      const { hits: data, meta } = response
      /* convert verticalData from
       * "verticalData": {
       *    "superannuation": {
       *      "count": 3,
       *      "popularityScore": 0
       *    }
       *  },
       *  to
       *  "verticalData": [{
       *     "vertical": "superannuation",
       *     "count": 3,
       *     "popularityScore": 0
       *    }
       *  }],
       */
      forEach(data, (d) => {
        d.verticalData = map(d.verticalData, (v, k) => ({ vertical: k, ...v }))
      })
      return { data, meta }
    },
  },
}
