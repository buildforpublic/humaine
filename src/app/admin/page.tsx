import type { Metadata } from "next";
import { getAdminSignatures } from "@/db/queries";
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

  const rows = await getAdminSignatures();
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
        <form action={adminLogout}>
          <button type="submit" className="btn btn-secondary btn-sm">
            Log out
          </button>
        </form>
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
    </div>
  );
}
