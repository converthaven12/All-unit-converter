"use client"

import Link from "next/link"
import { useState } from "react"

// Unit conversion data
const unitCategories = {
  length: {
    name: "Length",
    units: {
      cm: { name: "Centimeters", factor: 1 },
      inches: { name: "Inches", factor: 2.54 },
      feet: { name: "Feet", factor: 30.48 },
      meters: { name: "Meters", factor: 100 },
      mm: { name: "Millimeters", factor: 0.1 },
    },
  },
  weight: {
    name: "Weight",
    units: {
      kg: { name: "Kilograms", factor: 1 },
      lbs: { name: "Pounds", factor: 0.453592 },
      grams: { name: "Grams", factor: 0.001 },
      oz: { name: "Ounces", factor: 0.0283495 },
    },
  },
  temperature: {
    name: "Temperature",
    units: {
      celsius: { name: "Celsius", factor: 1 },
      fahrenheit: { name: "Fahrenheit", factor: 1 },
      kelvin: { name: "Kelvin", factor: 1 },
    },
  },
  volume: {
    name: "Volume",
    units: {
      liters: { name: "Liters", factor: 1 },
      gallons: { name: "Gallons", factor: 3.78541 },
    },
  },
}

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("length")
  const [fromUnit, setFromUnit] = useState("cm")
  const [toUnit, setToUnit] = useState("inches")
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

      if (to === "celsius") return celsius.toFixed(2)
      if (to === "fahrenheit") return ((celsius * 9) / 5 + 32).toFixed(2)
      if (to === "kelvin") return (celsius + 273.15).toFixed(2)
    } else if (category === "volume") {
      // Special volume conversion logic
      const fromFactor = categoryData.units[from as keyof typeof categoryData.units]?.factor || 1
      const toFactor = categoryData.units[to as keyof typeof categoryData.units]?.factor || 1
      const result = (num * fromFactor) / toFactor
      return result.toFixed(4).replace(/\.?0+$/, "")
    } else {
      // Standard factor-based conversion
      const fromFactor = categoryData.units[from as keyof typeof categoryData.units]?.factor || 1
      const toFactor = categoryData.units[to as keyof typeof categoryData.units]?.factor || 1
      const result = (num * fromFactor) / toFactor
      return result.toFixed(4).replace(/\.?0+$/, "")
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Free Online Unit Converter – Convert Any Measurement Instantly
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Convert between different units of measurement quickly and accurately with our free online conversion tools.
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
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Popular Converters</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/Converters/CommonConversions/CmToInches"
            className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div className="font-semibold text-blue-900">CM to Inches</div>
            <div className="text-sm text-blue-700">Convert centimeters to inches</div>
          </Link>

          <Link
            href="/Converters/Weight/KilogramsToPounds"
            className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
          >
            <div className="font-semibold text-green-900">KG to LBS</div>
            <div className="text-sm text-green-700">Convert kilograms to pounds</div>
          </Link>

          <Link
            href="/Converters/Temperature/FahrenheitToCelsius"
            className="block p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
          >
            <div className="font-semibold text-red-900">°F to °C</div>
            <div className="text-sm text-red-700">Convert Fahrenheit to Celsius</div>
          </Link>

          <Link
            href="/Converters/Volume/LitersToGallons"
            className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <div className="font-semibold text-purple-900">Liters to Gallons</div>
            <div className="text-sm text-purple-700">Convert liters to gallons</div>
          </Link>

          <Link
            href="/Converters/CommonConversions/CmToFeet"
            className="block p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <div className="font-semibold text-yellow-900">Meters to Feet</div>
            <div className="text-sm text-yellow-700">Convert meters to feet</div>
          </Link>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Free Online Unit Converter – Fast & Accurate Conversions
        </h2>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>
            Our <strong>free online unit converter</strong> makes it easy to convert between different units of
            measurement instantly. Whether you need to <strong>convert cm to inches</strong>, use our{" "}
            <strong>kg to lbs converter</strong>, or access our
            <strong>temperature conversion tool</strong>, we provide fast and accurate results every time.
          </p>

          <p>
            This comprehensive conversion platform supports <strong>length, weight, area, volume converters</strong> and
            more. Our tools are perfect for students, professionals, and anyone who needs reliable unit conversions.
            From simple everyday conversions to complex scientific calculations, our converter handles it all with
            precision.
          </p>

          <p>
            Why choose our unit converter? It's completely free, works on any device, and provides instant results. No
            downloads or installations required – simply enter your values and get accurate conversions immediately. Our
            converter supports the most commonly used units across multiple measurement systems including metric,
            imperial, and scientific units.
          </p>

          <p>
            Save time and eliminate calculation errors with our user-friendly interface. Whether you're converting
            measurements for cooking, construction, science projects, or international business, our reliable conversion
            tools ensure you get the right results every time. Start converting now and experience the convenience of
            our professional-grade unit converter.
          </p>
        </div>
      </div>
    </div>
  )
}
