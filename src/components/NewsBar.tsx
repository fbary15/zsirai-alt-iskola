import Link from 'next/link';
import { aktualisHirek, formatDate } from '@/lib/util';

/** Vékony hírsáv a fejléc alatt: a legfrissebb bejegyzés. */
export default function NewsBar() {
  const h = aktualisHirek[0];
  if (!h) return null;
  return (
    <div className="newsbar">
      <div className="container newsbar-in">
        <span className="nb-label"><span className="dot" />Friss</span>
        <Link href={`/hirek/${h.slug}/`} className="nb-link"><strong>{h.title}</strong><span className="nb-date"> · {formatDate(h.date)}</span></Link>
        <Link href="/tanev-rendje/" className="nb-side">Tanév rendje →</Link>
      </div>
    </div>
  );
}
