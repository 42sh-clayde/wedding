'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export default function FooterSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })

  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay: i * 0.12, ease },
  })

  return (
    <footer
      ref={ref}
      className="snap-start relative z-10 flex items-center justify-center px-4"
      style={{
        minHeight: '100dvh',
        paddingTop: 'max(2rem, env(safe-area-inset-top, 0px))',
        paddingBottom: 'max(8rem, calc(env(safe-area-inset-bottom, 0px) + 7rem))',
      }}
    >
      <div
        className="glass-panel w-full max-w-sm text-center"
        style={{
          padding: 'clamp(2rem, 7vw, 2.75rem) clamp(1.5rem, 5vw, 2rem)',
          background: 'rgba(252, 249, 244, 0.78)',
        }}
      >
        {/* Ornement */}
        <motion.div
          {...stagger(0)}
          className="flex items-center justify-center gap-3 mb-6"
          aria-hidden="true"
        >
          <div
            style={{
              height: '1px',
              width: '2.5rem',
              background: 'linear-gradient(90deg, transparent, var(--gold-soft))',
            }}
          />
          <OrnaIcon />
          <div
            style={{
              height: '1px',
              width: '2.5rem',
              background: 'linear-gradient(90deg, var(--gold-soft), transparent)',
            }}
          />
        </motion.div>

        <motion.p
          {...stagger(1)}
          className="font-display italic"
          style={{ margin: 0, fontSize: '1.35rem', lineHeight: 1.35, color: 'var(--ink)' }}
        >
          Votre présence fera toute la différence.
        </motion.p>

        <motion.p
          {...stagger(2)}
          style={{
            margin: '0.875rem auto 0',
            maxWidth: '20rem',
            fontSize: '0.9375rem',
            lineHeight: 1.6,
            color: 'var(--ink-soft)',
          }}
        >
          On a hâte de vous retrouver pour danser, rire et célébrer.
        </motion.p>

        <motion.p
          {...stagger(3)}
          style={{
            margin: '1.5rem 0 0',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--green-soft)',
          }}
        >
          Avec amour — Sten &amp; Audhe
        </motion.p>
      </div>
    </footer>
  )
}

function OrnaIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--gold-soft)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
