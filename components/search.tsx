"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SearchIcon, Loader2 } from "lucide-react"
import { debounce } from "@/lib/search"

interface SearchResult {
  key: string
  label: string
  symbol: string
  category: string
  url: string
  score: number
}

interface SearchProps {
  placeholder?: string
  className?: string
  showButton?: boolean
}

export function Search({
  placeholder = "Search units (e.g., meter, kg, °C)",
  className,
  showButton = true,
}: SearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const searchAPI = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error("Search failed:", error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const debouncedSearch = debounce(searchAPI, 300)

  useEffect(() => {
    debouncedSearch(query)
  }, [query])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setSelectedIndex(-1)
    setIsOpen(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return

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
        if (selectedIndex >= 0) {
          handleResultClick(results[selectedIndex])
        } else if (results.length > 0) {
          handleResultClick(results[0])
        }
        break
      case "Escape":
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleResultClick = (result: SearchResult) => {
    setQuery(result.label)
    setIsOpen(false)
    setSelectedIndex(-1)
    router.push(result.url)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (results.length > 0) {
      handleResultClick(results[0])
    }
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="pl-10 pr-4"
            autoComplete="off"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-autocomplete="list"
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
        {showButton && (
          <Button type="submit" disabled={!query.trim()}>
            Search
          </Button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (query.trim() || results.length > 0) && (
        <Card ref={resultsRef} className="absolute top-full left-0 right-0 mt-1 z-50 max-h-80 overflow-y-auto">
          {results.length > 0 ? (
            <div role="listbox" className="py-2">
              {results.map((result, index) => (
                <button
                  key={result.key}
                  onClick={() => handleResultClick(result)}
                  className={`w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                    index === selectedIndex ? "bg-accent text-accent-foreground" : ""
                  }`}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{result.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {result.symbol} • {result.category}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query.trim() && !isLoading ? (
            <div className="px-4 py-3 text-sm text-muted-foreground">No results found for "{query}"</div>
          ) : null}
        </Card>
      )}
    </div>
  )
}
