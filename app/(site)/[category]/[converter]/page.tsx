import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Breadcrumbs from "@/components/Breadcrumbs"
import { ConverterWidget } from "@/components/ConverterWidget"
import { CommonTable } from "@/components/CommonTable"
import { FAQ } from "@/components/FAQ"
import {
  getCategoryById,
  getConverterBySlug,
  getConvertersByCategory,
  convertValue,
  generateCommonExamples,
  CONVERTERS,
} from "@/lib/catalog"
import { buildTopRows } from "@/lib/topRows"
import Link from "next/link"

interface ConverterPageProps {
  params: {
    category: string
    converter: string
  }
}

export async function generateMetadata({ params }: ConverterPageProps): Promise<Metadata> {
  const converter = getConverterBySlug(params.converter)

  if (!converter) {
    return {
      title: "Converter Not Found",
      description: "The requested converter could not be found.",
    }
  }

  return {
    title: `${converter.from} to ${converter.to} Converter (${converter.symbols.from} → ${converter.symbols.to}) | Fast & Accurate`,
    description: `Convert ${converter.from} to ${converter.to} instantly. Accurate ${converter.symbols.from} to ${converter.symbols.to} conversion with customizable precision.`,
    canonical: `https://converthaven.com/${params.category}/${params.converter}`,
  }
}

export default function ConverterPage({ params }: ConverterPageProps) {
  const category = getCategoryById(params.category)
  const converter = getConverterBySlug(params.converter)

  if (!category || !converter) {
    notFound()
  }

  const categoryConverters = getConvertersByCategory(params.category)
  const examples = generateCommonExamples(converter)
  const topRows = buildTopRows(converter)
  const relatedConverters = categoryConverters.filter((c) => c.slug !== converter.slug).slice(0, 6)
  const title = `${converter.from} to ${converter.to} Converter`

  const breadcrumbItems = [
    { label: category.name, href: `/${params.category}` },
    { label: title, href: `/${params.category}/${params.converter}` },
  ]

  const faqs = [
    {
      question: `How do I convert ${converter.from} to ${converter.to}?`,
      answer: `To convert ${converter.from} to ${converter.to}, ${
        converter.type === "temperature" && converter.offset
          ? `use the formula: ${converter.to} = (${converter.from} × ${converter.factor}) + ${converter.offset}`
          : `multiply the ${converter.from} value by ${converter.factor}`
      }. For example, 1 ${converter.symbols.from} = ${convertValue(1, converter).toFixed(6)} ${converter.symbols.to}.`,
    },
    {
      question: `What is the formula for ${converter.from} to ${converter.to} conversion?`,
      answer: `The conversion formula is: ${converter.to} = ${converter.from} × ${converter.factor}${converter.offset ? ` + ${converter.offset}` : ""}. This gives you the equivalent value in ${converter.to}.`,
    },
    {
      question: `Is the ${converter.from} to ${converter.to} conversion accurate?`,
      answer: `Yes, our conversion uses the official conversion factor of ${converter.factor} and provides results with high precision. You can adjust the decimal places shown to meet your accuracy requirements.`,
    },
    {
      question: `Can I convert ${converter.to} back to ${converter.from}?`,
      answer: `You can use our reverse converter or simply swap the units in the converter above. Look for the reverse conversion in the related converters section below.`,
    },
  ]

  return (
    <>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Convert {converter.from} ({converter.symbols.from}) to {converter.to} ({converter.symbols.to}) with our
            accurate conversion tool. Get instant results with customizable precision for all your{" "}
            {category.name.toLowerCase()} conversion needs.
          </p>
        </div>

        {/* Converter Widget */}
        <section className="max-w-2xl mx-auto">
          <ConverterWidget converter={converter} title={title} />
        </section>

        {/* Common Conversions Table */}
        <section>
          <CommonTable
            title="Top Conversions"
            leftLabel={`${converter.from} (${converter.symbols.from})`}
            rightLabel={`${converter.to} (${converter.symbols.to})`}
            rows={topRows}
          />
        </section>

        {/* How it Works */}
        <section className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl font-semibold">How the Conversion Works</h2>
          <div className="bg-muted/50 p-6 rounded-lg space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Conversion Formula</h3>
              <p className="font-mono text-lg bg-background p-3 rounded border">
                {converter.to} = {converter.from} × {converter.factor}
                {converter.offset ? ` + ${converter.offset}` : ""}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Example Calculation</h3>
              <p>
                To convert 10 {converter.symbols.from} to {converter.symbols.to}:
                <br />
                10 {converter.symbols.from} × {converter.factor}
                {converter.offset ? ` + ${converter.offset}` : ""} = {convertValue(10, converter).toFixed(4)}{" "}
                {converter.symbols.to}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Conversion Factor</h3>
              <p className="text-sm text-muted-foreground">
                The conversion factor from {converter.from} to {converter.to} is {converter.factor}.
                {converter.type === "temperature" &&
                  converter.offset &&
                  ` This is a temperature conversion with an offset of ${converter.offset}.`}
              </p>
            </div>
          </div>
        </section>

        {/* Related Converters */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Related Converters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedConverters.map((relatedConverter) => (
              <Link
                key={relatedConverter.slug}
                href={`/${params.category}/${relatedConverter.slug}`}
                className="block p-4 rounded-lg border hover:border-primary/50 hover:shadow-md transition-all"
              >
                <h3 className="font-medium hover:text-primary transition-colors">
                  {relatedConverter.from} to {relatedConverter.to}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {relatedConverter.symbols.from} → {relatedConverter.symbols.to}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <FAQ items={faqs} />

        {/* SEO Content */}
        <section className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
          <h2>
            About {converter.from} to {converter.to} Conversion
          </h2>
          <p>
            The {converter.from} and {converter.to} are both units of {category.name.toLowerCase()} measurement. This
            conversion uses a factor of {converter.factor} to provide accurate results.
          </p>

          <h3>When to Use This Conversion</h3>
          <p>
            This conversion is commonly used in various fields including engineering, science, construction, and
            everyday measurements. Whether you're working on technical projects or need quick conversions for daily
            tasks, this tool provides the accuracy you need.
          </p>

          <h3>Conversion Accuracy</h3>
          <p>
            Our converter uses the official conversion factor of {converter.factor} to ensure maximum accuracy. The
            result can be displayed with up to 6 decimal places, making it suitable for both general use and precision
            applications.
          </p>
        </section>
      </div>
    </>
  )
}

export async function generateStaticParams() {
  return CONVERTERS.map((converter) => ({
    category: converter.categoryId,
    converter: converter.slug,
  }))
}
