'use client'

export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ background: 'var(--sand)' }}
    >
      <svg
        className="w-full h-full block"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blob-forest" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5a8f7e" />
            <stop offset="100%" stopColor="#3d6b5c" />
          </linearGradient>
          <linearGradient id="blob-sage" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#7aab9a" />
            <stop offset="100%" stopColor="#588f7c" />
          </linearGradient>
          <linearGradient id="blob-mist" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#c8ddd4" />
            <stop offset="100%" stopColor="#a8c8bb" />
          </linearGradient>
          <linearGradient id="blob-glow" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#e8d4b0" />
            <stop offset="100%" stopColor="#d4b896" />
          </linearGradient>
          <filter id="blob-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="56" />
          </filter>
        </defs>
        <rect width="1440" height="900" fill="var(--sand)" />
        <g filter="url(#blob-blur)" opacity="0.72">
          <ellipse className="ambient-blob-1" cx="1180" cy="140" rx="340" ry="280" fill="url(#blob-forest)" />
          <ellipse className="ambient-blob-2" cx="180"  cy="720" rx="380" ry="300" fill="url(#blob-sage)"   />
          <ellipse className="ambient-blob-3" cx="720"  cy="480" rx="420" ry="260" fill="url(#blob-mist)"   />
          <ellipse className="ambient-blob-4" cx="520"  cy="120" rx="280" ry="220" fill="url(#blob-glow)"   />
        </g>
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 55% at 50% 18%, rgba(232,212,176,.28) 0%, transparent 70%),
            radial-gradient(ellipse 90% 75% at 50% 42%, rgba(245,242,235,.45) 0%, rgba(245,242,235,.12) 55%, transparent 100%),
            linear-gradient(175deg, rgba(90,143,126,.12) 0%, transparent 40%, transparent 58%, rgba(61,107,92,.16) 100%)
          `,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          opacity: 0.045,
          mixBlendMode: 'multiply',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
