import styles from "./free-bgm.module.css";

// Audio files live in a Cloudflare R2 bucket (custom domain dl.mikaspark.com).
// If the bucket URL ever changes, this is the only line to update.
const DOWNLOAD_BASE = "https://dl.mikaspark.com/free-bgm/vol1";
const ZIP_URL = `${DOWNLOAD_BASE}/FLUTE_and_CO_Vol1_A_Day_in_a_Port_Town.zip`;
const YOUTUBE_URL = "https://www.youtube.com/@FluteAndCo";

type Track = { title: string; duration: string; file: string };

const tracks: Track[] = [
  { title: "Before the Town Wakes", duration: "2:59", file: "01-before-the-town-wakes.mp3" },
  { title: "Sunlight on the Pavement", duration: "2:56", file: "02-sunlight-on-the-pavement.mp3" },
  { title: "Sunlight on the Patio", duration: "2:55", file: "03-sunlight-on-the-patio.mp3" },
  { title: "Terrace at Noon", duration: "2:56", file: "04-terrace-at-noon.mp3" },
  { title: "Coastal Veranda", duration: "2:55", file: "05-coastal-veranda.mp3" },
  { title: "Salt and Sun", duration: "2:56", file: "06-salt-and-sun.mp3" },
  { title: "Salts and Keys", duration: "2:55", file: "07-salts-and-keys.mp3" },
  { title: "Tide Below the Pier", duration: "2:56", file: "08-tide-below-the-pier.mp3" },
  { title: "Harbor Reflections", duration: "2:40", file: "09-harbor-reflections.mp3" },
  { title: "Beneath the Cedar Bough", duration: "1:28", file: "10-beneath-the-cedar-bough.mp3" },
];

export default function FreeBgmPage() {
  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <p className={styles.brand}>FLUTE &amp; CO.</p>
        <a className={styles.topLink} href={YOUTUBE_URL} target="_blank" rel="noreferrer">
          YouTube
        </a>
      </header>

      <main className={styles.main}>
        <p className={styles.eyebrow}>Free BGM — no fees, credit only</p>
        <h1 className={styles.title}>Free Jazz Flute BGM</h1>
        <p className={styles.lead}>
          FLUTE &amp; CO. is a YouTube channel for jazz led by the flute — concert, alto and bass
          flutes paired with piano, guitar, vibraphone, harp and more, across styles, eras and
          moods. Every track is free to use as background music in your own videos, live streams
          and podcasts, including monetized content. All we ask is a credit line (see the license
          below).
        </p>
        <p className={styles.lead}>
          New here? Start with Vol. 1, press play, and let the flute keep you company.
        </p>

        <section className={styles.volume} aria-labelledby="vol1-heading">
          <div className={styles.volumeHead}>
            <img
              className={styles.cover}
              src="/brand/flute-and-co/vol1-cover.jpg"
              alt="Cover art for Vol. 1 — A Day in a Port Town (Before the Town Wakes)"
              width={720}
              height={720}
              loading="lazy"
            />
            <div className={styles.volumeHeadText}>
              <h2 id="vol1-heading" className={styles.volumeTitle}>
                Vol. 1 — A Day in a Port Town
              </h2>
              <p className={styles.volumeMeta}>Flute &amp; Piano · Jazz &amp; Bossa Nova · 10 tracks · MP3 320 kbps</p>
            </div>
            <a className={styles.zipButton} href={ZIP_URL}>
              Download all (ZIP, 66 MB)
            </a>
          </div>
          <p className={styles.volumeText}>
            A quiet day in a port town, told in flute and piano. Morning jazz for a slow walk,
            bossa nova for a sunny terrace, and a calm close under the cedar trees. For studying,
            working, reading, or simply doing nothing.
          </p>

          <ol className={styles.tracks}>
            {tracks.map((track, index) => (
              <li className={styles.track} key={track.file}>
                <span className={styles.trackNo}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.trackTitle}>{track.title}</span>
                <span className={styles.trackDuration}>{track.duration}</span>
                <audio
                  className={styles.player}
                  controls
                  preload="none"
                  src={`${DOWNLOAD_BASE}/${track.file}`}
                  aria-label={`Play ${track.title}`}
                />
                <a className={styles.trackDl} href={`${DOWNLOAD_BASE}/${track.file}`} download>
                  Download
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.license} aria-labelledby="license-heading">
          <h2 id="license-heading" className={styles.sectionTitle}>
            License — how you can use this music
          </h2>
          <p>
            Free BGM: You can use these tracks as background music in your own videos, live
            streams, and podcasts — including monetized content — free of charge, with credit.
            Trimming or fading a track to fit your video is fine.
          </p>
          <div className={styles.licenseGrid}>
            <div>
              <h3>You can</h3>
              <ul>
                <li>Use the tracks as background music in videos, live streams and podcasts</li>
                <li>Use them in monetized content, free of charge</li>
                <li>Trim or fade a track to fit your content</li>
              </ul>
            </div>
            <div>
              <h3>You must</h3>
              <ul>
                <li>Include the credit below in your description</li>
              </ul>
              <h3>You must not</h3>
              <ul>
                <li>Re-upload the tracks on their own, or as part of a music compilation</li>
                <li>Sell, redistribute, or sublicense the music itself</li>
                <li>Claim the music as your own work</li>
              </ul>
            </div>
          </div>
          <p className={styles.creditLabel}>Required credit (copy &amp; paste, with the track title filled in):</p>
          <pre className={styles.credit}>
            Music: &quot;[Track Title]&quot; by FLUTE &amp; CO. — https://www.youtube.com/@FluteAndCo
          </pre>
          <p className={styles.note}>
            These terms are FLUTE &amp; CO.&rsquo;s own license (not Creative Commons). Music
            composed with Google Gemini (Lyria); this page distributes AI-generated music,
            curated by a flute player.
          </p>
        </section>

        <section aria-labelledby="about-heading">
          <h2 id="about-heading" className={styles.sectionTitle}>
            About FLUTE &amp; CO.
          </h2>
          <p className={styles.lead}>
            Jazz, led by the flute — in every combination. New sets for work, study and relaxing
            are published on YouTube. If the music found a place in your project, subscribing is
            the best way to say thanks.
          </p>
          <p>
            <a className={styles.ytButton} href={YOUTUBE_URL} target="_blank" rel="noreferrer">
              Visit the YouTube channel
            </a>
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© FLUTE &amp; CO. / Mika Spark Studio</p>
        <p>
          <a href="/">Mika Spark Studio — home</a>
        </p>
      </footer>
    </div>
  );
}
