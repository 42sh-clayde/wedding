'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Phase = 'form' | 'loading' | 'success' | 'error'

const ease = [0.22, 1, 0.36, 1] as const

export default function ConfirmModal({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<Phase>('form')
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const sheetRef = useRef<HTMLDivElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!prenom.trim() || !nom.trim() || !telephone.trim()) {
      setErrMsg('Merci de remplir tous les champs.')
      return
    }
    setErrMsg('')
    setPhase('loading')
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prenom, nom, telephone }),
      })
      if (!res.ok) throw new Error()
      setPhase('success')
      setTimeout(onClose, 3200)
    } catch {
      setPhase('error')
    }
  }

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
          background: 'rgba(30, 42, 38, 0.45)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      />

      {/* Sheet */}
      <motion.div
        ref={sheetRef}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 36 }}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={{ top: 0, bottom: 0.35 }}
        onDragEnd={(_, info) => { if (info.offset.y > 120) onClose() }}
        style={{
          position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 61,
          background: '#f5f2eb',
          borderRadius: '20px 20px 0 0',
          boxShadow: '0 -4px 40px rgba(42,36,28,.18)',
          paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 0px))',
          touchAction: 'none',
        }}
      >
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '0.75rem 0 0' }}>
          <div style={{ width: '2.5rem', height: '4px', borderRadius: '2px', background: 'rgba(74,114,100,.25)' }} />
        </div>

        <div style={{ padding: '1.25rem 1.5rem 0' }}>
          <p style={{ margin: 0, fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6a9485' }}>
            Confirmer ma présence
          </p>
          <p style={{ margin: '0.3rem 0 0', fontFamily: 'var(--font-display), Georgia, serif', fontSize: '1.125rem', fontStyle: 'italic', color: '#1e2a26' }}>
            On a hâte de vous compter parmi nous.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {phase === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'rgba(74,114,100,.12)',
                  border: '2px solid rgba(74,114,100,.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4a7264" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <motion.polyline
                    points="20 6 9 17 4 12"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.45, delay: 0.2, ease: 'easeOut' }}
                  />
                </svg>
              </motion.div>
              <p style={{ margin: 0, fontFamily: 'var(--font-display), Georgia, serif', fontSize: '1.25rem', fontStyle: 'italic', color: '#1e2a26' }}>
                Merci, on vous attend !
              </p>
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', color: '#4a5c56' }}>
                Votre présence est confirmée.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              style={{ padding: '1.25rem 1.5rem 0' }}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {phase === 'error' && (
                <p style={{ margin: '0 0 0.75rem', fontSize: '0.8125rem', color: '#b45309', padding: '0.625rem 0.875rem', background: 'rgba(180,83,9,.08)', borderRadius: '8px' }}>
                  Une erreur s'est produite. Veuillez réessayer.
                </p>
              )}
              {errMsg && (
                <p style={{ margin: '0 0 0.75rem', fontSize: '0.8125rem', color: '#b45309' }}>{errMsg}</p>
              )}

              {[
                { label: 'Prénom', value: prenom, set: setPrenom, type: 'text', auto: 'given-name' },
                { label: 'Nom', value: nom, set: setNom, type: 'text', auto: 'family-name' },
                { label: 'Téléphone', value: telephone, set: setTelephone, type: 'tel', auto: 'tel' },
              ].map(({ label, value, set, type, auto }) => (
                <div key={label} style={{ marginBottom: '0.875rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#4a5c56', marginBottom: '0.35rem' }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    autoComplete={auto}
                    inputMode={type === 'tel' ? 'tel' : 'text'}
                    required
                    value={value}
                    onChange={e => set(e.target.value)}
                    style={{
                      display: 'block', width: '100%', minHeight: '48px',
                      padding: '0 0.875rem',
                      background: 'rgba(255,252,247,.9)',
                      border: '1px solid rgba(184,149,106,.25)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      color: '#1e2a26',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={phase === 'loading'}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  width: '100%', minHeight: '52px', marginTop: '0.5rem',
                  background: '#4a7264',
                  color: '#f5f2eb',
                  border: 'none', borderRadius: '14px',
                  fontSize: '0.9375rem', fontWeight: 500, cursor: 'pointer',
                  opacity: phase === 'loading' ? 0.7 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                {phase === 'loading' ? (
                  <>
                    <Spinner /> Envoi en cours…
                  </>
                ) : (
                  'Confirmer ma présence'
                )}
              </button>
              <div style={{ height: '0.5rem' }} />
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

function Spinner() {
  return (
    <motion.svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </motion.svg>
  )
}
