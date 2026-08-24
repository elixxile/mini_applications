import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function Shop({ addToCart }) {
  const [params, setParams] = useSearchParams()
  const initialCategory = params.get('category') || 'All'
  const initialQuery = params.get('q') || ''
  const [category, setCategory] = useState(initialCategory)
  const [query, setQuery] = useState(initialQuery)
  const [sort, setSort] = useState('featured')
  const categories = ['All', ...new Set(products.map(p=>p.category))]

  const filtered = useMemo(()=>{
    let data = products.filter(p => category === 'All' || p.category === category)
    if (query.trim()) {
      const q = query.toLowerCase()
      data = data.filter(p => `${p.name} ${p.brand} ${p.category} ${p.description}`.toLowerCase().includes(q))
    }
    if (sort === 'low') data = [...data].sort((a,b)=>a.price-b.price)
    if (sort === 'high') data = [...data].sort((a,b)=>b.price-a.price)
    if (sort === 'rating') data = [...data].sort((a,b)=>b.rating-a.rating)
    return data
  },[category, query, sort])

  const chooseCategory = c => {
    setCategory(c)
    const next = new URLSearchParams(params)
    if (c === 'All') next.delete('category'); else next.set('category',c)
    setParams(next, { replace: true })
  }

  return <div className="shop-page">
    <section className="shop-hero section-wrap"><span className="eyebrow yellow">PLUGIFY CATALOGUE</span><h1>Find the tech that fits.</h1><p>From flagship devices to the accessories that complete your setup.</p></section>
    <section className="section-wrap shop-layout">
      <aside className="filters">
        <div className="filter-title"><SlidersHorizontal/><strong>Filters</strong></div>
        <div className="filter-group"><span>Category</span>{categories.map(c=><button className={category===c?'active':''} key={c} onClick={()=>chooseCategory(c)}>{c}<em>{c==='All'?products.length:products.filter(p=>p.category===c).length}</em></button>)}</div>
        <div className="filter-note"><strong>Need help choosing?</strong><p>Tell us what you use your tech for and we’ll narrow it down.</p><a href="/support">Talk to support →</a></div>
      </aside>
      <div className="shop-results">
        <div className="shop-toolbar">
          <div className="search-field"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..."/>{query&&<button onClick={()=>setQuery('')}><X/></button>}</div>
          <div className="result-count">{filtered.length} products</div>
          <select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="rating">Top rated</option></select>
        </div>
        {filtered.length ? <div className="product-grid shop-grid">{filtered.map(p=><ProductCard key={p.id} product={p} addToCart={addToCart}/>)}</div> : <div className="no-results"><h3>No matching tech found.</h3><p>Try a different product name or category.</p></div>}
      </div>
    </section>
  </div>
}
