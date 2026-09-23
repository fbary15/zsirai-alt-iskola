import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import DocList from '@/components/DocList';
import { fizikaAnyagok } from '@/data/iskola';

export const metadata: Metadata = {
  title: 'Fizika – gyakorló anyagok',
  description: 'Fizika összefoglalók, kérdés- és gyakorló feladatsorok 7–8. osztályosoknak.',
  alternates: { canonical: '/fizika/' },
};

export default function Page() {
  return (
    <PageLayout title="Fizika – gyakorló anyagok" section="informaciok" path="/fizika/" lead="Kedves tanulni vágyó diákok! Az alábbi linkek alatt a fizika tantárggyal kapcsolatos kérdés-, illetve gyakorló feladatsorokat találhattok. Sok sikert a felkészüléshez!">
      <img src="/images/e719d898_physics.webp" alt="" width={708} height={252} style={{ borderRadius: 'var(--radius)', marginBottom: '1.5rem', width: '100%', objectFit: 'cover', maxHeight: 220 }} />
      <DocList docs={fizikaAnyagok} />
    </PageLayout>
  );
}
