# Zsirai Általános Iskola – új weboldal

A régi Joomla 1.5-ös oldal (https://www.iskola.zsira.hu/) teljes tartalmával és struktúrájával
újraépített [Next.js](https://nextjs.org) (App Router, statikus export) weboldal.

## Futtatás

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # statikus kimenet az out/ mappába
npm run preview    # a build megtekintése (npx serve out)
```

Az `out/` mappa bármilyen webtárhelyre (FTP, Netlify, Cloudflare Pages…) feltölthető, szerveroldali
program nem kell hozzá.

## Szerkezet

| Hely | Tartalom |
| --- | --- |
| `src/app/` | Route-ok (címlap, hírek, iskolánk-aloldalak, információk, galéria, kapcsolat), `robots.ts`, `sitemap.ts` |
| `src/components/` | React komponensek (Header, Footer, NewsCard, Lightbox, SmoothScroll, ContactForm…) |
| `src/styles/` | `global.css` (design tokenek, alapstílusok) és `pages.css` (oldal-specifikus stílusok) |
| `src/data/iskola.ts` | Kézzel karbantartott adatok: dolgozók, fogadóórák, DÖK, SZMK, partnerek, dokumentumok, tanév rendje |
| `src/data/nav.ts` | Menüszerkezet |
| `src/data/hirek.json` | Összes hír (155 db) – a régi oldalról átemelve |
| `src/data/galeria.json` | Galéria albumok |
| `src/data/pages.json` | Régi statikus oldalak HTML-je (Galagonya, tanév rendje, igazolvány tájékoztató…) |
| `public/images/` | Optimalizált képek |
| `public/dokumentumok/` | PDF-ek (házirend, SZMSZ, órarend, nyomtatványok…) |
| `scripts/build_content.py` | A `_crawl/content.json` nyers letöltésből állítja elő a fenti JSON-okat és képeket |
| `_crawl/` | A régi oldal nyers letöltése (nem kerül a buildbe) |

## Új hír felvétele

A `src/data/hirek.json` elejére szúrjon be egy új elemet (`slug`, `title`, `date`, `category`: `info`
vagy `aktualis`, `cover`, `excerpt`, `html`). A képeket a `public/images/` mappába kell tenni.

## Teendők éles indítás előtt

- **Kapcsolati űrlap:** jelenleg a látogató levelezőprogramját nyitja meg. Éles szerveren egy
  levélküldő végpontot (PHP script vagy pl. Formspree) kell beállítani a `src/components/ContactForm.tsx`
  fájlban, és a címzett e-mail címét megadni.
- **Hiányzó fájlok a régi szerveren:** a Fizika oldalon a `7of.pdf`, `8of.pdf`, `7fa.pdf` már a régi
  oldalon is 404-et adott, ezek az iskolától kérendők be.
- **Osztályaink:** a régi oldalon üres volt, az új oldal csak az osztályokat és az SZMK-tagokat sorolja
  fel – osztályfőnökök nevét az iskola adhatja meg.
- **Látogatószámláló** („Ki olvas minket”): statikus oldalon nem értelmezhető, kihagyva.
- A `SITE_URL` (`src/lib/util.ts`) a végleges domainre állítandó.

## Görgetés, mobil, SEO

- **Smooth scroll:** [Lenis](https://lenis.darkroom.engineering/) a `src/components/SmoothScroll.tsx`-ben (mindig aktív),
  görgetési folyamatjelzővel, zsugorodó fejléccel, finom megjelenési animációkkal (`.reveal`) és oldalváltás-animációval.
  `prefers-reduced-motion` esetén az animációk kikapcsolnak, a görgetés sima marad.
- **Extra funkciók:** hírsáv a fejléc alatt (legfrissebb bejegyzés), számláló-animáció a címlapon, kereső és
  kategória/tanév szűrő a Hírek oldalon (`NewsBrowser`), kattintható képnagyítás a cikkekben (`ArticleZoom`),
  nyomtatás gomb.
- **Mobil:** minden kép WebP, a kártyák és a galéria 640 px-es bélyegképeket (`/images/t/`) töltenek be
  `srcset`-tel; hamburger menü, „vissza a tetejére” gomb, PWA manifest és ikonok (`public/icons/`).
- **SEO:** `src/app/robots.ts` és `src/app/sitemap.ts` (→ `robots.txt`, `sitemap.xml`), canonical, Open Graph
  és Twitter meta, JSON-LD (School, WebSite, BreadcrumbList, cikkeknél NewsArticle), `lang="hu"`.

## Előzmény

Az első változat Astróban készült; az az állapot a `_crawl/astro-backup/` mappában maradt meg referenciaként (nem része a buildnek).
