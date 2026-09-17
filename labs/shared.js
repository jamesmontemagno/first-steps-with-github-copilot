export const models = [
  ["GPT-5.6 Luna", "High reasoning"],
  ["GPT-5.3-Codex", "Medium reasoning"],
  ["Auto", "Balance"]
];

export const signup = "https://github.com/features/copilot/plans";

export function prompt(text, label = "Send this prompt") {
  return `<div class="prompt-card"><div class="prompt-label"><span>✦</span> ${label}</div><code>${text}</code><button class="copy-button" type="button" data-copy-target>Copy prompt</button></div>`;
}

export function check(task, title, detail = "") {
  return `<label class="section-complete"><input class="progress-check" type="checkbox" data-task="${task}"><span class="custom-check"></span><span><strong>${title}</strong>${detail ? `<small>${detail}</small>` : ""}</span></label>`;
}

export function sharedOverview(product, intro) {
  const needsGit = product !== "GitHub Copilot app";
  return `<section class="lab-section intro-section" id="overview"><div class="section-kicker">01 · Choose your route</div><h2>One project. Your Copilot flow.</h2><p class="section-intro">${intro}</p><div class="outcome-grid"><article><span class="feature-icon">⌁</span><h3>Build in context</h3><p>Keep your prompt, files, and feedback close together as you shape the space quiz.</p></article><article><span class="feature-icon">◫</span><h3>Test what you made</h3><p>Use the right preview and test loop for ${product}, not a generic checklist.</p></article><article><span class="feature-icon">✦</span><h3>Ship with confidence</h3><p>Review the diff, choose a model deliberately, and publish only when it is ready.</p></article></div><div class="callout"><div class="callout-icon">◎</div><div><strong>What you’ll build</strong><p>A colorful, single-file space quiz. Every route ends with a tested project and a clear next step.</p></div></div><div class="split-heading"><div><div class="mini-kicker">Before you begin</div><h3>Prerequisites</h3></div><span>Works on macOS, Windows &amp; Linux</span></div><div class="check-grid"><label class="check-card"><input class="progress-check" type="checkbox" data-task="github-account"><span class="custom-check"></span><span><strong>GitHub account</strong><small><a href="${signup}" target="_blank" rel="noopener">Choose a Copilot plan</a></small></span></label>${needsGit ? `<label class="check-card product-git"><input class="progress-check" type="checkbox" data-task="git"><span class="custom-check"></span><span><strong>Git installed</strong><small>Required for this route · <code>git --version</code></small></span></label>` : ""}<label class="check-card no-node"><input class="progress-check" type="checkbox" data-task="no-node"><span class="custom-check"></span><span><strong>No Node.js prerequisite</strong><small>This lab uses a dependency-free HTML file.</small></span></label></div>${product === "GitHub Copilot app" ? `<p class="note"><strong>Organization account?</strong> Copilot Business and Enterprise administrators may need to enable the Copilot CLI policy before the app can create sessions.</p>` : ""}</section>`;
}

export function modelPanel() {
  return `<div class="model-panel"><strong>Shared model preference order</strong><ol>${models.map(([name, reasoning]) => `<li><span>${name}</span><small>${reasoning}</small></li>`).join("")}</ol></div>`;
}
