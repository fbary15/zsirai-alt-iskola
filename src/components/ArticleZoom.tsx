'use client';

import { useEffect, useState } from 'react';

/** A cikk törzsében lévő képek kattintásra nagyítva, sötét háttéren jelennek meg. */
export default function ArticleZoom({ selector = '.article-body img' }: { selector?: string }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const imgs = [...document.querySelectorAll<HTMLImageElement>(selector)].filter((im) => im.naturalWidth > 320 || im.width > 320);
    const handlers = imgs.map((im) => {
      const h = () => setSrc(im.currentSrc || im.src);
      im.classList.add('zoomable');
      im.addEventListener('click', h);
      return () => im.removeEventListener('click', h);
    });
    return () => handlers.forEach((off) => off());
  }, [selector]);

  useEffect(() => {
    document.body.style.overflow = src ? 'hidden' : '';
    if (!src) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSrc(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [src]);

  return (
    <div className={`lb${src ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Kép nagyítása" onClick={() => setSrc(null)}>
      <button className="close" aria-label="Bezárás" onClick={() => setSrc(null)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12" /></svg>
      </button>
      {src && <img src={src} alt="" />}
    </div>
  );
}
