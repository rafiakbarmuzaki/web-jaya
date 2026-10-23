import { site } from '../data/site';

/** Chrome-style name like the logo lettering. `stacked` puts each word on its own line. */
export function Wordmark({ stacked }: { stacked?: boolean }) {
  const [first, ...rest] = site.name.split(' ');
  return (
    <>
      <span className="text-chrome">{first}</span>
      {rest.length > 0 && (
        <>
          {' '}
          {stacked && <br />}
          <span className="text-chrome">{rest.join(' ')}</span>
        </>
      )}
    </>
  );
}
