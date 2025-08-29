// Core conversion engine with dimension analysis

import type { Unit, UnitExpression, ConversionResult } from "./types"
import { dimensionsEqual, ZERO_DIMENSION, multiplyDimensions, powerDimension } from "./dimensions"
import { extractPrefix } from "./prefixes"

export class ConversionError extends Error {
  constructor(
    message: string,
    public code?: string,
  ) {
    super(message)
    this.name = "ConversionError"
  }
}

export class UnitRegistry {
  private units = new Map<string, Unit>()
  private symbolToKey = new Map<string, string>()
  private aliasToKey = new Map<string, string>()

  registerUnit(unit: Unit): void {
    this.units.set(unit.key, unit)
    this.symbolToKey.set(unit.symbol.toLowerCase(), unit.key)

    // Register aliases
    if (unit.aliases) {
      for (const alias of unit.aliases) {
        this.aliasToKey.set(alias.toLowerCase(), unit.key)
      }
    }
  }

  getUnit(keyOrSymbol: string): Unit | undefined {
    // Try direct key lookup first
    const unit = this.units.get(keyOrSymbol)
    if (unit) return unit

    // Try symbol lookup
    const key = this.symbolToKey.get(keyOrSymbol.toLowerCase())
    if (key) return this.units.get(key)

    // Try alias lookup
    const aliasKey = this.aliasToKey.get(keyOrSymbol.toLowerCase())
    if (aliasKey) return this.units.get(aliasKey)

    // Try with prefix extraction
    const { prefix, baseSymbol } = extractPrefix(keyOrSymbol)
    if (prefix) {
      const baseUnit = this.getUnit(baseSymbol)
      if (baseUnit && this.canHavePrefix(baseUnit)) {
        return this.createPrefixedUnit(baseUnit, prefix)
      }
    }

    return undefined
  }

  private canHavePrefix(unit: Unit): boolean {
    // Most SI units can have prefixes, but some exceptions exist
    const noPrefixUnits = ["°C", "°F", "K", "°R"] // Temperature units
    return !noPrefixUnits.includes(unit.symbol)
  }

  private createPrefixedUnit(baseUnit: Unit, prefix: { symbol: string; factor: number }): Unit {
    return {
      ...baseUnit,
      key: `${prefix.symbol}${baseUnit.key}`,
      label: `${prefix.symbol}${baseUnit.label}`,
      symbol: `${prefix.symbol}${baseUnit.symbol}`,
      factorToBase: baseUnit.factorToBase * prefix.factor,
    }
  }

  getAllUnits(): Unit[] {
    return Array.from(this.units.values())
  }

  getUnitsByCategory(category: string): Unit[] {
    return Array.from(this.units.values()).filter((unit) => unit.category === category)
  }
}

export class ConversionEngine {
  constructor(private registry: UnitRegistry) {}

  parseUnitExpression(expression: string): UnitExpression {
    // Handle simple cases first
    const unit = this.registry.getUnit(expression)
    if (unit) {
      return {
        units: [{ unit, exponent: 1 }],
        dimension: unit.dimension,
      }
    }

    // Parse compound expressions like "m/s", "kg·m/s²", "N·m"
    return this.parseCompoundExpression(expression)
  }

  private parseCompoundExpression(expression: string): UnitExpression {
    // This is a simplified parser - in production, you'd want a more robust one
    // Handle division first (split by '/')
    const parts = expression.split("/")
    if (parts.length > 2) {
      throw new ConversionError(`Complex expressions with multiple divisions not supported: ${expression}`)
    }

    const numeratorUnits = this.parseMultiplication(parts[0])
    const denominatorUnits = parts.length > 1 ? this.parseMultiplication(parts[1]) : []

    // Combine numerator and denominator
    const allUnits = [...numeratorUnits, ...denominatorUnits.map((u) => ({ ...u, exponent: -u.exponent }))]

    // Calculate combined dimension
    let dimension = ZERO_DIMENSION
    for (const { unit, exponent } of allUnits) {
      const unitDim = powerDimension(unit.dimension, exponent)
      dimension = multiplyDimensions(dimension, unitDim)
    }

    return { units: allUnits, dimension }
  }

  private parseMultiplication(expression: string): Array<{ unit: Unit; exponent: number }> {
    // Split by multiplication operators (·, *, space)
    const parts = expression.split(/[·*\s]+/).filter((p) => p.trim())
    const units: Array<{ unit: Unit; exponent: number }> = []

    for (const part of parts) {
      // Handle exponents (e.g., "m²", "s^2", "s^-1")
      const { unitSymbol, exponent } = this.parseExponent(part)
      const unit = this.registry.getUnit(unitSymbol)

      if (!unit) {
        throw new ConversionError(`Unknown unit: ${unitSymbol}`)
      }

      units.push({ unit, exponent })
    }

    return units
  }

  private parseExponent(part: string): { unitSymbol: string; exponent: number } {
    // Handle superscript numbers
    const superscriptMap: { [key: string]: string } = {
      "⁰": "0",
      "¹": "1",
      "²": "2",
      "³": "3",
      "⁴": "4",
      "⁵": "5",
      "⁶": "6",
      "⁷": "7",
      "⁸": "8",
      "⁹": "9",
      "⁻": "-",
    }

    let normalized = part
    for (const [sup, normal] of Object.entries(superscriptMap)) {
      normalized = normalized.replace(new RegExp(sup, "g"), normal)
    }

    // Handle ^notation
    const caretMatch = normalized.match(/^(.+)\^(-?\d+)$/)
    if (caretMatch) {
      return {
        unitSymbol: caretMatch[1],
        exponent: Number.parseInt(caretMatch[2]),
      }
    }

    // Handle superscript at end
    const supMatch = normalized.match(/^(.+?)(-?\d+)$/)
    if (supMatch && part !== normalized) {
      // Only if we actually had superscripts
      return {
        unitSymbol: supMatch[1],
        exponent: Number.parseInt(supMatch[2]),
      }
    }

    return { unitSymbol: part, exponent: 1 }
  }

  toBase(value: number, unitExpression: string): number {
    const expr = this.parseUnitExpression(unitExpression)

    let result = value
    for (const { unit, exponent } of expr.units) {
      if (exponent > 0) {
        // Apply offset first (for temperature), then factor
        if (unit.offsetToBase !== undefined) {
          result += unit.offsetToBase
        }
        result *= Math.pow(unit.factorToBase, exponent)
      } else {
        // For negative exponents, divide by factor, then subtract offset
        result /= Math.pow(unit.factorToBase, -exponent)
        if (unit.offsetToBase !== undefined) {
          result -= unit.offsetToBase
        }
      }
    }

    return result
  }

  fromBase(value: number, unitExpression: string): number {
    const expr = this.parseUnitExpression(unitExpression)

    let result = value
    for (const { unit, exponent } of expr.units) {
      if (exponent > 0) {
        // Divide by factor first, then subtract offset
        result /= Math.pow(unit.factorToBase, exponent)
        if (unit.offsetToBase !== undefined) {
          result -= unit.offsetToBase
        }
      } else {
        // For negative exponents, add offset first, then multiply
        if (unit.offsetToBase !== undefined) {
          result += unit.offsetToBase
        }
        result *= Math.pow(unit.factorToBase, -exponent)
      }
    }

    return result
  }

  convert(value: number, fromExpression: string, toExpression: string): ConversionResult {
    try {
      const fromExpr = this.parseUnitExpression(fromExpression)
      const toExpr = this.parseUnitExpression(toExpression)

      // Check dimension compatibility
      if (!dimensionsEqual(fromExpr.dimension, toExpr.dimension)) {
        throw new ConversionError(
          `Cannot convert between incompatible dimensions: ${fromExpression} and ${toExpression}`,
          "DIMENSION_MISMATCH",
        )
      }

      // Convert via base units
      const baseValue = this.toBase(value, fromExpression)
      const result = this.fromBase(baseValue, toExpression)

      return {
        value: result,
        fromUnit: fromExpression,
        toUnit: toExpression,
        formula: this.generateFormula(fromExpression, toExpression),
      }
    } catch (error) {
      if (error instanceof ConversionError) {
        throw error
      }
      throw new ConversionError(`Conversion failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  private generateFormula(from: string, to: string): string {
    try {
      const testResult = this.convert(1, from, to)
      const factor = testResult.value

      if (Math.abs(factor - 1) < 1e-10) {
        return `1 ${from} = 1 ${to}`
      } else if (factor > 1) {
        return `1 ${from} = ${factor} ${to}`
      } else {
        return `1 ${from} = ${factor} ${to}`
      }
    } catch {
      return `1 ${from} = ? ${to}`
    }
  }
}

// Global registry instance
export const globalRegistry = new UnitRegistry()
export const conversionEngine = new ConversionEngine(globalRegistry)
