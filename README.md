# Fortune Finder — Client Demo

Static showcase site for the **Fortune Finder** Feng Shui app (from the client proposal).

## What's included

- Marketing landing page aligned with the proposal (red / gold / cream branding)
- **5-step flow**: personal info → home & lifestyle questions → demo payment ($2) → generated report
- **Sample report** section (Dragon / 1988 example from the proposal)
- Personalised report with Chinese zodiac, lucky profile, fortune categories, and Feng Shui home tips

## Run locally

```bash
cd public
php -S 127.0.0.1:8765
```

Open [http://127.0.0.1:8765](http://127.0.0.1:8765)

Or open `public/index.html` directly in a browser (some features work best over HTTP).

## Next steps (production)

- Wire Laravel backend, Stripe / PayPal, and email PDF delivery
- Persist readings and user accounts
- Replace demo payment with real checkout