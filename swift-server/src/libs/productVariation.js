const productVariation = (variations, loanTerm, borrowAmount, defaultVariationIndex) => {
  if (!borrowAmount && !loanTerm) {
    return variations[defaultVariationIndex]
  }
  const v = variations.filter((variation) => {
    let valid = true
    if (loanTerm) {
      if (variation.minLoanTerm > loanTerm || variation.loanTerm < loanTerm) {
        valid = false
      }
    }
    if (borrowAmount) {
      if (variation.minLoanAmount > borrowAmount || variation.maxLoanAmount < borrowAmount) {
        valid = false
      }
    }
    return valid
  })
  return v[0] || variations[defaultVariationIndex]
}

export default productVariation
