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

  appSession: () => svg(600, "The Copilot app session details panel showing path, project, agent, changes, tokens, and context usage", `
    <text class="t-sm txt" x="170" y="30">Space Quiz build</text><text class="t-sm mut mono" x="286" y="30">· space-quiz/main</text>
    <rect class="panel" x="170" y="42" width="300" height="536" rx="10"/>
    <rect class="chip" x="186" y="56" width="52" height="22" rx="6"/><text class="t-xs accent mono" x="196" y="71">main</text>
    <text class="t-xs mut" x="246" y="71">from</text>
    <rect class="chip" x="280" y="56" width="104" height="22" rx="6"/><text class="t-xs accent mono" x="292" y="71">origin/main</text>
    <path class="rule" d="M170 90h300"/>
    <g>
      <text class="t-xs mut" x="186" y="114">Remote control</text><text class="t-xs txt" x="318" y="114">Not enabled</text>
      <text class="t-xs mut" x="186" y="140">Path</text><text class="t-xs txt mono" x="318" y="140">~/Projects/spa…</text>
      <text class="t-xs mut" x="186" y="166">Project</text><text class="t-xs txt" x="318" y="166">space-quiz</text>
      <text class="t-xs mut" x="186" y="192">Session name</text><text class="t-xs txt" x="318" y="192">Space Quiz build</text>
      <text class="t-xs mut" x="186" y="218">Session ID</text><text class="t-xs txt mono" x="318" y="218">509d8b9a-cc2e…</text>
      <text class="t-xs mut" x="186" y="244">Agent</text><text class="t-xs txt" x="318" y="244">Default</text><text class="t-xs link" x="376" y="244">Change</text>
    </g>
    <path class="rule" d="M170 260h300"/>
    <text class="t-xs mut" x="186" y="284">Changes</text><text class="t-xs ok" x="318" y="284">1 file changed</text>
    <path class="rule" d="M170 300h300"/>
    <text class="t-xs mut" x="186" y="324">Tokens</text>
    <text class="t-xs txt" x="318" y="324">↑ 6.8M</text><text class="t-xs mut" x="374" y="324">(6.8M cached)</text>
    <text class="t-xs txt" x="318" y="344">↓ 35.1K</text><text class="t-xs mut" x="374" y="344">(6.9K reasoning)</text>
    <text class="t-xs mut" x="186" y="374">Context</text>
    <text class="t-sm txt" x="186" y="396">27%</text><text class="t-xs mut" x="454" y="396" text-anchor="end">328K</text>
    ${bar(186, 404, 268, 7, "track")}
    ${bar(186, 404, 8, 7, "fill alt")}
    ${bar(196, 404, 4, 7, "fill")}
    ${bar(202, 404, 62, 7, "fill ok")}
    <text class="t-xs mut" x="186" y="434">Session spend</text><text class="t-xs txt" x="318" y="434">20.7 AI credits</text>
    <path class="rule" d="M170 450h300"/>
    <g>
      <circle class="stroke" cx="194" cy="470" r="3"/><path class="stroke" d="M188 466a9 9 0 0 0 0 8M200 466a9 9 0 0 1 0 8"/>
      <text class="t-xs mut" x="212" y="474">Enable remote control</text>
      <path class="stroke" d="M189 494l9-9 4 4-9 9h-4Z"/><text class="t-xs mut" x="212" y="498">Rename session</text>
      <path class="stroke" d="M188 510l4 6 4-12 4 10 3-4"/><text class="t-xs mut" x="212" y="522">View session insights</text>
      <path class="stroke" d="M194 542v-12M190 534l4-4 4 4M188 546h12"/><text class="t-xs mut" x="212" y="546">Share as secret gist</text>
      <rect class="stroke" x="188" y="562" width="12" height="9" rx="1.5"/><path class="stroke" d="M187 560h14"/><text class="t-xs mut" x="212" y="570">Archive session</text>
    </g>
    <g>
      <text class="t-xs accent" x="20" y="162">Which folder and</text><text class="t-xs accent" x="20" y="176">branch this really is</text>
      <path class="lead" d="M132 170h34"/>
      <text class="t-xs accent" x="490" y="392">The number to watch</text><text class="t-xs mut" x="490" y="406">As context fills, start</text><text class="t-xs mut" x="490" y="420">a fresh session</text>
      <path class="lead" d="M474 400h12"/>
      <text class="t-xs accent" x="490" y="508">More options for</text><text class="t-xs accent" x="490" y="522">the session</text>
      <path class="lead" d="M474 508h12"/>
    </g>
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

  appNewSession: () => svg(300, "The Copilot app New session screen with the prompt box and folder, mode, and agent pickers", `
    <circle class="mark" cx="320" cy="72" r="26"/>
    <path class="markGlyph" d="M320 54c-10 0-18 8-18 18 0 8 5 14.8 12.3 17.1 .9.2 1.2-.4 1.2-.9v-3.1c-5 1.1-6.1-2.4-6.1-2.4-.8-2.1-2-2.7-2-2.7-1.7-1.1.1-1.1.1-1.1 1.8.1 2.8 1.9 2.8 1.9 1.6 2.8 4.3 2 5.3 1.5.2-1.2.6-2 1.2-2.5-4-.5-8.2-2-8.2-8.9 0-2 .7-3.6 1.9-4.8-.2-.5-.8-2.3.2-4.8 0 0 1.5-.5 5 1.8a17 17 0 0 1 9 0c3.5-2.3 5-1.8 5-1.8 1 2.5.4 4.3.2 4.8a7 7 0 0 1 1.9 4.8c0 6.9-4.2 8.4-8.2 8.8.6.6 1.2 1.7 1.2 3.4v5.1c0 .5.3 1.1 1.2.9A18 18 0 0 0 338 72c0-10-8-18-18-18Z"/>
    <rect class="input" x="40" y="120" width="560" height="96" rx="12"/>
    <text class="t-sm mut" x="62" y="152">Ask anything or paste a URL. Use / for commands, &amp; sessions, # issues…</text>
    <text class="t-sm mut" x="62" y="194">+</text>
    <text class="t-sm txt" x="86" y="194">Interactive</text>
    <text class="t-sm txt" x="168" y="194">Auto · Balance</text>
    <text class="t-sm txt" x="272" y="194">Default agent</text>
    <circle class="send" cx="574" cy="188" r="14"/>
    <path class="sendGlyph" d="M574 182v12M569 187l5-5 5 5"/>
    <g class="mut">
      <path class="stroke" d="M62 236h9l2 2h9v8H62Z"/>
      <text class="t-sm txt" x="90" y="246">space-quiz</text>
      <rect class="stroke" x="176" y="236" width="12" height="9" rx="1.5"/>
      <text class="t-sm txt" x="196" y="246">Local</text>
      <circle class="stroke" cx="252" cy="238" r="2.6"/><circle class="stroke" cx="252" cy="246" r="2.6"/><path class="stroke" d="M252 241v2"/>
      <text class="t-sm txt" x="264" y="246">main</text>
    </g>
    <rect class="card sel" x="330" y="228" width="270" height="26" rx="8"/>
    <text class="t-xs accent" x="344" y="245">Start from New → Open folder</text>
    <text class="t-xs mut" x="40" y="284">Pick the folder, the mode, and the agent before you send the first prompt.</text>
  `),

  appMyWork: () => svg(300, "The My work view in the Copilot app with the sidebar and a list of pull requests", `
    <rect class="rail" x="0.5" y="0.5" width="212" height="299" rx="12"/>
    <circle class="dot" cx="28" cy="28" r="5"/><circle class="dot" cx="46" cy="28" r="5"/><circle class="dot" cx="64" cy="28" r="5"/>
    <rect class="stroke" x="84" y="20" width="18" height="16" rx="3"/><path class="stroke" d="M91 20v16"/>
    <circle class="stroke" cx="130" cy="28" r="6"/><path class="stroke" d="m135 33 4 4"/>
    <path class="stroke" d="M162 22l-6 6 6 6M180 22l6 6-6 6"/>
    <path class="stroke" d="M28 66h16M36 58v16"/><text class="t-sm txt" x="56" y="71">New</text>
    <rect class="card sel" x="14" y="86" width="184" height="30" rx="8"/>
    <path class="stroke" d="M28 96h6v6h-6zM28 106h6v4h-6z"/><path class="stroke" d="M40 99h10M40 108h10"/>
    <text class="t-sm txt" x="58" y="105">My work</text>
    <rect class="stroke" x="27" y="126" width="15" height="13" rx="2.5"/><path class="stroke" d="M27 130h15M31 124v4M38 124v4"/>
    <text class="t-sm mut" x="58" y="137">Automations</text>
    <rect class="stroke" x="27" y="158" width="7" height="7" rx="1.5"/><rect class="stroke" x="36" y="158" width="7" height="7" rx="1.5"/><rect class="stroke" x="27" y="167" width="7" height="7" rx="1.5"/>
    <text class="t-sm mut" x="58" y="170">Customize</text>
    <path class="rule" d="M14 194h184"/>
    <text class="t-xs mut" x="28" y="218">Projects</text>
    <path class="stroke" d="M158 213h12M160 217h8M162 221h4"/>
    <path class="stroke" d="M180 217h12M186 211v12"/>
    <rect class="card" x="14" y="232" width="184" height="26" rx="7"/>
    <text class="t-xs mut" x="28" y="249">space-quiz</text>
    <text class="t-sm txt" x="236" y="34">My work</text>
    <rect class="chip sel" x="236" y="52" width="46" height="24" rx="8"/><text class="t-xs accent" x="259" y="68" text-anchor="middle">All</text>
    <text class="t-xs mut" x="298" y="68">Active</text>
    <text class="t-xs mut" x="352" y="68">Review requests</text>
    <text class="t-xs mut" x="464" y="68">Done</text>
    <path class="stroke" d="M508 64h12M514 58v12"/>
    <path class="rule" d="M224 88h416"/>
    <g>
      <circle class="ok-stroke" cx="242" cy="112" r="3"/><circle class="ok-stroke" cx="242" cy="128" r="3"/><circle class="ok-stroke" cx="256" cy="112" r="3"/><path class="ok-stroke" d="M242 115v10M256 115v8a5 5 0 0 1-5 5h-6"/>
      <text class="t-sm txt" x="272" y="116">Move the route picker into the lab</text><text class="t-sm mut" x="512" y="116">#5</text>
      <text class="t-xs mut" x="272" y="134">jamesmontemagno/first-steps-with-github-copilot</text>
      <text class="t-xs mut" x="272" y="150">10m ago</text>
    </g>
    <g>
      <circle class="alt-stroke" cx="242" cy="186" r="3"/><circle class="alt-stroke" cx="242" cy="202" r="3"/><circle class="alt-stroke" cx="256" cy="194" r="3"/><path class="alt-stroke" d="M242 189v10M245 193h8"/>
      <text class="t-sm txt" x="272" y="190">Polish the multi-product lab</text><text class="t-sm mut" x="470" y="190">#4</text>
      <text class="t-xs mut" x="272" y="208">jamesmontemagno/first-steps-with-github-copilot</text>
      <text class="t-xs mut" x="272" y="224">3h ago</text>
    </g>
    <text class="t-xs accent" x="236" y="266">Every issue and pull request you care about, without leaving the app.</text>
  `),

  appAutomations: () => svg(300, "The Automations view in the Copilot app with weekly automation cards", `
    <rect class="rail" x="0.5" y="0.5" width="212" height="299" rx="12"/>
    <circle class="dot" cx="28" cy="28" r="5"/><circle class="dot" cx="46" cy="28" r="5"/><circle class="dot" cx="64" cy="28" r="5"/>
    <rect class="stroke" x="84" y="20" width="18" height="16" rx="3"/><path class="stroke" d="M91 20v16"/>
    <circle class="stroke" cx="130" cy="28" r="6"/><path class="stroke" d="m135 33 4 4"/>
    <path class="stroke" d="M162 22l-6 6 6 6M180 22l6 6-6 6"/>
    <path class="stroke" d="M28 66h16M36 58v16"/><text class="t-sm txt" x="56" y="71">New</text>
    <path class="stroke" d="M28 96h6v6h-6zM28 106h6v4h-6zM40 99h10M40 108h10"/>
    <text class="t-sm mut" x="58" y="105">My work</text>
    <rect class="card sel" x="14" y="118" width="184" height="30" rx="8"/>
    <rect class="stroke" x="27" y="126" width="15" height="13" rx="2.5"/><path class="stroke" d="M27 130h15M31 124v4M38 124v4"/>
    <text class="t-sm txt" x="58" y="137">Automations</text>
    <rect class="stroke" x="27" y="158" width="7" height="7" rx="1.5"/><rect class="stroke" x="36" y="158" width="7" height="7" rx="1.5"/><rect class="stroke" x="27" y="167" width="7" height="7" rx="1.5"/>
    <text class="t-sm mut" x="58" y="170">Customize</text>
    <path class="rule" d="M14 194h184"/>
    <text class="t-xs mut" x="28" y="218">Projects</text>
    <path class="stroke" d="M158 213h12M160 217h8M162 221h4M180 217h12M186 211v12"/>
    <rect class="card" x="14" y="232" width="184" height="26" rx="7"/>
    <text class="t-xs mut" x="28" y="249">space-quiz</text>
    <text class="t-sm txt" x="236" y="34">Automations</text>
    <rect class="chip" x="430" y="18" width="88" height="24" rx="7"/><text class="t-xs txt" x="474" y="34" text-anchor="middle">Templates</text>
    <rect class="cta" x="526" y="18" width="110" height="24" rx="7"/><text class="t-xs inv" x="581" y="34" text-anchor="middle">New automation</text>
    <rect class="chip sel" x="236" y="56" width="42" height="22" rx="7"/><text class="t-xs accent" x="257" y="71" text-anchor="middle">All</text>
    <text class="t-xs mut" x="294" y="71">Local</text>
    <text class="t-xs mut" x="338" y="71">Cloud</text>
    <rect class="input" x="440" y="56" width="196" height="22" rx="7"/>
    <circle class="stroke" cx="456" cy="67" r="4"/><path class="stroke" d="m459 70 3 3"/>
    <text class="t-xs mut" x="470" y="71">Search automations…</text>
    <path class="rule" d="M224 92h416"/>
    <text class="t-sm txt" x="236" y="118">Your automations</text>
    <text class="t-xs mut" x="236" y="136">Use agents to handle recurring work on a cadence you choose.</text>
    <rect class="card" x="236" y="150" width="192" height="112" rx="9"/>
    <text class="t-sm txt" x="250" y="176">Issue triage</text>
    <rect class="chip alt" x="356" y="163" width="58" height="18" rx="6"/><text class="t-xs blue" x="385" y="176" text-anchor="middle">Weekly</text>
    <text class="t-xs mut" x="250" y="198">Review the latest GitHub issues</text>
    <text class="t-xs mut" x="250" y="214">and rank them by severity…</text>
    <path class="rule" d="M236 230h192"/>
    <text class="t-xs mut" x="250" y="250">space-quiz · Local</text>
    <circle class="ok-fill" cx="356" cy="246" r="5"/><path class="tick" d="m353.6 246 1.8 1.8 3.2-3.4"/>
    <text class="t-xs mut" x="366" y="250">2d ago</text>
    <path class="play" d="M408 240v12l10-6Z"/>
    <rect class="card" x="444" y="150" width="192" height="112" rx="9"/>
    <text class="t-sm txt" x="458" y="176">Accessibility audit</text>
    <rect class="chip alt" x="564" y="163" width="58" height="18" rx="6"/><text class="t-xs blue" x="593" y="176" text-anchor="middle">Weekly</text>
    <text class="t-xs mut" x="458" y="198">Review PRs merged this week</text>
    <text class="t-xs mut" x="458" y="214">and summarize a11y issues…</text>
    <path class="rule" d="M444 230h192"/>
    <text class="t-xs mut" x="458" y="250">space-quiz · Local</text>
    <path class="play" d="M616 240v12l10-6Z"/>
    <text class="t-xs accent" x="236" y="286">Each run opens its own session, so an automation never disturbs your work.</text>
  `),

  appCanvas: () => svg(300, "A Kanban canvas with issue cards, one being dragged from Backlog into Plan", `
    ${chrome(20, 18, 600, "Repository Issues Kanban")}
    <rect class="panel" x="20" y="44" width="600" height="238"/>
    <g>
      <text class="t-xs mut" x="44" y="72">BACKLOG</text>
      <text class="t-xs accent" x="196" y="72">PLAN</text>
      <text class="t-xs mut" x="348" y="72">READY</text>
      <text class="t-xs mut" x="500" y="72">IMPLEMENT</text>
    </g>
    <rect class="col" x="36" y="82" width="140" height="180" rx="9"/>
    <rect class="col drop" x="188" y="82" width="140" height="180" rx="9"/>
    <rect class="col" x="340" y="82" width="140" height="180" rx="9"/>
    <rect class="col" x="492" y="82" width="112" height="180" rx="9"/>
    <rect class="card" x="46" y="94" width="120" height="52" rx="8"/>
    <text class="t-xs mut" x="60" y="114">#12</text>
    <text class="t-sm txt" x="60" y="132">Per-question timer</text>
    <rect class="card ghost" x="46" y="158" width="120" height="52" rx="8"/>
    <text class="t-xs mut" x="60" y="178">#13</text>
    <text class="t-sm mut" x="60" y="196">Review screen</text>
    <path class="drag" d="M172 184h40"/>
    <path class="drag" d="M206 178l8 6-8 6"/>
    <rect class="card sel lift" x="216" y="150" width="120" height="52" rx="8"/>
    <text class="t-xs accent" x="230" y="170">#13</text>
    <text class="t-sm txt" x="230" y="188">Review screen</text>
    <text class="t-xs mut" x="36" y="278">Drop a card into a lane and the app opens a session with that issue already loaded.</text>
  `),

  cliWorktree: () => svg(180, "Terminal output from the slash worktree command creating an isolated checkout", `
    ${chrome(20, 18, 600, "copilot — /worktree")}
    <rect class="panel" x="20" y="44" width="600" height="118"/>
    <g class="mono">
      <text class="t-sm accent" x="44" y="74">&gt;</text><text class="t-sm txt" x="60" y="74">/worktree</text>
      <text class="t-xs ok" x="44" y="100">✓ Created worktree ../space-quiz-13</text>
      <text class="t-xs mut" x="44" y="120">  branch: issue-13-review-screen</text>
      <text class="t-xs mut" x="44" y="140">  this session now works there; main is untouched</text>
    </g>
  `),

  vscodeInstructions: () => svg(280, "The copilot-instructions.md file open in VS Code", `
    ${chrome(20, 18, 600, "copilot-instructions.md — space-quiz")}
    <rect class="panel" x="20" y="44" width="600" height="218"/>
    <rect class="rail" x="20" y="44" width="176" height="218"/>
    <text class="t-xs mut" x="36" y="68">EXPLORER</text>
    <text class="t-sm mut" x="36" y="92">▾ .github</text>
    <rect class="card sel" x="44" y="100" width="144" height="22" rx="6"/>
    <text class="t-xs txt" x="56" y="115">copilot-instructions.md</text>
    <text class="t-sm mut" x="36" y="142">index.html</text>
    <rect class="tab sel" x="196" y="44" width="164" height="26"/>
    <text class="t-xs txt" x="212" y="61">copilot-instructions.md</text>
    <g>
      <text class="t-sm accent" x="212" y="96"># Space Quiz</text>
      <text class="t-xs mut" x="212" y="122">Single <tspan class="txt">index.html</tspan>. No dependencies, no build step.</text>
      <text class="t-xs mut" x="212" y="144">Every answer must be reachable by keyboard.</text>
      <text class="t-xs mut" x="212" y="166">Respect prefers-color-scheme in both themes.</text>
      <text class="t-sm accent" x="212" y="198">## How I like code written</text>
      <text class="t-xs mut" x="212" y="222">Small functions, early returns, no clever one-liners.</text>
      <text class="t-xs mut" x="212" y="244">Comment only what is genuinely surprising.</text>
    </g>
  `),
  vscodeCloud: () => svg(260, "The Copilot Chat harness picker in VS Code switching from Local to Cloud", `
    ${chrome(20, 18, 600, "Copilot Chat")}
    <rect class="panel" x="20" y="44" width="600" height="198"/>
    <rect class="bubble" x="300" y="60" width="304" height="30" rx="10"/>
    <text class="t-sm txt" x="316" y="80">Add three new colour themes</text>
    <rect class="card" x="36" y="104" width="248" height="52" rx="10"/>
    <text class="t-sm txt" x="52" y="126">Working in the cloud…</text>
    <text class="t-xs mut" x="52" y="146">Follow the session on GitHub</text>
    <rect class="input" x="36" y="188" width="568" height="34" rx="9"/>
    <text class="t-sm mut" x="54" y="210">Ask Copilot</text>
    <rect class="chip sel" x="486" y="196" width="102" height="20" rx="10"/>
    <text class="t-xs accent" x="500" y="210">Harness ⌄</text>
    <rect class="menu" x="396" y="60" width="192" height="126" rx="9"/>
    <text class="t-xs mut" x="412" y="80">Harness</text>
    <text class="t-xs mut" x="412" y="102">Copilot</text>
    <rect class="card" x="404" y="108" width="176" height="20" rx="6"/>
    <text class="t-xs txt" x="418" y="122">Local</text>
    <rect class="card sel" x="404" y="130" width="176" height="20" rx="6"/>
    <text class="t-xs accent" x="418" y="144">Cloud</text>
    <text class="t-xs ok" x="568" y="144" text-anchor="end">✓</text>
    <path class="rule" d="M404 158h176"/>
    <text class="t-xs mut" x="418" y="174">Claude</text>
    <text class="t-xs mut" x="500" y="174">Codex</text>
  `)
};

export function art(name, caption) {
  const scene = scenes[name];
  if (!scene) return "";
  return `<figure class="art-figure">${scene()}${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`;
}
