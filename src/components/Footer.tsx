import Link from 'next/link';
import Logo from './Logo';
import { iskola } from '@/data/iskola';
import { iskolankMenu, informaciokMenu, KRETA_URL } from '@/data/nav';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="col brand-col">
          <Link className="brand" href="/"><Logo size={40} /> <strong>Zsirai Általános Iskola</strong></Link>
          <p>{iskola.szlogen}. Nyolc évfolyamos általános iskola, 1991 óta jelenlegi formájában.</p>
          <address>
            <div>{iskola.cim}</div>
            <div>Telefon: <a href={iskola.telefonHref}>{iskola.telefon}</a> · Fax: {iskola.fax}</div>
            <div>OM azonosító: {iskola.om}</div>
          </address>
        </div>
        <div className="col">
          <h4>Iskolánk</h4>
          <ul>{iskolankMenu.map((i) => <li key={i.href}><Link href={i.href}>{i.label}</Link></li>)}</ul>
        </div>
        <div className="col">
          <h4>Információk</h4>
          <ul>{informaciokMenu.map((i) => <li key={i.href}><Link href={i.href}>{i.label}</Link></li>)}</ul>
        </div>
        <div className="col">
          <h4>Hasznos</h4>
          <ul>
            <li><Link href="/hirek/">Hírek</Link></li>
            <li><Link href="/archivum/">Archívum</Link></li>
            <li><Link href="/galeria/">Galéria</Link></li>
            <li><Link href="/elerhetosegeink/">Elérhetőségeink</Link></li>
            <li><a href={KRETA_URL} target="_blank" rel="noopener">KRÉTA elektronikus ellenőrző</a></li>
          </ul>
          <div className="f-badges">
            <img src="/images/de4d03d9_penz7.webp" alt="Iskolánk Pénz7 iskola" width="120" loading="lazy" />
            <img src="/images/79c39a6c_h1.webp" alt="Határtalanul program" width="120" loading="lazy" />
          </div>
        </div>
      </div>
      <div className="container bottom">
        <span>{iskola.copyright} · {year}</span>
        <span>Fenntartó: {iskola.fenntarto.nev}</span>
      </div>
    </footer>
  );
}
