# First Steps with GitHub Copilot

**A zero-dependency, self-paced workshop for the GitHub Copilot app, Copilot CLI, and Copilot in VS Code.**

[Start the lab →](https://jamesmontemagno.github.io/first-steps-with-github-copilot/)

Choose a product from the switcher in the header. Each product has its own maintainable lab module, product-scoped progress, shared theme/navigation/copy behavior, and a focused route for building the same dependency-free `space-quiz`.

## Routes

| Route | Focus |
| --- | --- |
| **Desktop App** | Baseline storyline: sessions, integrated browser, element picker, `/init`, GitHub issues and PRs, Plan mode, Changes tab, Automations, `/remote`, and Canvas |
| **CLI** | `/model`, `/diff` on every change, `/init`, publishing by prompt or by hand, `c` to add an issue to chat, parallel sessions via the left-arrow side panel, `/worktree`, `!` shell commands, Plan mode, `/context`, `/resume` and `copilot --resume`, optional `/remote`, `/pr create`, `/pr agentmerge`, then `/delegate` |
| **VS Code** | Built-in Copilot plus the GitHub Pull Requests and Issues extension, integrated browser with element picking, `/init` custom instructions, bottom-right context inspection, tests before Git init, Git integration publish and diffs, Plan mode, GitHub MCP, `+` new sessions, PR creation/review/merge |

The shared model preference order is **GPT-5.6 Luna + High reasoning**, **GPT-5.3-Codex + Medium reasoning**, then **Auto + Balance**. The signup link is [github.com/features/copilot/plans](https://github.com/features/copilot/plans).

## Prerequisites

- A GitHub account with a Copilot plan
- GitHub Copilot app, Copilot CLI, or VS Code + GitHub Copilot, depending on the route
- Git is required for the CLI and VS Code routes; the desktop app bundles Git

## Run locally

There is no build step, package manager, or runtime dependency. Serve the repository root with any static server:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## Project structure

```text
index.html             # Shared shell (the route picker renders inside the lab)
styles.css             # Shared theme, layout, and components
script.js              # Shared rendering, progress, copy, theme, and navigation
labs/shared.js         # Shared lab helpers, route picker, and model preferences
labs/art.js            # Hand-drawn SVG interface scenes
labs/app.js            # GitHub Copilot app lab definition
labs/cli.js            # Copilot CLI lab definition
labs/vscode.js         # Copilot in VS Code lab definition
assets/favicon.svg     # Site icon
.github/workflows/     # GitHub Pages deployment
```

## Deploy

The GitHub Pages workflow publishes the repository root whenever changes are pushed to `main`. Enable GitHub Actions as the Pages source in repository settings.

## Images

Every interface illustration is drawn in SVG in `labs/art.js`. They inherit the site's theme variables, so
they follow light and dark mode, stay sharp at any size, and never go stale when a product ships a redesign.

To add one, write a new entry in the `scenes` object and call `art("sceneName", "caption")` from a lab.

## License

Released under the [MIT License](LICENSE).
