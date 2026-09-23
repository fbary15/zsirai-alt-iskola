'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { nav, KRETA_URL } from '@/data/nav';
import { iskola } from '@/data/iskola';

export default function Header() {
  const path = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const isActive = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));

  useEffect(() => { setOpen(false); setOpenSub(null); }, [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); setOpenSub(null); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div className="topbar">
        <div className="container topbar-in">
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.7 2z" /></svg>{' '}
            <a href={iskola.telefonHref}>{iskola.telefon}</a>
          </span>
          <span className="sep">·</span>
          <span>OM azonosító: {iskola.om}</span>
          <span className="sep">·</span>
          <span>{iskola.cim}</span>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-in">
          <Link className="brand" href="/">
            <Logo size={46} />
            <span className="brand-text">
              <strong>Zsirai Általános Iskola</strong>
              <small>Zsira · 1991 óta nyolc évfolyammal</small>
            </span>
          </Link>
          <button className="nav-toggle" aria-expanded={open} aria-controls="site-nav" aria-label="Menü" onClick={() => setOpen((o) => !o)}>
            <span></span><span></span><span></span>
          </button>
          <nav className={`site-nav${open ? ' open' : ''}`} id="site-nav" aria-label="Fő navigáció" data-lenis-prevent>
            <ul>
              {nav.map((item) => (
                <li key={item.href} className={item.children ? `has-sub${openSub === item.label ? ' open' : ''}` : ''}>
                  {item.children ? (
                    <>
                      <Link href={item.href} aria-current={isActive(item.href) || item.children.some((c) => isActive(c.href)) ? 'page' : undefined}>{item.label}</Link>
                      <button className="sub-toggle" aria-expanded={openSub === item.label} aria-label={`${item.label} almenü`}
                        onClick={(e) => { e.preventDefault(); setOpenSub((s) => (s === item.label ? null : item.label)); }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6" /></svg>
                      </button>
                      <ul className="sub">
                        {item.children.map((c) => (
                          <li key={c.href}><Link href={c.href} aria-current={path === c.href ? 'page' : undefined}>{c.label}</Link></li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}</Link>
                  )}
                </li>
              ))}
              <li className="cta">
                <a className="btn btn-sun" href={KRETA_URL} target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                  KRÉTA e-napló
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
