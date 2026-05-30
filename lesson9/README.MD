# TypeScript Best Practices

This README summarizes recommended TypeScript development practices for clean, safe, and maintainable code.

## 1. Project Setup

- Use `tsconfig.json` for compiler options.
- Enable strict mode:
  - `"strict": true`
  - `"noImplicitAny": true`
  - `"strictNullChecks": true`
  - `"noUnusedLocals": true`
  - `"noUnusedParameters": true`
- Keep target and module settings consistent with your runtime environment.

## 2. Code Style and Linting

- Use ESLint with TypeScript support.
- Keep a consistent formatter such as Prettier.
- Enforce rules for imports, spacing, and code structure.

## 3. Type Safety

- Prefer explicit types for public APIs and function return values.
- Use type aliases and interfaces for object shapes.
- Avoid `any` unless absolutely necessary.
- Use union types, discriminated unions, and `readonly` where appropriate.

## 4. Functions and Modules

- Prefer small, single-purpose functions.
- Use named exports for clarity.
- Keep module boundaries clean and imports organized.

## 5. Error Handling

- Avoid silent failures.
- Use `try/catch` only where recovery is possible.
- Use `unknown` for external input and narrow types before use.

## 6. Testing

- Write unit tests for critical logic.
- Prefer type-safe test frameworks or helpers.
- Keep tests isolated and deterministic.

## 7. Documentation

- Document public types and interfaces with comments.
- Keep README and package documentation up to date.

## 8. Useful Practices

- Use `const` by default, `let` only when mutation is required.
- Prefer array and object destructuring for clarity.
- Avoid deeply nested logic and overuse of type assertions.
- Leverage TypeScript’s type inference without losing readability.

## Resources

- TypeScript Handbook: https://www.typescriptlang.org/docs/
- ESLint TypeScript plugin: https://typescript-eslint.io/
- Prettier: https://prettier.io/
