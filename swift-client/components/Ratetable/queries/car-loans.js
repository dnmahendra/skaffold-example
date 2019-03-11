import gql from 'graphql-tag'

export default gql`
  query carLoanList (
    $page: Int!,
    $pageSize: Int!,
    $pagePath: String,
    $borrowAmount: Int,
    $loanTerm: Int,
    $showAll: Boolean,
  ) {
    carLoans (
      page: $page,
      pageSize: $pageSize,
      pagePath: $pagePath,
      borrowAmount: $borrowAmount,
      loanTerm: $loanTerm,
      showAll: $showAll,
    ) {
      hasMore
      list {
        uuid
        name
        comparisonRateDisclaimer
        promotedOrder
        productUrl
        repaymentType
        applicationFeesDollar
        applicationFeesPercent
        isNewCarAllowed
        isUsedCarAllowed
        isMotorcycleAllowed
        isBoatAllowed
        isSecuredByVehicle
        isExtraRepaymentsAllowed
        missedPaymentPenalty
        earlyExitPenaltyFee
        redrawActivationFee
        securedType
        availableTo457VisaHolders
        hasRedrawFacility
        defaultVariation
        applyUrl
        variation {
          minRate
          maxRate
          minLoanAmount
          maxLoanAmount
          advertisedRate
          comparisonRate
          monthlyRepayment
          totalRepayments
        }
        company {
          name
          logo
          slug
        }
        specials {
          url
          introText
          blurb
          type
          name
        }
      }
      meta {
        totalCount
        pageCount
        page
        pageSize
      }
    }
  }
`
