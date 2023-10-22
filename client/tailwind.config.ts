import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'pandesal-orange': 'hsla(26, 91%, 54%, 1)',
        'pandesal-blue': 'hsla(201, 93%, 80%, 1)',
        'pandesal-grey': 'hsla(205, 21%, 69%, 1)',
        'pandesal-purple': 'hsla(261, 93%, 75%, 1)'
      }
    },
  },
  plugins: [],
}
export default config
