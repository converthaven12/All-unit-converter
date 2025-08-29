import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Unit Converter - Free Online Conversion Tools",
  description:
    "Convert between different units of measurement quickly and accurately. Free online converters for length, weight, temperature, and more.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 font-sans">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Unit Converter
              </Link>
              <nav className="flex space-x-6">
                <Link href="/length" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Length
                </Link>
                <Link
                  href="/Converters/CommonConversions/CmToFeet"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Cm to Feet
                </Link>
                <Link
                  href="/Converters/CommonConversions/CmToInches"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Cm to Inches
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="min-h-screen">{children}</main>

        <footer className="bg-gray-50 border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p>&copy; 2024 Unit Converter. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
