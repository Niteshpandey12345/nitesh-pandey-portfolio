import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.heroSummary,
  metadataBase: new URL("https://niteshpandey.in"),
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.heroSummary,
    type: "website",
    url: "https://niteshpandey.in",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.title}`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: profile.heroSummary,
    images: ["/og-image.jpg"]
  },
  robots: { index: true, follow: true }
};

// Runs before paint, synchronously, so a returning dark-mode visitor never
// sees a flash of the light default. Light itself needs no script — it's
// the CSS default (no .dark class) — this only matters for the dark case.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("np-theme");
    if (stored === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        {/* Skip link for keyboard/screen-reader users past the fixed nav + 3D canvas */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-md focus:bg-[var(--c-accent)] focus:px-4 focus:py-2 focus:text-[var(--c-accent-contrast)]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}