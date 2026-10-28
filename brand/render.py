"""Renders every brand asset in templates.html to brand/out/*.png.
Needs: pip install playwright && python -m playwright install chromium
Run from the repo root:  python brand/render.py
"""
import asyncio, pathlib
from playwright.async_api import async_playwright

HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE / "out"; OUT.mkdir(exist_ok=True)
PAGE = (HERE / "templates.html").as_uri()


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page()
        await pg.goto(PAGE + "?a=avatar")
        sizes = await pg.evaluate("window.SIZES")
        for name, (w, h) in sizes.items():
            await pg.set_viewport_size({"width": w, "height": h})
            await pg.goto(f"{PAGE}?a={name}")
            await pg.evaluate("document.fonts.ready")
            await pg.wait_for_timeout(150)
            await pg.screenshot(path=str(OUT / f"{name}-{w}x{h}.png"), clip={"x": 0, "y": 0, "width": w, "height": h})
            print("ok", name, w, h)
        await b.close()

asyncio.run(main())
