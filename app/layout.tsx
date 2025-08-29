import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Link from "next/link"
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
              <Link
                href="/convert/meters-to-feet"
                className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors"
              >
                Meters ↔ Feet
              </Link>
              <Link
                href="/convert/cm-to-inches"
                className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors"
              >
                CM ↔ Inches
              </Link>
              <Link
                href="/convert/kilometers-to-miles"
                className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors"
              >
                Kilometers ↔ Miles
              </Link>
              <Link
                href="/convert/millimeters-to-inches"
                className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors"
              >
                Millimeters ↔ Inches
              </Link>
              <Link
                href="/convert/yards-to-meters"
                className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors"
              >
                Yards ↔ Meters
              </Link>
              <Link
                href="/convert/nautical-miles-to-miles"
                className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors"
              >
                Nautical Miles ↔ Miles
              </Link>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <Link
                  href="/convert/feet-to-meters"
                  className="block w-full text-left text-xs text-gray-600 hover:text-blue-600 p-1 rounded transition-colors"
                >
                  • Feet to Meters (Most Popular)
                </Link>
                <Link
                  href="/convert/inches-to-cm"
                  className="block w-full text-left text-xs text-gray-600 hover:text-blue-600 p-1 rounded transition-colors"
                >
                  • Inches to CM (Trending)
                </Link>
                <Link
                  href="/convert/miles-to-km"
                  className="block w-full text-left text-xs text-gray-600 hover:text-blue-600 p-1 rounded transition-colors"
                >
                  • Miles to KM (Popular)
                </Link>
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
              <Link
                href="/convert/kilograms-to-pounds"
                className="block w-full text-left text-sm text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-md transition-colors"
              >
                Kilograms ↔ Pounds
              </Link>
              <Link
                href="/convert/grams-to-ounces"
                className="block w-full text-left text-sm text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-md transition-colors"
              >
                Grams ↔ Ounces
              </Link>
              <Link
                href="/convert/tons-to-pounds"
                className="block w-full text-left text-sm text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-md transition-colors"
              >
                Tons ↔ Pounds
              </Link>
              <Link
                href="/convert/stones-to-kilograms"
                className="block w-full text-left text-sm text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-md transition-colors"
              >
                Stones ↔ Kilograms
              </Link>
              <Link
                href="/convert/carats-to-grams"
                className="block w-full text-left text-sm text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-md transition-colors"
              >
                Carats ↔ Grams
              </Link>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <Link
                  href="/convert/pounds-to-kg"
                  className="block w-full text-left text-xs text-gray-600 hover:text-green-600 p-1 rounded transition-colors"
                >
                  • Pounds to KG (Most Popular)
                </Link>
                <Link
                  href="/convert/ounces-to-grams"
                  className="block w-full text-left text-xs text-gray-600 hover:text-green-600 p-1 rounded transition-colors"
                >
                  • Ounces to Grams (Trending)
                </Link>
                <Link
                  href="/convert/stones-to-pounds"
                  className="block w-full text-left text-xs text-gray-600 hover:text-green-600 p-1 rounded transition-colors"
                >
                  • Stones to Pounds (Popular)
                </Link>
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
              <Link
                href="/convert/celsius-to-fahrenheit"
                className="block w-full text-left text-sm text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-md transition-colors"
              >
                Celsius ↔ Fahrenheit
              </Link>
              <Link
                href="/convert/kelvin-to-celsius"
                className="block w-full text-left text-sm text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-md transition-colors"
              >
                Kelvin ↔ Celsius
              </Link>
              <Link
                href="/convert/rankine-to-fahrenheit"
                className="block w-full text-left text-sm text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-md transition-colors"
              >
                Rankine ↔ Fahrenheit
              </Link>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <Link
                  href="/convert/celsius-to-fahrenheit"
                  className="block w-full text-left text-xs text-gray-600 hover:text-red-600 p-1 rounded transition-colors"
                >
                  • Celsius to Fahrenheit (Most Popular)
                </Link>
                <Link
                  href="/convert/fahrenheit-to-celsius"
                  className="block w-full text-left text-xs text-gray-600 hover:text-red-600 p-1 rounded transition-colors"
                >
                  • Fahrenheit to Celsius (Trending)
                </Link>
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
              <Link
                href="/convert/liters-to-gallons"
                className="block w-full text-left text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-2 rounded-md transition-colors"
              >
                Liters ↔ Gallons
              </Link>
              <Link
                href="/convert/milliliters-to-fluid-ounces"
                className="block w-full text-left text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-2 rounded-md transition-colors"
              >
                Milliliters ↔ Fluid Ounces
              </Link>
              <Link
                href="/convert/cubic-meters-to-cubic-feet"
                className="block w-full text-left text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-2 rounded-md transition-colors"
              >
                Cubic Meters ↔ Cubic Feet
              </Link>
              <Link
                href="/convert/cups-to-milliliters"
                className="block w-full text-left text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-2 rounded-md transition-colors"
              >
                Cups ↔ Milliliters
              </Link>
              <Link
                href="/convert/pints-to-liters"
                className="block w-full text-left text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-2 rounded-md transition-colors"
              >
                Pints ↔ Liters
              </Link>
              <Link
                href="/convert/quarts-to-liters"
                className="block w-full text-left text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-2 rounded-md transition-colors"
              >
                Quarts ↔ Liters
              </Link>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <Link
                  href="/convert/liters-to-gallons"
                  className="block w-full text-left text-xs text-gray-600 hover:text-purple-600 p-1 rounded transition-colors"
                >
                  • Liters to Gallons (Most Popular)
                </Link>
                <Link
                  href="/convert/ml-to-fluid-ounces"
                  className="block w-full text-left text-xs text-gray-600 hover:text-purple-600 p-1 rounded transition-colors"
                >
                  • ML to Fluid Ounces (Trending)
                </Link>
                <Link
                  href="/convert/cups-to-ml"
                  className="block w-full text-left text-xs text-gray-600 hover:text-purple-600 p-1 rounded transition-colors"
                >
                  • Cups to ML (Popular)
                </Link>
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
              <Link
                href="/convert/square-meters-to-square-feet"
                className="block w-full text-left text-sm text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 p-2 rounded-md transition-colors"
              >
                Square Meters ↔ Square Feet
              </Link>
              <Link
                href="/convert/acres-to-square-meters"
                className="block w-full text-left text-sm text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 p-2 rounded-md transition-colors"
              >
                Acres ↔ Square Meters
              </Link>
              <Link
                href="/convert/hectares-to-acres"
                className="block w-full text-left text-sm text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 p-2 rounded-md transition-colors"
              >
                Hectares ↔ Acres
              </Link>
              <Link
                href="/convert/square-kilometers-to-square-miles"
                className="block w-full text-left text-sm text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 p-2 rounded-md transition-colors"
              >
                Square Kilometers ↔ Square Miles
              </Link>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <Link
                  href="/convert/sq-feet-to-sq-meters"
                  className="block w-full text-left text-xs text-gray-600 hover:text-yellow-600 p-1 rounded transition-colors"
                >
                  • Sq Feet to Sq Meters (Most Popular)
                </Link>
                <Link
                  href="/convert/acres-to-hectares"
                  className="block w-full text-left text-xs text-gray-600 hover:text-yellow-600 p-1 rounded transition-colors"
                >
                  • Acres to Hectares (Trending)
                </Link>
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
              <Link
                href="/convert/kmh-to-mph"
                className="block w-full text-left text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 p-2 rounded-md transition-colors"
              >
                KM/H ↔ MPH
              </Link>
              <Link
                href="/convert/ms-to-fts"
                className="block w-full text-left text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 p-2 rounded-md transition-colors"
              >
                M/S ↔ FT/S
              </Link>
              <Link
                href="/convert/knots-to-mph"
                className="block w-full text-left text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 p-2 rounded-md transition-colors"
              >
                Knots ↔ MPH
              </Link>
              <Link
                href="/convert/mach-to-kmh"
                className="block w-full text-left text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 p-2 rounded-md transition-colors"
              >
                Mach ↔ KM/H
              </Link>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <Link
                  href="/convert/kmh-to-mph"
                  className="block w-full text-left text-xs text-gray-600 hover:text-indigo-600 p-1 rounded transition-colors"
                >
                  • KM/H to MPH (Most Popular)
                </Link>
                <Link
                  href="/convert/mph-to-kmh"
                  className="block w-full text-left text-xs text-gray-600 hover:text-indigo-600 p-1 rounded transition-colors"
                >
                  • MPH to KM/H (Trending)
                </Link>
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
              <Link
                href="/convert/pascal-to-psi"
                className="block w-full text-left text-sm text-pink-600 hover:text-pink-800 hover:bg-pink-50 p-2 rounded-md transition-colors"
              >
                Pascal ↔ PSI
              </Link>
              <Link
                href="/convert/bar-to-atmosphere"
                className="block w-full text-left text-sm text-pink-600 hover:text-pink-800 hover:bg-pink-50 p-2 rounded-md transition-colors"
              >
                Bar ↔ Atmosphere
              </Link>
              <Link
                href="/convert/torr-to-mmhg"
                className="block w-full text-left text-sm text-pink-600 hover:text-pink-800 hover:bg-pink-50 p-2 rounded-md transition-colors"
              >
                Torr ↔ mmHg
              </Link>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <Link
                  href="/convert/psi-to-bar"
                  className="block w-full text-left text-xs text-gray-600 hover:text-pink-600 p-1 rounded transition-colors"
                >
                  • PSI to Bar (Most Popular)
                </Link>
                <Link
                  href="/convert/bar-to-psi"
                  className="block w-full text-left text-xs text-gray-600 hover:text-pink-600 p-1 rounded transition-colors"
                >
                  • Bar to PSI (Trending)
                </Link>
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
              <Link
                href="/convert/joules-to-calories"
                className="block w-full text-left text-sm text-orange-600 hover:text-orange-800 hover:bg-orange-50 p-2 rounded-md transition-colors"
              >
                Joules ↔ Calories
              </Link>
              <Link
                href="/convert/kwh-to-btu"
                className="block w-full text-left text-sm text-orange-600 hover:text-orange-800 hover:bg-orange-50 p-2 rounded-md transition-colors"
              >
                kWh ↔ BTU
              </Link>
              <Link
                href="/convert/watts-to-horsepower"
                className="block w-full text-left text-sm text-orange-600 hover:text-orange-800 hover:bg-orange-50 p-2 rounded-md transition-colors"
              >
                Watts ↔ Horsepower
              </Link>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <Link
                  href="/convert/calories-to-joules"
                  className="block w-full text-left text-xs text-gray-600 hover:text-orange-600 p-1 rounded transition-colors"
                >
                  • Calories to Joules (Most Popular)
                </Link>
                <Link
                  href="/convert/kwh-to-btu"
                  className="block w-full text-left text-xs text-gray-600 hover:text-orange-600 p-1 rounded transition-colors"
                >
                  • kWh to BTU (Trending)
                </Link>
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
              <Link
                href="/convert/bytes-to-bits"
                className="block w-full text-left text-sm text-cyan-600 hover:text-cyan-800 hover:bg-cyan-50 p-2 rounded-md transition-colors"
              >
                Bytes ↔ Bits
              </Link>
              <Link
                href="/convert/kb-to-mb"
                className="block w-full text-left text-sm text-cyan-600 hover:text-cyan-800 hover:bg-cyan-50 p-2 rounded-md transition-colors"
              >
                KB ↔ MB
              </Link>
              <Link
                href="/convert/gb-to-tb"
                className="block w-full text-left text-sm text-cyan-600 hover:text-cyan-800 hover:bg-cyan-50 p-2 rounded-md transition-colors"
              >
                GB ↔ TB
              </Link>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <Link
                  href="/convert/gb-to-mb"
                  className="block w-full text-left text-xs text-gray-600 hover:text-cyan-600 p-1 rounded transition-colors"
                >
                  • GB to MB (Most Popular)
                </Link>
                <Link
                  href="/convert/mb-to-kb"
                  className="block w-full text-left text-xs text-gray-600 hover:text-cyan-600 p-1 rounded transition-colors"
                >
                  • MB to KB (Trending)
                </Link>
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
              <Link
                href="/convert/hours-to-minutes"
                className="block w-full text-left text-sm text-teal-600 hover:text-teal-800 hover:bg-teal-50 p-2 rounded-md transition-colors"
              >
                Hours ↔ Minutes
              </Link>
              <Link
                href="/convert/days-to-hours"
                className="block w-full text-left text-sm text-teal-600 hover:text-teal-800 hover:bg-teal-50 p-2 rounded-md transition-colors"
              >
                Days ↔ Hours
              </Link>
              <Link
                href="/convert/years-to-days"
                className="block w-full text-left text-sm text-teal-600 hover:text-teal-800 hover:bg-teal-50 p-2 rounded-md transition-colors"
              >
                Years ↔ Days
              </Link>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Top Converters:</p>
                <Link
                  href="/convert/hours-to-minutes"
                  className="block w-full text-left text-xs text-gray-600 hover:text-teal-600 p-1 rounded transition-colors"
                >
                  • Hours to Minutes (Most Popular)
                </Link>
                <Link
                  href="/convert/days-to-hours"
                  className="block w-full text-left text-xs text-gray-600 hover:text-teal-600 p-1 rounded transition-colors"
                >
                  • Days to Hours (Trending)
                </Link>
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
