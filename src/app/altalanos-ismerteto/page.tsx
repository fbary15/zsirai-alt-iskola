import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { pages } from '@/lib/util';

export const metadata: Metadata = {
  title: 'Általános ismertető',
  description: 'Nyolc évfolyamos általános iskola Zsirán – bemutatkozás, speciális tevékenységeink, személyi és tárgyi feltételeink.',
  alternates: { canonical: '/altalanos-ismerteto/' },
};

export default function Page() {
  const p = pages['altalanos-ismerteto'];
  return (
    <PageLayout title="Általános ismertető" section="iskolank" path="/altalanos-ismerteto/" lead="Nyolc évfolyamos általános iskola Zsirán – bemutatkozás, speciális tevékenységeink, személyi és tárgyi feltételeink.">
      <div className="stats">
        <div className="card stat"><strong>8</strong><span>évfolyamos általános iskola</span></div>
        <div className="card stat"><strong>1991</strong><span>óta jelenlegi formájában</span></div>
        <div className="card stat"><strong>12</strong><span>pedagógus, 98%-os szakos ellátottság</span></div>
        <div className="card stat"><strong>4</strong><span>tanterem interaktív táblával</span></div>
      </div>
      <div className="prose card prose-card" dangerouslySetInnerHTML={{ __html: p.html }} />
    </PageLayout>
  );
}
