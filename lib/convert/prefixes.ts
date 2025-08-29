// SI prefixes and prefix utilities

import type { Prefix } from "./types"

export const SI_PREFIXES: Prefix[] = [
  // Large prefixes
  { symbol: "Y", name: "yotta", factor: 1e24 },
  { symbol: "Z", name: "zetta", factor: 1e21 },
  { symbol: "E", name: "exa", factor: 1e18 },
  { symbol: "P", name: "peta", factor: 1e15 },
  { symbol: "T", name: "tera", factor: 1e12 },
  { symbol: "G", name: "giga", factor: 1e9 },
  { symbol: "M", name: "mega", factor: 1e6 },
  { symbol: "k", name: "kilo", factor: 1e3 },
  { symbol: "h", name: "hecto", factor: 1e2 },
  { symbol: "da", name: "deca", factor: 1e1 },

  // Small prefixes
  { symbol: "d", name: "deci", factor: 1e-1 },
  { symbol: "c", name: "centi", factor: 1e-2 },
  { symbol: "m", name: "milli", factor: 1e-3 },
  { symbol: "μ", name: "micro", factor: 1e-6 },
  { symbol: "n", name: "nano", factor: 1e-9 },
  { symbol: "p", name: "pico", factor: 1e-12 },
  { symbol: "f", name: "femto", factor: 1e-15 },
  { symbol: "a", name: "atto", factor: 1e-18 },
  { symbol: "z", name: "zepto", factor: 1e-21 },
  { symbol: "y", name: "yocto", factor: 1e-24 },
]

// Binary prefixes for data units
export const BINARY_PREFIXES: Prefix[] = [
  { symbol: "Ki", name: "kibi", factor: 1024 },
  { symbol: "Mi", name: "mebi", factor: 1024 ** 2 },
  { symbol: "Gi", name: "gibi", factor: 1024 ** 3 },
  { symbol: "Ti", name: "tebi", factor: 1024 ** 4 },
  { symbol: "Pi", name: "pebi", factor: 1024 ** 5 },
  { symbol: "Ei", name: "exbi", factor: 1024 ** 6 },
  { symbol: "Zi", name: "zebi", factor: 1024 ** 7 },
  { symbol: "Yi", name: "yobi", factor: 1024 ** 8 },
]

// Decimal prefixes for data units (common usage)
export const DECIMAL_DATA_PREFIXES: Prefix[] = [
  { symbol: "k", name: "kilo", factor: 1000 },
  { symbol: "M", name: "mega", factor: 1000 ** 2 },
  { symbol: "G", name: "giga", factor: 1000 ** 3 },
  { symbol: "T", name: "tera", factor: 1000 ** 4 },
  { symbol: "P", name: "peta", factor: 1000 ** 5 },
  { symbol: "E", name: "exa", factor: 1000 ** 6 },
  { symbol: "Z", name: "zetta", factor: 1000 ** 7 },
  { symbol: "Y", name: "yotta", factor: 1000 ** 8 },
]

export function getPrefixBySymbol(symbol: string, prefixes: Prefix[] = SI_PREFIXES): Prefix | undefined {
  return prefixes.find((p) => p.symbol === symbol)
}

export function extractPrefix(
  unitSymbol: string,
  prefixes: Prefix[] = SI_PREFIXES,
): { prefix?: Prefix; baseSymbol: string } {
  // Sort prefixes by symbol length (longest first) to match 'da' before 'd'
  const sortedPrefixes = [...prefixes].sort((a, b) => b.symbol.length - a.symbol.length)

  for (const prefix of sortedPrefixes) {
    if (unitSymbol.startsWith(prefix.symbol)) {
      return {
        prefix,
        baseSymbol: unitSymbol.slice(prefix.symbol.length),
      }
    }
  }

  return { baseSymbol: unitSymbol }
}
