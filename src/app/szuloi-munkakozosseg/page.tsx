import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { szmk } from '@/data/iskola';

export const metadata: Metadata = {
  title: 'Szülői munkaközösség',
  description: 'A szülői munkaközösség elnöke és osztályonként választott tagjai.',
  alternates: { canonical: '/szuloi-munkakozosseg/' },
};

export default function Page() {
  return (
    <PageLayout title="Szülői munkaközösség" section="iskolank" path="/szuloi-munkakozosseg/" lead="A szülői munkaközösség osztályonként választott tagjai segítik az iskola rendezvényeit, programjait.">
      <div className="card person" style={{ marginBottom: '2rem', maxWidth: 420 }}><span className="avatar sun">RA</span><div><div className="name">{szmk.elnok}</div><div className="role">az SZMK elnöke</div></div></div>
      <h2>Tagok osztályonként</h2>
      <div className="grid grid-2">
        {szmk.tagok.map((t) => (
          <div key={t.osztaly} className="card szmk-osz">
            <strong>{t.osztaly}</strong>
            <ul className="list-clean">{t.tagok.map((n) => <li key={n}>{n}</li>)}</ul>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
