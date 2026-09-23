import type { Config } from "tailwindcss";

/**
 * Color system
 * -----------------------------------------------------------------------
 * The hero video is a neutral studio portrait: pure white background,
 * warm-grey stone blazer, black shirt, warm skin tone. Rather than clash
 * with that neutrality, the palette below builds the futuristic AI/robotics
 * identity around it: a near-black "void" base (so the white video reads as
 * a deliberate lit stage, not a jarring rectangle), one electric blue and
 * one neon cyan as the two signal colors (used sparingly, for glow/CTAs/
 * data-accents), and a single violet used only for the deepest background
 * gradients — never as a headline color, so the palette never reads as
 * "rainbow." Warm neutrals (stone/sand) lifted directly from the blazer
 * tone are used for card surfaces around the video so it sits naturally in
 * the layout instead of looking pasted on.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#05070C",
          soft: "#0A0E17",
          raised: "#0F1420"
        },
        navy: {
          DEFAULT: "#0B1224",
          deep: "#060A16"
        },
        electric: {
          DEFAULT: "#3E7BFA",
          soft: "#6C9CFF",
          dim: "#1E3A73"
        },
        cyan: {
          DEFAULT: "#29E7D9",
          soft: "#7DF3E8"
        },
        violet: {
          DEFAULT: "#7B5CFA",
          deep: "#4B2F9E"
        },
        stone: {
          card: "#E9E4DA",
          line: "#D8D2C4"
        },
        ink: {
          DEFAULT: "#F4F6FB",
          muted: "#98A2B8",
          faint: "#5B6478"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      backgroundImage: {
        "grid-glow": "radial-gradient(circle at 50% 0%, rgba(62,123,250,0.16), transparent 60%)",
        "core-glow": "radial-gradient(circle, rgba(41,231,217,0.35), rgba(123,92,250,0.08) 55%, transparent 75%)"
      },
      animation: {
        "spin-slow": "spin 18s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" }
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" }
        }
      }
    }
  },
  plugins: []
};

export default config;
