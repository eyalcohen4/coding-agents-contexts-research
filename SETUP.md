# Experiment Setup Complete

## Structure Verification

✅ **Repo A (With Docs)**
- `/docs` directory with architecture, ADR, and error guides
- `.cursor/rules/app.md` with coding rules
- All source files, tests, and configuration

✅ **Repo B (No Docs)**
- Identical code structure
- No `/docs` or `.cursor` directories
- Same tests and configuration

✅ **Test Files**
- `optimistic.spec.tsx` - Tests optimistic add with rollback
- `errors.spec.tsx` - Tests error mapping and toast display

✅ **Trial Logs**
- `results.csv` - Template for recording results
- `prompts.md` - Exact prompts to use
- `README.md` - Logging instructions

## Installation

**Important:** Due to a known issue with `rollup`'s optional postinstall script, install dependencies with the `--ignore-scripts` flag:

```bash
cd repo-a  # or repo-b
pnpm install --ignore-scripts
```

This is safe - the failing script is optional and doesn't affect functionality. All packages will work correctly.

## Next Steps

1. **Install dependencies** in both repos:
   ```bash
   cd repo-a && pnpm install --ignore-scripts
   cd ../repo-b && pnpm install --ignore-scripts
   ```

2. **Verify setup**:
   ```bash
   cd repo-a && pnpm ci  # Should pass (tests will fail until features are implemented)
   ```

3. **Run experiments**:
   - Use prompts from `trial-logs/prompts.md`
   - Record results in `trial-logs/results.csv`
   - Create individual run logs in `trial-logs/run-*/`

## Important Notes

- Tests are designed to FAIL initially - agents must implement features to pass them
- Both repos start with identical code
- Only Repo A has documentation to guide implementation
- Use exact prompts - no modifications or hints

## Test Expectations

**Use Case 1 (Optimistic Add)**: Tests expect:
- Add todo form with input and button
- Optimistic UI update (todo appears immediately)
- Rollback on server 500 error
- Error toast shown after rollback

**Use Case 2 (Error Mapping)**: Tests expect:
- All fetch errors mapped through `src/lib/errors.ts`
- Toast notifications for errors
- No raw server error messages shown to users

