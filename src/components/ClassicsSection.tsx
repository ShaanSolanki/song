"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { CardMedia } from "./ui/CardMedia";
import { classicTracks } from "@/data/tracks";

/**
 * §7 — twin of the movie-clone ClassicsSection (mwg_effect018). A pinned deck
 * of square album covers that begins fanned out (offset, rotated, scaled down)
 * and collapses into a clean centered stack as you scroll. Each card plays.
 */
export function ClassicsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll<HTMLElement>(".card");
    const center = (cards.length - 1) / 2;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.set(card, {
          xPercent: (center - i) * 95,
          rotate: (i - center) * 6,
          scale: 0.92,
          zIndex: cards.length - Math.abs(center - i),
        });
      });
      gsap.to(cards, {
        xPercent: 0,
        rotate: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="mwg_effect018 hidden md:block">
        <div className="pin-height">
          <div className="container">
            {classicTracks.map((t) => (
              <CardMedia
                key={t.slug}
                track={t}
                className="card"
                innerClassName="media"
              />
            ))}
          </div>
        </div>
      </section>

      {/* mobile carousel */}
      <div className="w-full py-8 md:hidden">
        <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-5 pb-2">
          {classicTracks.map((t) => (
            <div key={t.slug} className="snap-center shrink-0 w-[70vw]">
              <CardMedia
                track={t}
                className="block w-full aspect-square rounded-2xl border border-hair overflow-hidden"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
