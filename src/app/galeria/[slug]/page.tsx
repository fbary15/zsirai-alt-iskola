import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import Lightbox from '@/components/Lightbox';
import { galeria } from '@/lib/util';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return galeria.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const album = galeria.find((g) => g.slug === slug);
  if (!album) return {};
  return {
    title: album.title, description: `${album.title} – ${album.images.length} kép a Zsirai Általános Iskola galériájából.`,
    alternates: { canonical: `/galeria/${album.slug}/` }, openGraph: { images: album.cover ? [album.cover] : undefined },
  };
}

export default async function AlbumPage({ params }: { params: Params }) {
  const { slug } = await params;
  const idx = galeria.findIndex((g) => g.slug === slug);
  if (idx < 0) notFound();
  const album = galeria[idx];
  const prev = galeria[idx + 1];
  const next = galeria[idx - 1];
  return (
    <>
      <PageHero title={album.title} path={`/galeria/${album.slug}/`} lead={`${album.images.length} kép${album.year ? ` · ${album.year}` : ''}`} crumbs={[{ label: 'Galéria', href: '/galeria/' }]} />
      <div className="container page-body">
        <Lightbox images={album.images} />
        <nav className="albnav">
          {prev ? <Link className="btn btn-outline" href={`/galeria/${prev.slug}/`}>← {prev.title}</Link> : <span />}
          <Link className="btn btn-primary" href="/galeria/">Összes album</Link>
          {next ? <Link className="btn btn-outline" href={`/galeria/${next.slug}/`}>{next.title} →</Link> : <span />}
        </nav>
      </div>
    </>
  );
}
