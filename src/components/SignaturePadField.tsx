"use client";

import { useEffect, useRef } from "react";
import {
  SignaturePad,
  type SignaturePadDrawEndDetails,
} from "@ark-ui/react/signature-pad";
import styles from "./SignaturePadField.module.css";

/** Raw captured strokes, used to replay the signature stroke-by-stroke. */
export type StrokeData = {
  w: number;
  h: number;
  strokes: [number, number][][];
};

/**
 * Headless Ark UI signature pad, styled with the HumAIne design tokens.
 * - Exports the drawing as an SVG data URL (for storage / the wall).
 * - Separately records the raw pen strokes (order + points) so the success
 *   screen can replay the signature stroke-by-stroke.
 */
export function SignaturePadField({
  value,
  onChange,
  onStrokes,
}: {
  value: string;
  onChange: (dataUrl: string) => void;
  onStrokes: (data: StrokeData | null) => void;
}) {
  const controlRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<StrokeData>({ w: 0, h: 0, strokes: [] });

  // Capture raw strokes with a native pointer listener so it composes with
  // Ark UI's own drawing handlers instead of overriding them.
  useEffect(() => {
    const el = controlRef.current;
    if (!el) return;

    const onDown = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      dataRef.current.w = Math.round(rect.width);
      dataRef.current.h = Math.round(rect.height);
      const cur: [number, number][] = [
        [+(e.clientX - rect.left).toFixed(1), +(e.clientY - rect.top).toFixed(1)],
      ];
      dataRef.current.strokes.push(cur);

      const onMove = (ev: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const p: [number, number] = [
          +(ev.clientX - r.left).toFixed(1),
          +(ev.clientY - r.top).toFixed(1),
        ];
        const last = cur[cur.length - 1];
        if (Math.hypot(p[0] - last[0], p[1] - last[1]) >= 2) cur.push(p);
      };
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        onStrokes({
          w: dataRef.current.w,
          h: dataRef.current.h,
          strokes: dataRef.current.strokes.map((s) => s.slice()),
        });
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    };

    el.addEventListener("pointerdown", onDown);
    return () => el.removeEventListener("pointerdown", onDown);
  }, [onStrokes]);

  const handleDrawEnd = (details: SignaturePadDrawEndDetails) => {
    details.getDataUrl("image/svg+xml").then(onChange);
  };

  const handleClear = () => {
    dataRef.current = { w: 0, h: 0, strokes: [] };
    onChange("");
    onStrokes(null);
  };

  return (
    <SignaturePad.Root
      className={styles.root}
      onDrawEnd={handleDrawEnd}
      drawing={{ size: 2.4, simulatePressure: true }}
    >
      <div className={styles.head}>
        <SignaturePad.Label className={styles.label}>
          Your signature <span className="hint">(optional)</span>
        </SignaturePad.Label>
        <SignaturePad.ClearTrigger className={styles.clear} onClick={handleClear}>
          Clear
        </SignaturePad.ClearTrigger>
      </div>

      <SignaturePad.Control ref={controlRef} className={styles.control}>
        <SignaturePad.Segment className={styles.segment} />
        <SignaturePad.Guide className={styles.guide} />
        {!value && <span className={styles.placeholder}>Sign here</span>}
      </SignaturePad.Control>

      <p className={styles.caption}>
        Draw your signature above — or leave it blank and we&rsquo;ll sign with
        your name in handwriting.
      </p>
    </SignaturePad.Root>
  );
}
