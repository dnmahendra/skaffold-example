import concat from 'lodash/concat'

export default function shareOfVoiceProductSelector (productsPerOrder) {
  let shareOfVoiceProducts = []

  // iterate over collection to decide which product to promote basing on order
  for (const order in productsPerOrder) {
    if (productsPerOrder[order].count === 1) {
      shareOfVoiceProducts = concat(shareOfVoiceProducts, productsPerOrder[order].products)
    } else {
      const totalCount = productsPerOrder[order].products.reduce((seed, product) => (
        product.shareOfVoiceValue !== ''
          ? seed + product.count
          : seed
      ), 0)

      if (totalCount === 0) {
        shareOfVoiceProducts.push(productsPerOrder[order].products[0])
      } else {
        const statsObj = productsPerOrder[order].products.map(product => {
          const shareAt = product.shareOfVoiceType === 'count'
            ? product.count
            : parseFloat(((product.count / totalCount) * 100).toFixed(2))

          return parseFloat(product.shareOfVoiceValue) > shareAt ? product : null
        }).filter(product => product !== null)

        if (statsObj.length > 0) {
          shareOfVoiceProducts.push(statsObj[0])
        } else {
          shareOfVoiceProducts.push(productsPerOrder[order].products[0])
        }
      }
    }
  }

  return shareOfVoiceProducts
}
