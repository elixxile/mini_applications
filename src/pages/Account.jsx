import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, LockKeyhole, LogOut, Mail, ShieldCheck, UserRound } from 'lucide-react'
import { supabase } from '../lib/supabase'
import '../account.css'

export default function Account({ user }) {
  const [params, setParams] = useSearchParams()
  const [mode, setMode] = useState(params.get('recovery') === '1' ? 'recovery' : 'signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    setEmail(user.email || '')
    supabase.from('profiles').select('full_name, phone').eq('id', user.id).maybeSingle().then(({ data }) => {
      if (data) {
        setProfile(data)
        setFullName(data.full_name || '')
        setPhone(data.phone || '')
      }
    })
  }, [user])

  const initials = useMemo(() => {
    const source = fullName || user?.email || 'P'
    return source.split(/\s|@/).filter(Boolean).slice(0, 2).map(v => v[0]?.toUpperCase()).join('')
  }, [fullName, user])

  const resetFeedback = () => { setError(''); setMessage('') }

  const submitAuth = async (e) => {
    e.preventDefault(); resetFeedback(); setLoading(true)
    try {
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName }, emailRedirectTo: `${window.location.origin}/account` }
        })
        if (signUpError) throw signUpError
        setMessage('Account created. Check your email if confirmation is required, then sign in.')
        setMode('signin')
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) throw signInError
        setMessage('Welcome back to PLUGIFY.')
      }
    } catch (err) { setError(err.message || 'Authentication failed.') }
    finally { setLoading(false) }
  }

  const sendReset = async (e) => {
    e.preventDefault(); resetFeedback(); setLoading(true)
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/account?recovery=1`
    })
    if (resetError) setError(resetError.message)
    else setMessage('Password reset link sent. Check your email.')
    setLoading(false)
  }

  const updatePassword = async (e) => {
    e.preventDefault(); resetFeedback(); setLoading(true)
    const { error: updateError } = await supabase.auth.updateUser({ password })
    if (updateError) setError(updateError.message)
    else {
      setMessage('Password updated successfully.')
      setParams({}, { replace: true })
      setMode('signin')
      setPassword('')
    }
    setLoading(false)
  }

  const saveProfile = async (e) => {
    e.preventDefault(); resetFeedback(); setLoading(true)
    const { error: profileError } = await supabase.from('profiles').upsert({ id: user.id, full_name: fullName, phone })
    if (profileError) setError(profileError.message)
    else { setProfile({ full_name: fullName, phone }); setMessage('Profile updated.') }
    setLoading(false)
  }

  const signOut = async () => { await supabase.auth.signOut() }

  if (mode === 'recovery') return (
    <section className="account-shell section-wrap">
      <div className="auth-card compact-auth">
        <div className="auth-mark"><LockKeyhole /></div>
        <span className="eyebrow yellow">SECURE ACCOUNT</span>
        <h1>Choose a new password.</h1>
        <p>Use at least 8 characters and avoid reusing a password from another service.</p>
        <form onSubmit={updatePassword} className="account-form">
          <label>New password<input required minLength="8" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></label>
          {error && <div className="form-alert error">{error}</div>}
          {message && <div className="form-alert success">{message}</div>}
          <button disabled={loading} className="btn primary full">{loading ? 'Updating…' : 'Update password'}</button>
        </form>
      </div>
    </section>
  )

  if (!user) return (
    <section className="account-shell section-wrap">
      <div className="account-intro">
        <span className="eyebrow yellow">PLUGIFY ACCOUNT</span>
        <h1>Your tech. Your cart. Your account.</h1>
        <p>Sign in to keep your cart synced across devices and make future checkout faster.</p>
        <div className="account-benefits">
          <span><ShieldCheck/> Secure Supabase authentication</span>
          <span><CheckCircle2/> Cloud-synced shopping cart</span>
          <span><UserRound/> Saved customer profile</span>
        </div>
      </div>
      <div className="auth-card">
        <div className="auth-tabs">
          <button className={mode==='signin'?'active':''} onClick={()=>{resetFeedback();setMode('signin')}}>Sign in</button>
          <button className={mode==='signup'?'active':''} onClick={()=>{resetFeedback();setMode('signup')}}>Create account</button>
        </div>
        <form onSubmit={submitAuth} className="account-form">
          {mode === 'signup' && <label>Full name<input required value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Your name" /></label>}
          <label>Email address<div className="input-with-icon"><Mail/><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" /></div></label>
          <label>Password<div className="input-with-icon"><LockKeyhole/><input required minLength="8" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="8+ characters" /></div></label>
          {error && <div className="form-alert error">{error}</div>}
          {message && <div className="form-alert success">{message}</div>}
          <button disabled={loading} className="btn primary full">{loading ? 'Please wait…' : mode === 'signup' ? 'Create PLUGIFY account' : 'Sign in'}</button>
        </form>
        {mode === 'signin' && <button className="forgot-link" onClick={()=>{resetFeedback();setMode('forgot')}}>Forgot your password?</button>}
        {mode === 'forgot' && <form onSubmit={sendReset} className="account-form reset-form"><label>Email address<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} /></label><button disabled={loading} className="btn black full">Send reset link</button><button type="button" className="forgot-link" onClick={()=>setMode('signin')}>Back to sign in</button></form>}
      </div>
    </section>
  )

  return (
    <section className="account-dashboard section-wrap">
      <div className="account-dashboard-head">
        <div className="profile-avatar">{initials}</div>
        <div><span className="eyebrow yellow">SIGNED IN</span><h1>{fullName || 'Your PLUGIFY account'}</h1><p>{user.email}</p></div>
        <button className="btn account-logout" onClick={signOut}><LogOut size={17}/> Sign out</button>
      </div>
      <div className="account-panels">
        <form className="profile-panel" onSubmit={saveProfile}>
          <span className="eyebrow">CUSTOMER PROFILE</span><h2>Your details</h2>
          <div className="account-form two-col">
            <label>Full name<input value={fullName} onChange={e=>setFullName(e.target.value)} /></label>
            <label>Phone number<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+233" /></label>
            <label className="span-2">Email<input disabled value={user.email || ''} /></label>
          </div>
          {error && <div className="form-alert error">{error}</div>}
          {message && <div className="form-alert success">{message}</div>}
          <button disabled={loading} className="btn primary">Save profile</button>
        </form>
        <div className="account-side-panel">
          <ShieldCheck size={30}/><span className="eyebrow yellow">ACCOUNT PROTECTION</span><h2>Secure by default.</h2>
          <p>Your account and cart are protected by Supabase Auth and row-level security. Only you can access your customer data.</p>
          <Link className="text-link" to="/cart">View your synced cart →</Link>
        </div>
      </div>
    </section>
  )
}
