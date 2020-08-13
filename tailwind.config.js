module.exports = {
  purge: {
    enabled:false,
    content: [
      './resources/views/**/*.html',
      './resources/js/**/*.vue',
      './resources/js/**/*.js',
    ],
    options: {
      whitelist: [],
    }
  },
    
  theme: {
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      primary:"var(--color-primary)",
      black:"var(--color-black)",
      white:"var(--color-white)",
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '6rem',
      subtitle:'2rem',
      title: '8rem',
    },
    screens: {
      sm: '560px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontFamily: {
      title:[
        'inter'
      ],
      sans: [
        'inter',
        'system-ui',
      ],
      serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
    },
    fontWeight: {
      hairline: '100',
      thin: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    extend: {},
  },
  variants: {},
  plugins: [],
}