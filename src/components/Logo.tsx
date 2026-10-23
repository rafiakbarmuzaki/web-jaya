import { useSyncExternalStore } from 'react';
import { site } from '../data/site';
import { asset, cn } from '../utils';

const src = asset(site.logo);

// One shared check so every logo on the page (and the hero layout) knows
// whether public/logo.png exists.
type Status = 'loading' | 'ok' | 'missing';
let status: Status = 'loading';
const listeners = new Set<() => void>();

function setStatus(next: Status) {
  status = next;
  listeners.forEach((notify) => notify());
  if (next === 'missing' && import.meta.env.DEV) {
    console.warn(`Logo tidak ditemukan: public/${site.logo.replace(/^\/+/, '')}`);
  }
}

const probe = new Image();
probe.onload = () => setStatus('ok');
probe.onerror = () => setStatus('missing');
probe.src = src;

export function useLogoStatus(): Status {
  return useSyncExternalStore(
    (notify) => {
      listeners.add(notify);
      return () => {
        listeners.delete(notify);
      };
    },
    () => status,
  );
}

/**
 * The official logo, shown as-is (object-contain: never stretched or cropped).
 * If the file is missing, nothing is rendered — no stand-in artwork.
 */
export function Logo({ className }: { className?: string }) {
  if (useLogoStatus() === 'missing') return null;
  return <img src={src} alt={`Logo ${site.name}`} decoding="async" className={cn('object-contain', className)} />;
}
