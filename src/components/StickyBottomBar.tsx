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

const spring = { type: 'spring', stiffness: 380, damping: 36 } as const

export default function StickyBottomBar() {
  const [modal, setModal] = useState<'confirm' | 'lieu' | null>(null)
  const [entered, setEntered] = useState(false)
  const [onTimeline, setOnTimeline] = useState(false)
  const scrollTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 700)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const root = document.querySelector('.snap-scroll')
    const el = document.getElementById('section-timeline')
    if (!root || !el) return
    const obs = new IntersectionObserver(
      ([entry]) => setOnTimeline(entry.isIntersecting),
      { root, threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const hidden = !entered || onTimeline

  return (
    <>
      {/* Lieu — pill gauche, ghost, secondaire */}
      <motion.button
        onClick={() => { track('click:lieu'); setModal('lieu') }}
        animate={{
          x: hidden ? -48 : 0,
          opacity: hidden ? 0 : 1,
          y: hidden ? 12 : 0,
        }}
        transition={{ ...spring, delay: hidden ? 0 : 0.06 }}
        style={{
          position: 'fixed',
          left: 'max(20px, env(safe-area-inset-left, 0px))',
          bottom: 'max(36px, calc(env(safe-area-inset-bottom, 0px) + 28px))',
          zIndex: 50,
          height: '48px',
          padding: '0 18px',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          background: 'rgba(245,242,235,0.92)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(74,114,100,0.22)',
          boxShadow: '0 2px 16px rgba(42,36,28,.10), 0 1px 0 rgba(255,252,247,.75) inset',
          color: '#4a7264',
          fontSize: '0.875rem',
          fontWeight: 500,
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          pointerEvents: hidden ? 'none' : 'auto',
        }}
        aria-label="Voir le lieu de la soirée"
      >
        <MapPinIcon />
        <span>Lieu</span>
      </motion.button>

      {/* Confirmer — pill droite, plein, primaire */}
      <motion.button
        onClick={() => { track('click:confirmer'); setModal('confirm') }}
        animate={{
          x: hidden ? 48 : 0,
          opacity: hidden ? 0 : 1,
          y: hidden ? 12 : 0,
        }}
        transition={spring}
        style={{
          position: 'fixed',
          right: 'max(20px, env(safe-area-inset-right, 0px))',
          bottom: 'max(28px, calc(env(safe-area-inset-bottom, 0px) + 20px))',
          zIndex: 50,
          height: '54px',
          padding: '0 22px',
          borderRadius: '27px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#4a7264',
          boxShadow: '0 4px 24px rgba(47,84,73,.32), 0 1px 0 rgba(255,255,255,.1) inset',
          color: '#f5f2eb',
          fontSize: '0.9375rem',
          fontWeight: 500,
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          border: 'none',
          pointerEvents: hidden ? 'none' : 'auto',
        }}
        aria-label="Confirmer ma présence au mariage"
      >
        <CheckIcon />
        <span>Confirmer</span>
      </motion.button>

      <AnimatePresence>
        {modal === 'confirm' && <ConfirmModal onClose={() => setModal(null)} />}
        {modal === 'lieu' && <LieuModal onClose={() => setModal(null)} />}
      </AnimatePresence>
    </>
  )
}

function MapPinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
