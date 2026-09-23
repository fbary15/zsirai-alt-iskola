import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import DocList from '@/components/DocList';
import { nyomtatvanyok } from '@/data/iskola';

export const metadata: Metadata = {
  title: 'Letölthető nyomtatványok',
  description: 'Kikérők és kérelmek a 16 óráig tartó foglalkozások alóli felmentéshez.',
  alternates: { canonical: '/letoltheto-nyomtatvanyok/' },
};

export default function Page() {
  return (
    <PageLayout title="Letölthető nyomtatványok" section="informaciok" path="/letoltheto-nyomtatvanyok/" lead="Kikérők és kérelmek a 16 óráig tartó foglalkozások alóli felmentéshez.">
      <div className="prose" style={{ marginBottom: '1.5rem' }}>
        <p><strong>Tisztelt Szülők!</strong></p>
        <p>A Közoktatási Törvény hatályos rendelkezései alapján az általános iskolákban a foglalkozások minden gyermek számára 16 óráig tartanak. Amennyiben Önök azt szeretnék, hogy gyermekük ez alól tartósan, illetve alkalmilag mentesüljön, kérjük, hogy az alábbi linkekről letöltött, kinyomtatott és kitöltött dokumentumokat gyermekük osztályfőnökéhez visszaküldeni szíveskedjenek!</p>
      </div>
      <DocList docs={nyomtatvanyok} />
    </PageLayout>
  );
}
