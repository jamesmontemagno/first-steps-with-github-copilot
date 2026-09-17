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
const mobileSwitcher = document.querySelector("#product-switcher-mobile");

function readProgress() {
  try { return JSON.parse(localStorage.getItem(`first-steps-progress-${product.id}`)) || []; } catch { return []; }
}
function updateProgress() {
  const checks = [...document.querySelectorAll(".progress-check")];
  const completed = checks.filter((check) => check.checked).map((check) => check.dataset.task);
  localStorage.setItem(`first-steps-progress-${product.id}`, JSON.stringify(completed));
  progressLabel.textContent = `${completed.length} of ${checks.length} complete`;
  progressBar.style.width = `${checks.length ? completed.length / checks.length * 100 : 0}%`;
}
function renderNav() {
  const switcher = Object.values(labs).map((lab) => `<button type="button" class="${lab.id === product.id ? "selected" : ""}" data-product="${lab.id}">${lab.name}</button>`).join("");
  nav.innerHTML = `<div class="product-switcher">${switcher}</div>` +
    `<a href="#overview" class="nav-link active"><span>01</span>Overview</a>` +
    product.sections.map(([id, label], index) => `<a href="#${id}" class="nav-link"><span>${String(index + 2).padStart(2, "0")}</span>${label}</a>`).join("") +
    `<a href="#resources" class="nav-link"><span>${String(product.sections.length + 2).padStart(2, "0")}</span>Review & resources</a>`;
  mobileSwitcher.innerHTML = switcher;
  document.querySelectorAll("[data-product]").forEach((button) => button.addEventListener("click", () => {
    localStorage.setItem(PRODUCT_KEY, button.dataset.product);
    product = labs[button.dataset.product];
    render();
  }));
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
  document.title = `First Steps with GitHub Copilot · ${product.name}`;
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
    if (confirm(`Reset ${product.name} progress?`)) { localStorage.removeItem(`first-steps-progress-${product.id}`); render(); }
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
