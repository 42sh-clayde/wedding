'use client'
import { motion } from 'framer-motion'

const MAP_URL = 'https://maps.google.com/?q=Salle+Christ+Isnel+Gabon'

export default function LieuModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 60,
          background: 'rgba(30,42,38,.45)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      />

      {/* Sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 36 }}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={{ top: 0, bottom: 0.35 }}
        onDragEnd={(_, info) => { if (info.offset.y > 100) onClose() }}
        style={{
          position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 61,
          background: '#f5f2eb',
          borderRadius: '20px 20px 0 0',
          boxShadow: '0 -4px 40px rgba(42,36,28,.18)',
          paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 0px))',
          touchAction: 'none',
          maxHeight: '90dvh',
          overflowY: 'auto',
        }}
      >
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '0.75rem 0 0', position: 'sticky', top: 0, background: '#f5f2eb', zIndex: 1 }}>
          <div style={{ width: '2.5rem', height: '4px', borderRadius: '2px', background: 'rgba(74,114,100,.25)' }} />
        </div>

        <div
          style={{
            margin: '1rem 1.5rem 0',
            borderRadius: '14px',
            overflow: 'hidden',
            aspectRatio: '16/9',
            position: 'relative',
          }}
        >
          <VenueIllustration />
        </div>

        {/* Infos lieu */}
        <div style={{ padding: '1.25rem 1.5rem 0' }}>
          <p style={{ margin: 0, fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2f5449' }}>
            Lieu de la soirée
          </p>
          <h2 style={{ margin: '0.3rem 0 0', fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 400, fontSize: '1.375rem', color: '#1e2a26' }}>
            Salle de fête Christ Isnel
          </h2>

          {/* Adresse */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', marginTop: '0.875rem' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b8956a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#1e2a26', lineHeight: 1.5 }}>
                Ondo
              </p>
              <p style={{ margin: '0.125rem 0 0', fontSize: '0.8125rem', color: '#4a5c56' }}>
                À partir de 17h00
              </p>
            </div>
          </div>

          {/* Description */}
          <p style={{ margin: '1rem 0 0', fontSize: '0.875rem', lineHeight: 1.65, color: '#4a5c56' }}>
            La salle Christ Isnel vous accueille dès 17h00 pour une nuit de fête, de musique et de joie. Pensez à vous munir de votre billet pour accéder à la soirée.
          </p>

          {/* Bouton Maps */}
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              width: '100%', minHeight: '52px', marginTop: '1.25rem',
              background: '#4a7264', color: '#f5f2eb',
              borderRadius: '14px', textDecoration: 'none',
              fontSize: '0.9375rem', fontWeight: 500,
              boxSizing: 'border-box',
            }}
            aria-label="Ouvrir l'itinéraire dans Google Maps"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Ouvrir dans Maps
          </a>
        </div>
      </motion.div>
    </>
  )
}

function VenueIllustration() {
  return (
    <svg
      viewBox="0 0 320 180"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vi-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a3028" />
          <stop offset="100%" stopColor="#2f5449" />
        </linearGradient>
        <linearGradient id="vi-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f5449" />
          <stop offset="100%" stopColor="#1a3028" />
        </linearGradient>
        <radialGradient id="vi-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(184,149,106,0.18)" />
          <stop offset="100%" stopColor="rgba(184,149,106,0)" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="320" height="180" fill="url(#vi-sky)" />

      {/* Ambient glow behind building */}
      <ellipse cx="160" cy="110" rx="120" ry="60" fill="url(#vi-glow)" />

      {/* Stars */}
      {([
        [30,18,1.4],[70,10,1],[130,22,0.9],[200,14,1.3],[250,8,1],[290,24,0.8],
        [50,38,0.8],[110,32,1.1],[180,28,0.9],[240,36,1],[310,42,0.7],[15,50,0.9],
      ] as [number,number,number][]).map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={`rgba(232,212,176,${0.4 + r * 0.2})`} />
      ))}

      {/* Fairy lights string */}
      <path d="M0 62 C60 58 120 64 160 60 C200 56 260 64 320 60" stroke="rgba(184,149,106,0.25)" fill="none" strokeWidth="0.6" />
      {[20,52,88,124,160,196,232,268,304].map((x, i) => (
        <circle key={i} cx={x} cy={60 + Math.sin(i * 1.1) * 2.5} r="2.2" fill="rgba(232,212,176,0.55)" />
      ))}

      {/* Building — base */}
      <rect x="60" y="100" width="200" height="72" fill="#3d6659" />

      {/* Pediment / roof triangle */}
      <polygon points="50,100 160,68 270,100" fill="#2f5449" />
      <polygon points="55,100 160,71 265,100" fill="#3d6659" />

      {/* Pediment ornament */}
      <circle cx="160" cy="78" r="5" fill="none" stroke="rgba(184,149,106,0.5)" strokeWidth="1" />
      <circle cx="160" cy="78" r="2" fill="rgba(184,149,106,0.4)" />

      {/* Columns */}
      {[88, 118, 148, 178, 208].map((x, i) => (
        <rect key={i} x={x} y={100} width="6" height="72" fill="rgba(47,84,73,0.7)" rx="1" />
      ))}

      {/* Windows with warm light */}
      {[82, 132, 182].map((x, i) => (
        <rect key={i} x={x} y={118} width={28} height={38} fill="rgba(232,212,176,0.12)" rx="14" ry="14" />
      ))}
      {[82, 132, 182].map((x, i) => (
        <rect key={i} x={x + 4} y={130} width={20} height={26} fill="rgba(232,212,176,0.08)" rx="10" ry="10" />
      ))}

      {/* Cornice line */}
      <rect x="58" y="99" width="204" height="2" fill="rgba(184,149,106,0.4)" />

      {/* Ground */}
      <rect x="0" y="172" width="320" height="8" fill="url(#vi-ground)" opacity="0.6" />
      <rect x="40" y="170" width="240" height="3" fill="rgba(184,149,106,0.2)" rx="1" />

      {/* Venue name */}
      <text
        x="160" y="152"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="11"
        fontWeight="400"
        fill="rgba(232,212,176,0.85)"
        letterSpacing="3"
      >
        CHRIST ISNEL
      </text>
      <text
        x="160" y="165"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
        fontSize="7"
        fill="rgba(184,149,106,0.65)"
        letterSpacing="3.5"
      >
        SALLE DE FÊTE
      </text>
    </svg>
  )
}
