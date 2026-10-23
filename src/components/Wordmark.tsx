import { site } from '../data/site';

/** "JAYA E-SPORT" with the first word in white and the rest in cyan. */
export function Wordmark() {
  const [first, ...rest] = site.name.split(' ');
  return (
    <>
      <span className="text-white">{first}</span>
      {rest.length > 0 && (
        <>
          {' '}
          <span className="text-cyan">{rest.join(' ')}</span>
        </>
      )}
    </>
  );
}
