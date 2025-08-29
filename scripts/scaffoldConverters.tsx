import * as fs from "fs"
import * as path from "path"

interface ConverterConfig {
  category: string
  name: string
  title: string
  from: [string, string] // [name, symbol]
  to: [string, string] // [name, symbol]
  factor: number
  offset?: number
}

function scaffoldConverters(converters: ConverterConfig[]) {
  converters.forEach((converter) => {
    const folderPath = path.join("src", "app", "(screens)", "Converters", converter.category, converter.name)
    const filePath = path.join(folderPath, "page.tsx")

    // Create directory if it doesn't exist
    fs.mkdirSync(folderPath, { recursive: true })

    // Generate page content
    const pageContent = `import ConverterPage from "@/app/utils/components/ConverterPage"

export default function ${converter.name}Page() {
  const meta = {
    title: "${converter.title}",
    fromUnit: { name: "${converter.from[0]}", symbol: "${converter.from[1]}" },
    toUnit: { name: "${converter.to[0]}", symbol: "${converter.to[1]}" },
    factor: ${converter.factor},${converter.offset ? `\n    offset: ${converter.offset},` : ""}
    articleHtml: \`
      <h3>How to convert ${converter.from[0].toLowerCase()}s to ${converter.to[0].toLowerCase()}s</h3>
      <p>To convert ${converter.from[0].toLowerCase()}s to ${converter.to[0].toLowerCase()}s, ${converter.offset ? `add ${converter.offset} and then ` : ""}multiply the value by ${converter.factor}.</p>
      <p>The conversion formula is: ${converter.to[0].toLowerCase()}s = ${converter.offset ? `(${converter.from[0].toLowerCase()}s + ${converter.offset}) × ` : `${converter.from[0].toLowerCase()}s × `}${converter.factor}</p>
    \`
  }

  const relatedLinks = [
    { href: "/length", title: "All Length Converters" }
  ]

  return <ConverterPage meta={meta} relatedLinks={relatedLinks} />
}
`

    // Write file
    fs.writeFileSync(filePath, pageContent)
    console.log(`Created: ${filePath}`)
  })
}

// Example usage - uncomment to run
// const exampleConverters: ConverterConfig[] = [
//   { category: "LengthUnits", name: "MetersToFeet", title: "Meters to Feet Converter (m → ft)", from: ["Meter","m"], to: ["Foot","ft"], factor: 3.280839895 },
//   { category: "LengthUnits", name: "MetersToInches", title: "Meters to Inches Converter (m → in)", from: ["Meter","m"], to: ["Inch","in"], factor: 39.37007874 }
// ]
// scaffoldConverters(exampleConverters)

export { scaffoldConverters, type ConverterConfig }
