export const tooltips = (vertical) => {
  const tooltip = {
    'home-loans': `Choose your preferred sort order for the search results.
      The Default Sort is the order products appear in the table before
      any sorting or filtering is done by you to better match the results to your requirements.
      It is based on a variety of factors, including the product’s Real Time Rating™,
      the popularity of the lender, the availability of a direct link to lender sites,
      and other commercial factors
      (see also <a href="/how-we-make-money" target="_blank">how we make money</a>).
      We encourage you to filter and sort the products accordingly to your needs, to assist in your
      product research and product comparison.`,
  }
  return tooltip[vertical] || `Choose your preferred sort order for the search results. The Default Sort is the
    order products appear in the table before any sorting or filtering is done by you to better match the
    results to your requirements. It is based on a variety of factors, including the product’s rates and
    fees, the popularity of the lender, the availability of a direct link to lender sites, and other commercial
    factors (see also <a href="/how-we-make-money" target="_blank">how we make money</a>). We encourage you to filter and sort the products accordingly to
    your needs, to assist in your product research and product comparison.`
}
