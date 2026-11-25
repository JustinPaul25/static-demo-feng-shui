# Fortune Finder — Client Demo (Static Site)

Static showcase for the **Fortune Finder** Feng Shui app. No build step, no server — ready for **GitHub Pages**.

## What's included

- Marketing landing page (red / gold / cream branding)
- **5-step flow**: personal info → home questions → demo $2 payment → generated report
- **Sample report** (Dragon / 1988 from the proposal)
- Chinese zodiac, lucky profile, fortune categories, Feng Shui home tips

## Publish on GitHub Pages

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose your branch (e.g. `main`) and folder **`/ (root)`**, then **Save**.
5. After a minute or two, the site is live at:
   - `https://<username>.github.io/<repo-name>/`

The repo includes a `.nojekyll` file so GitHub Pages serves the site as plain static HTML (no Jekyll processing).

## Run locally

Open `index.html` in a browser, or use any static file server:

```bash
npx --yes serve .
```

Then open the URL shown in the terminal (usually `http://localhost:3000`).

## Project layout

```
index.html          # Entry page
css/styles.css      # Styles
js/app.js           # Wizard UI
js/zodiac-data.js   # Report logic
.nojekyll           # GitHub Pages
```

## Production (later)

- Laravel backend, real Stripe / PayPal, email PDF delivery, saved readings