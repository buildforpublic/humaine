import styles from "./CommunityCarousel.module.css";

const PHOTOS = [
  { src: "/community/photo-1.jpg", alt: "A member presenting at a workshop" },
  { src: "/community/photo-2.jpg", alt: "Members collaborating at laptops" },
  { src: "/community/photo-3.jpg", alt: "A small-group discussion" },
  { src: "/community/photo-4.jpg", alt: "The community meeting online" },
  { src: "/community/photo-5.jpg", alt: "A full room at a HumAIne session" },
  { src: "/community/photo-6.jpg", alt: "A member sharing an idea" },
  { src: "/community/photo-7.jpg", alt: "A facilitator at the whiteboard" },
  { src: "/community/photo-8.jpg", alt: "People learning together" },
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
