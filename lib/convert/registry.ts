// Unit registry with predefined units and categories

import type { Unit, Category } from "./types"
import { BASE_DIMENSIONS } from "./dimensions"
import { globalRegistry } from "./core"

// Base SI units
const BASE_UNITS: Unit[] = [
  // Length
  {
    key: "meter",
    label: "meter",
    symbol: "m",
    dimension: BASE_DIMENSIONS.LENGTH,
    factorToBase: 1,
    system: "SI",
    category: "length",
    aliases: ["metre", "meters", "metres"],
  },
  {
    key: "inch",
    label: "inch",
    symbol: "in",
    dimension: BASE_DIMENSIONS.LENGTH,
    factorToBase: 0.0254,
    system: "US",
    category: "length",
    aliases: ["inches", '"'],
  },
  {
    key: "foot",
    label: "foot",
    symbol: "ft",
    dimension: BASE_DIMENSIONS.LENGTH,
    factorToBase: 0.3048,
    system: "US",
    category: "length",
    aliases: ["feet", "'"],
  },
  {
    key: "yard",
    label: "yard",
    symbol: "yd",
    dimension: BASE_DIMENSIONS.LENGTH,
    factorToBase: 0.9144,
    system: "US",
    category: "length",
    aliases: ["yards"],
  },
  {
    key: "mile",
    label: "mile",
    symbol: "mi",
    dimension: BASE_DIMENSIONS.LENGTH,
    factorToBase: 1609.344,
    system: "US",
    category: "length",
    aliases: ["miles"],
  },

  // Mass
  {
    key: "kilogram",
    label: "kilogram",
    symbol: "kg",
    dimension: BASE_DIMENSIONS.MASS,
    factorToBase: 1,
    system: "SI",
    category: "mass",
    aliases: ["kilograms", "kilo", "kilos"],
  },
  {
    key: "gram",
    label: "gram",
    symbol: "g",
    dimension: BASE_DIMENSIONS.MASS,
    factorToBase: 0.001,
    system: "SI",
    category: "mass",
    aliases: ["grams", "gramme", "grammes"],
  },
  {
    key: "pound",
    label: "pound",
    symbol: "lb",
    dimension: BASE_DIMENSIONS.MASS,
    factorToBase: 0.45359237,
    system: "US",
    category: "mass",
    aliases: ["pounds", "lbs", "pound-mass"],
  },
  {
    key: "ounce",
    label: "ounce",
    symbol: "oz",
    dimension: BASE_DIMENSIONS.MASS,
    factorToBase: 0.028349523125,
    system: "US",
    category: "mass",
    aliases: ["ounces"],
  },

  // Temperature
  {
    key: "kelvin",
    label: "kelvin",
    symbol: "K",
    dimension: BASE_DIMENSIONS.TEMPERATURE,
    factorToBase: 1,
    system: "SI",
    category: "temperature",
    aliases: ["kelvins"],
  },
  {
    key: "celsius",
    label: "degree Celsius",
    symbol: "°C",
    dimension: BASE_DIMENSIONS.TEMPERATURE,
    factorToBase: 1,
    offsetToBase: 273.15,
    system: "Metric",
    category: "temperature",
    aliases: ["centigrade", "degrees celsius"],
  },
  {
    key: "fahrenheit",
    label: "degree Fahrenheit",
    symbol: "°F",
    dimension: BASE_DIMENSIONS.TEMPERATURE,
    factorToBase: 5 / 9,
    offsetToBase: (459.67 * 5) / 9,
    system: "US",
    category: "temperature",
    aliases: ["degrees fahrenheit"],
  },

  // Time
  {
    key: "second",
    label: "second",
    symbol: "s",
    dimension: BASE_DIMENSIONS.TIME,
    factorToBase: 1,
    system: "SI",
    category: "time",
    aliases: ["seconds", "sec", "secs"],
  },
  {
    key: "minute",
    label: "minute",
    symbol: "min",
    dimension: BASE_DIMENSIONS.TIME,
    factorToBase: 60,
    category: "time",
    aliases: ["minutes", "mins"],
  },
  {
    key: "hour",
    label: "hour",
    symbol: "h",
    dimension: BASE_DIMENSIONS.TIME,
    factorToBase: 3600,
    category: "time",
    aliases: ["hours", "hr", "hrs"],
  },
  {
    key: "day",
    label: "day",
    symbol: "d",
    dimension: BASE_DIMENSIONS.TIME,
    factorToBase: 86400,
    category: "time",
    aliases: ["days"],
  },

  // Area
  {
    key: "square-meter",
    label: "square meter",
    symbol: "m²",
    dimension: BASE_DIMENSIONS.AREA,
    factorToBase: 1,
    system: "SI",
    category: "area",
    aliases: ["square meters", "square metre", "square metres", "m^2"],
  },
  {
    key: "square-foot",
    label: "square foot",
    symbol: "ft²",
    dimension: BASE_DIMENSIONS.AREA,
    factorToBase: 0.09290304,
    system: "US",
    category: "area",
    aliases: ["square feet", "sq ft", "ft^2"],
  },

  // Volume
  {
    key: "cubic-meter",
    label: "cubic meter",
    symbol: "m³",
    dimension: BASE_DIMENSIONS.VOLUME,
    factorToBase: 1,
    system: "SI",
    category: "volume",
    aliases: ["cubic meters", "cubic metre", "cubic metres", "m^3"],
  },
  {
    key: "liter",
    label: "liter",
    symbol: "L",
    dimension: BASE_DIMENSIONS.VOLUME,
    factorToBase: 0.001,
    system: "Metric",
    category: "volume",
    aliases: ["liters", "litre", "litres", "l"],
  },
  {
    key: "gallon-us",
    label: "US gallon",
    symbol: "gal",
    dimension: BASE_DIMENSIONS.VOLUME,
    factorToBase: 0.003785411784,
    system: "US",
    category: "volume",
    aliases: ["gallons", "us gallon", "us gallons"],
  },

  // Speed
  {
    key: "meter-per-second",
    label: "meter per second",
    symbol: "m/s",
    dimension: BASE_DIMENSIONS.SPEED,
    factorToBase: 1,
    system: "SI",
    category: "speed",
    aliases: ["meters per second", "mps"],
  },
  {
    key: "kilometer-per-hour",
    label: "kilometer per hour",
    symbol: "km/h",
    dimension: BASE_DIMENSIONS.SPEED,
    factorToBase: 1 / 3.6,
    system: "Metric",
    category: "speed",
    aliases: ["kilometers per hour", "kmh", "kph"],
  },
  {
    key: "mile-per-hour",
    label: "mile per hour",
    symbol: "mph",
    dimension: BASE_DIMENSIONS.SPEED,
    factorToBase: 0.44704,
    system: "US",
    category: "speed",
    aliases: ["miles per hour"],
  },
]

export const CATEGORIES: Category[] = [
  {
    key: "length",
    name: "Length",
    description: "Distance and length measurements",
    units: ["meter", "inch", "foot", "yard", "mile"],
  },
  {
    key: "mass",
    name: "Mass & Weight",
    description: "Mass and weight measurements",
    units: ["kilogram", "gram", "pound", "ounce"],
  },
  {
    key: "temperature",
    name: "Temperature",
    description: "Temperature measurements",
    units: ["kelvin", "celsius", "fahrenheit"],
  },
  {
    key: "time",
    name: "Time",
    description: "Time duration measurements",
    units: ["second", "minute", "hour", "day"],
  },
  {
    key: "area",
    name: "Area",
    description: "Surface area measurements",
    units: ["square-meter", "square-foot"],
  },
  {
    key: "volume",
    name: "Volume",
    description: "Volume and capacity measurements",
    units: ["cubic-meter", "liter", "gallon-us"],
  },
  {
    key: "speed",
    name: "Speed",
    description: "Speed and velocity measurements",
    units: ["meter-per-second", "kilometer-per-hour", "mile-per-hour"],
  },
]

// Initialize the global registry
export function initializeRegistry(): void {
  for (const unit of BASE_UNITS) {
    globalRegistry.registerUnit(unit)
  }
}

// Helper functions
export function getUnitsByCategory(category: string): Unit[] {
  return globalRegistry.getUnitsByCategory(category)
}

export function getAllCategories(): Category[] {
  return CATEGORIES
}

export function getCategoryByKey(key: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.key === key)
}

// Initialize on module load
initializeRegistry()
