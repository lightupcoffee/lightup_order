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
      colors: {
        primary: 'var(--color-primary-rgb)',
        secondary: 'var(--color-secondary-rgb',
      },
      textColor: {
        primary: 'var(--color-primary-rgb)',
        secondary: 'var(--color-secondary-rgb',
      },
      // 覆蓋預設的背景顏色
      backgroundColor: ({ theme }) => theme('colors'),
      // border:{
      //   borderColor: ({ theme }) => ({
      //     ...theme('colors'),
      //     DEFAULT: theme('colors.primary', 'currentColor'),
      //   }),
      // },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
