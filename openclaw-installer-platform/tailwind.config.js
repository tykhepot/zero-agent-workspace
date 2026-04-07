/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.tsx', // Add this to catch all TSX files
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#165DFF",
          foreground: "#FFFFFF"
        },
        secondary: {
          DEFAULT: "#36CFC9",
          foreground: "#0F1428"
        },
        accent: {
          DEFAULT: "#FF7D00",
          foreground: "#FFFFFF"
        },
      },
    },
  },
  plugins: [],
}
