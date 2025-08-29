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
          <aside className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">All Converters</h2>
              <nav className="space-y-2">
                {/* Length Conversions */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Length</h3>
                  <div className="space-y-1 ml-2">
                    <a href="#length" className="block text-sm text-blue-600 hover:text-blue-800">
                      Meters ↔ Feet
                    </a>
                    <a href="#length" className="block text-sm text-blue-600 hover:text-blue-800">
                      CM ↔ Inches
                    </a>
                    <a href="#length" className="block text-sm text-blue-600 hover:text-blue-800">
                      Kilometers ↔ Miles
                    </a>
                    <a href="#length" className="block text-sm text-blue-600 hover:text-blue-800">
                      Millimeters ↔ Inches
                    </a>
                    <a href="#length" className="block text-sm text-blue-600 hover:text-blue-800">
                      Yards ↔ Meters
                    </a>
                    <a href="#length" className="block text-sm text-blue-600 hover:text-blue-800">
                      Nautical Miles ↔ Miles
                    </a>
                  </div>
                </div>

                {/* Weight/Mass Conversions */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Weight & Mass</h3>
                  <div className="space-y-1 ml-2">
                    <a href="#weight" className="block text-sm text-green-600 hover:text-green-800">
                      Kilograms ↔ Pounds
                    </a>
                    <a href="#weight" className="block text-sm text-green-600 hover:text-green-800">
                      Grams ↔ Ounces
                    </a>
                    <a href="#weight" className="block text-sm text-green-600 hover:text-green-800">
                      Tons ↔ Pounds
                    </a>
                    <a href="#weight" className="block text-sm text-green-600 hover:text-green-800">
                      Stones ↔ Kilograms
                    </a>
                    <a href="#weight" className="block text-sm text-green-600 hover:text-green-800">
                      Carats ↔ Grams
                    </a>
                  </div>
                </div>

                {/* Temperature Conversions */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Temperature</h3>
                  <div className="space-y-1 ml-2">
                    <a href="#temperature" className="block text-sm text-red-600 hover:text-red-800">
                      Celsius ↔ Fahrenheit
                    </a>
                    <a href="#temperature" className="block text-sm text-red-600 hover:text-red-800">
                      Kelvin ↔ Celsius
                    </a>
                    <a href="#temperature" className="block text-sm text-red-600 hover:text-red-800">
                      Rankine ↔ Fahrenheit
                    </a>
                  </div>
                </div>

                {/* Volume Conversions */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Volume</h3>
                  <div className="space-y-1 ml-2">
                    <a href="#volume" className="block text-sm text-purple-600 hover:text-purple-800">
                      Liters ↔ Gallons
                    </a>
                    <a href="#volume" className="block text-sm text-purple-600 hover:text-purple-800">
                      Milliliters ↔ Fluid Ounces
                    </a>
                    <a href="#volume" className="block text-sm text-purple-600 hover:text-purple-800">
                      Cubic Meters ↔ Cubic Feet
                    </a>
                    <a href="#volume" className="block text-sm text-purple-600 hover:text-purple-800">
                      Cups ↔ Milliliters
                    </a>
                    <a href="#volume" className="block text-sm text-purple-600 hover:text-purple-800">
                      Pints ↔ Liters
                    </a>
                    <a href="#volume" className="block text-sm text-purple-600 hover:text-purple-800">
                      Quarts ↔ Liters
                    </a>
                  </div>
                </div>

                {/* Area Conversions */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Area</h3>
                  <div className="space-y-1 ml-2">
                    <a href="#area" className="block text-sm text-yellow-600 hover:text-yellow-800">
                      Square Meters ↔ Square Feet
                    </a>
                    <a href="#area" className="block text-sm text-yellow-600 hover:text-yellow-800">
                      Acres ↔ Square Meters
                    </a>
                    <a href="#area" className="block text-sm text-yellow-600 hover:text-yellow-800">
                      Hectares ↔ Acres
                    </a>
                    <a href="#area" className="block text-sm text-yellow-600 hover:text-yellow-800">
                      Square Kilometers ↔ Square Miles
                    </a>
                  </div>
                </div>

                {/* Speed Conversions */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Speed</h3>
                  <div className="space-y-1 ml-2">
                    <a href="#speed" className="block text-sm text-indigo-600 hover:text-indigo-800">
                      KM/H ↔ MPH
                    </a>
                    <a href="#speed" className="block text-sm text-indigo-600 hover:text-indigo-800">
                      M/S ↔ FT/S
                    </a>
                    <a href="#speed" className="block text-sm text-indigo-600 hover:text-indigo-800">
                      Knots ↔ MPH
                    </a>
                    <a href="#speed" className="block text-sm text-indigo-600 hover:text-indigo-800">
                      Mach ↔ KM/H
                    </a>
                  </div>
                </div>

                {/* Pressure Conversions */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Pressure</h3>
                  <div className="space-y-1 ml-2">
                    <a href="#pressure" className="block text-sm text-pink-600 hover:text-pink-800">
                      Pascal ↔ PSI
                    </a>
                    <a href="#pressure" className="block text-sm text-pink-600 hover:text-pink-800">
                      Bar ↔ Atmosphere
                    </a>
                    <a href="#pressure" className="block text-sm text-pink-600 hover:text-pink-800">
                      Torr ↔ mmHg
                    </a>
                  </div>
                </div>

                {/* Energy Conversions */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Energy</h3>
                  <div className="space-y-1 ml-2">
                    <a href="#energy" className="block text-sm text-orange-600 hover:text-orange-800">
                      Joules ↔ Calories
                    </a>
                    <a href="#energy" className="block text-sm text-orange-600 hover:text-orange-800">
                      kWh ↔ BTU
                    </a>
                    <a href="#energy" className="block text-sm text-orange-600 hover:text-orange-800">
                      Watts ↔ Horsepower
                    </a>
                  </div>
                </div>

                {/* Data Storage Conversions */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Data Storage</h3>
                  <div className="space-y-1 ml-2">
                    <a href="#data" className="block text-sm text-cyan-600 hover:text-cyan-800">
                      Bytes ↔ Bits
                    </a>
                    <a href="#data" className="block text-sm text-cyan-600 hover:text-cyan-800">
                      KB ↔ MB
                    </a>
                    <a href="#data" className="block text-sm text-cyan-600 hover:text-cyan-800">
                      GB ↔ TB
                    </a>
                  </div>
                </div>

                {/* Time Conversions */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Time</h3>
                  <div className="space-y-1 ml-2">
                    <a href="#time" className="block text-sm text-teal-600 hover:text-teal-800">
                      Hours ↔ Minutes
                    </a>
                    <a href="#time" className="block text-sm text-teal-600 hover:text-teal-800">
                      Days ↔ Hours
                    </a>
                    <a href="#time" className="block text-sm text-teal-600 hover:text-teal-800">
                      Years ↔ Days
                    </a>
                  </div>
                </div>
              </nav>
            </div>
          </aside>

          <main className="flex-1">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </main>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
