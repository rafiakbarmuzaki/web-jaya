import type { ReactNode } from 'react';
import { useReveal } from '../motion';
import { Wing } from './Ornaments';
import { Scramble } from './Scramble';

interface SectionHeadingProps {
  id: string;
  label: string;
  title: string;
  children?: ReactNode;
}

export function SectionHeading({ id, label, title, children }: SectionHeadingProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} data-reveal="heading">
      <p className="sh-label flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-cyan">
        <Wing className="h-4 w-8" />
        <Scramble text={label} delay={150} />
      </p>
      <h2 id={id} className="sh-title relative mt-4 w-fit font-display text-5xl font-semibold uppercase leading-none tracking-wide text-white sm:text-6xl">
        <span className="inline-block">{title}</span>
      </h2>
      {children && <p className="sh-sub mt-3 text-dim">{children}</p>}
    </div>
  );
}
