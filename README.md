# Thisval

Type-safe tests for your TypeScript types.

This is useful when working with complex, evolving type systems (for example API clients with generics, scopes, and conditional fields). It lets you assert type behavior directly in code and catch regressions early.

## What it does

- Checks that objects have exactly the keys you expect
- Verifies optional vs required properties
- Asserts inferred types
- Helps validate complex generic outputs

## Usage

Run TypeScript in type-check mode:

`tsc --noEmit ./tests.ts --ignoreConfig`

If a type assertion fails, TypeScript will report an error.

## Examples

Check out: [`examples.ts`](./examples.ts)
