import type { Metadata } from "next";
import Link from "next/link";
import { getAdminSignatures, getInterest, getNewsletter } from "@/db/queries";
import { adminLogout } from "./actions";
import { isAdmin, adminSecret } from "./auth";
import { AdminLogin } from "./AdminLogin";
import { ModerationList } from "./ModerationList";
import styles from "./admin.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return (
      <div className={styles.gate}>
        <AdminLogin configured={adminSecret() !== null} />
      </div>
    );
  }

  const [rows, interest, subscribers] = await Promise.all([
    getAdminSignatures(),
    getInterest(),
    getNewsletter(),
  ]);
  const hidden = rows.filter((r) => !r.approved);
  const visible = rows.filter((r) => r.approved);

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div>
          <p className="eyebrow">Moderation</p>
          <h1 className={styles.title}>Signature queue</h1>
          <p className="muted">
            {visible.length} visible · {hidden.length} hidden · {rows.length}{" "}
            total. New signatures appear publicly by default; hide or delete
            anything that does not belong.
          </p>
        </div>
        <div className={styles.headerActions}>
          <a
            href="/admin/export?type=signatures"
            className="btn btn-secondary btn-sm"
          >
            Export signers CSV
          </a>
          <a
            href="/admin/export?type=interest"
            className="btn btn-secondary btn-sm"
          >
            Export interest CSV
          </a>
          <a
            href="/admin/export?type=newsletter"
            className="btn btn-secondary btn-sm"
          >
            Export newsletter CSV
          </a>
          <Link href="/admin/resources" className="btn btn-secondary btn-sm">
            Resource Bank
          </Link>
          <form action={adminLogout}>
            <button type="submit" className="btn btn-secondary btn-sm">
              Log out
            </button>
          </form>
        </div>
      </header>

      <section className={styles.group}>
        <h2 className={styles.groupTitle}>Hidden ({hidden.length})</h2>
        {hidden.length === 0 ? (
          <p className="muted">No hidden signatures.</p>
        ) : (
          <ModerationList rows={hidden} />
        )}
      </section>

      <section className={styles.group}>
        <h2 className={styles.groupTitle}>Visible ({visible.length})</h2>
        {visible.length === 0 ? (
          <p className="muted">No visible signatures yet.</p>
        ) : (
          <ModerationList rows={visible} />
        )}
      </section>

      <section className={styles.group}>
        <h2 className={styles.groupTitle}>
          Active-member interest ({interest.length})
        </h2>
        {interest.length === 0 ? (
          <p className="muted">No interest sign-ups yet.</p>
        ) : (
          <ul className={styles.interestList}>
            {interest.map((r) => (
              <li key={r.id} className={styles.interestRow}>
                <span className={styles.interestName}>{r.name}</span>
                <a
                  href={`mailto:${r.email}`}
                  className={styles.interestEmail}
                >
                  {r.email}
                </a>
                <span className={styles.interestDate}>
                  {r.createdAt.toLocaleDateString("en-GB")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={styles.group}>
        <h2 className={styles.groupTitle}>
          Newsletter subscribers ({subscribers.length})
        </h2>
        {subscribers.length === 0 ? (
          <p className="muted">No newsletter subscribers yet.</p>
        ) : (
          <ul className={styles.interestList}>
            {subscribers.map((r) => (
              <li key={r.id} className={styles.newsletterRow}>
                <a
                  href={`mailto:${r.email}`}
                  className={styles.interestEmail}
                >
                  {r.email}
                </a>
                <span className={styles.interestDate}>
                  {r.createdAt.toLocaleDateString("en-GB")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
