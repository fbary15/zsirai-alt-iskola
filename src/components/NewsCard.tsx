import Link from 'next/link';
import { type Hir, formatDate, categoryLabel } from '@/lib/util';

export default function NewsCard({ hir, eager = false }: { hir: Hir; eager?: boolean }) {
  const thumb = hir.coverThumb ?? hir.cover;
  return (
    <Link className="card news-card" href={`/hirek/${hir.slug}/`}>
      <div className="thumb">
        {hir.cover ? (
          <img src={thumb!} srcSet={`${thumb} 640w, ${hir.cover} 1600w`} sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 380px"
            alt="" width={640} height={400} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 22h16M4 4h16v18H4z" /><path d="M8 8h8M8 12h8M8 16h5" /></svg>
        )}
      </div>
      <div className="body">
        <div className="meta">
          <span className={`tag ${hir.category === 'info' ? '' : hir.category === 'archivum' ? 'grey' : 'sun'}`}>{categoryLabel(hir.category)}</span>
          <time dateTime={hir.date ?? undefined}>{formatDate(hir.date)}</time>
        </div>
        <h3>{hir.title}</h3>
        {hir.excerpt && <p>{hir.excerpt}</p>}
        <span className="more">Tovább olvasom →</span>
      </div>
    </Link>
  );
}
