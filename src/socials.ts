import type { ComponentType, SVGProps } from 'react';
import { site } from './data/site';
import { DiscordIcon, InstagramIcon, TikTokIcon } from './components/Icons';

export interface SocialLink {
  id: keyof typeof site.socials;
  label: string;
  url: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const PLATFORMS: Omit<SocialLink, 'url'>[] = [
  { id: 'discord', label: 'Discord', Icon: DiscordIcon },
  { id: 'tiktok', label: 'TikTok', Icon: TikTokIcon },
  { id: 'instagram', label: 'Instagram', Icon: InstagramIcon },
];

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

/** Only platforms with a real http(s) URL in site.ts — empty ones are skipped. */
export const socialLinks: SocialLink[] = PLATFORMS.flatMap((p) => {
  const url = site.socials[p.id].trim();
  return isHttpUrl(url) ? [{ ...p, url }] : [];
});

export const discord = socialLinks.find((l) => l.id === 'discord');

/** Spread onto every external <a>. */
export const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
