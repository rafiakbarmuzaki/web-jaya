import { About } from './components/About';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Members } from './components/Members';
import { Circuit, Ticker } from './components/Ornaments';
import { Aura, ScrollBar } from './components/PageFx';
import { Socials } from './components/Socials';
import { Starfield } from './components/Starfield';
import { site } from './data/site';

export default function App() {
  return (
    <>
      <Starfield />
      <Intro />
      <ScrollBar />
      <Aura />
      <a
        href="#members"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-cyan focus:px-3 focus:py-2 focus:text-ink"
      >
        Lewati ke daftar member
      </a>
      <Header />
      <main>
        <Hero />
        <Ticker words={site.ticker} />
        <Members />
        <div className="relative overflow-hidden border-y border-line bg-night">
          <div aria-hidden="true" className="ornament-hex absolute inset-0" />
          <div aria-hidden="true" className="ornament-stars absolute inset-0 opacity-60" />
          <Circuit className="absolute -left-8 bottom-4 hidden w-52 text-blue/20 xl:block" />
          <div className="wrap relative grid gap-16 py-20 md:py-24 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
            <About />
            <Socials />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
