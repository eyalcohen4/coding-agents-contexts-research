# ADR-0001: Fetching Strategy

## Status

Accepted

## Context

We need a consistent way to fetch data and handle errors.

## Decision

Use React Query for all data fetching. All errors must be mapped through a centralized error map before showing to users.

## Consequences

- Consistent error handling across the app
- Better UX with mapped error messages
- Easier to maintain error messages in one place

