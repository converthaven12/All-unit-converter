import Link from "next/link"
import { Search } from "./search"

const categories = [
  { name: "Length", href: "/length" },
  { name: "Weight", href: "/mass" },
  { name: "Temperature", href: "/temperature" },
  { name: "Volume", href: "/volume" },
  { name: "Area", href: "/area" },
  { name: "Speed", href: "/speed" },
  { name: "Energy", href: "/energy" },
  { name: "Power", href: "/power" },
]

export function Navigation() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm"><br></span>
              </div>
              <span className="font-semibold text-lg">Unit Converter</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Search className="w-64 hidden sm:block" showButton={false} placeholder="Search units..." />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="pb-4 sm:hidden">
          <Search placeholder="Search units..." showButton={false} />
        </div>
      </div>
    </header>
  )
}
