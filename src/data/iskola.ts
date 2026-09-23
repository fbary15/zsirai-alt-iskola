/** Strukturált iskolai adatok – a régi oldal tartalmából átemelve. */

export const iskola = {
  nev: 'Zsirai Általános Iskola',
  rovidNev: 'Zsirai Általános Iskola',
  szlogen: 'Nyolc évfolyamos általános iskola az osztrák határ mentén',
  cim: '9476 Zsira, Fő utca 37.',
  telefon: '99-543015',
  telefonHref: 'tel:+3699543015',
  fax: '99-543016',
  om: '030687',
  fenntarto: { nev: 'Soproni Tankerületi Központ', cim: '9400 Sopron, Bajcsy-Zsilinszky utca 9.', tol: '2017. január 1-től' },
  korzet: ['Zsira', 'Gyalóka', 'Répcevis', 'Szakony'],
  mapEmbed: 'https://www.google.com/maps?q=Zsirai+%C3%81ltal%C3%A1nos+Iskola,+9476+Zsira,+F%C5%91+utca+37&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=9476+Zsira,+F%C5%91+utca+37',
  copyright: '© 2026. Balogh Tibor',
};

export type Person = { nev: string; szak: string; extra?: string };

export const pedagogusok: Person[] = [
  { nev: 'Szilágyi János', szak: 'testnevelés, biológia', extra: 'igazgató-helyettes, az SZMSZ szerinti igazgató' },
  { nev: 'Balogh Tiborné', szak: 'tanító', extra: 'alsós munkaközösség-vezető' },
  { nev: 'Nyikosné Zsupponits Beatrix', szak: 'magyar, orosz', extra: 'felsős munkaközösség-vezető' },
  { nev: 'Balogh Tibor', szak: 'fizika, számítástechnika, technika' },
  { nev: 'Beer Katalin', szak: 'tanító, fejlesztő pedagógus' },
  { nev: 'Bölöni Roland', szak: 'testnevelés, kézilabda edző' },
  { nev: 'Dr. Kovácsné Molnár Ágnes', szak: 'biológia, technika' },
  { nev: 'Martonné Ragasits Andrea', szak: 'földrajz, népművelő, mentálhigiéné, tanító' },
  { nev: 'Orbán György', szak: 'tanító' },
  { nev: 'Simon Marianna', szak: 'német nyelv' },
  { nev: 'Sodics Péter', szak: 'történelem, rajz' },
  { nev: 'Szilágyiné Horváth Rita', szak: 'matematika, kémia' },
];

export const segitok: Person[] = [
  { nev: 'Alaszné Unger Viola', szak: 'pedagógiai asszisztens' },
  { nev: 'Kocsis Tímea', szak: 'pedagógiai asszisztens' },
  { nev: 'Tájmelné Rákóczy Mónika', szak: 'iskolatitkár' },
];

export const technikai: Person[] = [
  { nev: 'Kecsedi Anna', szak: 'takarító' },
  { nev: 'Mészáros Mónika', szak: 'takarító' },
  { nev: 'Andor Amelita', szak: 'konyhai dolgozó' },
];

export type Fogadoora = { nev: string; nap: string; tol: string; ig: string };
export const fogadoorak: Fogadoora[] = [
  { nev: 'Szilágyi János', nap: 'kedd', tol: '11:00', ig: '12:00' },
  { nev: 'Balogh Tiborné', nap: 'hétfő', tol: '7:15', ig: '8:00' },
  { nev: 'Nyikosné Zsupponits Beatrix', nap: 'péntek', tol: '9:00', ig: '11:00' },
  { nev: 'Beer Katalin', nap: 'péntek', tol: '8:10', ig: '8:55' },
  { nev: 'Simon Marianna', nap: 'kedd', tol: '8:10', ig: '8:55' },
  { nev: 'Dr. Kovácsné Molnár Ágnes', nap: 'kedd', tol: '9:15', ig: '10:00' },
  { nev: 'Martonné Ragasits Andrea', nap: 'csütörtök', tol: '8:10', ig: '8:55' },
  { nev: 'Bölöni Roland', nap: 'kedd', tol: '10:10', ig: '10:55' },
  { nev: 'Orbán György', nap: 'hétfő', tol: '10:00', ig: '11:00' },
  { nev: 'Sodics Péter', nap: 'szerda', tol: '10:00', ig: '10:55' },
  { nev: 'Szilágyiné Horváth Rita', nap: 'kedd', tol: '9:15', ig: '10:00' },
  { nev: 'Balogh Tibor', nap: 'hétfő', tol: '10:10', ig: '10:55' },
];
export const napokSorrend = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek'];

export const dok = {
  segitoPedagogus: 'Simon Marianna',
  elnok: 'Oláh Zoltán',
  titkar: '',
  kepviselok: [
    { osztaly: '8. osztály', tagok: ['Oláh Zoltán', 'Tájmel Benedek'] },
    { osztaly: '7. osztály', tagok: ['Krizmanich Máté', 'Turbók Patrik'] },
    { osztaly: '6. osztály', tagok: ['Kurbely Ábel', 'Varga Zsófia'] },
    { osztaly: '5. osztály', tagok: ['Szabó Viktória', 'Tóth Róza'] },
  ],
  celok: [
    'a diákjogok védelme',
    'a diákok érdekeinek képviselete',
    'a szervezett véleménynyilvánítás biztosítása',
    'a hagyományok őrzése és újak teremtése',
    'a tartalmas, színes diákélet feltételeinek megteremtése',
    'az iskolán belüli jogérvényesítés, illetve kötelességteljesítés',
    'a tagok számára lehetőség biztosítása a közéleti tevékenység elsajátítására, gyakorlására',
  ],
};

export const szmk = {
  elnok: 'Radics Anita',
  tagok: [
    { osztaly: '1. osztály', tagok: ['Likavcsán János', 'Nagy Ákos'] },
    { osztaly: '2. osztály', tagok: ['Molnár-Berényi Lívia', 'Tóthné Fejes Ildikó'] },
    { osztaly: '3. osztály', tagok: ['Alaszné Unger Viola', 'Tajmelné Kövér Ibolya'] },
    { osztaly: '4. osztály', tagok: ['Koroknai Judit', 'Krizmanichné Riegler Krisztina'] },
    { osztaly: '5. osztály', tagok: ['Forintos-Hadi Krisztina', 'Koósz Krisztiánné'] },
    { osztaly: '6. osztály', tagok: ['Hollósi Róbert', 'Koroknai László'] },
    { osztaly: '7. osztály', tagok: ['Baráthné Kövér Eszter', 'Radics Anita'] },
    { osztaly: '8. osztály', tagok: ['Berzlánovichné Németh Klára', 'Marton-Szőnyi Melinda'] },
  ],
};

export type Partner = { nev: string; cim?: string; url?: string; logo?: string };
export const partnerek: Partner[] = [
  { nev: 'Soproni Tankerületi Központ', cim: '9400 Sopron, Bajcsy-Zsilinszky utca 9.' },
  { nev: 'Zsira Község Önkormányzata', url: 'http://zsira.hu/', logo: '/images/314ab8910d2f.webp' },
  { nev: 'Lutzmannsburg Volksschule', url: 'http://home.schule.at/teacher/vslb/_content_subj.html', logo: '/images/6cc87e24_locsmand.webp' },
  { nev: 'Oktatási Hivatal Győri Pedagógiai Oktatási Központja', cim: 'Győr, Türr István u. 5.' },
  { nev: 'Marionett Alapfokú Művészeti Iskola', cim: '9431 Fertőd, Fő utca 2.' },
  { nev: 'Fővárosi Önkormányzat Értelmi Fogyatékosok Otthona, Zsira', url: 'http://www.efozsira.hu/', logo: '/images/15753163_efozsira.webp' },
  { nev: 'GSD Agrárprodukt Kft.', url: 'http://betacenter.hu/', logo: '/images/9298ce14_gsd.webp' },
];

export type Doc = { cim: string; href: string; leiras?: string };
export const dokumentumok: Doc[] = [
  { cim: 'Munkaterv', href: '/dokumentumok/munkaterv.pdf' },
  { cim: 'Házirend', href: 'https://drive.google.com/file/d/1RwxyR_moVZW6bVGYTLlyowY1ZKNlWIjG/view?usp=sharing' },
  { cim: 'Pedagógiai program', href: '/dokumentumok/pepo.pdf' },
  { cim: 'Szervezeti és működési szabályzat', href: '/dokumentumok/szmsz.pdf' },
  { cim: 'Közzétételi lista', href: '/dokumentumok/klista2017.pdf' },
  { cim: 'Járványügyi eljárásrend', href: '/dokumentumok/jarvany.pdf' },
  { cim: 'Tanórai és felügyeleti időrend', href: 'https://drive.google.com/file/d/1UG_DpFVRJd4TEgx-wUwL8xDL7YZzrAl3/view?usp=sharing' },
];

export const nyomtatvanyok: Doc[] = [
  { cim: 'Kérelem a 16 óráig tartó foglalkozások alól történő tartós felmentésre', href: '/dokumentumok/kik16.pdf' },
  { cim: 'Alkalmi kikérő', href: '/dokumentumok/alkkikero.pdf' },
];

export const fizikaAnyagok: Doc[] = [
  { cim: 'Fizika 7 összefoglaló az egész éves anyagból', href: 'http://www.iskola.zsira.hu/dokumentumok/7of.pdf' },
  { cim: 'Fizika 8 összefoglaló az egész éves anyagból', href: 'http://www.iskola.zsira.hu/dokumentumok/8of.pdf' },
  { cim: 'Kérdések a 7. osztályos fizika tananyagból', href: '/dokumentumok/gyk7.pdf' },
  { cim: 'Gyakorló feladatok a 7. osztályos tananyagból', href: 'http://www.iskola.zsira.hu/dokumentumok/7fa.pdf' },
  { cim: 'Sűrűség feladatok', href: '/dokumentumok/suruseg.pdf' },
  { cim: 'Munkavégzés feladatok', href: '/dokumentumok/munka.pdf' },
  { cim: 'Tömeg és a súly', href: '/dokumentumok/tomeg-suly.pdf' },
  { cim: 'A szilárd testek nyomása', href: '/dokumentumok/nyomas.pdf' },
  { cim: 'Minimum szint 7. osztály', href: '/dokumentumok/min7.pdf' },
  { cim: 'Jelek, mértékegységek, képletek', href: '/dokumentumok/jelek.pdf' },
];

export const tanevRendje = {
  tanev: '2026/2027',
  esemenyek: [
    { mikor: '2026. szeptember 1.', mi: 'Első tanítási nap', megj: 'kedd' },
    { mikor: '2026. október 23. – november 1.', mi: 'Őszi szünet', megj: 'Az utolsó tanítási nap október 22., az első tanítási nap november 2., hétfő.' },
    { mikor: '2026. december 1.', mi: 'Jelentkezési határidő a központi írásbeli felvételire' },
    { mikor: '2026. december 19. – 2027. január 3.', mi: 'Téli szünet', megj: 'Az utolsó tanítási nap december 18., péntek, az első tanítási nap január 4., hétfő.' },
    { mikor: '2027. január 22.', mi: 'Első félév vége', megj: 'Az iskolák legkésőbb január 29-ig kötelesek értesíteni a tanulókat és a szülőket az első félévben elért eredményekről.' },
    { mikor: '2027. január 23.', mi: 'Központi írásbeli felvételi vizsgák', megj: 'szombat, 10 órától' },
    { mikor: '2027. február 3.', mi: 'Pótló központi felvételi vizsga', megj: '14 óra' },
    { mikor: '2027. február 22.', mi: 'Jelentkezési határidő a középfokú iskolákba' },
    { mikor: '2027. március 1–19.', mi: 'Középiskolai szóbeli felvételik' },
    { mikor: '2027. március 22.', mi: 'A középfokú iskolák nyilvánosságra hozzák a felvételi jegyzéket' },
    { mikor: '2027. március 22. – május 28.', mi: 'Országos kompetenciamérések', megj: '4. évfolyam: szövegértés és matematika; 6. és 8. évfolyam: szövegértés, matematika, természettudomány, idegen nyelv.' },
    { mikor: '2027. március 25. – április 4.', mi: 'Tavaszi szünet', megj: 'Az utolsó tanítási nap március 24., szerda, az első tanítási nap április 5., hétfő.' },
    { mikor: '2027. április 22–23.', mi: 'Általános iskolai beiratkozás', megj: 'A tanköteles gyermeket ekkor kell beíratni az általános iskola első osztályába.' },
    { mikor: '2027. június 18.', mi: 'Utolsó tanítási nap', megj: 'péntek' },
  ],
};
