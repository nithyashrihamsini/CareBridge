/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          light: 'var(--color-primary-light)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          hover: 'var(--color-secondary-hover)',
          light: 'var(--color-secondary-light)',
        },
        canvas: 'var(--color-canvas)',
        card: 'var(--color-card)',
        ink: 'var(--color-ink)',
        muted: 'var(--color-muted)',
        borderTheme: 'var(--color-border)',
        amber: {
          DEFAULT: '#F6A04E',
          light: 'var(--color-amber-light)',
          text: 'var(--color-amber-text)',
        },
        success: {
          DEFAULT: '#5CB85C',
          light: 'var(--color-success-light)',
          text: 'var(--color-success-text)',
        },
        critical: {
          DEFAULT: '#D9534F',
          light: 'var(--color-critical-light)',
          text: 'var(--color-critical-text)',
        },
      },
      fontSize: {
        h1: ['24px', { lineHeight: '1.3', fontWeight: '700' }],
        h2: ['20px', { lineHeight: '1.35', fontWeight: '600' }],
        h3: ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        small: ['14px', { lineHeight: '1.45', fontWeight: '400' }],
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        subtle: 'var(--shadow-subtle)',
      },
      borderRadius: {
        card: '12px',
      },
    },
  },
  plugins: [],
};

