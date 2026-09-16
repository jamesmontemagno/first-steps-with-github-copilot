const STORAGE_KEY = "copilot-app-lab-progress";
const THEME_KEY = "copilot-app-lab-theme";

const checks = [...document.querySelectorAll(".progress-check")];
const progressLabel = document.querySelector("#progress-label");
const progressBar = document.querySelector("#progress-bar");
const themeToggle = document.querySelector("#theme-toggle");

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function updateProgress() {
  const completed = checks.filter((check) => check.checked).map((check) => check.dataset.task);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  progressLabel.textContent = `${completed.length} of ${checks.length} complete`;
  progressBar.style.width = `${(completed.length / checks.length) * 100}%`;
}

const savedProgress = new Set(readProgress());
checks.forEach((check) => {
  check.checked = savedProgress.has(check.dataset.task);
  check.addEventListener("change", updateProgress);
});
updateProgress();

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
}

const savedTheme = localStorage.getItem(THEME_KEY);
setTheme(savedTheme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
themeToggle.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const prompt = button.dataset.copy || button.closest(".prompt-card").querySelector("code").textContent.trim();
    try {
      await navigator.clipboard.writeText(prompt);
      const original = button.textContent;
      button.textContent = "Copied!";
      setTimeout(() => { button.textContent = original; }, 1600);
    } catch {
      button.textContent = "Select text to copy";
    }
  });
});

document.querySelector("#reset-progress").addEventListener("click", () => {
  if (!window.confirm("Reset all saved lab progress?")) return;
  checks.forEach((check) => { check.checked = false; });
  updateProgress();
});

const navLinks = [...document.querySelectorAll(".nav-link")];
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-20% 0px -70% 0px" });

observedSections.forEach((section) => sectionObserver.observe(section));
