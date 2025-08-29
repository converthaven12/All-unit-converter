// Client-side search utilities and server-side filtering

import type { Unit } from "./convert/types"

export interface SearchResult {
  key: string
  label: string
  symbol: string
  category: string
  url: string
  score: number
  type: "unit" | "converter" | "category"
}

export interface SearchIndex {
  units: Array<{
    key: string
    label: string
    symbol: string
    category: string
    aliases: string[]
  }>
  converters: Array<{
    slug: string
    title: string
    fromUnit: string
    toUnit: string
    category: string
  }>
  categories: Array<{
    key: string
    name: string
    description: string
  }>
}

// Fuzzy search scoring algorithm
export function calculateFuzzyScore(query: string, target: string, boost = 1): number {
  const q = query.toLowerCase().trim()
  const t = target.toLowerCase()

  if (!q || !t) return 0

  let score = 0

  // Exact match gets highest score
  if (t === q) return 100 * boost

  // Prefix match
  if (t.startsWith(q)) score += 80 * boost

  // Word boundary match
  const words = t.split(/\s+/)
  for (const word of words) {
    if (word.startsWith(q)) score += 60 * boost
    if (word === q) score += 90 * boost
  }

  // Contains match
  if (t.includes(q)) score += 40 * boost

  // Character proximity scoring (simple Levenshtein-like)
  if (score === 0) {
    const proximity = calculateProximity(q, t)
    if (proximity > 0.6) score += proximity * 30 * boost
  }

  return score
}

function calculateProximity(a: string, b: string): number {
  if (a.length === 0) return b.length === 0 ? 1 : 0
  if (b.length === 0) return 0

  const matrix: number[][] = []

  // Initialize matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  // Fill matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
      }
    }
  }

  const distance = matrix[b.length][a.length]
  const maxLength = Math.max(a.length, b.length)
  return 1 - distance / maxLength
}

export function searchIndex(query: string, index: SearchIndex, limit = 10): SearchResult[] {
  if (!query || query.length < 1) return []

  const results: SearchResult[] = []

  // Search units
  for (const unit of index.units) {
    let maxScore = 0

    // Score against label, symbol, and aliases
    maxScore = Math.max(maxScore, calculateFuzzyScore(query, unit.label, 1.2))
    maxScore = Math.max(maxScore, calculateFuzzyScore(query, unit.symbol, 1.5))

    for (const alias of unit.aliases) {
      maxScore = Math.max(maxScore, calculateFuzzyScore(query, alias, 1.0))
    }

    if (maxScore > 10) {
      results.push({
        key: unit.key,
        label: unit.label,
        symbol: unit.symbol,
        category: unit.category,
        url: `/${unit.category}`, // Will be updated with proper converter URL
        score: maxScore,
        type: "unit",
      })
    }
  }

  // Search converters
  for (const converter of index.converters) {
    const score = calculateFuzzyScore(query, converter.title, 0.8)

    if (score > 10) {
      results.push({
        key: converter.slug,
        label: converter.title,
        symbol: "",
        category: converter.category,
        url: `/${converter.category}/${converter.slug}`,
        score,
        type: "converter",
      })
    }
  }

  // Search categories
  for (const category of index.categories) {
    let maxScore = 0
    maxScore = Math.max(maxScore, calculateFuzzyScore(query, category.name, 0.9))
    maxScore = Math.max(maxScore, calculateFuzzyScore(query, category.description, 0.6))

    if (maxScore > 10) {
      results.push({
        key: category.key,
        label: category.name,
        symbol: "",
        category: category.key,
        url: `/${category.key}`,
        score: maxScore,
        type: "category",
      })
    }
  }

  // Sort by score and return top results
  return results.sort((a, b) => b.score - a.score).slice(0, limit)
}

// Debounce utility for search input
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout | null = null

  return ((...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as T
}

// Server-side search filtering (for API routes)
export function filterUnits(units: Unit[], query: string, limit = 20): Unit[] {
  if (!query) return units.slice(0, limit)

  const scored = units
    .map((unit) => {
      let score = 0
      score = Math.max(score, calculateFuzzyScore(query, unit.label))
      score = Math.max(score, calculateFuzzyScore(query, unit.symbol, 1.2))

      if (unit.aliases) {
        for (const alias of unit.aliases) {
          score = Math.max(score, calculateFuzzyScore(query, alias))
        }
      }

      return { unit, score }
    })
    .filter(({ score }) => score > 5)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map(({ unit }) => unit)
}

// Build search index from registry data
export function buildSearchIndex(units: Unit[], converters: any[], categories: any[]): SearchIndex {
  return {
    units: units.map((unit) => ({
      key: unit.key,
      label: unit.label,
      symbol: unit.symbol,
      category: unit.category,
      aliases: unit.aliases || [],
    })),
    converters: converters.map((conv) => ({
      slug: conv.slug,
      title: conv.title,
      fromUnit: conv.fromUnit,
      toUnit: conv.toUnit,
      category: conv.category,
    })),
    categories: categories.map((cat) => ({
      key: cat.key,
      name: cat.name,
      description: cat.description,
    })),
  }
}
