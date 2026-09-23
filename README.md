# Zsirai Általános Iskola – új weboldal

A régi Joomla 1.5-ös oldal (https://www.iskola.zsira.hu/) teljes tartalmával és struktúrájával
újraépített, statikus [Astro](https://astro.build) weboldal.

## Futtatás

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # statikus kimenet a dist/ mappába
npm run preview    # a build megtekintése
```

A `dist/` mappa bármilyen webtárhelyre (FTP, Netlify, Cloudflare Pages…) feltölthető, szerveroldali
program nem kell hozzá.

## Szerkezet

| Hely | Tartalom |
| --- | --- |
| `src/pages/` | Az oldalak (címlap, hírek, iskolánk-aloldalak, információk, galéria, kapcsolat) |
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
  levélküldő végpontot (PHP script vagy pl. Formspree) kell beállítani a `src/pages/elerhetosegeink.astro`
  fájlban, és a címzett e-mail címét megadni.
- **Hiányzó fájlok a régi szerveren:** a Fizika oldalon a `7of.pdf`, `8of.pdf`, `7fa.pdf` már a régi
  oldalon is 404-et adott, ezek az iskolától kérendők be.
- **Osztályaink:** a régi oldalon üres volt, az új oldal csak az osztályokat és az SZMK-tagokat sorolja
  fel – osztályfőnökök nevét az iskola adhatja meg.
- **Látogatószámláló** („Ki olvas minket”): statikus oldalon nem értelmezhető, kihagyva.
- Az `astro.config.mjs` `site` értéke a végleges domainre állítandó.

## Görgetés, mobil, SEO

- **Smooth scroll:** [Lenis](https://lenis.darkroom.engineering/) a `src/layouts/Base.astro`-ban, finom
  megjelenési animációkkal (`.reveal`). `prefers-reduced-motion` esetén mindkettő kikapcsol.
- **Mobil:** minden kép WebP, a kártyák és a galéria 640 px-es bélyegképeket (`/images/t/`) töltenek be
  `srcset`-tel; hamburger menü, „vissza a tetejére” gomb, PWA manifest és ikonok (`public/icons/`).
- **SEO:** `public/robots.txt`, automatikus `sitemap-index.xml` (`@astrojs/sitemap`), canonical, Open Graph
  és Twitter meta, JSON-LD (School, WebSite, BreadcrumbList, cikkeknél NewsArticle), `lang="hu"`.
