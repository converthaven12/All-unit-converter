import ConverterPage from "@/app/utils/components/ConverterPage"

export default function CmToFeetPage() {
  const meta = {
    title: "Cm to Feet Converter (cm → ft)",
    fromUnit: { name: "Centimeter", symbol: "cm" },
    toUnit: { name: "Foot", symbol: "ft" },
    factor: 0.03280839895,
    articleHtml: `
      <h3>How to convert centimeters to feet</h3>
      <p>To convert centimeters to feet, multiply the length value by 0.03280839895. One centimeter equals 0.03280839895 feet.</p>
      <p>The conversion formula is: feet = centimeters × 0.03280839895</p>
    `,
  }

  const relatedLinks = [
    { href: "/Converters/CommonConversions/CmToInches", title: "Cm to Inches Converter" },
    { href: "/Converters/LengthUnits/CmToMeters", title: "Cm to Meters Converter" },
    { href: "/length", title: "All Length Converters" },
  ]

  return <ConverterPage meta={meta} relatedLinks={relatedLinks} />
}
