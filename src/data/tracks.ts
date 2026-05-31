export type Track = {
  slug: string; // "double-take" → /audio/double-take.mp3, /covers/double-take.jpg
  title: string;
  artist: string;
  lang: "English" | "Hindi";
  featured?: boolean; // true for the §6 special set
  cover: string; // /covers/<slug>.jpg (a gradient placeholder is shown if missing)
  src: string; // /audio/<slug>.mp3
  /**
   * Optional Spotify track id (the part after /track/ in a share link). When
   * present, clicking opens that exact track and auto-plays in the desktop app;
   * otherwise we deep-link to a Spotify search for "title artist".
   */
  spotifyId?: string;
};

const track = (
  slug: string,
  title: string,
  artist: string,
  lang: Track["lang"],
  featured = false,
): Track => ({
  slug,
  title,
  artist,
  lang,
  featured,
  cover: `/covers/${slug}.jpg`,
  src: `/audio/${slug}.mp3`,
});

/** Featured "special set" — fixed order, powers §6. */
export const featuredTracks: Track[] = [
  track("double-take", "Double Take", "Dhruv", "English", true),
  track("co2", "CO2", "Prateek Kuhad", "Hindi", true),
  track("heather", "Heather", "Conan Gray", "English", true),
  track(
    "abhi-na-jao",
    "Abhi Na Jao Chhod Ke",
    "Mohammed Rafi & Asha Bhosle",
    "Hindi",
    true,
  ),
  track("aashiqana", "Aashiqana", "Chaar Diwari", "Hindi", true),
  track("banda-kaam-ka", "Banda Kaam Ka", "Chaar Diwari", "Hindi", true),
];

const englishLibrary: Track[] = [
  track("blinding-lights", "Blinding Lights", "The Weeknd", "English"),
  track("as-it-was", "As It Was", "Harry Styles", "English"),
  track("sunflower", "Sunflower", "Post Malone & Swae Lee", "English"),
  track("glimpse-of-us", "Glimpse of Us", "Joji", "English"),
  track("apocalypse", "Apocalypse", "Cigarettes After Sex", "English"),
  track("brooklyn-baby", "Brooklyn Baby", "Lana Del Rey", "English"),
  track("i-wanna-be-yours", "I Wanna Be Yours", "Arctic Monkeys", "English"),
  track("the-night-we-met", "The Night We Met", "Lord Huron", "English"),
  track("location", "Location", "Khalid", "English"),
  track("cardigan", "Cardigan", "Taylor Swift", "English"),
  track("die-for-you", "Die For You", "The Weeknd", "English"),
  track("stay", "Stay", "The Kid LAROI & Bieber", "English"),
  track("best-part", "Best Part", "Daniel Caesar & H.E.R.", "English"),
  track("jaane-woh-kaise", "Jaane Woh Kaise Log The", "Hemant Kumar", "Hindi"),
];

const hindiLibrary: Track[] = [
  track("line-without-a-hook", "Line Without a Hook", "Ricky Montgomery", "English"),
  track("i-love-you-so", "I Love You So", "The Walters", "English"),
  track("kyun", "Kyun", "Pritam", "Hindi"),
  track("tum-hi-ho", "Tum Hi Ho", "Arijit Singh", "Hindi"),
  track("channa-mereya", "Channa Mereya", "Arijit Singh", "Hindi"),
  track("agar-tum-saath-ho", "Agar Tum Saath Ho", "Arijit Singh & Alka Yagnik", "Hindi"),
  track("iktara", "Iktara", "Kavita Seth", "Hindi"),
  track("phir-le-aya-dil", "Phir Le Aya Dil", "Arijit Singh", "Hindi"),
  track("raabta", "Raabta", "Arijit Singh", "Hindi"),
  track("tujhe-kitna", "Tujhe Kitna Chahne Lage", "Arijit Singh", "Hindi"),
  track("khairiyat", "Khairiyat", "Arijit Singh", "Hindi"),
  track("o-bedardeya", "O Bedardeya", "Arijit Singh", "Hindi"),
  track("jo-tum-mere-ho", "Jo Tum Mere Ho", "Anuv Jain", "Hindi"),
  track("husn", "Husn", "Anuv Jain", "Hindi"),
  track("baarishein", "Baarishein", "Anuv Jain", "Hindi"),
  track("choo-lo", "Choo Lo", "The Local Train", "Hindi"),
];

/** Featured first, then the curated English + Hindi library. */
export const tracks: Track[] = [
  ...featuredTracks,
  ...englishLibrary,
  ...hindiLibrary,
];

/** Look up a single track by slug. */
export const bySlug = (slug: string): Track | undefined =>
  tracks.find((t) => t.slug === slug);

/** Curate an ordered subset by slug (skips any that don't exist). */
export const pick = (...slugs: string[]): Track[] =>
  slugs.map(bySlug).filter((t): t is Track => Boolean(t));

/** The 24 library covers that ride the horizontal §TrackSection track. */
export const trackStripTracks: Track[] = [...englishLibrary, ...hindiLibrary.slice(0, 10)];

/** 5 hero songs for the stacked deck below "Genres That Linger" (§ClassicsSection). */
export const classicTracks: Track[] = pick(
  "double-take",
  "co2",
  "heather",
  "abhi-na-jao",
  "aashiqana",
);

/** 6 covers for the rotating "Favorites Archive" wheel (§FavoritesSection). */
export const favoriteWheelTracks: Track[] = pick(
  "banda-kaam-ka",
  "kyun",
  "tum-hi-ho",
  "the-night-we-met",
  "channa-mereya",
  "jaane-woh-kaise",
);

/** 14 covers for the alternating story blocks (§StoriesSection). */
export const storyTracks: Track[] = [
  ...englishLibrary.slice(0, 7),
  ...hindiLibrary.slice(0, 7),
];

/** Bundled royalty-free fallback used when /audio/<slug>.mp3 is missing. */
export const FALLBACK_SRC = "/audio/placeholder.wav";
