import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import NewsList from '@/components/NewsList';
import { aktualisHirek, PAGE_SIZE } from '@/lib/util';

const total = Math.ceil(aktualisHirek.length / PAGE_SIZE);

export function generateStaticParams() {
  return Array.from({ length: total - 1 }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  return { title: `Hírek – ${page}. oldal`, alternates: { canonical: `/hirek/oldal/${page}/` } };
}

export default async function HirekOldal({ params }: { params: Promise<{ page: string }> }) {
  const page = Number((await params).page);
  const items = aktualisHirek.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <>
      <PageHero title="Hírek, események" path={`/hirek/oldal/${page}/`} lead={`${page}. oldal a ${total}-ból`} crumbs={[{ label: 'Hírek', href: '/hirek/' }]} />
      <div className="container page-body">
        <NewsList items={items} page={page} total={total} base="/hirek/" />
      </div>
    </>
  );
}
