/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF9D00',
        secondary: '#1a1f36',
        accent: '#64FFDA',
        background: '#020C1B',
        text: '#CCD6F6',
      },
    },
  },
  plugins: [],
} 