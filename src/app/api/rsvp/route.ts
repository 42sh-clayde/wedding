import { NextRequest, NextResponse } from 'next/server'
import { addRSVP } from '@/lib/store'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prenom, nom, telephone } = body

    if (!prenom?.trim() || !nom?.trim() || !telephone?.trim()) {
      return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 })
    }

    const rsvp = await addRSVP({
      prenom: prenom.trim(),
      nom: nom.trim(),
      telephone: telephone.trim(),
    })

    return NextResponse.json({ ok: true, rsvp })
  } catch (err) {
    console.error('[RSVP]', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
