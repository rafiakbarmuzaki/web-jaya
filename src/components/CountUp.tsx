import { useEffect, useRef, useState } from 'react';
import { reducedMotion, whenSeen } from '../motion';

const DURATION_MS = 1500;

/** A number that counts up from 0 to `to` when it scrolls into view. */
export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(reducedMotion() ? to : 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      setN(to);
      return;
    }
    let raf = 0;
    const stop = whenSeen(el, () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / DURATION_MS);
        setN(Math.round((1 - 2 ** (-10 * p)) * to));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    return () => {
      stop();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  );
}
