
const company = {
  title: 'Company',
  key: 'company',
  component: 'Company',
}

const product = {
  title: 'Product',
  key: 'product',
  component: 'Product',
}

const advertisedRate = {
  title: 'Advertised Rate',
  key: 'advertised-rate',
  component: 'AdvertisedRate',
  tooltip: `This is the interest rate published by the lender. Rates 'from' indicates that it is a minimum rate and most borrowers will pay higher based on your credit profile and other factors. 'Headline rate' indicates that this is an indicative rate from the lender and actual rates may be higher or lower based on your credit profile and other factors.`,
  sortBy: 'minRate',
  sortDirection: 'asc',
}

const comparisonRate = {
  title: 'Comparison Rate',
  key: 'comparison-rate',
  component: 'ComparisonRate',
  tooltip: 'The comparison rate is a way of comparing loans by including both the advertised rate and the fees involved. It is calculated based on a loan of $30,000 over 5 years, and represents the effective rate on the loan. The comparison rate applies only to the example given. Different amounts and terms will result in different comparison rates.',
  description: 'Comparison rates are not required for revolving credit products such as overdrafts and line of credits, as these products are not paid down gradually like a normal loan, which means the fees have a different impact on the overall cost of the loan. WARNING: This comparison rate is true only for the example given and may not include all fees and charges. Different terms, fees or other loan amounts might result in a different comparison rate.',
  sortBy: 'comparisonRate',
  sortDirection: 'asc',
}

const monthlyRepayment = {
  title: 'Monthly Repayment',
  key: 'monthly-repayment',
  component: 'MonthlyRepayment',
  tooltip: 'Initial monthly repayment excludes fees and is an estimate based on advertised rate, loan amount of $30,000 and a loan term of 5 years. Actual repayments may vary based on your individual circumstances and interest rate changes.',
}

const upfrontFee = {
  title: 'Upfront Fee',
  key: 'upfront-fee',
  component: 'UpfrontFee',
  tooltip: 'This is the cost that you will get charged to set up the loan.',
  formatter: 'text',
  getter: (p, v) => p.upfrontFees(v),
}

const loanAmount = {
  title: 'Loan amount',
  key: 'loan-amount',
  component: 'LoanAmount',
}

const totalRepayments = {
  title: 'Total Repayments',
  key: 'total-repayments',
  component: 'TotalRepayments',
  formatter: 'currency',
  getter: (p, v) => p.totalRepayments(v),
}

const goToSite = {
  title: 'Go to site',
  key: 'go-to-site',
  component: 'GoToSite',
  tooltip: `RateCity may receive remuneration for referrals to these links
    and/or as a consequence of a consumer acquiring a credit product
    after following these links. Enquire Now, View Now, Apply Now and similar
    wording indicates the results of clicking different links.`,
}

const newCar = {
  title: 'New Car',
  key: 'new-car',
  formatter: 'boolean',
  getter: p => p.isNewCarAllowed,
}

const missedPaymentPenalty = {
  title: 'Missed Payment Penalty',
  key: 'missed-payment-penalty',
  formatter: 'currency',
  getter: p => p.missedPaymentPenalty,
}

const usedCar = {
  title: 'Used Car',
  key: 'used-car',
  formatter: 'boolean',
  getter: p => p.isUsedCarAllowed,
}

const redrawActivationFee = {
  title: 'Redraw Activation Fee',
  key: 'redraw-activation-fee',
  tooltip: 'This is the cost that you will get charged to redraw any additional repayment on the loan.',
  formatter: 'currency',
  getter: p => p.redrawActivationFee,
}

const repaymentType = {
  title: 'Repayment Type',
  key: 'repayment-type',
  tooltip: 'A variable rate can fluctuate over the life of a loan as determined by your lender. A fixed rate is one which is set for a period of time, regardless of market fluctuations.',
  formatter: 'text',
  getter: p => p.repaymentType,
}

const earlyExitPenaltyFee = {
  title: 'Early Exit Penalty Fee',
  key: 'early-exit-penalty-fee',
  tooltip: 'This is the cost that you will get charged if you repay your loan early. In some cases, it only applies for a set period, after this there is no fee.',
  formatter: 'text',
  getter: p => p.earlyExitPenaltyFee,
}

const loanType = {
  title: 'Loan Type',
  key: 'loan-type',
  tooltip: 'A secured loan is protected by an asset and protects the lender if a default happens. An unsecured loan is unprotected and more risky for the lender.',
  formatter: 'text',
  getter: p => p.securedType,
}

const borrowingRange = {
  title: 'Borrowing range',
  key: 'borrowing-range',
  formatter: 'text',
  getter: (p, v) => p.borrowingRange(v),
}

const securedByVehicle = {
  title: 'Secured By Vehicle',
  key: 'secured-by-vehicle',
  formatter: 'boolean',
  getter: p => p.isSecuredByVehicle,
}

const availableTo457VisaHolders = {
  title: 'Available to 457 Visa Holders',
  key: 'available-to-457-visa-holders',
  formatter: 'boolean',
  getter: p => p.availableTo457VisaHolders,
}

const redrawFacility = {
  title: 'Redraw Facility',
  tooltip: 'This loan allows you to redraw any additional repayments that you have made.',
  key: 'redraw-facility',
  formatter: 'boolean',
  getter: p => p.hasRedrawFacility,
}

const extraRepayments = {
  title: 'Extra Repayments',
  tooltip: 'This loan allows you to make extra repayments on the loan. Paying extra will save you interest and pay your loan off quicker. In some cases there may be limits or fees that apply.',
  key: 'extra-repayments-allowed',
  formatter: 'boolean',
  getter: p => p.isExtraRepaymentsAllowed,
}

const landing = [
  company,
  product,
  advertisedRate,
  comparisonRate,
  monthlyRepayment,
  upfrontFee,
  loanAmount,
  totalRepayments,
  goToSite,
]

const details = [
  newCar, missedPaymentPenalty, usedCar, redrawActivationFee, upfrontFee, repaymentType,
  earlyExitPenaltyFee, loanType, borrowingRange, securedByVehicle, totalRepayments, availableTo457VisaHolders,
  redrawFacility, extraRepayments,
]

export default {
  landing,
  details,
}
