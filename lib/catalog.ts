export interface Category {
  id: string
  name: string
  description: string
}

export interface Converter {
  slug: string
  from: string
  to: string
  symbols: {
    from: string
    to: string
  }
  categoryId: string
  factor: number
  offset?: number
  type?: "linear" | "temperature"
  precision?: number // default 4
  topValues?: number[] // optional seed values
  compute?: (x: number) => number // optional override for non-linear cases
}

export const CATEGORIES: Category[] = [
  {
    id: "length",
    name: "Length",
    description: "Convert between different units of length and distance",
  },
  {
    id: "mass",
    name: "Mass & Weight",
    description: "Convert between different units of mass and weight",
  },
  {
    id: "temperature",
    name: "Temperature",
    description: "Convert between Celsius, Fahrenheit, and Kelvin",
  },
  {
    id: "volume",
    name: "Volume",
    description: "Convert between different units of volume and capacity",
  },
  {
    id: "area",
    name: "Area",
    description: "Convert between different units of area",
  },
  {
    id: "speed",
    name: "Speed",
    description: "Convert between different units of speed and velocity",
  },
  {
    id: "pressure",
    name: "Pressure",
    description: "Convert between different units of pressure",
  },
  {
    id: "energy",
    name: "Energy",
    description: "Convert between different units of energy",
  },
  {
    id: "power",
    name: "Power",
    description: "Convert between different units of power",
  },
  {
    id: "data",
    name: "Data Storage",
    description: "Convert between different units of digital storage",
  },
]

export const CONVERTERS: Converter[] = [
  // Length
  {
    slug: "cm-to-inches",
    from: "Centimeters",
    to: "Inches",
    symbols: { from: "cm", to: "in" },
    categoryId: "length",
    factor: 0.393701,
    topValues: [1, 2, 3, 5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 300],
  },
  {
    slug: "inches-to-cm",
    from: "Inches",
    to: "Centimeters",
    symbols: { from: "in", to: "cm" },
    categoryId: "length",
    factor: 2.54,
    topValues: [1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 24, 30, 36, 48, 60],
  },
  {
    slug: "meter-to-foot",
    from: "Meter",
    to: "Foot",
    symbols: { from: "m", to: "ft" },
    categoryId: "length",
    factor: 3.28084,
    topValues: [1, 2, 3, 5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 300],
  },
  {
    slug: "foot-to-meter",
    from: "Foot",
    to: "Meter",
    symbols: { from: "ft", to: "m" },
    categoryId: "length",
    factor: 0.3048,
    topValues: [1, 2, 3, 5, 6, 10, 12, 15, 20, 25, 30, 50, 75, 100, 150],
  },
  {
    slug: "meters-to-feet",
    from: "Meters",
    to: "Feet",
    symbols: { from: "m", to: "ft" },
    categoryId: "length",
    factor: 3.28084,
    topValues: [1, 2, 3, 5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 300],
  },
  {
    slug: "feet-to-meters",
    from: "Feet",
    to: "Meters",
    symbols: { from: "ft", to: "m" },
    categoryId: "length",
    factor: 0.3048,
    topValues: [1, 2, 3, 5, 6, 10, 12, 15, 20, 25, 30, 50, 75, 100, 150],
  },

  // Mass
  {
    slug: "kg-to-pounds",
    from: "Kilograms",
    to: "Pounds",
    symbols: { from: "kg", to: "lb" },
    categoryId: "mass",
    factor: 2.20462,
    topValues: [1, 2, 5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 250, 300],
  },
  {
    slug: "pounds-to-kg",
    from: "Pounds",
    to: "Kilograms",
    symbols: { from: "lb", to: "kg" },
    categoryId: "mass",
    factor: 0.453592,
    topValues: [1, 2, 5, 10, 15, 20, 25, 50, 75, 100, 150, 200, 250, 300, 500],
  },
  {
    slug: "grams-to-ounces",
    from: "Grams",
    to: "Ounces",
    symbols: { from: "g", to: "oz" },
    categoryId: "mass",
    factor: 0.035274,
    topValues: [10, 25, 50, 100, 150, 200, 250, 300, 500, 750, 1000, 1500, 2000, 2500, 3000],
  },
  {
    slug: "ounces-to-grams",
    from: "Ounces",
    to: "Grams",
    symbols: { from: "oz", to: "g" },
    categoryId: "mass",
    factor: 28.3495,
    topValues: [1, 2, 3, 4, 5, 8, 10, 12, 16, 20, 24, 32, 48, 64, 80],
  },
  {
    slug: "stone-to-kg",
    from: "Stone",
    to: "Kilograms",
    symbols: { from: "st", to: "kg" },
    categoryId: "mass",
    factor: 6.35029,
    topValues: [1, 2, 3, 5, 8, 10, 12, 15, 18, 20, 22, 25, 30, 35, 40],
  },
  {
    slug: "kg-to-stone",
    from: "Kilograms",
    to: "Stone",
    symbols: { from: "kg", to: "st" },
    categoryId: "mass",
    factor: 0.157473,
    topValues: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 140, 160, 180, 200],
  },

  // Temperature - Updated with compute functions for accurate conversions
  {
    slug: "celsius-to-fahrenheit",
    from: "Celsius",
    to: "Fahrenheit",
    symbols: { from: "°C", to: "°F" },
    categoryId: "temperature",
    factor: 1.8,
    offset: 32,
    type: "temperature",
    topValues: [-40, -20, -10, 0, 5, 10, 15, 20, 25, 30, 37, 50, 68, 86, 100],
    compute: (x: number) => (x * 9) / 5 + 32,
  },
  {
    slug: "fahrenheit-to-celsius",
    from: "Fahrenheit",
    to: "Celsius",
    symbols: { from: "°F", to: "°C" },
    categoryId: "temperature",
    factor: 0.555556,
    offset: -17.7778,
    type: "temperature",
    topValues: [-40, 0, 10, 20, 32, 40, 50, 60, 70, 80, 90, 100, 150, 200, 212],
    compute: (x: number) => ((x - 32) * 5) / 9,
  },
  {
    slug: "celsius-to-kelvin",
    from: "Celsius",
    to: "Kelvin",
    symbols: { from: "°C", to: "K" },
    categoryId: "temperature",
    factor: 1,
    offset: 273.15,
    type: "temperature",
    topValues: [-40, -20, -10, 0, 5, 10, 15, 20, 25, 30, 37, 50, 75, 100, 200],
    compute: (x: number) => x + 273.15,
  },
  {
    slug: "kelvin-to-celsius",
    from: "Kelvin",
    to: "Celsius",
    symbols: { from: "K", to: "°C" },
    categoryId: "temperature",
    factor: 1,
    offset: -273.15,
    type: "temperature",
    topValues: [233, 253, 263, 273, 278, 283, 288, 293, 298, 303, 310, 323, 348, 373, 473],
    compute: (x: number) => x - 273.15,
  },
  {
    slug: "fahrenheit-to-kelvin",
    from: "Fahrenheit",
    to: "Kelvin",
    symbols: { from: "°F", to: "K" },
    categoryId: "temperature",
    factor: 0.555556,
    offset: 255.372,
    type: "temperature",
    topValues: [-40, 0, 10, 20, 32, 40, 50, 60, 70, 80, 90, 100, 150, 200, 212],
    compute: (x: number) => ((x - 32) * 5) / 9 + 273.15,
  },
  {
    slug: "kelvin-to-fahrenheit",
    from: "Kelvin",
    to: "Fahrenheit",
    symbols: { from: "K", to: "°F" },
    categoryId: "temperature",
    factor: 1.8,
    offset: -459.67,
    type: "temperature",
    topValues: [233, 253, 263, 273, 278, 283, 288, 293, 298, 303, 310, 323, 348, 373, 473],
    compute: (x: number) => ((x - 273.15) * 9) / 5 + 32,
  },

  // Volume
  {
    slug: "liters-to-gallons",
    from: "Liters",
    to: "Gallons (US)",
    symbols: { from: "L", to: "gal" },
    categoryId: "volume",
    factor: 0.264172,
    topValues: [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 200],
  },
  {
    slug: "gallons-to-liters",
    from: "Gallons (US)",
    to: "Liters",
    symbols: { from: "gal", to: "L" },
    categoryId: "volume",
    factor: 3.78541,
    topValues: [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 150],
  },
  {
    slug: "ml-to-fl-oz",
    from: "Milliliters",
    to: "Fluid Ounces (US)",
    symbols: { from: "mL", to: "fl oz" },
    categoryId: "volume",
    factor: 0.033814,
    topValues: [10, 25, 50, 100, 150, 200, 250, 300, 500, 750, 1000, 1500, 2000, 2500, 3000],
  },
  {
    slug: "fl-oz-to-ml",
    from: "Fluid Ounces (US)",
    to: "Milliliters",
    symbols: { from: "fl oz", to: "mL" },
    categoryId: "volume",
    factor: 29.5735,
    topValues: [1, 2, 3, 4, 5, 8, 10, 12, 16, 20, 24, 32, 48, 64, 80],
  },
  {
    slug: "cups-to-ml",
    from: "Cups (US)",
    to: "Milliliters",
    symbols: { from: "cup", to: "mL" },
    categoryId: "volume",
    factor: 236.588,
    topValues: [1, 2, 4, 8, 16, 32, 64, 128, 256, 500, 1000, 2000, 4000, 8000, 16000],
  },
  {
    slug: "ml-to-cups",
    from: "Milliliters",
    to: "Cups (US)",
    symbols: { from: "mL", to: "cup" },
    categoryId: "volume",
    factor: 0.00422675,
    topValues: [10, 25, 50, 100, 150, 200, 250, 300, 500, 750, 1000, 1500, 2000, 2500, 3000],
  },

  // Area
  {
    slug: "sqm-to-sqft",
    from: "Square Meters",
    to: "Square Feet",
    symbols: { from: "m²", to: "ft²" },
    categoryId: "area",
    factor: 10.7639,
    topValues: [1, 2, 5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 250, 300],
  },
  {
    slug: "sqft-to-sqm",
    from: "Square Feet",
    to: "Square Meters",
    symbols: { from: "ft²", to: "m²" },
    categoryId: "area",
    factor: 0.092903,
    topValues: [1, 2, 5, 10, 15, 20, 25, 50, 75, 100, 150, 200, 250, 300, 500],
  },
  {
    slug: "sqkm-to-sqmi",
    from: "Square Kilometers",
    to: "Square Miles",
    symbols: { from: "km²", to: "mi²" },
    categoryId: "area",
    factor: 0.386102,
    topValues: [1, 2, 5, 10, 15, 20, 25, 50, 75, 100, 150, 200, 300, 500, 1000],
  },
  {
    slug: "sqmi-to-sqkm",
    from: "Square Miles",
    to: "Square Kilometers",
    symbols: { from: "mi²", to: "km²" },
    categoryId: "area",
    factor: 2.58999,
    topValues: [1, 2, 5, 10, 15, 20, 25, 50, 75, 100, 150, 200, 250, 300, 500],
  },

  // Speed
  {
    slug: "kmh-to-mph",
    from: "Kilometers per Hour",
    to: "Miles per Hour",
    symbols: { from: "km/h", to: "mph" },
    categoryId: "speed",
    factor: 0.621371,
    topValues: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
  },
  {
    slug: "mph-to-kmh",
    from: "Miles per Hour",
    to: "Kilometers per Hour",
    symbols: { from: "mph", to: "km/h" },
    categoryId: "speed",
    factor: 1.60934,
    topValues: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
  },
  {
    slug: "ms-to-fts",
    from: "Meters per Second",
    to: "Feet per Second",
    symbols: { from: "m/s", to: "ft/s" },
    categoryId: "speed",
    factor: 3.28084,
    topValues: [1, 2, 5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 250, 300],
  },
  {
    slug: "fts-to-ms",
    from: "Feet per Second",
    to: "Meters per Second",
    symbols: { from: "ft/s", to: "m/s" },
    categoryId: "speed",
    factor: 0.3048,
    topValues: [1, 2, 5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 250, 300],
  },

  // Pressure
  {
    slug: "kpa-to-psi",
    from: "Kilopascals",
    to: "PSI",
    symbols: { from: "kPa", to: "psi" },
    categoryId: "pressure",
    factor: 0.145038,
    topValues: [1, 2, 5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 250, 300],
  },
  {
    slug: "psi-to-kpa",
    from: "PSI",
    to: "Kilopascals",
    symbols: { from: "psi", to: "kPa" },
    categoryId: "pressure",
    factor: 6.89476,
    topValues: [1, 2, 5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 250, 300],
  },
  {
    slug: "bar-to-psi",
    from: "Bar",
    to: "PSI",
    symbols: { from: "bar", to: "psi" },
    categoryId: "pressure",
    factor: 14.5038,
    topValues: [1, 2, 5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 250, 300],
  },
  {
    slug: "psi-to-bar",
    from: "PSI",
    to: "Bar",
    symbols: { from: "psi", to: "bar" },
    categoryId: "pressure",
    factor: 0.0689476,
    topValues: [1, 2, 5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 250, 300],
  },

  // Energy
  {
    slug: "joules-to-calories",
    from: "Joules",
    to: "Calories",
    symbols: { from: "J", to: "cal" },
    categoryId: "energy",
    factor: 0.239006,
    topValues: [1, 2, 5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 250, 300],
  },
  {
    slug: "calories-to-joules",
    from: "Calories",
    to: "Joules",
    symbols: { from: "cal", to: "J" },
    categoryId: "energy",
    factor: 4.184,
    topValues: [1, 2, 5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 250, 300],
  },
  {
    slug: "kwh-to-btu",
    from: "Kilowatt Hours",
    to: "BTU",
    symbols: { from: "kWh", to: "BTU" },
    categoryId: "energy",
    factor: 3412.14,
    topValues: [1, 2, 5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 250, 300],
  },
  {
    slug: "btu-to-kwh",
    from: "BTU",
    to: "Kilowatt Hours",
    symbols: { from: "BTU", to: "kWh" },
    categoryId: "energy",
    factor: 0.000293071,
    topValues: [1, 2, 5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 250, 300],
  },

  // Power
  {
    slug: "watts-to-horsepower",
    from: "Watts",
    to: "Horsepower",
    symbols: { from: "W", to: "hp" },
    categoryId: "power",
    factor: 0.00134102,
    topValues: [1, 2, 5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 250, 300],
  },
  {
    slug: "horsepower-to-watts",
    from: "Horsepower",
    to: "Watts",
    symbols: { from: "hp", to: "W" },
    categoryId: "power",
    factor: 745.7,
    topValues: [1, 2, 5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 250, 300],
  },

  // Data
  {
    slug: "mb-to-gb",
    from: "Megabytes",
    to: "Gigabytes",
    symbols: { from: "MB", to: "GB" },
    categoryId: "data",
    factor: 0.001,
    topValues: [1, 5, 10, 50, 100, 250, 500, 750, 1000, 1500, 2000, 3000, 4000, 5000, 10000],
  },
  {
    slug: "gb-to-mb",
    from: "Gigabytes",
    to: "Megabytes",
    symbols: { from: "GB", to: "MB" },
    categoryId: "data",
    factor: 1000,
    topValues: [1, 2, 4, 8, 16, 32, 64, 128, 256, 500, 1000, 2000, 4000, 8000, 16000],
  },
  {
    slug: "kb-to-mb",
    from: "Kilobytes",
    to: "Megabytes",
    symbols: { from: "KB", to: "MB" },
    categoryId: "data",
    factor: 0.001,
    topValues: [1, 2, 5, 10, 50, 100, 250, 500, 750, 1000, 1500, 2000, 3000, 4000, 5000],
  },
  {
    slug: "mb-to-kb",
    from: "Megabytes",
    to: "Kilobytes",
    symbols: { from: "MB", to: "KB" },
    categoryId: "data",
    factor: 1000,
    topValues: [1, 2, 4, 8, 16, 32, 64, 128, 256, 500, 1000, 2000, 4000, 8000, 16000],
  },
  {
    slug: "gb-to-tb",
    from: "Gigabytes",
    to: "Terabytes",
    symbols: { from: "GB", to: "TB" },
    categoryId: "data",
    factor: 0.001,
    topValues: [1, 2, 5, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 250, 300],
  },
  {
    slug: "tb-to-gb",
    from: "Terabytes",
    to: "Gigabytes",
    symbols: { from: "TB", to: "GB" },
    categoryId: "data",
    factor: 1000,
    topValues: [1, 2, 4, 8, 16, 32, 64, 128, 256, 500, 1000, 2000, 4000, 8000, 16000],
  },
]

export function getConvertersByCategory(categoryId: string): Converter[] {
  return CONVERTERS.filter((converter) => converter.categoryId === categoryId)
}

export function getConverterBySlug(slug: string): Converter | undefined {
  return CONVERTERS.find((converter) => converter.slug === slug)
}

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((category) => category.id === id)
}

export const POPULAR_CONVERTERS = [
  "cm-to-inches",
  "kg-to-pounds",
  "celsius-to-fahrenheit",
  "liters-to-gallons",
  "km-to-miles",
  "meters-to-feet",
  "fahrenheit-to-celsius",
  "pounds-to-kg",
  "inches-to-cm",
  "miles-to-km",
  "gb-to-mb",
  "kmh-to-mph",
]

export function convertValue(value: number, converter: Converter): number {
  if (converter.compute) {
    return converter.compute(value)
  } else if (converter.type === "temperature" && converter.offset !== undefined) {
    // For temperature conversions: result = (value * factor) + offset
    return value * converter.factor + converter.offset
  } else {
    // For linear conversions: result = value * factor
    return value * converter.factor
  }
}

export function generateCommonExamples(converter: Converter): Array<{ from: number; to: number }> {
  const examples = converter.topValues || [1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000]
  return examples.map((value) => ({
    from: value,
    to: convertValue(value, converter),
  }))
}
