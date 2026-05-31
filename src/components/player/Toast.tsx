"use client";

import { usePlayer } from "./PlayerProvider";
import { cn } from "@/lib/utils";

/** Subtle bottom toast for non-fatal audio issues (e.g. missing preview). */
export function Toast() {
  const { toast } = usePlayer();
  return (
    <div
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex justify-center transition-all duration-300",
        toast ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
      )}
    >
      {toast && (
        <div className="glass rounded-full px-5 py-2.5">
          <p className="font-Satoshi-Regular text-xs uppercase tracking-[0.18em] text-[#cfcfcf]">
            {toast}
          </p>
        </div>
      )}
    </div>
  );
}
