"""Builds the MW4 LIVE unit patch — the network's main logo (header, favicon, social avatars).
Black and yellow like Modern Warfare's own palette, but an original mark: no Activision logo or artwork.
Output: public/brand/patch.svg (font embedded).   Run from the repo root:  python brand/patch.py
"""
import base64, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
STENCIL = base64.b64encode((ROOT / "node_modules/@fontsource/black-ops-one/files/black-ops-one-latin-400-normal.woff2").read_bytes()).decode()
COND = base64.b64encode((ROOT / "broadcast/overlays/fonts/barlow-condensed-latin-800-normal.woff2").read_bytes()).decode()
Y, K, BONE = "#ffcd00", "#0b0c0b", "#f2efe4"

hazard = "".join(f'<path d="M{x},344 l24,0 l-30,40 l-24,0 Z" fill="{K}"/>' for x in range(-20, 420, 48))
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="MW4 Live">
<defs><style>
@font-face{{font-family:PStencil;src:url(data:font/woff2;base64,{STENCIL}) format("woff2")}}
@font-face{{font-family:PCond;src:url(data:font/woff2;base64,{COND}) format("woff2")}}
.s{{font-family:PStencil,"Black Ops One",Impact,sans-serif}} .c{{font-family:PCond,"Barlow Condensed","Arial Narrow",sans-serif;font-weight:800;letter-spacing:.14em}}
</style><clipPath id="r"><rect x="8" y="8" width="384" height="384" rx="64"/></clipPath></defs>
<g clip-path="url(#r)">
  <rect width="400" height="400" fill="{K}"/>
  <g stroke="{Y}" stroke-opacity=".12" stroke-width="2">{"".join(f'<line x1="{i}" y1="0" x2="{i}" y2="400"/><line x1="0" y1="{i}" x2="400" y2="{i}"/>' for i in range(40, 400, 40))}</g>
  <rect y="344" width="400" height="56" fill="{Y}"/>{hazard}
</g>
<rect x="8" y="8" width="384" height="384" rx="64" fill="none" stroke="{Y}" stroke-width="12"/>
<rect x="28" y="28" width="344" height="344" rx="48" fill="none" stroke="{Y}" stroke-opacity=".35" stroke-width="3" stroke-dasharray="10 8"/>
<text x="200" y="92" text-anchor="middle" class="c" font-size="30" fill="{BONE}">PEOPLE'S BROADCAST</text>
<text x="200" y="230" text-anchor="middle" class="s" font-size="132" fill="{Y}">MW4</text>
<g transform="translate(110,256)"><rect width="180" height="58" rx="6" fill="{Y}"/>
  <circle cx="34" cy="29" r="10" fill="#e5271d"/><text x="108" y="45" text-anchor="middle" class="c" font-size="44" fill="{K}" style="letter-spacing:.18em">LIVE</text></g>
<g fill="{Y}"><path d="M56 128h22v4H56zM65 119h4v22h-4z"/><path d="M322 128h22v4h-22zM331 119h4v22h-4z"/></g>
</svg>'''
out = ROOT / "public/brand/patch.svg"
out.write_text(svg)
print(f"wrote {out} ({len(svg) // 1024} KB)")
