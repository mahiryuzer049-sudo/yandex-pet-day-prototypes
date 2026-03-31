from __future__ import annotations

import html
import re
import shutil
from pathlib import Path
from urllib.parse import unquote


ROOT = Path(__file__).resolve().parents[1]
BUILD_APP_DIR = ROOT / ".next" / "server" / "app"
STATIC_DIR = ROOT / ".next" / "static"
PUBLIC_DIR = ROOT / "public"
FAVICON_SRC = ROOT / "app" / "favicon.ico"
DEPLOY_DIR = ROOT.parent.parent / "yandex-pet-day-deploy"

BASE_PATH = "/yandex-pet-day-prototypes"

ROUTES = {
    "": "index",
    "variant-a": "variant-a",
    "variant-b": "variant-b",
    "privacy": "privacy",
}

ASSET_PREFIXES = (
    f"{BASE_PATH}/_next/static/",
    f"{BASE_PATH}/variant-a-assets/",
    f"{BASE_PATH}/favicon.ico",
)


def ensure_path(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)


def strip_next_runtime(document: str) -> str:
    document = re.sub(
        r"<script\b[^>]*>.*?</script>",
        "",
        document,
        flags=re.IGNORECASE | re.DOTALL,
    )
    document = re.sub(
        r"<link\b(?=[^>]*\brel=\"preload\")(?=[^>]*\bas=\"(?:script|image)\")[^>]*\/?>",
        "",
        document,
        flags=re.IGNORECASE,
    )
    document = document.replace('<div hidden=""><!--$--><!--/$--></div>', "")
    return document


def rewrite_next_image_urls(document: str) -> str:
    pattern = re.compile(r"/_next/image\?url=([^\"&\s]+)(?:&amp;|&)[^\"\s<]+")

    def replace(match: re.Match[str]) -> str:
        asset_path = unquote(html.unescape(match.group(1)))
        return f"{BASE_PATH}{asset_path}"

    return pattern.sub(replace, document)


def rewrite_html_paths(document: str) -> str:
    document = rewrite_next_image_urls(document)

    exact_replacements = {
        'href="/"': f'href="{BASE_PATH}/"',
        'href="/variant-a"': f'href="{BASE_PATH}/variant-a/"',
        'href="/variant-a/"': f'href="{BASE_PATH}/variant-a/"',
        'href="/variant-b"': f'href="{BASE_PATH}/variant-b/"',
        'href="/variant-b/"': f'href="{BASE_PATH}/variant-b/"',
        'href="/privacy"': f'href="{BASE_PATH}/privacy/"',
        'href="/privacy/"': f'href="{BASE_PATH}/privacy/"',
        'src="/variant-a-assets/': f'src="{BASE_PATH}/variant-a-assets/',
        'href="/variant-a-assets/': f'href="{BASE_PATH}/variant-a-assets/',
        'srcSet="/variant-a-assets/': f'srcSet="{BASE_PATH}/variant-a-assets/',
        'srcset="/variant-a-assets/': f'srcset="{BASE_PATH}/variant-a-assets/',
        'href="/_next/static/': f'href="{BASE_PATH}/_next/static/',
        'src="/_next/static/': f'src="{BASE_PATH}/_next/static/',
        'srcSet="/_next/static/': f'srcSet="{BASE_PATH}/_next/static/',
        'srcset="/_next/static/': f'srcset="{BASE_PATH}/_next/static/',
        'href="/favicon.ico': f'href="{BASE_PATH}/favicon.ico',
        'src="/favicon.ico': f'src="{BASE_PATH}/favicon.ico',
    }

    for source, target in exact_replacements.items():
        document = document.replace(source, target)

    document = re.sub(r"\s(?:srcSet|srcset)=\"[^\"]*\"", "", document)
    document = re.sub(r"\simageSrcSet=\"[^\"]*\"", "", document)
    document = re.sub(r"\simageSizes=\"[^\"]*\"", "", document)

    return document


def rewrite_css_paths(css_text: str) -> str:
    replacements = {
        "url(/variant-a-assets/": f"url({BASE_PATH}/variant-a-assets/",
        'url("/variant-a-assets/': f'url("{BASE_PATH}/variant-a-assets/',
        "url('/variant-a-assets/": f"url('{BASE_PATH}/variant-a-assets/",
        "url(/favicon.ico": f"url({BASE_PATH}/favicon.ico",
        'url("/favicon.ico': f'url("{BASE_PATH}/favicon.ico',
        "url('/favicon.ico": f"url('{BASE_PATH}/favicon.ico",
        "url(/_next/static/": f"url({BASE_PATH}/_next/static/",
        'url("/_next/static/': f'url("{BASE_PATH}/_next/static/',
        "url('/_next/static/": f"url('{BASE_PATH}/_next/static/",
    }

    for source, target in replacements.items():
        css_text = css_text.replace(source, target)

    return css_text


def write_route(route: str, html_name: str) -> None:
    source_name = "index.html" if route == "" else f"{route}.html"
    source_path = BUILD_APP_DIR / source_name
    document = source_path.read_text(encoding="utf-8")
    document = strip_next_runtime(document)
    document = rewrite_html_paths(document)

    flat_target = DEPLOY_DIR / f"{html_name}.html"
    nested_target = DEPLOY_DIR / html_name / "index.html"

    if html_name == "index":
        flat_target = DEPLOY_DIR / "index.html"
        nested_target = DEPLOY_DIR / "index.html"

    ensure_path(flat_target)
    flat_target.write_text(document, encoding="utf-8")

    if nested_target != flat_target:
        ensure_path(nested_target)
        nested_target.write_text(document, encoding="utf-8")


def copy_static_assets() -> None:
    (DEPLOY_DIR / ".nojekyll").write_text("", encoding="utf-8")

    static_target = DEPLOY_DIR / "_next" / "static"
    if static_target.exists():
        shutil.rmtree(static_target)

    shutil.copytree(STATIC_DIR, DEPLOY_DIR / "_next" / "static", dirs_exist_ok=True)
    shutil.copytree(PUBLIC_DIR, DEPLOY_DIR, dirs_exist_ok=True)

    if FAVICON_SRC.exists():
        shutil.copy2(FAVICON_SRC, DEPLOY_DIR / "favicon.ico")

    for css_file in (DEPLOY_DIR / "_next" / "static").rglob("*.css"):
        css_text = css_file.read_text(encoding="utf-8")
        css_file.write_text(rewrite_css_paths(css_text), encoding="utf-8")


def collect_referenced_assets(document: str) -> set[Path]:
    matches = re.findall(r"""(?:href|src)=["']([^"']+)["']""", document)
    referenced_assets: set[Path] = set()

    for match in matches:
        if not match.startswith(ASSET_PREFIXES):
            continue

        relative_path = match.removeprefix(f"{BASE_PATH}/").split("?", 1)[0]
        referenced_assets.add(DEPLOY_DIR / relative_path.replace("/", "\\"))

    return referenced_assets


def validate_export() -> None:
    missing_assets: set[Path] = set()

    for html_path in [
        DEPLOY_DIR / "index.html",
        DEPLOY_DIR / "variant-a.html",
        DEPLOY_DIR / "variant-b.html",
        DEPLOY_DIR / "privacy.html",
        DEPLOY_DIR / "variant-a" / "index.html",
        DEPLOY_DIR / "variant-b" / "index.html",
        DEPLOY_DIR / "privacy" / "index.html",
    ]:
        if not html_path.exists():
            raise SystemExit(f"Expected exported HTML is missing: {html_path}")

        document = html_path.read_text(encoding="utf-8")
        for asset_path in collect_referenced_assets(document):
            if not asset_path.exists():
                missing_assets.add(asset_path)

    if missing_assets:
        formatted_assets = "\n".join(f"- {path}" for path in sorted(missing_assets))
        raise SystemExit(f"Export validation failed. Missing referenced assets:\n{formatted_assets}")


def main() -> None:
    if not BUILD_APP_DIR.exists():
        raise SystemExit("Build output not found. Run `npm run build` first.")

    if not DEPLOY_DIR.exists():
        raise SystemExit(f"Deploy repo not found: {DEPLOY_DIR}")

    copy_static_assets()

    for route, html_name in ROUTES.items():
        write_route(route, html_name)

    validate_export()
    print(f"Exported static pages to {DEPLOY_DIR}")


if __name__ == "__main__":
    main()
