import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { tanevRendje } from '@/data/iskola';
import { pages } from '@/lib/util';

export const metadata: Metadata = {
  title: 'A tanév rendje',
  description: `A ${tanevRendje.tanev}. tanév főbb dátumai: szünetek, félévzárás, középiskolai felvételi, beiratkozás és kompetenciamérések.`,
  alternates: { canonical: '/tanev-rendje/' },
};

export default function Page() {
  const p = pages['tanev-rendje'];
  return (
    <PageLayout title="A tanév rendje" section="informaciok" path="/tanev-rendje/" lead={`A ${tanevRendje.tanev}. tanév főbb dátumai: szünetek, félévzárás, középiskolai felvételi, beiratkozás és kompetenciamérések.`}>
      <ul className="timeline" style={{ marginBottom: '2.5rem' }}>
        {tanevRendje.esemenyek.map((e) => (
          <li key={e.mikor + e.mi} className="card"><span className="when">{e.mikor}</span><span><span className="what">{e.mi}</span>{e.megj && <p className="note">{e.megj}</p>}</span></li>
        ))}
      </ul>
      <details className="card details">
        <summary>Részletes tájékoztató (eredeti szöveg)</summary>
        <div className="prose" dangerouslySetInnerHTML={{ __html: p.html }} />
      </details>
      <p style={{ marginTop: '1.5rem' }}><a className="btn btn-outline" href="/dokumentumok/or.pdf" target="_blank" rel="noopener">Órarendek – 2026/27. I. félév (PDF)</a></p>
    </PageLayout>
  );
}
