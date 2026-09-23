# Nitesh Pandey — Portfolio v3

A cinematic, interactive 3D portfolio built with Next.js 14 (App Router), TypeScript,
Tailwind CSS, React Three Fiber, Framer Motion, GSAP-adjacent scroll reveals, and Lenis
smooth scroll. Every fact on the site (name, stats, experience, education, projects,
awards, conferences, blog) was extracted from the previously live site at
niteshpandey.in — nothing is invented. See **Content TODO** below for the specific gaps.

Ships with a **light/dark theme toggle** (defaults to light) and a hero built around a
mouse-scrub video interaction — see **Theming** and **The hero — design rationale** below.

## Run it

Requires Node 18.17+.

```bash
npm install
npm run dev      # http://localhost:3000, hot reload
```

Production build:

```bash
npm run build
npm start
```

> **Note on fonts:** the layout imports Inter, Space Grotesk, and JetBrains Mono via
> `next/font/google`, which fetches them at build time. This needs a normal internet
> connection during `npm run build` / `npm run dev` (any machine with regular internet
> access is fine — this only fails somewhere with Google Fonts specifically blocked).

## Theming (light/dark)

The site ships with both a light and a dark theme, **defaulting to light**, toggled from
the navbar (sun/moon button, both desktop and mobile). The choice is remembered in
`localStorage` (`np-theme`) and restored on return visits.

- **Mechanism**: all colors are CSS custom properties (`--c-bg`, `--c-text`,
  `--c-accent`, etc.) defined on `:root` (light) and overridden on `html.dark` (dark),
  in `src/app/globals.css`. Components consume them via Tailwind arbitrary values
  (`bg-[var(--c-bg)]`, `text-[var(--c-text-muted)]`) instead of Tailwind's `dark:`
  variant, so every color lives in one place.
- **State**: `src/components/layout/ThemeProvider.tsx` holds the current theme in
  React context, flips the `.dark` class on `<html>`, and persists the choice.
  `src/components/layout/ThemeToggle.tsx` is the sun/moon button. A small synchronous
  script in `src/app/layout.tsx`'s `<head>` applies `.dark` before first paint for
  returning dark-mode visitors, so there's no flash of the wrong theme.
- **Light mode palette — white, gray, and black only**: no blue/cyan/violet accents.
  Buttons, links, and the 3D scenes all render in a strict grayscale — accent color is
  `#0a0a0a` (near-black) with white text on it.
- **Dark mode palette**: keeps the original AI/robotics identity — near-black
  background, electric blue (`#3e7bfa`) and neon cyan (`#29e7d9`) accents.
- **3D scenes**: WebGL materials can't read CSS variables, so `src/lib/threeTheme.ts`
  exports a `THREE_PALETTES` lookup (`light` / `dark`) with the literal hex values each
  Three.js component (`AICore`, `ParticleField`, `SkillGalaxy`, `AnimatedGlobe`) reads
  via `useTheme()`, so the floating AI core, skill galaxy, and contact globe recolor
  along with the rest of the page.

Typography: **Space Grotesk** (display/headings), **Inter** (body), **JetBrains Mono**
(labels, eyebrows, HUD readouts, stats) — set as Tailwind font families in
`tailwind.config.ts`.

## The hero — design rationale

The hero is a full-bleed video built around a **mouse-scrub interaction**: instead of
autoplaying, the head-turn clip's playhead is driven by horizontal mouse movement
(`src/hooks/useScrubVideo.ts`) — drag the cursor left and right across the page and the
clip scrubs back and forth through the turn. On touch devices and under
`prefers-reduced-motion`, it falls back to a normal autoplaying muted loop.

Over the video:

- A blurred two-line intro ("Hey there, I'm Nitesh — an AI, robotics & cybersecurity
  engineer.") fades in first, out of focus, as a quiet establishing beat.
- A **typewriter line** (`src/hooks/useTypewriter.ts`) then types out Nitesh's real
  hero summary character by character, with a blinking cursor.
- **Pill-shaped CTA buttons** ("View my work", "Read my research", "See my experience",
  "Download résumé") plus a copy-to-clipboard email pill, all using Nitesh's real links.
- The original AI/robotics HUD identity (glowing corner brackets, a mono "Scan //
  NP–01" / "Online" readout, and the floating 3D AI core) is layered on top so the
  video reads as part of the AI/robotics identity rather than a plain stock clip.

All copy is Nitesh's own — this technique was adapted from an unrelated reference
brief, but no fictional agency/persona names or copy from that brief appear anywhere
on the site.

> **Video source note:** the hero currently uses the previously-uploaded head-turn
> clip at `public/video/hero-turn.mp4`. Swap in the final direct-download video file at
> that same path (or update the `src` in `src/components/sections/Hero.tsx`) once it's
> available — a Google Flow *share* link can't be used directly as a `<video src>`
> since it requires a login to view.

## Architecture

```
src/
  app/
    layout.tsx          Root layout, fonts, metadata
    page.tsx             Assembles all sections
    globals.css          Design tokens, custom cursor, glass utility
    api/contact/route.ts Contact form endpoint (logs submissions — see TODO)
  components/
    layout/              Navbar, Footer, CustomCursor, LoadingScreen, SmoothScrollProvider,
                          ThemeProvider, ThemeToggle
    sections/            Hero, About, Skills, Experience, Projects, Research,
                          Leadership, Achievements, Contact — one per homepage section
    three/                ParticleField, AICore, SkillGalaxy, AnimatedGlobe
                          (all primitive-geometry Three.js, no external model files;
                          colors read from lib/threeTheme.ts so they follow the theme)
    ui/                   MagneticButton, GlassCard, SectionHeading, StatCounter, TiltCard
  hooks/                 useLenis, useReducedMotion, useTypewriter, useScrubVideo
  lib/                   data.ts (typed content), utils.ts, threeTheme.ts (3D color palettes)
  types/                 Shared TypeScript interfaces (Profile, Project, Skill, ...)
public/
  video/hero-turn.mp4    The head-turn portrait clip
  images/profile-*.png   The 5 reference portrait stills (used as project thumbnails
                          as a placeholder — see Content TODO)
```

## Animation strategy

- **Scroll**: Lenis drives smooth-scroll physics (`useLenis` hook); disabled entirely
  under `prefers-reduced-motion`.
- **Reveals**: Framer Motion `whileInView` on every section heading/card, `once: true`
  so nothing replays annoyingly on scroll-back.
- **Micro-interactions**: `MagneticButton` (cursor-attraction spring), `TiltCard`
  (pointer-driven 3D tilt + specular highlight on project cards), custom ring cursor
  that scales up over interactive elements.
- **3D**: React Three Fiber scenes are isolated per section (hero particles + AI core,
  skills galaxy, contact globe) and lazy-mounted via `<Suspense>` so they don't block
  first paint.

## Performance

- 3D scenes use low `dpr` caps (`[1, 1.5]`), primitive geometry only (no imported
  models/textures), and are capped to the sections that need them rather than one
  giant persistent canvas.
- `next/image` for project thumbnails (automatic AVIF/WebP, lazy loading below the fold).
- `next/font` self-hosts Google Fonts at build time (no runtime font-loading requests,
  no layout shift).
- Confirmed: `npm run build` compiles cleanly, passes TypeScript's strict checks, and
  statically prerenders every route.

## Accessibility

- Skip-to-content link, visible focus states via default Tailwind/browser outlines.
- The 3D skill galaxy has a `sr-only` plain-text list of every skill alongside it, so
  screen readers and no-WebGL visitors get the same information.
- Custom cursor and Lenis smooth-scroll are both skipped under
  `prefers-reduced-motion` or on coarse-pointer (touch) devices where they don't apply.
- Semantic landmarks (`header`, `main`, `footer`), labeled form fields, `alt` text on
  all images, `aria-label` on the hero video.

## Content TODO

Extracted from niteshpandey.in; LinkedIn (linkedin.com/in/niteshpandey46974) sits
behind a login wall and could not be scraped, so anything only listed there isn't
reflected here.

- **Project details** — only titles were available for most projects (SIH 2024, 3D
  Printing, Advanced Wheelchair, Svatanya, Industrial Robot, Legged Robot, LiDAR):
  descriptions, tech stacks, and GitHub/demo links are mostly placeholders in
  `src/lib/data.ts`. The 5 uploaded portrait stills are used as temporary project
  thumbnails — swap in real project photos.
- **GitHub profile** — none found on the source site or the given LinkedIn URL.
- **Publication titles** — 30 research articles are claimed with a Google Scholar
  link, but individual paper titles weren't listed on the source page.
- **Recommendation quotes** — Rospinot, JPVL, and Orison are named as recommenders
  with no quote text available.
- **Education year** — the source site lists the Bachelor's degree as 2015, earlier
  than the Senior Secondary (2021) and Secondary (2019) entries — flagged inline on
  the Experience section; please confirm the correct year.
- **Contact form email delivery** — `/api/contact` currently only logs submissions
  server-side. Wire it to a real provider (e.g. [Resend](https://resend.com), or
  Nodemailer + SMTP) before relying on it.
- **Favicon / OG image** — not yet added.

## Deployment

This is a standard Next.js app — deploys as-is to Vercel, Netlify, or any Node host:

```bash
# Vercel
npx vercel

# Any Node host
npm run build
npm start
```

## Future improvements

- Real project case-study pages (currently cards link out to external demo/GitHub URLs).
- Command palette (⌘K) for quick navigation — scoped out of this pass to keep the
  bundle focused; the section anchors and mobile menu already cover navigation.
- Blog/research content migrated in-site rather than linking out to the old
  niteshpandey.in blog posts.
- Swap the contact form's console.log for a real email provider (see Content TODO).
