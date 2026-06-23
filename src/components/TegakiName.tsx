"use client";

import { TegakiRenderer } from "tegaki/react";
import caveat from "tegaki/fonts/caveat";

/**
 * Animates a typed name into handwriting (stroke-by-stroke) using tegaki.
 * Loaded only on the client via next/dynamic — see SignatureReveal.
 */
export default function TegakiName({ text }: { text: string }) {
  return (
    <TegakiRenderer
      font={caveat}
      style={{
        fontSize: "clamp(2.75rem, 9vw, 4.5rem)",
        color: "var(--ink)",
        lineHeight: 1,
      }}
    >
      {text}
    </TegakiRenderer>
  );
}
