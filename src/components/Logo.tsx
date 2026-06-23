import Link from "next/link";
import Image from "next/image";
import logoMark from "../../public/humaine-logo.png";
import styles from "./Logo.module.css";

/**
 * HumAIne logo: the official fingerprint-H + circuit-H mark (human + AI),
 * with the "AI" in the wordmark set in brand amber. The cream-backed mark is
 * used on light surfaces (nav); on dark surfaces (footer) we show the
 * wordmark only so there's no cream box.
 */
export function Logo({
  showText = true,
  inverted = false,
}: {
  showText?: boolean;
  inverted?: boolean;
}) {
  return (
    <Link href="/" aria-label="HumAIne — home" className={styles.logo}>
      {!inverted && (
        <Image
          src={logoMark}
          alt=""
          className={styles.mark}
          height={32}
          priority
        />
      )}
      {showText && (
        <span
          className={styles.word}
          style={{ color: inverted ? "var(--paper)" : "var(--ink)" }}
        >
          Hum<span style={{ color: "var(--amber)" }}>AI</span>ne
        </span>
      )}
    </Link>
  );
}
