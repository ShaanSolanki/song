import { FlipHeading } from "./FlipHeading";

/** §6 — twin of the movie-clone GenreSection. Text-only grid before the deck. */
export function GenreSection() {
  return (
    <div className="md:grid grid-cols-12 gap-5 px-5 md:px-8 mt-24 md:mt-40 pb-8">
      <div className="md:col-start-1 md:col-span-8">
        <FlipHeading
          text="Genres That Linger"
          className="text-5xl md:text-7xl lg:text-8xl"
        />
      </div>
      <div className="col-start-3 col-span-4 mt-8 md:mt-12">
        <p className="max-w-xl font-Satoshi-Regular text-base leading-[1.65] tracking-[0.01em] text-[#bdbdbd] text-pretty md:text-xl">
          Every song is someone trying to say the one thing they could never say
          out loud — and the melody is just the courage they borrowed to finally
          say it. That&rsquo;s why a stranger&rsquo;s record can know you better
          than people who&rsquo;ve met you: feeling was the first language, and it
          never needed translating.
        </p>
      </div>
      <div className="col-start-10 col-span-3 mt-6 md:mt-12">
        <p className="font-Satoshi-Regular text-[11px] uppercase tracking-[0.28em] text-[#8a8a8a] md:text-right md:text-xs">
          Here are some timeless records
        </p>
      </div>
    </div>
  );
}
