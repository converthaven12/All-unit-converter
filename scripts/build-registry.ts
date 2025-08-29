// Build script to compile seed data into a master registry

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "fs"
import { join } from "path"
import type { Unit, Category } from "../lib/convert/types"
import { SI_PREFIXES, BINARY_PREFIXES, DECIMAL_DATA_PREFIXES } from "../lib/convert/prefixes"

interface SeedFile {
  category: Category
  units: Array<Unit & { allowPrefixes?: boolean; allowBinaryPrefixes?: boolean }>
}

interface CompiledRegistry {
  categories: Category[]
  units: Unit[]
  metadata: {
    buildTime: string
    totalUnits: number
    totalCategories: number
    prefixedUnits: number
  }
}

function expandPrefixedUnits(baseUnit: Unit & { allowPrefixes?: boolean; allowBinaryPrefixes?: boolean }): Unit[] {
  const units: Unit[] = [baseUnit]

  // Add SI prefixes if allowed
  if (baseUnit.allowPrefixes) {
    for (const prefix of SI_PREFIXES) {
      // Skip prefixes that would conflict with existing units
      if (prefix.symbol === "k" && baseUnit.symbol === "g") continue // kg already exists
      if (prefix.symbol === "da" && baseUnit.category === "data") continue // Avoid confusion in data units

      units.push({
        key: `${prefix.name}-${baseUnit.key}`,
        label: `${prefix.name}${baseUnit.label}`,
        symbol: `${prefix.symbol}${baseUnit.symbol}`,
        dimension: baseUnit.dimension,
        factorToBase: baseUnit.factorToBase * prefix.factor,
        offsetToBase: baseUnit.offsetToBase,
        system: baseUnit.system,
        category: baseUnit.category,
        aliases: baseUnit.aliases?.map((alias) => `${prefix.symbol}${alias}`),
      })
    }
  }

  // Add binary prefixes for data units if allowed
  if (baseUnit.allowBinaryPrefixes && baseUnit.category === "data") {
    for (const prefix of BINARY_PREFIXES) {
      units.push({
        key: `${prefix.name}-${baseUnit.key}`,
        label: `${prefix.name}${baseUnit.label}`,
        symbol: `${prefix.symbol}${baseUnit.symbol}`,
        dimension: baseUnit.dimension,
        factorToBase: baseUnit.factorToBase * prefix.factor,
        system: baseUnit.system,
        category: baseUnit.category,
        aliases: baseUnit.aliases?.map((alias) => `${prefix.symbol}${alias}`),
      })
    }

    // Also add decimal prefixes for data units (common usage)
    for (const prefix of DECIMAL_DATA_PREFIXES) {
      if (prefix.symbol === "k" && baseUnit.symbol === "B") {
        // Special case: kB vs KB
        units.push({
          key: `kilo-${baseUnit.key}-decimal`,
          label: `kilo${baseUnit.label} (decimal)`,
          symbol: `k${baseUnit.symbol}`,
          dimension: baseUnit.dimension,
          factorToBase: baseUnit.factorToBase * prefix.factor,
          system: baseUnit.system,
          category: baseUnit.category,
          aliases: [`k${baseUnit.symbol.toLowerCase()}`],
        })
      } else {
        units.push({
          key: `${prefix.name}-${baseUnit.key}-decimal`,
          label: `${prefix.name}${baseUnit.label} (decimal)`,
          symbol: `${prefix.symbol}${baseUnit.symbol}`,
          dimension: baseUnit.dimension,
          factorToBase: baseUnit.factorToBase * prefix.factor,
          system: baseUnit.system,
          category: baseUnit.category,
          aliases: baseUnit.aliases?.map((alias) => `${prefix.symbol}${alias}`),
        })
      }
    }
  }

  return units
}

function buildRegistry(): CompiledRegistry {
  const seedDir = join(process.cwd(), "data", "seed")
  const seedFiles = readdirSync(seedDir).filter((file) => file.endsWith(".json"))

  const categories: Category[] = []
  const allUnits: Unit[] = []
  let prefixedUnitsCount = 0

  for (const file of seedFiles) {
    const filePath = join(seedDir, file)
    const content = readFileSync(filePath, "utf-8")
    const seedData: SeedFile = JSON.parse(content)

    categories.push(seedData.category)

    for (const baseUnit of seedData.units) {
      const expandedUnits = expandPrefixedUnits(baseUnit)
      allUnits.push(...expandedUnits)
      prefixedUnitsCount += expandedUnits.length - 1 // Subtract the base unit
    }
  }

  return {
    categories,
    units: allUnits,
    metadata: {
      buildTime: new Date().toISOString(),
      totalUnits: allUnits.length,
      totalCategories: categories.length,
      prefixedUnits: prefixedUnitsCount,
    },
  }
}

function main() {
  console.log("Building unit registry...")

  try {
    const registry = buildRegistry()

    // Ensure output directory exists
    const outputDir = join(process.cwd(), "data", "compiled")
    mkdirSync(outputDir, { recursive: true })

    // Write compiled registry
    const outputPath = join(outputDir, "registry.json")
    writeFileSync(outputPath, JSON.stringify(registry, null, 2))

    console.log(`✅ Registry built successfully!`)
    console.log(`📊 Stats:`)
    console.log(`   - Categories: ${registry.metadata.totalCategories}`)
    console.log(`   - Total units: ${registry.metadata.totalUnits}`)
    console.log(`   - Prefixed units: ${registry.metadata.prefixedUnits}`)
    console.log(`   - Output: ${outputPath}`)
  } catch (error) {
    console.error("❌ Failed to build registry:", error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

export { buildRegistry, expandPrefixedUnits }
