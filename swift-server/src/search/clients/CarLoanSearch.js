import { head, concat, max } from 'lodash'

import client, {
  entityTypes,
  extractHits,
  extractSearchMeta,
  generateIndexName,
} from 'libs/elasticSearchUtils'
import Search from './Search'
import PromotedProductSearch from './PromotedProductSearch'
import CoefficientSearch from './CoefficientSearch'

const loanPurposes = [
  'isNewCarAllowed',
  'isUsedCarAllowed',
  'isMotorcycleAllowed',
  'isBoatAllowed',
  'isCaravanAllowed',
]

const loanSecurity = [
  'isSecuredByVehicle',
]

const loanFeatures = [
  'availableTo457VisaHolders',
]

class CarLoanSearch extends Search {
  constructor () {
    super()
    this.entityType = entityTypes.CARLOAN
  }

  async fetchCoefficients () {
    const client = new CoefficientSearch()
    client.addParams({ vertical: 'car-loans' })
    const result = await client.search()
    return head(result)
  }

  async query () {
    this.addWeightBoost('gotoSiteEnabled', true, (this.params.showAll !== true ? 2 : 1))

    if (!this.params.showAll) {
      this.termFilterStaticParam('gotoSiteEnabled', true)
    }

    this.termFilter('feed', 'feeds', this.params.feed)
    this.termsFilter('securedType', 'securedType', concat([], this.params.securedType))
    this.termsFilter('repaymentType', 'repaymentType', concat([], this.params.repaymentType))
    this.termsFilter('companyType', 'companyType', this.params.companyType)
    this.companyFilter('companyDisplayName', 'companyDisplayName')
    this.termFilter('hasRedrawFacility', 'hasRedrawFacility', true)
    this.termFilter('isExtraRepaymentsAllowed', 'isExtraRepaymentsAllowed', true)
    this.termFilter('hasEarlyExitPenalty', 'hasEarlyExitPenalty', true)
    this.rangeFilterLTE('applicationFeesDollar', 'applicationFeesDollar', this.params.applicationFeesDollar)
    this.rangeFilterLTE('ongoingFees', 'ongoingFees', this.params.ongoingFees)
    this.rangeFilterLTE('earlyExitPenaltyFee', 'earlyExitPenaltyFee', this.params.earlyExitPenaltyFee)
    this.postCodesFilter('availablePostcodes', 'availablePostcodes', this.params.availablePostcodes)
    this.rangeFilterLTE('minimumIncome', 'minimumIncome', this.params.minimumIncome)
    this.termsFilter('uuid', 'uuid', this.params.uuid)
    this.termsFilter('productUrl', 'productUrl', this.params.productUrl)
    this.queryStringFilter(this.params.query_string, ['name', 'company.name'])
    this.nestedRangeFilters('maxLoanTerm', 'variations', 'minLoanTerm', 'maxLoanTerm', this.params.loanTerm)
    this.nestedRangeFilters('maxLoanAmount', 'variations', 'minLoanAmount', 'maxLoanAmount', this.params.borrowAmount)
    this.nestedRangeFiltersLTE('comparisonRate', 'variations', 'comparisonRate', this.params.comparisonRate)
    this.nestedRangeFiltersGT('minComparisonRate', 'variations', 'comparisonRate', this.params.minComparisonRate)
    this.termFilter('paymentType', 'paymentType', this.params.paymentType)

    for (const purpose of loanPurposes) {
      this.termFilter(purpose, purpose, true)
    }

    for (const security of loanSecurity) {
      this.termFilter(security, security, true)
    }

    for (const feature of loanFeatures) {
      this.termFilter(feature, feature, true)
    }

    if (this.nestedFilters.length === 0) {
      this.nestedFilters.push({
        term: {
          'variations.isRepresentative': true,
        },
      })
    }

    if (this.nestedFilters) {
      this.filters.push(this.nestedFiltersPathQuery('variations'))
    }

    const coefficients = await this.fetchCoefficients() || { companyBoostScore: 100, clickRatio: 0, ecpc: 0, productRating: 0, budgetRemaining: 0, intercept: 0 }
    if (this.promotedProducts && this.params.boostPromoted) {
      const companyBoostScore = coefficients.companyBoostScore * 100
      this.promotedProducts.forEach((product) => {
        this.addWeightBoost('uuid', product.uuid, Math.max(Math.floor(companyBoostScore - 200 * (product.order - 1)), 0))
      })
    }
    // if (this.params.sort_field === 'default') {
    //   this.functionList.push({
    //     script_score: {
    //       script: {
    //         params: {
    //           coef_cr: coefficients.clickRatio,
    //           coef_ecpc: coefficients.ecpc,
    //           coef_bdgt_rmng: coefficients.budgetRemaining,
    //           coef_prd_rtng: coefficients.productRating,
    //           intrcpt: coefficients.intercept,
    //         },
    //         lang: 'groovy',
    //         source: `
    //         clickRatio = doc['clickRatio'];
    //         ecpc = doc['ecpc'];
    //         productRating = doc['productRating'];
    //         budgetRemaining = doc['budgetRemaining'];
    //
    //         return (
    //           (coef_cr * clickRatio) +
    //           (coef_ecpc * ecpc) +
    //           (coef_prd_rtng * productRating) +
    //           (coef_bdgt_rmng * budgetRemaining) +
    //           intrcpt
    //         )`,
    //       },
    //     },
    //   })
    // }

    return {
      function_score: {
        score_mode: 'sum',
        functions: this.functionList,
        query: {
          constant_score: {
            query: {
              bool: {
                filter: this.filters,
              },
            },
          },
        },
      },
    }
  }

  sort () {
    this.addSortScore('desc')
    if (this.params.sort_field && this.params.sort_field !== 'default') {
      const direction = (typeof this.params.sort_order === 'string') ? this.params.sort_order : 'asc'
      this.addVariationsSort(this.params.sort_field, direction)
    }
    this.addVariationsSort('comparisonRate', 'asc')
    this.addVariationsSort('minRate', 'asc')
    this.addVariationsSort('company.name.raw', 'asc')
    return this.sorts
  }

  async search () {
    const size = this.params.group_by ? this.params.pageSize * 5 : this.params.pageSize
    const from = max([(this.params.page - 1) * this.params.pageSize, 0])
    this.promotedProducts = await this.fetchPromotedProducts('car-loans', PromotedProductSearch, 10)
    const query = await this.query()
    const body = {
      from,
      size,
      query,
      sort: this.sort(),
    }
    const searchResult = await client.search({
      index: generateIndexName(this.entityType).aliasName,
      type: this.entityType,
      body,
    })

    const hits = this.filterPromoted(
      extractHits(searchResult), 'promotedOrder', this.params.boostPromoted, this.promotedProducts
    )
    const meta = extractSearchMeta(searchResult, this.params)

    return {
      hits,
      meta,
    }
  }
}

export default CarLoanSearch
