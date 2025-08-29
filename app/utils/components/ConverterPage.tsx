import type React from "react"
interface ConverterPageProps {
  title: string
  description: string
  fromUnit: string
  toUnit: string
  fromSymbol?: string
  toSymbol?: string
  conversionFactor: number
  children?: React.ReactNode
}

export default function ConverterPage({
  title,
  description,
  fromUnit,
  toUnit,
  fromSymbol = "",
  toSymbol = "",
  conversionFactor,
  children,
}: ConverterPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
        </header>

        <div className="max-w-2xl mx-auto bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {fromUnit} {fromSymbol && `(${fromSymbol})`}
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${fromUnit.toLowerCase()}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {toUnit} {toSymbol && `(${toSymbol})`}
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                placeholder={`Result in ${toUnit.toLowerCase()}`}
                readOnly
              />
            </div>
          </div>

          <div className="text-center">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Convert
            </button>
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}
