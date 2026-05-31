"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { FlipHeading } from "./FlipHeading";

export function Hero() {
  const introRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = introRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-fade]"), {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.5,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-end px-5 pb-16 pt-32 md:px-10 md:pb-24"
    >
      <FlipHeading
        as="h1"
        text="Play The Feeling"
        hover={false}
        className="text-[15vw] leading-[0.82] md:text-[13vw]"
      />

      <div
        ref={introRef}
        className="mt-10 grid grid-cols-1 gap-8 border-t border-hair pt-8 md:mt-14 md:grid-cols-12"
      >
        <p
          data-fade
          className="font-Satoshi-Regular text-xs uppercase tracking-[0.25em] text-[#9a9a9a] md:col-span-3"
        >
          (A record collection)
        </p>
        <p
          data-fade
          className="font-Satoshi-Medium max-w-2xl text-balance text-lg leading-relaxed text-[#cfcfcf] md:col-span-6 md:text-2xl"
        >
          A pure-dark room where sound is the only light. Scroll slowly. Click
          anything and it begins — the way a title sequence opens a film, but the
          frame is a song. This is listening, given weight.
        </p>
        <div
          data-fade
          className="flex items-end justify-start md:col-span-3 md:justify-end"
        >
          <span className="font-Satoshi-Regular animate-pulse text-xs uppercase tracking-[0.3em] text-[#9a9a9a]">
            (Scroll)
          </span>
        </div>
      </div>
    </section>
  );
}
