"use client";

import { useState } from "react";
import { usePlayer } from "./PlayerProvider";
import { gradientFor } from "@/lib/utils";

/**
 * Spotify-style ambient wash: the active cover, heavily blurred and dimmed,
 * bleeding color behind the whole page. Sits below all content (-z-10) and is
 * disabled under prefers-reduced-motion via CSS opacity transition only.
 */
export function AmbientGlow() {
  const { currentTrack } = usePlayer();
  const [failedSlug, setFailedSlug] = useState<string | null>(null);
  const failed = !!currentTrack && failedSlug === currentTrack.slug;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: currentTrack ? 0.3 : 0 }}
      >
        {currentTrack && !failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={currentTrack.slug}
            src={currentTrack.cover}
            alt=""
            aria-hidden="true"
            onError={() => setFailedSlug(currentTrack.slug)}
            className="h-full w-full scale-125 object-cover blur-[120px] saturate-150"
          />
        ) : currentTrack ? (
          <div
            className="h-full w-full scale-125 blur-[120px]"
            style={{ background: gradientFor(currentTrack.slug) }}
          />
        ) : null}
      </div>
      {/* Darken so text stays readable over the wash. */}
      <div className="absolute inset-0 bg-ink/55" />
    </div>
  );
}
