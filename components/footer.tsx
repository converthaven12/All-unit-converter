import Link from "next/link"

const popularConverters = [
  { name: "Meters to Feet", href: "/length/meter-to-foot" },
  { name: "Celsius to Fahrenheit", href: "/temperature/celsius-to-fahrenheit" },
  { name: "Kilograms to Pounds", href: "/mass/kilogram-to-pound" },
  { name: "Liters to Gallons", href: "/volume/liter-to-gallon-us" },
  { name: "Kilometers to Miles", href: "/length/kilometer-to-mile" },
  { name: "Inches to Centimeters", href: "/length/inch-to-centimeter" },
]

const categories = [
  { name: "Length", href: "/length" },
  { name: "Mass & Weight", href: "/mass" },
  { name: "Temperature", href: "/temperature" },
  { name: "Volume", href: "/volume" },
  { name: "Area", href: "/area" },
  { name: "Speed", href: "/speed" },
  { name: "Energy", href: "/energy" },
  { name: "Power", href: "/power" },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">UC</span>
              </div>
              <span className="font-semibold text-lg">Unit Converter</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Fast, accurate unit conversion for all measurements. Convert between metric, imperial, and other unit
              systems with ease.
            </p>
          </div>

          {/* Popular Converters */}
          <div className="space-y-4">
            <h3 className="font-semibold">Popular Converters</h3>
            <ul className="space-y-2">
              {popularConverters.map((converter) => (
                <li key={converter.href}>
                  <Link
                    href={converter.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {converter.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Unit Converter. Built for accuracy and speed.
          </p>
        </div>
      </div>
    </footer>
  )
}
