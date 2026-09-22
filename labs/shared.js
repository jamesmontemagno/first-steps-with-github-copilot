export const models = [
  ["GPT-6-Luna", "Recommended"],
  ["Auto", "Balanced backup"]
];

export const signup = "https://github.com/features/copilot/plans";

const icons = {
  context: '<path d="M4 7h16M4 12h10M4 17h13"/>',
  preview: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/>',
  ship: '<path d="m12 3 7 4v6c0 4-3 6.5-7 8-4-1.5-7-4-7-8V7Z"/><path d="m9 12 2 2 4-4"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
  home: '<path d="m4 11 8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1Z"/>',
  sessions: '<rect x="3" y="5" width="7" height="14" rx="1.5"/><rect x="14" y="5" width="7" height="14" rx="1.5"/>',
  work: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4h8v2"/>',
  bolt: '<path d="M13 3 5 13h6l-1 8 8-10h-6Z"/>',
  terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/>',
  plan: '<path d="M5 4h14v16H5Z"/><path d="M9 9h6M9 13h6M9 17h3"/>',
  cloud: '<path d="M7 18a4 4 0 0 1 .6-8 5.5 5.5 0 0 1 10.6 1.6A3.7 3.7 0 0 1 17.5 18Z"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z"/><path d="M20 18v3H6.5"/>',
  code: '<path d="m9 8-4 4 4 4M15 8l4 4-4 4"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>'
};

export function icon(name) {
  return `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${icons[name] ?? icons.target}</svg>`;
}

export function prompt(text, label = "Send this prompt") {
  return `<div class="prompt-card"><div class="prompt-label">${icon("ship")} ${label}</div><code>${text}</code><button class="copy-button" type="button">Copy prompt</button></div>`;
}

export function check(task, title, detail = "") {
  return `<label class="section-complete"><input class="progress-check" type="checkbox" data-task="${task}"><span class="custom-check"></span><span><strong>${title}</strong>${detail ? `<small>${detail}</small>` : ""}</span></label>`;
}

// Filled in by script.js once it knows the saved progress for every route.
export function routeTracker() {
  return `<div class="route-tracker" id="route-tracker"></div>`;
}

export function links(title, items) {
  return `<div class="resource-block"><h3>${title}</h3><div class="resource-grid">${items.map(([label, href, detail]) => `<a class="resource-card" href="${href}" target="_blank" rel="noopener"><strong>${label}</strong><small>${detail}</small></a>`).join("")}</div></div>`;
}

const policyNote = `<p class="note"><strong>Organization account?</strong> Copilot Business and Enterprise administrators must enable the <strong>Copilot CLI</strong> policy before agent sessions will work.</p>`;

export function sharedOverview(lab) {
  const git = lab.needsGit
    ? `<label class="check-card"><input class="progress-check" type="checkbox" data-task="git"><span class="custom-check"></span><span><strong>Git installed</strong><small>Required for this route · check with <code>git --version</code>, or <a href="https://git-scm.com/downloads" target="_blank" rel="noopener">install Git</a></small></span></label>`
    : `<label class="check-card"><input class="progress-check" type="checkbox" data-task="git"><span class="custom-check"></span><span><strong>Git is bundled</strong><small>The app ships with Git, so there is nothing to install.</small></span></label>`;
  return `<section class="lab-section intro-section" id="overview">
    <div class="section-kicker">01 · Choose your route</div>
    <h2>One project. Your Copilot flow.</h2>
    <p class="section-intro">Pick where you work. Every step below rewrites itself for that product, and your progress is tracked separately for each one.</p>
    <div id="product-switcher" class="route-picker" role="group" aria-label="Choose a Copilot product"></div>
    <p class="route-note">You can switch at any time. Nothing you have checked off is lost.</p>
    <p class="section-intro">${lab.intro}</p>
    <div class="outcome-grid">
      <article><span class="feature-icon">${icon("context")}</span><h3>Build in context</h3><p>Keep your prompt, files, and feedback close together as you shape the space quiz.</p></article>
      <article><span class="feature-icon">${icon("preview")}</span><h3>Test what you made</h3><p>Use the real preview and test loop for ${lab.title}, not a generic checklist.</p></article>
      <article><span class="feature-icon">${icon("ship")}</span><h3>Ship with confidence</h3><p>Review the diff, choose a model deliberately, and publish only when it is ready.</p></article>
    </div>
    <div class="callout"><div class="callout-icon">${icon("target")}</div><div><strong>What you’ll build</strong><p>A colorful, single-file space quiz. Every route ends with a tested project, a reviewed pull request, and a clear next step.</p></div></div>
    <div class="split-heading"><div><div class="mini-kicker">Before you begin</div><h3>Prerequisites</h3></div><span>Works on macOS, Windows &amp; Linux</span></div>
    <div class="check-grid">
      <label class="check-card"><input class="progress-check" type="checkbox" data-task="github-account"><span class="custom-check"></span><span><strong>GitHub account</strong><small><a href="${signup}" target="_blank" rel="noopener">Choose a Copilot plan</a></small></span></label>
      ${git}
    </div>
    ${lab.policy ? policyNote : ""}
  </section>`;
}

export function numberSections(sections) {
  return sections.map(([, , html], index) => html.replace(/__N__/g, String(index + 2).padStart(2, "0"))).join("");
}

export function modelPanel() {
  return `<div class="model-panel"><strong>Recommended model order</strong><ol>${models.map(([name, reasoning]) => `<li><span>${name}</span><small>${reasoning}</small></li>`).join("")}</ol><small class="model-note">Availability depends on your plan, organization policy, and product version. Use the first option you can select.</small></div>`;
}
