import { site } from '../data/site';
import { discord, external } from '../socials';
import { cn } from '../utils';
import { ArrowDownIcon, DiscordIcon } from './Icons';
import { Logo, useLogoStatus } from './Logo';
import { Brackets, Circuit, HexFrame, Wing } from './Ornaments';
import { Parallax } from './Parallax';
import { Scramble } from './Scramble';
import { Tilt } from './Tilt';
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
          <p className="rise inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan [--d:250ms]">
            <Wing className="h-5 w-10" />
            <Scramble text={site.label} delay={350} />
            <Wing flip className="h-5 w-10" />
          </p>

          <h1 className="rise-impact mt-5 font-display [--d:350ms] text-[clamp(4rem,14vw,8.5rem)] font-bold uppercase leading-[0.85] tracking-wide">
            <Wordmark stacked shine />
          </h1>

          <p className={cn('rise mx-auto mt-6 max-w-md [--d:480ms] text-lg text-dim sm:text-xl', hasLogo && 'lg:mx-0')}>{site.heroText}</p>

          <div className={cn('rise mt-10 flex flex-wrap justify-center gap-3 [--d:600ms]', hasLogo && 'lg:justify-start')}>
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
          <div className="rise-zoom order-1 flex justify-center [--d:150ms] lg:order-2">
            <Parallax amp={-60}>
              <Tilt className="relative aspect-square w-60 sm:w-72 lg:w-[25rem]">
                {/* Back to front: rays, sonar rings, frame and glow sit behind the logo; the brackets float in front */}
                <div aria-hidden="true" className="hero-rays absolute -inset-[60%] [transform:translateZ(-90px)]" />
                <div aria-hidden="true" className="absolute inset-[6%] [transform:translateZ(-70px)]">
                  <span className="sonar" />
                  <span className="sonar [animation-delay:1.7s]" />
                  <span className="sonar [animation-delay:3.4s]" />
                </div>
                <HexFrame className="-inset-[16%] [transform:translateZ(-50px)]" />
                <div aria-hidden="true" className="breathe absolute inset-[10%] rounded-full bg-blue/30 blur-3xl [transform:translateZ(-60px)]" />
                <div className="relative h-full w-full [transform-style:preserve-3d]">
                  <Logo className="h-full w-full border border-blue/40 shadow-[0_0_70px_-12px_rgba(95,130,224,0.75)]" />
                  <div aria-hidden="true" className="tilt-glare pointer-events-none absolute inset-0" />
                  <Brackets className="-inset-3 [transform:translateZ(36px)]" />
                </div>
              </Tilt>
            </Parallax>
          </div>
        )}
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />
      <div aria-hidden="true" className="hero-scan absolute bottom-0 h-px w-1/3 bg-gradient-to-r from-transparent via-white to-transparent" />
    </section>
  );
}
