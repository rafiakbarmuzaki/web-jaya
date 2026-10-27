import { useEffect, useRef, useState } from 'react';
import { reducedMotion, whenSeen } from '../motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+<>/';
const SWAP_MS = 45; // how often the noise changes
const LOCK_STEP_MS = 55; // gap between one letter locking in and the next
const NOISE_MS = 450; // how long the first letter flickers before it locks

/**
 * Text that decodes from random glyphs into `text` once it's on screen (and the intro is gone).
 * The real text stays in the page the whole time, so layout and screen readers aren't affected.
 */
export function Scramble({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  // '' = waiting to start, a string = the noise being shown, null = finished (show the real text)
  const [noise, setNoise] = useState<string | null>(reducedMotion() ? null : '');

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    let raf = 0;
    const chars = [...text];
    const end = (chars.length - 1) * LOCK_STEP_MS + NOISE_MS;
    const stop = whenSeen(el, () => {
      const start = performance.now() + delay;
      let step = -1;
      const tick = (now: number) => {
        const t = now - start;
        if (t >= end) return setNoise(null);
        if (t >= 0 && Math.floor(t / SWAP_MS) !== step) {
          step = Math.floor(t / SWAP_MS);
          setNoise(chars.map((ch, i) => (ch === ' ' || t >= i * LOCK_STEP_MS + NOISE_MS ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join(''));
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    return () => {
      stop();
      cancelAnimationFrame(raf);
    };
  }, [text, delay]);

  return (
    <span ref={ref} className="relative inline-block">
      <span className={noise === null ? undefined : 'opacity-0'}>{text}</span>
      {noise !== null && (
        <span aria-hidden="true" className="absolute inset-0 whitespace-nowrap">
          {noise}
        </span>
      )}
    </span>
  );
}
