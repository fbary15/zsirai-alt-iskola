import Link from 'next/link';
import type { ReactNode } from 'react';
import JsonLd from './JsonLd';
import { abs } from '@/lib/util';

export type Crumb = { label: string; href?: string };

export default function PageHero({ title, lead, crumbs = [], eyebrow, children, path }:
  { title: string; lead?: string; crumbs?: Crumb[]; eyebrow?: string; children?: ReactNode; path?: string }) {
  const ld = path ? {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [{ label: 'Címlap', href: '/' }, ...crumbs.filter((c) => c.href), { label: title, href: path }]
      .map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: abs(c.href!) })),
  } : null;
  return (
    <section className="page-hero">
      {ld && <JsonLd data={ld} />}
      <div className="container">
        <nav className="crumbs" aria-label="Morzsamenü">
          <Link href="/">Címlap</Link>
          {crumbs.map((c, i) => (
            <span key={i} style={{ display: 'contents' }}>
              <span aria-hidden="true">›</span>
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
          <span aria-hidden="true">›</span><span>{title}</span>
        </nav>
        {eyebrow && <span className="eyebrow" style={{ color: 'var(--sun)' }}>{eyebrow}</span>}
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
