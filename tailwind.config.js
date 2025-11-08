/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ['Comfortaa', 'sans-serif'],
        brands: ['"Font Awesome 6 Brands"', 'sans-serif'],
      },
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.card-glass': {
          '@apply group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl cursor-pointer border border-white/50': {},
        },
        '.card-glass-link': {
          '@apply group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl cursor-pointer border border-white/50 block': {},
        },
        '.nav-link': {
          '@apply font-normal h-[45px] leading-[normal] ml-[42px] not-italic text-[40px] text-white cursor-pointer group-hover:-translate-y-2 transition-transform duration-300 ease-out block font-comfortaa': {},
        },
        '.section-heading': {
          '@apply font-comfortaa text-left pl-[40px] pt-[80px] font-bold text-white relative z-20': {
            'font-size': 'clamp(25px, 5vw, 100px)',
          },
        },
        '.section-container': {
          '@apply px-[40px] pt-[40px] pb-[80px] space-y-6 w-full relative z-20': {},
        },
      })
    }
  ],
}
