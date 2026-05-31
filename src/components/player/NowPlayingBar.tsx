"use client";

import { useEffect, useRef, useState } from "react";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { gsap } from "@/lib/gsap";
import { usePlayer } from "./PlayerProvider";
import { Cover } from "../ui/Cover";
import { SpotifyGlyph } from "../ui/SpotifyGlyph";
import { formatTime } from "@/lib/utils";

export function NowPlayingBar() {
  const {
    currentTrack,
    isPlaying,
    external,
    progress,
    duration,
    volume,
    playOnSpotify,
    toggle,
    next,
    prev,
    seek,
    setVolume,
  } = usePlayer();

  const barRef = useRef<HTMLDivElement | null>(null);
  const hasShown = useRef(false);
  const [scrubbing, setScrubbing] = useState(false);
  const [scrubValue, setScrubValue] = useState(0);

  // Slide the bar up the first time a track starts.
  useEffect(() => {
    if (currentTrack && !hasShown.current && barRef.current) {
      hasShown.current = true;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(barRef.current, { yPercent: 0 });
      } else {
        gsap.fromTo(
          barRef.current,
          { yPercent: 140 },
          { yPercent: 0, duration: 0.7, ease: "power3.out" },
        );
      }
    }
  }, [currentTrack]);

  if (!currentTrack) return null;

  const pct = duration > 0 ? (scrubbing ? scrubValue : progress) / duration : 0;

  return (
    <div
      ref={barRef}
      className="glass fixed inset-x-0 bottom-0 z-50 border-t border-hair"
      style={{ transform: "translateY(140%)", background: "rgba(10,10,10,0.72)" }}
    >
      {/* Progress scrubber — local preview only */}
      {!external && (
        <div className="group relative h-1.5 w-full cursor-pointer">
          <div className="absolute inset-0 bg-white/10" />
          <div
            className="absolute inset-y-0 left-0"
            style={{
              width: `${pct * 100}%`,
              background: "linear-gradient(90deg,#9a9a9a,#f1f1f1)",
            }}
          />
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={scrubbing ? scrubValue : progress}
            aria-label="Seek"
            onChange={(e) => setScrubValue(Number(e.target.value))}
            onMouseDown={() => {
              setScrubbing(true);
              setScrubValue(progress);
            }}
            onTouchStart={() => {
              setScrubbing(true);
              setScrubValue(progress);
            }}
            onMouseUp={() => {
              seek(scrubValue);
              setScrubbing(false);
            }}
            onTouchEnd={() => {
              seek(scrubValue);
              setScrubbing(false);
            }}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>
      )}
      {/* Spotify accent line in external mode */}
      {external && <div className="h-1.5 w-full bg-[#1DB954]" />}

      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-3 md:gap-6 md:px-8">
        {/* Track meta */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div
            className={`spin h-11 w-11 shrink-0 overflow-hidden rounded-full border border-hair ${
              isPlaying ? "" : "paused"
            }`}
          >
            <Cover
              src={currentTrack.cover}
              slug={currentTrack.slug}
              alt={`${currentTrack.title} cover`}
            />
          </div>
          <div className="min-w-0">
            <p className="font-Satoshi-Bold truncate text-sm">
              {currentTrack.title}
            </p>
            <p className="font-Satoshi-Regular truncate text-xs text-[#9a9a9a]">
              {external ? (
                <span className="inline-flex items-center gap-1">
                  <SpotifyGlyph className="h-3 w-3 text-[#1DB954]" />
                  Playing on Spotify · {currentTrack.artist}
                </span>
              ) : (
                currentTrack.artist
              )}
            </p>
          </div>
        </div>

        {external ? (
          /* Spotify mode — one clear action: (re)open the song in Spotify */
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              playOnSpotify(currentTrack);
            }}
            className="font-Satoshi-Bold flex shrink-0 items-center gap-2 rounded-full bg-[#1DB954] px-4 py-2 text-xs uppercase tracking-[0.12em] text-black transition-transform hover:scale-[1.03] md:text-sm"
          >
            <SpotifyGlyph className="h-4 w-4" />
            Open in Spotify
          </a>
        ) : (
          <>
            {/* Transport — local preview */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={prev}
                aria-label="Previous"
                className="text-[#cfcfcf] transition-colors hover:text-paper"
              >
                <SkipBack className="h-5 w-5" fill="currentColor" />
              </button>
              <button
                onClick={toggle}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="grid h-10 w-10 place-items-center rounded-full bg-paper text-ink transition-transform hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" fill="currentColor" />
                ) : (
                  <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
                )}
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="text-[#cfcfcf] transition-colors hover:text-paper"
              >
                <SkipForward className="h-5 w-5" fill="currentColor" />
              </button>
            </div>

            {/* Time + volume */}
            <div className="hidden flex-1 items-center justify-end gap-4 md:flex">
              <span className="font-Satoshi-Regular tabular-nums text-xs text-[#9a9a9a]">
                {formatTime(scrubbing ? scrubValue : progress)} /{" "}
                {formatTime(duration)}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
                  aria-label={volume > 0 ? "Mute" : "Unmute"}
                  className="text-[#cfcfcf] transition-colors hover:text-paper"
                >
                  {volume > 0 ? (
                    <Volume2 className="h-5 w-5" />
                  ) : (
                    <VolumeX className="h-5 w-5" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  aria-label="Volume"
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="h-1 w-24 cursor-pointer accent-[#f1f1f1]"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
