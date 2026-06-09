(() => {
  const refreshedAt = "June 9, 2026 9:42 AM CDT";
  const summary = "0/20 browser-verified exact VIN links active; external CARFAX, Kia CPO, and dealer primary-link audits were blocked, so retained source candidates are hidden pending recheck. Next successful refresh also requires 360-camera or surround-view evidence.";
  const cameraRule = "360-degree, surround-view, around-view, bird's-eye, multi-view, aerial-view, or equivalent camera evidence is required; a normal backup camera alone will not count.";

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function applyBlockedRefresh() {
    setText(".eyebrow", `Browser-audit blocked used SUV deals near 75038 · refreshed ${refreshedAt}`);
    setText("#stat-count", "0/20");
    setText("#stat-avg-price", "$0");
    setText("#stat-best-reliability", "0");
    setText("#stat-lowest-tco", "$0");

    const status = document.querySelector("#refresh-status");
    if (status) {
      status.hidden = false;
      status.innerHTML = `
        <strong>Automated refresh:</strong> ${summary}
        <br />
        <small>Last checked Jun 9, 2026, 9:42 AM CDT blocked browser-audit refresh · 20 listing(s) need review after the latest check.</small>
      `;
    }

    const comparison = document.querySelector("#comparisonChart");
    if (comparison) {
      comparison.innerHTML = `
        <p class="empty-inline">
          No browser-verified matches are active right now. The next successful refresh must pass exact-link availability, clean-history, Great Value, panoramic roof, resale above 80, mileage under 45k, and 360/surround camera evidence.
        </p>
      `;
    }

    const cards = document.querySelector("#cards");
    if (cards) {
      cards.innerHTML = `
        <div class="empty">
          <h3>No browser-verified SUVs passed this refresh</h3>
          <p>The prior source-candidate VINs are still retained in the data, but the June 9 browser audit could not load CARFAX, Kia CPO, or dealer exact pages because the in-app browser blocked those external domains. Under the required primary-link audit rule, no listing is active until exact VIN pages can be checked again. The next refresh also requires ${cameraRule}</p>
        </div>
      `;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyBlockedRefresh, { once: true });
  } else {
    applyBlockedRefresh();
  }

  window.setTimeout(applyBlockedRefresh, 100);
})();
