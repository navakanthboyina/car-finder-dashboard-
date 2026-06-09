(() => {
  const candidates = [
    ["2023 Acura MDX Technology", "Norm Reeves Mazda of Irving", "Irving, TX", 36577, 37514, "5J8YD9H44PL006820", "CARFAX Great Value", "Panoramic moonroof", "Flexible 3-row cabin", "https://www.carfax.com/vehicle/5J8YD9H44PL006820"],
    ["2023 Acura MDX Technology AWD CPO", "Grubbs Acura", "Grapevine, TX", 37775, 44817, "5J8YE1H4XPL036631", "CARFAX Great Value + Acura CPO", "Panoramic moonroof", "Flexible 3-row cabin", "https://www.carfax.com/vehicle/5J8YE1H4XPL036631"],
    ["2024 Honda Pilot Touring CPO", "Honda Cars of Rockwall", "Rockwall, TX", 37449, 42777, "5FNYG2H70RB007119", "CARFAX Great Value + Honda CPO", "Panoramic moonroof", "Best rear-seat comfort", "https://www.carfax.com/vehicle/5FNYG2H70RB007119"],
    ["2025 Honda Pilot Touring AWD", "Graff Chevrolet Co", "Grand Prairie, TX", 39918, 25215, "5FNYG1H79SB072003", "CARFAX Great Value", "Panoramic moonroof", "Best rear-seat comfort", "https://www.carfax.com/vehicle/5FNYG1H79SB072003"],
    ["2024 Acura RDX Technology CPO", "Grubbs Acura", "Grapevine, TX", 39775, 7338, "5J8TC2H50RL034131", "CARFAX Great Value + Acura CPO", "Panoramic roof only", "5-seat rear bench", "https://www.carfax.com/vehicle/5J8TC2H50RL034131"],
    ["2024 Acura RDX Technology CPO", "Grubbs Acura", "Grapevine, TX", 36775, 26422, "5J8TC2H55RL040667", "CARFAX Great Value + Acura CPO", "Panoramic roof only", "5-seat rear bench", "https://www.carfax.com/vehicle/5J8TC2H55RL040667"],
    ["2024 Acura RDX A-Spec SH-AWD CPO", "Park Place Acura", "Plano, TX", 38992, 12469, "5J8TC2H63RL017512", "CARFAX Great Value + Acura CPO", "Panoramic roof only", "5-seat rear bench", "https://www.carfax.com/vehicle/5J8TC2H63RL017512"],
    ["2023 Acura RDX Technology CPO", "Park Place Acura", "Plano, TX", 34759, 20466, "5J8TC1H56PL009662", "CARFAX Great Value + Acura CPO", "Panoramic roof only", "5-seat rear bench", "https://www.carfax.com/vehicle/5J8TC1H56PL009662"],
    ["2024 Acura RDX A-Spec SH-AWD CPO", "Park Place Acura", "Plano, TX", 37175, 22800, "5J8TC2H64RL018250", "CARFAX Great Value + Acura CPO", "Panoramic roof only", "5-seat rear bench", "https://www.carfax.com/vehicle/5J8TC2H64RL018250"],
    ["2024 Acura RDX Base SH-AWD", "Hiley Acura of Fort Worth", "Fort Worth, TX", 34716, 15950, "5J8TC2H34RL027410", "CARFAX Great Value", "Panoramic roof only", "5-seat rear bench", "https://www.carfax.com/vehicle/5J8TC2H34RL027410"],
    ["2023 Acura RDX Technology", "Hiley Acura of Fort Worth", "Fort Worth, TX", 34516, 15923, "5J8TC1H50PL007454", "CARFAX Great Value", "Panoramic roof only", "5-seat rear bench", "https://www.carfax.com/vehicle/5J8TC1H50PL007454"],
    ["2024 Kia Telluride SX Prestige AWD CPO", "Vanguard Kia of Arlington", "Arlington, TX", 39220, 22740, "5XYP5DGC5RG500766", "CARFAX Great Value + Kia CPO", "Dual-pane moonroof", "Roomy 3-row cabin", "https://www.carfax.com/vehicle/5XYP5DGC5RG500766"],
    ["2023 Acura RDX A-Spec CPO", "Goodson Acura of Dallas", "Dallas, TX", 35275, 28561, "5J8TC1H69PL004366", "CARFAX Great Value + Acura CPO", "Panoramic roof only", "5-seat rear bench", "https://www.carfax.com/vehicle/5J8TC1H69PL004366"],
    ["2024 Acura RDX Technology CPO", "Goodson Acura of Dallas", "Dallas, TX", 39108, 7667, "5J8TC2H58RL037651", "CARFAX Great Value + Acura CPO", "Panoramic roof only", "5-seat rear bench", "https://www.carfax.com/vehicle/5J8TC2H58RL037651"],
    ["2023 Kia Telluride SX X-Line AWD CPO", "Moritz Kia Alliance", "Fort Worth, TX", 37223, 31824, "5XYP5DGC2PG352783", "CARFAX Great Value + Kia CPO", "Dual-pane moonroof", "Roomy 3-row cabin", "https://www.carfax.com/vehicle/5XYP5DGC2PG352783"],
    ["2022 Kia Telluride SX CPO", "Mesquite Kia", "Mesquite, TX", 34484, 25584, "5XYP54HC3NG264496", "CARFAX Great Value + Kia CPO", "Dual-pane moonroof", "Roomy 3-row cabin", "https://www.carfax.com/vehicle/5XYP54HC3NG264496"],
    ["2025 Acura RDX Technology SH-AWD", "Hiley Acura of Fort Worth", "Fort Worth, TX", 35716, 33933, "5J8TC2H59SL008522", "CARFAX Great Value", "Panoramic roof only", "5-seat rear bench", "https://www.carfax.com/vehicle/5J8TC2H59SL008522"],
    ["2025 Mazda CX-50 2.5 S Premium Plus", "Norm Reeves Mazda of Irving", "Irving, TX", 31888, 6926, "7MMVABEM8SN378924", "CARFAX Great Value", "Panoramic moonroof", "Wide 5-seat bench", "https://www.carfax.com/vehicle/7MMVABEM8SN378924"],
    ["2024 Mazda CX-50 Turbo Premium", "Toyota of Rockwall", "Rockwall, TX", 33001, 14035, "7MMVABDY1RN221573", "CARFAX Great Value", "Panoramic moonroof", "Wide 5-seat bench", "https://www.carfax.com/vehicle/7MMVABDY1RN221573"],
    ["2024 Mazda CX-50 2.5 S Premium Plus", "Clay Cooley Nissan Richardson", "Richardson, TX", 29715, 27694, "7MMVABEM6RN237764", "CARFAX Great Value", "Panoramic moonroof", "Wide 5-seat bench", "https://www.carfax.com/vehicle/7MMVABEM6RN237764"]
  ];

  function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("en-US").format(value);
  }

  function ensureFallbackStyles() {
    if (document.querySelector("#fallback-candidate-styles")) return;
    const style = document.createElement("style");
    style.id = "fallback-candidate-styles";
    style.textContent = `
      .audit-banner{grid-column:1/-1;border:1px solid rgba(122,80,34,.24);border-radius:22px;padding:22px 24px;background:rgba(213,170,75,.15)}
      .audit-banner h3{margin:0 0 6px}.audit-banner p{margin:0;color:#52615e;line-height:1.5}
      .fallback-card{position:relative;display:grid;gap:16px;border:1px solid rgba(20,33,31,.14);border-radius:34px;background:rgba(255,252,245,.88);padding:24px;box-shadow:0 14px 40px rgba(31,42,35,.08)}
      .fallback-card:before{content:"";position:absolute;inset:0;border-top:7px solid #466a7f;pointer-events:none}
      .fallback-top{display:grid;grid-template-columns:1fr auto;gap:16px}.fallback-card h3{margin:0}.fallback-subtitle{margin:8px 0 0;color:#52615e;line-height:1.45}
      .fallback-price{font-size:2rem;font-weight:900;letter-spacing:-.06em}.fallback-mileage{color:#52615e;font-weight:700}
      .fallback-badges{display:flex;flex-wrap:wrap;gap:8px}.fallback-badge{border:1px solid rgba(20,33,31,.12);border-radius:999px;background:rgba(255,250,240,.78);color:#52615e;padding:7px 10px;font-size:.78rem;font-weight:800}
      .fallback-badge.warn{color:#7a5022;background:rgba(213,170,75,.18)}.fallback-badge.great{color:#6c4311;background:rgba(213,170,75,.22)}
      .fallback-link{font-weight:800;color:#17463f}
      @media(max-width:900px){.fallback-top{grid-template-columns:1fr}}
    `;
    document.head.append(style);
  }

  function renderFallback() {
    const cards = document.querySelector("#cards");
    if (!cards || cards.querySelector(".vehicle-card") || cards.querySelector(".fallback-card")) return;
    ensureFallbackStyles();
    cards.innerHTML = `
      <div class="audit-banner">
        <h3>${candidates.length} source candidates need browser audit</h3>
        <p>The active verified count is still 0/20 because exact primary VIN pages were blocked during browser audit. These retained candidates are shown so the dashboard is not blank while follow-up audit is pending.</p>
      </div>
      ${candidates.map(([name, dealer, location, price, mileage, vin, deal, roof, rearFit, url], index) => `
        <article class="fallback-card">
          <div class="fallback-top">
            <div>
              <h3>${index + 1}. ${name}</h3>
              <p class="fallback-subtitle">${dealer} · ${location}<br>VIN ${vin}</p>
            </div>
            <div>
              <div class="fallback-price">${formatCurrency(price)}</div>
              <div class="fallback-mileage">${formatNumber(mileage)} mi</div>
            </div>
          </div>
          <div class="fallback-badges">
            <span class="fallback-badge">${roof}</span>
            <span class="fallback-badge great">${deal}</span>
            <span class="fallback-badge">${rearFit}</span>
            <span class="fallback-badge">CARFAX no accident/damage</span>
            <span class="fallback-badge warn">Needs exact-link browser audit</span>
          </div>
          <a class="fallback-link" href="${url}" target="_blank" rel="noreferrer">Exact VIN source</a>
        </article>
      `).join("")}
    `;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.setTimeout(renderFallback, 160), { once: true });
  } else {
    window.setTimeout(renderFallback, 160);
  }
})();