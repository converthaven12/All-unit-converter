import { Suspense } from "react"
import type { Metadata } from "next"
import { readFileSync } from "fs"
import { join } from "path"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Database, Zap } from "lucide-react"
import type { Unit, Category } from "@/lib/convert/types"

export const metadata: Metadata = {
  title: "Unit Registry Admin - Unit Converter",
  description: "Browse and search the complete unit registry database",
  robots: "noindex, nofollow",
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

function getRegistry(): CompiledRegistry {
  try {
    const registryPath = join(process.cwd(), "data", "compiled", "registry.json")
    const content = readFileSync(registryPath, "utf-8")
    return JSON.parse(content)
  } catch (error) {
    // Fallback to empty registry if file doesn't exist
    return {
      categories: [],
      units: [],
      metadata: {
        buildTime: new Date().toISOString(),
        totalUnits: 0,
        totalCategories: 0,
        prefixedUnits: 0,
      },
    }
  }
}

function formatDimension(dimension: Record<string, number>): string {
  const parts: string[] = []

  for (const [symbol, exponent] of Object.entries(dimension)) {
    if (exponent === 0) continue
    if (exponent === 1) {
      parts.push(symbol)
    } else {
      parts.push(`${symbol}^${exponent}`)
    }
  }

  return parts.length > 0 ? parts.join("·") : "dimensionless"
}

function AdminUnitsContent() {
  const registry = getRegistry()

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Unit Registry Admin</h1>
        <p className="text-muted-foreground mb-6">
          Browse and search the complete unit registry database. This is a read-only view of all units, categories, and
          their conversion factors.
        </p>

        {/* Registry Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Units</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{registry.metadata.totalUnits.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{registry.metadata.totalCategories}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prefixed Units</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{registry.metadata.prefixedUnits.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Built</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">{new Date(registry.metadata.buildTime).toLocaleDateString()}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search units by name, symbol, or category..." className="pl-10" id="unit-search" />
        </div>
      </div>

      {/* Units Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Units</CardTitle>
          <CardDescription>Complete registry of all units with their conversion factors and metadata</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Key</TableHead>
                  <TableHead>Label</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Dimension</TableHead>
                  <TableHead>Factor to Base</TableHead>
                  <TableHead>Offset</TableHead>
                  <TableHead>System</TableHead>
                  <TableHead>Aliases</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registry.units.slice(0, 100).map((unit) => (
                  <TableRow key={unit.key}>
                    <TableCell className="font-mono text-sm">{unit.key}</TableCell>
                    <TableCell>{unit.label}</TableCell>
                    <TableCell className="font-mono">{unit.symbol}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{unit.category}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{formatDimension(unit.dimension)}</TableCell>
                    <TableCell className="font-mono text-xs">{unit.factorToBase.toExponential(3)}</TableCell>
                    <TableCell className="font-mono text-xs">{unit.offsetToBase || "0"}</TableCell>
                    <TableCell>{unit.system && <Badge variant="outline">{unit.system}</Badge>}</TableCell>
                    <TableCell className="font-mono text-xs">{unit.aliases?.join(", ") || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {registry.units.length > 100 && (
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Showing first 100 units of {registry.metadata.totalUnits.toLocaleString()} total. Use search to find
              specific units.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Categories Overview */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>All unit categories in the registry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {registry.categories.map((category) => (
              <div key={category.key} className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                <Badge variant="secondary">
                  {registry.units.filter((u) => u.category === category.key).length} units
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AdminUnitsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading registry...</div>}>
      <AdminUnitsContent />
    </Suspense>
  )
}
