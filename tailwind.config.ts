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
        // Distinctive PC gaming/hardware inspired palette
        bg: '#050505',           // Deep black for immersive gaming feel
        panel: '#0a0a0a',        // Slightly lighter for panels
        line: '#1a1a2e',         // Dark blue-gray for borders
        accent: '#ff6b35',       // Warm GPU/RGB lighting orange
        accentSecondary: '#00ffaa', // Circuit board green
        accentDark: '#8b0000',   // Dark red for warnings/alerts
        silver: '#8a8a8a',       // Motherboard/chassis silver
        white: '#ffffff',
        soft: '#e0e0e0',         // Softer text for secondary info
        muted: '#666666',        // Muted text
        // Status colors
        success: '#00ff88',
        warning: '#ffaa00',
        error: '#ff3333',
        info: '#3399ff'
      },
      fontFamily: {
        // Distinctive typography pairing for gaming/tech
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'display': ['Orbitron', 'Rajdhani', 'Arial', 'sans-serif'], // Tech/gaming feel
        'mono': ['Space Mono', 'JetBrains Mono', 'Fira Code', 'monospace'] // For code/data
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,107,53,0.25), 0 8px 32px rgba(0,255,170,0.1)',
        inner: 'inset 0 0 8px rgba(0,255,170,0.1)',
        hardware: '0 4px 12px rgba(0,0,0,0.3), inset 0 0 4px rgba(255,107,53,0.1)'
      },
      backgroundImage: {
        // Subtle hardware-inspired patterns
        'circuit': "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"60\" viewBox=\"0 0 60 60\"><rect width=\"60\" height=\"60\" fill=\"none\"/><path d=\"M0,30 L60,30 M30,0 L30,60 M15,15 L45,15 M15,45 L45,45\" stroke=\"rgba(0,255,170,0.03)\" stroke-width=\"0.5\"/></svg>')",
        'chip': "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\"><rect width=\"40\" height=\"40\" rx=\"4\" fill=\"rgba(10,10,10,0.3)\"/><circle cx=\"20\" cy=\"20\" r=\"8\" fill=\"rgba(255,107,53,0.1)\"/><rect x=\"10\" y=\"10\" width=\"20\" height=\"20\" rx=\"2\" fill=\"rgba(0,255,170,0.05)\"/></svg>')"
      }
    }
  },
  plugins: []
};

export default config;