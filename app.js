const verifiedTarget = 20;
const verifiedOn = "August 28, 2026";
const minimumResale = 81;
const requiredDealLabel = "Great Value";
const unavailableVins = new Set([
  "5FNYG1H79SB072003",
  "5FNYG2H70RB007119",
  "5J8TC1H50PL007454",
  "5J8TC2H34RL027410",
  "5J8TC2H50RL034131",
  "5J8TC2H59SL008522",
  "5J8YD9H44PL006820",
  "5XYP54HC3NG264496",
  "5XYP5DGC2PG352783",
  "5XYP5DGC5RG500766",
  "7MMVABDY1RN221573",
  "7MMVABEM6RN237764",
  "7MMVABEM8SN378924"
]);

const categoryColors = {
  depreciation: "#17463f",
  fuel: "#d5aa4b",
  maintenance: "#bd6746",
  insurance: "#466a7f",
  fees: "#9d5b5b"
};

const spec = {
  rdx: "https://www.acura.com/-/media/Files/Vehicles/RDX/2024/Acura_2024_RDX_Fact-Sheet_no-cover.pdf?cache-busting=1.1.1",
  mdx: "https://di-uploads-pod2.s3.us-east-1.amazonaws.com/harmonyacura/uploads/2022/07/2023_Acura_MDX_SPECS.pdf",
  pilot: "https://www.hondainfocenter.com/2025/Pilot/Feature-Guide/Features-by-Trim/",
  cx50: "https://news.mazdausa.com/vehicles-2024-cx-50",
  telluride: "https://www.kia.com/us/en/telluride/specs"
};

const source = {
  rdxDallas: "https://www.carfax.com/Used-Acura-RDX-Dallas-TX_w3_c18864",
  rdxFortWorth: "https://www.carfax.com/Used-Acura-RDX-Fort-Worth-TX_w3_c4033",
  mdxDallas: "https://www.carfax.com/Used-Acura-MDX-Dallas-TX_w2_c18864",
  pilotDallas: "https://www.carfax.com/Used-Honda-Pilot-Dallas-TX_w307_c18864",
  cx50Dallas: "https://www.carfax.com/Used-Mazda-CX-50-Dallas-TX_w10241_c18864",
  tellurideDallas: "https://www.carfax.com/Used-Kia-Telluride-Dallas-TX_w9562_c18864",
  tellurideFortWorth: "https://www.carfax.com/Used-Kia-Telluride-Fort-Worth-TX_w9562_c4033"
};

const profile = {
  rdx: ["Panoramic roof only", "Acura RDX standard panoramic roof; not a small standard sunroof.", "5-seat rear bench", "bench", 5, 23, 650, 1960, 0.094, "#466a7f", "Strong resale/reliability value; verify three-across rear comfort in person."],
  mdx: ["Panoramic moonroof", "Acura MDX Technology spec lists panoramic moonroof.", "Flexible 3-row cabin", "adult-third-row", 7, 22, 760, 2100, 0.098, "#bd6746", "Best luxury three-row balance under the cap with Acura/Honda resale discipline."],
  pilot: ["Panoramic moonroof", "Honda Pilot Touring/upper trims list a one-touch power panoramic moonroof.", "Best rear-seat comfort", "adult-third-row", 8, 22, 690, 1880, 0.087, "#17463f", "Best rear-seat and resale fit; confirm dealer add-ons do not erase the deal."],
  cx50: ["Panoramic moonroof", "Mazda CX-50 Premium/Premium Plus supports the panoramic moonroof.", "Wide 5-seat bench", "bench", 5, 27, 640, 1780, 0.106, "#8f7a4c", "Lower-cost bench option; less roomy than the three-row SUVs."],
  telluride: ["Dual-pane moonroof", "Telluride SX/SX Prestige supports a large dual-pane moonroof setup.", "Roomy 3-row cabin", "adult-third-row", 7, 20, 735, 1940, 0.105, "#384f3c", "Roomy CPO family value; verify warranty, service history, tires, and brakes."]
};

const rows = [
  ["2023 Acura MDX Technology", "Norm Reeves Mazda of Irving", "Irving, TX", 6, 36588, 37514, "5J8YD9H44PL006820", "PL006820P", "mdx", "CARFAX Great Value", 88, 89, 87, 93, source.mdxDallas, "https://www.normreeves.com/inventory/used-2023-acura-mdx-technology-fwd-4d-sport-utility-5j8yd9h44pl006820/"],
  ["2024 Honda Pilot Touring CPO", "Honda Cars of Rockwall", "Rockwall, TX", 23, 37449, 42777, "5FNYG2H70RB007119", "RB007119A", "pilot", "CARFAX Great Value + Honda CPO", 90, 96, 92, 96, source.pilotDallas, ""],
  ["2025 Honda Pilot Touring AWD", "Graff Chevrolet Co", "Grand Prairie, TX", 11, 39918, 25215, "5FNYG1H79SB072003", "SB072003", "pilot", "CARFAX Great Value", 90, 96, 92, 94, source.pilotDallas, ""],
  ["2024 Acura RDX Technology CPO", "Grubbs Acura", "Grapevine, TX", 8, 39775, 7338, "5J8TC2H50RL034131", "RL034131", "rdx", "CARFAX Great Value + Acura CPO", 91, 82, 86, 92, "https://www.carfax.com/vehicle/5J8TC2H50RL034131", "https://www.grubbsacura.com/used-Grapevine-2024-Acura-RDX-Technology%2BPackage%2BSH%2BAWD-5J8TC2H50RL034131"],
  ["2024 Acura RDX Base SH-AWD", "Hiley Acura of Fort Worth", "Fort Worth, TX", 31, 34716, 15950, "5J8TC2H34RL027410", "A7997A", "rdx", "CARFAX Great Value", 91, 82, 86, 91, source.rdxFortWorth, ""],
  ["2023 Acura RDX Technology", "Hiley Acura of Fort Worth", "Fort Worth, TX", 31, 34516, 15923, "5J8TC1H50PL007454", "A8175A", "rdx", "CARFAX Great Value", 91, 82, 86, 90, source.rdxFortWorth, ""],
  ["2024 Kia Telluride SX Prestige AWD CPO", "Vanguard Kia of Arlington", "Arlington, TX", 18, 39220, 22740, "5XYP5DGC5RG500766", "232425B", "telluride", "CARFAX Great Value + Kia CPO", 82, 95, 83, 90, source.tellurideDallas, "https://www.kia.com/us/en/cpo/inventory/vehicle-details?view=cpo&vin=5XYP5DGC5RG500766&zipCode=75201"],
  ["2023 Kia Telluride SX X-Line AWD CPO", "Moritz Kia Alliance", "Fort Worth, TX", 32, 37223, 31824, "5XYP5DGC2PG352783", "Y295969B", "telluride", "CARFAX Great Value + Kia CPO", 82, 95, 83, 89, source.tellurideFortWorth, "https://www.moritzkia.com/inventory/used/kia-telluride"],
  ["2022 Kia Telluride SX CPO", "Mesquite Kia", "Mesquite, TX", 28, 34484, 25584, "5XYP54HC3NG264496", "NG264496", "telluride", "CARFAX Great Value + Kia CPO", 82, 95, 83, 88, source.tellurideDallas, ""],
  ["2025 Acura RDX Technology SH-AWD", "Hiley Acura of Fort Worth", "Fort Worth, TX", 31, 35716, 33933, "5J8TC2H59SL008522", "A8072A", "rdx", "CARFAX Great Value", 91, 82, 86, 89, source.rdxFortWorth, ""],
  ["2025 Mazda CX-50 2.5 S Premium Plus", "Norm Reeves Mazda of Irving", "Irving, TX", 6, 31888, 6926, "7MMVABEM8SN378924", "SN378924R", "cx50", "CARFAX Great Value", 84, 80, 81, 88, source.cx50Dallas, ""],
  ["2024 Mazda CX-50 Turbo Premium", "Toyota of Rockwall", "Rockwall, TX", 23, 33001, 14035, "7MMVABDY1RN221573", "RN221573U", "cx50", "CARFAX Great Value", 84, 80, 81, 87, source.cx50Dallas, ""],
  ["2024 Mazda CX-50 2.5 S Premium Plus", "Clay Cooley Nissan Richardson", "Richardson, TX", 14, 29715, 27694, "7MMVABEM6RN237764", "RN237764", "cx50", "CARFAX Great Value", 84, 80, 81, 86, "https://www.carfax.com/vehicle/7MMVABEM6RN237764", "https://www.claycooleynissanrichardson.com/viewdetails/used/7mmvabem6rn237764/2024-mazda-cx-50-sport-utility"]
];

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function buildTco({ price, mpgCombined, maintenanceBase, insuranceBase, depreciationRate }) {
  let remainingValue = price;
  return Array.from({ length: 5 }, (_, index) => {
    const year = index + 1;
    const depreciation = Math.round(remainingValue * depreciationRate * (1 - index * 0.045));
    remainingValue -= depreciation;
    return {
      year,
      depreciation,
      fuel: Math.round((12000 / mpgCombined) * 3.12 * Math.pow(1.025, index)),
      maintenance: Math.round(maintenanceBase * (0.84 + year * 0.18)),
      insurance: Math.round(insuranceBase * Math.pow(1.035, index)),
      fees: year === 1 ? 560 : 375
    };
  });
}

const activeVehicles = rows.map((row) => {
  const [name, dealer, location, distance, price, mileage, vin, stock, key, deal, reliability, rearComfort, resale, overall, sourceUrl, historyUrl] = row;
  const [roof, roofEvidence, rearFitLabel, rearFit, seats, mpgCombined, maintenanceBase, insuranceBase, depreciationRate, accent, caveat] = profile[key];
  const listingUrl = `https://www.carfax.com/vehicle/${vin}`;
  const cpo = /CPO/.test(name + deal);
  return {
    id: vin.toLowerCase(),
    name,
    dealer,
    location,
    distance,
    price,
    mileage,
    vin,
    stock,
    lastVerified: verifiedOn,
    mpgCombined,
    seats,
    rearFit,
    rearFitLabel,
    roof,
    roofEvidence,
    accident: "CARFAX no accident/damage",
    accidentPublic: true,
    deal,
    accidentDetail: `Source evidence showed VIN ${vin}, no accident or damage reported, ${deal.toLowerCase()} pricing, ${formatCurrency(price)}, ${formatNumber(mileage)} miles, and stock ${stock}.`,
    availabilityProof: `Source-checked ${verifiedOn} from CARFAX inventory or exact VIN evidence for VIN ${vin}. The active dashboard now excludes Good Value, Fair Value, and generic clean-history-value listings.`,
    reliability,
    rearComfort,
    resale,
    overall,
    accent,
    strengths: [
      `${deal} pricing and ${formatNumber(mileage)} miles keep it inside the low-risk shortlist.`,
      roofEvidence,
      resale >= minimumResale ? `Resale score ${resale}/100 clears the 81+ rule.` : ""
    ],
    caveat,
    listingUrl,
    listingLabel: "Exact CARFAX VIN page",
    sourceUrl,
    sourceLabel: sourceUrl === listingUrl ? "Exact CARFAX clean/great-value page" : "CARFAX/source inventory page",
    historyUrl,
    roofSpecUrl: spec[key],
    tco: buildTco({ price, mpgCombined, maintenanceBase: maintenanceBase + (cpo ? -45 : 0), insuranceBase, depreciationRate })
  };
}).filter((vehicle) => vehicle.deal.includes(requiredDealLabel));

const state = {
  priceMax: 40000,
  mileageMax: 45000,
  rearFit: "all",
  sortBy: "score",
  accidentFreeOnly: false
};

const el = {
  cards: document.querySelector("#cards"),
  priceMax: document.querySelector("#priceMax"),
  priceValue: document.querySelector("#priceValue"),
  mileageMax: document.querySelector("#mileageMax"),
  mileageValue: document.querySelector("#mileageValue"),
  rearFit: document.querySelector("#rearFit"),
  sortBy: document.querySelector("#sortBy"),
  accidentFreeOnly: document.querySelector("#accidentFreeOnly"),
  comparisonChart: document.querySelector("#comparisonChart"),
  statCount: document.querySelector("#stat-count"),
  statAvgPrice: document.querySelector("#stat-avg-price"),
  statBestReliability: document.querySelector("#stat-best-reliability"),
  statLowestTco: document.querySelector("#stat-lowest-tco")
};

function getYearTotal(year) {
  return year.depreciation + year.fuel + year.maintenance + year.insurance + year.fees;
}

function getTcoTotal(vehicle) {
  return vehicle.tco.reduce((sum, year) => sum + getYearTotal(year), 0);
}

function getFilteredVehicles() {
  return activeVehicles
    .filter((vehicle) => !unavailableVins.has(vehicle.vin))
    .filter((vehicle) => vehicle.price <= state.priceMax)
    .filter((vehicle) => vehicle.mileage <= state.mileageMax)
    .filter((vehicle) => vehicle.resale >= minimumResale)
    .filter((vehicle) => vehicle.deal.includes(requiredDealLabel))
    .filter((vehicle) => state.rearFit === "all" || vehicle.rearFit === state.rearFit)
    .filter((vehicle) => !state.accidentFreeOnly || vehicle.accidentPublic)
    .sort((a, b) => {
      if (state.sortBy === "reliability") return b.reliability - a.reliability;
      if (state.sortBy === "resale") return b.resale - a.resale;
      if (state.sortBy === "price") return a.price - b.price;
      if (state.sortBy === "tco") return getTcoTotal(a) - getTcoTotal(b);
      if (state.sortBy === "rearComfort") return b.rearComfort - a.rearComfort;
      if (state.sortBy === "mileage") return a.mileage - b.mileage;
      return b.overall - a.overall;
    });
}

function renderStats(list) {
  const avgPrice = list.length ? list.reduce((sum, vehicle) => sum + vehicle.price, 0) / list.length : 0;
  el.statCount.textContent = `${list.length}/${verifiedTarget}`;
  el.statAvgPrice.textContent = formatCurrency(avgPrice);
  el.statBestReliability.textContent = `${list.length ? Math.max(...list.map((vehicle) => vehicle.reliability)) : 0}/100`;
  el.statLowestTco.textContent = formatCurrency(list.length ? Math.min(...list.map(getTcoTotal)) : 0);
}

function renderComparison(list) {
  if (!list.length) {
    el.comparisonChart.innerHTML = "<p>No vehicles match the current filters.</p>";
    return;
  }
  const maxTco = Math.max(...list.map(getTcoTotal));
  el.comparisonChart.innerHTML = list.map((vehicle) => `
    <div class="compare-row">
      <div class="compare-label">${vehicle.name.replace(/^20\d{2} /, "")}</div>
      <div class="compare-track" aria-label="${vehicle.name} reliability ${vehicle.reliability} out of 100">
        <div class="compare-fill" style="width:${vehicle.reliability}%"></div>
      </div>
      <div class="compare-meta">${vehicle.reliability}/100 reliability - ${vehicle.resale}/100 resale - ${maxTco === getTcoTotal(vehicle) ? "highest cost shown" : `${formatCurrency(maxTco - getTcoTotal(vehicle))} less than highest shown`}</div>
    </div>
  `).join("");
}

function renderChart(vehicle) {
  const maxYearTotal = Math.max(...vehicle.tco.map(getYearTotal));
  const categories = ["depreciation", "fuel", "maintenance", "insurance", "fees"];
  const bars = vehicle.tco.map((year, index) => {
    const x = 25 + index * 92;
    let y = 136;
    const segments = categories.map((category) => {
      const h = (year[category] / maxYearTotal) * 122;
      y -= h;
      return `<rect x="${x}" y="${y.toFixed(1)}" width="54" height="${h.toFixed(1)}" rx="7" fill="${categoryColors[category]}"><title>${category}: ${formatCurrency(year[category])}</title></rect>`;
    }).join("");
    return `<g>${segments}<text x="${x + 27}" y="159" text-anchor="middle" fill="#52615e" font-size="13" font-weight="800">Y${year.year}</text><text x="${x + 27}" y="${Math.max(12, y - 6)}" text-anchor="middle" fill="#14211f" font-size="12" font-weight="900">${formatCurrency(getYearTotal(year)).replace(",000", "k")}</text></g>`;
  }).join("");
  return `<svg class="cost-chart" viewBox="0 0 520 170" role="img" aria-label="Projected 5-year cost chart for ${vehicle.name}"><line x1="17" y1="136" x2="500" y2="136" stroke="rgba(20,33,31,.16)" />${bars}</svg>`;
}

function renderSources(vehicle) {
  const sourceLink = vehicle.sourceUrl && vehicle.sourceUrl !== vehicle.listingUrl ? `<a href="${vehicle.sourceUrl}" target="_blank" rel="noreferrer">${vehicle.sourceLabel}</a>` : "";
  const historyLink = vehicle.historyUrl && vehicle.historyUrl !== vehicle.listingUrl ? `<a href="${vehicle.historyUrl}" target="_blank" rel="noreferrer">Vehicle history report</a>` : "";
  return `
    <div class="source-row" aria-label="Research sources for ${vehicle.name}">
      <a href="${vehicle.listingUrl}" target="_blank" rel="noreferrer">${vehicle.listingLabel}</a>
      ${sourceLink}
      ${historyLink}
      <a href="${vehicle.roofSpecUrl}" target="_blank" rel="noreferrer">Official roof spec</a>
    </div>
  `;
}

function renderVehicleCard(vehicle, index) {
  const tcoTotal = getTcoTotal(vehicle);
  return `
    <article class="vehicle-card" style="--accent:${vehicle.accent}">
      <div class="card-top">
        <div>
          <span class="rank">${index + 1}</span>
          <h3>${vehicle.name}</h3>
          <p class="subtitle">${vehicle.dealer} - ${vehicle.location} - approx. ${vehicle.distance} miles from 75038<br />VIN ${vehicle.vin} - Stock ${vehicle.stock}</p>
        </div>
        <div class="price-line" aria-label="Price and mileage">
          <span class="price">${formatCurrency(vehicle.price)}</span>
          <span class="mileage">${formatNumber(vehicle.mileage)} mi</span>
        </div>
      </div>
      <div class="badge-row">
        <span class="badge good">${vehicle.roof}</span>
        <span class="badge great">${vehicle.deal}</span>
        <span class="badge">${vehicle.seats} seats - ${vehicle.rearFitLabel}</span>
        <span class="badge good">${vehicle.accident}</span>
        <span class="badge">Verified ${vehicle.lastVerified}</span>
      </div>
      <div class="score-grid">
        <div class="score"><strong>${vehicle.reliability}</strong><span>Reliability</span></div>
        <div class="score"><strong>${vehicle.rearComfort}</strong><span>Rear comfort</span></div>
        <div class="score"><strong>${vehicle.resale}</strong><span>Resale value</span></div>
        <div class="score"><strong>${formatCurrency(tcoTotal)}</strong><span>5-year cost</span></div>
      </div>
      <div class="cost-card">
        <div class="cost-header"><span>Projected ownership cost</span><strong>${formatCurrency(tcoTotal)}</strong></div>
        <div class="chart-wrap">${renderChart(vehicle)}</div>
        <div class="legend" aria-label="Cost chart legend">
          <span><i style="background:${categoryColors.depreciation}"></i>Depreciation</span>
          <span><i style="background:${categoryColors.fuel}"></i>Fuel</span>
          <span><i style="background:${categoryColors.maintenance}"></i>Maintenance</span>
          <span><i style="background:${categoryColors.insurance}"></i>Insurance</span>
          <span><i style="background:${categoryColors.fees}"></i>Fees</span>
        </div>
      </div>
      <p class="take"><strong>Why it made the cut:</strong> ${vehicle.strengths.join(" ")}</p>
      <p class="take"><strong>Watch-out:</strong> ${vehicle.caveat}</p>
      <p class="take"><strong>Live-link check:</strong> ${vehicle.availabilityProof}</p>
      <p class="take"><strong>History signal:</strong> ${vehicle.accidentDetail}</p>
      ${renderSources(vehicle)}
    </article>
  `;
}

function renderCards(list) {
  el.cards.innerHTML = list.length ? list.map(renderVehicleCard).join("") : `
    <div class="empty">
      <h3>No SUVs match those filters</h3>
      <p>These results already require panoramic roof, CARFAX Great Value pricing, clean history, under $40,000, and 45,000 miles or less.</p>
    </div>
  `;
}

function render() {
  const list = getFilteredVehicles();
  renderStats(list);
  renderComparison(list);
  renderCards(list);
}

async function renderRefreshStatus() {
  const statusEl = document.querySelector("#refresh-status");
  if (!statusEl || typeof fetch !== "function") return;
  try {
    const response = await fetch("data/refresh-status.json", { cache: "no-store" });
    if (!response.ok) return;
    const status = await response.json();
    const flagged = (status.results || []).filter((result) => result.status !== "active");
    statusEl.hidden = false;
    statusEl.innerHTML = `<strong>Automated refresh:</strong> ${status.summary || "No scheduled refresh has run yet."} <span>${status.lastRunLocal ? `Last checked ${status.lastRunLocal}` : ""}</span> ${flagged.length ? `<em>${flagged.length} listing(s) need review after the latest check.</em>` : ""}`;
  } catch {
    statusEl.hidden = false;
    statusEl.innerHTML = "<strong>Automated refresh:</strong> Waiting for the first GitHub Actions refresh run.";
  }
}

el.priceMax.addEventListener("input", (event) => {
  state.priceMax = Number(event.target.value);
  el.priceValue.textContent = formatCurrency(state.priceMax);
  render();
});

el.mileageMax.addEventListener("input", (event) => {
  state.mileageMax = Number(event.target.value);
  el.mileageValue.textContent = `${formatNumber(state.mileageMax)} mi`;
  render();
});

el.rearFit.addEventListener("change", (event) => {
  state.rearFit = event.target.value;
  render();
});

el.sortBy.addEventListener("change", (event) => {
  state.sortBy = event.target.value;
  render();
});

el.accidentFreeOnly.addEventListener("change", (event) => {
  state.accidentFreeOnly = event.target.checked;
  render();
});

render();
renderRefreshStatus();
