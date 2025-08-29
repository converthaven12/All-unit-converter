import ConverterPage from "@/app/utils/components/ConverterPage"

export default function CmToMetersPage() {
  const meta = {
    title: "Cm to Meters Converter (cm → m)",
    fromUnit: { name: "Centimeter", symbol: "cm" },
    toUnit: { name: "Meter", symbol: "m" },
    factor: 0.01,
    articleHtml: `
      <h3>How to convert centimeters to meters</h3>
      <p>To convert centimeters to meters, multiply the length value by 0.01. One centimeter equals 0.01 meters.</p>
      <p>The conversion formula is: meters = centimeters × 0.01</p>
    `,
  }

  const relatedLinks = [
    { href: "/Converters/LengthUnits/CmToKilometers", title: "Cm to Kilometers Converter" },
    { href: "/Converters/CommonConversions/CmToFeet", title: "Cm to Feet Converter" },
    { href: "/length", title: "All Length Converters" },
  ]

  return <ConverterPage meta={meta} relatedLinks={relatedLinks} />
}
