import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { fogadoorak, napokSorrend, iskola } from '@/data/iskola';

export const metadata: Metadata = {
  title: 'Fogadóórák',
  description: 'Pedagógusaink fogadóórái napokra bontva. Kérjük, előzetesen telefonon egyeztessenek!',
  alternates: { canonical: '/fogadoorak/' },
};

export default function Page() {
  const byDay = napokSorrend.map((nap) => ({ nap, list: fogadoorak.filter((f) => f.nap === nap).sort((a, b) => a.tol.localeCompare(b.tol, 'hu', { numeric: true })) }));
  return (
    <PageLayout title="Fogadóórák" section="iskolank" path="/fogadoorak/" lead="Pedagógusaink fogadóórái. Kérjük, hogy előzetesen szíveskedjenek telefonon egyeztetni!">
      <div className="notice"><p>Időpont egyeztetés: <a href={iskola.telefonHref}><strong>{iskola.telefon}</strong></a> (iskolatitkárság)</p></div>
      <div className="days">
        {byDay.map((d) => (
          <section key={d.nap} className="card day">
            <h3>{d.nap.charAt(0).toUpperCase() + d.nap.slice(1)}</h3>
            <ul className="list-clean">
              {d.list.map((f) => <li key={f.nev}><span className="t">{f.tol}–{f.ig}</span><span className="n">{f.nev}</span></li>)}
            </ul>
          </section>
        ))}
      </div>
      <h2 style={{ marginTop: '2.5rem' }}>Névsor szerint</h2>
      <table className="table">
        <thead><tr><th>Pedagógus</th><th>Nap</th><th>Időpont</th></tr></thead>
        <tbody>{fogadoorak.map((f) => <tr key={f.nev}><td>{f.nev}</td><td>{f.nap}</td><td>{f.tol} – {f.ig}</td></tr>)}</tbody>
      </table>
    </PageLayout>
  );
}
