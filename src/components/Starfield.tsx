import { useEffect, useRef } from 'react';
import { afterIntro, clamp, introPlaying, reducedMotion } from '../motion';

// Fixed canvas behind the whole page: twinkling parallax stars, shooting stars, and a
// hyperspace jump the moment the intro's gates open.

const TAU = Math.PI * 2;
// Logo palette: mostly white, a few icy-cyan, periwinkle and violet stars.
const COLORS = ['#ffffff', '#ffffff', '#ffffff', '#a3b4f0', '#8fdfff', '#8b6cf0'];
const WARP_PEAK = 0.8; // seconds until the jump is at full speed
const WARP_END = 3.5;
const GLOW_RADIUS = 170; // stars light up around the cursor

interface Star {
  x: number; // 0–1 across the screen
  y: number;
  z: number; // depth: far stars are small, dim and barely move
  phase: number;
  rate: number;
  color: string;
  sparkle: boolean;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  len: number;
}

/** A star flying outward from the centre during the jump. */
interface Streak {
  angle: number;
  r: number;
  z: number;
  color: string;
}

const pick = () => COLORS[(Math.random() * COLORS.length) | 0];

function makeStar(): Star {
  const z = 0.12 + 0.88 * Math.random() ** 2.2;
  return { x: Math.random(), y: Math.random(), z, phase: Math.random() * TAU, rate: 0.6 + Math.random() * 1.8, color: pick(), sparkle: z > 0.6 && Math.random() < 0.35 };
}

const makeStreak = (R: number): Streak => ({
  angle: Math.random() * TAU,
  r: (0.02 + Math.sqrt(Math.random()) * 0.8) * R,
  z: 0.35 + Math.random() * 0.65,
  color: pick(),
});

function makeMeteor(W: number, H: number): Meteor {
  const dir = Math.random() < 0.5 ? 1 : -1;
  const angle = ((20 + Math.random() * 25) * Math.PI) / 180;
  const speed = 900 + Math.random() * 500;
  return {
    x: dir > 0 ? W * (0.05 + Math.random() * 0.5) : W * (0.5 + Math.random() * 0.45),
    y: H * Math.random() * 0.45,
    vx: Math.cos(angle) * speed * dir,
    vy: Math.sin(angle) * speed,
    age: 0,
    life: 0.55 + Math.random() * 0.4,
    len: 140 + Math.random() * 120,
  };
}

export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext('2d');
    // Reduced motion keeps the static CSS stars only.
    if (!cv || !ctx || reducedMotion()) return;

    const stars: Star[] = [];
    const meteors: Meteor[] = [];
    let streaks: Streak[] = [];
    const ptr = { x: -9999, y: -9999, tx: 0.5, ty: 0.5, nx: 0.5, ny: 0.5 }; // raw / target / eased, 0–1 across the screen
    let W = 0;
    let H = 0;
    let warp = -1; // seconds since the jump began, -1 when it isn't running
    let nextMeteor = 2 + Math.random() * 3;
    let time = 0;
    let last = performance.now();
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) {
        cv.width = Math.round(W * dpr);
        cv.height = Math.round(H * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const want = Math.round(clamp((W * H) / 12000, 60, 170));
      while (stars.length < want) stars.push(makeStar());
      stars.length = want;
    };

    const startWarp = () => {
      warp = 0;
      const R = Math.hypot(W, H) / 2;
      streaks = Array.from({ length: 150 }, () => makeStreak(R));
    };

    const drawStars = (dt: number) => {
      const sy = window.scrollY;
      for (const s of stars) {
        s.y = (s.y + 1 - (s.z * 9 * dt) / H) % 1; // slow upward drift, near stars faster
        const x = s.x * W - (ptr.nx - 0.5) * 36 * s.z;
        const y = ((((s.y * H - sy * 0.25 * s.z) % H) + H) % H) - (ptr.ny - 0.5) * 36 * s.z;
        const tw = 0.7 + 0.3 * Math.sin(time * s.rate + s.phase);
        let a = (0.18 + 0.6 * s.z) * tw;
        let r = 0.5 + 1.3 * s.z;
        const near = 1 - Math.hypot(x - ptr.x, y - ptr.y) / GLOW_RADIUS;
        if (near > 0) {
          a += near * 0.55;
          r += near * 0.9;
        }
        ctx.globalAlpha = Math.min(a, 1);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, TAU);
        ctx.fill();
        if (s.sparkle) {
          const len = r * 5 * tw * tw;
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(x - len, y);
          ctx.lineTo(x + len, y);
          ctx.moveTo(x, y - len);
          ctx.lineTo(x, y + len);
          ctx.stroke();
        }
      }
    };

    const drawMeteors = (dt: number) => {
      if (warp < 0 && (nextMeteor -= dt) <= 0) {
        meteors.push(makeMeteor(W, H));
        nextMeteor = 3 + Math.random() * 5;
      }
      ctx.lineCap = 'round';
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.age += dt;
        if (m.age > m.life) {
          meteors.splice(i, 1);
          continue;
        }
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        const k = m.age / m.life;
        const speed = Math.hypot(m.vx, m.vy);
        const tx = m.x - (m.vx / speed) * m.len;
        const ty = m.y - (m.vy / speed) * m.len;
        const tail = ctx.createLinearGradient(m.x, m.y, tx, ty);
        tail.addColorStop(0, 'rgba(255,255,255,0.95)');
        tail.addColorStop(0.3, 'rgba(143,223,255,0.35)');
        tail.addColorStop(1, 'rgba(143,223,255,0)');
        ctx.globalAlpha = Math.min(k * 8, 1) * (1 - k) ** 0.6;
        ctx.strokeStyle = tail;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.8, 0, TAU);
        ctx.fill();
      }
    };

    const drawWarp = (dt: number) => {
      const t = warp;
      warp += dt;
      if (warp > WARP_END) {
        warp = -1;
        streaks = [];
        return;
      }
      const w = t < WARP_PEAK ? (t / WARP_PEAK) ** 2 : Math.exp(-(t - WARP_PEAK) / 0.75);
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.hypot(W, H) / 2;

      const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.6);
      bloom.addColorStop(0, 'rgba(143,223,255,0.45)');
      bloom.addColorStop(0.4, 'rgba(95,130,224,0.18)');
      bloom.addColorStop(1, 'rgba(95,130,224,0)');
      ctx.globalAlpha = w;
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, W, H);

      ctx.lineCap = 'round';
      for (const s of streaks) {
        if (s.r > R * 1.05) {
          if (w <= 0.25) continue; // let them leave once the jump is winding down
          s.r = (0.02 + Math.random() * 0.15) * R;
          s.angle = Math.random() * TAU;
        }
        s.r += (s.r * 3 + 60) * w * s.z * dt; // speed grows with distance, like real perspective
        const len = 6 + s.r * 0.28 * w * s.z;
        const cos = Math.cos(s.angle);
        const sin = Math.sin(s.angle);
        ctx.globalAlpha = clamp(w * 1.5) * (0.35 + 0.65 * s.z) * clamp(s.r / (0.1 * R));
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 0.7 + 1.9 * s.z * clamp(w);
        ctx.beginPath();
        ctx.moveTo(cx + cos * (s.r - len), cy + sin * (s.r - len));
        ctx.lineTo(cx + cos * s.r, cy + sin * s.r);
        ctx.stroke();
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = clamp((now - last) / 1000, 0, 0.05);
      last = now;
      time += dt;
      ptr.nx += (ptr.tx - ptr.nx) * Math.min(1, dt * 3);
      ptr.ny += (ptr.ty - ptr.ny) * Math.min(1, dt * 3);
      ctx.clearRect(0, 0, W, H);
      drawStars(dt);
      drawMeteors(dt);
      if (warp >= 0) drawWarp(dt);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      ptr.x = e.clientX;
      ptr.y = e.clientY;
      ptr.tx = e.clientX / W;
      ptr.ty = e.clientY / H;
    };
    const onLeave = () => {
      ptr.x = ptr.y = -9999;
      ptr.tx = ptr.ty = 0.5;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    const stopIntro = introPlaying() ? afterIntro(startWarp) : () => {};
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      stopIntro();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}
