// Edge API route for currency conversion with caching

import { NextRequest, NextResponse } from "next/server"

interface ExchangeRateResponse {
  success: boolean
  timestamp: number
  base: string
  date: string
  rates: Record<string, number>
}

interface CurrencyConversionRequest {
  from: string
  to: string
  amount: number
}

interface CurrencyConversionResponse {
  success: boolean
  from: string
  to: string
  amount: number
  result: number
  rate: number
  timestamp: number
  cached?: boolean
}

// In-memory cache for exchange rates (in production, use Redis or similar)
const cache = new Map<string, { data: ExchangeRateResponse; timestamp: number }>()
const CACHE_DURATION = 3600 * 1000 // 1 hour in milliseconds

async function fetchExchangeRates(base = "USD"): Promise<ExchangeRateResponse> {
  const cacheKey = `rates_${base}`
  const cached = cache.get(cacheKey)

  // Check if we have valid cached data
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }

  try {
    // Using exchangerate.host API (free tier)
    const response = await fetch(`https://api.exchangerate.host/latest?base=${base}`, {
      headers: {
        "User-Agent": "UnitConverter/1.0",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: ExchangeRateResponse = await response.json()

    if (!data.success) {
      throw new Error("Exchange rate API returned error")
    }

    // Cache the result
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    })

    return data
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error)

    // Return cached data if available, even if stale
    if (cached) {
      console.warn("Using stale exchange rate data")
      return cached.data
    }

    throw error
  }
}

function convertCurrency(amount: number, fromRate: number, toRate: number): number {
  // Convert from source currency to base (USD), then to target currency
  const baseAmount = amount / fromRate
  return baseAmount * toRate
}

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get("from")?.toUpperCase()
    const to = searchParams.get("to")?.toUpperCase()
    const amountStr = searchParams.get("amount")

    if (!from || !to) {
      return NextResponse.json({ error: "Missing 'from' or 'to' currency" }, { status: 400 })
    }

    const amount = amountStr ? Number.parseFloat(amountStr) : 1

    if (Number.isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    // Get exchange rates (base USD)
    const rates = await fetchExchangeRates("USD")

    // Handle USD as base currency
    const fromRate = from === "USD" ? 1 : rates.rates[from]
    const toRate = to === "USD" ? 1 : rates.rates[to]

    if (fromRate === undefined) {
      return NextResponse.json({ error: `Unsupported currency: ${from}` }, { status: 400 })
    }

    if (toRate === undefined) {
      return NextResponse.json({ error: `Unsupported currency: ${to}` }, { status: 400 })
    }

    const result = convertCurrency(amount, fromRate, toRate)
    const rate = toRate / fromRate

    const response: CurrencyConversionResponse = {
      success: true,
      from,
      to,
      amount,
      result,
      rate,
      timestamp: rates.timestamp,
      cached: cache.has(`rates_USD`),
    }

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    })
  } catch (error) {
    console.error("Currency conversion error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Currency conversion failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CurrencyConversionRequest = await request.json()
    const { from, to, amount } = body

    if (!from || !to || typeof amount !== "number") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    // Redirect to GET endpoint for consistency
    const url = new URL(request.url)
    url.searchParams.set("from", from.toUpperCase())
    url.searchParams.set("to", to.toUpperCase())
    url.searchParams.set("amount", amount.toString())

    const response = await GET(new NextRequest(url))
    return response
  } catch (error) {
    console.error("Currency conversion POST error:", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
