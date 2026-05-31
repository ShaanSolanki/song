"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Clean, cinematic intro veil: pure-black screen, the wordmark masks up
 * letter-by-letter, a hairline fills 0→100 with a counter, then the whole
 * panel slides away to reveal the hero. Locks scroll while it runs and
 * collapses instantly under prefers-reduced-motion.
 */
export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const finish = () => {
      document.body.style.overflow = "";
      setDone(true);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(100);
      const t = window.setTimeout(finish, 500);
      return () => {
        window.clearTimeout(t);
        document.body.style.overflow = "";
      };
    }

    const ctx = gsap.context(() => {
      const proxy = { v: 0 };
      const tl = gsap.timeline();

      // wordmark letters mask up
      tl.from(".pl-char > span", {
        yPercent: 110,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.04,
      });

      // count + hairline fill
      tl.to(
        proxy,
        {
          v: 100,
          duration: 1.7,
          ease: "power2.inOut",
          onUpdate: () => setCount(Math.round(proxy.v)),
        },
        0.25,
      );

      // lift the inner content, then slide the whole veil away
      tl.to(
        ".pl-inner",
        { yPercent: -30, opacity: 0, duration: 0.6, ease: "power2.in" },
        "+=0.2",
      );
      tl.to(
        root,
        { yPercent: -100, duration: 0.95, ease: "power4.inOut", onComplete: finish },
        "<0.1",
      );
    }, root);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      aria-hidden="true"
    >
      <div className="pl-inner flex flex-col items-center gap-7 px-6">
        <div className="flex overflow-hidden">
          {"RESONANCE".split("").map((c, i) => (
            <span
              key={i}
              className="pl-char block overflow-hidden"
            >
              <span className="block font-Satoshi-Black text-2xl uppercase tracking-[0.32em] text-paper md:text-4xl">
                {c}
              </span>
            </span>
          ))}
        </div>

        <div className="relative h-px w-[220px] overflow-hidden bg-[#262626] md:w-[300px]">
          <div
            className="absolute inset-y-0 left-0 bg-paper"
            style={{ width: `${count}%` }}
          />
        </div>

        <span className="font-Satoshi-Regular text-[11px] tracking-[0.4em] text-[#8a8a8a] tabular-nums">
          {String(count).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
}
