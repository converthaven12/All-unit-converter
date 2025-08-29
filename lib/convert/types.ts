// Core type definitions for the unit conversion system

export interface DimensionVector {
  L: number // Length
  M: number // Mass
  T: number // Time
  I: number // Electric current
  Θ: number // Temperature
  N: number // Amount of substance
  J: number // Luminous intensity
  A: number // Angle (supplementary)
}

export interface Unit {
  key: string
  label: string
  symbol: string
  dimension: DimensionVector
  factorToBase: number
  offsetToBase?: number // For temperature conversions
  system?: "SI" | "US" | "UK" | "Imperial" | "Metric"
  category: string
  aliases?: string[]
}

export interface Prefix {
  symbol: string
  name: string
  factor: number
}

export interface UnitExpression {
  units: Array<{
    unit: Unit
    exponent: number
  }>
  dimension: DimensionVector
}

export interface ConversionResult {
  value: number
  fromUnit: string
  toUnit: string
  formula?: string
}

export interface Category {
  key: string
  name: string
  description: string
  icon?: string
  units: string[]
}
