"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download } from "lucide-react"
import type { CommonExample } from "@/lib/convert/generate"

interface CommonTableProps {
  examples: CommonExample[]
  fromUnit: string
  toUnit: string
  fromSymbol: string
  toSymbol: string
  title?: string
  className?: string
}

export function CommonTable({
  examples,
  fromUnit,
  toUnit,
  fromSymbol,
  toSymbol,
  title = "Common Conversions",
  className,
}: CommonTableProps) {
  const [showAll, setShowAll] = useState(false)
  const displayedExamples = showAll ? examples : examples.slice(0, 10)

  const downloadCSV = () => {
    const headers = [`${fromUnit} (${fromSymbol})`, `${toUnit} (${toSymbol})`]
    const rows = examples.map((ex) => [ex.fromFormatted, ex.toFormatted])

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${fromUnit}-to-${toUnit}-conversion-table.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (examples.length === 0) {
    return null
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <Button variant="outline" size="sm" onClick={downloadCSV} className="flex items-center gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          CSV
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">
                  {fromUnit} ({fromSymbol})
                </TableHead>
                <TableHead className="font-semibold">
                  {toUnit} ({toSymbol})
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedExamples.map((example, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono">{example.fromFormatted}</TableCell>
                  <TableCell className="font-mono">{example.toFormatted}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {examples.length > 10 && (
          <div className="mt-4 text-center">
            <Button variant="outline" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : `Show All ${examples.length} Conversions`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CommonTable
