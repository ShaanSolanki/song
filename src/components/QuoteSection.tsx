"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { CardMedia } from "./ui/CardMedia";
import { bySlug, featuredTracks } from "@/data/tracks";

const QUOTE =
  "a song doesn't ask where you've been; it just meets you there. some records age, some wait, and the ones you love will always know the way back to you.";

const WORDS = QUOTE.split(" ");
const STICKY = bySlug("co2") ?? featuredTracks[0];

/** §9 — twin of the movie-clone QuoteSection (mwg_effect029). */
export function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const words = section.querySelectorAll<HTMLElement>(".paragraph span");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.15, yPercent: 30 },
        {
          opacity: 1,
          yPercent: 0,
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="mwg_effect029 hidden md:block">
        <div className="wrap">
          <p className="paragraph tracking-wide font-Satoshi-Bold text-2xl md:text-6xl opacity-80">
            {WORDS.map((word, i) => (
              <span key={i} className={`word${i % 4}`}>
                {word}{" "}
              </span>
            ))}
          </p>
          <div className="sticky">
            <CardMedia track={STICKY} className="stick-img block" />
          </div>
        </div>
      </section>

      {/* mobile */}
      <div className="md:hidden flex flex-col gap-10 px-5 py-12 mt-24">
        <CardMedia
          track={STICKY}
          className="block w-full aspect-square rounded-2xl overflow-hidden"
        />
        <p className="font-Satoshi-Bold tracking-wide text-2xl leading-snug mt-8 opacity-80">
          {QUOTE}
        </p>
      </div>
    </>
  );
}
