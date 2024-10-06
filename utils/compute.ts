export function roundUp(price: number): number {
  return Math.round((price + Number.EPSILON) * 100) / 100
}
