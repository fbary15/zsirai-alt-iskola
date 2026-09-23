'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { formatDate, categoryLabel, tanev } from '@/lib/util';

export type NewsMeta = { slug: string; title: string; date: string | null; category: 'info' | 'aktualis' | 'archivum'; cover: string | null; excerpt: string };

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/** Kereső + szűrő az összes hír fölött (csak metaadatokkal dolgozik, kliensoldalon). */
export default function NewsBrowser({ items }: { items: NewsMeta[] }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<'' | 'info' | 'aktualis'>('');
  const [ev, setEv] = useState('');
  const evek = useMemo(() => [...new Set(items.map((i) => tanev(i.date)).filter(Boolean))], [items]);
  const active = q.trim().length > 1 || cat || ev;
  const res = useMemo(() => {
    if (!active) return [];
    const nq = norm(q.trim());
    return items.filter((i) =>
      (!cat || i.category === cat) && (!ev || tanev(i.date) === ev) &&
      (!nq || norm(i.title).includes(nq) || norm(i.excerpt).includes(nq)),
    );
  }, [items, q, cat, ev, active]);

  return (
    <div className="news-browser card">
      <div className="nb-row">
        <label className="nb-search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input type="search" placeholder="Keresés a hírek között…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Keresés a hírek között" />
        </label>
        <select value={cat} onChange={(e) => setCat(e.target.value as typeof cat)} aria-label="Kategória">
          <option value="">Minden kategória</option>
          <option value="info">Információ</option>
          <option value="aktualis">Aktuális</option>
        </select>
        <select value={ev} onChange={(e) => setEv(e.target.value)} aria-label="Tanév">
          <option value="">Minden tanév</option>
          {evek.map((e) => <option key={e} value={e}>{e}. tanév</option>)}
        </select>
        {active && <button type="button" className="btn btn-outline nb-clear" onClick={() => { setQ(''); setCat(''); setEv(''); }}>Törlés</button>}
      </div>
      {active && (
        <div className="nb-results" aria-live="polite">
          <p className="muted nb-count">{res.length ? `${res.length} találat` : 'Nincs találat.'}</p>
          <ul className="list-clean">
            {res.slice(0, 40).map((i) => (
              <li key={i.slug}>
                <Link href={`/hirek/${i.slug}/`}>
                  {i.cover ? <img src={i.cover} alt="" loading="lazy" /> : <span className="nb-ph" />}
                  <span>
                    <span className="nb-meta"><span className={`tag ${i.category === 'info' ? '' : 'sun'}`}>{categoryLabel(i.category)}</span> {formatDate(i.date)}</span>
                    <strong>{i.title}</strong>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {res.length > 40 && <p className="muted">Az első 40 találatot mutatjuk, szűkítse a keresést.</p>}
        </div>
      )}
    </div>
  );
}
