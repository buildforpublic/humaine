"use client";

import { useEffect, useCallback } from "react";
import styles from "./particles-bg.module.css";

/**
 * ParticlesComponent
 * ------------------
 * Full-bleed animated particle field rendered on a <canvas> via particles.js
 * (loaded from CDN). Designed to sit behind hero content as a background layer.
 *
 * The original 21st.dev component was Tailwind + dark-mode aware. This project
 * has no Tailwind and is light-only (warm "parchment" brand), so the styling
 * lives in particles-bg.module.css and the particle colours are tuned to the
 * HumAIne palette (terracotta / amber) instead of the stock blue.
 */
export default function ParticlesComponent() {
  const initParticles = useCallback(() => {
    // cleanup old canvas
    const oldCanvas = document.querySelector("#particles-js canvas");
    if (oldCanvas) oldCanvas.remove();

    // @ts-ignore
    if (window.pJSDom?.length > 0) {
      // @ts-ignore
      window.pJSDom.forEach((p) => p.pJS.fn.vendors.destroypJS());
      // @ts-ignore
      window.pJSDom = [];
    }

    // Brand palette (globals.css): terracotta #a35c44, amber #e6a532, moss #2d5a27
    const colors = {
      particles: "#a35c44",
      lines: "#c07d4f",
      accent: "#e6a532",
    };

    // @ts-ignore
    window.particlesJS("particles-js", {
      particles: {
        number: { value: 90, density: { enable: true, value_area: 800 } },
        color: { value: colors.particles },
        shape: { type: "circle", stroke: { width: 0.5, color: colors.accent } },
        opacity: {
          value: 0.4,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.15 },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: true, speed: 2, size_min: 1 },
        },
        line_linked: {
          enable: true,
          distance: 160,
          color: colors.lines,
          opacity: 0.28,
          width: 1,
        },
        move: { enable: true, speed: 1.6, random: true, out_mode: "bounce" },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 200, line_linked: { opacity: 0.6 } },
          push: { particles_nb: 4 },
          repulse: { distance: 180, duration: 0.4 },
        },
      },
      retina_detect: true,
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      initParticles();
    };

    return () => {
      // @ts-ignore
      if (window.pJSDom?.length > 0) {
        // @ts-ignore
        window.pJSDom.forEach((p) => p.pJS.fn.vendors.destroypJS());
        // @ts-ignore
        window.pJSDom = [];
      }
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [initParticles]);

  return <div id="particles-js" className={styles.particles} aria-hidden="true" />;
}
