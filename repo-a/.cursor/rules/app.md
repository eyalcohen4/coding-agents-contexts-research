# App Rules

## Optimistic Updates

When adding/updating data:
1. Use `useMutation` with `onMutate` to optimistically update the cache
2. If server returns error, use `onError` to rollback the optimistic update
3. After rollback, show error toast using our error mapping

## Error Handling

- All fetch errors must go through error map in `src/lib/errors.ts`
- Never show raw server error messages
- Always use toast notifications for errors

## Code Style

- Use TypeScript strict mode
- Follow existing patterns in the codebase
- Check docs before implementing new features

