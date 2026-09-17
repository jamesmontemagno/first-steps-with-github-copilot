// Hand-drawn SVG scenes. No screenshots, no dependencies, theme-aware through CSS variables.

const W = 640;

function svg(height, title, body) {
  return `<svg class="art" viewBox="0 0 ${W} ${height}" role="img" aria-label="${title}"><rect class="plate" x="0.5" y="0.5" width="${W - 1}" height="${height - 1}" rx="12"/>${body}</svg>`;
}

function chrome(x, y, w, label, tone = "") {
  return `<rect class="win ${tone}" x="${x}" y="${y}" width="${w}" height="26" rx="7"/><circle class="dot red" cx="${x + 16}" cy="${y + 13}" r="4"/><circle class="dot amber" cx="${x + 30}" cy="${y + 13}" r="4"/><circle class="dot green" cx="${x + 44}" cy="${y + 13}" r="4"/><text class="t-xs mut" x="${x + w / 2}" y="${y + 17}" text-anchor="middle">${label}</text>`;
}

function bar(x, y, w, h = 8, cls = "fill") {
  return `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}"/>`;
}

const scenes = {
  cliWelcome: () => svg(330, "Copilot CLI welcome screen in a terminal window", `
    ${chrome(20, 18, 600, "space-quiz — copilot")}
    <rect class="panel" x="20" y="44" width="600" height="268"/>
    <g class="mono">
      <text class="t-sm accent" x="44" y="76">┌─────────────────────────────┐</text>
      <text class="t-sm accent" x="44" y="94">│   GitHub Copilot CLI        │</text>
      <text class="t-sm accent" x="44" y="112">└─────────────────────────────┘</text>
      <text class="t-sm mut" x="44" y="142">Trust the files in this folder?</text>
      <text class="t-sm txt" x="44" y="162">&gt; 1. Yes, proceed</text>
      <text class="t-sm mut" x="44" y="180">  2. No, exit</text>
    </g>
    <rect class="card" x="44" y="198" width="552" height="34" rx="8"/>
    <g class="mono"><text class="t-sm ok" x="60" y="219">/model</text><text class="t-sm mut" x="122" y="219">choose the model for this session</text></g>
    <rect class="card" x="44" y="238" width="552" height="34" rx="8"/>
    <g class="mono"><text class="t-sm ok" x="60" y="259">/help</text><text class="t-sm mut" x="122" y="259">list every slash command</text></g>
    <g class="mono"><text class="t-sm accent" x="44" y="294">&gt;</text><text class="t-sm txt" x="60" y="294">Create a space exploration quiz</text><rect class="caret" x="292" y="282" width="8" height="16"/></g>
  `),

  cliContext: () => svg(230, "Terminal showing the slash context command and a context usage meter", `
    ${chrome(20, 18, 600, "copilot — /context")}
    <rect class="panel" x="20" y="44" width="600" height="168"/>
    <g class="mono"><text class="t-sm accent" x="44" y="76">&gt;</text><text class="t-sm txt" x="60" y="76">/context</text></g>
    <text class="t-sm mut" x="44" y="104">Context window</text>
    <text class="t-sm txt" x="576" y="104" text-anchor="end">61% used</text>
    ${bar(44, 116, 532, 12, "track")}
    ${bar(44, 116, 196, 12, "fill")}
    ${bar(240, 116, 88, 12, "fill alt")}
    ${bar(328, 116, 40, 12, "fill warn")}
    <g>
      <circle class="sw" cx="50" cy="152" r="5"/><text class="t-xs mut" x="62" y="156">Conversation</text>
      <circle class="sw alt" cx="184" cy="152" r="5"/><text class="t-xs mut" x="196" y="156">Files read</text>
      <circle class="sw warn" cx="296" cy="152" r="5"/><text class="t-xs mut" x="308" y="156">Instructions</text>
    </g>
    <rect class="card" x="44" y="168" width="532" height="30" rx="8"/>
    <text class="t-xs mut" x="60" y="187">Running low? Use /compact to summarize, or start a fresh session.</text>
  `),

  cliSessions: () => svg(280, "Copilot CLI with the session side panel open next to an active session", `
    ${chrome(20, 18, 600, "copilot — 2 sessions")}
    <rect class="panel" x="20" y="44" width="600" height="218"/>
    <rect class="rail" x="20" y="44" width="196" height="218"/>
    <text class="t-xs mut" x="36" y="68">SESSIONS</text>
    <rect class="card sel" x="34" y="78" width="168" height="46" rx="8"/>
    <text class="t-sm txt" x="48" y="98">#12 Timer</text>
    <text class="t-xs ok" x="48" y="114">running · main</text>
    <rect class="card" x="34" y="132" width="168" height="46" rx="8"/>
    <text class="t-sm txt" x="48" y="152">#13 Review screen</text>
    <text class="t-xs mut" x="48" y="168">worktree · plan mode</text>
    <g class="mono"><text class="t-xs accent" x="34" y="208">←</text><text class="t-xs mut" x="50" y="208">opens this panel</text></g>
    <g class="mono">
      <text class="t-sm accent" x="240" y="80">&gt;</text><text class="t-sm txt" x="256" y="80">/worktree</text>
      <text class="t-xs mut" x="240" y="106">Created ../space-quiz-13 on branch issue-13</text>
      <text class="t-sm accent" x="240" y="140">&gt;</text><text class="t-sm txt" x="256" y="140">/plan</text>
      <text class="t-xs mut" x="240" y="166">Plan mode: researching before any edits…</text>
      <text class="t-sm accent" x="240" y="200">&gt;</text><text class="t-sm txt" x="256" y="200">!git status</text>
      <text class="t-xs ok" x="240" y="226">nothing to commit, working tree clean</text>
    </g>
  `),

  appSession: () => svg(250, "The Copilot app session header showing folder, branch, mode, and model", `
    ${chrome(20, 18, 600, "GitHub Copilot")}
    <rect class="panel" x="20" y="44" width="600" height="188"/>
    <rect class="rail" x="20" y="44" width="56" height="188"/>
    <rect class="card sel" x="32" y="56" width="32" height="26" rx="7"/>
    <rect class="card" x="32" y="90" width="32" height="26" rx="7"/>
    <rect class="card" x="32" y="124" width="32" height="26" rx="7"/>
    <rect class="head" x="76" y="44" width="544" height="44"/>
    <rect class="chip" x="94" y="56" width="110" height="22" rx="11"/><text class="t-xs txt" x="108" y="71">space-quiz</text>
    <rect class="chip" x="214" y="56" width="74" height="22" rx="11"/><text class="t-xs ok" x="228" y="71">main</text>
    <rect class="chip" x="298" y="56" width="96" height="22" rx="11"/><text class="t-xs accent" x="312" y="71">Interactive</text>
    <rect class="chip" x="404" y="56" width="116" height="22" rx="11"/><text class="t-xs mut" x="418" y="71">GPT-5.6 Luna</text>
    <text class="t-xs mut" x="608" y="71" text-anchor="end">⌄</text>
    <rect class="bubble" x="300" y="106" width="304" height="34" rx="10"/>
    <text class="t-sm txt" x="316" y="127">Create a space exploration quiz…</text>
    <circle class="sw" cx="104" cy="164" r="9"/>
    <rect class="card" x="122" y="148" width="330" height="60" rx="10"/>
    <text class="t-sm txt" x="138" y="170">Building index.html</text>
    ${bar(138, 182, 200, 6, "fill")}
    <text class="t-xs mut" x="138" y="202">+142 lines · 1 file</text>
  `),

  appChanges: () => svg(250, "The Changes tab in the app flyout showing a file diff", `
    ${chrome(20, 18, 600, "space-quiz · session")}
    <rect class="panel" x="20" y="44" width="600" height="188"/>
    <rect class="rail" x="380" y="44" width="240" height="188"/>
    <rect class="tab sel" x="392" y="56" width="70" height="24" rx="7"/><text class="t-xs txt" x="427" y="72" text-anchor="middle">Changes</text>
    <rect class="tab" x="468" y="56" width="62" height="24" rx="7"/><text class="t-xs mut" x="499" y="72" text-anchor="middle">Terminal</text>
    <text class="t-xs mut" x="392" y="102">1 file changed</text>
    <text class="t-xs ok" x="608" y="102" text-anchor="end">+142 −8</text>
    <rect class="card" x="392" y="112" width="216" height="28" rx="7"/>
    <text class="t-sm txt" x="406" y="131">index.html</text>
    <g class="mono">
      <rect class="diff add" x="392" y="148" width="216" height="16" rx="4"/><text class="t-xs ok" x="402" y="160">+ &lt;div class="progress"&gt;</text>
      <rect class="diff add" x="392" y="168" width="216" height="16" rx="4"/><text class="t-xs ok" x="402" y="180">+ &lt;span id="score"&gt;0&lt;/span&gt;</text>
      <rect class="diff del" x="392" y="188" width="216" height="16" rx="4"/><text class="t-xs bad" x="402" y="200">− &lt;h1&gt;Quiz&lt;/h1&gt;</text>
    </g>
    <text class="t-xs mut" x="44" y="76">SESSION</text>
    <rect class="bubble" x="44" y="88" width="312" height="30" rx="10"/><text class="t-sm txt" x="58" y="108">Implement issue #12</text>
    <rect class="card" x="44" y="128" width="312" height="80" rx="10"/>
    <text class="t-sm txt" x="58" y="150">Added the per-question timer</text>
    <text class="t-xs mut" x="58" y="172">Review the diff before you accept it →</text>
    ${bar(58, 186, 180, 6, "fill")}
  `),

  vscodeCommit: () => svg(270, "The VS Code Source Control view with the Copilot sparkle button on the commit message box", `
    ${chrome(20, 18, 600, "space-quiz — Visual Studio Code")}
    <rect class="panel" x="20" y="44" width="600" height="208"/>
    <rect class="rail" x="20" y="44" width="48" height="208"/>
    <rect class="card" x="30" y="56" width="28" height="22" rx="6"/>
    <rect class="card sel" x="30" y="86" width="28" height="22" rx="6"/>
    <rect class="card" x="30" y="116" width="28" height="22" rx="6"/>
    <rect class="rail" x="68" y="44" width="252" height="208"/>
    <text class="t-xs mut" x="84" y="68">SOURCE CONTROL</text>
    <rect class="card" x="84" y="80" width="220" height="42" rx="8"/>
    <text class="t-sm mut" x="98" y="106">Message (⌘Enter to commit)</text>
    <g class="sparkle"><path d="M286 88c.6 3 1.7 4.5 4.7 5.1-3 .6-4.1 2.1-4.7 5.1-.6-3-1.7-4.5-4.7-5.1 3-.6 4.1-2.1 4.7-5.1Z"/><path d="M293 99c.3 1.4.8 2.1 2.2 2.4-1.4.3-1.9 1-2.2 2.4-.3-1.4-.8-2.1-2.2-2.4 1.4-.3 1.9-1 2.2-2.4Z"/></g>
    <rect class="cta" x="84" y="130" width="220" height="28" rx="7"/>
    <text class="t-sm inv" x="194" y="149" text-anchor="middle">Commit</text>
    <text class="t-xs mut" x="84" y="180">CHANGES</text>
    <text class="t-sm txt" x="84" y="200">index.html</text><text class="t-xs ok" x="304" y="200" text-anchor="end">M</text>
    <text class="t-sm txt" x="84" y="222">.github/copilot-instructions.md</text><text class="t-xs ok" x="304" y="222" text-anchor="end">U</text>
    <rect class="card" x="336" y="60" width="268" height="60" rx="8"/>
    <text class="t-xs accent" x="352" y="82">Copilot wrote your message</text>
    <text class="t-sm txt" x="352" y="104">Add per-question timer to the quiz</text>
    <rect class="cta ghost" x="336" y="132" width="268" height="30" rx="8"/>
    <text class="t-sm accent" x="470" y="152" text-anchor="middle">Create Pull Request</text>
    <text class="t-xs mut" x="336" y="186">Commit first, then this button appears</text>
    <text class="t-xs mut" x="336" y="208">right inside Source Control.</text>
  `),

  vscodeCloud: () => svg(240, "The Copilot Chat harness picker in VS Code switching from Local to Cloud", `
    ${chrome(20, 18, 600, "Copilot Chat")}
    <rect class="panel" x="20" y="44" width="600" height="178"/>
    <rect class="bubble" x="300" y="60" width="304" height="30" rx="10"/>
    <text class="t-sm txt" x="316" y="80">Add three new colour themes</text>
    <rect class="card" x="36" y="104" width="300" height="52" rx="10"/>
    <text class="t-sm txt" x="52" y="126">Working in the cloud…</text>
    <text class="t-xs mut" x="52" y="146">Follow the session on GitHub</text>
    <rect class="input" x="36" y="172" width="568" height="34" rx="9"/>
    <text class="t-sm mut" x="54" y="194">Ask Copilot</text>
    <rect class="chip" x="392" y="180" width="92" height="20" rx="10"/>
    <text class="t-xs mut" x="406" y="194">Agent ⌄</text>
    <rect class="menu" x="388" y="94" width="200" height="76" rx="9"/>
    <text class="t-xs mut" x="404" y="114">HARNESS</text>
    <rect class="card" x="396" y="122" width="184" height="20" rx="6"/>
    <text class="t-xs txt" x="410" y="136">Local · Copilot</text>
    <rect class="card sel" x="396" y="144" width="184" height="20" rx="6"/>
    <text class="t-xs accent" x="410" y="158">Cloud</text>
    <text class="t-xs ok" x="568" y="158" text-anchor="end">✓</text>
  `)
};

export function art(name, caption) {
  const scene = scenes[name];
  if (!scene) return "";
  return `<figure class="art-figure">${scene()}${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`;
}
