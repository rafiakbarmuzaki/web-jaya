import { useState } from 'react';
import { discord, external } from '../socials';
import { DiscordIcon, MenuIcon } from './Icons';
import { Logo } from './Logo';
import { Wordmark } from './Wordmark';

export const NAV = [
  { href: '#home', label: 'Home' },
  { href: '#members', label: 'Members' },
  { href: '#about', label: 'About' },
  { href: '#socials', label: 'Socials' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur-md">
      <div className="wrap flex h-16 items-center gap-8">
        <a href="#home" onClick={close} className="flex items-center gap-3">
          <Logo className="h-9 w-auto" />
          <span className="font-display text-xl font-bold uppercase tracking-wide">
            <Wordmark />
          </span>
        </a>

        <nav aria-label="Navigasi" className="ml-auto hidden md:block">
          <ul className="flex gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="group relative px-3 py-2 text-sm font-medium text-dim transition-colors hover:text-white">
                  {item.label}
                  <span aria-hidden="true" className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-cyan transition-transform group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {discord && (
          <a href={discord.url} {...external} className="hidden items-center gap-2 rounded-md bg-discord px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-discord-dark md:inline-flex">
            <DiscordIcon className="h-4 w-4" />
            Discord
          </a>
        )}

        <button
          type="button"
          className="-mr-2 ml-auto rounded-md p-2 text-dim hover:text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
        >
          <MenuIcon open={open} className="h-6 w-6" />
        </button>
      </div>

      {open && (
        // Overlay (absolute) so opening/closing never shifts the page under an anchor jump.
        <nav id="mobile-menu" aria-label="Navigasi" className="absolute inset-x-0 top-full border-b border-line bg-ink shadow-xl shadow-black/50 md:hidden">
          <ul className="wrap py-2">
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-line/60 last:border-0">
                <a href={item.href} onClick={close} className="flex items-center justify-between py-3.5 font-display text-lg font-semibold uppercase tracking-wide text-dim hover:text-white">
                  {item.label}
                  <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-cyan/60" />
                </a>
              </li>
            ))}
            {discord && (
              <li className="py-3">
                <a href={discord.url} {...external} className="inline-flex items-center gap-2 rounded-md bg-discord px-4 py-2.5 text-sm font-semibold text-white">
                  <DiscordIcon className="h-4 w-4" />
                  Join Discord
                </a>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
