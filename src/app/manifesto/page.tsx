import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SignForm } from "@/components/SignForm";
import { MessageBoard } from "@/components/MessageBoard";
import { SignatureWall } from "@/components/SignatureWall";
import { PRINCIPLES, VALUES } from "@/content";
import { getSignatureCount } from "@/db/queries";
import { nextMilestone } from "@/lib/milestones";
import styles from "./manifesto.module.css";

// Always render fresh so the signature count, wall, and message board are current.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Manifesto for Human-Centred AI",
  description:
    "Read and sign the HumAIne Manifesto: twelve principles for using AI with purpose, active thinking, human agency, and deeper human connection.",
  alternates: {
    canonical: "/manifesto",
  },
  openGraph: {
    title: "The HumAIne Manifesto",
    description:
      "Twelve principles for using AI with purpose, active thinking, human agency, and deeper human connection.",
    url: "/manifesto",
  },
  twitter: {
    card: "summary",
    title: "The HumAIne Manifesto",
    description:
      "Twelve principles for using AI with purpose, active thinking, human agency, and deeper human connection.",
  },
};

export default async function ManifestoPage() {
  const count = await getSignatureCount();
  const goal = nextMilestone(count);
  const progress = Math.min(100, Math.round((count / goal) * 100));

  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>The Manifesto</p>
            <h1 className="display">The HumAIne Manifesto</h1>
            <p className="lead">
              A human-centred approach to AI. Not a how-to guide for exactly
              what to do, but a direction for decisions that puts human
              flourishing first.
            </p>
            <p className={styles.oath}>No matter what, humans come first.</p>
            <div className={styles.heroCtas}>
              <Link href="#principles" className="btn btn-primary btn-lg">
                Read the principles
              </Link>
              <Link href="#sign" className="btn btn-secondary btn-lg">
                Sign the Manifesto
              </Link>
            </div>
          </div>

          <aside className={styles.heroPanel} aria-label="Manifesto structure">
            <div>
              <span>4</span>
              <p>values we choose to live by</p>
            </div>
            <div>
              <span>12</span>
              <p>principles for staying human with AI</p>
            </div>
            <div>
              <span>{count.toLocaleString()}</span>
              <p>{count === 1 ? "person has" : "people have"} signed so far</p>
            </div>
          </aside>
        </div>
        <svg
          className={styles.heroGeometry}
          viewBox="0 0 760 560"
          aria-hidden="true"
        >
          <ellipse cx="430" cy="280" rx="260" ry="520" />
          <ellipse cx="520" cy="280" rx="210" ry="470" />
          <ellipse cx="610" cy="280" rx="160" ry="420" />
        </svg>
      </section>

      {/* ------------------------------------------------------------ POSITION */}
      <section className="section-tight">
        <div className="container">
          <div className={styles.position}>
            <div>
              <span>Not this</span>
              <p>A rulebook for outsourced thinking.</p>
            </div>
            <strong>but</strong>
            <div>
              <span>This</span>
              <p>A centre of gravity for judgment, agency, and care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- VALUES */}
      <section className="section">
        <div className="container stack-lg">
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>What we stand for</p>
            <h2>Four values we choose over the easier path.</h2>
            <p>
              We&apos;re uncovering better ways of living and working in the age
              of AI. The values on the right are the easier short-term path; we
              choose the left for the long-term wellbeing of humanity.
            </p>
          </div>

          <ul className={styles.valuesGrid}>
            {VALUES.map((value) => (
              <li
                key={value.left}
                className={`${styles.valueCard} ${styles[value.color]}`}
              >
                <span className={styles.valueLabel}>We prioritise</span>
                <strong>{value.left}</strong>
                <span className={styles.valueOver}>over</span>
                <p>{value.right}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------------------------------------------------- PRINCIPLES */}
      <section id="principles" className="section band-cream">
        <div className="container stack-lg">
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>Twelve principles</p>
            <h2>The practical spine of the manifesto.</h2>
          </div>

          <div className={styles.principlesGrid}>
            {PRINCIPLES.map((principle, groupIndex) => (
              <article
                key={principle.title}
                className={`${styles.principleGroup} ${styles[principle.band]}`}
              >
                <div className={styles.principleHead}>
                  <h3>{principle.title}</h3>
                  <p>over {VALUES[groupIndex]?.right.toLowerCase()}</p>
                </div>
                <ol className={styles.points}>
                  {principle.points.map((point, pointIndex) => (
                    <li key={point}>
                      <span>{groupIndex * 3 + pointIndex + 1}</span>
                      <p>{point}</p>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- SIGN */}
      <section id="sign" className={`section band-ink ${styles.signSection}`}>
        <div className={`container ${styles.signGrid}`}>
          <div className={styles.signIntro}>
            <p className={styles.kicker}>The living manifesto</p>
            <h2>
              Embrace AI. <br />
              <span>Elevate Human Potential.</span>
            </h2>
            <p>
              The values endure even as versions evolve. If this direction
              speaks to you, put your name to the movement.
            </p>
            <div className={styles.momentum}>
              <p>
                <strong>{count.toLocaleString()}</strong>{" "}
                {count === 1 ? "person has" : "people have"} signed. Help us
                reach {goal.toLocaleString()}.
              </p>
              <div
                className={styles.progress}
                role="progressbar"
                aria-valuenow={count}
                aria-valuemin={0}
                aria-valuemax={goal}
              >
                <span
                  className={styles.progressFill}
                  style={{ width: `${Math.max(progress, 2)}%` }}
                />
              </div>
              <span>{progress}% of the way there</span>
            </div>
          </div>

          <div className={styles.signPanel}>
            <SignForm />
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- SIGNATURE WALL */}
      <section className="section">
        <div className="container stack-lg">
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>The wall</p>
            <h2>Signed by humans</h2>
            <p>
              Every name here belongs to someone who chose to stay human with
              AI. Admins may remove entries that do not belong here.
            </p>
          </div>
          <Suspense fallback={<p className="muted">Loading signatures...</p>}>
            <SignatureWall />
          </Suspense>
        </div>
      </section>

      {/* ------------------------------------------------------- MESSAGE BOARD */}
      <section className="section band-cream">
        <div className="container stack-lg">
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>The board</p>
            <h2>What people hope we remember</h2>
            <p>
              Messages left by people who signed the manifesto. Admins may
              remove entries that do not belong here.
            </p>
          </div>
          <Suspense fallback={<p className="muted">Loading messages...</p>}>
            <MessageBoard />
          </Suspense>
        </div>
      </section>
    </>
  );
}
