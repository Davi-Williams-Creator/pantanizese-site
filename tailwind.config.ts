import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pantanize: {
          green: "#86CC45",     // Verde vibrante do jacaré
          dark: "#1A330E",      // Verde escuro
          cream: "#FDFCF0",     // Fundo creme
          accent: "#2D4A22",    // Verde médio
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      }
    },
  },
  plugins: [],
};

export default config;