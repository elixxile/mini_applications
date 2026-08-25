import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

try {
  const redirect = sessionStorage.getItem('plugify-spa-redirect')
  if (redirect) {
    sessionStorage.removeItem('plugify-spa-redirect')
    window.history.replaceState(null, '', redirect)
  }
} catch {}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
