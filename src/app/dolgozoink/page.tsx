import type { Metadata } from 'next';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { pedagogusok, segitok, technikai, type Person } from '@/data/iskola';

export const metadata: Metadata = {
  title: 'Dolgozóink',
  description: 'Pedagógusaink, a nevelő-oktató munkát közvetlenül segítő munkatársaink és technikai dolgozóink.',
  alternates: { canonical: '/dolgozoink/' },
};

const initials = (n: string) => n.replace(/^Dr\.\s*/, '').split(/\s+/).slice(0, 2).map((w) => w[0]).join('');

function People({ list, sun }: { list: Person[]; sun?: boolean }) {
  return (
    <div className="grid grid-2" style={{ marginBottom: '2.5rem' }}>
      {list.map((p) => (
        <div key={p.nev} className="card person">
          <span className={`avatar${sun ? ' sun' : ''}`}>{initials(p.nev)}</span>
          <div>
            <div className="name">{p.nev}</div>
            <div className="role">{p.szak}</div>
            {p.extra && <div className="extra">{p.extra}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <PageLayout title="Dolgozóink" section="iskolank" path="/dolgozoink/" lead="Pedagógusaink, a nevelő-oktató munkát közvetlenül segítő munkatársaink és technikai dolgozóink.">
      <h2>Pedagógusok</h2>
      <People list={pedagogusok} />
      <h2>Nevelő és oktató munkát közvetlenül segítő dolgozók</h2>
      <People list={segitok} sun />
      <h2>Technikai dolgozók</h2>
      <People list={technikai} sun />
      <p><Link className="btn btn-primary" href="/fogadoorak/">Fogadóórák megtekintése</Link></p>
    </PageLayout>
  );
}
