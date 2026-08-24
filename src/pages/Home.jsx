import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Headphones, Laptop, Smartphone, Cable, Gamepad2, Watch, ShieldCheck, Truck, Zap, RotateCcw } from 'lucide-react'
import ProductVisual from '../components/ProductVisual'
import ProductCard from '../components/ProductCard'
import { categories, products } from '../data/products'

const iconMap = { Smartphone, Laptop, Headphones, Cable, Gamepad2, Watch }

export default function Home({ addToCart }) {
  const featured = products.slice(0, 8)
  const heroProduct = products.find(p => p.id === 'iphone-17-pro-max') || featured[0]
  const phoneOne = products.find(p => p.id === 'iphone-17') || heroProduct
  const phoneTwo = products.find(p => p.id === 'samsung-galaxy-s26-ultra') || featured[1]
  const audioPick = products.find(p => p.id === 'airpods-pro-3') || products.find(p => p.category === 'Audio')
  const powerPick = products.find(p => p.id === 'anker-140w-adapter') || products.find(p => p.brand === 'Anker')

  return (
    <>
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-orb orb-one"/><div className="hero-orb orb-two"/>
        <motion.div className="hero-copy" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.65}}>
          <span className="eyebrow yellow">PREMIUM TECH • GHANA</span>
          <h1>Everything tech.<br/><span>One plug away.</span></h1>
          <p>Phones, laptops, audio, gaming and everyday accessories — curated for performance, authenticity and clean setups.</p>
          <div className="hero-actions"><Link className="btn primary" to="/shop">Shop all tech <ArrowRight size={18}/></Link><Link className="btn ghost" to="/shop?category=Phones">Explore phones</Link></div>
          <div className="hero-trust"><span><BadgeCheck/> Verified products</span><span><ShieldCheck/> Warranty support</span><span><Truck/> Fast delivery</span></div>
        </motion.div>

        <motion.div className="hero-device" initial={{opacity:0,scale:.9,rotate:2}} animate={{opacity:1,scale:1,rotate:0}} transition={{duration:.8,delay:.1}}>
          <div className="hero-chip">PLUGIFY PICK <b>NEW</b></div>
          <Link to={`/product/${heroProduct.id}`} aria-label={heroProduct.name} style={{width:'100%',height:'100%',display:'block'}}>
            <ProductVisual type={heroProduct.visual} accent={heroProduct.accent} image={heroProduct.image} alt={heroProduct.name} />
          </Link>
          <div className="floating-card fc1"><small>FLAGSHIP</small><strong>{heroProduct.name}</strong></div>
          <div className="floating-card fc2"><small>FROM</small><strong>GH₵ {heroProduct.price.toLocaleString()}</strong></div>
        </motion.div>
        <div className="hero-index">01 <span>/ 04</span></div>
      </section>

      <section className="category-strip section-wrap">
        <div className="section-heading compact-heading"><div><span className="eyebrow">SHOP BY CATEGORY</span><h2>Find your next upgrade.</h2></div><Link className="text-link" to="/shop">View everything <ArrowRight size={15}/></Link></div>
        <div className="category-grid">
          {categories.map(c => { const Icon = iconMap[c.icon]; return <Link to={`/shop?category=${c.name}`} className="category-card" key={c.name}><div className="category-icon"><Icon/></div><div><strong>{c.name}</strong><span>{c.subtitle}</span></div><ArrowRight className="category-arrow"/></Link>})}
        </div>
      </section>

      <section className="dark-section">
        <div className="section-wrap">
          <div className="section-heading"><div><span className="eyebrow yellow">TRENDING NOW</span><h2>Tech people are plugging into.</h2></div><p>Strong performers, clean essentials and the devices currently moving fastest.</p></div>
          <div className="product-grid">{featured.map(p=><ProductCard key={p.id} product={p} addToCart={addToCart}/>)}</div>
          <div className="center-cta"><Link className="btn outline" to="/shop">View full catalogue <ArrowRight size={17}/></Link></div>
        </div>
      </section>

      <section className="editorial-duo section-wrap">
        <article className="feature-panel yellow-panel">
          <div className="feature-copy"><span className="eyebrow">PLUGIFY MOBILE</span><h2>Your next phone should feel like an upgrade.</h2><p>Flagship cameras, faster chips and devices built to stay useful long after unboxing.</p><Link to="/shop?category=Phones" className="btn black">Shop phones <ArrowRight size={17}/></Link></div>
          <div className="feature-visual two-phones">
            <ProductVisual type={phoneOne.visual} accent={phoneOne.accent} image={phoneOne.image} alt={phoneOne.name}/>
            <ProductVisual type={phoneTwo.visual} accent={phoneTwo.accent} image={phoneTwo.image} alt={phoneTwo.name}/>
          </div>
        </article>

        <article className="feature-panel black-panel">
          <div className="feature-copy"><span className="eyebrow yellow">SETUP ESSENTIALS</span><h2>Small gear. Massive difference.</h2><p>Power, audio and desk accessories selected to make your everyday setup cleaner and faster.</p><Link to="/shop?category=Accessories" className="btn ghost-light">Build your setup <ArrowRight size={17}/></Link></div>
          <div className="feature-visual combo">
            {audioPick && <ProductVisual type={audioPick.visual} accent={audioPick.accent} image={audioPick.image} alt={audioPick.name}/>} 
            {powerPick && <ProductVisual type={powerPick.visual} accent={powerPick.accent} image={powerPick.image} alt={powerPick.name}/>} 
          </div>
        </article>
      </section>

      <section className="benefit-band">
        <div><Zap/><strong>Fast sourcing</strong><span>Popular tech, without the endless search.</span></div>
        <div><BadgeCheck/><strong>Authenticity first</strong><span>Products checked before they reach you.</span></div>
        <div><Truck/><strong>Reliable delivery</strong><span>Clear updates from order to doorstep.</span></div>
        <div><RotateCcw/><strong>Support after purchase</strong><span>We stay useful after checkout.</span></div>
      </section>

      <section className="brand-story section-wrap">
        <div className="brand-story-logo"><img src="/assets/plugify-mark.svg" alt="Plugify mark"/></div>
        <div><span className="eyebrow yellow">THE PLUGIFY STANDARD</span><h2>Tech shopping should feel sharp, trusted and uncomplicated.</h2><p>We built PLUGIFY around the idea that buying technology should be exciting — not confusing. Clear products, premium presentation, responsive support and a catalogue that grows with how people actually use tech.</p><Link className="text-link light" to="/support">How we support you <ArrowRight size={15}/></Link></div>
      </section>
    </>
  )
}
