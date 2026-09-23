import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { pages } from '@/lib/util';

export const metadata: Metadata = {
  title: 'Személyi igazolványokról',
  description: 'Tájékoztató a 14 éven aluli gyermekek személyazonosító igazolványának igényléséről.',
  alternates: { canonical: '/szemelyi-igazolvanyokrol/' },
};

export default function Page() {
  const p = pages['szemelyi-igazolvanyokrol'];
  return (
    <PageLayout title="Személyi igazolványokról" section="informaciok" path="/szemelyi-igazolvanyokrol/" lead="A Közigazgatási és Elektronikus Közszolgáltatások Központi Hivatalának tájékoztatója a 14 éven aluli gyermekek személyazonosító igazolványának igényléséről.">
      <div className="prose card prose-card" dangerouslySetInnerHTML={{ __html: p.html }} />
    </PageLayout>
  );
}
