"use client";

import { useState } from "react";
import { gradientFor } from "@/lib/utils";
import { cn } from "@/lib/utils";

type CoverProps = {
  src: string;
  slug: string;
  alt: string;
  className?: string;
};

/**
 * Album art that gracefully degrades to a deterministic gradient placeholder
 * when /covers/<slug>.jpg is missing (the default, since covers ship empty).
 */
export function Cover({ src, slug, alt, className }: CoverProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn("h-full w-full", className)}
        style={{ background: gradientFor(slug) }}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
