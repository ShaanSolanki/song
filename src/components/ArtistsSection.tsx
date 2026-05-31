import { FlipHeading } from "./FlipHeading";

/** §4 — twin of the movie-clone VoicesSection. A quiet text-only grid. */
export function ArtistsSection() {
  return (
    <div className="md:grid grid-cols-12 gap-5 px-5 md:px-8 mt-16 md:mt-20 pb-8" id="about">
      <div className="md:col-start-1 md:col-span-8">
        <FlipHeading
          text="Voices Of Sound"
          className="text-5xl md:text-7xl lg:text-8xl opacity-90"
        />
      </div>
      <div className="col-start-7 col-span-4 mt-8 md:mt-3">
        <p className="max-w-xl font-Satoshi-Regular text-base leading-[1.65] tracking-[0.01em] text-[#bdbdbd] text-pretty md:text-xl">
          A song is carried by people — those who write the silence between the
          words, and those who breathe life into them. Through restraint,
          intention, and presence, they shape moments that feel lived-in rather
          than performed. It&apos;s in these details that music stops being a
          recording, and becomes a memory you didn&apos;t know you had.
        </p>
      </div>
    </div>
  );
}
