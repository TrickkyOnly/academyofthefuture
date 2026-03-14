import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5B5BD6',
        accent: '#00BFA6'
      }
    }
  },
  plugins: []
};

export default config;
