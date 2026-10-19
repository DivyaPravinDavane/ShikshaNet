import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        sidebar: "var(--sidebar)",
        card: "var(--card)",
        "card-2": "var(--card-2)",
        border: "rgba(var(--border-rgb), <alpha-value>)",
        "border-subtle": "var(--border-subtle)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        primary: {
          DEFAULT: "#2F80FF",
          hover: "#256EDB",
          glow: "rgba(47, 128, 255, 0.25)",
        },
        success: {
          DEFAULT: "#22C55E",
          subtle: "rgba(34, 197, 94, 0.15)",
        },
        warning: {
          DEFAULT: "#F5B301",
          subtle: "rgba(245, 179, 1, 0.15)",
        },
        danger: {
          DEFAULT: "#EF4444",
          subtle: "rgba(239, 68, 68, 0.15)",
        },
        purple: {
          DEFAULT: "#8B5CF6",
          subtle: "rgba(139, 92, 246, 0.15)",
        },
        teal: {
          DEFAULT: "#14B8A6",
          subtle: "rgba(20, 184, 166, 0.15)",
        },
        orange: {
          DEFAULT: "#F97316",
          subtle: "rgba(249, 115, 22, 0.15)",
        },
      },
      borderColor: {
        DEFAULT: "var(--border)",
        border: "rgba(var(--border-rgb), <alpha-value>)",
        subtle: "var(--border-subtle)",
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
      },
      boxShadow: {
        cardGlow: "0 0 24px rgba(47, 128, 255, 0.08)",
        cardHover: "0 8px 32px rgba(15, 27, 61, 0.4)",
        primaryGlow: "0 0 16px rgba(47, 128, 255, 0.35)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
