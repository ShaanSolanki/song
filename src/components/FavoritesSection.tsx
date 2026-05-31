"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FlipHeading } from "./FlipHeading";
import { CardMedia } from "./ui/CardMedia";
import { favoriteWheelTracks } from "@/data/tracks";

const GAP = (14 * Math.PI) / 180; // angular spacing between cards (radians)

/**
 * §8 — twin of the movie-clone FavoritesSection (mwg_effect003). The 6 featured
 * songs ride a wide circular arc that rotates as you scroll; cards stay upright.
 */
export function FavoritesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = gsap.utils.toArray<HTMLElement>(section.querySelectorAll(".card"));
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      const layout = (progress: number) => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const R = vh * 1.45;
        const cx = vw / 2 + vw * 0.0625;
        const cy = vh / 2 + R;
        const total = (cards.length - 1) * GAP;
        cards.forEach((card, i) => {
          const angle = i * GAP - progress * total;
          const w = card.offsetWidth;
          const h = card.offsetHeight;
          const x = cx + R * Math.sin(angle) - w / 2;
          const y = cy - R * Math.cos(angle) - h / 2;
          gsap.set(card, { x, y, rotation: 0 });
        });
      };

      layout(0);
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => layout(self.progress),
        onRefresh: (self) => layout(self.progress),
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* intro */}
      <div className="md:grid grid-cols-12 gap-5 px-5 md:px-8 mt-24 md:mt-0" id="featured">
        <div className="md:col-start-1 md:col-span-8">
          <FlipHeading
            text="Favorites Archive"
            className="text-5xl md:text-7xl lg:text-8xl opacity-90"
          />
        </div>
        <div className="col-start-7 col-span-4 mt-8 md:mt-3">
          <p className="max-w-xl font-Satoshi-Regular text-base leading-[1.65] tracking-[0.01em] text-[#bdbdbd] text-pretty md:text-xl">
            Some songs you choose. The ones that last choose you back. They
            outlive the moods you grew out of and the nights you&rsquo;d rather
            forget — and still they stay. Never louder. Only truer, each time you
            find your way back.
          </p>
        </div>
      </div>

      {/* desktop wheel gallery */}
      <section ref={sectionRef} className="mwg_effect003 hidden md:block">
        <div className="pin-height">
          <div className="container">
            <div className="circles">
              {favoriteWheelTracks.map((t) => (
                <CardMedia
                  key={t.slug}
                  track={t}
                  className="card"
                  innerClassName="media"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* mobile carousel */}
      <div className="w-full py-8 mt-8 md:hidden">
        <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-5 pb-2">
          {favoriteWheelTracks.map((t) => (
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
