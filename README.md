# DFW Used SUV Dashboard

Standalone dashboard for a 50-mile used SUV search around ZIP `75038`, under
`$40,000`, with a default `45,000` mile cap, strict panoramic moonroof filtering,
rear-seat comfort notes, resale-value scoring, resale above 80 filtering, great-market-value screening, and
5-year ownership cost estimates.

Open `index.html` directly in a browser, or run a tiny static server:

```sh
python3 -m http.server 4173
```

Then visit `http://127.0.0.1:4173`.

## Free GitHub Pages hosting

This project is ready for free GitHub Pages hosting. After the files are pushed
to a GitHub repository:

1. Open the repository on GitHub.
2. Go to `Settings` -> `Pages`.
3. Under `Build and deployment`, choose `GitHub Actions`.
4. Run the `Deploy dashboard to GitHub Pages` workflow manually once, or push to
   `main`/`master`.
5. The public URL will be `https://<github-username>.github.io/<repo-name>/`.

The scheduled `Refresh vehicle listings` workflow runs every 8 hours using:

```yaml
cron: "17 */8 * * *"
```

The minute is intentionally `17`, not `0`, because GitHub scheduled jobs can be
delayed more often at the top of the hour. The refresh job rechecks exact VIN
links, updates `data/refresh-status.json`, updates the visible verification date
in `app.js`, and hides any VIN whose primary exact page starts showing stale,
unavailable, missing-VIN, or page-not-found behavior.

Free automation caveat: GitHub Actions can reliably recheck exact VIN pages and
remove stale cards. Fully discovering brand-new inventory every 8 hours without a
paid inventory API is less reliable because CARFAX and dealer sites may block
automated scraping. Keep exact new VINs in the dashboard data, then the scheduled
job will keep them honest.

Data was refreshed on June 7, 2026 from live dealer detail pages, exact CARFAX
VIN pages, manufacturer CPO pages, and official trim/spec sources for panoramic-roof proof. Model-level
reliability, resale, and ownership-cost signals were cross-checked against
RepairPal, Kelley Blue Book, and manufacturer trim/spec references. The dashboard
intentionally excludes cars that only have aggregator evidence from Capital One,
Cars.com, CarGurus, CarPro, Edmunds, TrueCar, Autotrader, or similar sites unless
an exact dealer, CARFAX, or manufacturer CPO page confirms the same VIN and availability.
Availability, price, incentives, and vehicle-history reports can change daily, so
request a fresh VIN history report and a pre-purchase inspection before
committing.

The current live-link refresh found 12 listings with resale scores above 80,
exact VIN links, clean CARFAX/dealer evidence, panoramic-roof proof, mileage at
or below 45,000, and pricing under $40,000. The dashboard stays intentionally
short instead of padding with stale results. Showing fewer than 20 cars is
expected when the rest fail availability, mileage, clean-history, panoramic-roof,
market-value, or resale-score checks.

June 7, 2026 evening refresh note: the verified count is `12/20`. The active
dashboard now keeps only resale-81+ vehicles: Acura MDX, Acura RDX, Kia
Telluride SX Prestige, and Mazda CX-50 Premium/Premium Plus/Turbo Premium
matches. The prior Honda Pilot was removed because the Honda dealer detail page
now returns a page-not-found/Oops screen. Mazda CX-90 and Nissan Pathfinder
results were removed from the active dashboard because they do not clear the
strict above-80 resale rule.

Every-8-hour refresh criteria:

- Used SUV within 50 miles of ZIP `75038`.
- Listing price under `$40,000`.
- Mileage at or below `45,000`.
- True panoramic moonroof, panoramic sunroof, panoramic roof, or panoramic glass
  roof must be listed or clearly supported by official trim/package data.
- Exclude standard/small sunroofs even when the vehicle is otherwise a good deal.
- Require clean-title/no-accident/no-damage history from CARFAX or dealer-owned
  inventory evidence.
- Require resale value score above `80`; anything scored `80` or below is
  excluded from the active dashboard.
- Require CARFAX `Great Value` or dealer-owned market-price evidence showing the
  listing is materially under market value.
- Before keeping a car, browser-audit the primary card link. It must load a
  dealer-owned vehicle detail page, manufacturer CPO page, or exact CARFAX VIN
  page, show the exact VIN, and avoid sold/no-longer-available/page-not-found
  messaging.
- Exclude dead exact links, vague marketplace-only listings, accident/minor
  damage/major damage reports, branded titles, salvage/rebuilt titles,
  not-actual-mileage records, and unclear roof/trim matches.
- Rank higher resale-value, lower-maintenance brands and trims first, especially
  Toyota, Honda, Lexus, and Acura, then only include Kia Telluride and Mazda
  CX-50 choices when price, warranty/CPO status, clean history, rear comfort,
  resale, and ownership-risk profile clearly beat alternatives.
- Target 20 genuine matches. If fewer than 20 cars truly meet the standards, show
  the verified count rather than filling the dashboard with questionable listings.
