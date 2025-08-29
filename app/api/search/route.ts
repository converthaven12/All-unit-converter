// Edge API route for unit search suggestions

import { type NextRequest, NextResponse } from "next/server"

// This would be loaded from the compiled registry in production
// For now, we'll simulate it with a basic search
const mockUnits: Array<{ key: string; label: string; symbol: string; category: string; aliases?: string[] }> = [
  { key: "meter", label: "meter", symbol: "m", category: "length", aliases: ["metre", "meters", "metres"] },
  { key: "inch", label: "inch", symbol: "in", category: "length", aliases: ["inches", '"'] },
  { key: "foot", label: "foot", symbol: "ft", category: "length", aliases: ["feet", "'"] },
  { key: "kilogram", label: "kilogram", symbol: "kg", category: "mass", aliases: ["kilograms", "kilo"] },
  { key: "pound", label: "pound", symbol: "lb", category: "mass", aliases: ["pounds", "lbs"] },
  { key: "celsius", label: "degree Celsius", symbol: "°C", category: "temperature", aliases: ["centigrade"] },
  { key: "fahrenheit", label: "degree Fahrenheit", symbol: "°F", category: "temperature" },
  { key: "liter", label: "liter", symbol: "L", category: "volume", aliases: ["litre", "liters", "litres"] },
  { key: "gallon-us", label: "US gallon", symbol: "gal", category: "volume", aliases: ["gallons"] },
]

interface SearchResult {
  key: string
  label: string
  symbol: string
  category: string
  url: string
  score: number
}

function calculateScore(query: string, unit: (typeof mockUnits)[0]): number {
  const q = query.toLowerCase()
  let score = 0

  // Exact matches get highest score
  if (unit.symbol.toLowerCase() === q) score += 100
  if (unit.label.toLowerCase() === q) score += 90
  if (unit.key.toLowerCase() === q) score += 85

  // Prefix matches
  if (unit.symbol.toLowerCase().startsWith(q)) score += 80
  if (unit.label.toLowerCase().startsWith(q)) score += 70
  if (unit.key.toLowerCase().startsWith(q)) score += 65

  // Contains matches
  if (unit.symbol.toLowerCase().includes(q)) score += 50
  if (unit.label.toLowerCase().includes(q)) score += 40
  if (unit.key.toLowerCase().includes(q)) score += 35

  // Alias matches
  if (unit.aliases) {
    for (const alias of unit.aliases) {
      if (alias.toLowerCase() === q) score += 85
      if (alias.toLowerCase().startsWith(q)) score += 60
      if (alias.toLowerCase().includes(q)) score += 30
    }
  }

  return score
}

function fuzzySearch(query: string, units: typeof mockUnits, limit = 10): SearchResult[] {
  if (!query || query.length < 1) return []

  const results: SearchResult[] = []

  for (const unit of units) {
    const score = calculateScore(query, unit)
    if (score > 0) {
      results.push({
        key: unit.key,
        label: unit.label,
        symbol: unit.symbol,
        category: unit.category,
        url: `/length/meter-to-${unit.key}`, // This would be generated properly in production
        score,
      })
    }
  }

  // Sort by score (descending) and take top results
  return results.sort((a, b) => b.score - a.score).slice(0, limit)
}

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json({ results: [] })
    }

    const results = fuzzySearch(query, mockUnits)

    return NextResponse.json(
      { results },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    )
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
