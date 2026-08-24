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
import StaticPage from './pages/StaticPage'

export default function App(){
 const [cart,setCart]=useState(()=>{try{return JSON.parse(localStorage.getItem('plugify-cart'))||[]}catch{return[]}})
 const [cartOpen,setCartOpen]=useState(false)
 useEffect(()=>localStorage.setItem('plugify-cart',JSON.stringify(cart)),[cart])
 const cartCount=useMemo(()=>cart.reduce((s,i)=>s+i.qty,0),[cart])
 const addToCart=product=>{setCart(items=>{const hit=items.find(i=>i.id===product.id);return hit?items.map(i=>i.id===product.id?{...i,qty:i.qty+1}:i):[...items,{...product,qty:1}]});setCartOpen(true)}
 const changeQty=(id,delta)=>setCart(items=>items.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+delta)}:i))
 const removeItem=id=>setCart(items=>items.filter(i=>i.id!==id))
 const clearCart=()=>setCart([])
 return <Layout cartCount={cartCount} onCartOpen={()=>setCartOpen(true)}><Routes><Route path="/" element={<Home addToCart={addToCart}/>}/><Route path="/shop" element={<Shop addToCart={addToCart}/>}/><Route path="/product/:id" element={<Product addToCart={addToCart}/>}/><Route path="/support" element={<Support/>}/><Route path="/cart" element={<CartPage items={cart} changeQty={changeQty} removeItem={removeItem}/>}/><Route path="/checkout" element={<Checkout items={cart} clearCart={clearCart}/>}/><Route path="/account" element={<StaticPage title="Your PLUGIFY account."/>}/><Route path="/privacy" element={<StaticPage title="Privacy policy."/>}/><Route path="/terms" element={<StaticPage title="Terms & conditions."/>}/><Route path="*" element={<StaticPage title="That page isn’t plugged in yet."/>}/></Routes><CartDrawer open={cartOpen} items={cart} close={()=>setCartOpen(false)} changeQty={changeQty} removeItem={removeItem}/></Layout>
}
