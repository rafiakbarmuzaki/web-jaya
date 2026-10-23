import type { ReactNode } from 'react';
import { Wing } from './Ornaments';

interface SectionHeadingProps {
  id: string;
  label: string;
  title: string;
  children?: ReactNode;
}

export function SectionHeading({ id, label, title, children }: SectionHeadingProps) {
  return (
    <div>
      <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-cyan">
        <Wing className="h-4 w-8" />
        {label}
      </p>
      <h2 id={id} className="mt-4 font-display text-3xl uppercase leading-tight text-white sm:text-4xl">
        {title}
      </h2>
      {children && <p className="mt-3 text-dim">{children}</p>}
    </div>
  );
}
