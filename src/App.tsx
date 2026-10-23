import { About } from './components/About';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Members } from './components/Members';
import { Ticker } from './components/Ornaments';
import { Socials } from './components/Socials';
import { site } from './data/site';

export default function App() {
  return (
    <>
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
          <div aria-hidden="true" className="ornament-grid absolute inset-0 opacity-60" />
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
