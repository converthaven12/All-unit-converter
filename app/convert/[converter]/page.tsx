"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { use } from "react"

// Conversion data and functions
const conversions = {
  // Length conversions
  "cm-to-inches": {
    title: "CM to Inches Converter",
    fromUnit: "Centimeters",
    toUnit: "Inches",
    fromSymbol: "cm",
    toSymbol: "in",
    convert: (value: number) => value * 0.393701,
    reverse: (value: number) => value / 0.393701,
    category: "Length",
    relatedConverters: [
      { name: "Meters to Feet", slug: "meters-to-feet" },
      { name: "Millimeters to Inches", slug: "millimeters-to-inches" },
      { name: "Feet to Meters", slug: "feet-to-meters" },
      { name: "Inches to CM", slug: "inches-to-cm" },
    ],
  },
  "meters-to-feet": {
    title: "Meters to Feet Converter",
    fromUnit: "Meters",
    toUnit: "Feet",
    fromSymbol: "m",
    toSymbol: "ft",
    convert: (value: number) => value * 3.28084,
    reverse: (value: number) => value / 3.28084,
    category: "Length",
    relatedConverters: [
      { name: "CM to Inches", slug: "cm-to-inches" },
      { name: "Kilometers to Miles", slug: "kilometers-to-miles" },
      { name: "Feet to Meters", slug: "feet-to-meters" },
      { name: "Yards to Meters", slug: "yards-to-meters" },
    ],
  },
  "kilometers-to-miles": {
    title: "Kilometers to Miles Converter",
    fromUnit: "Kilometers",
    toUnit: "Miles",
    fromSymbol: "km",
    toSymbol: "mi",
    convert: (value: number) => value * 0.621371,
    reverse: (value: number) => value / 0.621371,
    category: "Length",
    relatedConverters: [
      { name: "Meters to Feet", slug: "meters-to-feet" },
      { name: "Miles to KM", slug: "miles-to-km" },
      { name: "Nautical Miles to Miles", slug: "nautical-miles-to-miles" },
      { name: "CM to Inches", slug: "cm-to-inches" },
    ],
  },
  // Weight conversions
  "kilograms-to-pounds": {
    title: "Kilograms to Pounds Converter",
    fromUnit: "Kilograms",
    toUnit: "Pounds",
    fromSymbol: "kg",
    toSymbol: "lbs",
    convert: (value: number) => value * 2.20462,
    reverse: (value: number) => value / 2.20462,
    category: "Weight",
    relatedConverters: [
      { name: "Pounds to KG", slug: "pounds-to-kg" },
      { name: "Grams to Ounces", slug: "grams-to-ounces" },
      { name: "Stones to Kilograms", slug: "stones-to-kilograms" },
      { name: "Tons to Pounds", slug: "tons-to-pounds" },
    ],
  },
  // Temperature conversions
  "celsius-to-fahrenheit": {
    title: "Celsius to Fahrenheit Converter",
    fromUnit: "Celsius",
    toUnit: "Fahrenheit",
    fromSymbol: "°C",
    toSymbol: "°F",
    convert: (value: number) => (value * 9) / 5 + 32,
    reverse: (value: number) => ((value - 32) * 5) / 9,
    category: "Temperature",
    relatedConverters: [
      { name: "Fahrenheit to Celsius", slug: "fahrenheit-to-celsius" },
      { name: "Kelvin to Celsius", slug: "kelvin-to-celsius" },
      { name: "Rankine to Fahrenheit", slug: "rankine-to-fahrenheit" },
    ],
  },
  // Add more conversions as needed...
}

export default function ConverterPage({ params }: { params: Promise<{ converter: string }> }) {
  const resolvedParams = use(params)
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")
  const [isReversed, setIsReversed] = useState(false)

  const converterData = conversions[resolvedParams.converter as keyof typeof conversions]

  useEffect(() => {
    if (fromValue && !isNaN(Number(fromValue))) {
      const result = isReversed ? converterData.reverse(Number(fromValue)) : converterData.convert(Number(fromValue))
      setToValue(result.toFixed(6).replace(/\.?0+$/, ""))
    } else {
      setToValue("")
    }
  }, [fromValue, isReversed, converterData])

  if (!converterData) {
    return <div className="p-8">Converter not found</div>
  }

  const currentFromUnit = isReversed ? converterData.toUnit : converterData.fromUnit
  const currentToUnit = isReversed ? converterData.fromUnit : converterData.toUnit
  const currentFromSymbol = isReversed ? converterData.toSymbol : converterData.fromSymbol
  const currentToSymbol = isReversed ? converterData.fromSymbol : converterData.toSymbol

  return (
    <div className="max-w-4xl mx-auto p-6">
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">{converterData.title}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">{converterData.title}</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From: {currentFromUnit} ({currentFromSymbol})
            </label>
            <input
              type="number"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Enter ${currentFromUnit.toLowerCase()}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To: {currentToUnit} ({currentToSymbol})
            </label>
            <input
              type="text"
              value={toValue}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Result"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              setIsReversed(!isReversed)
              setFromValue(toValue)
              setToValue("")
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ⇄ Swap Units
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Related {converterData.category} Converters</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {converterData.relatedConverters.map((converter) => (
            <Link
              key={converter.slug}
              href={`/convert/${converter.slug}`}
              className="block p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center text-sm text-blue-600 hover:text-blue-800"
            >
              {converter.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
