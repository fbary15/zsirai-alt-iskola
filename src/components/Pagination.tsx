import Link from 'next/link';

export default function Pagination({ current, total, base }: { current: number; total: number; base: string }) {
  if (total <= 1) return null;
  const href = (n: number) => (n === 1 ? base : `${base}oldal/${n}/`);
  const pages: (number | '…')[] = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || Math.abs(i - current) <= 1) pages.push(i);
    else if (pages[pages.length - 1] !== '…') pages.push('…');
  }
  return (
    <nav className="pagination" aria-label="Lapozás">
      {current > 1 ? <Link href={href(current - 1)} aria-label="Előző oldal">‹</Link> : <span className="disabled">‹</span>}
      {pages.map((p, i) =>
        p === '…' ? <span key={`e${i}`} className="disabled">…</span>
          : p === current ? <span key={p} aria-current="page">{p}</span>
            : <Link key={p} href={href(p)}>{p}</Link>,
      )}
      {current < total ? <Link href={href(current + 1)} aria-label="Következő oldal">›</Link> : <span className="disabled">›</span>}
    </nav>
  );
}
