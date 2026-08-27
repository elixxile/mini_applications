import { products as baseProducts, categories } from './products'
import { extraProducts } from './products-extra'

export const products = [...baseProducts, ...extraProducts]
export { categories }
