import type { Metadata } from 'next';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { dok } from '@/data/iskola';

export const metadata: Metadata = {
  title: 'Diákönkormányzat',
  description: 'A diákönkormányzat felépítése, képviselői és céljai a Zsirai Általános Iskolában.',
  alternates: { canonical: '/diakonkormanyzat/' },
};

export default function Page() {
  return (
    <PageLayout title="Diákönkormányzat" section="iskolank" path="/diakonkormanyzat/" lead="Az iskolánkban működő és tevékenykedő diákönkormányzat a gyermekek érdekképviseleti szervezete. Feladata, hogy segítse a diákokat problémáik, gondjaik megoldásában.">
      <div className="grid grid-2" style={{ marginBottom: '2rem' }}>
        <div className="card person"><span className="avatar sun">SM</span><div><div className="name">{dok.segitoPedagogus}</div><div className="role">a diákönkormányzat munkáját segítő pedagógus</div></div></div>
        <div className="card person"><span className="avatar">{dok.elnok.split(' ').map((w) => w[0]).join('')}</span><div><div className="name">{dok.elnok}</div><div className="role">elnök</div></div></div>
      </div>
      <h2>Diák képviselők</h2>
      <p className="muted">A tagokat az osztályközösségek évenként választják.</p>
      <table className="table" style={{ marginBottom: '2.5rem' }}>
        <thead><tr><th>Osztály</th><th>Képviselők</th></tr></thead>
        <tbody>{dok.kepviselok.map((k) => <tr key={k.osztaly}><td>{k.osztaly}</td><td>{k.tagok.join(', ')}</td></tr>)}</tbody>
      </table>
      <h2>Diákönkormányzatunk céljai</h2>
      <ol className="goals">{dok.celok.map((c) => <li key={c}>{c}</li>)}</ol>
      <div className="notice" style={{ marginTop: '2rem' }}><p>A DÖK szervezi többek között a papírgyűjtést, a pingpongbajnokságot, a DÖK-mozit és a farsangi programokat – ezekről a <Link href="/hirek/">hírek</Link> között olvashatnak.</p></div>
    </PageLayout>
  );
}
