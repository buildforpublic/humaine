"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./TextReveal.module.css";

type RevealLine = {
  text: string;
  emphasis?: boolean;
};

export function TextReveal({ lines }: { lines: RevealLine[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [activeWordIndexes, setActiveWordIndexes] = useState<number[]>([]);

  const words = useMemo(
    () => {
      let index = 0;

      return lines.flatMap((line, lineIndex) =>
        line.text.split(" ").map((word, wordIndex) => ({
          word,
          emphasis: Boolean(line.emphasis),
          key: `${lineIndex}-${wordIndex}-${word}`,
          lineIndex,
          index: index++,
        })),
      );
    },
    [lines],
  );

  useEffect(() => {
    let frame = 0;
    let revealedThrough = -1;

    const update = () => {
      const el = ref.current;
      if (!el) return;

      const wordNodes = Array.from(
        el.querySelectorAll<HTMLElement>("[data-reveal-word]"),
      );
      const viewport = window.innerHeight || 1;
      const navBottom =
        document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
      const focusY = navBottom + (viewport - navBottom) * 0.5;
      const wordMetrics = wordNodes
        .map((node) => {
          const rect = node.getBoundingClientRect();
          const index = Number(node.dataset.revealWord);
          return {
            index,
            center: rect.top + rect.height / 2,
          };
        })
        .filter((word) => Number.isFinite(word.index));

      // The highest word index whose center has reached (scrolled up to) the
      // focus line. Words fill top-to-bottom in reading order, so index order
      // matches vertical order.
      const passedThreshold = wordMetrics.reduce(
        (max, word) => (word.center <= focusY ? Math.max(max, word.index) : max),
        -1,
      );

      // Cumulative: once revealed, stay revealed even when scrolling back up.
      if (passedThreshold > revealedThrough) {
        revealedThrough = passedThreshold;
        setActiveWordIndexes(
          Array.from({ length: revealedThrough + 1 }, (_, i) => i),
        );
      }
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

  const activeWords = new Set(activeWordIndexes);
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
                data-reveal-word={item.index}
                className={`${styles.word} ${
                  activeWords.has(startOffset + index) ? styles.active : ""
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
