import { Heart, ShoppingBag, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductVisual from './ProductVisual'

export default function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <div className="product-media">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className="wishlist" aria-label="Save"><Heart size={18}/></button>
        <Link to={`/product/${product.id}`}><ProductVisual type={product.visual} accent={product.accent} compact /></Link>
      </div>
      <div className="product-info">
        <div className="product-meta"><span>{product.brand}</span><span className="rating"><Star size={13} fill="currentColor"/> {product.rating}</span></div>
        <Link className="product-name" to={`/product/${product.id}`}>{product.name}</Link>
        <p className="product-desc">{product.description}</p>
        <div className="product-bottom">
          <div className="price-wrap"><strong>GH₵ {product.price.toLocaleString()}</strong>{product.oldPrice && <del>GH₵ {product.oldPrice.toLocaleString()}</del>}</div>
          <button className="quick-add" onClick={()=>addToCart(product)} aria-label={`Add ${product.name} to cart`}><ShoppingBag size={18}/></button>
        </div>
      </div>
    </article>
  )
}
