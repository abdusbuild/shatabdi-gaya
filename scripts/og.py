"""Build the 1200x630 share images in public/og/ (WhatsApp, Facebook, X link previews).

Run from the project root:  python scripts/og.py
Needs Pillow (pip install pillow). Fonts are the site's own (Outfit, Plus Jakarta Sans; OFL) in scripts/fonts/.
Edit PAGES below to change a page's photo, title or tagline, then re-run.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
FONTS = Path(__file__).resolve().parent / "fonts"
W, H = 1200, 630

NAVY = (22, 32, 77)          # --brand-900
ACCENT = (76, 164, 227)      # --accent-light, the short rule under the title
LINK = (84, 184, 255)        # the web address
TAG = "GAYA JI · CBSE 330113"
DOMAIN = "shatabdigaya.com"

# slug: (photo in public/images or public/hero, vertical focus 0-1, title, tagline)
PAGES = {
    "home": ("campus-name-facade", .5, "Shatabdi Public School", "English-medium CBSE school in Gaya Ji since 2000"),
    "about": ("fd26-assembly-ali-bhawan", .5, "About the school", "Our story, mission and the Principal's message"),
    "academics": ("study-tour-girls", .2, "Academics", "CBSE from Prep to Class XII · Science & Commerce"),
    "admissions": ("fd26-students-seated", .5, "Admissions", "Process, entrance test, documents and enquiry"),
    "campus": ("campus-courtyard-school-bus", .5, "Campus & school life", "Buildings, labs, library, houses and gallery"),
    "contact": ("campus-garden-entrance", .5, "Contact us", "Katari Hill Road, Aliganj, Gaya Ji, Bihar 823001"),
    "privacy-policy": ("campus-buses-classroom-wing", .5, "Privacy policy", "How we handle the information you share"),
    "terms-and-conditions": ("campus-stair-tower", .5, "Terms & conditions", "Using the school website"),
    "public-disclosure": ("campus-arched-windows", .5, "Mandatory public\ndisclosure", "CBSE affiliation No. 330113"),
}

# Navy overlay strength across the width: dark behind the text on the left, photo shows through on the right.
SHADE_STOPS = [(0, .96), (100, .945), (200, .932), (300, .918), (400, .902), (500, .825), (600, .739),
               (700, .659), (800, .566), (900, .472), (1000, .374), (1100, .279), (1199, .19)]


def font(name, size, weight):
    f = ImageFont.truetype(str(FONTS / f"{name}.ttf"), size)
    f.set_variation_by_axes([weight])
    return f


def shade():
    row = []
    for x in range(W):
        for (x0, a0), (x1, a1) in zip(SHADE_STOPS, SHADE_STOPS[1:]):
            if x0 <= x <= x1:
                row.append(round(255 * (a0 + (a1 - a0) * (x - x0) / (x1 - x0))))
                break
    mask = Image.new("L", (W, 1))
    mask.putdata(row)
    layer = Image.new("RGBA", (W, H), NAVY + (255,))
    layer.putalpha(mask.resize((W, H)))
    return layer


def photo(name, focus):
    path = next(p for p in (PUB / "images" / f"{name}.webp", PUB / "hero" / f"{name}.webp") if p.exists())
    im = Image.open(path).convert("RGB")
    s = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x, y = (im.width - W) // 2, round((im.height - H) * focus)
    return im.crop((x, y, x + W, y + H)).convert("RGBA")


def main():
    crest = Image.open(PUB / "logo.png").convert("RGBA")
    crest = crest.resize((round(crest.width * 155 / crest.height), 155), Image.LANCZOS)
    overlay = shade()
    f_name, f_tag = font("PlusJakartaSans", 25, 700), font("PlusJakartaSans", 18, 400)
    f_title, f_sub, f_url = font("Outfit", 64, 600), font("PlusJakartaSans", 27, 400), font("PlusJakartaSans", 23, 600)

    (PUB / "og").mkdir(exist_ok=True)
    for slug, (name, focus, title, sub) in PAGES.items():
        c = photo(name, focus)
        c.alpha_composite(overlay)
        c.alpha_composite(crest, (73, 44))
        text = Image.new("RGBA", (W, H))
        d = ImageDraw.Draw(text)
        d.text((230, 117), "SHATABDI PUBLIC SCHOOL", font=f_name, fill=(255, 255, 255, 255), anchor="ls")
        d.text((231, 149), TAG, font=f_tag, fill=(255, 255, 255, 225), anchor="ls")
        lines = title.split("\n")
        for i, line in enumerate(lines):
            d.text((73, 424 - 72 * (len(lines) - 1 - i)), line, font=f_title, fill=(255, 255, 255, 255), anchor="ls")
        d.rounded_rectangle((72, 455, 191, 460), 3, fill=ACCENT + (255,))
        d.text((74, 511), sub, font=f_sub, fill=(255, 255, 255, 240), anchor="ls")
        d.text((72, 583), DOMAIN, font=f_url, fill=LINK + (255,), anchor="ls")
        c.alpha_composite(text)
        c.convert("RGB").save(PUB / "og" / f"{slug}.jpg", quality=86, optimize=True, progressive=True)
        print("wrote", f"public/og/{slug}.jpg")


if __name__ == "__main__":
    main()
