# Build Prompt — "RESONANCE" (the song twin of *The Art of Cinema*)

> Paste this whole file into Claude (or any capable AI coder) as the build brief.
>
> **Read this first.** This is a **1:1 re-skin of an existing site** — the dark, GSAP-driven
> art site **`theartofcinema.xyz`** (a working clone of it lives in the sibling folder
> `../movie-clone`). That site is about **film**. We are building the **exact same site,
> section for section, animation for animation, class for class — but about SONGS.**
>
> Do **not** invent a new layout. Do **not** "borrow the soul." **Mirror it.** Every section,
> every GSAP effect, every CSS class, every scroll behaviour in `../movie-clone/src` must have
> a twin here — only the *content* (films → songs), the *images* (movie stills → album art),
> and **one added system** (an audio player so that **clicking any song plays it instantly**)
> are different.
>
> If you can open `../movie-clone`, **read it and copy its structure verbatim.** This document
> reproduces everything you need even if you can't.

---

## 0. One-line intent

The pure-black, weightless, cinematic feel of `theartofcinema.xyz` — giant Satoshi headings that
mask-flip up letter-by-letter, a pinned horizontal cover track, a stacked card deck that fans
out on scroll, a circular wheel gallery that rotates on scroll, a word-by-word quote reveal,
a `mix-blend-difference` navbar — **rebuilt for a record collection.** Every cover you see is a
real, aesthetic, **Spotify-style album image**, and **clicking any of them starts the song
instantly** with a persistent now-playing bar at the bottom.

---

## 1. The reference & the mapping (most important section)

We are cloning `../movie-clone`. Here is the **exact section-for-section map** you must follow.
Same order, same effects, same class names — only content + images change, plus the player.

| # | movie-clone component         | effect / class      | RESONANCE twin (build this) | what changes |
|---|-------------------------------|---------------------|-----------------------------|--------------|
| 1 | `Navbar.tsx`                  | `.navbar` mix-blend | **Navbar**                  | wordmark → `RESONANCE` |
| 2 | `Hero.tsx`                    | `FlipHeading`       | **Hero**                    | "THE ART OF CINEMA" → **"THE ART OF SOUND"** |
| 3 | `ScenesSection.tsx`          | `mwg_effect033`     | **TrackSection** (horizontal cover track) | movie stills → **album covers, each click-to-play** |
| 4 | `VoicesSection.tsx`          | text grid           | **ArtistsSection**          | "Voices Of Cinema" → **"Voices Of Sound"** |
| 5 | `StoriesSection.tsx`         | `Reveal` clip-wipe  | **StoriesSection**          | director/actor stills → **artist / mood / album imagery** |
| 6 | `GenreSection.tsx`           | text grid           | **GenreSection**            | film genres → **music genres** |
| 7 | `ClassicsSection.tsx`        | `mwg_effect018`     | **ClassicsSection** (stacked deck) | film cards → **album covers, click-to-play** |
| 8 | `FavoritesSection.tsx`       | `mwg_effect003`     | **FavoritesSection** (wheel) | film cards → **the 6 featured songs, click-to-play** |
| 9 | `QuoteSection.tsx`           | `mwg_effect029`     | **QuoteSection**            | film quote → **a lyric / quote about music** |
| — | *(new — not in movie-clone)* | —                   | **NowPlayingBar + PlayerProvider** | the audio system |
| 10| `Footer.tsx`                 | `FlipHeading`       | **Footer**                  | "THE END." → **"THE END."** + music sign-off |

`app/page.tsx` composes them in this exact order (NowPlayingBar + PlayerProvider wrap everything):

```tsx
<PlayerProvider>
  <Navbar />
  <main className="overflow-x-clip">
    <Hero />
    <TrackSection />        {/* mwg_effect033 — horizontal cover track */}
    <ArtistsSection />
    <StoriesSection />      {/* Reveal clip-wipes */}
    <GenreSection />
    <ClassicsSection />     {/* mwg_effect018 — stacked deck */}
    <FavoritesSection />    {/* mwg_effect003 — rotating wheel */}
    <QuoteSection />        {/* mwg_effect029 — word reveal */}
    <Footer />
  </main>
  <NowPlayingBar />        {/* fixed bottom, persistent */}
</PlayerProvider>
```

**Rule:** if a choice trades smoothness for snappiness — choose smoothness. Match the original's
buttery 60fps feel exactly.

---

## 2. Tech stack (use this exact stack — it matches movie-clone)

| Concern     | Use                                                                  |
|-------------|----------------------------------------------------------------------|
| Framework   | **Next.js 16** (App Router, React 19, TypeScript **strict**, no `any`)|
| Styling     | **Tailwind CSS v4** with `@theme inline` + oklch tokens, permanent dark|
| UI prims    | shadcn-style tokens, `cn()` from `clsx` + `tailwind-merge`           |
| Icons       | **lucide-react**                                                     |
| Animation   | **GSAP + ScrollTrigger** — the *entire* motion system (no Framer)    |
| Audio       | One shared native `<audio>` driven by a React **PlayerProvider**     |
| Fonts       | **Satoshi** (Black / Bold / Medium / Regular), self-hosted `.woff2`  |

> ⚠️ Next.js 16 — RSC by default. Anything using GSAP, hooks, or the audio context is a
> **Client Component** (`"use client"`). Register ScrollTrigger once in `src/lib/gsap.ts`
> guarded by `typeof window !== "undefined"`. Always run GSAP inside `gsap.context()` and
> `ctx.revert()` on cleanup.

```ts
// src/lib/gsap.ts
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
```

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...i: ClassValue[]) => twMerge(clsx(i));
```

---

## 3. Global CSS — copy this verbatim into `app/globals.css`

This is **the movie-clone's `globals.css`, unchanged** (tokens + Satoshi + char-flip + navbar +
all four MWG effects), with one extra block for the now-playing bar at the end. Use it exactly so
the effects behave identically.

```css
@import "tailwindcss";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}

:root { --background: #0a0a0a; --foreground: #f1f1f1; --radius: 0.625rem; }

/* ===== fonts (self-host into public/fonts) ===== */
@font-face { font-family: "Satoshi-Black";   src: url("/fonts/Satoshi-Black.woff2")   format("woff2"); font-display: swap; }
@font-face { font-family: "Satoshi-Bold";    src: url("/fonts/Satoshi-Bold.woff2")    format("woff2"); font-display: swap; }
@font-face { font-family: "Satoshi-Medium";  src: url("/fonts/Satoshi-Medium.woff2")  format("woff2"); font-display: swap; }
@font-face { font-family: "Satoshi-Regular"; src: url("/fonts/Satoshi-Regular.woff2") format("woff2"); font-display: swap; }
.font-Satoshi-Black   { font-family: "Satoshi-Black", sans-serif; }
.font-Satoshi-Bold    { font-family: "Satoshi-Bold", sans-serif; }
.font-Satoshi-Medium  { font-family: "Satoshi-Medium", sans-serif; }
.font-Satoshi-Regular { font-family: "Satoshi-Regular", sans-serif; }

/* ===== base dark theme ===== */
html, body { background-color: #0a0a0a; color: #f1f1f1; }
body { font-family: "Satoshi-Medium", sans-serif; -webkit-font-smoothing: antialiased; overflow-x: clip; }
::selection { background: #f1f1f1; color: #0a0a0a; }

/* ===== heading letter-flip (FlipHeading) ===== */
.char { position: relative; display: inline-flex; flex-direction: column; overflow: hidden; line-height: 1; }
.char > span { display: block; transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1); }
.char > span:nth-child(2) { position: absolute; top: 100%; left: 0; }
.flip-heading:hover .char > span:nth-child(1),
.char.is-flipping > span:nth-child(1) { transform: translateY(-100%); }
.flip-heading:hover .char > span:nth-child(2),
.char.is-flipping > span:nth-child(2) { transform: translateY(-100%); }

/* ===== navbar (mix-blend) ===== */
.navbar { position: fixed; top: 0; left: 0; width: 100%; z-index: 50; display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 1.25rem; mix-blend-mode: difference; pointer-events: none; }
.navbar a, .navbar span { pointer-events: auto; }
@media (min-width: 768px) { .navbar { padding: 1.75rem 2rem; } }

/* ===== effect033: horizontal cover track (TrackSection) ===== */
.mwg_effect033 { width: 100%; height: 100vh; overflow: hidden; position: relative; }
.mwg_effect033 .scroll { pointer-events: none; width: 100%; position: absolute; top: 0; left: 0; }
.mwg_effect033 .container { white-space: nowrap; will-change: transform; align-items: center; width: max-content; height: 100%; padding: 0 110vw; display: flex; }
.mwg_effect033 .medias { grid-template-rows: repeat(3, auto); grid-auto-flow: column; align-items: center; gap: 5vw; height: auto; display: grid; position: relative; }
/* NOTE: covers are square (1/1), not the film 18x13 — see §6 */
.mwg_effect033 .media { will-change: transform; object-fit: cover; object-position: center; flex-shrink: 0; width: 15vw; min-width: 15vw; height: 15vw; min-height: 15vw; display: block; position: relative; border-radius: 0.6vw; cursor: pointer; }
.mwg_effect033 .media-card { pointer-events: auto; }

/* ===== effect018: stacked deck (ClassicsSection) ===== */
.mwg_effect018 .pin-height { height: 300vh; }
.mwg_effect018 .container { justify-content: center; align-items: center; height: 100vh; padding: 0 0 0 12vw; display: flex; position: sticky; top: 0; }
.mwg_effect018 .card { aspect-ratio: 1 / 1; color: #fff; text-transform: uppercase; backdrop-filter: blur(6px); border: 1px solid #606060; border-radius: 1vw; flex-direction: column; justify-content: center; align-items: center; width: 22vw; margin: 0 0 0 -6vw; padding: 0.8vw; display: flex; will-change: transform; cursor: pointer; }
.mwg_effect018 .card:first-child { margin-left: 0; }
.mwg_effect018 .card img { border-radius: 0.8vw; width: 100%; aspect-ratio: 1/1; object-fit: cover; }

/* ===== effect003: rotating wheel (FavoritesSection) ===== */
.mwg_effect003 { position: relative; overflow: clip; }
.mwg_effect003 .pin-height { height: 300vh; }
.mwg_effect003 .container { height: 100vh; position: sticky; top: 0; overflow: clip; }
.mwg_effect003 .circles { position: absolute; inset: 0; }
.mwg_effect003 .card { aspect-ratio: 1 / 1; will-change: transform; backdrop-filter: blur(6px); border: 1px solid #606060; border-radius: 1vw; width: 20vw; padding: 0.8vw; overflow: hidden; position: absolute; top: 0; left: 0; cursor: pointer; }
.mwg_effect003 .card .media { object-fit: cover; border-radius: 0.6vw; width: 100%; height: 100%; display: block; }

/* ===== effect029: quote word reveal (QuoteSection) ===== */
.mwg_effect029 { padding: 0 0 30vh; }
.mwg_effect029 .wrap { justify-content: space-between; padding: 0 25px; display: flex; }
.mwg_effect029 .paragraph { text-transform: uppercase; width: 50vw; padding: 30vh 0 0; }
.mwg_effect029 .paragraph span { display: inline-block; padding-right: 0.28em; }
.mwg_effect029 .word1 { padding: 0 0 0 0.8em; }
.mwg_effect029 .word2 { padding: 0 1.6em 0 0; }
.mwg_effect029 .word3 { padding: 0 0 0 2.4em; }
.mwg_effect029 .sticky { padding: 20vh 0 0; position: relative; }
.mwg_effect029 .sticky img { aspect-ratio: 1 / 1; object-fit: cover; height: 20vw; position: sticky; top: calc(-25px + 100vh - 20vw); border-radius: 0.5vw; }

/* ===== Reveal clip-wipe (StoriesSection) ===== */
.reveal { position: relative; overflow: hidden; border-radius: 0.5rem; }
.reveal img { display: block; width: 100%; height: 100%; object-fit: cover; }

/* ===== now-playing bar (NEW — not in movie-clone) ===== */
.now-playing { position: fixed; left: 0; bottom: 0; width: 100%; z-index: 60; display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1.25rem; background: rgba(12,12,12,0.72); backdrop-filter: blur(14px); border-top: 1px solid #606060; }
.eq-bar { width: 2px; background: currentColor; border-radius: 2px; }
@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
```

---

## 4. `FlipHeading` — build this component first (copy from movie-clone)

Identical to `../movie-clone/src/components/FlipHeading.tsx`. Splits text → words → letters; each
`.char` is an `overflow-hidden` column box; on scroll-in GSAP masks each inner `<span>` up
(`yPercent 110 → 0`, `stagger 0.025`, `duration 0.9`, `power3.out`, `scrollTrigger start "top 85%"`).
Add `flip-heading` class for the CSS hover-flip. Use it for the hero, **every section title**, and the footer.

```tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function FlipHeading({ text, className, start = "top 85%" }:
  { text: string; className?: string; start?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const spans = el.querySelectorAll<HTMLElement>(".char > span");
    const ctx = gsap.context(() => {
      gsap.set(spans, { yPercent: 110 });
      gsap.to(spans, { yPercent: 0, duration: 0.9, ease: "power3.out", stagger: 0.025,
        scrollTrigger: { trigger: el, start } });
    }, el);
    return () => ctx.revert();
  }, [start]);
  const words = text.split(" ");
  return (
    <h2 ref={ref} className={cn("flip-heading flex flex-wrap", className)} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex whitespace-nowrap" aria-hidden>
          {word.split("").map((ch, ci) => (
            <span key={ci} className="char"><span>{ch}</span><span>{ch}</span></span>
          ))}
          {wi < words.length - 1 && <span className="char">&nbsp;</span>}
        </span>
      ))}
    </h2>
  );
}
```

`Reveal` — copy `../movie-clone/src/components/Reveal.tsx` verbatim: image in a `clip-path: inset(100% 0 0 0)`
mask that wipes up (`→ inset(0)`, `duration 1`, `power3.out`) while the inner `<img>` scales `1.3 → 1`,
triggered at `top 85%`. Used by StoriesSection.

---

## 5. Section-by-section build spec (mirror movie-clone exactly)

### §5.1 Navbar — twin of `Navbar.tsx`
Fixed, `mix-blend-difference`, `font-Satoshi-Medium text-sm md:text-lg opacity-80`. Left: `RESONANCE`.
Right: `@KrnSound` (or three smooth-scroll links `Featured · Library · About` — keep them `pointer-events:auto`).

### §5.2 Hero — twin of `Hero.tsx`
Full-height `section min-h-screen flex flex-col justify-center md:flex-none md:justify-normal`.
- `FlipHeading text="THE ART OF SOUND"` — `font-Satoshi-Black text-6xl md:text-7xl lg:text-[9.2vw] justify-center text-center pt-24 md:pt-40 leading-none whitespace-nowrap`.
- Thin divider `border-t mt-12 md:mt-16 mb-8 md:mb-12 opacity-80`.
- A 12-col intro grid (`md:grid grid-cols-8 lg:grid-cols-12 gap-5 px-5 md:px-8 font-Satoshi-Medium opacity-80`):
  col-1 label `Intro`; col-3 span-5 a two-paragraph **love-letter to listening** (mirror the cinema copy's
  cadence — "when the lights go down… you share the pulse"); col-13 a `(Scroll)` cue hidden on mobile.

### §5.3 TrackSection — twin of `ScenesSection.tsx` — `mwg_effect033`
A **pinned horizontal track of album covers** that scrolls left as you scroll down.
- Overlaid heading block (`.scroll`): `FlipHeading text="Sounds I Return To"` + a paragraph
  ("Certain songs stay long after the last note…") + a short right-column line ("Tracks that never really leave.").
- GSAP: pin the section, `gsap.to(container, { x: () => -(container.scrollWidth - innerWidth), ease:"none",
  scrollTrigger:{ trigger, start:"top top", end:()=>"+="+distance, pin:true, scrub:1, invalidateOnRefresh:true }})`.
- `.medias` is a 3-row, column-flow grid of ~24 **square album covers** (`.media .media-card`). Pull the
  covers from `tracks.ts` (use the library tracks). **Each cover is a button → `play(track)` on click**
  (`pointer-events:auto`, `cursor:pointer`); active cover shows a bright ring + EqBars overlay.

### §5.4 ArtistsSection — twin of `VoicesSection.tsx`
Text-only 12-col grid. `FlipHeading text="Voices Of Sound"` (`text-5xl md:text-7xl lg:text-8xl uppercase`)
+ a paragraph in col-7 span-4 about the artists who carry a song — voice, restraint, presence.

### §5.5 StoriesSection — twin of `StoriesSection.tsx` — uses `Reveal`
Four alternating text/image blocks + image grids, each image a `Reveal` clip-wipe. Re-theme the four
captions for music:
1. **Sound Through Production** — producers/soundscapes (e.g. names you like) — text-right, image right.
2. **Voices That Transcend** — vocalists who transform a song — image left, text right.
3. **Women Shaping Sound** — artists like Billie Eilish, Taylor Swift, Asha Bhosle — text left, image right.
4. **Longform, Deeply Human** — albums/eras that deepen over time — image left, text right.
Use **aesthetic artist / mood / album imagery** in `public/images/stories/` (see §6). Keep the exact
grid column spans and `Reveal` usage from the original.

### §5.6 GenreSection — twin of `GenreSection.tsx`
Text-only grid. `FlipHeading text="Genres That Linger"` + paragraph on music genres (indie, R&B, ghazal,
lo-fi, classic Bollywood — "from the intimacy of an Anuv Jain demo to the scale of a Weeknd record")
+ a right-aligned "Here are some timeless records" line.

### §5.7 ClassicsSection — twin of `ClassicsSection.tsx` — `mwg_effect018`
**Pinned stacked card deck** of square album covers that starts fanned out (translated, rotated, scaled
0.92) and **collapses into a neat centered stack as you scroll**.
- GSAP: `cards.forEach` set `xPercent:(center-i)*95, rotate:(i-center)*6, scale:0.92, zIndex`;
  then `gsap.to(cards,{ xPercent:0, rotate:0, scale:1, ease:"none", scrollTrigger:{ trigger, start:"top top", end:"bottom bottom", scrub:1 }})`.
- 5 cards = 5 "timeless" album covers from `tracks.ts`. `.card` is **click-to-play**.
- Mobile (`md:hidden`): horizontal snap carousel of the same covers (`snap-x snap-mandatory`, `w-[70vw]`).

### §5.8 FavoritesSection — twin of `FavoritesSection.tsx` — `mwg_effect003`
Intro heading `FlipHeading text="Favorites Archive"` + paragraph, then the **rotating circular wheel**.
- 6 cards = **the 6 featured songs** (§7), in order.
- GSAP: position cards on a wide arc with `GAP = 14°`, radius `R = vh*1.45`, pivot
  `cx = vw/2 + vw*0.0625`, `cy = vh/2 + R`; on scroll `progress` rotate the whole ring
  (`angle = i*GAP - progress*total`), cards stay upright. Wire it with
  `ScrollTrigger.create({ trigger, start:"top top", end:"bottom bottom", scrub:1, onUpdate/onRefresh: layout(self.progress) })`
  over a `300vh` `.pin-height`. `.card` is **click-to-play**.
- Mobile: snap carousel fallback of the 6 featured covers.

### §5.9 QuoteSection — twin of `QuoteSection.tsx` — `mwg_effect029`
A **lyric/quote about music** revealed word-by-word on scrub, with a sticky album image beside it.
- Suggested quote: *"a song doesn't ask where you've been; it just meets you there. some records age, some wait, and the ones you love will always know the way back to you."* (swap for any lyric you like).
- GSAP: `gsap.fromTo(words, {opacity:0.15, yPercent:30}, {opacity:1, yPercent:0, ease:"none", stagger:0.5,
  scrollTrigger:{ trigger, start:"top 70%", end:"bottom bottom", scrub:1 }})`. Words get cycling
  `word0..word3` classes for the staggered horizontal indents. Mobile: stacked image + plain paragraph.

### §5.10 Footer — twin of `Footer.tsx`
Full-screen centered. `FlipHeading text="THE END."` (`text-5xl md:text-8xl`) + sub-line
`(guess i'll see you on the next track)`. Optionally a slow marquee of artist names above it.

---

## 6. Images — aesthetic, Spotify-style album art (this is on you, builder)

The original site's color comes entirely from its movie stills. Here, **the album covers ARE the color.**
Make them genuinely beautiful — like the artwork you see on a Spotify *Now Playing* screen.

**Sourcing & placement**
- Every track gets a **square** cover at `public/covers/<slug>.jpg` (1:1, ≥600×600). Source aesthetic,
  on-vibe album artwork for each song (cover art / mood imagery that fits the track). If you can fetch
  real artwork, great; otherwise use tasteful, royalty-free, genre-matched imagery.
- **Always** ship a deterministic fallback: if a cover is missing, render a generated **gradient + grain**
  square derived from the slug (hash → two oklch stops) with the title set in Satoshi — never a broken image.
- StoriesSection imagery (artists / moods) goes in `public/images/stories/`.
- Covers are reused across TrackSection (track), ClassicsSection (deck), FavoritesSection (wheel),
  QuoteSection (sticky), and the now-playing bar — one `<Cover slug>` component, gradient fallback built in.

**The Spotify *Now-Playing* aesthetic (do this, it's the signature touch)**
- When a track is playing, the **NowPlayingBar** shows the mini square cover + title (Satoshi-Bold) +
  artist (muted Regular) + animated **EqBars** that move only while `isPlaying`.
- Behind the whole page when something plays, add an optional **ambient glow**: the active cover,
  heavily blurred and dimmed (`blur(120px) opacity-30`), color-bleeding from behind the now-playing bar —
  exactly the "color extracted from the album art" wash Spotify uses. Kill it under `prefers-reduced-motion`.
- The **active cover anywhere on the page** (track/deck/wheel) gets a bright `ring`, a subtle lift/scale,
  a play-button glyph fading in on hover, and the EqBars overlay when it's the one playing.

---

## 7. Featured "Favorites" set — REQUIRED CONTENT (drives §5.8 wheel)

These exact songs are featured, in this exact order (they fill the FavoritesSection wheel and lead the data):

1. **Double Take** — *Dhruv*
2. **CO2** — *Prateek Kuhad*
3. **Heather** — *Conan Gray*
4. **Abhi Na Jao Chhod Ke** — *Mohammed Rafi & Asha Bhosle*
5. **Aashiqana** — *Chaar Diwari*
6. **Banda Kaam Ka** — *Chaar Diwari*

The full curated tracklist (featured first, then a famous **English + Hindi** mix) lives in **`SONGS.md`**
in this folder → load it into `src/data/tracks.ts`. The library should mix English & Hindi roughly evenly,
with `All · English · Hindi` filter chips on the TrackSection/library.

---

## 8. Audio system (the one thing movie-clone doesn't have) — click → it plays

Build a **`PlayerProvider`** React context holding `currentTrack`, `isPlaying`, `progress`, `duration`,
`volume`, plus `play(track)`, `toggle()`, `next()`, `prev()`, `seek()`. One hidden `<audio ref>` lives in
the provider and is the single source of truth. Wrap the whole app (see §1).

- Clicking **any** cover (track / deck / wheel / library row) → `play(track)`: load `src`, play from the
  start, slide up the now-playing bar (GSAP, first time), mark that cover active.
- Clicking the **active** cover → `toggle()` pause/resume.
- **NowPlayingBar** (`.now-playing`, fixed bottom, blurred, top hairline): mini cover, title + artist,
  a **draggable gradient progress scrubber**, current / total time, prev · play-pause · next, volume slider.
- EqBars / any disc spin animate **only while `isPlaying`**; pause freezes them.
- **Graceful:** files live at `public/audio/<slug>.mp3`. Real tracks are copyrighted — fall back to the
  bundled `public/audio/placeholder.wav` when a file is missing and show a subtle "preview unavailable"
  toast. Never crash.

```ts
// src/data/tracks.ts
export type Track = {
  slug: string;                 // "double-take" → /audio/double-take.mp3, /covers/double-take.jpg
  title: string;
  artist: string;
  lang: "English" | "Hindi";
  featured?: boolean;           // true for the 6 §7 songs
  cover: string;                // /covers/<slug>.jpg
  src: string;                  // /audio/<slug>.mp3
};
```

---

## 9. Quality bar / acceptance

- [ ] **Section-for-section twin of `../movie-clone`** — same 10 sections, same order, same effects/classes.
- [ ] Pure-dark `#0a0a0a` / `#f1f1f1`, Satoshi type, no light mode, `mix-blend-difference` navbar inverts over content.
- [ ] FlipHeadings reveal letter-by-letter on scroll + flip on hover.
- [ ] `mwg_effect033` horizontal cover track pins & scrubs buttery at 60fps.
- [ ] `mwg_effect018` stacked deck fans out → collapses on scroll; `mwg_effect003` wheel rotates on scroll.
- [ ] `mwg_effect029` quote reveals word-by-word with a sticky cover; `Reveal` clip-wipes in StoriesSection.
- [ ] **Clicking any cover plays the song from the start;** now-playing bar docks, stays in sync; click-active toggles.
- [ ] The 6 featured songs fill the wheel in order; library mixes English + Hindi and is filterable.
- [ ] Covers are **aesthetic, square, Spotify-style**; gradient+grain fallback for any missing cover; no broken images.
- [ ] Ambient color-glow from the active cover (Spotify now-playing vibe); EqBars/disc animate only while playing.
- [ ] `prefers-reduced-motion` removes motion, keeps everything usable; responsive 320px → ultrawide; no layout shift.
- [ ] `npm run check` (lint + typecheck + build) passes; TS strict, no `any`.

Deliver a runnable Next.js app (`npm i && npm run dev`) + a short README explaining how to drop in MP3s
(`public/audio/<slug>.mp3`) and cover art (`public/covers/<slug>.jpg`). When in doubt about layout, spacing,
or animation, **open `../movie-clone/src` and copy what it does.**
