import type { ReactNode } from 'react';

interface SectionHeadingProps {
  id: string;
  label: string;
  title: string;
  children?: ReactNode;
}

export function SectionHeading({ id, label, title, children }: SectionHeadingProps) {
  return (
    <div>
      <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan">
        <span className="h-px w-8 bg-cyan" aria-hidden="true" />
        {label}
      </p>
      <h2 id={id} className="mt-4 font-display text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {children && <p className="mt-4 text-dim">{children}</p>}
    </div>
  );
}
