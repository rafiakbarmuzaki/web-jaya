import { useEffect, useId, useRef } from 'react';
import type { CSSProperties } from 'react';
import { clamp, reducedMotion } from '../motion';
import { cn } from '../utils';

const svgId = (id: string) => id.replace(/:/g, '');

/** HUD-style corner brackets around the parent (parent must be `relative`). */
export function Brackets({ className }: { className?: string }) {
  const base = 'absolute h-6 w-6 border-cyan/70';
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute', className ?? 'inset-0')}>
      <span className={cn(base, 'left-0 top-0 border-l-2 border-t-2')} />
      <span className={cn(base, 'right-0 top-0 border-r-2 border-t-2')} />
      <span className={cn(base, 'bottom-0 left-0 border-b-2 border-l-2')} />
      <span className={cn(base, 'bottom-0 right-0 border-b-2 border-r-2')} />
    </div>
  );
}

/** Feathered wing (blue → violet) echoing the logo. Points left; `flip` points right. */
export function Wing({ className, flip }: { className?: string; flip?: boolean }) {
  const id = svgId(useId());
  const feathers = [0, 1, 2, 3, 4].map((i) => {
    const baseY = 8 + i * 9;
    const tipX = 4 + i * 15;
    const tipY = 3 + i * 11;
    const midX = (118 + tipX) / 2;
    return `M118 ${baseY} Q ${midX} ${tipY - 3} ${tipX} ${tipY} Q ${midX + 8} ${tipY + 8} 118 ${baseY + 7} Z`;
  });
  return (
    <svg aria-hidden="true" viewBox="0 0 120 64" className={cn('shrink-0', flip && '-scale-x-100', className)}>
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor="#8b6cf0" />
          <stop offset="1" stopColor="#8fdfff" />
        </linearGradient>
      </defs>
      {/* A ripple of light runs down the feathers (.feather in index.css) */}
      {feathers.map((d, i) => (
        <path key={i} d={d} fill={`url(#${id})`} opacity={1 - i * 0.14} className="feather" style={{ '--o': 1 - i * 0.14, animationDelay: `${i * 0.18}s` } as CSSProperties} />
      ))}
    </svg>
  );
}

const TRACES = ['M0 24h90l20 20h70', 'M0 60h60l24 24h96', 'M0 98h100l18-18h40', 'M0 126h70'];
const NODES = [
  [184, 44],
  [184, 84],
  [162, 80],
  [74, 126],
];

/** Circuit traces like the ones inside the logo's shield, with data packets running along them. Uses currentColor. */
export function Circuit({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 220 140" fill="none" className={cn('pointer-events-none', className)}>
      <g stroke="currentColor" strokeWidth="1.5">
        {TRACES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g stroke="#8fdfff" strokeWidth="2.5" strokeLinecap="round">
        {TRACES.map((d, i) => (
          <path key={d} d={d} pathLength={100} className="circuit-pulse" style={{ animationDelay: `${i * 0.9}s` }} />
        ))}
      </g>
      <g fill="currentColor">
        {NODES.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" />
        ))}
      </g>
      <g stroke="#8fdfff" strokeWidth="1">
        {NODES.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" className="circuit-ping" style={{ animationDelay: `${i * 0.7}s` }} />
        ))}
      </g>
    </svg>
  );
}

/** Points of a pointy-top hexagon of radius `r` centred on 0,0 (for an SVG polygon). */
export const hexPoints = (r: number) =>
  [-90, -30, 30, 90, 150, 210].map((a) => `${(r * Math.cos((a * Math.PI) / 180)).toFixed(1)},${(r * Math.sin((a * Math.PI) / 180)).toFixed(1)}`).join(' ');

/** Hexagon frame + slowly rotating dashed ring with two glowing satellites, placed behind the logo. */
export function HexFrame({ className }: { className?: string }) {
  const id = svgId(useId());
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute', className)}>
      <svg viewBox="-110 -110 220 220" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8fdfff" />
            <stop offset="1" stopColor="#8b6cf0" />
          </linearGradient>
        </defs>
        <polygon points={hexPoints(100)} fill="none" stroke={`url(#${id})`} strokeWidth="1.2" opacity="0.7" />
        <polygon points={hexPoints(92)} fill="none" stroke="#5f82e0" strokeWidth="0.6" opacity="0.35" />
      </svg>
      <svg viewBox="-110 -110 220 220" className="spin-slow absolute inset-[6%] h-[88%] w-[88%]">
        <circle r="104" fill="none" stroke="#8fdfff" strokeWidth="0.8" strokeDasharray="2 10" opacity="0.6" />
        <circle r="104" fill="none" stroke="#8b6cf0" strokeWidth="2" strokeDasharray="40 286" opacity="0.8" />
      </svg>
      <div className="orbit absolute inset-[6%]" />
      <div className="orbit orbit-outer absolute -inset-[6%]" />
    </div>
  );
}

const TICKER_ROWS = 6; // copies of the words: enough to fill an ultrawide screen while one row slides out
const IDLE_SPEED = 70; // px/s while the page is still

/**
 * Scrolling ticker band. It rides the page's scroll: it speeds up and leans into the motion while
 * you scroll, and turns around when you scroll back up. Words are repeated so the loop is seamless.
 */
export function Ticker({ words }: { words: string[] }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || reducedMotion()) return;
    const band = el.parentElement as HTMLElement;
    const first = el.firstElementChild as HTMLElement; // every row is identical, so sliding by one row loops seamlessly
    let rowWidth = first.offsetWidth;
    const resized = new ResizeObserver(() => (rowWidth = first.offsetWidth));
    resized.observe(first);

    let x = 0;
    let speed = IDLE_SPEED; // px/s, + moves left; eased so turning around brakes smoothly
    let dir = 1; // follows the last scroll direction
    let flow = 0; // scroll velocity in px/s, smoothed
    let skew = 0;
    let lastY = window.scrollY;
    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = clamp((now - last) / 1000, 0, 0.05);
      last = now;
      if (!dt) return;
      const y = window.scrollY;
      flow += ((y - lastY) / dt - flow) * Math.min(1, dt * 10);
      lastY = y;
      if (Math.abs(flow) > 30) dir = Math.sign(flow);
      speed += (dir * (IDLE_SPEED + Math.min(Math.abs(flow), 3000) * 0.4) - speed) * Math.min(1, dt * 4);
      skew += (clamp(flow / -100, -12, 12) - skew) * Math.min(1, dt * 8);
      x = (((x - speed * dt) % rowWidth) - rowWidth) % rowWidth; // keep it within one row
      el.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0) skewX(${skew.toFixed(2)}deg)`;
    };

    // Only run while the band is on screen.
    const watch = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (!entry.isIntersecting) return;
      last = performance.now();
      lastY = window.scrollY;
      raf = requestAnimationFrame(tick);
    });
    watch.observe(band);

    return () => {
      cancelAnimationFrame(raf);
      watch.disconnect();
      resized.disconnect();
    };
  }, []);

  return (
    <div aria-hidden="true" className="relative overflow-hidden border-y border-line bg-night py-3.5">
      <div ref={track} className="flex w-max will-change-transform">
        {Array.from({ length: TICKER_ROWS }, (_, key) => (
          <ul key={key} className="flex shrink-0 items-center">
            {words.map((word, i) => (
              <li key={i} className="flex items-center gap-6 px-6 font-display text-xl uppercase tracking-[0.15em] text-white/85">
                {word}
                <span className="hex h-3 w-3 bg-gradient-to-br from-cyan to-violet" />
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-night to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-night to-transparent" />
    </div>
  );
}
