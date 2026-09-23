# -*- coding: utf-8 -*-
"""Builds src/data/*.json + public/images + public/dokumentumok from _crawl/content.json."""
import json, re, os, shutil, unicodedata, html as htmlmod
from bs4 import BeautifulSoup
from PIL import Image, ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CRAWL = os.path.join(ROOT, "_crawl")
PUB_IMG = os.path.join(ROOT, "public", "images")
PUB_DOC = os.path.join(ROOT, "public", "dokumentumok")
DATA = os.path.join(ROOT, "src", "data")
for p in (PUB_IMG, os.path.join(PUB_IMG, "t"), PUB_DOC, DATA):
    os.makedirs(p, exist_ok=True)

d = json.load(open(os.path.join(CRAWL, "content.json"), encoding="utf-8"))


def slugify(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    return s or "cikk"


# ---------- images ----------
img_map = {}
thumb_map = {}


def optimize_image(name):
    """Full-size WebP (max 1600px) + 640px thumbnail under /images/t/. GIFs are copied as-is."""
    if name in img_map:
        return img_map[name]
    src = os.path.join(CRAWL, "images", name)
    if not os.path.exists(src):
        return None
    try:
        im = Image.open(src)
        im.load()
    except Exception as e:
        print("image skipped", name, e)
        img_map[name] = None
        return None
    base, ext = os.path.splitext(name)
    ext = ext.lower()
    if ext == ".gif":
        dst = os.path.join(PUB_IMG, name)
        if not os.path.exists(dst):
            shutil.copy(src, dst)
        img_map[name] = "/images/" + name
        thumb_map[name] = "/images/" + name
        return img_map[name]
    has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
    im = im.convert("RGBA" if has_alpha else "RGB")
    w, h = im.size
    out_name = base + ".webp"
    dst = os.path.join(PUB_IMG, out_name)
    tdst = os.path.join(PUB_IMG, "t", out_name)
    try:
        if not os.path.exists(dst):
            full = im if w <= 1600 else im.resize((1600, round(h * 1600 / w)), Image.LANCZOS)
            full.save(dst, "WEBP", quality=82, method=6)
        if not os.path.exists(tdst):
            th = im if w <= 640 else im.resize((640, round(h * 640 / w)), Image.LANCZOS)
            th.save(tdst, "WEBP", quality=78, method=6)
    except Exception as e:
        print("image skipped", name, e)
        img_map[name] = None
        return None
    img_map[name] = "/images/" + out_name
    thumb_map[name] = "/images/t/" + out_name
    return img_map[name]


# ---------- docs ----------
local_docs = set(os.listdir(os.path.join(CRAWL, "docs")))
for f in local_docs:
    dst = os.path.join(PUB_DOC, f)
    if not os.path.exists(dst):
        shutil.copy(os.path.join(CRAWL, "docs", f), dst)

# ---------- article index for internal links ----------
id_to_slug = {}


def clean_html(h):
    """Rewrite image/doc paths, strip junk, unwrap empty spans."""
    if not h:
        return ""
    soup = BeautifulSoup(h, "html.parser")
    for img in soup.find_all("img"):
        src = img.get("src", "")
        name = src.replace("images/", "")
        new = optimize_image(name)
        if not new:
            img.decompose()
            continue
        img["src"] = new
        img["loading"] = "lazy"
        if not img.get("alt"):
            img["alt"] = ""
        try:
            wdt = int(img.get("width", 0) or 0)
        except ValueError:
            wdt = 0
        for a in ("width", "height"):
            if a in img.attrs:
                del img[a]
        if 0 < wdt <= 260:
            img["class"] = "img-small"
    for a in soup.find_all("a"):
        href = a.get("href", "")
        m = re.search(r"iskola\.zsira\.hu/dokumentumok/([^\"'?#]+\.pdf)", href, re.I)
        if m and m.group(1) in local_docs:
            a["href"] = "/dokumentumok/" + m.group(1)
            continue
        m2 = re.search(r"view=article&id=(\d+)", htmlmod.unescape(href))
        if m2 and int(m2.group(1)) in id_to_slug:
            a["href"] = "/hirek/" + id_to_slug[int(m2.group(1))] + "/"
        elif href.startswith("http") and "iskola.zsira.hu" not in href:
            a["target"] = "_blank"
            a["rel"] = "noopener"
    for t in soup.find_all(["span", "font", "o:p", "address"]):
        t.unwrap()
    for t in soup.find_all("div"):
        if t.get("id") == "_mcePaste":
            t.decompose()
    for t in soup.find_all("div"):
        t.unwrap()
    out = str(soup)
    out = re.sub(r"<(p|strong|em|h\d)>(\s|&nbsp;|\xa0|<br\s*/?>)*</\1>", "", out)
    out = re.sub(r"(<br\s*/?>\s*){2,}", "<br/>", out)
    out = re.sub(r"<p>\s*<br/>\s*", "<p>", out)
    out = join_soft_breaks(out)
    out = re.sub(r"\n\s*\n+", "\n", out)
    return out.strip()


def join_soft_breaks(h):
    """Pasted text often has hard <br/> inside sentences; join those, keep real list breaks."""
    def repl(m):
        before, after = m.group(1), m.group(2)
        seg = re.split(r"<[^>]+>", before)[-1]
        cont = after[:1].islower() or after[:1] in "„(" or seg.rstrip()[-1:] in ",-–;"
        longline = len(seg.strip()) > 70 and seg.rstrip()[-1:].isalpha() and not re.match(r"\d+[.)]", after)
        return before + " " + after if (cont or longline) else m.group(0)
    prev = None
    while prev != h:
        prev = h
        h = re.sub(r"([^<>\n]{1,400})\s*<br/>\s*([^\s<][^<>]*)", repl, h)
    return h


def thumb_for(out_path):
    for n, o in img_map.items():
        if o == out_path:
            return thumb_map.get(n, out_path)
    return out_path


def text_of(h):
    return re.sub(r"\s+", " ", BeautifulSoup(h, "html.parser").get_text(" ")).strip()


def norm(t):
    return re.sub(r"\W+", "", t.lower())


# ---------- articles ----------
def in_home(art):
    txt = norm(text_of(art["html"]))[:80]
    for h in d["home"]:
        if h["title"] == art["title"] and norm(text_of(h["html"]))[:80] == txt:
            return True
    return False


raw = list(d["articles"])
for a in d["archive"]:
    m = re.search(r"id=(\d+)%3A([^&]*)", a["url"])
    aid, alias = int(m.group(1)), m.group(2)
    if any(x["id"] == aid for x in raw):
        continue
    dm = re.match(r"(\d{4}-\d{2}-\d{2})", alias)
    raw.append({"id": aid, "alias": alias, "cat": "archivum", "title": a["title"],
                "date": dm.group(1) if dm else None, "url": a["url"], "html": a["html"]})

next_id = 1000
for i, h in enumerate(d["home"]):
    if not any(x["title"] == h["title"] for x in raw):
        raw.append({"id": next_id, "alias": "", "cat": "aktualis", "title": h["title"], "date": None,
                    "url": None, "html": h["html"], "home_pos": i})
        next_id += 1

raw = [a for a in raw if a["title"].strip() and (text_of(a["html"]) or "<img" in a["html"])]

by_id = sorted(raw, key=lambda a: a["id"])
last = None
for a in by_id:
    if a["id"] >= 1000:
        continue
    if a["date"]:
        last = a["date"]
    elif last:
        a["date"] = last
# fallback: nearest higher id with a date
nxt = None
for a in reversed(by_id):
    if a["id"] >= 1000:
        continue
    if a["date"]:
        nxt = a["date"]
    elif nxt:
        a["date"] = nxt
for a in raw:
    if a["id"] >= 1000:
        pos = a["home_pos"]
        for j in range(pos - 1, -1, -1):
            t = d["home"][j]["title"]
            cand = [x for x in raw if x["title"] == t and x.get("date")]
            if cand:
                a["date"] = cand[0]["date"]
                break

slugs = set()
for a in sorted(raw, key=lambda a: -a["id"]):
    s = slugify(a["title"])
    if s in slugs:
        s = f"{s}-{a['id']}"
    slugs.add(s)
    a["slug"] = s
    id_to_slug[a["id"]] = s

articles = []
for a in raw:
    h = clean_html(a["html"])
    soup = BeautifulSoup(h, "html.parser")
    img = soup.find("img")
    txt = text_of(h)
    articles.append({
        "id": a["id"], "slug": a["slug"], "title": a["title"].strip(),
        "date": a.get("date"), "category": a["cat"],
        "featured": a["title"] in {h["title"] for h in d["home"]},
        "cover": img["src"] if img else None,
        "coverThumb": thumb_for(img["src"]) if img else None,
        "excerpt": (txt[:180] + "…") if len(txt) > 180 else txt,
        "html": h,
    })
articles.sort(key=lambda a: (a["date"] or "0000", a["id"]), reverse=True)
json.dump(articles, open(os.path.join(DATA, "hirek.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)

# ---------- static pages ----------
P = d["pages"]


def page_html(label):
    p = P[label]
    return p.get("html") or (p["articles"][0]["html"] if p.get("articles") else "")


pages = {}
for label, slug in [("Galagonya", "galagonya"), ("Dokumentumok", "dokumentumok"),
                    ("Általános ismertető", "altalanos-ismerteto"), ("Diákönkormányzat", "diakonkormanyzat"),
                    ("Tanügyi információk", "tanugyi-informaciok"), ("Körzeti Általános Iskola", "korzeti-altalanos-iskola"),
                    ("Személyi igazolványokról", "szemelyi-igazolvanyokrol"), ("Letölthető nyomtatványok", "letoltheto-nyomtatvanyok"),
                    ("Fizika", "fizika"), ("A tanév rendje", "tanev-rendje")]:
    pages[slug] = {"title": label, "html": clean_html(page_html(label))}
json.dump(pages, open(os.path.join(DATA, "pages.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)

# ---------- gallery ----------
gal = []
for g in d["gallery"]:
    imgs = []
    for im in g["images"]:
        p = optimize_image(im["src"].replace("images/", ""))
        if p:
            full = os.path.join(PUB_IMG, os.path.basename(p))
            try:
                w, h = Image.open(full).size
            except Exception:
                w, h = 640, 480
            imgs.append({"src": p, "thumb": thumb_for(p), "alt": im["alt"] or g["title"], "w": w, "h": h})
    m = re.search(r"(20\d\d)", g["title"])
    gal.append({"slug": slugify(g["title"]), "title": g["title"], "year": int(m.group(1)) if m else None,
                "images": imgs, "cover": imgs[0]["src"] if imgs else None})
json.dump(gal, open(os.path.join(DATA, "galeria.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)

# ---------- misc assets ----------
for n in ["dc9fb91b_iskolakep.jpg", "de4d03d9_penz7.png", "79c39a6c_h1.png", "a62c370c_h2.png", "81f05401_h3.png",
          "7ecaf176_h4.png", "1739f8a3_galagonya.png", "314ab8910d2f.png", "6cc87e24_locsmand.png",
          "15753163_efozsira.png", "9298ce14_gsd.png", "e719d898_physics.jpg"]:
    optimize_image(n)
shutil.copy(os.path.join(CRAWL, "template", "header.jpg"), os.path.join(PUB_IMG, "regi-fejlec.jpg"))

print("articles:", len(articles), "featured:", sum(a["featured"] for a in articles),
      "no date:", sum(1 for a in articles if not a["date"]))
print("pages:", len(pages), "gallery:", len(gal), "images:", len(os.listdir(PUB_IMG)), "docs:", len(os.listdir(PUB_DOC)))
