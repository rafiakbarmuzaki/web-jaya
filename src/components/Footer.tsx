import { site } from '../data/site';
import { useReveal } from '../motion';
import { external, socialLinks } from '../socials';
import { ArrowUpIcon } from './Icons';
import { Logo } from './Logo';
import { Wordmark } from './Wordmark';

export function Footer() {
  const nameRef = useReveal<HTMLDivElement>();
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div aria-hidden="true" className="ornament-stars absolute inset-0 opacity-50" />
      <div className="wrap relative z-10 flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Logo className="h-12 w-12 rounded-md" />
          <div>
            <p className="font-display text-2xl uppercase leading-none tracking-wide">
              <Wordmark />
            </p>
            <p className="text-sm text-mute">
              © {new Date().getFullYear()} {site.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {socialLinks.map(({ id, label, url, Icon }) => (
            <a
              key={id}
              href={url}
              {...external}
              aria-label={label}
              title={label}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-line text-dim transition-colors hover:border-cyan/60 hover:text-white"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <a href="#home" className="ml-2 inline-flex h-10 items-center gap-1.5 rounded-md px-3 text-sm text-mute transition-colors hover:text-white">
            Ke atas
            <ArrowUpIcon className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Giant outlined name peeking from the bottom, with a glint sliding through the letters */}
      <div ref={nameRef} data-reveal="name">
        <p aria-hidden="true" className="text-outline footer-name pointer-events-none -mb-[0.22em] select-none whitespace-nowrap text-center font-display text-[14vw] uppercase leading-none">
          {site.name}
        </p>
      </div>
    </footer>
  );
}
