import type { ReactNode } from 'react';
import PageHero, { type Crumb } from './PageHero';
import SideNav, { type Section } from './SideNav';

export default function PageLayout({ title, lead, section = 'none', crumbs, wide = false, path, children }:
  { title: string; lead?: string; section?: Section; crumbs?: Crumb[]; wide?: boolean; path: string; children: ReactNode }) {
  const autoCrumbs = crumbs ?? (section === 'iskolank' ? [{ label: 'Iskolánk', href: '/altalanos-ismerteto/' }]
    : section === 'informaciok' ? [{ label: 'Információk', href: '/tanev-rendje/' }] : []);
  return (
    <>
      <PageHero title={title} lead={lead} crumbs={autoCrumbs} path={path} />
      <div className="container page-body">
        {wide ? children : (
          <div className="layout-side">
            <div>{children}</div>
            <SideNav section={section} />
          </div>
        )}
      </div>
    </>
  );
}
