/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  safelist: [
    // StatCard & badge gradient accent classes (used in ACCENT_MAP object keys)
    'from-indigo-500/15', 'via-indigo-600/5', 'text-indigo-400', 'border-indigo-500/30', 'shadow-indigo-500/10',
    'from-violet-500/15', 'via-violet-600/5', 'text-violet-400', 'border-violet-500/30', 'shadow-violet-500/10',
    'from-emerald-500/15', 'via-emerald-600/5', 'text-emerald-400', 'border-emerald-500/30', 'shadow-emerald-500/10',
    'from-amber-500/15',  'via-amber-600/5',  'text-amber-400',  'border-amber-500/30',  'shadow-amber-500/10',
    // Course color accent pills (parent panel courses)
    'bg-indigo-500/10', 'bg-violet-500/10', 'bg-emerald-500/10', 'bg-amber-500/10', 'bg-sky-500/10', 'bg-teal-500/10',
    'border-indigo-500/20', 'border-violet-500/20', 'border-emerald-500/20', 'border-amber-500/20', 'border-sky-500/20',
    'text-indigo-300', 'text-violet-300', 'text-emerald-300', 'text-amber-300', 'text-sky-300', 'text-teal-300',
    // Gradient bar colors for progress bars
    'from-indigo-500', 'from-violet-500', 'from-emerald-500', 'from-amber-500', 'from-sky-500',
    'to-emerald-400', 'to-violet-400', 'to-indigo-400',
    // Status badge background + borders
    'bg-rose-500/10', 'text-rose-400', 'border-rose-500/30', 'border-rose-500/20',
    'bg-emerald-500/10', 'border-emerald-500/30', 'border-emerald-500/20',
    'bg-indigo-500/10', 'border-indigo-500/30', 'border-indigo-500/20',
    'bg-amber-500/10', 'border-amber-500/30', 'border-amber-500/20',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f3ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      boxShadow: {
        'glow-indigo': '0 0 30px -5px rgba(99, 102, 241, 0.4)',
        'glow-violet': '0 0 30px -5px rgba(139, 92, 246, 0.4)',
        'glow-emerald': '0 0 30px -5px rgba(16, 185, 129, 0.4)',
      }
    },
  },
  plugins: [],
}
