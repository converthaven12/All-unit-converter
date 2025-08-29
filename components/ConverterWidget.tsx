"use client"

import { useState, useEffect } from "react"
import { convert } from "@/lib/conversions"
import { ArrowLeftRight, Copy } from "lucide-react"

interface ConverterWidgetProps {
  fromUnit?: string
  toUnit?: string
  fromSymbol?: string
  toSymbol?: string
  availableUnits?: Array<{ symbol: string; name: string }>
}

export default function ConverterWidget({
  fromUnit = "cm",
  toUnit = "in",
  fromSymbol = "cm",
  toSymbol = "in",
  availableUnits = [
    { symbol: "cm", name: "Centimeters" },
    { symbol: "in", name: "Inches" },
    { symbol: "m", name: "Meters" },
    { symbol: "ft", name: "Feet" },
  ],
}: ConverterWidgetProps) {
  const [fromValue, setFromValue] = useState("1")
  const [toValue, setToValue] = useState("")
  const [selectedFromUnit, setSelectedFromUnit] = useState(fromSymbol)
  const [selectedToUnit, setSelectedToUnit] = useState(toSymbol)
  const [precision, setPrecision] = useState(2)

  useEffect(() => {
    if (fromValue && !isNaN(Number(fromValue))) {
      try {
        const result = convert(Number(fromValue), selectedFromUnit, selectedToUnit)
        setToValue(result.toFixed(precision))
      } catch (error) {
        setToValue("Error")
      }
    } else {
      setToValue("")
    }
  }, [fromValue, selectedFromUnit, selectedToUnit, precision])

  const handleSwap = () => {
    setSelectedFromUnit(selectedToUnit)
    setSelectedToUnit(selectedFromUnit)
    setFromValue(toValue)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(toValue)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* From */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <input
            type="number"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Enter value"
          />
          <select
            value={selectedFromUnit}
            onChange={(e) => setSelectedFromUnit(e.target.value)}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            {availableUnits.map((unit) => (
              <option key={unit.symbol} value={unit.symbol}>
                {unit.name} ({unit.symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Swap button */}
        <div className="flex items-center justify-center md:col-span-2">
          <button
            onClick={handleSwap}
            className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-colors"
            title="Swap units"
          >
            <ArrowLeftRight className="w-5 h-5" />
          </button>
        </div>

        {/* To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
          <div className="relative">
            <input
              type="text"
              value={toValue}
              readOnly
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md bg-gray-50"
              placeholder="Result"
            />
            {toValue && toValue !== "Error" && (
              <button
                onClick={handleCopy}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                title="Copy result"
              >
                <Copy className="w-4 h-4" />
              </button>
            )}
          </div>
          <select
            value={selectedToUnit}
            onChange={(e) => setSelectedToUnit(e.target.value)}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            {availableUnits.map((unit) => (
              <option key={unit.symbol} value={unit.symbol}>
                {unit.name} ({unit.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Precision control */}
      <div className="mt-4 flex items-center gap-2">
        <label className="text-sm text-gray-600">Precision:</label>
        <select
          value={precision}
          onChange={(e) => setPrecision(Number(e.target.value))}
          className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          {[0, 1, 2, 3, 4, 5, 6].map((p) => (
            <option key={p} value={p}>
              {p} decimal places
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export { ConverterWidget }
