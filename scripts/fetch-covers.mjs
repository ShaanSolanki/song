// Fetches real, aesthetic album artwork for every track via the iTunes Search
// API (no key required) and saves a 600x600 JPG to public/covers/<slug>.jpg.
// Re-run any time tracks.ts changes. Existing covers are skipped unless --force.
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const coversDir = join(__dirname, "..", "public", "covers");
mkdirSync(coversDir, { recursive: true });

const force = process.argv.includes("--force");

// Slug → search hints. Title + artist drive the iTunes query; a manual override
// term sharpens results for tracks with ambiguous or non-Latin matches.
const TRACKS = [
  ["double-take", "Double Take", "Dhruv"],
  ["co2", "CO2", "Prateek Kuhad"],
  ["heather", "Heather", "Conan Gray"],
  ["abhi-na-jao", "Abhi Na Jao Chhod Ke", "Mohammed Rafi Asha Bhosle"],
  ["aashiqana", "Aashiqana", "Chaar Diwari"],
  ["banda-kaam-ka", "Banda Kaam Ka", "Chaar Diwari"],
  ["blinding-lights", "Blinding Lights", "The Weeknd"],
  ["as-it-was", "As It Was", "Harry Styles"],
  ["sunflower", "Sunflower Spider-Man", "Post Malone Swae Lee"],
  ["glimpse-of-us", "Glimpse of Us", "Joji"],
  ["apocalypse", "Apocalypse", "Cigarettes After Sex"],
  ["brooklyn-baby", "Brooklyn Baby", "Lana Del Rey"],
  ["i-wanna-be-yours", "I Wanna Be Yours", "Arctic Monkeys"],
  ["the-night-we-met", "The Night We Met", "Lord Huron"],
  ["location", "Location", "Khalid"],
  ["cardigan", "cardigan", "Taylor Swift"],
  ["die-for-you", "Die For You", "The Weeknd"],
  ["stay", "Stay", "The Kid LAROI Justin Bieber"],
  ["best-part", "Best Part", "Daniel Caesar H.E.R."],
  ["jaane-woh-kaise", "Jaane Woh Kaise Log The Pyaasa", "Hemant Kumar Geeta Dutt"],
  ["line-without-a-hook", "Line Without a Hook", "Ricky Montgomery"],
  ["i-love-you-so", "I Love You So", "The Walters"],
  ["kyun", "Kyun", "Pritam"],
  ["tum-hi-ho", "Tum Hi Ho Aashiqui 2", "Arijit Singh"],
  ["channa-mereya", "Channa Mereya Ae Dil Hai Mushkil", "Arijit Singh"],
  ["agar-tum-saath-ho", "Agar Tum Saath Ho Tamasha", "Arijit Singh Alka Yagnik"],
  ["iktara", "Iktara Wake Up Sid", "Kavita Seth"],
  ["phir-le-aya-dil", "Phir Le Aya Dil Barfi", "Arijit Singh"],
  ["raabta", "Raabta Agent Vinod", "Arijit Singh"],
  ["tujhe-kitna", "Tujhe Kitna Chahne Lage Kabir Singh", "Arijit Singh"],
  ["khairiyat", "Khairiyat Chhichhore", "Arijit Singh"],
  ["o-bedardeya", "O Bedardeya Tu Jhoothi Main Makkaar", "Arijit Singh"],
  ["jo-tum-mere-ho", "Jo Tum Mere Ho", "Anuv Jain"],
  ["husn", "Husn", "Anuv Jain"],
  ["baarishein", "Baarishein", "Anuv Jain"],
  ["choo-lo", "Choo Lo", "The Local Train"],
];

async function search(term) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    term,
  )}&entity=song&limit=1`;
  const res = await fetch(url, { headers: { "User-Agent": "resonance-cover-fetch" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json.results?.[0] ?? null;
}

async function fetchCover([slug, title, artist]) {
  const out = join(coversDir, `${slug}.jpg`);
  if (!force && existsSync(out)) {
    return { slug, status: "skip" };
  }

  // Try "title artist", then just "title", as a fallback.
  let hit = await search(`${title} ${artist}`);
  if (!hit?.artworkUrl100) hit = await search(title);
  if (!hit?.artworkUrl100) return { slug, status: "no-match" };

  // Upscale the 100x100 thumb URL to a crisp 600x600.
  const artUrl = hit.artworkUrl100.replace("100x100bb", "600x600bb");
  const img = await fetch(artUrl);
  if (!img.ok) return { slug, status: `img HTTP ${img.status}` };
  const buf = Buffer.from(await img.arrayBuffer());
  writeFileSync(out, buf);
  return {
    slug,
    status: "ok",
    matched: `${hit.trackName} — ${hit.artistName}`,
    kb: (buf.length / 1024).toFixed(0),
  };
}

const results = [];
for (const t of TRACKS) {
  try {
    const r = await fetchCover(t);
    results.push(r);
    const tag =
      r.status === "ok"
        ? `✓ ${r.slug.padEnd(20)} ${r.kb}KB  ${r.matched}`
        : `· ${r.slug.padEnd(20)} ${r.status}`;
    console.log(tag);
  } catch (e) {
    results.push({ slug: t[0], status: "error" });
    console.log(`✗ ${t[0].padEnd(20)} ${e.message}`);
  }
  // Be polite to the API.
  await new Promise((r) => setTimeout(r, 250));
}

const ok = results.filter((r) => r.status === "ok").length;
const skip = results.filter((r) => r.status === "skip").length;
const miss = results.length - ok - skip;
console.log(`\nDone: ${ok} fetched, ${skip} skipped, ${miss} missing/error.`);
