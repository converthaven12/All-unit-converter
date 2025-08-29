"use client"
import { useState } from "react"

const unitCategories = {
  length: {
    name: "Length",
    units: {
      mm: { name: "Millimeters", factor: 0.001 },
      cm: { name: "Centimeters", factor: 0.01 },
      m: { name: "Meters", factor: 1 },
      km: { name: "Kilometers", factor: 1000 },
      inches: { name: "Inches", factor: 0.0254 },
      feet: { name: "Feet", factor: 0.3048 },
      yards: { name: "Yards", factor: 0.9144 },
      miles: { name: "Miles", factor: 1609.34 },
      nauticalMiles: { name: "Nautical Miles", factor: 1852 },
    },
  },
  weight: {
    name: "Weight & Mass",
    units: {
      mg: { name: "Milligrams", factor: 0.000001 },
      g: { name: "Grams", factor: 0.001 },
      kg: { name: "Kilograms", factor: 1 },
      tons: { name: "Metric Tons", factor: 1000 },
      oz: { name: "Ounces", factor: 0.0283495 },
      lbs: { name: "Pounds", factor: 0.453592 },
      stones: { name: "Stones", factor: 6.35029 },
      carats: { name: "Carats", factor: 0.0002 },
    },
  },
  temperature: {
    name: "Temperature",
    units: {
      celsius: { name: "Celsius", factor: 1 },
      fahrenheit: { name: "Fahrenheit", factor: 1 },
      kelvin: { name: "Kelvin", factor: 1 },
      rankine: { name: "Rankine", factor: 1 },
    },
  },
  volume: {
    name: "Volume",
    units: {
      ml: { name: "Milliliters", factor: 0.001 },
      l: { name: "Liters", factor: 1 },
      m3: { name: "Cubic Meters", factor: 1000 },
      flOz: { name: "Fluid Ounces", factor: 0.0295735 },
      cups: { name: "Cups", factor: 0.236588 },
      pints: { name: "Pints", factor: 0.473176 },
      quarts: { name: "Quarts", factor: 0.946353 },
      gallons: { name: "Gallons", factor: 3.78541 },
      ft3: { name: "Cubic Feet", factor: 28.3168 },
    },
  },
  area: {
    name: "Area",
    units: {
      mm2: { name: "Square Millimeters", factor: 0.000001 },
      cm2: { name: "Square Centimeters", factor: 0.0001 },
      m2: { name: "Square Meters", factor: 1 },
      km2: { name: "Square Kilometers", factor: 1000000 },
      in2: { name: "Square Inches", factor: 0.00064516 },
      ft2: { name: "Square Feet", factor: 0.092903 },
      acres: { name: "Acres", factor: 4046.86 },
      hectares: { name: "Hectares", factor: 10000 },
      miles2: { name: "Square Miles", factor: 2590000 },
    },
  },
  speed: {
    name: "Speed",
    units: {
      ms: { name: "Meters/Second", factor: 1 },
      kmh: { name: "Kilometers/Hour", factor: 0.277778 },
      mph: { name: "Miles/Hour", factor: 0.44704 },
      fts: { name: "Feet/Second", factor: 0.3048 },
      knots: { name: "Knots", factor: 0.514444 },
      mach: { name: "Mach", factor: 343 },
    },
  },
  pressure: {
    name: "Pressure",
    units: {
      pa: { name: "Pascal", factor: 1 },
      kpa: { name: "Kilopascal", factor: 1000 },
      bar: { name: "Bar", factor: 100000 },
      psi: { name: "PSI", factor: 6894.76 },
      atm: { name: "Atmosphere", factor: 101325 },
      torr: { name: "Torr", factor: 133.322 },
      mmhg: { name: "mmHg", factor: 133.322 },
    },
  },
  energy: {
    name: "Energy & Power",
    units: {
      j: { name: "Joules", factor: 1 },
      kj: { name: "Kilojoules", factor: 1000 },
      cal: { name: "Calories", factor: 4.184 },
      kcal: { name: "Kilocalories", factor: 4184 },
      wh: { name: "Watt Hours", factor: 3600 },
      kwh: { name: "Kilowatt Hours", factor: 3600000 },
      btu: { name: "BTU", factor: 1055.06 },
      hp: { name: "Horsepower", factor: 745.7 },
    },
  },
  data: {
    name: "Data Storage",
    units: {
      bits: { name: "Bits", factor: 1 },
      bytes: { name: "Bytes", factor: 8 },
      kb: { name: "Kilobytes", factor: 8192 },
      mb: { name: "Megabytes", factor: 8388608 },
      gb: { name: "Gigabytes", factor: 8589934592 },
      tb: { name: "Terabytes", factor: 8796093022208 },
    },
  },
  time: {
    name: "Time",
    units: {
      seconds: { name: "Seconds", factor: 1 },
      minutes: { name: "Minutes", factor: 60 },
      hours: { name: "Hours", factor: 3600 },
      days: { name: "Days", factor: 86400 },
      weeks: { name: "Weeks", factor: 604800 },
      months: { name: "Months", factor: 2629746 },
      years: { name: "Years", factor: 31556952 },
    },
  },
}

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("length")
  const [fromUnit, setFromUnit] = useState("m")
  const [toUnit, setToUnit] = useState("feet")
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")

  const convertValue = (value: string, from: string, to: string, category: string) => {
    if (!value || isNaN(Number(value))) return ""

    const num = Number(value)
    const categoryData = unitCategories[category as keyof typeof unitCategories]

    if (category === "temperature") {
      // Special temperature conversion logic
      let celsius = num
      if (from === "fahrenheit") celsius = ((num - 32) * 5) / 9
      if (from === "kelvin") celsius = num - 273.15
      if (from === "rankine") celsius = ((num - 491.67) * 5) / 9

      if (to === "celsius") return celsius.toFixed(2)
      if (to === "fahrenheit") return ((celsius * 9) / 5 + 32).toFixed(2)
      if (to === "kelvin") return (celsius + 273.15).toFixed(2)
      if (to === "rankine") return ((celsius * 9) / 5 + 491.67).toFixed(2)
    } else {
      // Standard factor-based conversion
      const fromFactor = categoryData.units[from as keyof typeof categoryData.units]?.factor || 1
      const toFactor = categoryData.units[to as keyof typeof categoryData.units]?.factor || 1
      const result = (num * fromFactor) / toFactor
      return result.toFixed(6).replace(/\.?0+$/, "")
    }

    return ""
  }

  const handleFromValueChange = (value: string) => {
    setFromValue(value)
    const converted = convertValue(value, fromUnit, toUnit, selectedCategory)
    setToValue(converted)
  }

  const handleToValueChange = (value: string) => {
    setToValue(value)
    const converted = convertValue(value, toUnit, fromUnit, selectedCategory)
    setFromValue(converted)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    const units = Object.keys(unitCategories[category as keyof typeof unitCategories].units)
    setFromUnit(units[0])
    setToUnit(units[1] || units[0])
    setFromValue("")
    setToValue("")
  }

  const currentUnits = unitCategories[selectedCategory as keyof typeof unitCategories].units

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Universal Unit Converter – Convert Any Measurement Instantly
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Convert between all types of measurements with our comprehensive conversion tools. From length and weight to
          energy and data storage.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-12">
        <div className="mb-4">
          <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
            Conversion Category
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.entries(unitCategories).map(([key, category]) => (
              <option key={key} value={key}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="from-value" className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <div className="flex gap-2">
              <input
                id="from-value"
                type="number"
                value={fromValue}
                onChange={(e) => handleFromValueChange(e.target.value)}
                placeholder="Enter value"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={fromUnit}
                onChange={(e) => {
                  setFromUnit(e.target.value)
                  if (fromValue) {
                    const converted = convertValue(fromValue, e.target.value, toUnit, selectedCategory)
                    setToValue(converted)
                  }
                }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(currentUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="to-value" className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <div className="flex gap-2">
              <input
                id="to-value"
                type="number"
                value={toValue}
                onChange={(e) => handleToValueChange(e.target.value)}
                placeholder="Result"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={toUnit}
                onChange={(e) => {
                  setToUnit(e.target.value)
                  if (fromValue) {
                    const converted = convertValue(fromValue, fromUnit, e.target.value, selectedCategory)
                    setToValue(converted)
                  }
                }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(currentUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Quick Access Converters</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(unitCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`p-4 border rounded-lg transition-colors text-left ${
                selectedCategory === key
                  ? "bg-blue-100 border-blue-300"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <div className="font-semibold text-gray-900">{category.name}</div>
              <div className="text-sm text-gray-600">{Object.keys(category.units).length} units available</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Complete Unit Conversion Suite – All Measurements in One Place
        </h2>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>
            Our <strong>universal unit converter</strong> is the most comprehensive conversion tool available online.
            Convert between{" "}
            <strong>length, weight, temperature, volume, area, speed, pressure, energy, data storage, and time</strong>
            units with precision and ease. Whether you need metric to imperial conversions or specialized scientific
            units, our converter handles them all.
          </p>

          <p>
            From everyday conversions like <strong>centimeters to inches</strong> and{" "}
            <strong>kilograms to pounds</strong>
            to complex scientific measurements like <strong>pascals to PSI</strong> and <strong>joules to BTU</strong>,
            our tool provides accurate results instantly. Perfect for students, engineers, scientists, and professionals
            across all industries.
          </p>

          <p>
            Features include bidirectional conversion, high precision calculations, support for both metric and imperial
            systems, and an intuitive interface that works on all devices. No registration required – start converting
            measurements immediately with our free, professional-grade conversion tools.
          </p>
        </div>
      </div>
    </div>
  )
}
