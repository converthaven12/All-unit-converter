import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Search from "@/components/Search"
import Link from "next/link"
import { CATEGORIES, POPULAR_CONVERTERS, getConverterBySlug } from "@/lib/catalog"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Converthaven - Free Online Unit Converters",
  description:
    "Convert between different units of measurement quickly and accurately. Free online converters for length, weight, temperature, volume, and more.",
  generator: "v0.app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`min-h-screen antialiased bg-white`}>
        <header className="bg-blue-600 border-b border-blue-700 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold text-white">
                All unit converter
              </Link>
              <div className="flex-1 max-w-lg mx-8">
                <Suspense fallback={<div>Loading...</div>}>
                  <Search />
                </Suspense>
              </div>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="bg-gray-50 border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Categories */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
                <ul className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <li key={category.id}>
                      <Link href={`/${category.id}`} className="text-gray-700 hover:text-blue-600 transition-colors">
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Converters */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Converters</h2>
                <ul className="space-y-2">
                  {POPULAR_CONVERTERS.slice(0, 8).map((slug) => {
                    const converter = getConverterBySlug(slug)
                    if (!converter) return null
                    return (
                      <li key={slug}>
                        <Link
                          href={`/${converter.categoryId}/${converter.slug}`}
                          className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          {converter.from} to {converter.to}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* About */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
                <p className="text-gray-600 text-sm">
                  Converthaven provides free, accurate, and easy-to-use unit converters for all your measurement needs.
                </p>
                <div className="mt-4">
                  <Link href="/" className="text-2xl font-bold text-blue-600">
                    Converthaven
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
              © 2024 All Unit Converters All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
