"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./FoundingTeam.module.css";

export type TeamCard = {
  name: string;
  domain: string;
  oneLiner: string;
  slug: string;
  photo?: string;
  accent: string;
};

/** First letters of the first two name words, skipping honorifics. */
function monogram(name: string): string {
  const skip = new Set(["dr", "prof", "dato'", "dato", "datuk", "tan", "sri"]);
  const words = name
    .split(/\s+/)
    .filter((w) => !skip.has(w.toLowerCase().replace(/[.]/g, "")));
  const initials = words.slice(0, 2).map((w) => w[0] ?? "");
  return initials.join("").toUpperCase();
}

function Card({ member, index }: { member: TeamCard; index: number }) {
  return (
    <li
      className={styles.card}
      data-accent={member.accent}
      style={{ ["--i" as string]: index }}
    >
      <div className={styles.head}>
        <div className={styles.avatar}>
          {member.photo ? (
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="72px"
              className={styles.photo}
            />
          ) : (
            <span className={styles.monogram} aria-hidden="true">
              {monogram(member.name)}
            </span>
          )}
        </div>
        <div className={styles.meta}>
          <h3 className={styles.name}>{member.name}</h3>
          <span className={styles.tag}>{member.domain}</span>
        </div>
      </div>
      <p className={styles.bio}>{member.oneLiner}</p>
    </li>
  );
}

/**
 * Renders the founding-member cards and plays a one-by-one entrance when the
 * grid scrolls into view.
 *
 * Robustness: cards are visible by default (no `data-anim`), so if JavaScript
 * or the observer never runs the section still shows. On mount we "arm" the
 * grid (hide the cards) and reveal them either when the grid intersects the
 * viewport or after a short fallback timeout — so they can never get stuck
 * hidden the way a single whole-section reveal could.
 */
export function FoundingTeamGrid({ members }: { members: TeamCard[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const [anim, setAnim] = useState<"idle" | "armed" | "in">("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return; // leave cards visible, no animation

    // Arm: hide the cards, then reveal on scroll-in or fallback.
    setAnim("armed");
    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setAnim("in");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) reveal();
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);

    // Safety net: never leave the cards hidden.
    const timer = window.setTimeout(reveal, 1500);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <ul ref={ref} className={styles.grid} data-anim={anim}>
      {members.map((member, i) => (
        <Card key={member.slug} member={member} index={i} />
      ))}
    </ul>
  );
}
