import { discord, external, socialLinks } from '../socials';
import { ArrowUpRightIcon, DiscordIcon, InstagramIcon, TikTokIcon } from './Icons';
import { SectionHeading } from './SectionHeading';

/** "https://www.instagram.com/jaya/" → "instagram.com/jaya" */
function prettyUrl(url: string): string {
  const u = new URL(url);
  return (u.hostname.replace(/^www\./, '') + u.pathname).replace(/\/$/, '');
}

export function Socials() {
  const others = socialLinks.filter((l) => l.id !== 'discord');

  return (
    <section id="socials" aria-labelledby="socials-title">
      <SectionHeading id="socials-title" label="Socials" title="Ikuti Kami" />

      <div className="mt-8">
        {socialLinks.length === 0 ? (
          <div className="relative overflow-hidden rounded-lg border border-dashed border-line p-6">
            <div aria-hidden="true" className="ornament-stripes absolute -right-6 -top-6 h-16 w-16 rotate-12 opacity-30" />
            <div aria-hidden="true" className="flex gap-4 text-mute/60">
              <DiscordIcon className="h-6 w-6" />
              <TikTokIcon className="h-6 w-6" />
              <InstagramIcon className="h-6 w-6" />
            </div>
            <p className="mt-4 text-dim">Link Discord, TikTok, dan Instagram resmi bakal muncul di sini.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {discord && (
              <li>
                <a href={discord.url} {...external} className="notch group relative flex items-center gap-4 overflow-hidden bg-discord px-5 py-5 text-white transition-colors hover:bg-discord-dark">
                  <DiscordIcon className="h-9 w-9 shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-xl font-bold uppercase tracking-wide">Join Discord</span>
                    <span className="block truncate text-sm text-white/75">{prettyUrl(discord.url)}</span>
                  </span>
                  <ArrowUpRightIcon className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            )}
            {others.map(({ id, label, url, Icon }) => (
              <li key={id}>
                <a href={url} {...external} className="group flex items-center gap-4 rounded-lg border border-line bg-panel px-5 py-4 transition-colors hover:border-cyan/50">
                  <Icon className="h-6 w-6 shrink-0 text-white" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-white">{label}</span>
                    <span className="block truncate text-sm text-mute">{prettyUrl(url)}</span>
                  </span>
                  <ArrowUpRightIcon className="h-5 w-5 shrink-0 text-mute transition-colors group-hover:text-cyan" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
