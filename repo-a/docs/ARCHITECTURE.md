# Architecture

## Overview

This is a React Todo app using Vite, TypeScript, and React Query.

## Key Patterns

### Optimistic Updates

- Always use React Query's `useMutation` with `onMutate` for optimistic updates
- Rollback on error using `onError` and `queryClient.setQueryData`
- Show error toast after rollback completes

### Error Handling

- All API errors must be mapped through `src/lib/errors.ts`
- Never show raw server error messages to users
- Use toast notifications for user-facing errors
- Error mapping is centralized in the error map

### API Layer

- All API calls go through `src/api.ts`
- Use React Query hooks (`useQuery`, `useMutation`)
- Handle errors at the API boundary, not in components

## File Structure

```
src/
  App.tsx          # Main component
  api.ts           # API functions
  lib/
    errors.ts      # Error mapping and toast utilities
```

