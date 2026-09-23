import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import SideNav from '@/components/SideNav';
import NewsCard from '@/components/NewsCard';
import JsonLd from '@/components/JsonLd';
import ArticleZoom from '@/components/ArticleZoom';
import PrintButton from '@/components/PrintButton';
import { hirek, formatDate, categoryLabel, tanev, abs } from '@/lib/util';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return hirek.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const hir = hirek.find((h) => h.slug === slug);
  if (!hir) return {};
  const desc = hir.excerpt || `${hir.title} – Zsirai Általános Iskola`;
  return {
    title: hir.title, description: desc, alternates: { canonical: `/hirek/${hir.slug}/` },
    openGraph: { type: 'article', title: hir.title, description: desc, publishedTime: hir.date ?? undefined, images: hir.cover ? [hir.cover] : undefined },
  };
}

export default async function HirPage({ params }: { params: Params }) {
  const { slug } = await params;
  const hir = hirek.find((h) => h.slug === slug);
  if (!hir) notFound();
  const list = hir.category === 'archivum' ? hirek.filter((h) => h.category === 'archivum') : hirek.filter((h) => h.category !== 'archivum');
  const idx = list.findIndex((h) => h.slug === hir.slug);
  const prev = list[idx + 1];
  const next = list[idx - 1];
  const start = Math.max(0, idx - 1);
  const related = list.filter((h) => h.slug !== hir.slug && h.cover).slice(start, start + 3);
  const listHref = hir.category === 'archivum' ? '/archivum/' : '/hirek/';
  const listLabel = hir.category === 'archivum' ? 'Archívum' : 'Hírek';

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'NewsArticle', headline: hir.title, datePublished: hir.date ?? undefined, inLanguage: 'hu',
        image: hir.cover ? [abs(hir.cover)] : undefined, mainEntityOfPage: abs(`/hirek/${hir.slug}/`),
        author: { '@type': 'Organization', name: 'Zsirai Általános Iskola' }, publisher: { '@type': 'Organization', name: 'Zsirai Általános Iskola' },
      }} />
      <PageHero title={hir.title} path={`/hirek/${hir.slug}/`} crumbs={[{ label: listLabel, href: listHref }]} eyebrow={`${categoryLabel(hir.category)} · ${tanev(hir.date)}. tanév`}>
        <p className="lead"><time dateTime={hir.date ?? undefined}>{formatDate(hir.date)}</time></p>
      </PageHero>
      <div className="container page-body">
        <div className="layout-side">
          <article>
            <div className="article-tools">
              <Link className="chip" href={listHref}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6" /></svg> Vissza: {listLabel}</Link>
              <PrintButton />
            </div>
            <div className="prose card article-body" dangerouslySetInnerHTML={{ __html: hir.html }} />
            <ArticleZoom />
            <nav className="prevnext" aria-label="Előző / következő bejegyzés">
              {prev ? <Link href={`/hirek/${prev.slug}/`} className="card pn"><small>← Régebbi</small><span>{prev.title}</span></Link> : <span />}
              {next ? <Link href={`/hirek/${next.slug}/`} className="card pn right"><small>Újabb →</small><span>{next.title}</span></Link> : <span />}
            </nav>
            {related.length > 0 && (
              <section style={{ marginTop: '3rem' }}>
                <h2 style={{ fontSize: '1.4rem' }}>További bejegyzések</h2>
                <div className="grid grid-3">{related.map((h) => <NewsCard key={h.slug} hir={h} />)}</div>
              </section>
            )}
          </article>
          <SideNav />
        </div>
      </div>
    </>
  );
}
