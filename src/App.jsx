import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MiniBook from './pages/Minibook'
import './App.css'
import FireworksSplash from './components/fireworksSplash'

const Stars = () => (
  <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
    {[...Array(80)].map((_, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          borderRadius: '50%',
          background: '#fff',
          opacity: Math.random() * 0.7 + 0.3,
          animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 3}s`,
        }}
      />
    ))}
    <style>{`
      @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.5); }
      }
    `}</style>
  </div>
)

export default function App() {
  const [showBook, setShowBook] = useState(false)

  return (
    <div className="app-wrapper" style={{ position: 'relative', background: '#03001A', minHeight: '100vh' }}>
      <Stars />
    {!showBook ? (
      <FireworksSplash onComplete={() => setShowBook(true)} />
    ) : (
      <MiniBook />
    )}
    </div>
  )
}
