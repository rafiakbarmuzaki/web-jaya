import { site } from '../data/site';
import { discord, external } from '../socials';
import { cn } from '../utils';
import { ArrowDownIcon, DiscordIcon } from './Icons';
import { Logo, useLogoStatus } from './Logo';
import { Brackets, Cross } from './Ornaments';
import { Wordmark } from './Wordmark';

export function Hero() {
  const hasLogo = useLogoStatus() !== 'missing';

  return (
    <section id="home" aria-label={site.name} className="relative isolate overflow-hidden">
      {/* Background ornaments */}
      <div aria-hidden="true" className="ornament-glow absolute inset-0 -z-10" />
      <div aria-hidden="true" className="ornament-grid absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute -left-16 top-1/3 -z-10 hidden h-64 w-40 -skew-x-[20deg] border-r border-cyan/20 bg-gradient-to-r from-transparent to-blue/[0.06] md:block" />
      <div aria-hidden="true" className="absolute -right-16 top-1/4 -z-10 hidden h-80 w-40 skew-x-[20deg] border-l border-cyan/20 bg-gradient-to-l from-transparent to-blue/[0.06] md:block" />

      <div className="wrap py-16 sm:py-20 md:py-24">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-12 text-center sm:px-12 sm:py-16">
          <Brackets />
          <Cross className="-left-1.5 top-1/2 hidden sm:block" />
          <Cross className="-right-1.5 top-1/2 hidden sm:block" />

          {hasLogo && <Logo className="mb-8 h-36 w-auto max-w-full sm:h-44 md:h-56" />}

          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan">
            <span className="ornament-stripes h-2.5 w-8" aria-hidden="true" />
            {site.label}
            <span className="ornament-stripes h-2.5 w-8" aria-hidden="true" />
          </p>

          <h1
            className={cn(
              'mt-5 font-display font-extrabold uppercase leading-[0.85] tracking-tight',
              hasLogo ? 'text-[clamp(3rem,9vw,6rem)]' : 'text-[clamp(3.5rem,13vw,8.5rem)]',
            )}
          >
            <Wordmark />
          </h1>

          <p className="mt-6 max-w-lg text-lg text-dim sm:text-xl">{site.heroText}</p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#members" className="btn bg-cyan text-ink hover:bg-white">
              Lihat Member
              <ArrowDownIcon className="h-4 w-4" />
            </a>
            {discord && (
              <a href={discord.url} {...external} className="btn bg-discord text-white hover:bg-discord-dark">
                <DiscordIcon className="h-5 w-5" />
                Join Discord
              </a>
            )}
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
    </section>
  );
}
