import ConverterPage from "@/app/utils/components/ConverterPage"

export default function CmToKilometersPage() {
  const meta = {
    title: "Cm to Kilometers Converter (cm → km)",
    fromUnit: { name: "Centimeter", symbol: "cm" },
    toUnit: { name: "Kilometer", symbol: "km" },
    factor: 0.00001,
    articleHtml: `
      <h3>How to convert centimeters to kilometers</h3>
      <p>To convert centimeters to kilometers, multiply the length value by 0.00001. One centimeter equals 0.00001 kilometers.</p>
      <p>The conversion formula is: kilometers = centimeters × 0.00001</p>
    `,
  }

  const relatedLinks = [
    { href: "/Converters/LengthUnits/CmToMeters", title: "Cm to Meters Converter" },
    { href: "/Converters/CommonConversions/CmToFeet", title: "Cm to Feet Converter" },
    { href: "/length", title: "All Length Converters" },
  ]

  return <ConverterPage meta={meta} relatedLinks={relatedLinks} />
}
