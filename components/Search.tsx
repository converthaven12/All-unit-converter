"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { CATEGORIES, CONVERTERS, type Category, type Converter } from "@/lib/catalog"
import Link from "next/link"

interface SearchResult {
  type: "category" | "converter"
  item: Category | Converter
  url: string
}

export default function Search() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setIsOpen(false)
      return
    }

    const searchResults: SearchResult[] = []
    const lowerQuery = query.toLowerCase()

    // Search categories
    CATEGORIES.forEach((category) => {
      if (category.name.toLowerCase().includes(lowerQuery) || category.description.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          type: "category",
          item: category,
          url: `/${category.id}`,
        })
      }
    })

    // Search converters
    CONVERTERS.forEach((converter) => {
      if (
        converter.from.toLowerCase().includes(lowerQuery) ||
        converter.to.toLowerCase().includes(lowerQuery) ||
        converter.symbols.from.toLowerCase().includes(lowerQuery) ||
        converter.symbols.to.toLowerCase().includes(lowerQuery)
      ) {
        const category = CATEGORIES.find((cat) => cat.id === converter.categoryId)
        searchResults.push({
          type: "converter",
          item: converter,
          url: `/${converter.categoryId}/${converter.slug}`,
        })
      }
    })

    setResults(searchResults.slice(0, 10))
    setIsOpen(true)
    setSelectedIndex(-1)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          window.location.href = results[selectedIndex].url
        }
        break
      case "Escape":
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search converters..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => query && setIsOpen(true)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-autocomplete="list"
      />

      {isOpen && results.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
          role="listbox"
        >
          {results.map((result, index) => (
            <Link
              key={`${result.type}-${result.item.id || (result.item as Converter).slug}`}
              href={result.url}
              className={`block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                index === selectedIndex ? "bg-amber-50" : ""
              }`}
              role="option"
              aria-selected={index === selectedIndex}
              onClick={() => setIsOpen(false)}
            >
              {result.type === "category" ? (
                <div>
                  <div className="font-medium text-gray-900">{result.item.name}</div>
                  <div className="text-sm text-gray-500">{(result.item as Category).description}</div>
                </div>
              ) : (
                <div>
                  <div className="font-medium text-gray-900">
                    {(result.item as Converter).from} to {(result.item as Converter).to}
                  </div>
                  <div className="text-sm text-gray-500">
                    {(result.item as Converter).symbols.from} → {(result.item as Converter).symbols.to}
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
