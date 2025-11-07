# Quick Start Checklist

## Pre-Experiment Setup ✅
- [ ] Both repos installed (`pnpm install --ignore-scripts`)
- [ ] Both repos build successfully (`pnpm build`)
- [ ] Tests currently fail (expected - features not implemented)
- [ ] Prompts ready in `trial-logs/prompts.md`

## For Each Run

### Before
- [ ] Choose: Repo (A/B), Tool (Cursor/Claude), Case (1/2)
- [ ] Start fresh chat/conversation
- [ ] Navigate to repo directory
- [ ] Start timer

### During
- [ ] Paste exact prompt (no modifications)
- [ ] Count agent turns (prompt/response pairs)
- [ ] Track any manual edits (lines changed)
- [ ] Note observations

### After
- [ ] Run `pnpm ci` to verify
- [ ] Record metrics:
  - [ ] Time (minutes)
  - [ ] Agent turns
  - [ ] Human edits (LOC)
  - [ ] First try pass (Y/N)
  - [ ] Style fit (0-3)
  - [ ] Lint pass (Y/N)
  - [ ] Tests pass (Y/N)
- [ ] Save results to `trial-logs/results.csv`
- [ ] Create run log directory with outputs

## Experiment Matrix

| Run | Repo | Tool | Case | Status |
|-----|------|------|------|--------|
| 1 | A | Cursor | 1 | ⬜ |
| 2 | B | Cursor | 1 | ⬜ |
| 3 | A | Claude | 1 | ⬜ |
| 4 | B | Claude | 1 | ⬜ |
| 5 | A | Cursor | 2 | ⬜ |
| 6 | B | Cursor | 2 | ⬜ |
| 7 | A | Claude | 2 | ⬜ |
| 8 | B | Claude | 2 | ⬜ |

## Success Criteria

**Task Win** = All of:
- ✅ Lint passes (`pnpm lint`)
- ✅ Tests pass (`pnpm test`)
- ✅ Features work as expected

**Style Fit** (0-3):
- 3 = Perfectly follows docs/patterns
- 2 = Mostly follows, minor deviations
- 1 = Somewhat follows, notable deviations
- 0 = Doesn't follow docs/patterns

