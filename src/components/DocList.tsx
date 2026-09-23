import type { Doc } from '@/data/iskola';

export default function DocList({ docs }: { docs: Doc[] }) {
  const kind = (href: string) => (href.includes('drive.google') ? 'drive' : href.startsWith('http') ? 'ext' : 'pdf');
  return (
    <div className="doc-list">
      {docs.map((d) => {
        const k = kind(d.href);
        return (
          <a key={d.href} className="card doc" href={d.href} target="_blank" rel="noopener">
            <span className={`ico ${k === 'drive' ? 'drive' : ''}`}>{k === 'drive' ? 'DRIVE' : 'PDF'}</span>
            <span>
              <span className="t">{d.cim}</span>
              {d.leiras && <span className="s"><br />{d.leiras}</span>}
              {k === 'drive' && <span className="s"><br />Google Drive megosztás</span>}
              {k === 'ext' && <span className="s"><br />Régi honlapon tárolt fájl</span>}
            </span>
            <svg className="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
          </a>
        );
      })}
    </div>
  );
}
