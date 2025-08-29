// Conversion factors and functions
const CONVERSION_FACTORS = {
  // Length (to meters)
  cm: 0.01,
  in: 0.0254,
  m: 1,
  ft: 0.3048,
  km: 1000,
  mi: 1609.344,
  mm: 0.001,

  // Mass (to kilograms)
  kg: 1,
  lb: 0.45359237,
  g: 0.001,
  oz: 0.0283495,
  st: 6.35029,

  // Volume (to liters)
  L: 1,
  gal: 3.785411784, // US gallon
  mL: 0.001,
  "fl oz": 0.0295735, // US fluid ounce
  cup: 0.236588, // US cup

  // Area (to square meters)
  "m²": 1,
  "ft²": 0.092903,
  "km²": 1000000,
  "mi²": 2589988.11,

  // Speed (to m/s)
  "km/h": 0.277778,
  mph: 0.44704,
  "m/s": 1,
  "ft/s": 0.3048,

  // Pressure (to pascals)
  kPa: 1000,
  psi: 6894.757,
  bar: 100000,

  // Energy (to joules)
  J: 1,
  cal: 4.184,
  kWh: 3600000,
  BTU: 1055.06,

  // Power (to watts)
  W: 1,
  hp: 745.7,

  // Data (to bytes)
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024,
}

// Temperature conversion functions
function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32
}

function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9
}

function celsiusToKelvin(celsius: number): number {
  return celsius + 273.15
}

function kelvinToCelsius(kelvin: number): number {
  return kelvin - 273.15
}

function fahrenheitToKelvin(fahrenheit: number): number {
  return celsiusToKelvin(fahrenheitToCelsius(fahrenheit))
}

function kelvinToFahrenheit(kelvin: number): number {
  return celsiusToFahrenheit(kelvinToCelsius(kelvin))
}

export function convert(value: number, fromUnit: string, toUnit: string): number {
  // Handle temperature conversions
  if (fromUnit === "°C" && toUnit === "°F") return celsiusToFahrenheit(value)
  if (fromUnit === "°F" && toUnit === "°C") return fahrenheitToCelsius(value)
  if (fromUnit === "°C" && toUnit === "K") return celsiusToKelvin(value)
  if (fromUnit === "K" && toUnit === "°C") return kelvinToCelsius(value)
  if (fromUnit === "°F" && toUnit === "K") return fahrenheitToKelvin(value)
  if (fromUnit === "K" && toUnit === "°F") return kelvinToFahrenheit(value)

  // Handle linear conversions
  const fromFactor = CONVERSION_FACTORS[fromUnit as keyof typeof CONVERSION_FACTORS]
  const toFactor = CONVERSION_FACTORS[toUnit as keyof typeof CONVERSION_FACTORS]

  if (!fromFactor || !toFactor) {
    throw new Error(`Conversion not supported: ${fromUnit} to ${toUnit}`)
  }

  // Convert to base unit, then to target unit
  const baseValue = value * fromFactor
  return baseValue / toFactor
}

export const UNIT_REGISTRY = Object.keys(CONVERSION_FACTORS).concat(["°C", "°F", "K"])
