/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        regular: 400,
        semibold: 600,
      },
      fontSize: {
        base: '16px',
        sm: '14px',
        lg: '24px',
      },
      lineHeight: {
        base: '24px',
        sm: '20px',
      },
      colors: {
        cardForeground: '#090909',
        softGray: '#F4F4F5',
        mutedForeground: '#71717A'
      },
    },
  },
  plugins: [],
}
