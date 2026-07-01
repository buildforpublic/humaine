"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./BlurRevealSection.module.css";

type BlurRevealSectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function BlurRevealSection({
  id,
  className = "",
  children,
}: BlurRevealSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -14% 0px",
        threshold: 0.12,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`${className} ${styles.reveal} ${
        isVisible ? styles.visible : ""
      }`}
    >
      {children}
    </section>
  );
}
