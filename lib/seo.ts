export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Unit Converter",
    description:
      "Convert between different units of measurement quickly and accurately. Choose from length, weight, temperature, and more.",
    url: typeof window !== "undefined" ? window.location.origin : "https://unit-converter.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://unit-converter.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Unit Converter",
    },
  }
}
