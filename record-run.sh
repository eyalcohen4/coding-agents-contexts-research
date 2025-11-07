#!/bin/bash
# Helper script template for recording experiment runs
# Usage: ./record-run.sh <repo> <tool> <case> <timestamp>

REPO=$1
TOOL=$2
CASE=$3
TIMESTAMP=$4

if [ -z "$TIMESTAMP" ]; then
  TIMESTAMP=$(date +%Y%m%d-%H%M%S)
fi

RUN_DIR="trial-logs/run-${REPO}-${TOOL}-case${CASE}-${TIMESTAMP}"
mkdir -p "$RUN_DIR"

echo "Recording run: $RUN_DIR"
echo "Repo: $REPO"
echo "Tool: $TOOL"
echo "Case: $CASE"
echo "Timestamp: $TIMESTAMP"

# Copy prompt
cp "trial-logs/prompts.md" "$RUN_DIR/prompt.txt"

# Run lint and save output
cd "$REPO" || exit
pnpm lint > "../$RUN_DIR/lint-report.txt" 2>&1
LINT_EXIT=$?

# Run tests and save output
pnpm test > "../$RUN_DIR/test-report.txt" 2>&1
TEST_EXIT=$?

cd ..

# Create notes template
cat > "$RUN_DIR/notes.md" <<EOF
# Run Notes

## Metrics
- Time to completion: ___ minutes
- Agent turns: ___
- Human edits (LOC): ___
- First try pass: Y/N
- Style fit (0-3): ___

## Observations
- 
- 
- 

## Issues Encountered
- 
- 

EOF

echo "Run recorded in: $RUN_DIR"
echo "Lint exit code: $LINT_EXIT"
echo "Test exit code: $TEST_EXIT"

