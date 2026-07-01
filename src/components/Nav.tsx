import Link from "next/link";
import { Logo } from "./Logo";
import styles from "./Nav.module.css";

export function Nav() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brandCell}>
          <Logo />
        </div>
        <nav className={styles.links} aria-label="Primary">
          <Link href="/#why" className={styles.link}>
            Why
          </Link>
          <Link href="/#what" className={styles.link}>
            What
          </Link>
          <Link href="/#founding-members" className={styles.link}>
            Founding Members
          </Link>
          <Link href="/manifesto" className={styles.link}>
            Manifesto
          </Link>
        </nav>
        <div className={styles.actions}>
          <Link href="/manifesto#sign" className={styles.cta}>
            Sign the Manifesto
          </Link>
        </div>
      </div>
    </header>
  );
}
