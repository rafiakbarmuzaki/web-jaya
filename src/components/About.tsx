import { site } from '../data/site';
import { SectionHeading } from './SectionHeading';

/** First sentence becomes the lead; the rest follows in a softer tone. */
function splitAbout(text: string): string[] {
  const [first = '', ...others] = text.split(/\n\s*\n/).map((p) => p.trim());
  const match = first.match(/^(.+?[.!?])\s+([\s\S]+)$/);
  return match ? [match[1], match[2], ...others] : [first, ...others];
}

export function About() {
  const [lead, ...rest] = splitAbout(site.about);
  return (
    <section id="about" aria-labelledby="about-title">
      <SectionHeading id="about-title" label="About" title="Tentang Kami" />
      <div className="mt-8 border-l-2 border-cyan/60 pl-6">
        <p className="text-xl font-medium leading-relaxed text-white sm:text-2xl">{lead}</p>
        {rest.map((p, i) => (
          <p key={i} className="mt-4 text-lg leading-relaxed text-dim">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
