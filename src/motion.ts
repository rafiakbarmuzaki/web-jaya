import { useEffect, useRef } from 'react';

// Helpers shared by the page's motion effects.

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** A real mouse or trackpad is the main input, so pointer-follow effects make sense. */
export const hasMouse = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

/** Fired on `window` the moment the opening intro starts to open. */
export const INTRO_OPEN = 'intro-open';

export const introPlaying = () => document.documentElement.dataset.intro === 'on';

/** Runs `fn` once the intro is out of the way (right away if it isn't playing). Returns a cancel function. */
export function afterIntro(fn: () => void): () => void {
  if (!introPlaying()) {
    fn();
    return () => {};
  }
  window.addEventListener(INTRO_OPEN, fn, { once: true });
  return () => window.removeEventListener(INTRO_OPEN, fn);
}

/** Calls `fn` the first time `el` scrolls into view. Returns a cancel function. */
export function onceVisible(el: Element, fn: () => void): () => void {
  if (!('IntersectionObserver' in window)) {
    fn();
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      fn();
    },
    { rootMargin: '0px 0px -6% 0px' },
  );
  io.observe(el);
  return () => io.disconnect();
}

/** Like onceVisible, but also waits for the intro, so effects aren't spent behind the overlay. */
export function whenSeen(el: Element, fn: () => void): () => void {
  let stopIntro = () => {};
  const stopView = onceVisible(el, () => {
    stopIntro = afterIntro(fn);
  });
  return () => {
    stopView();
    stopIntro();
  };
}

/** Scroll reveal: puts `data-in` on the element once it's been seen (styles live under [data-reveal] in index.css). */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      el.dataset.in = '';
      return;
    }
    return whenSeen(el, () => {
      el.dataset.in = '';
    });
  }, []);
  return ref;
}
