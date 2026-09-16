# GitHub Copilot App Lab

A beginner-friendly, hands-on tour of the GitHub Copilot app. The lab covers installation, a complete `space-quiz` workflow, pull request review, automations, and Canvas extensions.

## Run locally

The site has no build step or runtime dependencies. Serve the repository root with any static file server:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploy

The `Deploy to GitHub Pages` workflow publishes the repository root whenever changes are pushed to `main`. Enable **GitHub Actions** as the Pages source in the repository settings.

## Source

Lab content is adapted from the [NDC Oslo Copilot Workshop](https://github.com/jamesmontemagno/ndc-oslo-copilot-workshop) and its [Copilot Workshops](https://github.com/github-samples/copilot-workshops) source.
