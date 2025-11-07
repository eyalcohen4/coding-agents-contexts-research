# Experiment Run Guide

## Overview

You'll run **4 experiments per use case** (8 total):
- Repo A (with docs) + Cursor
- Repo A (with docs) + Claude  
- Repo B (no docs) + Cursor
- Repo B (no docs) + Claude

## Before Starting

1. **Verify both repos are clean** (no uncommitted changes):
   ```bash
   cd repo-a && git status  # Should be clean or commit first
   cd ../repo-b && git status
   ```

2. **Ensure dependencies are installed**:
   ```bash
   cd repo-a && pnpm install --ignore-scripts
   cd ../repo-b && pnpm install --ignore-scripts
   ```

## Running an Experiment

### Step 1: Choose Your Run
- **Repo**: A (with docs) or B (no docs)
- **Tool**: Cursor or Claude
- **Case**: 1 (Optimistic Add) or 2 (Error Mapping)

### Step 2: Start Fresh
- **For Cursor**: Open a new chat in Cursor
- **For Claude**: Open a new conversation in Claude
- Navigate to the chosen repo directory

### Step 3: Use Exact Prompt
Copy the prompt from `trial-logs/prompts.md` **exactly as written**:

**Use Case 1:**
```
Add an "Add Todo" form. Use optimistic update per our rules. If server fails, roll back and show our error toast. Files: `src/App.tsx`, `src/api.ts`. Follow docs.
```

**Use Case 2:**
```
Wire error map so all fetch errors show a user toast from our map, not raw messages. Add map use in all calls. Follow docs. Files: `src/lib/errors.ts`, `src/App.tsx`.
```

### Step 4: Track Metrics
As the agent works, record:
- **Time**: Start timer when you paste the prompt
- **Agent Turns**: Count each prompt/response exchange
- **Human Edits**: Track any manual code changes you make (lines changed)
- **First Try Pass**: Did tests pass on first run? (Y/N)
- **Style Fit**: Rate 0-3 how well it followed docs/patterns

### Step 5: Verify Results
After the agent finishes:

```bash
cd repo-a  # or repo-b
pnpm ci  # Runs lint + test
```

Check:
- ✅ **Lint passes**: No ESLint errors
- ✅ **Tests pass**: All tests green
- ✅ **Functionality works**: Features behave correctly

### Step 6: Record Results

**Option A: Use the script**
```bash
./record-run.sh <repo> <tool> <case>
# Example: ./record-run.sh a cursor 1
```

**Option B: Manual recording**
1. Create directory: `trial-logs/run-<repo>-<tool>-case<case>-<timestamp>/`
2. Save:
   - `prompt.txt` - The exact prompt used
   - `lint-report.txt` - Output from `pnpm lint`
   - `test-report.txt` - Output from `pnpm test`
   - `notes.md` - Your observations and metrics
   - `diff.patch` - `git diff > diff.patch` (if using git)

3. Add row to `trial-logs/results.csv`:
```csv
repo,tool,case,win,time_min,agent_turns,human_edits_loc,first_try_pass,style_fit,lint_pass,tests_pass,notes
a,cursor,1,Y,15,8,0,Y,3,Y,Y,"Worked perfectly"
```

## Important Rules

1. **No hints**: Don't provide extra context beyond the prompt
2. **No rewording**: Use prompts exactly as written
3. **Fresh start**: New chat/conversation for each run
4. **Clean slate**: Reset repo to initial state between runs (or use git)

## Recommended Order

Run in this order to minimize bias:
1. Repo A + Cursor + Case 1
2. Repo B + Cursor + Case 1  
3. Repo A + Claude + Case 1
4. Repo B + Claude + Case 1
5. Repo A + Cursor + Case 2
6. Repo B + Cursor + Case 2
7. Repo A + Claude + Case 2
8. Repo B + Claude + Case 2

## Quick Reference

**Prompts**: `trial-logs/prompts.md`  
**Results template**: `trial-logs/results.csv`  
**Recording script**: `./record-run.sh`

## Troubleshooting

- **Tests fail**: This is expected initially - agents must implement features
- **Lint errors**: Agent should fix these, but note if they don't
- **Agent asks questions**: Answer minimally, don't provide extra context
- **Agent goes off-track**: Note this in your observations

