import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';

export const metadata: Metadata = {
  title: 'Galagonya Alapítvány',
  description: 'Az iskolát támogató közhasznú Galagonya Alapítvány céljai, tevékenységei, adószáma az 1% felajánlásához.',
  alternates: { canonical: '/galagonya/' },
};

export default function Page() {
  return (
    <PageLayout title="Galagonya Alapítvány" section="iskolank" path="/galagonya/" lead="Az iskolát támogató közhasznú alapítvány – céljai, tevékenységei, adószáma az 1% felajánlásához.">
      <div className="galag-top">
        <img src="/images/1739f8a3_galagonya.webp" alt="Galagonya Alapítvány" width={171} height={154} />
        <blockquote>
          <p>„Jó érzés, ha szülőként, tanárként hozzájárulhatunk egy másik ember életének tartalmasabbá tételéhez. Szívderítő dolog figyelemmel követni, hogyan vesz át egy fiatal a tanítási kapcsolat során valami olyan új dolgot, ami kitágítja világa határait és bővíti készségeinek tárát.”</p>
          <footer>— Thomas Gordon</footer>
        </blockquote>
      </div>
      <div className="card ado">
        <span className="eyebrow">Támogassa adója 1%-ával!</span>
        <strong>Adószám: 18982734-1-08</strong>
        <p>Alapítványunk 2005-től működő, közhasznú szervezet. A GSD Agrárprodukt Kft. 1 millió forinttal alapította. Az 1%-os támogatásból 2009-ben 227 372 Ft gyűlt össze – köszönet minden támogatónak!</p>
      </div>
      <div className="grid grid-2">
        <div className="card galag-box">
          <h3>Céljai</h3>
          <ul>
            <li>az ifjúság nevelésének, oktatásának, képességfejlesztésének elősegítése és támogatása;</li>
            <li>Zsira községben és a környéken élők kulturális életének szervezése, támogatása;</li>
            <li>a fiatalok sportolásának segítése, támogatása.</li>
          </ul>
        </div>
        <div className="card galag-box">
          <h3>Tevékenységei</h3>
          <ul>
            <li>az erdei iskola szervezésének támogatása</li>
            <li>úszásoktatás támogatása</li>
            <li>művészeti oktatás támogatása</li>
            <li>Östör Antal regionális szavalóverseny támogatása</li>
            <li>a 2009. évi működési pályázaton elnyert összegből 16 egyszemélyes tanulói asztal vásárlása</li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
}
