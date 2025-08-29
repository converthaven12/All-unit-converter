import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { ConverterWidget } from "@/components/ConverterWidget"
import { FAQ } from "@/components/FAQ"
import { getCategoryById, getConvertersByCategory, CATEGORIES } from "@/lib/catalog"
import Link from "next/link"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryById(params.category)

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    }
  }

  return {
    title: `${category.name} Converters | Free Online Unit Conversion`,
    description: `${category.description}. Convert between all ${category.name.toLowerCase()} units with our comprehensive converter tools.`,
    canonical: `https://converthaven.com/${params.category}`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryById(params.category)

  if (!category) {
    notFound()
  }

  const converters = getConvertersByCategory(params.category)
  const popularConverters = converters.slice(0, 9)

  const breadcrumbItems = [{ label: category.name, href: `/${params.category}` }]

  const faqs = [
    {
      question: `What ${category.name.toLowerCase()} units can I convert?`,
      answer: `Our ${category.name.toLowerCase()} converter supports ${converters.length} different conversion pairs including ${converters
        .slice(0, 3)
        .map((c) => `${c.from} to ${c.to}`)
        .join(", ")} and many more. You can convert between any combination of these units.`,
    },
    {
      question: `How accurate are the ${category.name.toLowerCase()} conversions?`,
      answer: `Our conversions use precise mathematical formulas and official conversion factors. Results are calculated to high precision and can be displayed with up to 6 decimal places for maximum accuracy.`,
    },
    {
      question: `Can I convert between metric and imperial ${category.name.toLowerCase()} units?`,
      answer: `Yes, our converter supports both metric and imperial units, as well as other measurement systems. You can easily convert between any supported units regardless of the system they belong to.`,
    },
  ]

  return (
    <>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{category.name} Converters</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {category.description}. Convert between all {category.name.toLowerCase()} units with our comprehensive
            converter tools.
          </p>
        </div>

        {/* Featured Converter */}
        {converters.length >= 1 && (
          <section className="max-w-2xl mx-auto">
            <ConverterWidget
              converter={converters[0]}
              title={`${converters[0].from} to ${converters[0].to} Converter`}
            />
          </section>
        )}

        {/* Popular Converters */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Popular {category.name} Converters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularConverters.map((converter) => (
              <Link
                key={converter.slug}
                href={`/${params.category}/${converter.slug}`}
                className="block p-4 rounded-lg border hover:border-primary/50 hover:shadow-md transition-all"
              >
                <h3 className="text-sm hover:text-primary transition-colors">
                  {converter.from} to {converter.to}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Convert {converter.symbols.from} to {converter.symbols.to}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* All Converters */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">All {category.name} Converters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {converters.map((converter) => (
              <Link
                key={converter.slug}
                href={`/${params.category}/${converter.slug}`}
                className="block p-3 rounded-lg border bg-card hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="font-medium">
                  {converter.from} to {converter.to}
                </div>
                <div className="text-sm text-muted-foreground">
                  {converter.symbols.from} → {converter.symbols.to}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <FAQ items={faqs} />

        {/* SEO Content */}
        <section className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
          <h2>About {category.name} Conversion</h2>
          <p>
            Our {category.name.toLowerCase()} converter provides accurate conversions between {converters.length}{" "}
            different unit pairs. Whether you're working with metric, imperial, or specialized units, our tool delivers
            precise results instantly.
          </p>

          <h3>Supported {category.name} Conversions</h3>
          <p>We support a comprehensive range of {category.name.toLowerCase()} conversions including:</p>
          <ul>
            {converters.slice(0, 10).map((converter) => (
              <li key={converter.slug}>
                <strong>
                  {converter.from} to {converter.to} ({converter.symbols.from} → {converter.symbols.to})
                </strong>
              </li>
            ))}
            {converters.length > 10 && <li>And {converters.length - 10} more conversions...</li>}
          </ul>

          <h3>How to Use the {category.name} Converter</h3>
          <ol>
            <li>Enter the value you want to convert</li>
            <li>Select the unit you're converting from</li>
            <li>Choose the unit you want to convert to</li>
            <li>View the instant, accurate result</li>
            <li>Adjust precision as needed for your requirements</li>
          </ol>
        </section>
      </div>
    </>
  )
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.id }))
}
