export interface RSVP {
  id: string
  prenom: string
  nom: string
  telephone: string
  createdAt: string
}

const RSVP_KEY = 'wedding:rsvp'
const ANALYTICS_KEY = 'wedding:analytics'

async function getKV() {
  const { kv } = await import('@vercel/kv')
  return kv
}

export async function addRSVP(
  data: Pick<RSVP, 'prenom' | 'nom' | 'telephone'>
): Promise<RSVP> {
  const rsvp: RSVP = {
    id: crypto.randomUUID(),
    ...data,
    createdAt: new Date().toISOString(),
  }
  try {
    const kv = await getKV()
    await kv.lpush(RSVP_KEY, rsvp)
  } catch {
    /* KV non configuré en local — données non persistées */
  }
  return rsvp
}

export async function getRSVPs(): Promise<RSVP[]> {
  try {
    const kv = await getKV()
    const items = await kv.lrange<RSVP>(RSVP_KEY, 0, -1)
    return items ?? []
  } catch {
    return []
  }
}

export async function trackEvent(event: string): Promise<void> {
  try {
    const kv = await getKV()
    await kv.hincrby(ANALYTICS_KEY, event, 1)
  } catch {
    /* silent */
  }
}

export async function getAnalytics(): Promise<Record<string, number>> {
  try {
    const kv = await getKV()
    const data = await kv.hgetall<Record<string, number>>(ANALYTICS_KEY)
    return data ?? {}
  } catch {
    return {}
  }
}
