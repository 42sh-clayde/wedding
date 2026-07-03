'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface TimelineItem {
  time: string
  label: string
  highlight?: boolean
  note?: string
}

const TIMELINE: TimelineItem[] = [
  {
    time: '08h30',
    label: 'Arrivée de la famille du futur marié',
  },
  {
    time: '09h00',
    label: 'Début de la cérémonie coutumière',
  },
  {
    time: '12h00 – 12h45',
    label: 'Fin de la cérémonie et temps de transition',
  },
  {
    time: '12h50 – 15h00',
    label: 'Cocktail',
  },
  {
    time: '15h00 – 16h55',
    label: 'Temps libre — Les invités munis de leur billet se changent pour la soirée',
    highlight: true,
    note: "Nous prions les futurs détenteurs de billets de respecter la plage horaire indiquée afin de garantir le bon déroulement de l’événement.",
  },
  {
    time: '17h00',
    label: 'Arrivée des invités à la salle de fête Christ Isnel',
  },
]

const ease = [0.22, 1, 0.36, 1] as const

function TimelineStep({
  item,
  index,
  isLast,
}: {
  item: TimelineItem
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  return (
    <div ref={ref} className="flex gap-4 items-stretch">
      {/* Spine column */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: '20px' }}>
        {/* Dot */}
        <motion.div
          className={item.highlight ? 'timeline-dot-active' : ''}
          animate={
            isInView
              ? {
                  backgroundColor: item.highlight ? 'var(--gold-glow)' : 'var(--parchment)',
                  borderColor: 'var(--gold)',
                  boxShadow: item.highlight
                    ? '0 0 0 4px rgba(184,149,106,.22), 0 0 14px rgba(184,149,106,.5)'
                    : '0 0 0 3px rgba(184,149,106,.15), 0 0 8px rgba(184,149,106,.25)',
                }
              : {
                  backgroundColor: 'var(--parchment)',
                  borderColor: 'rgba(184,149,106,.25)',
                  boxShadow: '0 0 0 0px rgba(184,149,106,0)',
                }
          }
          transition={{ duration: 0.55, delay: 0.12, ease }}
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            border: '1.5px solid rgba(184,149,106,.25)',
            flexShrink: 0,
            zIndex: 1,
            marginTop: '4px',
          }}
        />

        {/* Connecting line segment */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.32, ease }}
            style={{
              width: '1px',
              flex: 1,
              minHeight: '32px',
              marginTop: '6px',
              background:
                'linear-gradient(180deg, rgba(184,149,106,.55) 0%, rgba(106,148,133,.38) 100%)',
              transformOrigin: 'top center',
            }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -14 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.18 + index * 0.05, ease }}
        className="flex-1 min-w-0"
        style={{ paddingBottom: isLast ? 0 : '2rem' }}
      >
        {item.highlight ? (
          /* Special highlighted card for the transition slot */
          <div
            style={{
              background: 'var(--surface-inner)',
              border: '1px solid rgba(184,149,106,.35)',
              borderRadius: '14px',
              padding: '0.875rem 1rem',
              boxShadow: '0 2px 14px rgba(184,149,106,.12), inset 0 1px 0 rgba(255,252,247,.6)',
            }}
          >
            <time
              className="block font-body font-medium tracking-[.03em]"
              style={{ fontSize: '0.75rem', color: 'var(--green-deep)', fontVariantNumeric: 'tabular-nums' }}
            >
              {item.time}
            </time>
            <p
              className="font-display mt-1"
              style={{ fontSize: '1rem', lineHeight: 1.4, color: 'var(--ink)', margin: '0.25rem 0 0' }}
            >
              {item.label}
            </p>

            {/* Note d'élégance */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              style={{
                marginTop: '0.875rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(184,149,106,.22)',
              }}
            >
              <div className="flex items-start gap-2.5">
                <NoteIcon />
                <p
                  className="font-display italic leading-relaxed"
                  style={{ fontSize: '0.8125rem', color: 'var(--ink-soft)', margin: 0 }}
                >
                  {item.note}
                </p>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Standard step */
          <div style={{ paddingTop: '2px' }}>
            <time
              className="block font-body font-medium tracking-[.03em]"
              style={{ fontSize: '0.75rem', color: 'var(--green-deep)', fontVariantNumeric: 'tabular-nums' }}
            >
              {item.time}
            </time>
            <p
              className="font-display"
              style={{ fontSize: '1rem', lineHeight: 1.45, color: 'var(--ink)', margin: '0.2rem 0 0' }}
            >
              {item.label}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

function NoteIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--gold)"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: '1px', opacity: 0.8 }}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

export default function TimelineSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '0px 0px -20% 0px' })

  return (
    <section
      id="section-timeline"
      className="snap-start relative z-10 flex justify-center px-4"
      style={{
        minHeight: '100dvh',
        paddingTop: 'max(2rem, env(safe-area-inset-top, 0px))',
        paddingBottom: 'max(8rem, calc(env(safe-area-inset-bottom, 0px) + 7rem))',
      }}
      aria-labelledby="chronogramme-heading"
    >
      <div className="glass-panel w-full max-w-sm" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            padding: 'clamp(1.25rem, 4vw, 1.5rem) clamp(1.25rem, 4vw, 1.5rem) 0.875rem',
            borderBottom: '1px solid var(--surface-edge)',
            marginBottom: '0',
          }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              margin: 0,
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--green-deep)',
            }}
            id="chronogramme-heading"
          >
            Programme
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="font-display italic"
            style={{
              margin: '0.4rem 0 0',
              fontSize: '0.9375rem',
              color: 'var(--ink-soft)',
              lineHeight: 1.45,
            }}
          >
            Le fil du jour — de la coutume à la soirée.
          </motion.p>
        </div>

        {/* Timeline */}
        <div style={{ padding: 'clamp(1.25rem, 4vw, 1.5rem)' }}>
          {TIMELINE.map((item, i) => (
            <TimelineStep
              key={i}
              item={item}
              index={i}
              isLast={i === TIMELINE.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
