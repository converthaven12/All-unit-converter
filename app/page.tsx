import Link from "next/link"
import ConverterWidget from "@/components/ConverterWidget"
import CategoryCard from "@/components/CategoryCard"
import Sidebar from "@/components/Sidebar"
import { CATEGORIES, POPULAR_CONVERTERS, getConverterBySlug, getConvertersByCategory } from "@/lib/catalog"

export default function HomePage() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Free Online Unit Converters</h1>
          <p className="text-xl text-gray-600 mb-8">
            Convert between different units of measurement quickly and accurately
          </p>

          {/* Featured Converter Widget */}
          <div className="max-w-2xl mx-auto mb-8">
            <ConverterWidget />
          </div>
        </div>

        {/* Categories Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                converterCount={getConvertersByCategory(category.id).length}
              />
            ))}
          </div>
        </section>

        {/* Popular Converters */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Converters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_CONVERTERS.slice(0, 12).map((slug) => {
              const converter = getConverterBySlug(slug)
              if (!converter) return null

              return (
                <Link
                  key={slug}
                  href={`/${converter.categoryId}/${converter.slug}`}
                  className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="font-medium text-gray-900">
                    {converter.from} to {converter.to}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {converter.symbols.from} → {converter.symbols.to}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* SEO Content */}
        <section className="prose max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Our Unit Converters</h2>
          <p className="text-gray-600 mb-4">
            Converthaven offers a comprehensive collection of free online unit converters for all your measurement
            needs. Whether you need to convert{" "}
            <Link href="/length/cm-to-inches" className="text-amber-600 hover:text-amber-700">
              centimeters to inches
            </Link>
            ,
            <Link href="/mass/kg-to-pounds" className="text-amber-600 hover:text-amber-700">
              {" "}
              kilograms to pounds
            </Link>
            , or
            <Link href="/temperature/celsius-to-fahrenheit" className="text-amber-600 hover:text-amber-700">
              {" "}
              Celsius to Fahrenheit
            </Link>
            , we have you covered.
          </p>
          <p className="text-gray-600">
            Our converters are fast, accurate, and easy to use. Simply enter your value, select your units, and get
            instant results. Perfect for students, professionals, and anyone who needs reliable unit conversions.
            Explore our
            <Link href="/length" className="text-amber-600 hover:text-amber-700">
              {" "}
              length converters
            </Link>
            ,
            <Link href="/volume" className="text-amber-600 hover:text-amber-700">
              {" "}
              volume converters
            </Link>
            , and many more categories.
          </p>
        </section>
      </main>
    </div>
  )
}
