"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { FlipHeading } from "./FlipHeading";
import { CardMedia } from "./ui/CardMedia";
import { trackStripTracks } from "@/data/tracks";

/**
 * §3 — twin of the movie-clone ScenesSection (mwg_effect033). A pinned section
 * whose 3-row grid of square album covers scrolls horizontally as you scroll
 * down. Every cover is a button → plays the song instantly.
 */
export function TrackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      const getDistance = () => container.scrollWidth - window.innerWidth;
      gsap.to(container, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getDistance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="mwg_effect033" id="library">
      <div className="scroll">
        <div className="md:grid grid-cols-8 lg:grid-cols-12 gap-5 px-5 md:px-8 mt-28 md:mt-40 lg:mt-36">
          <div className="md:col-start-1 md:col-span-6">
            <FlipHeading
              text="Sounds I Return To"
              className="text-5xl md:text-7xl lg:text-8xl"
            />
          </div>
          <div className="col-start-1 lg:col-start-3 col-span-4 lg:col-span-4 mt-8 md:mt-12">
            <p className="max-w-lg font-Satoshi-Regular text-base leading-[1.7] tracking-[0.01em] text-[#bdbdbd] text-pretty md:text-lg">
              Certain songs stay long after the last note fades. Years pass, life
              changes, yet these tracks remain untouched by time. We return to
              them not for the words, but for the feeling they hold — proof that a
              record can live inside us, quietly, forever.
            </p>
          </div>
          <div className="col-start-7 lg:col-start-10 col-span-2 lg:col-span-3 mt-6 md:mt-12">
            <p className="font-Satoshi-Regular text-[11px] uppercase tracking-[0.28em] text-[#8a8a8a] md:text-xs">
              Tracks that never really leave
            </p>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="container">
        <div className="medias">
          {trackStripTracks.map((t) => (
            <CardMedia key={t.slug} track={t} className="media" />
          ))}
        </div>
      </div>
    </section>
  );
}
