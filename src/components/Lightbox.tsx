'use client';

import { useCallback, useEffect, useState } from 'react';
import type { AlbumImage } from '@/lib/util';

export default function Lightbox({ images }: { images: AlbumImage[] }) {
  const [i, setI] = useState<number | null>(null);
  const open = i !== null;
  const show = useCallback((n: number) => setI((n + images.length) % images.length), [images.length]);
  const close = () => setI(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(i! - 1);
      if (e.key === 'ArrowRight') show(i! + 1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, i, show]);

  let sx = 0;
  return (
    <>
      <div className="masonry" id="gallery">
        {images.map((im, n) => (
          <a key={im.src} href={im.src} aria-label={`${n + 1}. kép megnyitása`} onClick={(e) => { e.preventDefault(); setI(n); }}>
            <img src={im.thumb} alt={im.alt} width={im.w} height={im.h} loading={n < 6 ? 'eager' : 'lazy'} decoding="async" />
          </a>
        ))}
      </div>
      <div className={`lb${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Kép nagyítása"
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        onTouchStart={(e) => { sx = e.touches[0].clientX; }}
        onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - sx; if (open && Math.abs(dx) > 50) show(dx < 0 ? i! + 1 : i! - 1); }}>
        <button className="close" aria-label="Bezárás" onClick={close}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
        <button className="prev" aria-label="Előző kép" onClick={() => show(i! - 1)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        {open && <img src={images[i!].src} alt={images[i!].alt} />}
        <button className="next" aria-label="Következő kép" onClick={() => show(i! + 1)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6" /></svg>
        </button>
        <div className="count">{open ? `${i! + 1} / ${images.length}` : ''}</div>
      </div>
    </>
  );
}
