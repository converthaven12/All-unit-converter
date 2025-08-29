import ConverterPage from "@/app/utils/components/ConverterPage"

export default function CmToInchesPage() {
  const meta = {
    title: "Cm to Inches Converter (cm → in)",
    fromUnit: { name: "Centimeter", symbol: "cm" },
    toUnit: { name: "Inch", symbol: "in" },
    factor: 0.3937007874,
    articleHtml: `
      <h3>How to convert centimeters to inches</h3>
      <p>To convert centimeters to inches, multiply the length value by 0.3937007874. One centimeter equals 0.3937007874 inches.</p>
      <p>The conversion formula is: inches = centimeters × 0.3937007874</p>
    `,
  }

  const relatedLinks = [
    { href: "/Converters/CommonConversions/CmToFeet", title: "Cm to Feet Converter" },
    { href: "/Converters/LengthUnits/CmToMeters", title: "Cm to Meters Converter" },
    { href: "/length", title: "All Length Converters" },
  ]

  return <ConverterPage meta={meta} relatedLinks={relatedLinks} />
}
