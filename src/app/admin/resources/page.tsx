import type { Metadata } from "next";
import Link from "next/link";
import { getAdminResources } from "@/db/queries";
import { adminLogout } from "../actions";
import { isAdmin, adminSecret } from "../auth";
import { AdminLogin } from "../AdminLogin";
import { ResourceAdmin } from "@/components/admin/ResourceAdmin";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin · Resources",
  robots: { index: false, follow: false },
};

export default async function AdminResourcesPage() {
  if (!(await isAdmin())) {
    return (
      <div className={styles.gate}>
        <AdminLogin configured={adminSecret() !== null} />
      </div>
    );
  }

  const rows = await getAdminResources();
  const published = rows.filter((r) => r.published).length;
  const featured = rows.filter((r) => r.featured).length;

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div>
          <p className="eyebrow">Resource Bank</p>
          <h1 className={styles.title}>Resources</h1>
          <p className="muted">
            {rows.length} total · {published} published · {featured} featured.
            Changes appear on the public page immediately.{" "}
            <Link href="/admin" className="text-accent">
              Back to signatures
            </Link>
          </p>
        </div>
        <form action={adminLogout}>
          <button type="submit" className="btn btn-secondary btn-sm">
            Log out
          </button>
        </form>
      </header>

      <ResourceAdmin rows={rows} />
    </div>
  );
}
