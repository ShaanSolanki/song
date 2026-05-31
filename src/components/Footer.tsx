"use client";

import { ArrowUp } from "lucide-react";
import { tracks } from "@/data/tracks";
import { FlipHeading } from "./FlipHeading";

export function Footer() {
  // Unique artist names for the marquee.
  const artists = Array.from(new Set(tracks.map((t) => t.artist)));
  const reel = [...artists, ...artists];

  return (
    <footer className="border-t border-hair pb-10 pt-16">
      {/* full-screen closer — twin of the movie-clone Footer */}
      <div className="flex h-screen flex-col items-center justify-center gap-3">
        <FlipHeading
          text="The End."
          className="text-6xl md:text-8xl opacity-90 justify-center"
        />
        <p className="font-Satoshi-Medium text-base md:text-xl opacity-80 tracking-wide">
          (guess i&apos;ll see you on the next track)
        </p>
      </div>

      <div className="overflow-hidden">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {reel.map((name, i) => (
            <span
              key={i}
              className="font-Satoshi-Black text-4xl uppercase tracking-tight text-[#2c2c2c] md:text-6xl"
            >
              {name} <span className="text-[#1c1c1c]">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1600px] flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center md:px-10">
        <p className="font-Satoshi-Black text-2xl uppercase tracking-[0.15em]">
          Resonance
        </p>
        <p className="font-Satoshi-Regular max-w-md text-xs uppercase leading-relaxed tracking-[0.18em] text-[#9a9a9a]">
          A cinematic listening room. Built with Next.js, GSAP & Tailwind.
          Drop your own MP3s into <code>/public/audio</code>.
        </p>
        <a
          href="#top"
          className="font-Satoshi-Regular flex items-center gap-2 rounded-full border border-hair px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-white/5"
        >
          Back to top <ArrowUp className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
