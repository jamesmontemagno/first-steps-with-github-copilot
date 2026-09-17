import { icon } from "./labs/shared.js";
import { appLab } from "./labs/app.js";
import { cliLab } from "./labs/cli.js";
import { vscodeLab } from "./labs/vscode.js";

const labs = { app: appLab, cli: cliLab, vscode: vscodeLab };
const PRODUCT_KEY = "first-steps-copilot-product";
const THEME_KEY = "first-steps-copilot-theme";
let product = labs[localStorage.getItem(PRODUCT_KEY)] || appLab;
const nav = document.querySelector("#lab-nav");
const main = document.querySelector("#main-content");
const progressLabel = document.querySelector("#progress-label");
const progressBar = document.querySelector("#progress-bar");
const themeToggle = document.querySelector("#theme-toggle");
const navHeading = document.querySelector(".nav-heading");
const brandRoute = document.querySelector("#brand-route");

function progressKey(id) { return `first-steps-progress-${id}`; }
function readProgressFor(id) {
  try { return JSON.parse(localStorage.getItem(progressKey(id))) || []; } catch { return []; }
}
function readProgress() { return readProgressFor(product.id); }

const taskTotals = Object.fromEntries(Object.values(labs).map((lab) => [lab.id, new Set([...lab.render().matchAll(/data-task="([^"]+)"/g)].map((m) => m[1])).size]));

function routeState(lab) {
  const done = readProgressFor(lab.id);
  return { done: done.length, total: taskTotals[lab.id], complete: done.includes("complete") };
}
function renderRouteTracker() {
  const host = document.querySelector("#route-tracker");
  if (!host) return;
  const states = Object.values(labs).map((lab) => [lab, routeState(lab)]);
  const remaining = states.filter(([lab, state]) => !state.complete && lab.id !== product.id);
  const allDone = states.every(([, state]) => state.complete);
  const intro = allDone
    ? "All three routes are complete. You have now run the same project through every way of working with Copilot."
    : remaining.length
      ? "Same project, different way of working. Pick a route you have not run yet and the whole lab reloads for it."
      : "Finish this route to unlock the badge, then try the other two.";
  host.innerHTML = `<h3>Your routes</h3><p class="route-tracker-intro">${intro}</p><div class="route-tracker-grid">${states.map(([lab, state]) => {
    const status = state.complete ? "Completed" : state.done ? `${state.done} of ${state.total} steps` : "Not started";
    const current = lab.id === product.id;
    return `<button class="route-status${state.complete ? " is-done" : ""}${current ? " is-current" : ""}" type="button" data-product="${lab.id}"${current ? " aria-current=\"true\"" : ""}><span class="route-icon">${lab.mark}</span><b>${lab.name}</b><small>${status}</small>${state.complete ? `<span class="route-badge">${icon("check")} Done</span>` : ""}</button>`;
  }).join("")}</div>`;
  bindProductButtons(host);
}
function bindProductButtons(host) {
  host.querySelectorAll("[data-product]").forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.product === product.id) return;
    localStorage.setItem(PRODUCT_KEY, button.dataset.product);
    product = labs[button.dataset.product];
    render();
    document.querySelector("#overview")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
}
function updateProgress() {
  const checks = [...document.querySelectorAll(".progress-check")];
  const completed = checks.filter((check) => check.checked).map((check) => check.dataset.task);
  localStorage.setItem(progressKey(product.id), JSON.stringify(completed));
  progressLabel.textContent = `${completed.length} of ${checks.length} complete`;
  progressBar.style.width = `${checks.length ? completed.length / checks.length * 100 : 0}%`;
  renderRouteTracker();
  markRouteCards();
}
function markRouteCards() {
  document.querySelectorAll("#product-switcher .route-card").forEach((card) => {
    card.classList.toggle("is-done", routeState(labs[card.dataset.product]).complete);
  });
}
function renderNav() {
  const productSwitcher = document.querySelector("#product-switcher");
  if (productSwitcher) {
    productSwitcher.innerHTML = Object.values(labs).map((lab) => `<button class="route-card" type="button" aria-pressed="${lab.id === product.id}" data-product="${lab.id}"><span class="route-icon">${lab.mark}</span><b>${lab.name}</b><span>${lab.tagline}</span><span class="route-badge">${icon("check")} Done</span></button>`).join("");
    bindProductButtons(productSwitcher);
    markRouteCards();
  }
  navHeading.textContent = `Your route · ${product.name}`;
  nav.innerHTML = `<a href="#overview" class="nav-link active"><span>01</span>Overview</a>` +
    product.sections.map(([id, label], index) => `<a href="#${id}" class="nav-link"><span>${String(index + 2).padStart(2, "0")}</span>${label}</a>`).join("") +
    `<a href="#resources" class="nav-link"><span>${String(product.sections.length + 2).padStart(2, "0")}</span>Review & resources</a>`;
}
function observeSections() {
  if (!("IntersectionObserver" in window)) return;
  const links = [...document.querySelectorAll(".nav-link")];
  const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) links.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
  }), { rootMargin: "-20% 0px -70% 0px" });
  sections.forEach((section) => observer.observe(section));
}
function render() {
  const picked = Boolean(labs[localStorage.getItem(PRODUCT_KEY)]);
  document.title = picked ? `First Steps with GitHub Copilot · ${product.name}` : "First Steps with GitHub Copilot";
  brandRoute.innerHTML = picked ? `${product.mark}<span>${product.name}</span>` : "";
  brandRoute.hidden = !picked;
  document.querySelector("#preview-copy").textContent = product.preview;
  main.innerHTML = product.render();
  renderNav();
  const saved = new Set(readProgress());
  document.querySelectorAll(".progress-check").forEach((check) => {
    check.checked = saved.has(check.dataset.task);
    check.addEventListener("change", updateProgress);
  });
  document.querySelectorAll(".copy-button").forEach((button) => button.addEventListener("click", async () => {
    const text = button.closest(".prompt-card").querySelector("code").textContent.trim();
    const original = button.textContent;
    try { await navigator.clipboard.writeText(text); button.textContent = "Copied!"; } catch { button.textContent = "Copy failed"; }
    setTimeout(() => { button.textContent = original; }, 1400);
  }));
  document.querySelector("#reset-progress").onclick = () => {
    if (confirm(`Reset ${product.name} progress?`)) { localStorage.removeItem(progressKey(product.id)); render(); }
  };
  observeSections();
  updateProgress();
}
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
}
setTheme(localStorage.getItem(THEME_KEY) || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
themeToggle.addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
render();
