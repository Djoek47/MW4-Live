"""Builds the MW4 LIVE state seal (fictional emblem) as a self-contained SVG with its font embedded.
Output: public/brand/seal.svg (used by the website header/footer and by brand/render.py for avatars).
Run from the repo root:  python brand/seal.py

Design rule: this is the seal of a made-up "People's Broadcast". Star, sunburst and a LIVE plate only —
no real national emblems, flags, leaders or symbols.
"""
import base64, math, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
FONT = base64.b64encode((ROOT / "broadcast/overlays/fonts/barlow-condensed-latin-800-normal.woff2").read_bytes()).decode()
RED, DEEP, GOLD, GOLD_D, CREAM, INK = "#c4161c", "#7d0c10", "#e8a317", "#c98a0c", "#f6ead0", "#1d1410"


def star(cx, cy, r, fill, rot=-90):
    pts = []
    for i in range(10):
        a = math.radians(rot + i * 36)
        rr = r if i % 2 == 0 else r * 0.40
        pts.append(f"{cx + rr * math.cos(a):.2f},{cy + rr * math.sin(a):.2f}")
    return f'<polygon points="{" ".join(pts)}" fill="{fill}"/>'


def rays(cx, cy, r, n=24):
    out = []
    for i in range(n):
        a0, a1 = math.radians(i * 360 / n), math.radians((i + 0.5) * 360 / n)
        out.append(f'<path d="M{cx},{cy} L{cx + r * math.cos(a0):.2f},{cy + r * math.sin(a0):.2f} '
                   f'A{r},{r} 0 0 1 {cx + r * math.cos(a1):.2f},{cy + r * math.sin(a1):.2f} Z" fill="{DEEP}"/>')
    return "".join(out)


C = 200
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="MW4 Live seal">
<defs>
  <style>@font-face{{font-family:SealCond;src:url(data:font/woff2;base64,{FONT}) format("woff2")}}
  text{{font-family:SealCond,"Barlow Condensed","Arial Narrow",sans-serif;font-weight:800;letter-spacing:.06em}}</style>
  <path id="top" d="M{C - 144},{C} A144,144 0 0 1 {C + 144},{C}"/>
  <path id="bot" d="M{C - 156},{C} A156,156 0 0 0 {C + 156},{C}"/>
  <clipPath id="disc"><circle cx="{C}" cy="{C}" r="118"/></clipPath>
</defs>
<circle cx="{C}" cy="{C}" r="198" fill="{GOLD}"/>
<circle cx="{C}" cy="{C}" r="190" fill="none" stroke="{DEEP}" stroke-width="5"/>
<circle cx="{C}" cy="{C}" r="126" fill="{DEEP}"/>
<g clip-path="url(#disc)"><circle cx="{C}" cy="{C}" r="118" fill="{RED}"/>{rays(C, C + 150, 320, 28)}</g>
<circle cx="{C}" cy="{C}" r="118" fill="none" stroke="{CREAM}" stroke-width="3"/>
{star(C, C - 22, 58, GOLD)}{star(C, C - 22, 58, "none")}
<g transform="translate({C - 56},{C + 48})">
  <rect width="112" height="42" rx="6" fill="{CREAM}" stroke="{INK}" stroke-width="3"/>
  <circle cx="22" cy="21" r="7" fill="{RED}"/>
  <text x="66" y="33" text-anchor="middle" font-size="32" fill="{INK}">LIVE</text>
</g>
<text font-size="44" fill="{DEEP}" letter-spacing=".16em"><textPath href="#top" startOffset="50%" text-anchor="middle">MW4 LIVE · 24/7</textPath></text>
<text font-size="36" fill="{DEEP}" dy="26" letter-spacing=".1em"><textPath href="#bot" startOffset="50%" text-anchor="middle">GLORY TO THE CLUTCH</textPath></text>
{star(C - 172, C + 2, 11, DEEP)}{star(C + 172, C + 2, 11, DEEP)}
</svg>'''

out = ROOT / "public/brand/seal.svg"
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(svg)
print(f"wrote {out} ({len(svg) // 1024} KB)")
