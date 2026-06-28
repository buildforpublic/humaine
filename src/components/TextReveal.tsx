"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./TextReveal.module.css";

type RevealLine = {
  text: string;
  emphasis?: boolean;
};

export function TextReveal({ lines }: { lines: RevealLine[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const words = useMemo(
    () =>
      lines.flatMap((line, lineIndex) =>
        line.text.split(" ").map((word, wordIndex, lineWords) => ({
          word,
          emphasis: Boolean(line.emphasis),
          key: `${lineIndex}-${wordIndex}-${word}`,
          lineIndex,
        })),
      ),
    [lines],
  );

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const start = viewport * 0.62;
      const end = viewport * 0.32;
      const next = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      setProgress(next);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const activeWords = Math.ceil(progress * words.length);
  let wordOffset = 0;

  return (
    <div ref={ref} className={styles.reveal}>
      {lines.map((line, lineIndex) => {
        const lineWords = words.filter((word) => word.lineIndex === lineIndex);
        const startOffset = wordOffset;
        wordOffset += lineWords.length;

        return (
          <p
            key={line.text}
            className={`${styles.line} ${line.emphasis ? styles.emphasis : ""}`}
          >
            {lineWords.map((item, index) => (
              <span
                key={item.key}
                className={`${styles.word} ${
                  startOffset + index < activeWords ? styles.active : ""
                }`}
              >
                {item.word}
                {index < lineWords.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
