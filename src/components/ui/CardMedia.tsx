"use client";

import { usePlayer } from "../player/PlayerProvider";
import { Cover } from "./Cover";
import { EqBars } from "./EqBars";
import { SpotifyGlyph } from "./SpotifyGlyph";
import { cn } from "@/lib/utils";
import type { Track } from "@/data/tracks";

/**
 * A clickable album card used across every choreographed section. Click =
 * play from the start; click the active one = toggle. Shows a play/pause glyph
 * on hover, a bright ring + live EqBars when it is the active track.
 *
 * `className` is the section's effect class on the button itself (e.g. "media"),
 * `innerClassName` is for nested layouts that wrap the art (e.g. "card" → "media").
 */
export function CardMedia({
  track,
  className,
  innerClassName,
}: {
  track: Track;
  className?: string;
  innerClassName?: string;
}) {
  const { currentTrack, isPlaying, playOnSpotify } = usePlayer();
  const active = currentTrack?.slug === track.slug;
  const playing = active && isPlaying;

  return (
    <button
      type="button"
      onClick={() => playOnSpotify(track)}
      aria-label={`Play ${track.title} by ${track.artist} on Spotify`}
      className={cn("group relative block", className)}
    >
      <span
        className={cn(
          "relative block h-full w-full overflow-hidden",
          innerClassName,
        )}
      >
        <Cover
          src={track.cover}
          slug={track.slug}
          alt={`${track.title} — ${track.artist}`}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        {/* hover veil + transport glyph */}
        <span
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300",
            active ? "bg-black/25" : "group-hover:bg-black/35",
          )}
        >
          <span
            className={cn(
              "grid h-12 w-12 translate-y-1 place-items-center rounded-full bg-[#1DB954] text-black opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
              active && "translate-y-0 opacity-100",
            )}
          >
            <SpotifyGlyph className="h-6 w-6" />
          </span>
        </span>

        {/* active ring */}
        {active && (
          <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-2 ring-paper/90" />
        )}

        {/* live equalizer while playing */}
        {playing && (
          <span className="pointer-events-none absolute bottom-[7%] left-[7%] text-paper drop-shadow">
            <EqBars playing className="h-4" />
          </span>
        )}
      </span>
    </button>
  );
}
