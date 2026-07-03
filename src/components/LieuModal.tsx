'use client'
import { motion } from 'framer-motion'

/* Remplacez par le vrai lien Google Maps du lieu */
const MAP_URL = 'https://maps.google.com/?q=Ondo+Gabon'

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

        {/* Photo placeholder — remplacez par <img src="/lieu.jpg" …> quand disponible */}
        <div
          style={{
            margin: '1rem 1.5rem 0',
            borderRadius: '14px',
            overflow: 'hidden',
            aspectRatio: '16/9',
            background: 'linear-gradient(135deg, #4a7264 0%, #2f5449 40%, #6a9485 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(245,242,235,.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(245,242,235,.55)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Déposez lieu.jpg dans /public
          </p>
        </div>

        {/* Infos lieu */}
        <div style={{ padding: '1.25rem 1.5rem 0' }}>
          <p style={{ margin: 0, fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6a9485' }}>
            Lieu de la soirée
          </p>
          <h2 style={{ margin: '0.3rem 0 0', fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 400, fontSize: '1.375rem', color: '#1e2a26' }}>
            Site de la soirée — ONDO
          </h2>

          {/* Adresse */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', marginTop: '0.875rem' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b8956a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#1e2a26', lineHeight: 1.5 }}>
                {/* ← Remplacez par l'adresse exacte */}
                Ondo, Gabon
              </p>
              <p style={{ margin: '0.125rem 0 0', fontSize: '0.8125rem', color: '#4a5c56' }}>
                À partir de 17h00
              </p>
            </div>
          </div>

          {/* Description */}
          <p style={{ margin: '1rem 0 0', fontSize: '0.875rem', lineHeight: 1.65, color: '#4a5c56' }}>
            {/* ← Remplacez par la vraie description du lieu */}
            Le site de la soirée vous accueille dès 17h00 pour une nuit de fête, de musique et de joie. Prévoyez votre billet d'invitation pour accéder au site.
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
