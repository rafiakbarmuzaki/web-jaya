import { useMemo, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { members } from '../data/members';
import type { Member, Role } from '../data/members';
import { useReveal } from '../motion';
import { asset, cn } from '../utils';
import { CountUp } from './CountUp';
import { SearchIcon } from './Icons';
import { Parallax } from './Parallax';
import { SectionHeading } from './SectionHeading';

const ROLES: Role[] = ['CEO', 'Admin', 'Member'];
type Filter = 'All' | Role;

const ROLE_STYLE: Record<Role, { text: string; frame: string; chip: string; bar: string; grid: string; featured: boolean }> = {
  CEO: {
    text: 'text-cyan',
    frame: 'bg-gradient-to-b from-cyan to-blue',
    chip: 'bg-cyan/10 text-cyan',
    bar: 'bg-gradient-to-b from-cyan to-blue',
    grid: 'grid-cols-1 sm:grid-cols-3',
    featured: true,
  },
  Admin: {
    text: 'text-wing',
    frame: 'bg-gradient-to-b from-blue to-violet',
    chip: 'bg-blue/10 text-wing',
    bar: 'bg-gradient-to-b from-blue to-violet',
    grid: 'grid-cols-2 lg:grid-cols-4',
    featured: true,
  },
  Member: {
    text: 'text-dim',
    frame: 'bg-[#2b3768]',
    chip: 'bg-white/5 text-dim',
    bar: 'bg-[#2b3768]',
    grid: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    featured: false,
  },
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const last = parts[parts.length - 1] ?? '';
  // "Member 07" → "M07" so numbered placeholders stay distinguishable.
  if (parts.length > 1 && /^\d+$/.test(last)) return parts[0][0].toUpperCase() + last;
  return parts.length > 1 ? (parts[0][0] + last[0]).toUpperCase() : name.slice(0, 2).toUpperCase();
}

/** Hexagon avatar, echoing the shield in the logo. */
function Avatar({ member, large }: { member: Member; large: boolean }) {
  const style = ROLE_STYLE[member.role];
  return (
    <span aria-hidden="true" className={cn('tile-avatar hex relative shrink-0', large ? 'h-14 w-12' : 'h-11 w-10', style.frame)}>
      <span className="hex absolute inset-[2px] flex items-center justify-center overflow-hidden bg-panel">
        {member.photo ? (
          <img src={asset(member.photo)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        ) : (
          <span className={cn('font-display', large ? 'text-lg' : 'text-[15px]', style.text)}>{initials(member.name)}</span>
        )}
      </span>
    </span>
  );
}

/** Tiles of a group cascade in one after another; capped so a long list doesn't take forever. */
const cascade = (index: number) => ({ animationDelay: `${Math.min(index, 14) * 45}ms` });

function MemberTile({ member, index }: { member: Member; index: number }) {
  const style = ROLE_STYLE[member.role];
  return (
    <li
      className={cn(
        'tile relative flex min-w-0 items-center gap-3 border border-line bg-panel',
        style.featured ? 'notch px-4 py-4 sm:px-5' : 'rounded-md px-3 py-2.5',
      )}
      style={cascade(index)}
    >
      {style.featured && <span aria-hidden="true" className={cn('absolute inset-y-3 left-0 w-0.5', style.bar)} />}
      {style.featured && <span aria-hidden="true" className="tile-shine" style={{ animationDelay: `${index * 1.3}s` }} />}
      <Avatar member={member} large={style.featured} />
      <div className="min-w-0 flex-1">
        <p className={cn('truncate font-semibold text-white', style.featured ? 'text-base' : 'text-sm')} title={member.name}>
          {member.name}
        </p>
        <p className="mt-1 flex min-w-0 items-center gap-2 text-xs text-mute">
          <span className={cn('shrink-0 rounded-sm px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider', style.chip)}>{member.role}</span>
          {member.gamingId && <span className="truncate font-mono">{member.gamingId}</span>}
        </p>
      </div>
    </li>
  );
}

/** Hands the cursor position to the tile under it, which lights up around it (.tile in index.css). */
function trackPointer(e: ReactPointerEvent<HTMLUListElement>) {
  const tile = (e.target as Element).closest<HTMLElement>('li');
  if (!tile) return;
  const box = tile.getBoundingClientRect();
  tile.style.setProperty('--mx', `${e.clientX - box.left}px`);
  tile.style.setProperty('--my', `${e.clientY - box.top}px`);
}

function Group({ role, list }: { role: Role; list: Member[] }) {
  const ref = useReveal<HTMLDivElement>();
  const style = ROLE_STYLE[role];
  return (
    <div ref={ref} data-reveal="group">
      <h3 className="mb-5 flex items-center gap-3 font-display text-xl uppercase tracking-[0.15em]">
        <span aria-hidden="true" className={cn('hex h-3.5 w-3', style.bar)} />
        <span className={style.text}>{role}</span>
        <span className="font-sans text-xs text-mute">{list.length}</span>
        <span aria-hidden="true" className="group-rule h-px flex-1 bg-gradient-to-r from-line to-transparent" />
      </h3>
      <ul onPointerMove={trackPointer} className={cn('grid gap-2.5 sm:gap-3', style.grid)}>
        {list.map((m, i) => (
          <MemberTile key={`${i}-${m.name}`} member={m} index={i} />
        ))}
      </ul>
    </div>
  );
}

const counts = Object.fromEntries(ROLES.map((r) => [r, members.filter((m) => m.role === r).length])) as Record<Role, number>;

export function Members() {
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');
  const barRef = useReveal<HTMLDivElement>();

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const match = (m: Member) => !q || m.name.toLowerCase().includes(q) || (m.gamingId ?? '').toLowerCase().includes(q);
    return ROLES.filter((r) => filter === 'All' || filter === r)
      .map((role) => ({ role, list: members.filter((m) => m.role === role && match(m)) }))
      .filter((g) => g.list.length > 0);
  }, [filter, query]);

  const shown = groups.reduce((n, g) => n + g.list.length, 0);
  const filters: { value: Filter; n: number }[] = [{ value: 'All', n: members.length }, ...ROLES.map((r) => ({ value: r, n: counts[r] }))];
  const reset = () => {
    setQuery('');
    setFilter('All');
  };

  return (
    <section id="members" aria-labelledby="members-title" className="relative overflow-hidden py-20 md:py-28">
      <div aria-hidden="true" className="ornament-stars absolute inset-0 opacity-40" />
      <div className="wrap relative">
        <Parallax amp={-90} className="pointer-events-none absolute -top-4 right-4 hidden sm:right-6 lg:right-8 lg:block">
          <span aria-hidden="true" className="text-outline block select-none font-display text-[12rem] leading-none">
            <CountUp to={members.length} />
          </span>
        </Parallax>

        <SectionHeading id="members-title" label="Members" title="Daftar Member">
          {members.length} orang · {ROLES.map((r) => `${counts[r]} ${r}`).join(' · ')}
        </SectionHeading>

        <div ref={barRef} data-reveal="up" className="mt-10 flex flex-col gap-2 rounded-lg border border-line bg-panel/80 p-2 [--d:150ms] sm:flex-row sm:items-center sm:justify-between">
          <div className="relative sm:w-80">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mute" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama atau gaming ID"
              aria-label="Cari member"
              className="h-10 w-full rounded-md border border-line bg-ink pl-9 pr-3 text-sm text-white placeholder:text-mute focus:border-cyan/60 focus:outline-none"
            />
          </div>
          <div role="group" aria-label="Filter peran" className="flex gap-1">
            {filters.map(({ value, n }) => {
              const active = filter === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  aria-pressed={active}
                  className={cn(
                    'flex h-10 flex-1 items-center justify-center gap-1.5 rounded-md px-2 text-sm font-medium transition-colors sm:flex-none sm:px-4',
                    active ? 'bg-gradient-to-r from-cyan/15 to-violet/15 text-white ring-1 ring-inset ring-cyan/50' : 'text-dim hover:bg-white/5 hover:text-white',
                  )}
                >
                  {value}
                  <span className={cn('hidden text-xs sm:inline', active ? 'text-cyan' : 'text-mute')}>{n}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {shown} member ditampilkan
        </p>

        {groups.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-line px-6 py-12 text-center">
            <p className="text-dim">{query ? `Nggak ada member yang cocok dengan “${query}”.` : `Belum ada member dengan peran ${filter}.`}</p>
            <button type="button" onClick={reset} className="mt-4 text-sm font-medium text-cyan underline-offset-4 hover:underline">
              Reset pencarian
            </button>
          </div>
        ) : (
          <div className="mt-12 space-y-12">
            {groups.map(({ role, list }) => (
              <Group key={role} role={role} list={list} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
