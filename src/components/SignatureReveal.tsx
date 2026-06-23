"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { StrokeData } from "./SignaturePadField";
import styles from "./SignatureReveal.module.css";

/** Caveat-font fallback: the name "writes" in via a left-to-right clip wipe. */
function ScriptName({ text }: { text: string }) {
  return <span className={styles.scriptName}>{text}</span>;
}

// tegaki is client-only and code-split. While it loads (or if it fails to
// load), we show the Caveat-font handwriting so there's always a result.
const TegakiName = dynamic(() => import("./TegakiName"), {
  ssr: false,
  loading: () => null,
});

/** Catches any runtime error from tegaki and falls back to the script font. */
class TegakiBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function toPath(points: [number, number][]): string {
  if (points.length === 0) return "";
  if (points.length === 1) {
    // a tap — draw a tiny dot so it isn't invisible
    const [x, y] = points[0];
    return `M ${x} ${y} l 0.1 0`;
  }
  return "M " + points.map((p) => `${p[0]} ${p[1]}`).join(" L ");
}

/** Replays the captured signature stroke-by-stroke, following the pen path. */
function SignatureStrokes({ data }: { data: StrokeData }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const paths = ref.current?.querySelectorAll("path");
    if (!paths) return;
    let delay = 0;
    paths.forEach((path) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
      const dur = Math.min(1100, Math.max(220, len * 3.2));
      path.animate(
        [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
        {
          duration: dur,
          delay,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        },
      );
      delay += dur + 90;
    });
  }, []);

  const { w, h, strokes } = data;
  const strokeWidth = Math.max(2.4, Math.round(Math.min(w, h) * 0.018 * 10) / 10);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${w} ${h}`}
      className={styles.strokesSvg}
      role="img"
      aria-label="Your signature"
    >
      {strokes.map((s, i) => (
        <path
          key={i}
          d={toPath(s)}
          fill="none"
          stroke="var(--ink)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

export function SignatureReveal({
  name,
  signature,
  strokes,
  message,
}: {
  name: string;
  signature: string;
  strokes?: StrokeData | null;
  message: string;
}) {
  const firstName = name.trim().split(/\s+/)[0] || "friend";
  const hasStrokes = !!strokes && strokes.strokes.length > 0;

  return (
    <div className={styles.card} role="status">
      <p className={styles.kicker}>Signed ✦</p>

      <div className={styles.stage}>
        {hasStrokes ? (
          // Replay the drawn signature stroke-by-stroke.
          <SignatureStrokes data={strokes!} />
        ) : signature ? (
          // Drawn but strokes weren't captured — static image fallback.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={signature} alt={`${name}'s signature`} className={styles.drawn} />
        ) : (
          // No drawing — the typed name becomes the handwritten signature.
          <TegakiBoundary fallback={<ScriptName text={name} />}>
            <TegakiName text={name} />
          </TegakiBoundary>
        )}
      </div>

      <h3 className={styles.title}>
        You&rsquo;ve signed the HumAIne Manifesto.
      </h3>
      <p className={styles.body}>
        Welcome to the movement, {firstName}. {message}
      </p>
    </div>
  );
}
