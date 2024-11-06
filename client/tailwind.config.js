import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 60A5FA - Dark Blue
        // 32292F - Dark Brown
        // 93C5FD - Light Blue
        // 705D56 - Light Brown
        // 86919C - Gray
        blue: {
          dark: "#60A5FA",
          light: "#93C5FD",
        },
        brown: {
          dark: "#32292F",
          light: "#705D56",
        },
        gray: "#86919C",
      },
    },
  },
  plugins: [daisyui]
}
