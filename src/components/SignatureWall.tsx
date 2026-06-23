import { getSignatureWall } from "@/db/queries";
import styles from "./SignatureWall.module.css";

export async function SignatureWall() {
  const signatures = await getSignatureWall();

  if (signatures.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>The wall is waiting for its first name.</p>
        <p className="muted">
          Signatures appear here once reviewed. Sign above to add yours.
        </p>
      </div>
    );
  }

  return (
    <ul className={styles.wall}>
      {signatures.map((s) => (
        <li key={s.id} className={styles.cell}>
          <div className={styles.sig}>
            {s.signature ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={s.signature}
                alt={`${s.name}'s signature`}
                className={styles.drawn}
              />
            ) : (
              <span className={styles.script}>{s.name}</span>
            )}
          </div>
          <p className={styles.meta}>
            <span className={styles.name}>{s.name}</span>
            {(s.occupation || s.country) && (
              <span className={styles.sub}>
                {[s.occupation, s.country].filter(Boolean).join(" · ")}
              </span>
            )}
          </p>
        </li>
      ))}
    </ul>
  );
}
