
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
        // MyMagicMeet theme colors
        magic: {
          blue: "#D3E4FD", // Soft blue
          darkBlue: "#0EA5E9", // Ocean blue for buttons/links
          gold: "#E6B325", // Gold for accents
          goldLight: "#F9D775", // Light gold for highlights
          purple: "#8D7FBC", // Magical purple
          pink: "#F7C0DF", // Soft pink
          night: "#1E293B", // Dark blue for night theme
          background: "#F8FAFC", // Light background
          card: "#FFFFFF", // Card background
        }
      },
      fontFamily: {
        'baloo': ['"Baloo 2"', 'cursive'],
        'rubik': ['Rubik', 'sans-serif'],
        'enchanted': ['"Baloo 2"', 'fantasy', 'cursive'], // For magical headings
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
        "sparkle": {
          "0%, 100%": { opacity: "0", transform: "scale(0.8) rotate(0deg)" },
          "50%": { opacity: "1", transform: "scale(1.2) rotate(180deg)" },
        },
        "magic-fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "magic-pulse": {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 rgba(230, 179, 37, 0)" },
          "50%": { transform: "scale(1.05)", boxShadow: "0 0 10px rgba(230, 179, 37, 0.5)" },
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
        "sparkle": "sparkle 2s ease-in-out infinite",
        "magic-fade-in": "magic-fade-in 0.7s ease-out",
        "magic-pulse": "magic-pulse 3s ease-in-out infinite",
      },
      boxShadow: {
        'glow': '0 0 15px rgba(234, 56, 76, 0.6)',
        'fire-glow': '0 0 20px rgba(249, 115, 22, 0.7)',
        'magic-glow': '0 0 15px rgba(230, 179, 37, 0.4)',
        'enchanted': '0 0 20px rgba(141, 127, 188, 0.6)',
      },
      backgroundImage: {
        'fire-gradient': 'linear-gradient(90deg, #ea384c, #F97316)',
        'water-gradient': 'linear-gradient(90deg, #3b82f6, #38bdf8)',
        'magic-gradient': 'linear-gradient(135deg, #D3E4FD, #8D7FBC)',
        'gold-gradient': 'linear-gradient(to right, #E6B325, #F9D775)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
