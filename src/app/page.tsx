import Link from 'next/link';
import NewsCard from '@/components/NewsCard';
import CountUp from '@/components/CountUp';
import { aktualisHirek, galeria, formatDate } from '@/lib/util';
import { iskola, tanevRendje } from '@/data/iskola';
import { KRETA_URL } from '@/data/nav';

export default function Home() {
  const friss = aktualisHirek.slice(0, 6);
  const kiemelt = friss[0];
  const tobbi = friss.slice(1, 6);
  const albumok = galeria.filter((g) => g.cover).slice(-4).reverse();
  const kozelgo = tanevRendje.esemenyek.slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="container hero-in">
          <div className="hero-text">
            <span className="eyebrow" style={{ color: 'var(--sun)' }}>Köszöntjük weblapunkon</span>
            <h1>Zsirai Általános Iskola</h1>
            <p className="lead">{iskola.szlogen}. Kis létszámú, családias iskola, ahol a tanulás mellett a nevelésre, a német nyelvre, a sportra és a művészetekre is nagy hangsúlyt fektetünk.</p>
            <div className="hero-cta">
              <Link className="btn btn-sun" href="/hirek/">Aktuális hírek</Link>
              <Link className="btn btn-ghost" href="/altalanos-ismerteto/">Ismerje meg iskolánkat</Link>
            </div>
            <ul className="hero-facts">
              <li><strong><CountUp to={8} /></strong><span>évfolyam</span></li>
              <li><strong><CountUp to={1991} duration={1800} /></strong><span>óta nyolc osztállyal</span></li>
              <li><strong><CountUp to={2} suffix="." /></strong><span>osztálytól német nyelv</span></li>
            </ul>
          </div>
          <figure className="hero-img">
            <img src="/images/dc9fb91b_iskolakep.webp" alt="A Zsirai Általános Iskola épülete" width={640} height={571} fetchPriority="high" />
          </figure>
        </div>
        <div className="hero-grid-bg" aria-hidden="true" />
        <a className="hero-scroll" href="#hirek" aria-label="Görgessen a hírekhez">Görgessen<span /></a>
      </section>

      <section className="quick container">
        <Link className="card q" href="/tanev-rendje/">
          <span className="q-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg></span>
          <span><strong>A tanév rendje</strong><small>Szünetek, felvételi, beiratkozás</small></span>
        </Link>
        <a className="card q" href="/dokumentumok/or.pdf" target="_blank" rel="noopener">
          <span className="q-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg></span>
          <span><strong>Órarendek</strong><small>2026/27. tanév I. félév (PDF)</small></span>
        </a>
        <Link className="card q" href="/dokumentumok/">
          <span className="q-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg></span>
          <span><strong>Dokumentumok</strong><small>Házirend, pedagógiai program, SZMSZ</small></span>
        </Link>
        <a className="card q" href={KRETA_URL} target="_blank" rel="noopener">
          <span className="q-ico sun"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg></span>
          <span><strong>KRÉTA e-napló</strong><small>Elektronikus ellenőrző belépés</small></span>
        </a>
      </section>

      <section className="section container" id="hirek">
        <div className="section-head">
          <div><span className="eyebrow">Hírek, események</span><h2>Ez történt nálunk</h2></div>
          <Link className="btn btn-outline" href="/hirek/">Összes hír</Link>
        </div>
        {kiemelt && (
          <Link className="card featured" href={`/hirek/${kiemelt.slug}/`}>
            <div className="f-img">{kiemelt.cover && <img src={kiemelt.cover} alt="" />}</div>
            <div className="f-body">
              <div className="meta"><span className="tag sun">Legfrissebb</span> <time>{formatDate(kiemelt.date)}</time></div>
              <h3>{kiemelt.title}</h3>
              <p>{kiemelt.excerpt}</p>
              <span className="more">Tovább olvasom →</span>
            </div>
          </Link>
        )}
        <div className="grid grid-3" style={{ marginTop: '1.5rem' }}>
          {tobbi.map((h, i) => <NewsCard key={h.slug} hir={h} eager={i < 2} />)}
        </div>
      </section>

      <section className="section split">
        <div className="container split-in">
          <div className="card dates">
            <span className="eyebrow">{tanevRendje.tanev}. tanév</span>
            <h2>Fontos időpontok</h2>
            <ul className="timeline">
              {kozelgo.map((e) => <li key={e.mikor}><span className="when">{e.mikor}</span><span><span className="what">{e.mi}</span>{e.megj && <p className="note">{e.megj}</p>}</span></li>)}
            </ul>
            <Link className="btn btn-primary" href="/tanev-rendje/" style={{ marginTop: '1.25rem' }}>Teljes tanévrend</Link>
          </div>
          <div className="about">
            <span className="eyebrow">Iskolánkról</span>
            <h2>Családias iskola az osztrák határ mellett</h2>
            <p>Iskolánk 8 évfolyamos általános iskola, jelenlegi formájában 1991-ben alakult. Az osztrák határ közelsége miatt tanulóink már a második osztálytól tanulnak németet, a szomszédos Lutzmannsburg iskolájával pedig szoros partneri kapcsolatban állunk: minden nyáron közös nyelvi tábort rendezünk.</p>
            <p>Fontosnak tartjuk a gyermekek egészséges fejlődését, ezért sportfoglalkozásaink száma alsó és felső tagozaton is meghaladja a szokásos mértéket. Szakköreinkkel a tehetséges tanulók fejlődését, fejlesztő pedagógusunkkal a megsegítésre szorulókat támogatjuk.</p>
            <div className="chip-row">
              <Link className="chip" href="/dolgozoink/">Dolgozóink</Link>
              <Link className="chip" href="/fogadoorak/">Fogadóórák</Link>
              <Link className="chip" href="/diakonkormanyzat/">Diákönkormányzat</Link>
              <Link className="chip" href="/szuloi-munkakozosseg/">Szülői munkaközösség</Link>
              <Link className="chip" href="/galagonya/">Galagonya Alapítvány</Link>
              <Link className="chip" href="/partnereink/">Partnereink</Link>
            </div>
            <div className="home-badges">
              <Link href="/hirek/hatartalanul-szlovakiaban/" title="Határtalanul program"><img src="/images/79c39a6c_h1.webp" alt="Határtalanul program" loading="lazy" /></Link>
              <img src="/images/de4d03d9_penz7.webp" alt="Iskolánk Pénz7 iskola" loading="lazy" />
              <img src="/images/a62c370c_h2.webp" alt="Bethlen Gábor Alapkezelő" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {albumok.length > 0 && (
        <section className="section container">
          <div className="section-head">
            <div><span className="eyebrow">Galéria</span><h2>Képek az iskola életéből</h2></div>
            <Link className="btn btn-outline" href="/galeria/">Összes album</Link>
          </div>
          <div className="grid grid-4">
            {albumok.map((a) => (
              <Link key={a.slug} className="card album" href={`/galeria/${a.slug}/`}>
                <img src={a.images[0].thumb} alt="" width={640} height={480} loading="lazy" decoding="async" />
                <span className="cap">{a.title}<small>{a.images.length} kép</small></span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="section container">
        <div className="card contact-strip">
          <div>
            <span className="eyebrow">Kapcsolat</span>
            <h2 style={{ margin: 0 }}>Kérdése van? Keressen minket!</h2>
            <p style={{ margin: '.5rem 0 0' }}>{iskola.cim} · Telefon: <a href={iskola.telefonHref}>{iskola.telefon}</a> · OM: {iskola.om}</p>
          </div>
          <Link className="btn btn-primary" href="/elerhetosegeink/">Elérhetőségeink</Link>
        </div>
      </section>
    </>
  );
}
