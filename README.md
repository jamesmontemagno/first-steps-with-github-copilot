# First Steps with GitHub Copilot

**A zero-dependency, self-paced workshop for the GitHub Copilot app, Copilot CLI, and Copilot in VS Code.**

[Start the lab →](https://jamesmontemagno.github.io/github-copilot-app-lab/)

Choose a product in the left rail. Each product has its own maintainable lab module, product-scoped progress, shared theme/navigation/copy behavior, and a focused route for building the same dependency-free `space-quiz`.

## Routes

| Route | Focus |
| --- | --- |
| **GitHub Copilot app** | Baseline storyline: sessions, integrated browser, `/init`, GitHub issues and PRs, Automations, and Canvas |
| **Copilot CLI** | `/init`, `/delegate`, cloud sessions, `/remote`, `/context`, `/resume`, `/worktree`, `!` Git commands, `/diff`, parallel sessions, `/pr create`, `/pr agentmerge`, tests before Git init |
| **Copilot in VS Code** | Integrated browser, `/init`, bottom-right context inspection, `+` new sessions, Git integration diffs, GitHub MCP, PR creation/review/merge, tests before Git init |

The shared model preference order is **GPT-5.6 Luna + High reasoning**, **GPT-5.3-Codex + Medium reasoning**, then **Auto + Balance**. The signup link is [github.com/features/copilot/plans](https://github.com/features/copilot/plans).

## Prerequisites

- A GitHub account with a Copilot plan
- GitHub Copilot app, Copilot CLI, or VS Code + GitHub Copilot, depending on the route
- Git is required for the CLI and VS Code routes; it is not an app-route prerequisite
- Node.js is not required

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
assets/                # Favicon and README screenshots
.github/workflows/     # GitHub Pages deployment
```

## Deploy

The GitHub Pages workflow publishes the repository root whenever changes are pushed to `main`. Enable GitHub Actions as the Pages source in repository settings.

## License

Released under the [MIT License](LICENSE).
