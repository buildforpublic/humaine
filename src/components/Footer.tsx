import Link from "next/link";
import { Logo } from "./Logo";
import styles from "./Footer.module.css";

const SOCIALS = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "https://instagram.com/humaine.movement" },
  { label: "X", href: "https://x.com/humainemovement" },
  { label: "TikTok", href: "#" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Logo inverted />
          <p className={styles.tagline}>Championing Human-AI Synergy.</p>
        </div>

        <nav className={styles.col} aria-label="Site">
          <span className={styles.colTitle}>Movement</span>
          <Link href="/#why">Why HumAIne</Link>
          <Link href="/#what">What is HumAIne</Link>
          <Link href="/#founding-members">Founding Members</Link>
          <Link href="/manifesto">The Manifesto</Link>
          <Link href="/resources">Resource Bank</Link>
        </nav>

        <nav className={styles.col} aria-label="Follow">
          <span className={styles.colTitle}>Follow</span>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </nav>

        <div className={styles.col}>
          <span className={styles.colTitle}>Coming soon</span>
          <span className={styles.soon}>About HumAIne</span>
          <span className={styles.soon}>Messages</span>
        </div>
      </div>

      <div className={`container ${styles.legal}`}>
        <span>© {new Date().getFullYear()} HumAIne Movement</span>
        <span>humaine-movement.com</span>
      </div>
    </footer>
  );
}
