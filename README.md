# RESONANCE

A pure-dark, cinematic, GSAP-driven music site. Giant Satoshi headings that
mask-flip into place, scroll-choreographed galleries, a `mix-blend-difference`
navbar, and a persistent now-playing bar. **Click any song and it plays from the
start.**

## Stack

- **Next.js 16** (App Router, React 19, TypeScript strict)
- **Tailwind CSS v4** (`@theme inline` + oklch tokens, permanent dark)
- **GSAP + ScrollTrigger** — the entire motion system
- **lucide-react** icons, `cn()` (clsx + tailwind-merge)
- One shared native `<audio>` driven by a React `PlayerProvider`

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run check    # lint + typecheck + build
```

## Album art

Real, aesthetic album covers ship in `public/covers/<slug>.jpg` — fetched from
the iTunes Search API (no key needed). Re-fetch or refresh them any time:

```bash
node scripts/fetch-covers.mjs          # fills in any missing covers
node scripts/fetch-covers.mjs --force  # re-download all
```

Any cover that's still missing falls back to a deterministic gradient, so the
grid never shows a broken image.

## Adding your own media

Real recordings are copyrighted, so the app ships with a bundled royalty-free
placeholder tone (`public/audio/placeholder.wav`) that plays whenever a real
file is missing. To use your own:

| Asset      | Location                       | Naming                 |
|------------|--------------------------------|------------------------|
| **Audio**  | `public/audio/<slug>.mp3`      | by each track's `slug` |
| **Covers** | `public/covers/<slug>.jpg`     | by each track's `slug` |
| **Fonts**  | `public/fonts/Satoshi-*.woff2` | see `public/fonts/`    |

Slugs are defined in [`src/data/tracks.ts`](src/data/tracks.ts) — e.g. the track
`double-take` looks for `/audio/double-take.mp3` and `/covers/double-take.jpg`.
Missing covers fall back to a deterministic gradient; missing audio falls back to
the placeholder clip with a subtle toast. Nothing crashes.

## Structure

```
src/
  app/            layout.tsx · page.tsx · globals.css
  components/
    FlipHeading.tsx        letter-by-letter mask-reveal + hover flip
    Navbar.tsx             fixed mix-blend-difference
    Hero.tsx               full-height intro
    FeaturedSection.tsx    the 6 special songs
    Library.tsx            pinned, scroll-scrubbed horizontal gallery + filters
    QuoteBlock.tsx         word-by-word scrub reveal with sticky image
    Footer.tsx             artist marquee + back-to-top
    player/                PlayerProvider · NowPlayingBar · Toast
    ui/                    Cover (gradient fallback) · EqBars
  data/tracks.ts           typed tracklist (featured first, then EN + HI)
  lib/                     gsap.ts (registers ScrollTrigger) · utils.ts
```

## Accessibility & motion

`prefers-reduced-motion: reduce` removes all scroll/hover motion (headings show
immediately, marquee/disc/EQ freeze) while keeping everything readable and the
player fully usable. Responsive from 320px to ultrawide.
