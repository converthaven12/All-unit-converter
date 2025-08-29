import type { Converter } from "./catalog"
import { convertLinear, formatNumber } from "./compute"

export function buildTopRows(def: Converter): Array<[string, string]> {
  // Choose default seeds if def.topValues is missing
  const seeds = def.topValues ?? autoSeedsByCategory(def.categoryId)
  const p = def.precision ?? 4

  return seeds.map((v) => {
    const y = def.compute ? def.compute(v) : convertLinear(v, { factor: def.factor, offset: def.offset })
    return [formatNumber(v, p), formatNumber(y, p)]
  })
}

export function autoSeedsByCategory(catId: string): number[] {
  switch (catId) {
    case "temperature":
      return [-40, -20, 0, 10, 20, 25, 30, 37, 50, 68, 86, 100]
    case "time":
    case "data":
      return [1, 2, 5, 10, 15, 30, 60, 120, 300, 600]
    case "length":
    case "mass":
    case "volume":
    case "speed":
    case "area":
    case "pressure":
    case "energy":
    case "power":
    default:
      return [1, 2, 3, 4, 5, 10, 12, 15, 20, 25, 30, 50, 60, 75, 100]
  }
}
