export type LinearRule = { factor: number; offset?: number } // offset defaults to 0

export function convertLinear(value: number, rule: LinearRule): number {
  const o = rule.offset ?? 0
  return value * rule.factor + o
}

export function formatNumber(n: number, maxDecimals = 4): string {
  // Format with up to maxDecimals, trim trailing zeros, keep thousands separators
  const formatted = n.toFixed(maxDecimals)
  const trimmed = formatted.replace(/\.?0+$/, "")
  const num = Number.parseFloat(trimmed)
  return num.toLocaleString("en-US", { maximumFractionDigits: maxDecimals })
}
