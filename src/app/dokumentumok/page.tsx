import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import DocList from '@/components/DocList';
import { dokumentumok, nyomtatvanyok } from '@/data/iskola';

export const metadata: Metadata = {
  title: 'Dokumentumok',
  description: 'Az iskola alapdokumentumai: munkaterv, házirend, pedagógiai program, SZMSZ, közzétételi lista és eljárásrendek.',
  alternates: { canonical: '/dokumentumok/' },
};

export default function Page() {
  return (
    <PageLayout title="Dokumentumok" section="informaciok" path="/dokumentumok/" lead="Az iskola alapdokumentumai: munkaterv, házirend, pedagógiai program, SZMSZ, közzétételi lista és eljárásrendek.">
      <DocList docs={dokumentumok} />
      <h2 style={{ marginTop: '2.5rem' }}>Órarend</h2>
      <DocList docs={[{ cim: 'Órarendek – 2026/2027. tanév I. félév', href: '/dokumentumok/or.pdf' }]} />
      <h2 style={{ marginTop: '2.5rem' }}>Nyomtatványok</h2>
      <DocList docs={nyomtatvanyok} />
    </PageLayout>
  );
}
