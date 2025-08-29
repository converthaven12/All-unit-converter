// Route generation and related converter utilities

import type { Unit } from "./types"
import { globalRegistry } from "./core"

export interface ConverterRoute {
  slug: string
  fromUnit: string
  toUnit: string
  category: string
  title: string
  isReverse?: boolean
}

export interface CommonExample {
  from: number
  to: number
  fromFormatted: string
  toFormatted: string
}

// Popular converter pairs by category
const POPULAR_CONVERTERS: Record<string, Array<[string, string]>> = {
  length: [
    ["meter", "foot"],
    ["centimeter", "inch"],
    ["kilometer", "mile"],
    ["inch", "centimeter"],
    ["foot", "meter"],
    ["mile", "kilometer"],
    ["yard", "meter"],
    ["millimeter", "inch"],
  ],
  mass: [
    ["kilogram", "pound"],
    ["gram", "ounce"],
    ["pound", "kilogram"],
    ["ounce", "gram"],
    ["ton-metric", "ton-us"],
    ["stone", "kilogram"],
  ],
  temperature: [
    ["celsius", "fahrenheit"],
    ["fahrenheit", "celsius"],
    ["kelvin", "celsius"],
    ["celsius", "kelvin"],
  ],
  volume: [
    ["liter", "gallon-us"],
    ["gallon-us", "liter"],
    ["milliliter", "fluid-ounce-us"],
    ["cup-us", "milliliter"],
  ],
  area: [
    ["square-meter", "square-foot"],
    ["square-foot", "square-meter"],
    ["hectare", "acre"],
    ["acre", "hectare"],
  ],
  speed: [
    ["kilometer-per-hour", "mile-per-hour"],
    ["mile-per-hour", "kilometer-per-hour"],
    ["meter-per-second", "foot-per-second"],
  ],
  energy: [
    ["joule", "calorie"],
    ["kilowatt-hour", "btu"],
    ["calorie", "joule"],
  ],
  power: [
    ["watt", "horsepower"],
    ["horsepower", "watt"],
    ["kilowatt", "horsepower"],
  ],
  data: [
    ["byte", "bit"],
    ["kilobyte", "kibibyte"],
    ["megabyte", "mebibyte"],
    ["gigabyte", "gibibyte"],
  ],
}

export function createSlug(fromUnit: string, toUnit: string): string {
  const from = globalRegistry.getUnit(fromUnit)
  const to = globalRegistry.getUnit(toUnit)

  if (!from || !to) {
    throw new Error(`Cannot create slug for unknown units: ${fromUnit} -> ${toUnit}`)
  }

  // Use labels for slug generation, convert to kebab-case
  const fromSlug = from.label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  const toSlug = to.label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

  return `${fromSlug}-to-${toSlug}`
}

export function parseSlug(slug: string): { fromUnit: string; toUnit: string } | null {
  const match = slug.match(/^(.+)-to-(.+)$/)
  if (!match) return null

  const [, fromSlug, toSlug] = match

  // Find units by matching slugified labels and aliases
  const allUnits = globalRegistry.getAllUnits()

  const fromUnit = allUnits.find((unit) => {
    const unitSlug = unit.label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
    if (unitSlug === fromSlug) return true

    if (unit.aliases) {
      return unit.aliases.some((alias) => {
        const aliasSlug = alias
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
        return aliasSlug === fromSlug
      })
    }

    return false
  })

  const toUnit = allUnits.find((unit) => {
    const unitSlug = unit.label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
    if (unitSlug === toSlug) return true

    if (unit.aliases) {
      return unit.aliases.some((alias) => {
        const aliasSlug = alias
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
        return aliasSlug === toSlug
      })
    }

    return false
  })

  if (!fromUnit || !toUnit) return null

  return {
    fromUnit: fromUnit.key,
    toUnit: toUnit.key,
  }
}

export function buildConverterTitle(fromUnit: string, toUnit: string): string {
  const from = globalRegistry.getUnit(fromUnit)
  const to = globalRegistry.getUnit(toUnit)

  if (!from || !to) {
    return "Unit Converter"
  }

  // Capitalize first letter of each unit label
  const fromLabel = from.label.charAt(0).toUpperCase() + from.label.slice(1)
  const toLabel = to.label.charAt(0).toUpperCase() + to.label.slice(1)

  return `${fromLabel} to ${toLabel} Converter (${from.symbol} → ${to.symbol})`
}

export function generateCommonExamples(fromUnit: string, toUnit: string, count = 15): CommonExample[] {
  const from = globalRegistry.getUnit(fromUnit)
  const to = globalRegistry.getUnit(toUnit)

  if (!from || !to) return []

  // Define common value ranges by category
  const ranges: Record<string, number[]> = {
    length: [0.1, 0.5, 1, 2, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
    mass: [0.1, 0.25, 0.5, 1, 2.5, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000],
    temperature: [-40, -20, 0, 10, 20, 25, 30, 37, 50, 75, 100, 150, 200, 300, 500],
    volume: [0.1, 0.25, 0.5, 1, 2, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000],
    area: [1, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000],
    speed: [1, 5, 10, 25, 50, 75, 100, 150, 200, 300, 500, 750, 1000, 1500, 2000],
    energy: [1, 10, 100, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000, 2500000],
    power: [1, 10, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000],
    data: [1, 8, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144],
  }

  const values = ranges[from.category] || ranges.length
  const selectedValues = values.slice(0, count)

  return selectedValues.map((value) => {
    try {
      // Use the conversion engine to get the actual converted value
      const { conversionEngine } = require("./core")
      const result = conversionEngine.convert(value, fromUnit, toUnit)

      return {
        from: value,
        to: result.value,
        fromFormatted: formatNumber(value),
        toFormatted: formatNumber(result.value),
      }
    } catch {
      return {
        from: value,
        to: 0,
        fromFormatted: formatNumber(value),
        toFormatted: "Error",
      }
    }
  })
}

function formatNumber(value: number): string {
  if (Math.abs(value) >= 1000000) {
    return value.toExponential(3)
  }
  if (Math.abs(value) >= 1000) {
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }
  if (Math.abs(value) >= 1) {
    return value.toFixed(Math.abs(value) >= 10 ? 1 : 2)
  }
  if (Math.abs(value) >= 0.01) {
    return value.toFixed(4)
  }
  return value.toExponential(3)
}

export function getRelatedConverters(fromUnit: string, toUnit: string, limit = 6): ConverterRoute[] {
  const from = globalRegistry.getUnit(fromUnit)
  const to = globalRegistry.getUnit(toUnit)

  if (!from || !to) return []

  const related: ConverterRoute[] = []

  // Add reverse converter
  related.push({
    slug: createSlug(toUnit, fromUnit),
    fromUnit: toUnit,
    toUnit: fromUnit,
    category: to.category,
    title: buildConverterTitle(toUnit, fromUnit),
    isReverse: true,
  })

  // Add popular converters from the same category
  const popular = POPULAR_CONVERTERS[from.category] || []
  for (const [popFrom, popTo] of popular) {
    if (related.length >= limit) break
    if (popFrom === fromUnit && popTo === toUnit) continue
    if (popFrom === toUnit && popTo === fromUnit) continue

    const popFromUnit = globalRegistry.getUnit(popFrom)
    const popToUnit = globalRegistry.getUnit(popTo)

    if (popFromUnit && popToUnit) {
      related.push({
        slug: createSlug(popFrom, popTo),
        fromUnit: popFrom,
        toUnit: popTo,
        category: popFromUnit.category,
        title: buildConverterTitle(popFrom, popTo),
      })
    }
  }

  // Fill remaining slots with other units from the same category
  if (related.length < limit) {
    const categoryUnits = globalRegistry.getUnitsByCategory(from.category)
    for (const unit of categoryUnits) {
      if (related.length >= limit) break
      if (unit.key === fromUnit || unit.key === toUnit) continue

      // Check if we already have this combination
      const exists = related.some(
        (r) => (r.fromUnit === fromUnit && r.toUnit === unit.key) || (r.fromUnit === unit.key && r.toUnit === fromUnit),
      )

      if (!exists) {
        related.push({
          slug: createSlug(fromUnit, unit.key),
          fromUnit: fromUnit,
          toUnit: unit.key,
          category: from.category,
          title: buildConverterTitle(fromUnit, unit.key),
        })
      }
    }
  }

  return related.slice(0, limit)
}

export function getAllConverterRoutes(): ConverterRoute[] {
  const routes: ConverterRoute[] = []

  // Generate routes for all popular converters
  for (const [category, pairs] of Object.entries(POPULAR_CONVERTERS)) {
    for (const [fromUnit, toUnit] of pairs) {
      const from = globalRegistry.getUnit(fromUnit)
      const to = globalRegistry.getUnit(toUnit)

      if (from && to) {
        routes.push({
          slug: createSlug(fromUnit, toUnit),
          fromUnit,
          toUnit,
          category,
          title: buildConverterTitle(fromUnit, toUnit),
        })
      }
    }
  }

  return routes
}

export function getPopularConverters(limit = 20): ConverterRoute[] {
  const routes = getAllConverterRoutes()
  return routes.slice(0, limit)
}

export function getAllUnitsByCategory(): Record<string, Unit[]> {
  const result: Record<string, Unit[]> = {}
  const allUnits = globalRegistry.getAllUnits()

  for (const unit of allUnits) {
    if (!result[unit.category]) {
      result[unit.category] = []
    }
    result[unit.category].push(unit)
  }

  return result
}
