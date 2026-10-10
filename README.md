# Xarlie-Xarlie.github.io

Personal dev landing page for **CharlieCharlie** (Backend Developer @ ClassApp).
Plain **HTML / CSS / JS only** — no build step, no framework. Ready for GitHub Pages.

## Preview locally

```bash
cd Xarlie-Xarlie.github.io
python3 -m http.server 8080
# open http://localhost:8080
```

## Publish to GitHub Pages

`gh` CLI is not logged in on this machine, so run these steps once:

```bash
cd Xarlie-Xarlie.github.io

# 1. Login (one time)
gh auth login

# 2. Create the Pages repo (public, no template files — this folder IS the site)
gh repo create Xarlie-Xarlie.github.io --public --source=. --remote=origin --push

# 3. Enable Pages (repo named <user>.github.io serves automatically from main).
#    If it doesn't activate, go to: Settings → Pages → Deploy from branch → main / (root).
```

Your site will be live at **https://Xarlie-Xarlie.github.io** (a few minutes after first push).

## Edit me

- `index.html` — copy, sections, links (text uses `data-i18n` / `data-i18n-html` keys)
- `styles.css` — theme (`:root` variables at the top)
- `app.js` — project list (`FALLBACK`), translation dictionary (`I18N`), typing phrases, filters
- `photo.png` — profile photo shown in the hero card (72px circle, keep it square)
- Project cards auto-enrich from `api.github.com/users/Xarlie-Xarlie/repos` when online.
