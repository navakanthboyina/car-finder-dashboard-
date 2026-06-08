(() => {
  const cameraLabel = "360 camera proof";
  const cameraRule = "Next refresh will require 360-degree, surround-view, around-view, bird's-eye, multi-view, or equivalent camera evidence. A normal backup camera alone will not count.";

  function hasText(container, text) {
    return [...container.querySelectorAll("*")].some((element) => element.textContent.includes(text));
  }

  function addBadge(card) {
    const badgeRow = card.querySelector(".badge-row");
    if (!badgeRow || hasText(badgeRow, cameraLabel)) return;

    const badge = document.createElement("span");
    badge.className = "badge warn";
    badge.textContent = `Next refresh: ${cameraLabel}`;

    const greatBadge = badgeRow.querySelector(".badge.great");
    badgeRow.insertBefore(badge, greatBadge || badgeRow.children[1] || null);
  }

  function addRule(card) {
    if (hasText(card, "Next refresh feature rule")) return;

    const paragraph = document.createElement("p");
    paragraph.className = "take";
    paragraph.innerHTML = `<strong>Next refresh feature rule:</strong> ${cameraRule}`;

    const watchOut = [...card.querySelectorAll(".take")]
      .find((line) => line.textContent.includes("Watch-out:"));
    if (watchOut) {
      watchOut.after(paragraph);
    } else {
      card.append(paragraph);
    }
  }

  function updateEmptyState() {
    const empty = document.querySelector(".empty p");
    if (!empty || empty.textContent.includes("360-camera evidence")) return;
    empty.textContent += " The next refresh also requires 360-camera evidence.";
  }

  function applyCameraRule() {
    document.querySelectorAll(".vehicle-card").forEach((card) => {
      addBadge(card);
      addRule(card);
    });
    updateEmptyState();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyCameraRule, { once: true });
  } else {
    applyCameraRule();
  }
})();
