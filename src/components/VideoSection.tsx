import { BlurRevealSection } from "@/components/BlurRevealSection";
import styles from "./VideoSection.module.css";

/**
 * Self-hosted manifesto film. The URL is env-driven so swapping v1 → v2 is a
 * one-line change (and so the large asset never lives in the repo). Set
 * `NEXT_PUBLIC_MANIFESTO_VIDEO_URL` to the hosted MP4 (Vercel Blob). If it is
 * unset, the section renders nothing — the page stays clean.
 */
const VIDEO_URL = process.env.NEXT_PUBLIC_MANIFESTO_VIDEO_URL;

export function VideoSection() {
  if (!VIDEO_URL) return null;

  return (
    <BlurRevealSection id="film" className="section band-cream">
      <div className="container stack-lg">
        <div
          className="stack"
          style={{ textAlign: "center", maxWidth: "48ch", marginInline: "auto" }}
        >
          <h2>Watch the film</h2>
          <p className="muted">
            Why we started HumAIne — in ninety seconds.
          </p>
        </div>
        <div className={styles.frame}>
          <video
            className={styles.video}
            controls
            preload="none"
            playsInline
            poster="/video-poster.jpg"
          >
            <source src={VIDEO_URL} type="video/mp4" />
            Your browser doesn&rsquo;t support embedded video.
          </video>
        </div>
      </div>
    </BlurRevealSection>
  );
}
