
// comparisonRate should be as whole number, e.g. 7.5% p.a. would be 7.5
// assumes 12 repayments and 12 interest calculations a year
export function calculateMonthlyRepayment (loanAmount, loanTermYears, interestRate) {
  const annualFrequency = 12.0
  const rate = (interestRate / 100) / annualFrequency
  const termPeriods = loanTermYears * annualFrequency
  return loanAmount * rate / (1 - (Math.pow(1 / (1 + rate), termPeriods)))
}
