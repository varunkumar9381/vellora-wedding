from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "frontend" / "dist"
BACKEND = ROOT / "backend"
TEMPLATE_DIR = BACKEND / "templates" / "frontend"
STATIC_DIR = BACKEND / "static" / "frontend"

if not DIST.exists():
    raise SystemExit("React build missing. Run: cd frontend && npm install && npm run build")

TEMPLATE_DIR.mkdir(parents=True, exist_ok=True)
STATIC_DIR.mkdir(parents=True, exist_ok=True)

index = DIST / "index.html"
text = index.read_text(encoding="utf-8")
text = text.replace('src="/assets/', 'src="/static/frontend/assets/')
text = text.replace('href="/assets/', 'href="/static/frontend/assets/')
(TEMPLATE_DIR / "index.html").write_text(text, encoding="utf-8")

assets = DIST / "assets"
if assets.exists():
    shutil.copytree(assets, STATIC_DIR / "assets", dirs_exist_ok=True)

print("React build copied to Django successfully.")
