// SEO utilities and metadata builders

import type { Metadata } from "next"
import type { Unit } from "./convert/types"

export interface SEOConfig {
  siteName: string
  siteUrl: string
  description: string
  keywords: string[]
  author: string
  twitterHandle?: string
}

export const defaultSEOConfig: SEOConfig = {
  siteName: "Unit Converter",
  siteUrl: "https://unitconverter.com",
  description:
    "Fast, accurate unit conversion for all measurements. Convert length, weight, temperature, volume, and more with our comprehensive unit converter.",
  keywords: [
    "unit converter",
    "measurement converter",
    "metric conversion",
    "imperial conversion",
    "length converter",
    "weight converter",
    "temperature converter",
    "volume converter",
  ],
  author: "Unit Converter",
  twitterHandle: "@unitconverter",
}

export function buildPageMetadata(
  title: string,
  description: string,
  path: string,
  config: SEOConfig = defaultSEOConfig,
): Metadata {
  const fullTitle = `${title} | ${config.siteName}`
  const url = `${config.siteUrl}${path}`

  return {
    title: fullTitle,
    description,
    keywords: config.keywords,
    authors: [{ name: config.author }],
    creator: config.author,
    publisher: config.siteName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      siteName: config.siteName,
      images: [
        {
          url: `${config.siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      site: config.twitterHandle,
      creator: config.twitterHandle,
      images: [`${config.siteUrl}/og-image.png`],
    },
    alternates: {
      canonical: url,
    },
  }
}

export function buildConverterMetadata(fromUnit: Unit, toUnit: Unit, config: SEOConfig = defaultSEOConfig): Metadata {
  const title = `${fromUnit.label} to ${toUnit.label} Converter`
  const description = `Convert ${fromUnit.label} (${fromUnit.symbol}) to ${toUnit.label} (${toUnit.symbol}). Fast, accurate ${fromUnit.category} conversion with formula and conversion table.`
  const path = `/${fromUnit.category}/${fromUnit.key}-to-${toUnit.key}`

  return buildPageMetadata(title, description, path, config)
}

export function buildCategoryMetadata(
  categoryName: string,
  categoryDescription: string,
  categoryKey: string,
  config: SEOConfig = defaultSEOConfig,
): Metadata {
  const title = `${categoryName} Converters`
  const description = `${categoryDescription}. Convert between all ${categoryName.toLowerCase()} units with our comprehensive converter tools.`
  const path = `/${categoryKey}`

  return buildPageMetadata(title, description, path, config)
}

// JSON-LD structured data builders
export function buildWebsiteJsonLd(config: SEOConfig = defaultSEOConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.siteName,
    description: config.description,
    url: config.siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${config.siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    author: {
      "@type": "Organization",
      name: config.author,
    },
  }
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function buildFAQJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function buildConverterJsonLd(
  fromUnit: Unit,
  toUnit: Unit,
  formula: string,
  config: SEOConfig = defaultSEOConfig,
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${fromUnit.label} to ${toUnit.label} Converter`,
    description: `Convert ${fromUnit.label} to ${toUnit.label} using our accurate conversion tool`,
    url: `${config.siteUrl}/${fromUnit.category}/${fromUnit.key}-to-${toUnit.key}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Instant conversion",
      "Accurate results",
      "Conversion formula",
      "Common conversion table",
      "Mobile friendly",
    ],
    author: {
      "@type": "Organization",
      name: config.author,
    },
  }
}

// Generate sitemap entries
export interface SitemapEntry {
  url: string
  lastModified?: Date
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: number
}

export function generateSitemapEntries(
  converters: Array<{ slug: string; category: string }>,
  categories: Array<{ key: string }>,
  config: SEOConfig = defaultSEOConfig,
): SitemapEntry[] {
  const entries: SitemapEntry[] = []

  // Homepage
  entries.push({
    url: config.siteUrl,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  })

  // Category pages
  for (const category of categories) {
    entries.push({
      url: `${config.siteUrl}/${category.key}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  }

  // Converter pages
  for (const converter of converters) {
    entries.push({
      url: `${config.siteUrl}/${converter.category}/${converter.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    })
  }

  return entries
}

// Chunk sitemap entries for large sites
export function chunkSitemapEntries(entries: SitemapEntry[], chunkSize = 50000): SitemapEntry[][] {
  const chunks: SitemapEntry[][] = []
  for (let i = 0; i < entries.length; i += chunkSize) {
    chunks.push(entries.slice(i, i + chunkSize))
  }
  return chunks
}
