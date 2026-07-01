import styles from "./CommunityCarousel.module.css";

const PHOTOS = [
  { src: "/community/photo-1.jpg", alt: "The room during a HumAIne roundtable session" },
  { src: "/community/photo-2.jpg", alt: "Members in conversation around a table" },
  { src: "/community/photo-3.jpg", alt: "A member presenting at a HumAIne roundtable" },
  { src: "/community/photo-4.jpg", alt: "A small group sharing ideas" },
  { src: "/community/photo-5.jpg", alt: "Two members talking during a break" },
  { src: "/community/photo-6.jpg", alt: "Members laughing during a discussion" },
  { src: "/community/photo-7.jpg", alt: "Members connecting over food" },
  { src: "/community/photo-8.jpg", alt: "A lively table discussion" },
];

// Border colour + tilt per card, cycled for a playful, hand-pinned feel.
const COLORS = ["amber", "blue", "green", "purple", "rose"];
const TILTS = [-2.5, 2, -1.5, 2.5, -2, 1.5, -2.2, 2];

export function CommunityCarousel() {
  // Render the set twice so the marquee loops seamlessly.
  const cards = [...PHOTOS, ...PHOTOS];

  return (
    <div className={styles.viewport} aria-label="Community photos">
      <div className={styles.track}>
        {cards.map((p, i) => {
          const idx = i % PHOTOS.length;
          return (
            <figure
              key={i}
              className={`${styles.card} ${styles[COLORS[idx % COLORS.length]]}`}
              style={{ ["--tilt" as string]: `${TILTS[idx % TILTS.length]}deg` }}
              aria-hidden={i >= PHOTOS.length}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={i < PHOTOS.length ? p.alt : ""} />
            </figure>
          );
        })}
      </div>
    </div>
  );
}
