import { products as baseProducts, categories } from './products'
import { extraProducts } from './products-extra'
import { extraProducts2 } from './products-extra-2'
import { productPatches } from './product-patches'

const mergedProducts = [...baseProducts, ...extraProducts, ...extraProducts2]

export const products = mergedProducts.map(product => {
  const patch = productPatches[product.id]
  if (!patch) return product

  const next = { ...product, ...patch }
  if (patch.oldPrice === undefined) delete next.oldPrice
  if (patch.badge === undefined) delete next.badge
  return next
})

export { categories }
