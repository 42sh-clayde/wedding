import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Source_Sans_3 } from 'next/font/google'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sten-audhe.vercel.app'),
  title: 'Sten & Audhe',
  description: 'Sten et Audhe se marient le 17 juillet 2026 — faire-part, programme et compte à rebours.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Sten & Audhe',
    title: 'Sten & Audhe — 17 juillet 2026',
    description: 'On se marie — découvrez notre faire-part et le programme du jour J.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Sten et Audhe' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sten & Audhe — 17 juillet 2026',
    description: 'On se marie — découvrez notre faire-part et le programme du jour J.',
    images: ['/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#ebe8e0',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${instrumentSerif.variable} ${sourceSans.variable}`}>
      <body>
        <a className="skip-link" href="#contenu-principal">Aller au contenu</a>
        {children}
      </body>
    </html>
  )
}
