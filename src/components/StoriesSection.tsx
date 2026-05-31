import { RevealCard } from "./RevealCard";
import { storyTracks } from "@/data/tracks";

/**
 * §5 — twin of the movie-clone StoriesSection. Four alternating text/image
 * blocks, each followed by an image grid, every image a clip-wipe RevealCard.
 * Same 14 image slots as the original; here they're clickable album covers.
 */
const s = storyTracks; // 14 covers, in order

export function StoriesSection() {
  return (
    <section className="pt-16 md:pt-24">
      {/* Block 1 — Sound Through Production (text left, image right) */}
      <div className="grid grid-cols-12 gap-5 px-5 md:px-8 mb-8 md:mb-16 items-start">
        <div className="col-span-12 md:col-start-4 md:col-span-3 mt-3 md:mt-0 order-2 md:order-1">
          <p className="font-Satoshi-Regular text-[15px] leading-[1.7] tracking-[0.01em] text-[#b3b3b3] text-pretty md:text-base md:text-right">
            The producers behind a record shape its weather — the reverb of a
            room, the space around a voice, the low hum you feel before you hear.
            Production is authorship: arrangement becomes emotion, and silence
            becomes a choice.
          </p>
        </div>
        <div className="col-span-12 md:col-start-7 md:col-span-4 order-1 md:order-2">
          <RevealCard track={s[0]} className="aspect-[4/5]" />
          <p className="mt-4 font-Satoshi-Regular text-[11px] uppercase tracking-[0.28em] text-[#8a8a8a]">
            Sound Through Production
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 px-5 md:px-8 mb-24 md:mb-32">
        <div className="col-span-12 md:col-start-3 md:col-span-4">
          <RevealCard track={s[1]} className="aspect-square" />
        </div>
        <div className="col-span-12 md:col-start-7 md:col-span-5">
          <RevealCard track={s[2]} className="aspect-[4/3]" />
        </div>
      </div>

      {/* Block 2 — Voices That Transcend (image left, text right) */}
      <div className="grid grid-cols-12 gap-5 px-5 md:px-8 mb-8 md:mb-16 items-start">
        <div className="col-span-12 md:col-start-3 md:col-span-4">
          <RevealCard track={s[3]} className="aspect-[4/5]" />
          <p className="mt-4 font-Satoshi-Regular text-[11px] uppercase tracking-[0.28em] text-[#8a8a8a]">
            Voices That Transcend
          </p>
        </div>
        <div className="col-span-12 md:col-start-7 md:col-span-4 mt-3 md:mt-0">
          <p className="font-Satoshi-Regular text-[15px] leading-[1.7] tracking-[0.01em] text-[#b3b3b3] text-pretty md:text-base">
            Music lives in contrast — the ache of Arijit Singh, the hush of Anuv
            Jain, the cool distance of The Weeknd, and the searching calm of
            Joji. Different voices, the same gravity.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 px-5 md:px-8 mb-24 md:mb-48">
        <div className="col-span-12 md:col-start-3 md:col-span-6">
          <RevealCard track={s[4]} className="aspect-[16/10]" />
        </div>
        <div className="col-span-12 md:col-span-3">
          <RevealCard track={s[5]} className="aspect-square" />
        </div>
        <div className="col-span-12 md:col-start-5 md:col-span-5">
          <RevealCard track={s[6]} className="aspect-[4/3]" />
        </div>
      </div>

      {/* Block 3 — Women Shaping Sound (text left, image right) */}
      <div className="grid grid-cols-12 gap-5 px-5 md:px-8 mb-8 md:mb-16 items-start">
        <div className="col-span-12 md:col-start-4 md:col-span-3 mt-3 md:mt-0 order-2 md:order-1">
          <p className="font-Satoshi-Regular text-[15px] leading-[1.7] tracking-[0.01em] text-[#b3b3b3] text-pretty md:text-base md:text-right">
            Women continue to shape sound through emotional depth and nerve,
            widening how a feeling can be told — heard in the work of Billie
            Eilish, Taylor Swift, Asha Bhosle, and Kavita Seth.
          </p>
        </div>
        <div className="col-span-12 md:col-start-7 md:col-span-4 order-1 md:order-2">
          <RevealCard track={s[7]} className="aspect-[4/5]" />
          <p className="mt-4 font-Satoshi-Regular text-[11px] uppercase tracking-[0.28em] text-[#8a8a8a]">
            Women Shaping Sound
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 px-5 md:px-8 mb-24 md:mb-32">
        <div className="col-span-12 md:col-start-3 md:col-span-4">
          <RevealCard track={s[8]} className="aspect-square" />
        </div>
        <div className="col-span-12 md:col-start-7 md:col-span-5">
          <RevealCard track={s[9]} className="aspect-[4/3]" />
        </div>
      </div>

      {/* Block 4 — Longform, Deeply Human (image left, text right) */}
      <div className="grid grid-cols-12 gap-5 px-5 md:px-8 mb-8 md:mb-16 items-start">
        <div className="col-span-12 md:col-start-3 md:col-span-4">
          <RevealCard track={s[10]} className="aspect-[4/5]" />
          <p className="mt-4 font-Satoshi-Regular text-[11px] uppercase tracking-[0.28em] text-[#8a8a8a]">
            Longform, Deeply Human
          </p>
        </div>
        <div className="col-span-12 md:col-start-7 md:col-span-4 mt-3 md:mt-0">
          <p className="font-Satoshi-Regular text-[15px] leading-[1.7] tracking-[0.01em] text-[#b3b3b3] text-pretty md:text-base">
            Albums reshape how music breathes over time, letting themes and
            moods deepen gradually — the slow-burn worlds of records you live
            inside for a season, then carry for years.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 px-5 md:px-8 mb-24 md:mb-48">
        <div className="col-span-12 md:col-start-3 md:col-span-6">
          <RevealCard track={s[11]} className="aspect-[16/10]" />
        </div>
        <div className="col-span-12 md:col-span-3">
          <RevealCard track={s[12]} className="aspect-square" />
        </div>
        <div className="col-span-12 md:col-start-5 md:col-span-5">
          <RevealCard track={s[13]} className="aspect-[4/3]" />
        </div>
      </div>
    </section>
  );
}
