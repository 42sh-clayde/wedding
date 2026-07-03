'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const SECTIONS = [
  { id: 'section-hero',     label: 'Accueil' },
  { id: 'section-timeline', label: 'Programme' },
  { id: 'section-footer',   label: 'Confirmation' },
]

const spring = { type: 'spring', stiffness: 420, damping: 34 } as const

export default function ScrollDots() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const root = document.querySelector('.snap-scroll')
    if (!root) return

    const cleanup: (() => void)[] = []

    SECTIONS.forEach((section, index) => {
      const el = document.getElementById(section.id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(index) },
        { root, threshold: 0.5 }
      )
      obs.observe(el)
      cleanup.push(() => obs.disconnect())
    })

    return () => cleanup.forEach(fn => fn())
  }, [])

  function goTo(id: string) {
    const el = document.getElementById(id)
    const container = document.querySelector('.snap-scroll')
    if (!el || !container) return
    container.scrollTo({ top: (el as HTMLElement).offsetTop })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        right: 'max(14px, env(safe-area-inset-right, 0px))',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
      aria-label="Navigation sections"
    >
      {SECTIONS.map((section, i) => (
        <button
          key={section.id}
          onClick={() => goTo(section.id)}
          aria-label={section.label}
          aria-current={active === i ? 'true' : undefined}
          style={{
            width: '6px',
            padding: 0,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            minHeight: '24px',
            alignItems: 'center',
          }}
        >
          <motion.span
            animate={{
              height: active === i ? '22px' : '6px',
              background: active === i
                ? 'rgba(184,149,106,0.85)'
                : 'rgba(184,149,106,0.28)',
            }}
            transition={spring}
            style={{
              display: 'block',
              width: '6px',
              borderRadius: '3px',
            }}
          />
        </button>
      ))}
    </motion.div>
  )
}
