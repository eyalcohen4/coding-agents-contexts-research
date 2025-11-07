# Error Handling Guide

## Rules

1. **Never show raw server errors** - All errors must be mapped through `src/lib/errors.ts`

2. **Use error map** - The error map in `src/lib/errors.ts` maps error codes/messages to user-friendly text

3. **Show toast on error** - After mapping, show a toast notification to the user

4. **Rollback on failure** - For optimistic updates, always rollback on server error

## Example

```typescript
import { mapError, showErrorToast } from './lib/errors'

try {
  await apiCall()
} catch (error) {
  const userMessage = mapError(error)
  showErrorToast(userMessage)
}
```

## Error Map Structure

The error map in `src/lib/errors.ts` should map:
- HTTP status codes → user messages
- Error message patterns → user messages
- Default fallback for unknown errors

