import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { clamp, hasMouse, reducedMotion } from '../motion';
import { cn } from '../utils';

/**
 * 3D scene that turns to face the mouse, with a glare that follows it. Children can sit at
 * different depths (e.g. `[transform:translateZ(40px)]`). It also floats gently, which is all
 * touch screens get. `className` goes on the rotating body.
 */
export function Tilt({ className, children }: { className?: string; children: ReactNode }) {
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scene.current;
    if (!el || reducedMotion() || !hasMouse()) return;
    let tx = 0; // where the pointer is, relative to the scene: -1 … 1
    let ty = 0;
    let x = 0; // eased towards it
    let y = 0;
    let raf = 0;

    const frame = () => {
      x += (tx - x) * 0.1;
      y += (ty - y) * 0.1;
      el.style.setProperty('--rx', `${(-y * 11).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`);
      el.style.setProperty('--gx', `${(50 + x * 40).toFixed(1)}%`);
      el.style.setProperty('--gy', `${(40 + y * 40).toFixed(1)}%`);
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.002 ? requestAnimationFrame(frame) : 0;
    };
    const aim = (nx: number, ny: number) => {
      tx = nx;
      ty = ny;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const box = el.getBoundingClientRect();
      el.dataset.on = '';
      aim(clamp((e.clientX - box.left - box.width / 2) / (window.innerWidth / 2), -1, 1), clamp((e.clientY - box.top - box.height / 2) / (window.innerHeight / 2), -1, 1));
    };
    const leave = () => aim(0, 0);

    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <div ref={scene} className="tilt">
      <div className={cn('tilt-body', className)}>{children}</div>
    </div>
  );
}
