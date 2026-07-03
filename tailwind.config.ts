import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'green-deep': '#2f5449',
        'green-w': '#4a7264',
        'green-soft': '#6a9485',
        'green-light': '#8fb5a6',
        'green-mist': '#c8ddd4',
        gold: '#b8956a',
        'gold-soft': '#d4b896',
        'gold-glow': '#e8d4b0',
        sand: '#ebe8e0',
        parchment: '#f5f2eb',
        ink: '#1e2a26',
        'ink-soft': '#4a5c56',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      screens: {
        xs: '375px',
      },
      height: {
        dvh: '100dvh',
      },
      minHeight: {
        dvh: '100dvh',
      },
    },
  },
  plugins: [],
}

export default config
