/** Design tokens live here. Change a value once, the whole UI follows. */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],

  theme: {
    extend: {
      colors: {
        /* Base */
        paper: '#F5F6F8',
        surface: '#FFFFFF',

        /* Typography */
        ink: '#16202E',
        muted: '#5B6778',

        /* Borders */
        line: '#E2E6EC',

        /* Primary brand */
        brand: {
          DEFAULT: '#0E6B68',
          soft: '#E3F1F0',
          ink: '#0A4F4D',
        },

        /* Semantic states */
        good: {
          DEFAULT: '#2F7D4F',
          soft: '#E2F2E8',
        },

        warn: {
          DEFAULT: '#9A5B00',
          soft: '#FBEFD9',
        },

        bad: {
          DEFAULT: '#B23A2E',
          soft: '#FBE6E3',
        },
      },

      fontFamily: {
        sans: ['"Schibsted Grotesk"', 'system-ui', 'sans-serif'],
      },

      borderRadius: {
        control: '6px',
        panel: '12px',
      },

      boxShadow: {
        soft: '0 1px 3px rgba(22, 32, 46, 0.06), 0 4px 16px rgba(22, 32, 46, 0.04)',
        panel: '0 8px 30px rgba(22, 32, 46, 0.06)',
      },

      backgroundImage: {
        'brand-gradient':
          'linear-gradient(135deg, #E3F1F0 0%, #F5F6F8 100%)',
      },
    },
  },

  plugins: [],
}