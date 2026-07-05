export function applyDiscount(subtotal: number, vip = false): number {
  const rate = vip ? 0.2 : 0.1;
  return Number((subtotal * (1 - rate)).toFixed(2));
}
