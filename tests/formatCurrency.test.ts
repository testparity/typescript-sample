import assert from 'node:assert/strict'
import test from 'node:test'
import { dollarsToCents, formatCurrency } from '../src/formatCurrency.ts'

test('covers the core currency operations', () => {
  assert.equal(formatCurrency(1234), '$12.34')
  assert.equal(dollarsToCents(12.34), 1234)
})
