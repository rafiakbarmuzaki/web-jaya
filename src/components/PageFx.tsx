import { useEffect, useRef } from 'react';
import { clamp, hasMouse, reducedMotion } from '../motion';

/** Soft light that follows the mouse, and a ring that rings out from every click. */
export function Aura() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || reducedMotion() || !hasMouse()) return;
    const glow = el.firstElementChild as HTMLElement;

    const move = (e: PointerEvent) => {
      glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      glow.dataset.on = '';
    };
    const ping = (e: PointerEvent) => {
      const ring = document.createElement('span');
      ring.className = 'click-ring';
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
      ring.addEventListener('animationend', () => ring.remove());
      el.append(ring);
    };
    const leave = () => delete glow.dataset.on;

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', ping);
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', ping);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <div className="aura" />
    </div>
  );
}

/** Thin gradient bar across the top that fills as you scroll down the page. */
export function ScrollBar() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? clamp(window.scrollY / max) : 0})`;
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
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-cyan via-blue to-violet shadow-[0_0_12px_rgba(143,223,255,0.8)]" />
    </div>
  );
}
