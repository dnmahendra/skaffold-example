import FeaturedProductSearch from 'search/clients/FeaturedProductSearch'
import CarLoanSearch from 'search/clients/CarLoanSearch'
import productVariation from 'libs/productVariation'
import { calculateMonthlyRepayment } from 'libs/calculations'
import { slice, isUndefined, size } from 'lodash'

export default {
  Query: {
    carLoans: async (parent, args) => {
      const { featured, pageSize, page, useDefaults = true } = args
      let data, client, meta
      if (featured) {
        client = new FeaturedProductSearch()
        if (useDefaults) client.addDefaultParams()
        client.addParams(Object.assign({ vertical: 'car-loans', args }))
        data = [ await client.search() ]
      } else {
        client = new CarLoanSearch()
        if (useDefaults) client.addDefaultParams()
        client.addParams(args)
        const response = await client.search()

        data = response.hits
        meta = response.meta
      }

      return {
        list: data,
        meta,
        hasMore: !(page > 2 || meta.totalCount < pageSize),
      }
    },
  },

  CarLoan: {
    carLoanVariations: (carLoan, args) => {
      return carLoan.variations
    },
    variation: (carLoan, args, ctx, info) => {
      const { variations, defaultVariation } = carLoan
      const { loanTerm, borrowAmount } = info.variableValues

      const variation = productVariation(variations, loanTerm, borrowAmount, defaultVariation)

      return variation
    },
    pros: async (parent, args) => {
      if (!parent.pros) return parent.pros
      const { limit, offset } = args
      const end = isUndefined(limit) ? size(parent.pros) : (offset + limit)
      return slice(parent.pros, offset, end)
    },
  },

  CarLoanVariation: {
    advertisedRate: variation => {
      return variation.minRate
    },
    // comparisonRate: variation => {
    //   return `${variation.comparisonRate.toFixed(2)}%`
    // },
    monthlyRepayment: (variation, args, ctx, info) => {
      const { borrowAmount, loanTerm } = info.variableValues

      const minRate = variation.minRate
      return calculateMonthlyRepayment(borrowAmount, loanTerm, minRate)
    },
    totalRepayments: (variation, args, ctx, info) => {
      const { borrowAmount, loanTerm } = info.variableValues

      const minRate = variation.minRate
      const monthlyRepayment = calculateMonthlyRepayment(borrowAmount, loanTerm, minRate)
      return monthlyRepayment * loanTerm * 12
    },
  },
}
