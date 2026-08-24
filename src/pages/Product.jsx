import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Check, Minus, Plus, ShieldCheck, Star, Truck, RotateCcw, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { products } from '../data/products'
import ProductVisual from '../components/ProductVisual'
import ProductCard from '../components/ProductCard'

export default function Product({ addToCart }) {
  const { id } = useParams()
  const product = products.find(p=>p.id===id)
  const [qty,setQty]=useState(1)
  if (!product) return <div className="section-wrap not-found"><h1>Product not found.</h1><Link to="/shop" className="btn primary">Back to shop</Link></div>
  const related = products.filter(p=>p.category===product.category && p.id!==product.id).slice(0,4)
  return <>
    <section className="product-page section-wrap">
      <Link className="back-link" to="/shop"><ArrowLeft/> Back to catalogue</Link>
      <div className="product-detail-grid">
        <div className="product-gallery">
          <div className="main-product-visual"><span className="product-badge big">{product.badge}</span><ProductVisual type={product.visual} accent={product.accent}/></div>
          <div className="gallery-tabs"><button className="active">01</button><button>02</button><button>03</button></div>
        </div>
        <div className="product-copy">
          <span className="eyebrow yellow">{product.brand} • {product.category}</span>
          <h1>{product.name}</h1>
          <div className="detail-rating"><span><Star fill="currentColor"/> {product.rating}</span><span>{product.reviews} verified reviews</span></div>
          <p className="detail-desc">{product.description}</p>
          <div className="detail-price"><strong>GH₵ {product.price.toLocaleString()}</strong>{product.oldPrice&&<del>GH₵ {product.oldPrice.toLocaleString()}</del>}</div>
          <div className="color-row"><span>Finish</span><button className="color-choice"><i style={{background:product.accent}}/>{product.color}<Check/></button></div>
          <ul className="spec-list">{product.specs.map(s=><li key={s}><Check/> {s}</li>)}</ul>
          <div className="purchase-row"><div className="qty detail"><button onClick={()=>setQty(Math.max(1,qty-1))}><Minus/></button><span>{qty}</span><button onClick={()=>setQty(qty+1)}><Plus/></button></div><button className="btn primary grow" onClick={()=>{for(let i=0;i<qty;i++)addToCart(product)}}><ShoppingBag/> Add to cart</button></div>
          <div className="product-assurance"><div><Truck/><span><strong>Delivery across Ghana</strong><small>Estimated at checkout</small></span></div><div><ShieldCheck/><span><strong>Warranty support</strong><small>Coverage varies by product</small></span></div><div><RotateCcw/><span><strong>Purchase support</strong><small>Help when something isn’t right</small></span></div></div>
        </div>
      </div>
    </section>
    {related.length>0 && <section className="dark-section"><div className="section-wrap"><div className="section-heading"><div><span className="eyebrow yellow">YOU MAY ALSO LIKE</span><h2>More in {product.category}.</h2></div></div><div className="product-grid">{related.map(p=><ProductCard key={p.id} product={p} addToCart={addToCart}/>)}</div></div></section>}
  </>
}
