import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Az oldal nem található', robots: { index: false } };

export default function NotFound() {
  return (
    <div className="container page-body center" style={{ paddingBlock: '6rem' }}>
      <span className="eyebrow">404</span>
      <h1>Ez az oldal nem található</h1>
      <p className="muted" style={{ maxWidth: '48ch', marginInline: 'auto' }}>Lehet, hogy a link elavult, vagy az oldal a régi honlapról még nem került át. Próbálja a címlapot vagy a híreket.</p>
      <div className="chip-row" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
        <Link className="btn btn-primary" href="/">Címlap</Link>
        <Link className="btn btn-outline" href="/hirek/">Hírek</Link>
        <Link className="btn btn-outline" href="/elerhetosegeink/">Elérhetőségeink</Link>
      </div>
    </div>
  );
}
