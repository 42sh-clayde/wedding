'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useCountdown, introText } from '@/lib/useCountdown'

const WEDDING_DATE = new Date('2026-07-17T08:30:00')

const ease = [0.22, 1, 0.36, 1] as const

function Digit({ char }: { char: string }) {
  return (
    <div className="relative overflow-hidden" style={{ height: '1.1em', minWidth: '0.62em' }}>
      <AnimatePresence initial={false}>
        <motion.span
          key={char}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.26, ease }}
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const str = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="flex gap-0.5 px-3 py-2.5 rounded-xl font-display text-green-deep"
        style={{
          fontSize: 'clamp(1.5rem, 7vw, 1.875rem)',
          lineHeight: 1.1,
          background: 'rgba(255, 252, 247, 0.9)',
          border: '1px solid rgba(184, 149, 106, 0.18)',
          boxShadow: '0 2px 8px rgba(42,36,28,.05)',
        }}
      >
        <Digit char={str[0]} />
        <Digit char={str[1]} />
      </div>
      <span
        className="text-[10px] font-medium tracking-[.06em] uppercase"
        style={{ color: 'var(--ink-soft)' }}
      >
        {label}
      </span>
    </div>
  )
}

export default function HeroSection() {
  const time = useCountdown(WEDDING_DATE)

  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: i * 0.1, ease },
  })

  return (
    <section
      className="snap-start relative z-10 flex items-center justify-center px-4"
      style={{
        minHeight: '100dvh',
        paddingTop: 'max(1.5rem, env(safe-area-inset-top, 0px))',
        paddingBottom: 'max(7rem, calc(env(safe-area-inset-bottom, 0px) + 6rem))',
      }}
      aria-label="Faire-part"
    >
      <div
        className="glass-panel w-full max-w-sm"
        style={{
          padding: 'clamp(2rem, 7vw, 2.75rem) clamp(1.25rem, 5vw, 1.75rem) clamp(1.5rem, 5vw, 2rem)',
          background:
            'linear-gradient(180deg, rgba(252,249,244,.92) 0%, rgba(248,244,236,.86) 100%)',
        }}
      >
        {/* Stamp date */}
        <motion.p
          {...stagger(0)}
          className="text-center text-xs font-medium tracking-[.28em] mb-4"
          style={{ color: 'var(--gold)' }}
        >
          17 · 07 · 26
        </motion.p>

        {/* Welcome */}
        <motion.p
          {...stagger(1)}
          className="text-center font-display italic mx-auto mb-6"
          style={{
            fontSize: 'clamp(1rem, 3.8vw, 1.125rem)',
            lineHeight: 1.5,
            color: 'var(--ink-soft)',
            maxWidth: '18rem',
          }}
        >
          On se marie — et on a envie de fêter ça avec vous.
        </motion.p>

        {/* Names */}
        <h1
          className="font-display text-center flex flex-col items-center"
          style={{ gap: '0.15rem', margin: 0, lineHeight: 1.05, color: 'var(--ink)' }}
        >
          <motion.span
            {...stagger(2)}
            style={{ fontSize: 'clamp(2.75rem, 12vw, 3.5rem)' }}
          >
            Sten
          </motion.span>
          <motion.span
            {...stagger(3)}
            className="font-display italic"
            style={{
              fontSize: 'clamp(1.5rem, 6vw, 1.875rem)',
              color: 'var(--gold-soft)',
              lineHeight: 1,
              padding: '0.15rem 0',
            }}
            aria-hidden="true"
          >
            &amp;
          </motion.span>
          <motion.span
            {...stagger(4)}
            style={{ fontSize: 'clamp(2.75rem, 12vw, 3.5rem)' }}
          >
            Audhe
          </motion.span>
        </h1>

        {/* Date */}
        <motion.p
          {...stagger(5)}
          className="text-center font-medium tracking-[.04em] mt-5"
          style={{ fontSize: '0.9375rem', color: 'var(--green)' }}
        >
          Vendredi 17 juillet 2026
        </motion.p>

        {/* Countdown */}
        <motion.section
          {...stagger(6)}
          aria-labelledby="countdown-label"
          className="mt-8 pt-6"
          style={{ borderTop: '1px solid var(--surface-edge)' }}
        >
          <div className="flex flex-col items-center gap-1 mb-4 text-center">
            <p
              className="font-display italic"
              style={{ fontSize: '0.9375rem', color: 'var(--gold)' }}
              id="countdown-label"
            >
              {time.isOver ? "C'est le grand jour !" : introText(time.days)}
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--ink-soft)' }}>
              17 juillet 2026
            </p>
          </div>

          {time.isOver ? (
            <p
              className="text-center font-display italic mt-2"
              style={{ color: 'var(--green-soft)', fontSize: '1.125rem', lineHeight: 1.4 }}
            >
              On est prêts à vous accueillir.
            </p>
          ) : (
            <div
              className="flex items-center justify-center gap-1.5"
              role="timer"
              aria-live="polite"
              aria-label="Compte à rebours"
            >
              <CountdownUnit value={time.days}    label="j"   />
              <Separator />
              <CountdownUnit value={time.hours}   label="h"   />
              <Separator />
              <CountdownUnit value={time.minutes} label="min" />
              <Separator />
              <CountdownUnit value={time.seconds} label="s"   />
            </div>
          )}
        </motion.section>
      </div>
    </section>
  )
}

function Separator() {
  return (
    <span
      className="font-display pb-3 select-none"
      style={{ fontSize: '1.25rem', color: 'var(--gold-soft)', lineHeight: 1 }}
      aria-hidden="true"
    >
      :
    </span>
  )
}
