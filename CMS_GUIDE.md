# Content CMS Guide

This app's devotional content (categories, weekly verses, devotionals, bonus
vitamins) lives as JSON files under `/content` and can be edited either by
hand or through a visual editor (Decap CMS) at `/admin`.

The CMS is **local-only**: there's no hosting, login, or account to set up.
It runs a small local server that reads and writes files directly in this
git working tree — the same as if you'd edited them yourself and left them
unstaged.

## 1. Start both servers

You need two terminals open at the same time, both in the project folder.

**Terminal 1 — the app:**
```
npm run dev
```
Leave this running. It'll print a URL, usually `http://localhost:5173/`.

**Terminal 2 — the CMS proxy:**
```
npm run cms
```
Leave this running too. It prints `Decap CMS Proxy Server listening on port 8081`.

## 2. Open the CMS

Go to **`http://localhost:5173/admin/index.html`** in your browser.

(Note the explicit `index.html` — Vite's dev server doesn't auto-resolve
`/admin/` to the file inside it the way a real host would. On the live/built
site, `/admin/` alone works fine.)

You should see the Decap CMS UI with two collections in the left sidebar:
**Categories** and **Category Groups**.

## 3. Edit a category

1. Click **Categories**, then pick one (e.g. "Faith").
2. You'll see:
   - **Label / Emoji** — the name and icon shown in the app.
   - **Gradient colors** — the two hex colors used for that category's look. Click a swatch to open a color picker.
   - **Group** — which of the 4 drum faces it belongs to.
   - **Weekly vitamins (Sunday → Saturday)** — a list of exactly 7 entries, one per day. Each has a **Scripture** (verse + reference) and a **Quote** (verse + author) — tapping the card in the app flips between the two. Some categories don't have a distinct quote in the original source; for those, the quote just repeats the scripture.
   - **Bonus Vitamin** — the extra scripture+quote pair shown when someone taps the "✨ Bonus" button while browsing this category.
   - **Devotional** — an optional, longer read-through: title, an optional highlighted scripture, and a few body paragraphs. 49 of the 50 categories have one (ported from the original site's devotional letters); only "Purity" doesn't yet.
3. Click **Save** (top right). This writes straight to `content/categories/<id>.json` in your working tree — nothing is committed to git yet.

Don't edit the **ID** field — it must match the filename and is what the app uses to look up content internally. Renaming it here won't rename the file, so it'll break the link.

## 4. Edit groups

**Category Groups** is a single entry (`content/groups.json`) listing the 4 drum faces — label and gradient colors for each.

## 5. Review and commit your changes

The CMS only edits files locally — it does not commit or push anything. After making edits:

```
git status
git diff
```

to see what changed, then commit as usual (e.g. `git add content && git commit -m "..."`) when you're happy with it.

## Notes

- Categories can't be created or deleted through the CMS (there are a fixed 50, ported over from the original site's content) — only their content can be edited.
- If the CMS won't load, make sure **both** terminals are still running — the page needs the dev server (5173) for the UI shell and the proxy (8081) for reading/writing files.
- Refresh `/admin/index.html` if you edited a JSON file by hand while the CMS was open — it doesn't auto-detect outside changes.
