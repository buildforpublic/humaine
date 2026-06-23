import Link from "next/link";
import { CommunityCarousel } from "@/components/CommunityCarousel";
import { NewsletterForm } from "@/components/NewsletterForm";
import { FOUNDING_MEMBERS, SOCIALS } from "@/content";
import { getSignatureCount } from "@/db/queries";
import styles from "./home.module.css";

// Always render fresh so the live signature count reflects new signatures.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const count = await getSignatureCount();

  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/humaine-logo.png"
              alt="HumAIne logo — a fingerprint and a circuit forming an H"
              className={styles.heroLogo}
            />
            <p className={`${styles.heroEyebrow} rise rise-1`}>HumAIne Movement</p>
            <h1 className="display rise rise-2">
              Stay human <br className={styles.brk} />
              with AI.
            </h1>
            <p className="lead rise rise-3" style={{ maxWidth: "44ch" }}>
              A global movement for people who refuse to choose between embracing
              AI and staying deeply human. They&rsquo;re part of the same goal.
            </p>
            <div className={`${styles.heroCtas} rise rise-4`}>
              <Link href="/manifesto" className="btn btn-primary btn-lg">
                Read the Manifesto
              </Link>
              <a href="#follow" className="btn btn-ghost btn-lg">
                Follow the Movement
              </a>
            </div>
            {count > 0 && (
              <p className={`${styles.heroCount} rise rise-5`}>
                <strong>{count.toLocaleString()}</strong> people have signed so
                far.
              </p>
            )}
          </div>
        </div>
        <div className={styles.heroGlow} aria-hidden="true" />
      </section>

      {/* ----------------------------------------------------- COMMUNITY CAROUSEL */}
      <section className="section-tight">
        <div
          className="container stack"
          style={{
            textAlign: "center",
            maxWidth: "46ch",
            marginInline: "auto",
            marginBottom: "2.5rem",
          }}
        >
          <p className="eyebrow" style={{ textAlign: "center" }}>
            In real life
          </p>
          <h2>A real, global community</h2>
          <p className="muted">
            Not just an idea online — people learning, building, and staying
            human with AI together.
          </p>
        </div>
        <CommunityCarousel />
      </section>

      {/* ----------------------------------------------------------------- WHY */}
      <section id="why" className="section">
        <div className="container container-narrow stack-lg">
          <div className="stack">
            <p className="eyebrow">Why</p>
            <h2>Why does HumAIne exist?</h2>
          </div>
          <p className={styles.prompt}>
            When you imagine humanity in 2050, what do you see? Is it a future
            where humanity is flourishing? Or do you see humanity decaying?
          </p>
          <div className="stack" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
            <p>
              We&rsquo;re living through one of the fastest shifts in human
              history — and almost all of the buzz is about AI technology. How
              powerful it&rsquo;s getting. How fast. What it will replace.
              Adapting to AI keeps getting framed as a choice: embrace AI, or
              stay human. Move fast, or be careful.
            </p>
            <p className={styles.pullquote}>
              But underneath all of it is a quieter, more important question: how
              do we, as humans, fully embrace AI while flourishing human
              potential?
            </p>
            <p>
              HumAIne exists to answer that — not with fear, and not by slowing
              down, but by embracing AI fully and using it to become more human,
              not less. More thoughtful. More connected. To elevate human
              potential.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- WHAT */}
      <section id="what" className="section band-blue">
        <div className="container container-narrow stack-lg">
          <div className="stack">
            <p className="eyebrow">What</p>
            <h2>What is HumAIne?</h2>
          </div>
          <p className="lead">
            HumAIne is a global movement for people who refuse to choose between
            embracing AI and staying deeply human. They&rsquo;re part of the same
            goal.
          </p>
          <div className="stack" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
            <p>
              HumAIne serves as the centre of gravity for people who care about
              human flourishing with AI. It is a community to learn, exchange
              ideas, and practise Human-AI Synergy in your own way — open to all.
            </p>
            <p>
              At the heart of the movement is the{" "}
              <strong>HumAIne Manifesto</strong>. It establishes the values and
              principles for practising Human-AI Synergy.
            </p>
          </div>
          <div>
            <Link href="/manifesto" className="btn btn-primary btn-lg">
              Read the Manifesto
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ FOUNDING MEMBERS */}
      <section id="founding-members" className="section">
        <div className="container stack-lg">
          <div className="stack" style={{ textAlign: "center", maxWidth: "44ch", marginInline: "auto" }}>
            <p className="eyebrow" style={{ textAlign: "center" }}>
              The first to sign
            </p>
            <h2>Founding Members of HumAIne</h2>
            <p className="muted">
              The people who put their names to this movement first.
            </p>
          </div>
          <ul className={styles.members}>
            {FOUNDING_MEMBERS.map((name) => (
              <li key={name} className={styles.member}>
                <span className={styles.memberDot} aria-hidden="true" />
                {name}
              </li>
            ))}
          </ul>
          <div style={{ textAlign: "center" }}>
            <Link href="/manifesto#sign" className="btn btn-primary btn-lg">
              Sign the Manifesto
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- FOLLOW */}
      <section id="follow" className="section band-ink">
        <div className="container stack-lg">
          <div className="stack" style={{ maxWidth: "40ch" }}>
            <p className="eyebrow" style={{ color: "var(--accent)" }}>
              Follow the movement
            </p>
            <h2>Turn passive agreement into visible momentum.</h2>
            <p style={{ color: "oklch(0.85 0.02 350)", fontSize: "1.0625rem" }}>
              Join the community, share the manifesto, and help more people stay
              human with AI.
            </p>
          </div>

          <div className={styles.socials}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className={styles.social}
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className={styles.newsletter}>
            <div>
              <h3 style={{ color: "var(--paper)" }}>Sign up to the newsletter</h3>
              <p style={{ color: "oklch(0.78 0.02 350)", marginTop: 6 }}>
                Occasional updates from the movement. No noise.
              </p>
            </div>
            <NewsletterForm />
          </div>

          <div className={styles.resources}>
            <span className="chip">Coming soon</span>
            <span style={{ color: "oklch(0.8 0.02 350)" }}>
              A library of articles, podcasts &amp; resources on staying human
              with AI.
            </span>
            <button className="btn btn-light" disabled aria-disabled="true">
              Explore Resources
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
