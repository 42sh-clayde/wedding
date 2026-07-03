import { NextRequest, NextResponse } from 'next/server'
import { trackEvent } from '@/lib/store'

export async function POST(req: NextRequest) {
  try {
    const { event } = await req.json()
    if (typeof event === 'string' && event.length < 64) {
      await trackEvent(event)
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
