'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

/**
 * Lenis smooth scroll (mindig aktív) + görgetési folyamatjelző + reveal-on-scroll
 * + zsugorodó fejléc (body.scrolled) + "vissza a tetejére" gomb.
 * A reveal animációk prefers-reduced-motion esetén kikapcsolnak, a görgetés akkor is sima marad.
 */
export default function SmoothScroll() {
  const path = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: true,
      syncTouch: false,
      autoResize: true,
    });
    lenisRef.current = lenis;
    (window as unknown as { lenis: Lenis }).lenis = lenis;
    let raf = requestAnimationFrame(function loop(t) { lenis.raf(t); raf = requestAnimationFrame(loop); });

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
        document.body.classList.toggle('scrolled', y > 40);
        setShowTop(y > 600);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || a.getAttribute('href') === '#') return;
      const el = document.querySelector<HTMLElement>(a.getAttribute('href')!);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -90, duration: 1.2 });
      history.pushState(null, '', a.getAttribute('href'));
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onClick);
    };
  }, []);

  // Oldalváltáskor: tetejére, reveal újra
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = document.querySelectorAll<HTMLElement>('.card, .section-head, .prose, .timeline > li, .doc, .album, .masonry > a, .stat, .person');
    if (reduce || !('IntersectionObserver' in window)) { items.forEach((el) => el.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    items.forEach((el, i) => {
      if (el.classList.contains('is-in')) return;
      el.classList.add('reveal');
      el.style.setProperty('--d', `${Math.min((i % 6) * 55, 275)}ms`);
      io.observe(el);
    });
    const id = requestAnimationFrame(() => items.forEach((el) => { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in'); }));
    return () => { cancelAnimationFrame(id); io.disconnect(); };
  }, [path]);

  return (
    <>
      <div className="scroll-progress" ref={barRef} aria-hidden="true" />
      <button className="to-top" aria-label="Vissza a tetejére" hidden={!showTop}
        onClick={() => lenisRef.current ? lenisRef.current.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m18 15-6-6-6 6" /></svg>
      </button>
    </>
  );
}
