"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { CardMedia } from "./ui/CardMedia";
import type { Track } from "@/data/tracks";

/**
 * Twin of the movie-clone Reveal: a clip-path mask that wipes up while the art
 * scales 1.3 → 1 as it scrolls into view. Here the art is a clickable album
 * cover, so the moody story images also play their song on click.
 */
export function RevealCard({
  track,
  className,
}: {
  track: Track;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inner = el.querySelector<HTMLElement>(".reveal-inner");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(inner, { scale: 1.3 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
      tl.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.out" })
        .to(inner, { scale: 1, duration: 1.2, ease: "power3.out" }, 0);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={cn("reveal", className)}>
      <div className="reveal-inner h-full w-full">
        <CardMedia
          track={track}
          className="h-full w-full"
          innerClassName="rounded-[inherit]"
        />
      </div>
    </div>
  );
}
