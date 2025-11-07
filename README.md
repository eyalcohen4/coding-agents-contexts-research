# AI Coding Agent Context Test

## Overview

This repository contains two identical React apps (Repo A and Repo B) used to test how in-repo documentation affects AI coding agent performance.

## Quick Start

1. Choose a repo (A or B)
2. Install dependencies (use `--ignore-scripts` to avoid rollup postinstall issue):
   ```bash
   cd repo-a  # or repo-b
   pnpm install --ignore-scripts
   ```

3. Run tests:
   ```bash
   pnpm test
   ```

4. Run lint:
   ```bash
   pnpm lint
   ```

5. Run CI (lint + test):
   ```bash
   pnpm ci
   ```

## Repository Structure

```
.
├── repo-a/          # With documentation
│   ├── docs/        # Architecture, ADRs, guides
│   ├── .cursor/     # Cursor rules
│   └── src/         # React app source
├── repo-b/          # Without documentation (same code)
│   └── src/         # React app source
└── trial-logs/      # Experiment results and logs
```

## Running Experiments

See [README.md](./README.md) for full experiment details and [trial-logs/prompts.md](./trial-logs/prompts.md) for exact prompts to use.

## Key Differences

- **Repo A**: Contains `/docs` directory and `.cursor/rules/app.md`
- **Repo B**: Identical code, but no documentation files

Both repos have the same:
- Source code
- Dependencies
- Tests
- Linting rules

