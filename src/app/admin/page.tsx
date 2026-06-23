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
  const pending = rows.filter((r) => !r.approved);
  const approved = rows.filter((r) => r.approved);

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div>
          <p className="eyebrow">Moderation</p>
          <h1 className={styles.title}>Signature queue</h1>
          <p className="muted">
            {pending.length} pending · {approved.length} approved · {rows.length}{" "}
            total. Approving publishes the message (to the board) and signature
            (to the wall, if not anonymous).
          </p>
        </div>
        <form action={adminLogout}>
          <button type="submit" className="btn btn-secondary btn-sm">
            Log out
          </button>
        </form>
      </header>

      <section className={styles.group}>
        <h2 className={styles.groupTitle}>Pending ({pending.length})</h2>
        {pending.length === 0 ? (
          <p className="muted">Nothing waiting. 🎉</p>
        ) : (
          <ModerationList rows={pending} />
        )}
      </section>

      <section className={styles.group}>
        <h2 className={styles.groupTitle}>Approved ({approved.length})</h2>
        {approved.length === 0 ? (
          <p className="muted">No approved signatures yet.</p>
        ) : (
          <ModerationList rows={approved} />
        )}
      </section>
    </div>
  );
}
