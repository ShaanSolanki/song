# SONGS.md — curated tracklist for RESONANCE

Feed this into `src/data/tracks.ts`. **Featured songs come first** (these power the §6
special set), then a famous **English + Hindi** mix for the library. `slug` drives both
`/audio/<slug>.mp3` and `/covers/<slug>.jpg`.

> Note: real recordings are copyrighted — ship with placeholder/royalty-free clips and let
> the user drop their own MP3s into `public/audio/<slug>.mp3`.

---

## ⭐ Featured (special set — keep this exact order at the start)

| # | slug                | title                  | artist                       | lang    |
|---|---------------------|------------------------|------------------------------|---------|
| 1 | double-take         | Double Take            | Dhruv                        | English |
| 2 | co2                 | CO2                    | Prateek Kuhad                | Hindi   |
| 3 | heather             | Heather                | Conan Gray                   | English |
| 4 | abhi-na-jao         | Abhi Na Jao Chhod Ke   | Mohammed Rafi & Asha Bhosle  | Hindi   |
| 5 | aashiqana           | Aashiqana              | Chaar Diwari                 | Hindi   |
| 6 | banda-kaam-ka       | Banda Kaam Ka          | Chaar Diwari                 | Hindi   |

---

## 🎵 Library — English

| slug              | title                  | artist                  |
|-------------------|------------------------|-------------------------|
| blinding-lights   | Blinding Lights        | The Weeknd              |
| as-it-was         | As It Was              | Harry Styles            |
| sunflower         | Sunflower              | Post Malone & Swae Lee  |
| glimpse-of-us     | Glimpse of Us          | Joji                    |
| apocalypse        | Apocalypse             | Cigarettes After Sex    |
| lovely            | Lovely                 | Billie Eilish & Khalid  |
| electric-love     | Electric Love          | BØRNS                   |
| the-night-we-met  | The Night We Met       | Lord Huron              |
| location          | Location               | Khalid                  |
| cardigan          | Cardigan               | Taylor Swift            |
| die-for-you       | Die For You            | The Weeknd              |
| stay              | Stay                   | The Kid LAROI & Bieber  |
| best-part         | Best Part              | Daniel Caesar & H.E.R.  |
| somewhere-only-we | Somewhere Only We Know | Keane                   |

---

## 🎵 Library — Hindi

| slug              | title                     | artist                      |
|-------------------|---------------------------|-----------------------------|
| kahani-suno       | Kahani Suno 2.0           | Kaifi Khalil                |
| pal-pal           | Pal Pal                   | Afusic & AliSoomroMusic     |
| kesariya          | Kesariya                  | Arijit Singh                |
| tum-hi-ho         | Tum Hi Ho                 | Arijit Singh                |
| channa-mereya     | Channa Mereya             | Arijit Singh                |
| agar-tum-saath-ho | Agar Tum Saath Ho         | Arijit Singh & Alka Yagnik  |
| iktara            | Iktara                    | Kavita Seth                 |
| phir-le-aya-dil   | Phir Le Aya Dil           | Arijit Singh                |
| raabta            | Raabta                    | Arijit Singh                |
| tujhe-kitna       | Tujhe Kitna Chahne Lage   | Arijit Singh                |
| khairiyat         | Khairiyat                 | Arijit Singh                |
| o-bedardeya       | O Bedardeya               | Arijit Singh                |
| jo-tum-mere-ho    | Jo Tum Mere Ho            | Anuv Jain                   |
| husn              | Husn                      | Anuv Jain                   |
| baarishein        | Baarishein                | Anuv Jain                   |
| choo-lo           | Choo Lo                   | The Local Train             |

---

### Notes
- "Major songs are English and Hindi" — honored: the library is split evenly between the two.
- Featured set is fixed and ordered; everything else is curated for vibe and can be tuned.
- If you add tracks, keep `slug` kebab-case and unique; it's the key for audio + cover lookup.
