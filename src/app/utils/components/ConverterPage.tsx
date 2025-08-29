"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export type ConverterMeta = {
  title: string
  fromUnit: { name: string; symbol: string }
  toUnit: { name: string; symbol: string }
  factor?: number
  offset?: number
  articleHtml?: string
}

interface ConverterPageProps {
  meta: ConverterMeta
  relatedLinks?: Array<{ href: string; title: string }>
}

export default function ConverterPage({ meta, relatedLinks = [] }: ConverterPageProps) {
  const [inputValue, setInputValue] = useState<string>("1")
  const [result, setResult] = useState<number>(0)

  // Convert function using factor and optional offset
  const convert = (value: number): number => {
    if (meta.offset !== undefined) {
      return (value + meta.offset) * (meta.factor || 1)
    }
    return value * (meta.factor || 1)
  }

  // Update result when input changes
  useEffect(() => {
    const numValue = Number.parseFloat(inputValue) || 0
    setResult(convert(numValue))
  }, [inputValue, meta.factor, meta.offset])

  // Generate conversion table values
  const tableValues = [1, 2, 3, 4, 5, 10, 20, 50, 100]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1>{meta.title}</h1>

      {/* Converter Form */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
              {meta.fromUnit.name} ({meta.fromUnit.symbol})
            </label>
            <input
              id="input"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter value"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {meta.toUnit.name} ({meta.toUnit.symbol})
            </label>
            <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-lg font-semibold">
              {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Table */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
        <h2>Conversion Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-4 font-semibold text-gray-700">
                  {meta.fromUnit.name} ({meta.fromUnit.symbol})
                </th>
                <th className="text-left py-2 px-4 font-semibold text-gray-700">
                  {meta.toUnit.name} ({meta.toUnit.symbol})
                </th>
              </tr>
            </thead>
            <tbody>
              {tableValues.map((value) => (
                <tr key={value} className="border-b border-gray-100">
                  <td className="py-2 px-4">{value}</td>
                  <td className="py-2 px-4">
                    {convert(value).toLocaleString(undefined, { maximumFractionDigits: 6 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Article Content */}
      {meta.articleHtml && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: meta.articleHtml }} />
        </div>
      )}

      {/* Related Links */}
      {relatedLinks.length > 0 && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2>Related Converters</h2>
          <ul className="space-y-2">
            {relatedLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href} className="text-blue-600 hover:text-blue-800">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
