import { site } from '../data/site';
import { discord, external } from '../socials';
import { cn } from '../utils';
import { ArrowDownIcon, DiscordIcon } from './Icons';
import { Logo, useLogoStatus } from './Logo';
import { Brackets, Circuit, HexFrame, Wing } from './Ornaments';
import { Wordmark } from './Wordmark';

export function Hero() {
  const hasLogo = useLogoStatus() !== 'missing';

  return (
    <section id="home" aria-label={site.name} className="relative isolate overflow-hidden">
      {/* Background: nebula light, stars and honeycomb from the logo */}
      <div aria-hidden="true" className="ornament-nebula absolute inset-0 -z-10" />
      <div aria-hidden="true" className="ornament-stars absolute inset-0 -z-10" />
      <div aria-hidden="true" className="ornament-stars twinkle absolute inset-0 -z-10 [background-position:140px_96px]" />
      <div aria-hidden="true" className="ornament-hex absolute inset-0 -z-10" />
      <Circuit className="absolute bottom-6 left-0 -z-10 hidden w-60 text-cyan/30 md:block" />
      <Circuit className="absolute right-0 top-6 -z-10 hidden w-48 -scale-x-100 text-violet/40 md:block" />

      <div className={cn('wrap grid items-center gap-12 py-14 sm:py-20 lg:py-24', hasLogo && 'lg:grid-cols-[1.05fr_1fr] lg:gap-10')}>
        <div className={cn('order-2 text-center', hasLogo && 'lg:order-1 lg:text-left')}>
          <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan">
            <Wing className="h-5 w-10" />
            {site.label}
            <Wing flip className="h-5 w-10" />
          </p>

          <h1 className="mt-5 font-display text-[clamp(3rem,10vw,6.5rem)] uppercase leading-[0.95]">
            <Wordmark stacked />
          </h1>

          <p className={cn('mx-auto mt-6 max-w-md text-lg text-dim sm:text-xl', hasLogo && 'lg:mx-0')}>{site.heroText}</p>

          <div className={cn('mt-10 flex flex-wrap justify-center gap-3', hasLogo && 'lg:justify-start')}>
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

        {hasLogo && (
          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative aspect-square w-60 sm:w-72 lg:w-[25rem]">
              <HexFrame className="-inset-[16%]" />
              <div aria-hidden="true" className="absolute inset-[10%] rounded-full bg-blue/30 blur-3xl" />
              <div className="relative h-full w-full">
                <Logo className="h-full w-full border border-blue/40 shadow-[0_0_70px_-12px_rgba(77,134,255,0.75)]" />
                <Brackets className="-inset-3" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />
    </section>
  );
}
