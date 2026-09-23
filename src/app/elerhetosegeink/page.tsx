import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { iskola } from '@/data/iskola';
import { KRETA_URL } from '@/data/nav';

export const metadata: Metadata = {
  title: 'Elérhetőségeink',
  description: 'A Zsirai Általános Iskola címe, telefonszáma, OM azonosítója, térkép és üzenetküldés.',
  alternates: { canonical: '/elerhetosegeink/' },
};

export default function Page() {
  return (
    <>
      <PageHero title="Elérhetőségeink" path="/elerhetosegeink/" lead="Keressen minket bizalommal telefonon, levélben vagy személyesen." />
      <div className="container page-body">
        <div className="contact-wrap">
          <div className="stack">
            <div className="card contact-info">
              <h2>{iskola.nev}</h2>
              <dl>
                <div><dt>Cím</dt><dd>{iskola.cim}</dd></div>
                <div><dt>Telefon</dt><dd><a href={iskola.telefonHref}>{iskola.telefon}</a></dd></div>
                <div><dt>Fax</dt><dd>{iskola.fax}</dd></div>
                <div><dt>OM azonosító</dt><dd>{iskola.om}</dd></div>
                <div><dt>Fenntartó</dt><dd>{iskola.fenntarto.nev}<br /><span className="muted">{iskola.fenntarto.cim}</span></dd></div>
              </dl>
              <div className="chip-row" style={{ marginTop: '1rem' }}>
                <a className="chip" href={iskola.mapLink} target="_blank" rel="noopener">Útvonaltervezés ↗</a>
                <Link className="chip" href="/fogadoorak/">Fogadóórák</Link>
                <a className="chip" href={KRETA_URL} target="_blank" rel="noopener">KRÉTA e-napló ↗</a>
              </div>
            </div>
            <div className="card contact-map">
              <iframe src={iskola.mapEmbed} width="100%" height="320" style={{ border: 0, display: 'block' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Térkép – Zsirai Általános Iskola" allowFullScreen />
            </div>
          </div>
          <div className="card form-card">
            <h2>Írjon nekünk</h2>
            <p className="muted">Az alábbi mezőket kitöltve küldhet nekünk levelet. Az e-mail mezőbe kérjük, hogy a saját e-mail címét írja be!</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
