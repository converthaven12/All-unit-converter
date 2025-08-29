"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpDown, Copy } from "lucide-react"
import { conversionEngine } from "@/lib/convert/core"
import type { Unit } from "@/lib/convert/types"

interface ConverterWidgetProps {
  fromUnit?: string
  toUnit?: string
  availableUnits: Unit[]
  title?: string
  className?: string
}

export function ConverterWidget({
  fromUnit: initialFromUnit,
  toUnit: initialToUnit,
  availableUnits,
  title = "Unit Converter",
  className,
}: ConverterWidgetProps) {
  const [fromValue, setFromValue] = useState("1")
  const [toValue, setToValue] = useState("")
  const [fromUnit, setFromUnit] = useState(initialFromUnit || availableUnits[0]?.key || "")
  const [toUnit, setToUnit] = useState(initialToUnit || availableUnits[1]?.key || "")
  const [precision, setPrecision] = useState(4)
  const [error, setError] = useState("")

  const convert = () => {
    try {
      setError("")
      const value = Number.parseFloat(fromValue)

      if (Number.isNaN(value)) {
        setToValue("")
        return
      }

      const result = conversionEngine.convert(value, fromUnit, toUnit)
      setToValue(formatResult(result.value, precision))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
      setToValue("")
    }
  }

  const formatResult = (value: number, precision: number): string => {
    if (Math.abs(value) >= 1000000 || (Math.abs(value) < 0.0001 && value !== 0)) {
      return value.toExponential(precision)
    }
    return value.toFixed(precision).replace(/\.?0+$/, "")
  }

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue || "1")
  }

  const copyResult = async () => {
    if (toValue) {
      await navigator.clipboard.writeText(toValue)
    }
  }

  useEffect(() => {
    if (fromValue && fromUnit && toUnit) {
      convert()
    }
  }, [fromValue, fromUnit, toUnit, precision])

  const fromUnitData = availableUnits.find((u) => u.key === fromUnit)
  const toUnitData = availableUnits.find((u) => u.key === toUnit)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* From Unit */}
          <div className="space-y-2">
            <Label htmlFor="from-value">From</Label>
            <div className="space-y-2">
              <Input
                id="from-value"
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                placeholder="Enter value"
                className="text-lg"
              />
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableUnits.map((unit) => (
                    <SelectItem key={unit.key} value={unit.key}>
                      {unit.label} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center md:col-span-2 md:order-3">
            <Button variant="outline" size="sm" onClick={swapUnits} className="flex items-center gap-2 bg-transparent">
              <ArrowUpDown className="h-4 w-4" />
              Swap
            </Button>
          </div>

          {/* To Unit */}
          <div className="space-y-2 md:order-2">
            <Label htmlFor="to-value">To</Label>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="to-value"
                  type="text"
                  value={toValue}
                  readOnly
                  placeholder="Result"
                  className="text-lg pr-10"
                />
                {toValue && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyResult}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableUnits.map((unit) => (
                    <SelectItem key={unit.key} value={unit.key}>
                      {unit.label} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Precision Control */}
        <div className="flex items-center gap-4">
          <Label htmlFor="precision" className="text-sm">
            Precision:
          </Label>
          <Select value={precision.toString()} onValueChange={(v) => setPrecision(Number.parseInt(v))}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4, 5, 6].map((p) => (
                <SelectItem key={p} value={p.toString()}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Error Display */}
        {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}

        {/* Formula Display */}
        {fromUnitData && toUnitData && !error && (
          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
            <strong>Formula:</strong> 1 {fromUnitData.symbol} ={" "}
            {formatResult(conversionEngine.convert(1, fromUnit, toUnit).value, 6)} {toUnitData.symbol}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
