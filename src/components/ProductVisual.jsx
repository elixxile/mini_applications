import { useMemo, useState } from 'react'
import { productImageOverrides } from '../data/productImageOverrides'

export default function ProductVisual({ type = 'phone', accent = '#d8d8d8', compact = false, image, alt = '' }) {
  const [failedUrl, setFailedUrl] = useState('')
  const resolvedImage = useMemo(() => productImageOverrides[alt] || image, [alt, image])
  const useRealImage = Boolean(resolvedImage && resolvedImage !== failedUrl)

  return (
    <div className={`product-visual visual-${type} ${compact ? 'compact' : ''} ${useRealImage ? 'has-real-image' : ''}`} style={{ '--accent': accent }}>
      <div className="visual-glow" />

      {!useRealImage && <>
        {type === 'phone' && <div className="phone-shell"><div className="phone-screen"/><span className="cam c1"/><span className="cam c2"/><span className="cam c3"/></div>}
        {type === 'laptop' && <div className="laptop-shell"><div className="laptop-screen"><div className="screen-line l1"/><div className="screen-line l2"/></div><div className="laptop-base"/></div>}
        {type === 'earbuds' && <div className="earbuds-shell"><span className="bud b1"/><span className="bud b2"/><div className="earbuds-case"/></div>}
        {type === 'headphones' && <div className="headphones-shell"><div className="headband"/><div className="earcup left"/><div className="earcup right"/></div>}
        {type === 'watch' && <div className="watch-shell"><div className="watch-band"/><div className="watch-face"><span>10:09</span></div></div>}
        {type === 'powerbank' && <div className="powerbank-shell"><span className="power-display">87</span><span className="power-port"/></div>}
        {type === 'mouse' && <div className="mouse-shell"><span className="mouse-wheel"/></div>}
        {type === 'keyboard' && <div className="keyboard-shell">{Array.from({length: 24}).map((_,i)=><span key={i}/>)}</div>}
        {type === 'controller' && <div className="controller-shell"><span className="stick s1"/><span className="stick s2"/><span className="pad"/><span className="buttons">••••</span></div>}
        {type === 'ssd' && <div className="ssd-shell"><span className="ssd-mark">T9</span></div>}
      </>}

      {useRealImage && <img
        className="real-product-image"
        src={resolvedImage}
        alt={alt}
        loading={compact ? 'lazy' : 'eager'}
        decoding="async"
        onError={() => setFailedUrl(resolvedImage)}
      />}
    </div>
  )
}
