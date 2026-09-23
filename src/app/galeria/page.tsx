import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { galeria } from '@/lib/util';

export const metadata: Metadata = {
  title: 'Galéria',
  description: 'Képgaléria a Zsirai Általános Iskola életéből: farsang, nyelvi napok, erdei iskola, pályaorientációs napok.',
  alternates: { canonical: '/galeria/' },
};

export default function GaleriaPage() {
  const albums = [...galeria].reverse();
  const total = galeria.reduce((n, g) => n + g.images.length, 0);
  return (
    <>
      <PageHero title="Galéria" path="/galeria/" lead={`${albums.length} album, ${total} kép az iskola életéből.`} />
      <div className="container page-body">
        <div className="grid grid-3">
          {albums.map((a) => (
            <Link key={a.slug} className="card album" href={`/galeria/${a.slug}/`}>
              {a.cover ? <img src={a.images[0].thumb} alt="" width={640} height={480} loading="lazy" decoding="async" /> : <div style={{ background: 'var(--green-50)', height: '100%' }} />}
              <span className="cap">{a.title}<small>{a.images.length} kép{a.year ? ` · ${a.year}` : ''}</small></span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
