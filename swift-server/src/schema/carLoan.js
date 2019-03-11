import { gql } from 'apollo-server'

export default gql`
  directive @percentage on FIELD_DEFINITION

  extend type Query {
    carLoans (
      featured: Boolean
      loanTerm: Int
      borrowAmount: Int
      showAll: Boolean
      pagePath: String
      sort_field: String
      sort_order: String
      pageSize: Int!
      page: Int
    ): CarLoanConnection!
  }

  type CarLoanConnection {
    list: [CarLoan]
    meta: Meta
    hasMore: Boolean
  }

  type CarLoanSpecial {
    url: String
    introText: String
    blurb: String
    type: [ String ]
    name: String
    promotedOrder: String
  }

  type CarLoan {
    uuid: ID!,
    name: String,

    slug: String,
    title: String,
    description: String,
    docReleaseFees: Int,
    ongoingFeesFrequency: String,
    applicationFeesDollar: Float,
    applicationFeesPercent: Int,
    securedType: String,
    repaymentType: String,
    displayName: String,
    hasEarlyExitPenaltyFeeVaries: Boolean,
    availableTo457VisaHolders: Boolean,
    hasRedrawFacility: Boolean,
    missedPaymentPenalty: Int,
    isFullyDrawnAdvance: Int,
    repaymentFrequency: [ String ],
    isUsedCarAllowed: Boolean,
    ongoingFees: Float,
    isExtraRepaymentsAllowed: Boolean,
    isPersonalLoan: Boolean,
    isCarLoan: Boolean,
    isCarLoanPromoted: Boolean,
    isPersonalLoanPromoted: Boolean,
    isDiscontinued: Boolean,
    isNewCarAllowed: Boolean,
    isMotorcycleAllowed: Boolean,
    isBoatAllowed: Boolean,
    isSecuredByVehicle: Boolean,
    isMonetized: Boolean,
    otherNames: [ String ],
    adminNotes: String,
    redrawActivationFee: Float,
    encumberanceCheckFees: Float,
    legacyCode: String,
    otherBenefits: String,
    otherFees: String,
    otherPurposes: String,
    otherRestrictions: String,
    securedByOthers: String,
    specialConditions: String,
    earlyExitPenaltyFee: Int,
    ecpc: Float,
    isRentalBondAllowed: Boolean,
    personalisedFeeMinimum: Float,
    personalisedFeeMaximum: Float,
    personalisedFeeName: String,
    isBadCreditProduct: Boolean,
    comparisonRateDisclaimer: String,
    gotoSiteUrl: String,
    gotoSiteEnabled: Boolean,
    paymentType: String,
    promotedOrder: Int,
    popularityScore: Int,
    applyOnline: Boolean,
    availablePostcodes: [ String ],
    carLoanBlurb: String,
    personalLoanBlurb: String,
    boostScore: Float,
    tier: String,
    big4ComparisonProductUuid: String,
    popular: Boolean,
    basicLead: Boolean,
    clickCount: String,
    impressionCount: String,
    clickRatio: Float,
    budgetRemaining: Float,
    hasOfferId: String,
    defaultVariation: Int,
    isMarketplaceParticipant: Boolean,
    applyUrl: String,
    productUrl: String,
    featured: Boolean,
    specials: [ CarLoanSpecial ],
    pros: [ String ],
    cons: [ String ],
    productRatingRaw: Float,
    productRating: Float,
    carLoanVariations: [CarLoanVariation!],
    variation: CarLoanVariation,
    company: Company,
  }

  type CarLoanVariation {
    advertisedRate: Float @percentage,
    comparisonRate: Float,
    monthlyRepayment: Float,
    upfrontFee: String,
    loanAmount: String,
    totalRepayments: Float,

    comparisonRateCar: Float,
    comparisonRatePersonal: Float,
    comparisonRateCarManual: Float,
    maxRate: Float,
    minRate: Float,
    maxLoanTerm: Int,
    minLoanTerm: Int,
    maxLoanAmount: Int,
    minLoanAmount: Int,
    name: String,
    repVariation: String,
    comparisonRatePersonal5Years: Float,
    hasHomeOwnersDiscount: Boolean,
    isMarketplaceParticipant: Boolean,
    riskAssuranceFee: Float,
    generateRange: Float,
    headlineRate: Boolean,
    rangeMinFee: Float,
    comparisonRatePersonalManual5Years: Float,
    personalLoanComparisonRate5Years: Float,
    personalLoanComparisonRate: Float,
    carLoanComparisonRate: Float,
    maxComparisonRateManual: Float,
    isRepresentative: Boolean,
  }
`
