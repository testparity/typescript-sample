export function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100)
}

export function addTax(cents: number, taxRate: number): number {
  const multiplier = 1 + taxRate
  const total = cents * multiplier
  return Math.round(total)
}

export function applyFee(cents: number, fee: number): number {
  const total = cents + fee
  const rounded = Math.round(total)
  return rounded
}

export function clampCents(cents: number): number {
  if (!Number.isFinite(cents)) {
    return 0
  }

  return Math.max(0, Math.min(Number.MAX_SAFE_INTEGER, Math.round(cents)))
}
