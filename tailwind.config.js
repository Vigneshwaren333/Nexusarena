/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f2ff',
        'neon-purple': '#7122fa',
        'cyber-black': '#0a0a0a',
        'cyber-gray': '#1a1a1a',
        'neon-pink': '#ff00ff',
      },
      fontFamily: {
        'future': ['Orbitron', 'sans-serif'],
        'code': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.neon-blue"), 0 0 20px theme("colors.neon-blue")',
        'neon-purple': '0 0 5px theme("colors.neon-purple"), 0 0 20px theme("colors.neon-purple")',
      },
    },
  },
  plugins: [],
}