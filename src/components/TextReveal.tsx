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
    let previousActive = "";

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
      const nearestWord = wordMetrics.reduce<{
        center: number;
        distance: number;
      } | null>((nearest, word) => {
        const distance = Math.abs(word.center - focusY);
        if (!nearest || distance < nearest.distance) {
          return { center: word.center, distance };
        }
        return nearest;
      }, null);
      const maxFocusDistance = Math.min(160, Math.max(96, viewport * 0.18));
      const lineTolerance = 6;

      const nextActive =
        nearestWord && nearestWord.distance <= maxFocusDistance
          ? wordMetrics
              .filter(
                (word) =>
                  Math.abs(word.center - nearestWord.center) <= lineTolerance,
              )
              .map((word) => word.index)
          : [];

      const activeKey = nextActive.join(",");
      if (activeKey !== previousActive) {
        previousActive = activeKey;
        setActiveWordIndexes(nextActive);
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
