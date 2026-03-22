/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#eef4ef',
          surface: '#ffffff',
          muted: '#e3ebe4',
          border: '#c5d8c9',
          ink: '#1a2e1f',
          'ink-muted': '#4a6350',
          leaf: '#2d6a3e',
          'leaf-dark': '#1f4d2c',
          'leaf-light': '#3d8a52',
          sage: '#6b9070',
          cream: '#f7faf7',
          accent: '#b8922e',
          'accent-soft': '#d4b87a',
        },
      },
      boxShadow: {
        'brand-soft': '0 4px 24px -4px rgba(45, 106, 62, 0.12)',
        'admin-card': '0 1px 3px rgba(26, 46, 31, 0.06), 0 8px 24px -8px rgba(45, 106, 62, 0.08)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

