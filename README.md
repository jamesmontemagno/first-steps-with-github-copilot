# First Steps with GitHub Copilot

**A zero-dependency, self-paced workshop for the GitHub Copilot app, Copilot CLI, and Copilot in VS Code.**

[Start the lab →](https://jamesmontemagno.github.io/first-steps-with-github-copilot/)

Choose a product from the switcher in the header. Each product has its own maintainable lab module, product-scoped progress, shared theme/navigation/copy behavior, and a focused route for building the same dependency-free `space-quiz`.

## Routes

| Route | Focus |
| --- | --- |
| **Desktop App** | Baseline storyline: sessions, integrated browser, element picker, `/init`, GitHub issues and PRs, Plan mode, Changes tab, Automations, `/remote`, and Canvas |
| **CLI** | `/model`, `/diff`, `/init`, tests before Git init, parallel sessions via the left-arrow side panel, `/worktree`, `!` shell commands, Plan mode, `/context`, `/resume` and `copilot --resume`, `/remote`, `/pr create`, `/pr agentmerge`, then `/delegate` and cloud sessions |
| **VS Code** | Extensions setup, integrated browser, `/init` custom instructions, bottom-right context inspection, tests before Git init, Git integration publish and diffs, Plan mode, GitHub MCP, `+` new sessions, PR creation/review/merge |

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
index.html             # Shared shell and product switcher
styles.css             # Shared theme, layout, and components
script.js              # Shared rendering, progress, copy, theme, and navigation
labs/shared.js         # Shared lab helpers and model preferences
labs/app.js            # GitHub Copilot app lab definition
labs/cli.js            # Copilot CLI lab definition
labs/vscode.js         # Copilot in VS Code lab definition
assets/favicon.svg     # Site icon
assets/docs/           # Screenshots from GitHub Docs (CC BY 4.0)
.github/workflows/     # GitHub Pages deployment
```

## Deploy

The GitHub Pages workflow publishes the repository root whenever changes are pushed to `main`. Enable GitHub Actions as the Pages source in repository settings.

## Image attribution

Screenshots in `assets/docs/` come from [github/docs](https://github.com/github/docs) and are used under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Copyright GitHub, Inc. No changes were made to
the images.

## License

Released under the [MIT License](LICENSE).
