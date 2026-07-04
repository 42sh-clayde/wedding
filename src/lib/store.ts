import { put, list } from '@vercel/blob'

export interface RSVP {
  id: string
  prenom: string
  nom: string
  telephone: string
  createdAt: string
}

async function fetchBlob<T>(url: string): Promise<T | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}
  return fetch(url, { headers }).then(r => r.json()).catch(() => null)
}

export async function addRSVP(data: Pick<RSVP, 'prenom' | 'nom' | 'telephone'>): Promise<RSVP> {
  const rsvp: RSVP = { id: crypto.randomUUID(), ...data, createdAt: new Date().toISOString() }
  await put(`wedding/rsvps/${rsvp.id}.json`, JSON.stringify(rsvp), {
    access: 'private',
    addRandomSuffix: false,
  })
  return rsvp
}

export async function getRSVPs(): Promise<RSVP[]> {
  try {
    const { blobs } = await list({ prefix: 'wedding/rsvps/' })
    const results = await Promise.all(blobs.map(b => fetchBlob<RSVP>(b.url)))
    return (results.filter(Boolean) as RSVP[]).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  } catch {
    return []
  }
}

export async function trackEvent(event: string): Promise<void> {
  try {
    const { blobs } = await list({ prefix: 'wedding/analytics.json' })
    let analytics: Record<string, number> = {}
    if (blobs.length > 0) {
      analytics = (await fetchBlob<Record<string, number>>(blobs[0].url)) ?? {}
    }
    analytics[event] = (analytics[event] ?? 0) + 1
    await put('wedding/analytics.json', JSON.stringify(analytics), {
      access: 'private',
      addRandomSuffix: false,
    })
  } catch {}
}

export async function getAnalytics(): Promise<Record<string, number>> {
  try {
    const { blobs } = await list({ prefix: 'wedding/analytics.json' })
    if (blobs.length === 0) return {}
    return (await fetchBlob<Record<string, number>>(blobs[0].url)) ?? {}
  } catch {
    return {}
  }
}
