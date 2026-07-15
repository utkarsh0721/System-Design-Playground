/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#09090b',
        panel: '#111827',
        line: '#253047',
        ink: '#f8fafc',
        muted: '#94a3b8',
        brand: { cyan: '#22d3ee', blue: '#3b82f6', violet: '#8b5cf6' },
      },
      boxShadow: {
        glow: '0 0 40px rgba(34, 211, 238, 0.14)',
        violetGlow: '0 0 48px rgba(139, 92, 246, 0.18)',
      },
      animation: {
        grid: 'grid 18s linear infinite',
        float: 'float 8s ease-in-out infinite',
      },
      keyframes: {
        grid: { to: { backgroundPosition: '48px 48px' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-16px)' } },
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'], mono: ['JetBrains Mono', 'ui-monospace', 'monospace'] },
    },
  },
  plugins: [],
};
