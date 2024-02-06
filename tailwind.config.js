/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: {
  //   enabled: true,
  //   content: ["./**/*.html"],
  // },
  // darkMode: false, // or 'media' or 'class'
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'NotoSansTC', 'ui-sans-serif', 'system-ui'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      colors: {
        //primary: 'var(--color-primary)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          500: 'var(--color-primary-500)', // 添加 '500' 色調
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          500: 'var(--color-secondary-500)', // 添加 '500' 色調
        },
      },
      textColor: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          500: 'var(--color-primary-500)', // 添加 '500' 色調
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          500: 'var(--color-secondary-500)', // 添加 '500' 色調
        },
      },
      // 覆蓋預設的背景顏色
      backgroundColor: ({ theme }) => theme('colors'),
      borderRadius: {
        none: '0',
        xs: '0.1875rem',
        sm: '0.25rem',
        default: '0.3125rem',
        lg: '0.375rem',
        xl: '0.4375rem',
        '2xl': '0.4791666865348816rem',
        '3xl': '0.625rem',
        '4xl': '0.75rem',
        '5xl': '1rem',
        '6xl': '1.25rem',
        '7xl': '1.75rem',
        '8xl': '1.875rem',
        '9xl': '2.3125rem',
        full: '9999px',
      },
      // border:{
      //   borderColor: ({ theme }) => ({
      //     ...theme('colors'),
      //     DEFAULT: theme('colors.primary', 'currentColor'),
      //   }),
      // },
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
    },
  },
  plugins: [],
}
