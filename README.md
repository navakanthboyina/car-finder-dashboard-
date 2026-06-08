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

Data was refreshed on June 8, 2026 from live dealer detail pages, exact CARFAX
VIN pages, manufacturer CPO pages, and official trim/spec sources for panoramic-roof proof. Model-level
reliability, resale, and ownership-cost signals were cross-checked against
RepairPal, Kelley Blue Book, and manufacturer trim/spec references. The dashboard
intentionally excludes cars that only have aggregator evidence from Capital One,
Cars.com, CarGurus, CarPro, Edmunds, TrueCar, Autotrader, or similar sites unless
an exact dealer, CARFAX, or manufacturer CPO page confirms the same VIN and availability.
Availability, price, incentives, and vehicle-history reports can change daily, so
request a fresh VIN history report and a pre-purchase inspection before
committing.

The current live-link refresh found 20 listings with resale scores above 80,
exact VIN links, clean CARFAX/dealer evidence, panoramic-roof proof, mileage at
or below 45,000, and pricing under $40,000. The dashboard stays intentionally
strict instead of padding with stale, damaged, dead-link, small-sunroof, or
poor-resale results.

June 8, 2026 refresh note: the verified count is `20/20`. The active dashboard
now includes Acura, Honda, Hyundai, Kia, Lincoln, and Mazda matches. No brand is
blocked automatically, including luxury brands; every VIN is judged by the same
live-link, clean-history, roof, rear-comfort, resale, market-price, mileage, and
ownership-risk rules.

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
- Rank by VIN-level ownership quality, not brand bias: resale score, reliability,
  rear-seat comfort, warranty/CPO status, maintenance exposure, deal quality,
  mileage, and exact-page availability all matter.
- Target 20 genuine matches. If fewer than 20 cars truly meet the standards, show
  the verified count rather than filling the dashboard with questionable listings.
