import { getRSVPs, getAnalytics } from '@/lib/store'

const SECRET = process.env.ADMIN_SECRET ?? 'wedding2026'
const EXPECTED = Number(process.env.EXPECTED_GUESTS ?? 0)

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ secret?: string }>
}) {
  const params = await searchParams
  if (params.secret !== SECRET) {
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ebe8e0', fontFamily: 'system-ui' }}>
        <div style={{ textAlign: 'center', color: '#4a5c56' }}>
          <p style={{ fontSize: '2rem' }}>🔒</p>
          <p style={{ marginTop: '0.5rem' }}>Accès refusé.</p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.25rem', opacity: 0.6 }}>Ajoutez <code>?secret=…</code> à l'URL</p>
        </div>
      </div>
    )
  }

  const [rsvps, analytics] = await Promise.all([getRSVPs(), getAnalytics()])
  const total = rsvps.length
  const taux = EXPECTED > 0 ? Math.round((total / EXPECTED) * 100) : null
  const clicksConfirmer = analytics['click:confirmer'] ?? 0
  const clicksItineraire = analytics['click:itineraire'] ?? 0

  return (
    <div style={{ minHeight: '100dvh', background: '#ebe8e0', fontFamily: 'system-ui, sans-serif', color: '#1e2a26' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '2rem 1rem 4rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a9485', margin: 0 }}>Admin</p>
          <h1 style={{ margin: '0.25rem 0 0', fontFamily: 'Georgia, serif', fontSize: '1.75rem', fontWeight: 400 }}>
            Sten &amp; Audhe — 17 juillet 2026
          </h1>
        </div>

        {/* Stats cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
          <StatCard label="Confirmations" value={String(total)} />
          <StatCard label="Taux de réponse" value={taux !== null ? `${taux} %` : '—'} sub={EXPECTED > 0 ? `sur ${EXPECTED} attendus` : 'EXPECTED_GUESTS non défini'} />
          <StatCard label="Clics « Confirmer »" value={String(clicksConfirmer)} />
          <StatCard label="Clics « Itinéraire »" value={String(clicksItineraire)} />
        </div>

        {/* Guest table */}
        <div style={{ background: 'rgba(252,249,244,0.9)', border: '1px solid rgba(184,149,106,.2)', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(74,114,100,.1)' }}>
            <p style={{ margin: 0, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6a9485' }}>
              Invités confirmés
            </p>
          </div>

          {total === 0 ? (
            <p style={{ padding: '2rem', textAlign: 'center', color: '#4a5c56', fontStyle: 'italic' }}>
              Aucune confirmation pour l'instant.
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(74,114,100,.1)' }}>
                    {['Prénom', 'Nom', 'Téléphone', 'Date'].map(h => (
                      <th key={h} style={{ padding: '0.625rem 1.25rem', textAlign: 'left', fontWeight: 500, color: '#4a5c56', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((r, i) => (
                    <tr key={r.id} style={{ borderBottom: i < rsvps.length - 1 ? '1px solid rgba(74,114,100,.06)' : 'none' }}>
                      <td style={{ padding: '0.625rem 1.25rem', fontFamily: 'Georgia, serif' }}>{r.prenom}</td>
                      <td style={{ padding: '0.625rem 1.25rem', fontFamily: 'Georgia, serif' }}>{r.nom}</td>
                      <td style={{ padding: '0.625rem 1.25rem', color: '#4a5c56' }}>{r.telephone}</td>
                      <td style={{ padding: '0.625rem 1.25rem', color: '#6a9485', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{fmt(r.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: '#6a9485', textAlign: 'center' }}>
          Actualisez la page pour voir les nouvelles confirmations.
        </p>
      </div>
    </div>
  )
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{
      background: 'rgba(252,249,244,0.9)',
      border: '1px solid rgba(184,149,106,.2)',
      borderRadius: '14px',
      padding: '1rem 1.25rem',
    }}>
      <p style={{ margin: 0, fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6a9485' }}>{label}</p>
      <p style={{ margin: '0.35rem 0 0', fontSize: '2rem', fontFamily: 'Georgia, serif', fontWeight: 400, color: '#2f5449', lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ margin: '0.25rem 0 0', fontSize: '0.7rem', color: '#4a5c56' }}>{sub}</p>}
    </div>
  )
}
