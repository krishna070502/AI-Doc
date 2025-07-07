/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00D4FF',
        'neon-purple': '#8B5CF6',
        'neon-pink': '#FF1CF7',
        'cyber-dark': '#0D1117',
        'cyber-gray': '#161B22',
        'glass-white': 'rgba(255, 255, 255, 0.1)',
        'glass-dark': 'rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        'cyber': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'neon-gradient': 'linear-gradient(135deg, #00D4FF 0%, #8B5CF6 50%, #FF1CF7 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0D1117 0%, #161B22 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00D4FF, 0 0 10px #00D4FF, 0 0 15px #00D4FF' },
          '100%': { boxShadow: '0 0 10px #00D4FF, 0 0 20px #00D4FF, 0 0 30px #00D4FF' },
        },
        'pulse-neon': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 5px #00D4FF, 0 0 10px #00D4FF'
          },
          '50%': { 
            opacity: '0.8',
            boxShadow: '0 0 20px #00D4FF, 0 0 30px #00D4FF, 0 0 40px #00D4FF'
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'neon': '0 0 5px #00D4FF, 0 0 10px #00D4FF, 0 0 15px #00D4FF',
        'neon-purple': '0 0 5px #8B5CF6, 0 0 10px #8B5CF6, 0 0 15px #8B5CF6',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'cyber': '0 4px 20px rgba(0, 212, 255, 0.3)',
        'glow-lg': '0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)',
      },
    },
  },
  plugins: [],
}
