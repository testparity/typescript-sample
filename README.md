<p align="center">
  <img src="https://testparity.com/brand/testparity-readme-banner.jpg" alt="TestParity" width="100%">
</p>

# TypeScript Sample

[![Parity Sample](https://github.com/testparity/typescript-sample/actions/workflows/parity.yml/badge.svg)](https://github.com/testparity/typescript-sample/actions/workflows/parity.yml)

This repository is an end-to-end Parity demo for TypeScript and Node's native test runner. It runs the real `node:test` suite through `tsx`, generates one Clover report per test file, and lets Parity prove which test owns each utility.

## What this sample proves

`formatCurrency.ts` reaches 80% when every test is combined, but `formatCurrency.test.ts` owns only 44%. `discount.test.ts` supplies the other coverage by using currency helpers inside its own scenario.

| Source file | Belonging test | All tests | Belonging test | Attribution |
| --- | --- | ---: | ---: | ---: |
| `src/formatCurrency.ts` | `tests/formatCurrency.test.ts` | 80% | 44% | `2|1` |
| `src/discount.ts` | `tests/discount.test.ts` | 100% | 100% | `1|0` |
| Project total | - | 81.48% | - | - |

`coverage-attribution` uses `total covering tests|non-matching covering tests`. The `2|1` result exposes cross-test coverage that a normal aggregate percentage cannot.

## How the proof works

The matching currency test calls `formatCurrency` and `dollarsToCents`. The discount test also calls `addTax` and `applyFee`, while `clampCents` remains intentionally uncovered. `parity test` invokes each test file separately under `c8`, writes `.parity/per-test`, and runs `parity check` automatically.

## Run locally

Requirements: Node.js 24+, PHP 8.4+, and Composer.

```bash
npm ci
npm test
npm run typecheck
composer global require testparity/parity:^1.2
```

Generate fresh per-test evidence and check it:

```bash
parity test --config=parity.yaml --format=json
```

To inspect the same generated reports without rerunning Node:

```bash
parity check --config=parity.yaml --format=json
```

The expected result is `passed = true`, `global_coverage = 81.48`, and the file-level values shown above. No coverage fixture is committed.

## CI

GitHub Actions installs locked npm dependencies, runs the complete Node test suite, installs public `testparity/parity:^1.2`, and executes `parity test`. The generated `.parity/per-test` directory and JSON result are uploaded as the `parity-per-test-evidence` artifact for 14 days. No private token is required.
