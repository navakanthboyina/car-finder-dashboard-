import fs from "node:fs/promises";
import vm from "node:vm";

const appPath = new URL("../app.js", import.meta.url);
const statusPath = new URL("../data/refresh-status.json", import.meta.url);
const centralTimeZone = "America/Chicago";
const unavailableTerms = [
  "vehicle no longer available",
  "no longer available",
  "listing unavailable",
  "vehicle unavailable",
  "page not found",
  "this page is in the shop",
  "oops!"
];
const cameraPatterns = [
  { label: "360-degree camera", pattern: /\b360\s?[-]?\s?(degree|view|camera|surround)\b/i },
  { label: "surround-view camera", pattern: /\bsurround[-\s]?view(?:\s+(camera|monitor|system))?\b/i },
  { label: "around-view camera", pattern: /\baround[-\s]?view(?:\s+(camera|monitor|system))?\b/i },
  { label: "bird's-eye view", pattern: /\bbird['’]?s[-\s]?eye\s+view\b/i },
  { label: "multi-view camera", pattern: /\bmulti[-\s]?view\s+(camera|monitor|system)\b/i },
  { label: "aerial-view camera", pattern: /\baerial\s+view\s+(camera|monitor|system)\b/i }
];

function fakeElement() {
  return {
    checked: false,
    hidden: false,
    innerHTML: "",
    textContent: "",
    value: "",
    addEventListener() {}
  };
}

function loadDashboardData(code) {
  const context = {
    console,
    fetch: undefined,
    Intl,
    document: {
      querySelector: fakeElement
    }
  };

  vm.createContext(context);
  vm.runInContext(`${code}\nglobalThis.__dashboardAudit = { activeVehicles, minimumResale, verifiedTarget };`, context, {
    timeout: 1500
  });

  return context.__dashboardAudit;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: centralTimeZone,
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function formatDateTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: centralTimeZone,
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

function getCameraSignals(text) {
  return cameraPatterns
    .filter(({ pattern }) => pattern.test(text))
    .map(({ label }) => label);
}

async function fetchWithTimeout(url, timeoutMs = 25000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "user-agent": "Mozilla/5.0 dashboard-refresh-bot/1.0 (+https://github.com/)"
      },
      redirect: "follow",
      signal: controller.signal
    });

    const body = await response.text();
    return { body, finalUrl: response.url, ok: response.ok, statusCode: response.status };
  } finally {
    clearTimeout(timeout);
  }
}

async function checkVehicle(vehicle) {
  const checkedAt = new Date().toISOString();

  try {
    const page = await fetchWithTimeout(vehicle.listingUrl);
    const body = normalize(page.body);
    const lower = body.toLowerCase();
    const badMatches = unavailableTerms.filter((term) => lower.includes(term));
    const cameraSignals = getCameraSignals(body);
    const hasVin = body.includes(vehicle.vin);
    const hasPrice = /\$\s?\d{2,3},\d{3}/.test(body);
    const hasMileage = /\d{1,3},\d{3}\s*(miles|mi\.?)/i.test(body);
    const hasRequiredCamera = cameraSignals.length > 0;
    const active = page.ok && hasVin && hasRequiredCamera && badMatches.length === 0;

    return {
      cameraSignals,
      checkedAt,
      dealer: vehicle.dealer,
      finalUrl: page.finalUrl,
      hasMileage,
      hasPrice,
      hasRequiredCamera,
      hasVin,
      listingUrl: vehicle.listingUrl,
      name: vehicle.name,
      status: active ? "active" : "needs-review",
      statusCode: page.statusCode,
      unavailableSignals: badMatches,
      vin: vehicle.vin
    };
  } catch (error) {
    return {
      checkedAt,
      dealer: vehicle.dealer,
      error: error instanceof Error ? error.message : String(error),
      listingUrl: vehicle.listingUrl,
      name: vehicle.name,
      status: "needs-review",
      vin: vehicle.vin
    };
  }
}

async function main() {
  const appCode = await fs.readFile(appPath, "utf8");
  const dashboard = loadDashboardData(appCode);
  const dryRun = process.argv.includes("--dry-run");

  if (dryRun) {
    console.log(JSON.stringify({
      activeVehicleCount: dashboard.activeVehicles.length,
      minimumResale: dashboard.minimumResale,
      requiredCameraEvidence: "360-degree/surround-view/around-view/bird's-eye/multi-view camera",
      target: dashboard.verifiedTarget,
      vins: dashboard.activeVehicles.map((vehicle) => vehicle.vin)
    }, null, 2));
    return;
  }

  const results = [];

  for (const vehicle of dashboard.activeVehicles) {
    results.push(await checkVehicle(vehicle));
  }

  const unavailableVins = results
    .filter((result) => result.status !== "active")
    .map((result) => result.vin)
    .sort();

  const now = new Date();
  const status = {
    criteria: {
      maxMileage: 45000,
      maxPrice: 40000,
      minimumResale: dashboard.minimumResale,
      radiusMiles: 50,
      requiredFeatures: [
        "true panoramic roof/moonroof",
        "360-degree/surround-view camera evidence"
      ],
      zipCode: "75038"
    },
    lastRunIso: now.toISOString(),
    lastRunLocal: formatDateTime(now),
    results,
    summary: `${results.length - unavailableVins.length}/${dashboard.verifiedTarget} exact VIN links active with required 360-camera evidence; ${unavailableVins.length} flagged for review.`
  };

  await fs.mkdir(new URL("../data/", import.meta.url), { recursive: true });
  await fs.writeFile(statusPath, `${JSON.stringify(status, null, 2)}\n`);

  const refreshedCode = appCode
    .replace(/const verifiedOn = ".*?";/, `const verifiedOn = "${formatDate(now)}";`)
    .replace(
      /const unavailableVins = new Set\(\[[\s\S]*?\]\);/,
      `const unavailableVins = new Set(${JSON.stringify(unavailableVins, null, 2)});`
    );

  if (refreshedCode !== appCode) {
    await fs.writeFile(appPath, refreshedCode);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
