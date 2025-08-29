import ConverterPage from "@/app/utils/components/ConverterPage"

export default function CmToMillimetersPage() {
  const meta = {
    title: "Cm to Millimeters Converter (cm → mm)",
    fromUnit: { name: "Centimeter", symbol: "cm" },
    toUnit: { name: "Millimeter", symbol: "mm" },
    factor: 10,
    articleHtml: `
      <h3>How to convert centimeters to millimeters</h3>
      <p>To convert centimeters to millimeters, multiply the length value by 10. One centimeter equals 10 millimeters.</p>
      <p>The conversion formula is: millimeters = centimeters × 10</p>
    `,
  }

  const relatedLinks = [
    { href: "/Converters/LengthUnits/CmToMeters", title: "Cm to Meters Converter" },
    { href: "/Converters/CommonConversions/CmToInches", title: "Cm to Inches Converter" },
    { href: "/length", title: "All Length Converters" },
  ]

  return <ConverterPage meta={meta} relatedLinks={relatedLinks} />
}
