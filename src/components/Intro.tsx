import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { site } from '../data/site';
import { INTRO_OPEN, reducedMotion } from '../motion';
import { asset } from '../utils';
import { useLogoStatus } from './Logo';
import { hexPoints, Wing } from './Ornaments';

// Opening animation, shown once per browser-tab session (add ?intro to the address to replay it).
// Click or press any key to skip.
const HOLD_MS = 2800; // time on screen before the gates open
const EXIT_MS = 1100; // gate opening, then the overlay is removed
const SEEN_KEY = 'jaya-intro-seen';

// Sparks thrown out when the gates blow open: spread evenly by the golden angle, each flying a different distance.
const SPARKS = Array.from({ length: 36 }, (_, i) => ({
  '--a': `${(i * 137.5) % 360}deg`,
  '--k': (0.35 + ((i * 37) % 65) / 100).toFixed(2),
  animationDelay: `${(i % 6) * 25}ms`,
})) as CSSProperties[];

function shouldPlay(): boolean {
  if (reducedMotion()) return false;
  if (new URLSearchParams(window.location.search).has('intro')) return true;
  try {
    if (sessionStorage.getItem(SEEN_KEY)) return false;
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    // Storage blocked (private mode etc.): just play it.
  }
  return true;
}

const plays = shouldPlay();
// While this is set, the page's entrance animations (.rise*) wait, paused.
if (plays) document.documentElement.dataset.intro = 'on';

type Phase = 'in' | 'out' | 'gone';

/** Counts 0 → 100 with an ease-out over the hold time. */
function useProgress(done: boolean): number {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (done) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (HOLD_MS - 300));
      setN(Math.round((1 - (1 - p) ** 3) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [done]);
  return done ? 100 : n;
}

export function Intro() {
  const [phase, setPhase] = useState<Phase>(plays ? 'in' : 'gone');
  const hasLogo = useLogoStatus() !== 'missing';
  const progress = useProgress(phase !== 'in');

  useEffect(() => {
    const root = document.documentElement;
    if (phase === 'in') {
      root.style.overflow = 'hidden';
      const open = () => setPhase('out');
      const timer = setTimeout(open, HOLD_MS);
      window.addEventListener('keydown', open);
      window.addEventListener('pointerdown', open);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', open);
        window.removeEventListener('pointerdown', open);
      };
    }
    if (phase === 'out') {
      root.style.overflow = '';
      delete root.dataset.intro;
      window.dispatchEvent(new Event(INTRO_OPEN));
      const timer = setTimeout(() => setPhase('gone'), EXIT_MS);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  if (phase === 'gone') return null;

  return (
    <div aria-hidden="true" data-phase={phase} className="intro fixed inset-0 z-[100] cursor-pointer select-none overflow-hidden">
      {/* Two halves of the background that slide apart like gates */}
      <div className="intro-gate intro-gate-top">
        <div className="absolute inset-x-0 top-0 h-screen ornament-nebula" />
        <div className="ornament-stars absolute inset-x-0 top-0 h-screen" />
      </div>
      <div className="intro-gate intro-gate-bottom">
        <div className="absolute inset-x-0 bottom-0 h-screen ornament-nebula" />
        <div className="ornament-stars absolute inset-x-0 bottom-0 h-screen" />
      </div>
      <div className="intro-seam" />

      <div className="intro-stage absolute inset-0 flex flex-col items-center justify-center px-4">
        <div className="relative aspect-square w-[min(58vw,17rem)]">
          <div className="intro-rays absolute -inset-[70%]" />
          <svg viewBox="-110 -110 220 220" className="absolute -inset-[20%] h-[140%] w-[140%] overflow-visible">
            <polygon className="intro-draw" pathLength={1} points={hexPoints(100)} fill="none" stroke="#8fdfff" strokeWidth="1.6" />
            <polygon className="intro-draw [animation-delay:350ms]" pathLength={1} points={hexPoints(91)} fill="none" stroke="#8b6cf0" strokeWidth="0.8" opacity="0.7" />
          </svg>
          <svg viewBox="-110 -110 220 220" className="intro-ring absolute -inset-[8%] h-[116%] w-[116%]">
            <circle r="104" fill="none" stroke="#8fdfff" strokeWidth="0.8" strokeDasharray="2 10" opacity="0.6" />
            <circle r="104" fill="none" stroke="#8b6cf0" strokeWidth="2.4" strokeDasharray="50 276" />
          </svg>
          <div className="intro-pulse absolute inset-[6%] rounded-full border-2 border-cyan" />
          {hasLogo && <img src={asset(site.logo)} alt="" decoding="async" className="intro-logo relative h-full w-full object-contain" />}
        </div>

        <p className="mt-10 whitespace-nowrap font-display text-[clamp(2.75rem,12vw,5.5rem)] font-bold uppercase leading-none tracking-wide">
          {[...site.name].map((ch, i) => (
            <span key={i} className="intro-letter text-chrome" style={{ animationDelay: `${1050 + i * 55}ms` }}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </p>

        <p className="intro-label mt-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan">
          <Wing className="h-4 w-8" />
          {site.label}
          <Wing flip className="h-4 w-8" />
        </p>

        <div className="intro-loader mt-10 w-56 max-w-full">
          <div className="flex items-baseline justify-between font-display text-base uppercase leading-none tracking-[0.3em] text-mute">
            <span>Loading</span>
            <span className="tabular-nums tracking-normal text-cyan">{progress}%</span>
          </div>
          <div className="mt-2 h-[3px] overflow-hidden bg-line">
            <div className="h-full bg-gradient-to-r from-cyan via-blue to-violet shadow-[0_0_12px_rgba(143,223,255,0.8)]" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <p className="intro-hint absolute bottom-8 text-[11px] uppercase tracking-[0.3em] text-mute">Klik untuk lewati</p>
      </div>

      {/* The blast as the gates open (see .intro-boom in index.css) */}
      <div className="intro-boom absolute inset-0 flex items-center justify-center">
        <span className="intro-flash" />
        <span className="intro-shock" />
        <span className="intro-shock intro-shock-late" />
        {SPARKS.map((style, i) => (
          <i key={i} className="intro-spark" style={style} />
        ))}
      </div>
    </div>
  );
}
