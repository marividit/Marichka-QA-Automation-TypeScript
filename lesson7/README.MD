# Lesson 7 — JavaScript & TypeScript Best Practices

This repository contains a small TypeScript lesson project with a focus on clean code, editor tooling, and modern TypeScript conventions.

## Project Overview

- `type`: `commonjs`
- Source files live in `src/`
- TypeScript compiles to `dist/out-tsc`
- Uses ESLint, Prettier, and TypeScript tooling for consistent style and quality

## Prerequisites

- Node.js 18+ or later
- npm 10+ / yarn 1+ / pnpm 8+

## Installation

```bash
npm install
```

## Recommended Scripts

Currently the package has a placeholder test script. Add your own scripts for build, lint, or test as needed.

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

## Running TypeScript

This repository is configured for TypeScript development and can be run with tools like `ts-node` or `tsx`.

Example:

```bash
npx tsx src/index.ts
```

## Project Structure

- `src/` — source TypeScript files
- `dist/out-tsc/` — compiled output
- `tsconfig.json` — TypeScript compiler options
- `package.json` — dependency, script, and package metadata
- `eslint.config.mjs` — ESLint configuration
- `prettierrc` — Prettier formatting rules

## TypeScript Conventions

- Enable `strict` mode for better type safety
- Prefer explicit return types on exported functions
- Use `readonly` for immutable objects where appropriate
- Keep `tsconfig.json` `noImplicitAny` false only if you need to migrate existing JS gradually, but prefer adding explicit types
- Use `esModuleInterop` and `module` set to `ESNext` for compatibility with modern tooling
- Keep `rootDir` and `outDir` aligned with source and build output paths

## JavaScript Conventions

- Prefer `const` for values that do not change and `let` only when mutation is required
- Use descriptive variable and function names
- Keep functions small and single-purpose
- Favor early returns to reduce nested conditionals
- Use template literals for string interpolation
- Use object destructuring and spread syntax for cleaner expressions

## Formatting and Linting

This project uses:

- ESLint for static analysis
- Prettier for formatting
- `@stylistic/eslint-plugin` and `@stylistic/eslint-plugin-ts` for opinionated style rules
- `eslint-plugin-unicorn` for additional best-practice rules

Add lint and format scripts once you define the config in `eslint.config.mjs`:

```bash
npx eslint "src/**/*.{js,ts}"
npx prettier --check "src/**/*.{js,ts,json,md}"
```

## Best Practices

- Keep the dependency list minimal and only install packages you need
- Add tests and type-safe assertions as the project grows
- Commit formatted code and enforce lint rules in pre-commit hooks if possible
- Keep `README.MD` updated with setup commands and repository conventions

## Notes

- `tsconfig.json` includes DOM and ES2020 libs to support browser-like APIs and modern syntax
- The package currently does not define a build or test workflow; add those scripts for production-ready projects

