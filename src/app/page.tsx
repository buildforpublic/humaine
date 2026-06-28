import Link from "next/link";
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { BlurRevealSection } from "@/components/BlurRevealSection";
import { CommunityCarousel } from "@/components/CommunityCarousel";
import { NewsletterForm } from "@/components/NewsletterForm";
import { TextReveal } from "@/components/TextReveal";
import { FOUNDING_MEMBERS, SOCIALS, VALUES } from "@/content";
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
            <h1 className="display rise rise-2">
              Embrace AI
              <br className={styles.brk} />
              <span className={styles.heroLine}>Become more human</span>
            </h1>
            <p className="lead rise rise-3" style={{ maxWidth: "44ch" }}>
              A global movement for people embracing AI fully while deepening
              human agency, creativity, judgment, connection, and care.
            </p>
            <div className={`${styles.heroCtas} rise rise-4`}>
              <Link href="/manifesto" className="btn btn-primary btn-lg">
                Read the Manifesto
              </Link>
              <a href="#follow" className="btn btn-secondary btn-lg">
                Join the Movement
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
        <img
          className={styles.heroThumbprint}
          src="/thumbprint.svg"
          alt=""
          aria-hidden="true"
        />
      </section>

      {/* ------------------------------------------------------- FALSE CHOICE */}
      <BlurRevealSection className="section-tight">
        <div className="container">
          <div className={styles.binary}>
            <p>Using AI shouldn&rsquo;t make people less human.</p>
            <div className={styles.binaryLine} aria-label="Embrace AI and stay human">
              <span>Embrace AI</span>
              <span className={styles.binaryOr}>or</span>
              <span>Stay Human</span>
              <strong>and</strong>
            </div>
            <p>How we approach AI determines whether AI elevates lives or ruins lives.</p>
          </div>
        </div>
      </BlurRevealSection>

      {/* ----------------------------------------------------------------- WHY */}
      <BlurRevealSection id="why" className={`section ${styles.whySection}`}>
        <div className={`container ${styles.revealBlock}`}>
          <TextReveal
            lines={[
              {
                text: "We refuse the false choice.",
              },
              {
                text: "Adapting to AI keeps getting framed as a choice: embrace AI, or stay human.",
              },
              {
                text: "We believe embracing AI and staying deeply human are part of the same goal: to elevate human potential and build a progressive humanity.",
              },
              {
                text: "How do we fully embrace AI while flourishing human potential?",
                emphasis: true,
              },
              {
                text: "Not with fear, and not by slowing down, but by embracing AI fully and using it to become more human, more thoughtful, more connected.",
              },
            ]}
          />
        </div>
      </BlurRevealSection>

      {/* ---------------------------------------------------------------- WHAT */}
      <BlurRevealSection id="what" className="section band-cream">
        <div className="container container-narrow stack-lg">
          <div className="stack">
            <h2>A centre of gravity for human flourishing with AI.</h2>
          </div>
          <p className="lead">
            Grassroot initiatives and independent voices are emerging all over
            the world.
          </p>
          <div className="stack" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
            <p>
              HumAIne aims to unite them into a community to learn, exchange
              ideas and practise Human-AI Synergy, rooted in the values and
              principles of the HumAIne Manifesto.
            </p>
            <p>
              However you want to stay human with AI, there&rsquo;s a place for
              you.
            </p>
          </div>
        </div>
      </BlurRevealSection>

      {/* ------------------------------------------------------------- VALUES */}
      <BlurRevealSection className="section">
        <div className="container stack-lg">
          <div className="stack" style={{ maxWidth: "46ch" }}>
            <h2>Four values we choose to live by.</h2>
          </div>
          <ul className={styles.valuesPreview}>
            {VALUES.map((value) => (
              <li
                key={value.left}
                className={`${styles.valuePreview} ${styles[value.color]}`}
              >
                <span>{value.left}</span>
                <span>{value.right}</span>
              </li>
            ))}
          </ul>
          <Link href="/manifesto" className="btn btn-primary btn-lg">
            Read the full Manifesto
          </Link>
        </div>
      </BlurRevealSection>

      {/* ------------------------------------------------------ FOUNDING MEMBERS */}
      <BlurRevealSection id="founding-members" className="section">
        <div className="container stack-lg">
          <div className="stack" style={{ textAlign: "center", maxWidth: "44ch", marginInline: "auto" }}>
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
      </BlurRevealSection>

      {/* -------------------------------------------------------------- FOLLOW */}
      <BlurRevealSection id="follow" className="section band-ink">
        <div className="container stack-lg">
          <div className="stack" style={{ maxWidth: "40ch" }}>
            <h2>Many sparks together can start a fire.</h2>
            <p style={{ color: "rgb(244 241 234 / 0.82)", fontSize: "1.0625rem" }}>
              Sign the manifesto, stay in the loop, or follow the movement on
              social.
            </p>
          </div>

          <div className={styles.joinGrid}>
            <div className={styles.joinCard}>
              <h3>Sign the Manifesto</h3>
              <p>Put your name to the movement and join the first wave.</p>
              <Link href="/manifesto#sign" className="btn btn-light">
                Sign Now
              </Link>
            </div>

            <div className={styles.joinCard}>
              <h3>Subscribe to the newsletter</h3>
              <p>Stay in the loop with updates from the movement.</p>
              <NewsletterForm />
            </div>

            <div className={styles.joinCard}>
              <h3>Be an active member</h3>
              <p>Join future forums, offline events, or contribute as a volunteer.</p>
              <div className={styles.socials}>
                {SOCIALS.filter((s) => s.label !== "TikTok").map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.social}
                  >
                    {s.label === "LinkedIn" && <FaLinkedinIn aria-hidden="true" />}
                    {s.label === "Instagram" && <FaInstagram aria-hidden="true" />}
                    {s.label === "WhatsApp Community" && (
                      <FaWhatsapp aria-hidden="true" />
                    )}
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BlurRevealSection>

      {/* ----------------------------------------------------- COMMUNITY PHOTOS */}
      <BlurRevealSection className="section-tight">
        <div
          className="container stack"
          style={{
            textAlign: "center",
            maxWidth: "46ch",
            marginInline: "auto",
            marginBottom: "2.5rem",
          }}
        >
          <h2>A real, global community</h2>
          <p className="muted">
            People learning, building, and staying human with AI together.
          </p>
          </div>
        <CommunityCarousel />
      </BlurRevealSection>
    </>
  );
}
