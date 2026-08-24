// PLUGIFY layout — Render build compatibility verified
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, ShoppingBag, Menu, X, UserRound, ChevronRight, Mail } from 'lucide-react'

export default function Layout({ children, cartCount, onCartOpen, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const submitSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    onSearch?.(query.trim())
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
    setSearchOpen(false)
    setMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <div className="announcement"><span>FREE DELIVERY IN ACCRA ON SELECT ORDERS</span><b>•</b><span>AUTHENTIC TECH. REAL WARRANTY.</span><b>•</b><span>PAY SECURELY</span></div>
      <header className="navbar">
        <Link to="/" className="brand" aria-label="Plugify home">
          <img className="brand-lockup" src="/assets/plugify-lockup.svg" alt="PLUGIFY" />
        </Link>
        <nav className="desktop-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/shop?category=Phones">Phones</NavLink>
          <NavLink to="/shop?category=Laptops">Laptops</NavLink>
          <NavLink to="/shop?category=Accessories">Accessories</NavLink>
          <NavLink to="/support">Support</NavLink>
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" onClick={() => setSearchOpen(v => !v)} aria-label="Search"><Search size={20}/></button>
          <Link className="icon-btn desktop-only" to="/account" aria-label="Account"><UserRound size={20}/></Link>
          <button className="icon-btn cart-btn" onClick={onCartOpen} aria-label="Cart"><ShoppingBag size={20}/>{cartCount > 0 && <span>{cartCount}</span>}</button>
          <button className="icon-btn mobile-menu-btn" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">{menuOpen ? <X size={21}/> : <Menu size={21}/>}</button>
        </div>
        {searchOpen && (
          <form className="search-popover" onSubmit={submitSearch}>
            <Search size={18}/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search phones, laptops, accessories..."/><button>Search</button>
          </form>
        )}
      </header>

      {menuOpen && <div className="mobile-menu">
        <NavLink onClick={()=>setMenuOpen(false)} to="/">Home <ChevronRight/></NavLink>
        <NavLink onClick={()=>setMenuOpen(false)} to="/shop">Shop all <ChevronRight/></NavLink>
        <NavLink onClick={()=>setMenuOpen(false)} to="/shop?category=Phones">Phones <ChevronRight/></NavLink>
        <NavLink onClick={()=>setMenuOpen(false)} to="/shop?category=Laptops">Laptops <ChevronRight/></NavLink>
        <NavLink onClick={()=>setMenuOpen(false)} to="/shop?category=Audio">Audio <ChevronRight/></NavLink>
        <NavLink onClick={()=>setMenuOpen(false)} to="/shop?category=Accessories">Accessories <ChevronRight/></NavLink>
        <NavLink onClick={()=>setMenuOpen(false)} to="/support">Support <ChevronRight/></NavLink>
      </div>}

      <main>{children}</main>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand"><Link to="/" className="brand"><img className="brand-lockup" src="/assets/plugify-lockup.svg" alt="PLUGIFY"/></Link><p>Premium tech. Seamless access. Limitless possibilities.</p></div>
          <div><h4>Shop</h4><Link to="/shop">All products</Link><Link to="/shop?category=Phones">Phones</Link><Link to="/shop?category=Laptops">Laptops</Link><Link to="/shop?category=Audio">Audio</Link></div>
          <div><h4>Help</h4><Link to="/support">Customer support</Link><Link to="/support#delivery">Delivery</Link><Link to="/support#warranty">Warranty</Link><Link to="/support#returns">Returns</Link></div>
          <div><h4>Stay plugged in</h4><p>New drops, offers and tech worth knowing.</p><form className="newsletter" onSubmit={e=>e.preventDefault()}><input placeholder="Email address"/><button aria-label="Subscribe"><Mail size={18}/></button></form><div className="socials"><span>IG</span><span>FB</span><span>WA</span></div></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} PLUGIFY. All rights reserved.</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div></div>
      </footer>
    </div>
  )
}
