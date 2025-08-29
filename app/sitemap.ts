import type { MetadataRoute } from "next"
import { CATEGORIES, CONVERTERS } from "@/lib/catalog"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://converthaven.com"
  const currentDate = new Date()

  const routes: MetadataRoute.Sitemap = []

  // Homepage
  routes.push({
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: 1.0,
  })

  // Category pages
  for (const category of CATEGORIES) {
    routes.push({
      url: `${baseUrl}/${category.id}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    })
  }

  // Converter pages
  for (const converter of CONVERTERS) {
    routes.push({
      url: `${baseUrl}/${converter.categoryId}/${converter.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    })
  }

  return routes
}
