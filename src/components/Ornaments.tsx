import { cn } from '../utils';

/** HUD-style corner brackets around the parent (parent must be `relative`). */
export function Brackets({ className }: { className?: string }) {
  const base = 'absolute h-5 w-5 border-cyan/60';
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0', className)}>
      <span className={cn(base, 'left-0 top-0 border-l-2 border-t-2')} />
      <span className={cn(base, 'right-0 top-0 border-r-2 border-t-2')} />
      <span className={cn(base, 'bottom-0 left-0 border-b-2 border-l-2')} />
      <span className={cn(base, 'bottom-0 right-0 border-b-2 border-r-2')} />
    </div>
  );
}

/** Small "+" crosshair marker. */
export function Cross({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" className={cn('pointer-events-none absolute h-3 w-3 text-cyan/50', className)}>
      <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Scrolling ticker band. Words are duplicated so the loop is seamless. */
export function Ticker({ words }: { words: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {words.map((word, i) => (
        <li key={i} className="flex items-center gap-6 px-6 font-display text-lg font-bold uppercase tracking-[0.2em] text-white/85">
          {word}
          <span className="h-1.5 w-1.5 rotate-45 bg-cyan" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="relative overflow-hidden border-y border-line bg-night py-3.5" aria-hidden="true">
      <div className="marquee flex w-max">
        {row(false)}
        {row(true)}
        {row(true)}
        {row(true)}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-night to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-night to-transparent" />
    </div>
  );
}
