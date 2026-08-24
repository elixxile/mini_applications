import { useState } from 'react'

export default function ProductVisual({ type = 'phone', accent = '#d8d8d8', compact = false, image, alt = '' }) {
  const [imageFailed, setImageFailed] = useState(false)
  const useRealImage = Boolean(image && !imageFailed)

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
        src={image}
        alt={alt}
        loading={compact ? 'lazy' : 'eager'}
        decoding="async"
        onError={() => setImageFailed(true)}
        style={{
          position:'absolute',
          inset: compact ? '8%' : '4%',
          width: compact ? '84%' : '92%',
          height: compact ? '84%' : '92%',
          objectFit:'contain',
          zIndex:2,
          filter:'drop-shadow(0 22px 28px rgba(0,0,0,.22))'
        }}
      />}
    </div>
  )
}
