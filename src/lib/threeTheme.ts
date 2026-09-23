/**
 * Color palettes for the WebGL (Three.js) scenes, kept in sync with the CSS
 * variable theme in globals.css. Three.js materials take literal color
 * values (not CSS custom properties), so each 3D component reads the
 * current theme via useTheme() and looks up its colors here rather than
 * hardcoding hex values that would stay dark-themed even in light mode.
 *
 * Light mode is intentionally grayscale (white/gray/black only, per the
 * brief) — no blue/cyan/violet accents leak into the 3D scenes either.
 */
export interface ThreePalette {
  core: string; // primary glow / wireframe color
  ring: string; // secondary ring/accent color
  ring2: string; // tertiary ring/accent color
  dark: string; // solid "shadow" surface color
  particle: string;
  light: string; // point light color
}

export const THREE_PALETTES: Record<"light" | "dark", ThreePalette> = {
  dark: {
    core: "#29e7d9",
    ring: "#3e7bfa",
    ring2: "#7b5cfa",
    dark: "#0f1420",
    particle: "#29e7d9",
    light: "#6c9cff"
  },
  light: {
    core: "#171717",
    ring: "#404040",
    ring2: "#737373",
    dark: "#e5e5e5",
    particle: "#a3a3a3",
    light: "#ffffff"
  }
};
