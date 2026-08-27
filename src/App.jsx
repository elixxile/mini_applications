import { useEffect, useMemo, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Support from './pages/Support'
import CartPage from './pages/CartPage'
import Checkout from './pages/Checkout'
import Account from './pages/Account'
import StaticPage from './pages/StaticPage'
import { products } from './data/catalog'
import { supabase } from './lib/supabase'

const GUEST_CART_KEY = 'plugify-cart'

const readGuestCart = () => {
  try { return JSON.parse(localStorage.getItem(GUEST_CART_KEY)) || [] }
  catch { return [] }
}

const productMap = new Map(products.map(product => [product.id, product]))

export default function App(){
  const [cart,setCart]=useState(readGuestCart)
  const [cartOpen,setCartOpen]=useState(false)
  const [user,setUser]=useState(null)
  const [authReady,setAuthReady]=useState(false)

  const loadUserCart = async (activeUser) => {
    const guestCart = readGuestCart()
    const { data: rows, error } = await supabase
      .from('cart_items')
      .select('product_id, quantity')
      .eq('user_id', activeUser.id)

    if (error) {
      console.error('Unable to load PLUGIFY cart', error)
      setCart(guestCart)
      return
    }

    const quantities = new Map((rows || []).map(row => [row.product_id, row.quantity]))
    for (const item of guestCart) {
      quantities.set(item.id, Math.min(99, (quantities.get(item.id) || 0) + (item.qty || 1)))
    }

    const merged = [...quantities.entries()]
      .map(([id, qty]) => productMap.get(id) ? { ...productMap.get(id), qty } : null)
      .filter(Boolean)

    if (guestCart.length) {
      const payload = merged.map(item => ({ user_id: activeUser.id, product_id: item.id, quantity: item.qty }))
      const { error: mergeError } = await supabase.from('cart_items').upsert(payload, { onConflict: 'user_id,product_id' })
      if (!mergeError) localStorage.removeItem(GUEST_CART_KEY)
      else console.error('Unable to merge guest cart', mergeError)
    }

    setCart(merged)
  }

  useEffect(()=>{
    let mounted = true
    const applySession = async (session) => {
      if (!mounted) return
      const activeUser = session?.user || null
      setUser(activeUser)
      if (activeUser) await loadUserCart(activeUser)
      else setCart(readGuestCart())
      if (mounted) setAuthReady(true)
    }

    supabase.auth.getSession().then(({ data }) => applySession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => { applySession(session) })
    return () => { mounted = false; listener.subscription.unsubscribe() }
  },[])

  useEffect(()=>{
    if (authReady && !user) localStorage.setItem(GUEST_CART_KEY,JSON.stringify(cart))
  },[cart,user,authReady])

  const cartCount=useMemo(()=>cart.reduce((s,i)=>s+i.qty,0),[cart])

  const saveQuantity = (productId, quantity) => {
    if (!user) return
    supabase.from('cart_items').upsert({ user_id:user.id, product_id:productId, quantity }, { onConflict:'user_id,product_id' })
      .then(({ error }) => { if (error) console.error('Unable to sync cart item', error) })
  }

  const addToCart=product=>{
    setCart(items=>{
      const hit=items.find(i=>i.id===product.id)
      const quantity=Math.min(99,(hit?.qty || 0)+1)
      const next=hit?items.map(i=>i.id===product.id?{...i,qty:quantity}:i):[...items,{...product,qty:1}]
      saveQuantity(product.id,quantity)
      return next
    })
    setCartOpen(true)
  }

  const changeQty=(id,delta)=>setCart(items=>items.map(i=>{
    if(i.id!==id) return i
    const quantity=Math.max(1,Math.min(99,i.qty+delta))
    saveQuantity(id,quantity)
    return {...i,qty:quantity}
  }))

  const removeItem=id=>{
    setCart(items=>items.filter(i=>i.id!==id))
    if(user) supabase.from('cart_items').delete().eq('user_id',user.id).eq('product_id',id)
      .then(({ error })=>{if(error) console.error('Unable to remove cart item',error)})
  }

  const clearCart=()=>{
    setCart([])
    if(user) supabase.from('cart_items').delete().eq('user_id',user.id)
      .then(({ error })=>{if(error) console.error('Unable to clear cart',error)})
    else localStorage.removeItem(GUEST_CART_KEY)
  }

  return <Layout cartCount={cartCount} onCartOpen={()=>setCartOpen(true)} user={user} authReady={authReady}>
    <Routes>
      <Route path="/" element={<Home addToCart={addToCart}/>}/>
      <Route path="/shop" element={<Shop addToCart={addToCart}/>}/>
      <Route path="/product/:id" element={<Product addToCart={addToCart}/>}/>
      <Route path="/support" element={<Support/>}/>
      <Route path="/cart" element={<CartPage items={cart} changeQty={changeQty} removeItem={removeItem}/>}/>
      <Route path="/checkout" element={<Checkout items={cart} user={user}/>}/>
      <Route path="/account" element={<Account user={user}/>}/>
      <Route path="/privacy" element={<StaticPage title="Privacy policy."/>}/>
      <Route path="/terms" element={<StaticPage title="Terms & conditions."/>}/>
      <Route path="*" element={<StaticPage title="That page isn’t plugged in yet."/>}/>
    </Routes>
    <CartDrawer open={cartOpen} items={cart} close={()=>setCartOpen(false)} changeQty={changeQty} removeItem={removeItem}/>
  </Layout>
}
