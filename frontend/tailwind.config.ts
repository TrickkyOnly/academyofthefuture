import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        accent: '#DBEAFE'
      }
    }
  },
  plugins: []
};

export default config;
