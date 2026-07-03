'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ConfirmModal from './ConfirmModal'
import LieuModal from './LieuModal'

function track(event: string) {
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event }),
  }).catch(() => {})
}

export default function StickyBottomBar() {
  const [modal, setModal] = useState<'confirm' | 'lieu' | null>(null)
  const [entered, setEntered] = useState(false)
  const [scrolling, setScrolling] = useState(false)
  const scrollTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const container = document.querySelector('.snap-scroll')
    if (!container) return
    function onScroll() {
      setScrolling(true)
      clearTimeout(scrollTimer.current)
      scrollTimer.current = setTimeout(() => setScrolling(false), 700)
    }
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', onScroll)
      clearTimeout(scrollTimer.current)
    }
  }, [])

  const hidden = !entered || scrolling

  return (
    <>
      <motion.div
        animate={{ y: hidden ? '120%' : 0, opacity: hidden ? 0 : 1 }}
        transition={{
          y: { type: 'spring', stiffness: 420, damping: 38 },
          opacity: { duration: 0.18 },
        }}
        className="fixed left-0 right-0 bottom-0 z-50 flex justify-center"
        style={{
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))',
          paddingLeft: 'max(1rem, env(safe-area-inset-left, 0px))',
          paddingRight: 'max(1rem, env(safe-area-inset-right, 0px))',
          pointerEvents: hidden ? 'none' : 'auto',
        }}
      >
        <div
          className="flex gap-3 w-full max-w-sm"
          style={{
            padding: '0.75rem',
            background: 'rgba(245, 242, 235, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(184, 149, 106, 0.22)',
            borderRadius: '18px',
            boxShadow: '0 -1px 0 rgba(255,252,247,.6) inset, 0 8px 32px rgba(42,36,28,.12)',
          }}
        >
          <button
            onClick={() => { track('click:itineraire'); setModal('lieu') }}
            className="flex items-center justify-center gap-2 flex-1 rounded-xl font-medium transition-all active:scale-95"
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(74, 114, 100, 0.1)',
              color: '#4a7264',
              fontSize: '0.875rem',
              border: '1px solid rgba(74, 114, 100, 0.18)',
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
              minHeight: '48px',
            }}
            aria-label="Voir le lieu de la soirée"
          >
            <MapPinIcon />
            <span>Itinéraire</span>
          </button>

          <button
            onClick={() => { track('click:confirmer'); setModal('confirm') }}
            className="flex items-center justify-center gap-2 flex-1 rounded-xl font-medium transition-all active:scale-95"
            style={{
              padding: '0.75rem 1rem',
              background: '#4a7264',
              color: '#f5f2eb',
              fontSize: '0.875rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(47,84,73,.25)',
              WebkitTapHighlightColor: 'transparent',
              minHeight: '48px',
            }}
            aria-label="Confirmer ma présence au mariage"
          >
            <CheckIcon />
            <span>Confirmer</span>
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {modal === 'confirm' && <ConfirmModal onClose={() => setModal(null)} />}
        {modal === 'lieu' && <LieuModal onClose={() => setModal(null)} />}
      </AnimatePresence>
    </>
  )
}

function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
