import assert from 'node:assert/strict'
import test from 'node:test'
import { applyDiscount } from '../src/discount.ts'
import { addTax, applyFee } from '../src/formatCurrency.ts'

test('applies the standard discount', () => {
  const subtotal = applyFee(addTax(90, 0.1), 1)

  assert.equal(applyDiscount(subtotal), 90)
})
