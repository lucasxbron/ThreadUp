export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic colors
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        
        card: 'var(--color-card)',
        'card-foreground': 'var(--color-card-foreground)',
        
        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        
        border: 'var(--color-border)',
        
        input: 'var(--color-input)',
        
        primary: {
          DEFAULT: 'var(--color-primary)',
          '600': 'var(--color-primary-600)',
          '700': 'var(--color-primary-700)',
          foreground: 'var(--color-primary-foreground)',
        },
        
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          '400': 'var(--color-secondary-400)',
          '500': 'var(--color-secondary-500)',
          foreground: 'var(--color-secondary-foreground)',
        },
        
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          '600': 'var(--color-destructive-600)',
          '700': 'var(--color-destructive-700)',
          foreground: 'var(--color-destructive-foreground)',
        },
        
        success: {
          DEFAULT: 'var(--color-success)',
          foreground: 'var(--color-success-foreground)',
        },
        
        warning: {
          DEFAULT: 'var(--color-warning)',
          foreground: 'var(--color-warning-foreground)',
        },
        
        info: {
          DEFAULT: 'var(--color-info)',
          foreground: 'var(--color-info-foreground)',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};