import { Mail, MessageCircle, Phone, ShieldCheck, Truck, RotateCcw, Search } from 'lucide-react'

export default function Support(){
  return <div className="support-page">
    <section className="support-hero section-wrap"><span className="eyebrow yellow">PLUGIFY SUPPORT</span><h1>Useful help. No runaround.</h1><p>Questions about a product, delivery, warranty or your order? Start here.</p><div className="support-search"><Search/><input placeholder="What do you need help with?"/></div></section>
    <section className="section-wrap support-grid">
      <article><MessageCircle/><h3>Chat with us</h3><p>Best for product questions, availability and order updates.</p><a href="#contact">Start a conversation →</a></article>
      <article><Mail/><h3>Email support</h3><p>For detailed order, warranty and after-sales requests.</p><a href="mailto:hello@plugify.store">hello@plugify.store →</a></article>
      <article><Phone/><h3>Call support</h3><p>Need a quicker answer? Add your official support line before launch.</p><span>Phone number coming soon</span></article>
    </section>
    <section className="section-wrap support-sections">
      <div id="delivery"><Truck/><div><span className="eyebrow">DELIVERY</span><h2>Clear delivery expectations.</h2><p>Delivery cost and estimated arrival are confirmed during checkout. Same-day or next-day delivery can be offered for eligible products and locations when available.</p></div></div>
      <div id="warranty"><ShieldCheck/><div><span className="eyebrow">WARRANTY</span><h2>Support beyond unboxing.</h2><p>Warranty terms differ by product and supplier. PLUGIFY should always display the applicable coverage on the product or order record before the customer completes checkout.</p></div></div>
      <div id="returns"><RotateCcw/><div><span className="eyebrow">RETURNS</span><h2>A process customers can understand.</h2><p>Unopened items and verified defective products can be handled under the store return policy. Final production policy should include exact windows, eligibility and exclusions.</p></div></div>
    </section>
  </div>
}
