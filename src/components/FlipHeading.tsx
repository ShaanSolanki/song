"use client";

import { useEffect, useRef, type ElementType } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type FlipHeadingProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Disable the hover letter-flip (e.g. for the huge hero where it'd be noisy). */
  hover?: boolean;
  /** Delay before the scroll-in reveal triggers, in seconds. */
  delay?: number;
};

/**
 * Splits text into words → letters. Each `.char` is an overflow-hidden box; on
 * scroll-in GSAP masks every glyph up (yPercent 110 → 0). With `hover` enabled,
 * a duplicate glyph underneath enables the CSS letter-flip on hover.
 */
export function FlipHeading({
  text,
  as,
  className,
  hover = true,
  delay = 0,
}: FlipHeadingProps) {
  const Tag = (as ?? "h2") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const glyphs = el.querySelectorAll<HTMLElement>(".glyph-top");

    if (reduce) {
      gsap.set(glyphs, { yPercent: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(glyphs, { yPercent: 110 });
      gsap.to(glyphs, {
        yPercent: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.025,
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [text, delay]);

  const words = text.split(" ");

  return (
    <Tag
      ref={ref}
      className={cn(
        "font-Satoshi-Black uppercase leading-none tracking-tight",
        hover && "flip-hover cursor-default",
        className,
      )}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {Array.from(word).map((ch, ci) => (
            <span key={ci} className="char" aria-hidden="true">
              <span className="glyph-top">{ch}</span>
              {hover && <span className="glyph-bottom">{ch}</span>}
            </span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
