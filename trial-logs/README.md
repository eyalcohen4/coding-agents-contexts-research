# Trial Logs

This directory contains logs and results from each experimental run.

## Structure

- `results.csv` - Compiled results from all runs
- `run-{repo}-{tool}-{case}-{timestamp}/` - Individual run logs

## Recording a Run

For each run, create a directory with:
- `prompt.txt` - The exact prompt used
- `time.log` - Timestamped log of the session
- `lint-report.txt` - Output from `pnpm lint`
- `test-report.xml` - Output from `pnpm test`
- `diff.patch` - Git diff of changes made
- `notes.md` - Brief notes about the run

