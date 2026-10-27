import { site } from '../data/site';
import { cn } from '../utils';

/**
 * Chrome-style name like the logo lettering. `stacked` puts each word on its own line.
 * `shine` sweeps a holographic glint across the letters now and then.
 */
export function Wordmark({ stacked, shine }: { stacked?: boolean; shine?: boolean }) {
  const [first, ...rest] = site.name.split(' ');
  const chrome = cn('text-chrome', shine && 'text-chrome-shine');
  return (
    <>
      <span className={chrome}>{first}</span>
      {rest.length > 0 && (
        <>
          {' '}
          {stacked && <br />}
          <span className={chrome} style={shine ? { animationDelay: '2.5s' } : undefined}>
            {rest.join(' ')}
          </span>
        </>
      )}
    </>
  );
}
