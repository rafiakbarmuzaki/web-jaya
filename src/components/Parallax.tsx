import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { reducedMotion } from '../motion';

/**
 * Drifts its content up or down as it crosses the screen: `amp` is how many px it travels
 * at the top/bottom edge (negative lags behind the page). `className` positions the wrapper.
 */
export function Parallax({ amp, className, children }: { amp: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const { top, height } = el.getBoundingClientRect();
      // -1 … 1 from the top to the bottom edge of the screen. Only the child moves, so this stays steady.
      el.style.setProperty('--p', ((top + height / 2 - window.innerHeight / 2) / window.innerHeight).toFixed(3));
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ '--amp': `${amp}px` } as CSSProperties}>
      <div className="parallax">{children}</div>
    </div>
  );
}
