import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Track } from "@/data/tracks";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Spotify deep links for a track. If we know the exact `spotifyId` we link
 * straight to the track (the desktop app auto-plays it); otherwise we open a
 * Spotify search for "title artist", which reliably lands on the right song.
 * `app` is the native `spotify:` URI (opens the installed app); `web` is the
 * https fallback (open.spotify.com — itself a universal link on mobile).
 */
export function spotifyLinks(track: Track): { app: string; web: string } {
  if (track.spotifyId) {
    return {
      app: `spotify:track:${track.spotifyId}`,
      web: `https://open.spotify.com/track/${track.spotifyId}`,
    };
  }
  const q = encodeURIComponent(`${track.title} ${track.artist}`);
  return {
    app: `spotify:search:${q}`,
    web: `https://open.spotify.com/search/${q}`,
  };
}

/**
 * Open a track in Spotify. Tries the native app via the `spotify:` URI (so an
 * installed app takes over and starts the song); if nothing handles it within
 * ~1.2s we fall back to opening the song on open.spotify.com in a new tab.
 */
export function openInSpotify(track: Track): void {
  if (typeof window === "undefined") return;
  const { app, web } = spotifyLinks(track);
  const start = Date.now();
  const fallback = window.setTimeout(() => {
    // If the app grabbed focus, the page is hidden and we skip the web tab.
    if (document.hidden) return;
    if (Date.now() - start < 2000) window.open(web, "_blank", "noopener");
  }, 1200);
  // Cancel the web fallback if we get backgrounded (app opened).
  const onHide = () => {
    if (document.hidden) window.clearTimeout(fallback);
  };
  document.addEventListener("visibilitychange", onHide, { once: true });
  // Attempt the native app handoff.
  window.location.href = app;
}

/** Format seconds → m:ss for the player UI. */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Deterministic gradient placeholder derived from a slug. Used when a real
 * cover image (/covers/<slug>.jpg) is absent, so the grid never looks empty.
 */
export function gradientFor(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  const h1 = Math.abs(hash) % 360;
  const h2 = (h1 + 40 + (Math.abs(hash >> 3) % 80)) % 360;
  return `linear-gradient(135deg, hsl(${h1} 55% 32%), hsl(${h2} 60% 14%))`;
}
