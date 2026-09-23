import NewsCard from './NewsCard';
import Pagination from './Pagination';
import type { Hir } from '@/lib/util';

export default function NewsList({ items, page, total, base }: { items: Hir[]; page: number; total: number; base: string }) {
  return (
    <>
      <div className="grid grid-3">
        {items.map((h, i) => <NewsCard key={h.slug} hir={h} eager={page === 1 && i < 3} />)}
      </div>
      <Pagination current={page} total={total} base={base} />
    </>
  );
}
