import type { Metadata } from "next";
import { getPublicResources } from "@/db/queries";
import { ResourceExplorer } from "@/components/resources/ResourceExplorer";
import styles from "./resources.module.css";

// Render fresh so admin edits appear without a rebuild.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resource Bank",
  description:
    "A curated, filterable library of the best reading, listening, and research on using AI with purpose, active thinking, human agency, and deeper humanness.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "The HumAIne Resource Bank",
    description:
      "Curated resources for using AI with purpose, active thinking, human agency, and deeper humanness.",
    url: "/resources",
  },
  twitter: {
    card: "summary",
    title: "The HumAIne Resource Bank",
    description:
      "Curated resources for using AI with purpose, active thinking, human agency, and deeper humanness.",
  },
};

export default async function ResourcesPage() {
  const data = await getPublicResources();

  return (
    <>
      <section className={`section-tight ${styles.hero}`}>
        <div className="container">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Resource Bank</p>
            <h1 className="display">Think for yourself, with AI.</h1>
            <p className="lead">
              A curated library of the best reading, listening, and research on
              staying deeply human in the age of AI. Organised under our four
              values. Start with the picks below, or search and filter your own
              way in.
            </p>
          </div>
        </div>
      </section>

      <ResourceExplorer data={data} />
    </>
  );
}
