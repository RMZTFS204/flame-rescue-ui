
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Firefighter theme colors
        fire: {
          red: "#ea384c",
          orange: "#F97316",
          soft: "#FEC6A1",
          yellow: "#FEF7CD",
        },
        neutral: {
          dark: "#222222",
          gray: "#8E9196",
        },
      },
      fontFamily: {
        'baloo': ['"Baloo 2"', 'cursive'],
        'rubik': ['Rubik', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fire-pulse": {
          "0%, 100%": { 
            transform: "scale(1)",
            opacity: "1"
          },
          "50%": { 
            transform: "scale(1.05)",
            opacity: "0.8" 
          },
        },
        "siren-flash": {
          "0%, 49%, 100%": {
            backgroundColor: "#ea384c",
          },
          "50%, 99%": {
            backgroundColor: "#F97316",
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "water-flow": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(10px)" },
        },
        "danger-flash": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "truck-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fire-pulse": "fire-pulse 1.5s ease-in-out infinite",
        "siren-flash": "siren-flash 1s infinite",
        "float": "float 3s ease-in-out infinite",
        "water-flow": "water-flow 1s linear infinite",
        "danger-flash": "danger-flash 0.7s infinite",
        "truck-bounce": "truck-bounce 3s ease-in-out infinite",
      },
      boxShadow: {
        'glow': '0 0 15px rgba(234, 56, 76, 0.6)',
        'fire-glow': '0 0 20px rgba(249, 115, 22, 0.7)',
      },
      backgroundImage: {
        'fire-gradient': 'linear-gradient(90deg, #ea384c, #F97316)',
        'water-gradient': 'linear-gradient(90deg, #3b82f6, #38bdf8)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
