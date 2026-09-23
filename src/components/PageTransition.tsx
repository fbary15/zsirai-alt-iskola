'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/** Finom beúszás minden oldalváltáskor (a kulcs az útvonal, így a CSS animáció újraindul). */
export default function PageTransition({ children }: { children: ReactNode }) {
  const path = usePathname();
  return <div key={path} className="page-enter">{children}</div>;
}
