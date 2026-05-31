import { cn } from "@/lib/utils";

/** Animated equalizer bars. Freezes (no bounce) when `playing` is false. */
export function EqBars({
  playing,
  className,
}: {
  playing: boolean;
  className?: string;
}) {
  const delays = ["0s", "0.18s", "0.36s", "0.12s"];
  return (
    <span
      className={cn("inline-flex items-end gap-[2px] h-3.5", className)}
      aria-hidden="true"
    >
      {delays.map((d, i) => (
        <span
          key={i}
          className={cn(
            "eq-bar w-[2px] bg-current",
            playing ? "" : "!animate-none",
          )}
          style={{
            height: "100%",
            animationDelay: d,
            transform: playing ? undefined : "scaleY(0.3)",
          }}
        />
      ))}
    </span>
  );
}
