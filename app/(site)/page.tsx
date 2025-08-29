import { Search } from "@/components/search"
import { CategoryCard } from "@/components/category-card"
import { Card, CardContent } from "@/components/ui/card"
import { ConverterWidget } from "@/components/converter-widget"
import { WebsiteJsonLd } from "@/components/json-ld"
import { getAllCategories, getUnitsByCategory } from "@/lib/convert/registry"
import { getPopularConverters } from "@/lib/convert/generate"
import Link from "next/link"

export default function HomePage() {
  const categories = getAllCategories()
  const lengthUnits = getUnitsByCategory("length")
  const popularConverters = getPopularConverters(12)

  return (
    <>
      <WebsiteJsonLd />

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Universal Unit Converter</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fast, accurate conversions for all measurements. Convert between metric, imperial, and specialized units
              with precision.
            </p>
          </div>

          {/* Hero Search */}
          <div className="max-w-md mx-auto">
            <Search placeholder="Search any unit (e.g., meter, kg, °C)" />
          </div>
        </section>

        {/* Featured Converter */}
        <section className="max-w-2xl mx-auto">
          <ConverterWidget
            fromUnit="meter"
            toUnit="foot"
            availableUnits={lengthUnits}
            title="Quick Convert: Meters to Feet"
          />
        </section>

        {/* Categories Grid */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-semibold">Conversion Categories</h2>
            <p className="text-muted-foreground">Choose from our comprehensive collection of unit converters</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const units = getUnitsByCategory(category.key)
              const popularUnits = units.slice(0, 6).map((u) => u.symbol)

              return (
                <CategoryCard
                  key={category.key}
                  name={category.name}
                  description={category.description}
                  href={`/${category.key}`}
                  unitCount={units.length}
                  popularUnits={popularUnits}
                />
              )
            })}
          </div>
        </section>

        {/* Popular Converters */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-semibold">Popular Converters</h2>
            <p className="text-muted-foreground">Most commonly used unit conversions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularConverters.map((converter) => (
              <Card key={converter.slug} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <Link
                    href={`/${converter.category}/${converter.slug}`}
                    className="block hover:text-primary transition-colors"
                  >
                    <h2 className="text-sm">{converter.title}</h2>
                    <p className="text-xs text-muted-foreground capitalize">{converter.category} conversion</p>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
          <h2>About Our Unit Converter</h2>
          <p>
            Our comprehensive unit converter provides fast, accurate conversions between all major unit systems. Whether
            you need to convert between metric and imperial units, or work with specialized measurements for science,
            engineering, or everyday use, our tool delivers precise results instantly.
          </p>

          <h2>Why Choose Our Converter?</h2>
          <ul>
            <li>
              <strong>Comprehensive Coverage:</strong> Support for length, mass, temperature, volume, area, speed,
              energy, power, and more
            </li>
            <li>
              <strong>High Precision:</strong> Accurate calculations with customizable decimal precision
            </li>
            <li>
              <strong>Fast Performance:</strong> Instant conversions with no delays
            </li>
            <li>
              <strong>Mobile Friendly:</strong> Works perfectly on all devices
            </li>
            <li>
              <strong>No Registration:</strong> Free to use with no sign-up required
            </li>
          </ul>

          <p>
            Start converting now by selecting a category above or using the search function to find specific units. Our
            converter handles everything from simple meter-to-feet conversions to complex scientific unit
            transformations.
          </p>
        </section>
      </div>
    </>
  )
}
