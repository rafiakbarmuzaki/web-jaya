import { site } from '../data/site';
import { useReveal } from '../motion';
import { SectionHeading } from './SectionHeading';

/** First sentence becomes the lead; the rest follows in a softer tone. */
function splitAbout(text: string): string[] {
  const [first = '', ...others] = text.split(/\n\s*\n/).map((p) => p.trim());
  const match = first.match(/^(.+?[.!?])\s+([\s\S]+)$/);
  return match ? [match[1], match[2], ...others] : [first, ...others];
}

export function About() {
  const [lead, ...rest] = splitAbout(site.about);
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="about" aria-labelledby="about-title">
      <SectionHeading id="about-title" label="About" title="Tentang Kami" />
      <div ref={ref} data-reveal="about" className="relative mt-8 pl-6">
        <span aria-hidden="true" className="about-rule absolute inset-y-0 left-0 w-0.5 bg-cyan/60" />
        <p className="about-line text-xl font-medium leading-relaxed text-white sm:text-2xl">{lead}</p>
        {rest.map((p, i) => (
          <p key={i} className="about-line mt-4 text-lg leading-relaxed text-dim" style={{ animationDelay: `${350 + i * 150}ms` }}>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
