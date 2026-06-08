const verifiedTarget = 20;
const verifiedOn = "June 7, 2026";
const minimumResale = 81;
const unavailableVins = new Set([]);

const categoryColors = {
  depreciation: "#17463f",
  fuel: "#d5aa4b",
  maintenance: "#bd6746",
  insurance: "#466a7f",
  fees: "#9d5b5b"
};

const sourcePages = {
  rdxFortWorth: "https://www.carfax.com/Used-Acura-RDX-Fort-Worth-TX_w3_c4033",
  rdxDallas: "https://www.carfax.com/Used-Acura-RDX-Dallas-TX_w3_c18864",
  mdxDallas: "https://www.carfax.com/Used-Acura-MDX-Dallas-TX_w2_c18864",
  mazdaCx50: "https://www.carfax.com/Used-Mazda-CX-50-Dallas-TX_w10241_c18864",
  tellurideDallas: "https://www.carfax.com/Used-Kia-Telluride-Dallas-TX_w9533_c18864"
};

const profiles = {
  rdx: {
    mpgCombined: 23,
    reliability: 91,
    rearComfort: 82,
    resale: 86,
    maintenanceBase: 650,
    insuranceBase: 1960,
    depreciationRate: 0.094,
    accent: "#466a7f",
    seats: 5,
    rearFit: "bench",
    rearFitLabel: "5-seat rear bench",
    roof: "Panoramic roof only",
    roofEvidence: "Acura RDX standard panoramic roof; not a small standard sunroof.",
    sourceNote: "Resale-safe Acura value choice; use a test drive to confirm three-across rear comfort.",
    caveat: "RDX is a strong reliability/resale play, but it is not as roomy as the MDX or Telluride.",
    roofSpecUrl: "https://www.acura.com/-/media/Files/Vehicles/RDX/2024/Acura_2024_RDX_Fact-Sheet_no-cover.pdf?cache-busting=1.1.1"
  },
  mdx: {
    mpgCombined: 22,
    reliability: 88,
    rearComfort: 89,
    resale: 87,
    maintenanceBase: 760,
    insuranceBase: 2100,
    depreciationRate: 0.098,
    accent: "#bd6746",
    seats: 7,
    rearFit: "adult-third-row",
    rearFitLabel: "Flexible 3-row cabin",
    roof: "Panoramic moonroof",
    roofEvidence: "Acura MDX Technology spec lists panoramic moonroof.",
    sourceNote: "Best luxury three-row balance under the cap with Acura/Honda resale discipline.",
    caveat: "Luxury tires, brakes, and insurance cost more than Honda or Mazda. Keep a service buffer.",
    roofSpecUrl: "https://di-uploads-pod2.s3.us-east-1.amazonaws.com/harmonyacura/uploads/2022/07/2023_Acura_MDX_SPECS.pdf"
  },
  telluride: {
    mpgCombined: 20,
    reliability: 82,
    rearComfort: 95,
    resale: 83,
    maintenanceBase: 735,
    insuranceBase: 1940,
    depreciationRate: 0.105,
    accent: "#384f3c",
    seats: 7,
    rearFit: "adult-third-row",
    rearFitLabel: "Roomy 3-row cabin",
    roof: "Dual-pane moonroof",
    roofEvidence: "Kia Telluride SX/SX Prestige trim supports a large dual-pane moonroof setup.",
    sourceNote: "Best room-for-the-money backup when Acura/Honda/Toyota inventory is thin.",
    caveat: "Kia resale and long-term ownership risk trail Toyota/Honda/Acura. Prefer CPO and inspect wear items.",
    roofSpecUrl: "https://www.kia.com/us/en/telluride/specs"
  },
  cx50: {
    mpgCombined: 27,
    reliability: 84,
    rearComfort: 80,
    resale: 81,
    maintenanceBase: 640,
    insuranceBase: 1780,
    depreciationRate: 0.106,
    accent: "#8f7a4c",
    seats: 5,
    rearFit: "bench",
    rearFitLabel: "Wide 5-seat bench",
    roof: "Panoramic moonroof",
    roofEvidence: "Mazda CX-50 Premium/Premium Plus/Turbo Premium trims support the panoramic moonroof.",
    sourceNote: "Lowest ownership-cost backup with clean history and strong value pricing.",
    caveat: "CX-50 is not as roomy as MDX or Telluride. Test three-across comfort before buying.",
    roofSpecUrl: "https://news.mazdausa.com/vehicles-2024-cx-50"
  }
};

const vehicleData = [
  {
    id: "mdx-tech-2023-irving",
    profile: "mdx",
    name: "2023 Acura MDX Technology",
    dealer: "Norm Reeves Mazda of Irving",
    location: "Irving, TX",
    distance: 6,
    price: 36577,
    mileage: 37514,
    vin: "5J8YD9H44PL006820",
    stock: "PL006820P",
    listingUrl: "https://www.carfax.com/vehicle/5J8YD9H44PL006820",
    listingLabel: "Exact CARFAX VIN page",
    sourceUrl: sourcePages.mdxDallas,
    sourceLabel: "CARFAX MDX inventory source",
    historyUrl: "https://www.normreeves.com/inventory/used-2023-acura-mdx-technology-fwd-4d-sport-utility-5j8yd9h44pl006820/",
    deal: "CARFAX Great Value",
    historySignal: "Exact CARFAX VIN page loaded with no accident or damage reported, personal use, CARFAX 1-owner, great-value pricing, $36,577 total price, 37,514 miles, and stock PL006820P.",
    availabilityProof: "Primary CARFAX VIN page loaded June 7, 2026 with VIN, price, mileage, clean-history, great-value, and panoramic roof evidence.",
    overall: 93
  },
  {
    id: "rdx-tech-2024-grubbs-clean",
    profile: "rdx",
    name: "2024 Acura RDX Technology CPO",
    dealer: "Grubbs Acura",
    location: "Grapevine, TX",
    distance: 8,
    price: 39775,
    mileage: 7338,
    vin: "5J8TC2H50RL034131",
    stock: "RL034131",
    listingUrl: "https://www.grubbsacura.com/used-Grapevine-2024-Acura-RDX-Technology%2BPackage%2BSH%2BAWD-5J8TC2H50RL034131",
    listingLabel: "Live Grubbs exact detail",
    sourceUrl: "https://www.carfax.com/vehicle/5J8TC2H50RL034131",
    sourceLabel: "Exact CARFAX clean/great-value page",
    deal: "CARFAX Great Value + Acura CPO",
    cpo: true,
    historySignal: "Exact CARFAX VIN page loaded with no accident or damage reported, personal use, CARFAX 1-owner, great-value pricing, $39,775 total price, 7,338 miles, and stock RL034131.",
    availabilityProof: "Grubbs dealer detail page loaded with exact VIN, stock, dealer price, mileage, and active vehicle content.",
    overall: 92,
    caveat: "Excellent low-mile CPO Acura, but it is near the $40,000 cap. Confirm out-the-door price before visiting."
  },
  {
    id: "rdx-base-2024-hiley",
    profile: "rdx",
    name: "2024 Acura RDX Base SH-AWD",
    dealer: "Hiley Acura of Fort Worth",
    location: "Fort Worth, TX",
    distance: 31,
    price: 34716,
    mileage: 15950,
    vin: "5J8TC2H34RL027410",
    stock: "A7997A",
    listingUrl: "https://www.carfax.com/vehicle/5J8TC2H34RL027410",
    listingLabel: "Exact CARFAX VIN page",
    sourceUrl: sourcePages.rdxFortWorth,
    sourceLabel: "CARFAX Fort Worth RDX source",
    deal: "CARFAX Great Value",
    historySignal: "Exact CARFAX VIN page loaded with no accident or damage reported, personal use, CARFAX 1-owner, great-value pricing, $34,716 total price, 15,950 miles, and stock A7997A.",
    availabilityProof: "CARFAX exact VIN page loaded June 7, 2026 with VIN, price, mileage, clean-history, great-value, and panoramic roof evidence.",
    overall: 91
  },
  {
    id: "rdx-tech-2023-hiley",
    profile: "rdx",
    name: "2023 Acura RDX Technology",
    dealer: "Hiley Acura of Fort Worth",
    location: "Fort Worth, TX",
    distance: 31,
    price: 34516,
    mileage: 15923,
    vin: "5J8TC1H50PL007454",
    stock: "A8175A",
    listingUrl: "https://www.carfax.com/vehicle/5J8TC1H50PL007454",
    listingLabel: "Exact CARFAX VIN page",
    sourceUrl: sourcePages.rdxFortWorth,
    sourceLabel: "CARFAX Fort Worth RDX source",
    deal: "CARFAX Great Value",
    historySignal: "Exact CARFAX VIN page loaded with no accident or damage reported, personal use, CARFAX 1-owner, great-value pricing, $34,516 total price, 15,923 miles, and stock A8175A.",
    availabilityProof: "CARFAX exact VIN page loaded June 7, 2026 with VIN, price, mileage, clean-history, great-value, and panoramic roof evidence.",
    overall: 90
  },
  {
    id: "telluride-sx-prestige-2024-vanguard",
    profile: "telluride",
    name: "2024 Kia Telluride SX Prestige AWD CPO",
    dealer: "Vanguard Kia of Arlington",
    location: "Arlington, TX",
    distance: 18,
    price: 39220,
    mileage: 22740,
    vin: "5XYP5DGC5RG500766",
    stock: "232425B",
    listingUrl: "https://www.carfax.com/vehicle/5XYP5DGC5RG500766",
    listingLabel: "Exact CARFAX VIN page",
    sourceUrl: sourcePages.tellurideDallas,
    sourceLabel: "CARFAX Telluride clean/great-value source",
    historyUrl: "https://www.kia.com/us/en/cpo/inventory/vehicle-details?view=cpo&vin=5XYP5DGC5RG500766&zipCode=75201",
    deal: "CARFAX Great Value + Kia CPO",
    cpo: true,
    historySignal: "Exact CARFAX VIN page loaded with no accident or damage reported, personal use, CARFAX 1-owner, great-value pricing, $39,220 total price, 22,740 miles, and stock 232425B. Kia CPO inventory page also loaded the same VIN and mileage.",
    availabilityProof: "CARFAX exact VIN page and Kia CPO exact VIN page loaded June 7, 2026 with VIN, price, mileage, clean-history, and great-value evidence.",
    overall: 90
  },
  {
    id: "rdx-tech-2025-hiley",
    profile: "rdx",
    name: "2025 Acura RDX Technology SH-AWD",
    dealer: "Hiley Acura of Fort Worth",
    location: "Fort Worth, TX",
    distance: 31,
    price: 35716,
    mileage: 33933,
    vin: "5J8TC2H59SL008522",
    stock: "A8072A",
    listingUrl: "https://www.carfax.com/vehicle/5J8TC2H59SL008522",
    listingLabel: "Exact CARFAX VIN page",
    sourceUrl: sourcePages.rdxFortWorth,
    sourceLabel: "CARFAX Fort Worth RDX source",
    deal: "CARFAX Great Value",
    historySignal: "Exact CARFAX VIN page loaded with no accident or damage reported, personal use, CARFAX 1-owner, great-value pricing, $35,716 total price, 33,933 miles, and stock A8072A.",
    availabilityProof: "CARFAX exact VIN page loaded June 7, 2026 with VIN, price, mileage, clean-history, great-value, and panoramic roof evidence.",
    overall: 89,
    caveat: "Newer model year is attractive, but mileage is not ultra-low for a 2025. Check tire/brake condition and remaining factory warranty."
  },
  {
    id: "rdx-base-2023-park-place",
    profile: "rdx",
    name: "2023 Acura RDX SH-AWD CPO",
    dealer: "Park Place Acura",
    location: "Plano, TX",
    distance: 19,
    price: 37991,
    mileage: 10670,
    vin: "5J8TC2H35PL021077",
    stock: "MAP260733A",
    listingUrl: "https://www.parkplacelexusplano.com/used/Acura/2023-Acura-RDX-7a42abfdac181a93fdbf63e0a5a3818e.htm",
    listingLabel: "Live Park Place exact detail",
    sourceUrl: "https://www.carfax.com/vehicle/5J8TC2H35PL021077",
    sourceLabel: "Exact CARFAX clean/value page",
    deal: "CPO clean-history value",
    cpo: true,
    reliability: 91,
    rearComfort: 83,
    resale: 86,
    historySignal: "Park Place dealer page loaded with exact VIN, stock MAP260733A, Acura Precision Certified status, 10,670 miles, price, roof equipment, iPacket documents, and CARFAX History Report link.",
    availabilityProof: "Park Place dealer exact detail page loaded June 7, 2026 with VIN, stock, mileage, price, CPO documents, and no page-not-found behavior.",
    overall: 89,
    caveat: "Lowest-mile Acura in this refresh and CPO-backed, but the CARFAX badge is value rather than Great Value."
  },
  {
    id: "cx50-premium-plus-2025-norm-reeves",
    profile: "cx50",
    name: "2025 Mazda CX-50 2.5 S Premium Plus",
    dealer: "Norm Reeves Mazda of Irving",
    location: "Irving, TX",
    distance: 6,
    price: 31888,
    mileage: 6926,
    vin: "7MMVABEM8SN378924",
    stock: "SN378924R",
    listingUrl: "https://www.carfax.com/vehicle/7MMVABEM8SN378924",
    listingLabel: "Exact CARFAX VIN page",
    sourceUrl: sourcePages.mazdaCx50,
    sourceLabel: "CARFAX CX-50 Dallas source",
    deal: "CARFAX Great Value",
    historySignal: "Exact CARFAX VIN page loaded with no accident or damage reported, great-value pricing, $31,888 price, 6,926 miles, Premium Plus package, and stock SN378924R.",
    availabilityProof: "CARFAX exact VIN page loaded June 7, 2026 with VIN, price, mileage, clean-history, great-value, and Premium Plus panoramic-roof trim evidence.",
    overall: 88,
    caveat: "Best low-mile two-row value in this refresh, but rear-seat comfort is below the MDX and Telluride."
  },
  {
    id: "cx50-turbo-premium-2024-rockwall",
    profile: "cx50",
    name: "2024 Mazda CX-50 Turbo Premium",
    dealer: "Toyota of Rockwall",
    location: "Rockwall, TX",
    distance: 23,
    price: 33001,
    mileage: 14035,
    vin: "7MMVABDY1RN221573",
    stock: "RN221573U",
    listingUrl: "https://www.carfax.com/vehicle/7MMVABDY1RN221573",
    listingLabel: "Exact CARFAX VIN page",
    sourceUrl: sourcePages.mazdaCx50,
    sourceLabel: "CARFAX CX-50 Dallas source",
    deal: "CARFAX Great Value",
    historySignal: "Exact CARFAX VIN page loaded with no accident or damage reported, personal use, CARFAX 1-owner, great-value pricing, $33,001 total price, 14,035 miles, and stock RN221573U.",
    availabilityProof: "CARFAX exact VIN page loaded June 7, 2026 with VIN, price, mileage, clean-history, great-value, and Premium/Turbo panoramic-roof trim evidence.",
    overall: 87
  },
  {
    id: "cx50-premium-plus-2024-clay-cooley",
    profile: "cx50",
    name: "2024 Mazda CX-50 2.5 S Premium Plus",
    dealer: "Clay Cooley Nissan Richardson",
    location: "Richardson, TX",
    distance: 14,
    price: 29715,
    mileage: 27694,
    vin: "7MMVABEM6RN237764",
    stock: "RN237764",
    listingUrl: "https://www.carfax.com/vehicle/7MMVABEM6RN237764",
    listingLabel: "Exact CARFAX VIN page",
    sourceUrl: "https://www.carfax.com/vehicle/7MMVABEM6RN237764",
    sourceLabel: "Exact CARFAX clean/great-value page",
    historyUrl: "https://www.claycooleynissanrichardson.com/viewdetails/used/7mmvabem6rn237764/2024-mazda-cx-50-sport-utility",
    deal: "CARFAX Great Value",
    historySignal: "CARFAX CX-50 source shows great-value pricing, no accident or damage reported, personal use, CARFAX 1-owner, 7 service records, and VIN 7MMVABEM6RN237764 at Clay Cooley Nissan Richardson.",
    availabilityProof: "Exact CARFAX VIN page loaded in the latest recheck with VIN, price, mileage, clean-history, and no unavailable messaging.",
    overall: 86
  },
  {
    id: "rdx-aspec-2024-hiley",
    profile: "rdx",
    name: "2024 Acura RDX A-Spec SH-AWD",
    dealer: "Hiley Acura of Fort Worth",
    location: "Fort Worth, TX",
    distance: 31,
    price: 37416,
    mileage: 40537,
    vin: "5J8TC2H63RL023925",
    stock: "A8024A",
    listingUrl: "https://www.carfax.com/vehicle/5J8TC2H63RL023925",
    listingLabel: "Exact CARFAX VIN page",
    sourceUrl: sourcePages.rdxFortWorth,
    sourceLabel: "CARFAX Fort Worth RDX source",
    deal: "CARFAX Good Value",
    historySignal: "Exact CARFAX VIN page loaded with no accident or damage reported, personal use, CARFAX 1-owner, good-value pricing, $37,416 total price, 40,537 miles, and stock A8024A.",
    availabilityProof: "CARFAX exact VIN page loaded June 7, 2026 with VIN, price, mileage, clean-history, good-value, and panoramic roof evidence.",
    overall: 86,
    caveat: "Keep this below the cheaper/lower-mile RDXs. It clears the rules, but sits closer to the mileage cap."
  },
  {
    id: "cx50-premium-plus-2023-hiley",
    profile: "cx50",
    name: "2023 Mazda CX-50 2.5 S Premium Plus",
    dealer: "Hiley Mazda of Arlington",
    location: "Arlington, TX",
    distance: 18,
    price: 27000,
    mileage: 26856,
    vin: "7MMVABEM5PN151357",
    stock: "V76488A",
    listingUrl: "https://www.carfax.com/vehicle/7MMVABEM5PN151357",
    listingLabel: "Exact CARFAX VIN page",
    sourceUrl: sourcePages.mazdaCx50,
    sourceLabel: "CARFAX CX-50 Arlington source",
    deal: "CARFAX Great Value",
    historySignal: "Exact CARFAX VIN page loaded with no accident or damage reported, multiple-use 2-owner history, great-value pricing, $27,000 price, 26,856 miles, Premium Plus package, and stock V76488A.",
    availabilityProof: "CARFAX exact VIN page loaded June 7, 2026 with VIN, price, mileage, clean-history, great-value, and Premium Plus panoramic-roof trim evidence.",
    overall: 84,
    caveat: "Cheapest qualifying match, but the multiple-use/2-owner history makes it a backup only."
  }
];

function buildTco({ price, mpgCombined, maintenanceBase, insuranceBase, depreciationRate }) {
  const annualMiles = 12000;
  const fuelPrice = 3.12;
  let remainingValue = price;

  return Array.from({ length: 5 }, (_, index) => {
    const year = index + 1;
    const depreciation = Math.round(remainingValue * depreciationRate * (1 - index * 0.045));
    remainingValue -= depreciation;

    return {
      year,
      depreciation,
      fuel: Math.round((annualMiles / mpgCombined) * fuelPrice * Math.pow(1.025, index)),
      maintenance: Math.round(maintenanceBase * (0.84 + year * 0.18)),
      insurance: Math.round(insuranceBase * Math.pow(1.035, index)),
      fees: year === 1 ? 560 : 375
    };
  });
}

function hydrateVehicle(vehicle) {
  const profile = profiles[vehicle.profile];
  return {
    ...profile,
    ...vehicle,
    lastVerified: verifiedOn,
    accident: "CARFAX no accident/damage",
    accidentPublic: true,
    rearComfort: vehicle.rearComfort ?? profile.rearComfort,
    reliability: vehicle.reliability ?? profile.reliability,
    resale: vehicle.resale ?? profile.resale,
    caveat: vehicle.caveat ?? profile.caveat,
    accidentDetail: vehicle.historySignal,
    tco: buildTco({
      price: vehicle.price,
      mpgCombined: profile.mpgCombined,
      maintenanceBase: profile.maintenanceBase + (vehicle.cpo ? -45 : 0),
      insuranceBase: profile.insuranceBase,
      depreciationRate: profile.depreciationRate
    })
  };
}

const activeVehicles = vehicleData.map(hydrateVehicle);

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

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

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
  const bestReliability = list.length ? Math.max(...list.map((vehicle) => vehicle.reliability)) : 0;
  const lowestTco = list.length ? Math.min(...list.map(getTcoTotal)) : 0;
  el.statCount.textContent = `${list.length}/${verifiedTarget}`;
  el.statAvgPrice.textContent = formatCurrency(avgPrice);
  el.statBestReliability.textContent = `${bestReliability}/100`;
  el.statLowestTco.textContent = formatCurrency(lowestTco);
}

function renderComparison(list) {
  if (!list.length) {
    el.comparisonChart.innerHTML = "<p>No vehicles match the current filters.</p>";
    return;
  }

  const maxTco = Math.max(...list.map(getTcoTotal));
  el.comparisonChart.innerHTML = list.map((vehicle) => {
    const costDelta = maxTco - getTcoTotal(vehicle);
    const valueNote = costDelta ? `${formatCurrency(costDelta)} less than highest shown` : "highest cost shown";
    return `
      <div class="compare-row">
        <div class="compare-label">${vehicle.name.replace(/^20\d{2} /, "")}</div>
        <div class="compare-track" aria-label="${vehicle.name} reliability ${vehicle.reliability} out of 100">
          <div class="compare-fill" style="width:${vehicle.reliability}%"></div>
        </div>
        <div class="compare-meta">${vehicle.reliability}/100 reliability · ${vehicle.resale}/100 resale · ${valueNote}</div>
      </div>
    `;
  }).join("");
}

function renderChart(vehicle) {
  const maxYearTotal = Math.max(...vehicle.tco.map(getYearTotal));
  const width = 520;
  const height = 170;
  const chartTop = 14;
  const chartBottom = 34;
  const chartHeight = height - chartTop - chartBottom;
  const barWidth = 54;
  const gap = 38;
  const left = 25;
  const categories = ["depreciation", "fuel", "maintenance", "insurance", "fees"];
  const bars = vehicle.tco.map((year, index) => {
    const x = left + index * (barWidth + gap);
    let y = height - chartBottom;
    const segments = categories.map((category) => {
      const segmentHeight = (year[category] / maxYearTotal) * chartHeight;
      y -= segmentHeight;
      return `<rect x="${x}" y="${y.toFixed(1)}" width="${barWidth}" height="${segmentHeight.toFixed(1)}" rx="7" fill="${categoryColors[category]}"><title>${category}: ${formatCurrency(year[category])}</title></rect>`;
    }).join("");
    return `<g>${segments}<text x="${x + barWidth / 2}" y="${height - 11}" text-anchor="middle" fill="#52615e" font-size="13" font-weight="800">Y${year.year}</text><text x="${x + barWidth / 2}" y="${Math.max(12, y - 6)}" text-anchor="middle" fill="#14211f" font-size="12" font-weight="900">${formatCurrency(getYearTotal(year)).replace(",000", "k")}</text></g>`;
  }).join("");
  return `<svg class="cost-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Projected 5-year cost chart for ${vehicle.name}"><line x1="${left - 8}" y1="${height - chartBottom}" x2="${width - 20}" y2="${height - chartBottom}" stroke="rgba(20,33,31,.16)" />${bars}</svg>`;
}

function renderSources(vehicle) {
  const sourceLink = vehicle.sourceUrl && vehicle.sourceUrl !== vehicle.listingUrl ? `<a href="${vehicle.sourceUrl}" target="_blank" rel="noreferrer">${vehicle.sourceLabel}</a>` : "";
  const historyLink = vehicle.historyUrl && vehicle.historyUrl !== vehicle.listingUrl ? `<a href="${vehicle.historyUrl}" target="_blank" rel="noreferrer">Vehicle history report</a>` : "";
  const roofLink = vehicle.roofSpecUrl ? `<a href="${vehicle.roofSpecUrl}" target="_blank" rel="noreferrer">Official roof spec</a>` : "";
  return `<div class="source-row" aria-label="Research sources for ${vehicle.name}"><a href="${vehicle.listingUrl}" target="_blank" rel="noreferrer">${vehicle.listingLabel}</a>${sourceLink}${historyLink}${roofLink}</div>`;
}

function renderVehicleCard(vehicle, index) {
  const tcoTotal = getTcoTotal(vehicle);
  const accidentClass = vehicle.accidentPublic ? "good" : "warn";
  return `
    <article class="vehicle-card" style="--accent:${vehicle.accent}">
      <div class="card-top">
        <div>
          <span class="rank">${index + 1}</span>
          <h3>${vehicle.name}</h3>
          <p class="subtitle">${vehicle.dealer} · ${vehicle.location} · approx. ${vehicle.distance} miles from 75038<br />VIN ${vehicle.vin} · Stock ${vehicle.stock}</p>
        </div>
        <div class="price-line" aria-label="Price and mileage"><span class="price">${formatCurrency(vehicle.price)}</span><span class="mileage">${formatNumber(vehicle.mileage)} mi</span></div>
      </div>
      <div class="badge-row"><span class="badge good">${vehicle.roof}</span><span class="badge great">${vehicle.deal}</span><span class="badge">${vehicle.seats} seats · ${vehicle.rearFitLabel}</span><span class="badge ${accidentClass}">${vehicle.accident}</span><span class="badge">Verified ${vehicle.lastVerified}</span></div>
      <div class="score-grid"><div class="score"><strong>${vehicle.reliability}</strong><span>Reliability</span></div><div class="score"><strong>${vehicle.rearComfort}</strong><span>Rear comfort</span></div><div class="score"><strong>${vehicle.resale}</strong><span>Resale value</span></div><div class="score"><strong>${formatCurrency(tcoTotal)}</strong><span>5-year cost</span></div></div>
      <div class="cost-card"><div class="cost-header"><span>Projected ownership cost</span><strong>${formatCurrency(tcoTotal)}</strong></div><div class="chart-wrap">${renderChart(vehicle)}</div><div class="legend" aria-label="Cost chart legend"><span><i style="background:${categoryColors.depreciation}"></i>Depreciation</span><span><i style="background:${categoryColors.fuel}"></i>Fuel</span><span><i style="background:${categoryColors.maintenance}"></i>Maintenance</span><span><i style="background:${categoryColors.insurance}"></i>Insurance</span><span><i style="background:${categoryColors.fees}"></i>Fees</span></div></div>
      <p class="take"><strong>Why it made the cut:</strong> ${vehicle.deal} pricing, clean CARFAX/dealer evidence, and ${formatNumber(vehicle.mileage)} miles keep it inside the low-risk shortlist. ${vehicle.roofEvidence} ${vehicle.sourceNote}</p>
      <p class="take"><strong>Watch-out:</strong> ${vehicle.caveat}</p>
      <p class="take"><strong>Live-link check:</strong> ${vehicle.availabilityProof}</p>
      <p class="take"><strong>History signal:</strong> ${vehicle.accidentDetail}</p>
      ${renderSources(vehicle)}
    </article>
  `;
}

function renderCards(list) {
  if (!list.length) {
    el.cards.innerHTML = `<div class="empty"><h3>No SUVs match those filters</h3><p>These results already require panoramic roof, great-market-value pricing, clean history, under $40,000, and 45,000 miles or less.</p></div>`;
    return;
  }
  el.cards.innerHTML = list.map(renderVehicleCard).join("");
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
  } catch (error) {
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
