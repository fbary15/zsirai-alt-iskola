import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { partnerek } from '@/data/iskola';

export const metadata: Metadata = {
  title: 'Partnereink',
  description: 'Fenntartónk, önkormányzatunk, testvériskolánk és támogatóink.',
  alternates: { canonical: '/partnereink/' },
};

export default function Page() {
  return (
    <PageLayout title="Partnereink" section="iskolank" path="/partnereink/" lead="Fenntartónk, önkormányzatunk, testvériskolánk és támogatóink, akikkel együtt dolgozunk a zsirai gyerekekért.">
      <div className="grid grid-2">
        {partnerek.map((p) => (
          <div key={p.nev} className="card partner">
            {p.logo ? <div className="partner-logo"><img src={p.logo} alt={p.nev} loading="lazy" /></div>
              : <div className="partner-logo ph"><span>{p.nev.split(' ').slice(0, 2).map((w) => w[0]).join('')}</span></div>}
            <div>
              <strong>{p.nev}</strong>
              {p.cim && <div className="muted">{p.cim}</div>}
              {p.url && <a href={p.url} target="_blank" rel="noopener">{p.url.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗</a>}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
