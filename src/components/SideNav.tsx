'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { iskolankMenu, informaciokMenu, KRETA_URL } from '@/data/nav';
import { iskola } from '@/data/iskola';

export type Section = 'iskolank' | 'informaciok' | 'none';

export default function SideNav({ section = 'none' }: { section?: Section }) {
  const path = usePathname() ?? '/';
  const menu = section === 'iskolank' ? iskolankMenu : section === 'informaciok' ? informaciokMenu : [];
  const title = section === 'iskolank' ? 'Iskolánk' : 'Információk';
  return (
    <aside className="aside">
      {menu.length > 0 && (
        <div className="card">
          <h3>{title}</h3>
          <ul>{menu.map((m) => <li key={m.href}><Link href={m.href} aria-current={path === m.href ? 'page' : undefined}>{m.label}</Link></li>)}</ul>
        </div>
      )}
      <div className="card">
        <h3>Elérhetőség</h3>
        <p style={{ margin: '0 0 .5rem' }}><strong>{iskola.nev}</strong><br />{iskola.cim}</p>
        <p style={{ margin: '0 0 .5rem' }}>Tel.: <a href={iskola.telefonHref}>{iskola.telefon}</a><br />Fax: {iskola.fax}<br />OM: {iskola.om}</p>
        <Link className="btn btn-outline" href="/elerhetosegeink/" style={{ marginTop: '.5rem' }}>Kapcsolat, térkép</Link>
      </div>
      <div className="card">
        <h3>E-napló</h3>
        <p style={{ margin: '0 0 .75rem' }}>Jegyek, hiányzások, üzenetek a KRÉTA rendszerben.</p>
        <a className="btn btn-sun" href={KRETA_URL} target="_blank" rel="noopener">Belépés a KRÉTA-ba</a>
      </div>
      <div className="card side-badges">
        <img src="/images/de4d03d9_penz7.webp" alt="Iskolánk Pénz7 iskola" loading="lazy" />
        <img src="/images/79c39a6c_h1.webp" alt="Határtalanul" loading="lazy" />
      </div>
    </aside>
  );
}
