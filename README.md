# JAYA E-SPORT — Landing Page

A single-page site for the JAYA E-SPORT gaming circle: hero, member list, about, and socials.
Built with React + TypeScript + Vite + Tailwind CSS. No backend, no login, no database.

## Run it locally

Requires Node.js 18 or newer.

```bash
npm install      # first time only
npm run dev      # open http://localhost:5173 — updates live as you edit
npm run build    # creates the finished site in dist/
npm run preview  # check the built site at http://localhost:4173
```

To put it online, upload the **contents of `dist/`** to any static host (Netlify, Vercel, GitHub Pages, cPanel, …).
Opening `dist/index.html` by double-clicking it won't work: browsers block the script from `file://`. Use `npm run preview` or a host instead.

## Editing the content

Everything you'd normally change lives in two files. You never need to touch the components.

| What | Where |
| --- | --- |
| Member names, roles, gaming IDs, photos | `src/data/members.ts` |
| Discord / TikTok / Instagram URLs | `src/data/site.ts` → `socials` |
| About paragraph, hero text, site name | `src/data/site.ts` |
| Logo | put the file at `public/logo.png` (path set in `src/data/site.ts` → `logo`) |

### Members

Each member is one line in `src/data/members.ts`:

```ts
{ name: 'Rafi', role: 'Admin', gamingId: 'JAYA#1234', photo: '/members/rafi.jpg' },
```

- `role` must be `'CEO'`, `'Admin'`, `'Komisaris'`, or `'Member'`.
- `gamingId` and `photo` are optional. Without a photo, initials are shown.
- Put photos in `public/members/`. Small square images (around 200×200 px) work best.
- Add a line to add a member, delete a line to remove one. The total, the role counts, and the filters update automatically.

### Social links

```ts
socials: {
  discord: 'https://discord.gg/your-invite',
  tiktok: '',
  instagram: '',
},
```

Leave a URL as `''` and that link is hidden everywhere: header, hero, socials section, footer.
Once you fill one in (it must start with `https://`), it appears automatically.
The Discord URL also turns on the header button and the "Join Discord" button in the hero.

### Logo

Save the official logo as `public/logo.png`. It's shown in the header and hero at its original proportions, never stretched or cropped. If the file is missing, the logo is simply left out.
Keep the file reasonably small (under ~300 KB) so the page loads fast.
