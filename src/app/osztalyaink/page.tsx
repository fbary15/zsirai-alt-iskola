import type { Metadata } from 'next';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { szmk } from '@/data/iskola';

export const metadata: Metadata = {
  title: 'Osztályaink',
  description: 'Iskolánkban évfolyamonként egy osztály működik: alsó és felső tagozaton négy-négy osztály.',
  alternates: { canonical: '/osztalyaink/' },
};

function Osztaly({ n, felso }: { n: number; felso?: boolean }) {
  return (
    <div className={`card osz${felso ? ' felso' : ''}`}>
      <span className="num">{n}.</span>
      <strong>{n}. osztály</strong>
      <small>SZMK: {szmk.tagok[n - 1].tagok.join(', ')}</small>
    </div>
  );
}

export default function Page() {
  return (
    <PageLayout title="Osztályaink" section="iskolank" path="/osztalyaink/" lead="Iskolánkban évfolyamonként egy osztály működik: alsó tagozaton négy, felső tagozaton négy osztályban tanulnak diákjaink.">
      <h2>Alsó tagozat</h2>
      <p className="muted">1–4. évfolyam · napközi, német nyelv a 2. osztálytól, kötelező úszásoktatás a 4. évfolyamon.</p>
      <div className="grid grid-4" style={{ marginBottom: '2.5rem' }}>{[1, 2, 3, 4].map((n) => <Osztaly key={n} n={n} />)}</div>
      <h2>Felső tagozat</h2>
      <p className="muted">5–8. évfolyam · tanulószoba, szakkörök, erdei iskola, Határtalanul program a 7. osztályban.</p>
      <div className="grid grid-4">{[5, 6, 7, 8].map((n) => <Osztaly key={n} n={n} felso />)}</div>
      <div className="notice" style={{ marginTop: '2.5rem' }}>
        <p>Az osztályok órarendjei a <a href="/dokumentumok/or.pdf" target="_blank" rel="noopener">2026/27. tanév I. félévi órarend</a> dokumentumban, a pedagógusok elérhetőségei a <Link href="/fogadoorak/">fogadóórák</Link> oldalon találhatók.</p>
      </div>
    </PageLayout>
  );
}
