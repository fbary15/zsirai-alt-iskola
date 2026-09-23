export type NavItem = { label: string; href: string; external?: boolean; children?: NavItem[] };

export const KRETA_URL = 'https://klik030687001.e-kreta.hu/Adminisztracio/Login';

export const nav: NavItem[] = [
  { label: 'Címlap', href: '/' },
  {
    label: 'Iskolánk',
    href: '/altalanos-ismerteto/',
    children: [
      { label: 'Általános ismertető', href: '/altalanos-ismerteto/' },
      { label: 'Osztályaink', href: '/osztalyaink/' },
      { label: 'Dolgozóink', href: '/dolgozoink/' },
      { label: 'Fogadóórák', href: '/fogadoorak/' },
      { label: 'Diákönkormányzat', href: '/diakonkormanyzat/' },
      { label: 'Szülői munkaközösség', href: '/szuloi-munkakozosseg/' },
      { label: 'Partnereink', href: '/partnereink/' },
      { label: 'Galagonya Alapítvány', href: '/galagonya/' },
    ],
  },
  {
    label: 'Információk',
    href: '/tanev-rendje/',
    children: [
      { label: 'A tanév rendje', href: '/tanev-rendje/' },
      { label: 'Tanügyi információk', href: '/tanugyi-informaciok/' },
      { label: 'Körzeti általános iskola', href: '/korzeti-altalanos-iskola/' },
      { label: 'Személyi igazolványokról', href: '/szemelyi-igazolvanyokrol/' },
      { label: 'Letölthető nyomtatványok', href: '/letoltheto-nyomtatvanyok/' },
      { label: 'Dokumentumok', href: '/dokumentumok/' },
      { label: 'Fizika – gyakorló anyagok', href: '/fizika/' },
    ],
  },
  { label: 'Hírek', href: '/hirek/', children: [
      { label: 'Aktuális hírek', href: '/hirek/' },
      { label: 'Archívum', href: '/archivum/' },
  ] },
  { label: 'Galéria', href: '/galeria/' },
  { label: 'Elérhetőségeink', href: '/elerhetosegeink/' },
];

export const iskolankMenu = nav[1].children!;
export const informaciokMenu = nav[2].children!;
