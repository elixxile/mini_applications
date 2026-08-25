import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, KeyRound, LogOut, Mail, RefreshCcw, ShieldCheck, UserRound } from 'lucide-react'
import { supabase } from '../lib/supabase'
import '../account.css'

export default function Account({ user }) {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('email')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    setEmail(user.email || '')
    supabase.from('profiles').select('full_name, phone').eq('id', user.id).maybeSingle().then(({ data }) => {
      if (data) {
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

  const sendOtp = async (e) => {
    e?.preventDefault()
    resetFeedback()
    setLoading(true)
    const normalizedEmail = email.trim().toLowerCase()
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: normalizedEmail,
      options: { shouldCreateUser: true }
    })
    if (otpError) {
      setError(otpError.message || 'We could not send your PLUGIFY code.')
    } else {
      setEmail(normalizedEmail)
      setStep('otp')
      setOtp('')
      setMessage(`We sent a 6-digit PLUGIFY verification code to ${normalizedEmail}.`)
    }
    setLoading(false)
  }

  const verifyOtp = async (e) => {
    e.preventDefault()
    resetFeedback()
    const code = otp.replace(/\D/g, '').slice(0, 6)
    if (code.length !== 6) {
      setError('Enter the 6-digit code from your email.')
      return
    }
    setLoading(true)
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: code,
      type: 'email'
    })
    if (verifyError) setError('That code is invalid or has expired. Request a new one and try again.')
    else {
      setMessage('Verified. Welcome to PLUGIFY.')
      setOtp('')
    }
    setLoading(false)
  }

  const saveProfile = async (e) => {
    e.preventDefault(); resetFeedback(); setLoading(true)
    const { error: profileError } = await supabase.from('profiles').upsert({ id: user.id, full_name: fullName, phone })
    if (profileError) setError(profileError.message)
    else setMessage('Profile updated.')
    setLoading(false)
  }

  const signOut = async () => { await supabase.auth.signOut() }

  if (!user) return (
    <section className="account-shell section-wrap">
      <div className="account-intro">
        <span className="eyebrow yellow">PLUGIFY ACCOUNT</span>
        <h1>Your tech. Your cart. One secure code.</h1>
        <p>No password to remember. Enter your email and PLUGIFY sends a one-time verification code directly to your inbox.</p>
        <div className="account-benefits">
          <span><ShieldCheck/> Secure passwordless sign-in</span>
          <span><CheckCircle2/> Cloud-synced shopping cart</span>
          <span><UserRound/> Saved customer profile</span>
        </div>
      </div>

      <div className="auth-card">
        {step === 'email' ? <>
          <div className="auth-mark"><Mail /></div>
          <span className="eyebrow yellow">EMAIL VERIFICATION</span>
          <h2>Sign in or create your account.</h2>
          <p>Enter your email. We’ll send a private 6-digit PLUGIFY code.</p>
          <form onSubmit={sendOtp} className="account-form">
            <label>Email address<div className="input-with-icon"><Mail/><input autoFocus required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" /></div></label>
            {error && <div className="form-alert error">{error}</div>}
            {message && <div className="form-alert success">{message}</div>}
            <button disabled={loading} className="btn primary full">{loading ? 'Sending code…' : 'Send verification code'}</button>
          </form>
        </> : <>
          <div className="auth-mark"><KeyRound /></div>
          <span className="eyebrow yellow">CHECK YOUR EMAIL</span>
          <h2>Enter your 6-digit code.</h2>
          <p>We sent it to <strong>{email}</strong>. Keep this page open while you check your inbox.</p>
          <form onSubmit={verifyOtp} className="account-form">
            <label>Verification code<input className="otp-input" autoFocus required inputMode="numeric" autoComplete="one-time-code" maxLength="6" value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="000000" /></label>
            {error && <div className="form-alert error">{error}</div>}
            {message && <div className="form-alert success">{message}</div>}
            <button disabled={loading || otp.length !== 6} className="btn primary full">{loading ? 'Verifying…' : 'Verify & continue'}</button>
          </form>
          <div className="otp-actions">
            <button disabled={loading} className="forgot-link" onClick={sendOtp}><RefreshCcw size={14}/> Resend code</button>
            <button className="forgot-link" onClick={()=>{resetFeedback();setStep('email');setOtp('')}}>Use another email</button>
          </div>
        </>}
      </div>
    </section>
  )

  return (
    <section className="account-dashboard section-wrap">
      <div className="account-dashboard-head">
        <div className="profile-avatar">{initials}</div>
        <div><span className="eyebrow yellow">VERIFIED CUSTOMER</span><h1>{fullName || 'Your PLUGIFY account'}</h1><p>{user.email}</p></div>
        <button className="btn account-logout" onClick={signOut}><LogOut size={17}/> Sign out</button>
      </div>
      <div className="account-panels">
        <form className="profile-panel" onSubmit={saveProfile}>
          <span className="eyebrow">CUSTOMER PROFILE</span><h2>Your details</h2>
          <div className="account-form two-col">
            <label>Full name<input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Your full name" /></label>
            <label>Phone number<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+233" /></label>
            <label className="span-2">Verified email<input disabled value={user.email || ''} /></label>
          </div>
          {error && <div className="form-alert error">{error}</div>}
          {message && <div className="form-alert success">{message}</div>}
          <button disabled={loading} className="btn primary">Save profile</button>
        </form>
        <div className="account-side-panel">
          <ShieldCheck size={30}/><span className="eyebrow yellow">ACCOUNT PROTECTION</span><h2>Passwordless by design.</h2>
          <p>PLUGIFY verifies access with a one-time email code. Your profile and cart remain protected by Supabase Auth and row-level security.</p>
          <Link className="text-link" to="/cart">View your synced cart →</Link>
        </div>
      </div>
    </section>
  )
}
