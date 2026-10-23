import { useId } from 'react';
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
          <stop offset="0" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#2fd3ff" />
        </linearGradient>
      </defs>
      {feathers.map((d, i) => (
        <path key={i} d={d} fill={`url(#${id})`} opacity={1 - i * 0.14} />
      ))}
    </svg>
  );
}

/** Circuit traces like the ones inside the logo's shield. Uses currentColor. */
export function Circuit({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 220 140" fill="none" className={cn('pointer-events-none', className)}>
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M0 24h90l20 20h70" />
        <path d="M0 60h60l24 24h96" />
        <path d="M0 98h100l18-18h40" />
        <path d="M0 126h70" />
      </g>
      <g fill="currentColor">
        <circle cx="184" cy="44" r="3.5" />
        <circle cx="184" cy="84" r="3.5" />
        <circle cx="162" cy="80" r="3.5" />
        <circle cx="74" cy="126" r="3.5" />
      </g>
    </svg>
  );
}

/** Hexagon frame + slowly rotating dashed ring, placed behind the logo. */
export function HexFrame({ className }: { className?: string }) {
  const id = svgId(useId());
  const hex = (r: number) =>
    [-90, -30, 30, 90, 150, 210].map((a) => `${(r * Math.cos((a * Math.PI) / 180)).toFixed(1)},${(r * Math.sin((a * Math.PI) / 180)).toFixed(1)}`).join(' ');
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute', className)}>
      <svg viewBox="-110 -110 220 220" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2fd3ff" />
            <stop offset="1" stopColor="#7c5cff" />
          </linearGradient>
        </defs>
        <polygon points={hex(100)} fill="none" stroke={`url(#${id})`} strokeWidth="1.2" opacity="0.7" />
        <polygon points={hex(92)} fill="none" stroke="#4d86ff" strokeWidth="0.6" opacity="0.35" />
      </svg>
      <svg viewBox="-110 -110 220 220" className="spin-slow absolute inset-[6%] h-[88%] w-[88%]">
        <circle r="104" fill="none" stroke="#2fd3ff" strokeWidth="0.8" strokeDasharray="2 10" opacity="0.6" />
        <circle r="104" fill="none" stroke="#7c5cff" strokeWidth="2" strokeDasharray="40 286" opacity="0.8" />
      </svg>
    </div>
  );
}

/** Scrolling ticker band. Words are repeated so the loop is seamless. */
export function Ticker({ words }: { words: string[] }) {
  const row = (key: number) => (
    <ul key={key} className="flex shrink-0 items-center">
      {words.map((word, i) => (
        <li key={i} className="flex items-center gap-6 px-6 font-display text-base uppercase tracking-[0.15em] text-white/85">
          {word}
          <span className="hex h-3 w-3 bg-gradient-to-br from-cyan to-violet" />
        </li>
      ))}
    </ul>
  );
  return (
    <div aria-hidden="true" className="relative overflow-hidden border-y border-line bg-night py-3.5">
      <div className="marquee flex w-max">{[0, 1, 2, 3].map(row)}</div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-night to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-night to-transparent" />
    </div>
  );
}
