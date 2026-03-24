import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#08111f',
        panel: '#101b2f',
        line: '#21304f',
        accent: '#8b5cf6',
        cyan: '#22d3ee',
        soft: '#cbd5e1'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(139,92,246,0.25), 0 10px 40px rgba(34,211,238,0.12)'
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at top left, rgba(139,92,246,0.15), transparent 30%), radial-gradient(circle at top right, rgba(34,211,238,0.12), transparent 25%), linear-gradient(180deg, rgba(10,14,23,0.9), rgba(8,17,31,1))'
      }
    }
  },
  plugins: []
};

export default config;
