# Unit Converter - Production-Grade Conversion Website

A scalable, production-ready unit conversion website built with Next.js that handles "all converters in the world" through a rules-driven registry system with SI prefixes, UCUM-style unit symbols, and dimension analysis.

## Features

- **Comprehensive Unit Registry**: Covers all major unit categories with automatic SI prefix expansion
- **Dimension Analysis**: Validates conversions using dimensional analysis to prevent invalid operations
- **Auto-Generated Routes**: Dynamic converter pages with SEO optimization and internal linking
- **Fast Search**: Edge-optimized search with fuzzy matching and instant suggestions
- **Currency Conversion**: Real-time exchange rates with caching
- **Accessibility**: WCAG AA compliant with keyboard navigation and screen reader support
- **Performance**: Lighthouse scores ≥90 across all metrics

## Architecture

### Registry System

The unit registry is built from seed files in `/data/seed/` and compiled into a master registry:

\`\`\`
/data/seed/
├── length.json      # meters, feet, inches, etc.
├── mass.json        # grams, pounds, ounces, etc.
├── temperature.json # Celsius, Fahrenheit, Kelvin
├── area.json        # square meters, acres, etc.
├── volume.json      # liters, gallons, cups, etc.
└── ...
\`\`\`

Each seed file defines:
- **Units**: with dimension vectors, conversion factors, and aliases
- **SI Prefixes**: automatically expanded (mm, cm, km, etc.)
- **Compound Units**: like m/s, N·m, kWh with proper dimension math

### Conversion Engine

Located in `/lib/convert/core.ts`:

- **parseUnitExpression()**: Parses symbols like "m/s", "N·m", "°C"
- **convert()**: Validates dimensions and performs conversions
- **Temperature handling**: Proper offset conversions (C↔F↔K)
- **Compound units**: Handles products/quotients with exponents

### Routes

\`\`\`
/                           # Homepage with search + categories
/[category]                 # Category pages (length, mass, etc.)
/[category]/[converter]     # Converter pages (cm-to-inches)
/admin/units               # Registry browser (read-only)
/api/search                # Unit search suggestions
/api/currency              # Exchange rate data
\`\`\`

## Getting Started

1. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Build the registry**:
   \`\`\`bash
   npm run build:registry
   \`\`\`

3. **Start development**:
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Build for production**:
   \`\`\`bash
   npm run build
   \`\`\`

## Adding New Units

### 1. Add to Seed File

Edit the appropriate file in `/data/seed/`:

\`\`\`json
{
  "key": "nautical-mile",
  "label": "nautical mile",
  "symbol": "nmi",
  "dimension": { "L": 1 },
  "factorToBase": 1852,
  "system": "nautical",
  "aliases": ["nm", "nautical mile"],
  "allowPrefixes": false
}
\`\`\`

### 2. Rebuild Registry

\`\`\`bash
npm run build:registry
\`\`\`

### 3. New Routes Auto-Generated

The system automatically creates converter routes for all unit pairs.

## Adding New Dimensions

1. **Define dimension** in `/lib/convert/dimensions.ts`:
   \`\`\`typescript
   export const ELECTRIC_CURRENT: DimensionVector = { I: 1 }
   \`\`\`

2. **Add units** with the dimension vector:
   \`\`\`json
   {
     "dimension": { "I": 1 },
     "factorToBase": 1
   }
   \`\`\`

## Registry Structure

### Units
\`\`\`typescript
interface Unit {
  key: string              // Unique identifier
  label: string           // Display name
  symbol: string          // Short symbol (m, ft, °C)
  dimension: DimensionVector  // { L: 1, M: 0, T: 0, ... }
  factorToBase: number    // Conversion to base unit
  offsetToBase?: number   // For temperature conversions
  system?: string         // SI, US, UK, etc.
  category: string        // length, mass, temperature
  aliases?: string[]      // Alternative names/symbols
}
\`\`\`

### Dimensions
Base dimensions follow SI standards:
- **L**: Length (meter)
- **M**: Mass (kilogram) 
- **T**: Time (second)
- **I**: Electric current (ampere)
- **Θ**: Temperature (kelvin)
- **N**: Amount of substance (mole)
- **J**: Luminous intensity (candela)

### Prefixes
Automatic expansion for compatible units:
- **SI Prefixes**: y, z, a, f, p, n, μ, m, c, d, da, h, k, M, G, T, P, E, Z, Y
- **Binary Prefixes**: Ki, Mi, Gi, Ti, Pi, Ei, Zi, Yi (for data units)

## SEO Features

- **Dynamic Metadata**: Title, description, Open Graph for each converter
- **JSON-LD**: Structured data for breadcrumbs, FAQs, and tools
- **Internal Linking**: Related converters, reverse pairs, category links
- **Sitemaps**: Chunked sitemaps for 50k+ URLs
- **Canonical URLs**: Prevent duplicate content issues

## Performance

- **Edge Runtime**: Search and currency APIs
- **ISR Caching**: On-demand static generation with 7-day revalidation  
- **Chunked Sitemaps**: Scalable to millions of converter pages
- **Optimized Images**: WebP/AVIF with long-term caching
- **Tree Shaking**: Minimal bundle size

## Testing

Run unit tests for core conversion functions:

\`\`\`bash
npm test
\`\`\`

Tests cover:
- Dimension validation
- Temperature offset conversions  
- SI prefix expansion
- Compound unit parsing
- Error handling for invalid conversions

## License

MIT License - see LICENSE file for details.
