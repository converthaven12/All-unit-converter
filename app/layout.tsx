import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Universal Unit Converter - Convert Any Measurement Instantly",
  description:
    "Free online unit converter for all measurement types. Convert length, weight, temperature, volume, area, speed, pressure, energy, and more.",
  generator: "v0.app",
}

function InteractiveSidebar() {
  return (
    <aside className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">All Converters</h2>
        <nav className="space-y-2">
          {/* Length Conversions */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2 hover:text-blue-600 flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
              <span>Length</span>
              <svg
                className="w-4 h-4 transition-transform group-open:rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </summary>
            <div className="space-y-1 ml-4 mt-2">
              <button className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors">
                Meters ↔ Feet
              </button>
              <button className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors">
                CM ↔ Inches
              </button>
              <button className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors">
                Kilometers ↔ Miles
              </button>
              <button className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors">
                Millimeters ↔ Inches
              </button>
              <button className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors">
                Yards ↔ Meters
              </button>
              <button className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors">
                Nautical Miles ↔ Miles
              </button>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-blue-600 p-1 rounded transition-colors">
                  • Feet to Meters (Most Popular)
                </button>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-blue-600 p-1 rounded transition-colors">
                  • Inches to CM (Trending)
                </button>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-blue-600 p-1 rounded transition-colors">
                  • Miles to KM (Popular)
                </button>
              </div>
            </div>
          </details>

          {/* Weight/Mass Conversions */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2 hover:text-green-600 flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
              <span>Weight & Mass</span>
              <svg
                className="w-4 h-4 transition-transform group-open:rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </summary>
            <div className="space-y-1 ml-4 mt-2">
              <button className="block w-full text-left text-sm text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-md transition-colors">
                Kilograms ↔ Pounds
              </button>
              <button className="block w-full text-left text-sm text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-md transition-colors">
                Grams ↔ Ounces
              </button>
              <button className="block w-full text-left text-sm text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-md transition-colors">
                Tons ↔ Pounds
              </button>
              <button className="block w-full text-left text-sm text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-md transition-colors">
                Stones ↔ Kilograms
              </button>
              <button className="block w-full text-left text-sm text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-md transition-colors">
                Carats ↔ Grams
              </button>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-green-600 p-1 rounded transition-colors">
                  • Pounds to KG (Most Popular)
                </button>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-green-600 p-1 rounded transition-colors">
                  • Ounces to Grams (Trending)
                </button>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-green-600 p-1 rounded transition-colors">
                  • Stones to Pounds (Popular)
                </button>
              </div>
            </div>
          </details>

          {/* Temperature Conversions */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2 hover:text-red-600 flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
              <span>Temperature</span>
              <svg
                className="w-4 h-4 transition-transform group-open:rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </summary>
            <div className="space-y-1 ml-4 mt-2">
              <button className="block w-full text-left text-sm text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-md transition-colors">
                Celsius ↔ Fahrenheit
              </button>
              <button className="block w-full text-left text-sm text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-md transition-colors">
                Kelvin ↔ Celsius
              </button>
              <button className="block w-full text-left text-sm text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-md transition-colors">
                Rankine ↔ Fahrenheit
              </button>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-red-600 p-1 rounded transition-colors">
                  • Celsius to Fahrenheit (Most Popular)
                </button>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-red-600 p-1 rounded transition-colors">
                  • Fahrenheit to Celsius (Trending)
                </button>
              </div>
            </div>
          </details>

          {/* Volume Conversions */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2 hover:text-purple-600 flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
              <span>Volume</span>
              <svg
                className="w-4 h-4 transition-transform group-open:rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </summary>
            <div className="space-y-1 ml-4 mt-2">
              <button className="block w-full text-left text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-2 rounded-md transition-colors">
                Liters ↔ Gallons
              </button>
              <button className="block w-full text-left text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-2 rounded-md transition-colors">
                Milliliters ↔ Fluid Ounces
              </button>
              <button className="block w-full text-left text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-2 rounded-md transition-colors">
                Cubic Meters ↔ Cubic Feet
              </button>
              <button className="block w-full text-left text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-2 rounded-md transition-colors">
                Cups ↔ Milliliters
              </button>
              <button className="block w-full text-left text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-2 rounded-md transition-colors">
                Pints ↔ Liters
              </button>
              <button className="block w-full text-left text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-2 rounded-md transition-colors">
                Quarts ↔ Liters
              </button>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-purple-600 p-1 rounded transition-colors">
                  • Liters to Gallons (Most Popular)
                </button>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-purple-600 p-1 rounded transition-colors">
                  • ML to Fluid Ounces (Trending)
                </button>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-purple-600 p-1 rounded transition-colors">
                  • Cups to ML (Popular)
                </button>
              </div>
            </div>
          </details>

          {/* Area Conversions */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2 hover:text-yellow-600 flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
              <span>Area</span>
              <svg
                className="w-4 h-4 transition-transform group-open:rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </summary>
            <div className="space-y-1 ml-4 mt-2">
              <button className="block w-full text-left text-sm text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 p-2 rounded-md transition-colors">
                Square Meters ↔ Square Feet
              </button>
              <button className="block w-full text-left text-sm text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 p-2 rounded-md transition-colors">
                Acres ↔ Square Meters
              </button>
              <button className="block w-full text-left text-sm text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 p-2 rounded-md transition-colors">
                Hectares ↔ Acres
              </button>
              <button className="block w-full text-left text-sm text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 p-2 rounded-md transition-colors">
                Square Kilometers ↔ Square Miles
              </button>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-yellow-600 p-1 rounded transition-colors">
                  • Sq Feet to Sq Meters (Most Popular)
                </button>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-yellow-600 p-1 rounded transition-colors">
                  • Acres to Hectares (Trending)
                </button>
              </div>
            </div>
          </details>

          {/* Speed Conversions */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2 hover:text-indigo-600 flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
              <span>Speed</span>
              <svg
                className="w-4 h-4 transition-transform group-open:rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </summary>
            <div className="space-y-1 ml-4 mt-2">
              <button className="block w-full text-left text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 p-2 rounded-md transition-colors">
                KM/H ↔ MPH
              </button>
              <button className="block w-full text-left text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 p-2 rounded-md transition-colors">
                M/S ↔ FT/S
              </button>
              <button className="block w-full text-left text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 p-2 rounded-md transition-colors">
                Knots ↔ MPH
              </button>
              <button className="block w-full text-left text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 p-2 rounded-md transition-colors">
                Mach ↔ KM/H
              </button>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-indigo-600 p-1 rounded transition-colors">
                  • KM/H to MPH (Most Popular)
                </button>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-indigo-600 p-1 rounded transition-colors">
                  • MPH to KM/H (Trending)
                </button>
              </div>
            </div>
          </details>

          {/* Pressure Conversions */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2 hover:text-pink-600 flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
              <span>Pressure</span>
              <svg
                className="w-4 h-4 transition-transform group-open:rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </summary>
            <div className="space-y-1 ml-4 mt-2">
              <button className="block w-full text-left text-sm text-pink-600 hover:text-pink-800 hover:bg-pink-50 p-2 rounded-md transition-colors">
                Pascal ↔ PSI
              </button>
              <button className="block w-full text-left text-sm text-pink-600 hover:text-pink-800 hover:bg-pink-50 p-2 rounded-md transition-colors">
                Bar ↔ Atmosphere
              </button>
              <button className="block w-full text-left text-sm text-pink-600 hover:text-pink-800 hover:bg-pink-50 p-2 rounded-md transition-colors">
                Torr ↔ mmHg
              </button>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-pink-600 p-1 rounded transition-colors">
                  • PSI to Bar (Most Popular)
                </button>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-pink-600 p-1 rounded transition-colors">
                  • Bar to PSI (Trending)
                </button>
              </div>
            </div>
          </details>

          {/* Energy Conversions */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2 hover:text-orange-600 flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
              <span>Energy</span>
              <svg
                className="w-4 h-4 transition-transform group-open:rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </summary>
            <div className="space-y-1 ml-4 mt-2">
              <button className="block w-full text-left text-sm text-orange-600 hover:text-orange-800 hover:bg-orange-50 p-2 rounded-md transition-colors">
                Joules ↔ Calories
              </button>
              <button className="block w-full text-left text-sm text-orange-600 hover:text-orange-800 hover:bg-orange-50 p-2 rounded-md transition-colors">
                kWh ↔ BTU
              </button>
              <button className="block w-full text-left text-sm text-orange-600 hover:text-orange-800 hover:bg-orange-50 p-2 rounded-md transition-colors">
                Watts ↔ Horsepower
              </button>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-orange-600 p-1 rounded transition-colors">
                  • Calories to Joules (Most Popular)
                </button>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-orange-600 p-1 rounded transition-colors">
                  • kWh to BTU (Trending)
                </button>
              </div>
            </div>
          </details>

          {/* Data Storage Conversions */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2 hover:text-cyan-600 flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
              <span>Data Storage</span>
              <svg
                className="w-4 h-4 transition-transform group-open:rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </summary>
            <div className="space-y-1 ml-4 mt-2">
              <button className="block w-full text-left text-sm text-cyan-600 hover:text-cyan-800 hover:bg-cyan-50 p-2 rounded-md transition-colors">
                Bytes ↔ Bits
              </button>
              <button className="block w-full text-left text-sm text-cyan-600 hover:text-cyan-800 hover:bg-cyan-50 p-2 rounded-md transition-colors">
                KB ↔ MB
              </button>
              <button className="block w-full text-left text-sm text-cyan-600 hover:text-cyan-800 hover:bg-cyan-50 p-2 rounded-md transition-colors">
                GB ↔ TB
              </button>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-cyan-600 p-1 rounded transition-colors">
                  • GB to MB (Most Popular)
                </button>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-cyan-600 p-1 rounded transition-colors">
                  • MB to KB (Trending)
                </button>
              </div>
            </div>
          </details>

          {/* Time Conversions */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2 hover:text-teal-600 flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
              <span>Time</span>
              <svg
                className="w-4 h-4 transition-transform group-open:rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </summary>
            <div className="space-y-1 ml-4 mt-2">
              <button className="block w-full text-left text-sm text-teal-600 hover:text-teal-800 hover:bg-teal-50 p-2 rounded-md transition-colors">
                Hours ↔ Minutes
              </button>
              <button className="block w-full text-left text-sm text-teal-600 hover:text-teal-800 hover:bg-teal-50 p-2 rounded-md transition-colors">
                Days ↔ Hours
              </button>
              <button className="block w-full text-left text-sm text-teal-600 hover:text-teal-800 hover:bg-teal-50 p-2 rounded-md transition-colors">
                Years ↔ Days
              </button>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-teal-600 p-1 rounded transition-colors">
                  • Hours to Minutes (Most Popular)
                </button>
                <button className="block w-full text-left text-xs text-gray-600 hover:text-teal-600 p-1 rounded transition-colors">
                  • Days to Hours (Trending)
                </button>
              </div>
            </div>
          </details>
        </nav>
      </div>
    </aside>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <div className="flex min-h-screen">
          <InteractiveSidebar />
          <main className="flex-1">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </main>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
