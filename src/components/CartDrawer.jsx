import { X, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductVisual from './ProductVisual'

export default function CartDrawer({ open, items, close, changeQty, removeItem }) {
  const total = items.reduce((sum, item)=>sum + item.price * item.qty, 0)
  return <>
    <div className={`cart-overlay ${open ? 'show' : ''}`} onClick={close}/>
    <aside className={`cart-drawer ${open ? 'show' : ''}`}>
      <div className="cart-head"><div><span className="eyebrow">YOUR CART</span><h3>{items.length ? `${items.reduce((n,i)=>n+i.qty,0)} item${items.reduce((n,i)=>n+i.qty,0)>1?'s':''}` : 'Ready when you are'}</h3></div><button className="icon-btn" onClick={close}><X/></button></div>
      <div className="cart-body">
        {items.length === 0 ? <div className="empty-cart"><ShoppingBag size={34}/><h4>Your cart is empty.</h4><p>Find something worth plugging into your setup.</p><Link onClick={close} to="/shop" className="btn primary">Explore tech</Link></div> : items.map(item => <div className="cart-item" key={item.id}>
          <div className="cart-thumb"><ProductVisual type={item.visual} accent={item.accent} image={item.image} alt={item.name} compact/></div>
          <div className="cart-item-copy"><div><span>{item.brand}</span><strong>{item.name}</strong></div><div className="qty-row"><div className="qty"><button onClick={()=>changeQty(item.id,-1)}><Minus/></button><span>{item.qty}</span><button onClick={()=>changeQty(item.id,1)}><Plus/></button></div><button className="remove" onClick={()=>removeItem(item.id)}>Remove</button></div></div>
          <strong className="cart-item-price">GH₵ {(item.price*item.qty).toLocaleString()}</strong>
        </div>)}
      </div>
      {items.length > 0 && <div className="cart-footer"><div className="cart-total"><span>Subtotal</span><strong>GH₵ {total.toLocaleString()}</strong></div><p>Delivery is calculated at checkout.</p><Link onClick={close} to="/checkout" className="btn primary full">Checkout <ArrowRight size={18}/></Link><Link onClick={close} to="/cart" className="text-link centered">View full cart</Link></div>}
    </aside>
  </>
}
