import Link from "next/link"

export default function LengthPage() {
  const lengthConverters = [
    { href: "/Converters/LengthUnits/CmToKilometers", title: "Centimeters to Kilometers" },
    { href: "/Converters/LengthUnits/CmToMeters", title: "Centimeters to Meters" },
    { href: "/Converters/LengthUnits/CmToMillimeters", title: "Centimeters to Millimeters" },
    { href: "/Converters/CommonConversions/CmToFeet", title: "Centimeters to Feet" },
    { href: "/Converters/CommonConversions/CmToInches", title: "Centimeters to Inches" },
  ]

  const faqs = [
    {
      question: "How accurate are these length conversions?",
      answer:
        "Our length converters use precise conversion factors to ensure accuracy up to 6 decimal places, suitable for most practical applications.",
    },
    {
      question: "What is the difference between metric and imperial units?",
      answer:
        "Metric units (like meters, centimeters) are based on powers of 10, while imperial units (like feet, inches) have different conversion ratios between units.",
    },
    {
      question: "Can I convert between any length units?",
      answer:
        "Yes, our converters support conversions between all common length units including metric (mm, cm, m, km) and imperial (in, ft, yd, mi) measurements.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1>Length Unit Converters</h1>

      <div className="mb-8">
        <p className="text-lg text-gray-600 mb-6">
          Convert between different length units quickly and accurately. Our length converters support metric and
          imperial units with precise conversion factors.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
        <h2>Available Length Converters</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {lengthConverters.map((converter, index) => (
            <Link
              key={index}
              href={converter.href}
              className="block p-4 border border-gray-200 rounded-md hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <span className="text-blue-600 hover:text-blue-800 font-medium">{converter.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2>Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
