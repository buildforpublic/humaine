import type { Metadata } from "next";
import { Suspense } from "react";
import { SignForm } from "@/components/SignForm";
import { MessageBoard } from "@/components/MessageBoard";
import { SignatureWall } from "@/components/SignatureWall";
import { PRINCIPLES, VALUES } from "@/content";
import { getSignatureCount } from "@/db/queries";
import { nextMilestone } from "@/lib/milestones";
import styles from "./manifesto.module.css";

// Always render fresh so the signature count and approved message board are current.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Manifesto",
  description:
    "The HumAIne Manifesto establishes the values and principles of a human-centered approach to AI. Read it, and sign.",
};

export default async function ManifestoPage() {
  const count = await getSignatureCount();
  const goal = nextMilestone(count);
  const progress = Math.min(100, Math.round((count / goal) * 100));

  return (
    <>
      {/* --------------------------------------------------------------- INTRO */}
      <section className={styles.intro}>
        <div className="container container-narrow stack-lg">
          <div className="stack">
            <p className="eyebrow">The Manifesto</p>
            <h1 className="display">The HumAIne Manifesto</h1>
          </div>
          <p className="lead">
            This Manifesto establishes the values and principles of a
            human-centered approach to AI.
          </p>
          <div className={styles.isnot}>
            <div className={styles.isnotCol}>
              <span className={styles.isnotLabel}>What it is not</span>
              <p>
                A &ldquo;how-to&rdquo; guide for exactly what to do or not do.
              </p>
            </div>
            <div className={styles.isnotCol}>
              <span className={styles.isnotLabel}>What it is</span>
              <p>
                A direction for decision making, which prioritises humans&rsquo;
                long-term wellbeing and flourishing of human potential. No matter
                what, humans come first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- VALUES */}
      <section className="section band-cream">
        <div className="container container-narrow stack-lg">
          <p className={styles.valuesIntro}>
            We are uncovering better ways of living and working in the age of AI
            by practising the following values. We recognise that while there is
            value in the items on the right (higher efficiency, less effort,
            etc.), we value the items on the left more.
          </p>

          <ul className={styles.values}>
            {VALUES.map((v) => (
              <li key={v.left} className={styles.value}>
                <span className={styles.valueLeft}>{v.left}</span>
                <span className={styles.valueOver}>over</span>
                <span className={styles.valueRight}>{v.right}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------------------------------------------------- PRINCIPLES */}
      <section className="section">
        <div className="container container-narrow">
          <div className="stack" style={{ marginBottom: "3rem" }}>
            <p className="eyebrow">Principles</p>
            <h2>Principles behind the HumAIne Manifesto</h2>
          </div>

          <div className={styles.principles}>
            {PRINCIPLES.map((p, i) => (
              <article key={p.title} className={`${styles.principle} band-${p.band}`}>
                <div className={styles.principleNum}>{`0${i + 1}`}</div>
                <h3>{p.title}</h3>
                <ul className={styles.points}>
                  {p.points.map((pt, j) => (
                    <li key={j}>{pt}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- LIVING DOC */}
      <section className="section-tight">
        <div className="container container-narrow">
          <div className={styles.living}>
            <h3 className={styles.livingTitle}>This is a living manifesto.</h3>
            <p>
              While the values and principles are curated to be timeless
              fundamentals, as AI continues to develop, there may be updated
              versions. Most importantly, the commitment beneath them does not:{" "}
              <strong>Stay Human with AI.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- SIGN */}
      <section id="sign" className="section band-blue">
        <div className="container">
          <div className={styles.signLayout}>
            <div className={styles.signIntro}>
              <p className="eyebrow">Take the next step</p>
              <h2>Sign the Manifesto</h2>
              <p style={{ fontSize: "1.0625rem", lineHeight: 1.6, marginTop: "1rem" }}>
                If the above values and principles speak to you, paint a picture
                of a future that you want to live in, or make you feel connected
                — take the next step.
              </p>
              <div className={styles.momentum}>
                <p className={styles.momentumLead}>
                  We&rsquo;ve collected{" "}
                  <span className={styles.momentumNum}>
                    {count.toLocaleString()}
                  </span>{" "}
                  {count === 1 ? "signature" : "signatures"} so far — help us
                  reach our{" "}
                  {goal <= 100 ? "first" : "next"} {goal.toLocaleString()}.
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
                <p className={styles.progressMeta}>
                  {progress}% of the way to {goal.toLocaleString()}
                </p>
              </div>
            </div>

            <div className={`card ${styles.signCard}`}>
              <SignForm />
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- SIGNATURE WALL */}
      <section className="section band-cream">
        <div className="container stack-lg">
          <div className="stack" style={{ maxWidth: "48ch" }}>
            <p className="eyebrow">The wall</p>
            <h2>Signed by humans</h2>
            <p className="muted">
              Every name here belongs to someone who chose to stay human with
              AI. Shown once reviewed.
            </p>
          </div>
          <Suspense fallback={<p className="muted">Loading signatures…</p>}>
            <SignatureWall />
          </Suspense>
        </div>
      </section>

      {/* ------------------------------------------------------- MESSAGE BOARD */}
      <section className="section">
        <div className="container stack-lg">
          <div className="stack" style={{ maxWidth: "48ch" }}>
            <p className="eyebrow">The board</p>
            <h2>What people hope we remember</h2>
            <p className="muted">
              Messages left by people who signed the manifesto. Shown once
              reviewed.
            </p>
          </div>
          <Suspense fallback={<p className="muted">Loading messages…</p>}>
            <MessageBoard />
          </Suspense>
        </div>
      </section>
    </>
  );
}
