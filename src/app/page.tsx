import { Hero } from "@/components/Hero";
import { TrackSection } from "@/components/TrackSection";
import { ArtistsSection } from "@/components/ArtistsSection";
import { StoriesSection } from "@/components/StoriesSection";
import { GenreSection } from "@/components/GenreSection";
import { ClassicsSection } from "@/components/ClassicsSection";
import { FavoritesSection } from "@/components/FavoritesSection";
import { QuoteSection } from "@/components/QuoteSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-clip pb-28">
      <Hero />
      <TrackSection />
      <ArtistsSection />
      <StoriesSection />
      <GenreSection />
      <ClassicsSection />
      <FavoritesSection />
      <QuoteSection />
      <Footer />
    </main>
  );
}
