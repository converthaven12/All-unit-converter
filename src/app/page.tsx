import Link from "next/link"

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Free Online Unit Converters</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Convert between different units of measurement quickly and accurately. Choose from our collection of precise
          conversion tools.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Length Conversions</h2>
          <p className="text-gray-600 mb-4">Convert between centimeters, meters, feet, inches, and more.</p>
          <Link
            href="/length"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Length Converters
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Popular Converters</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/Converters/CommonConversions/CmToFeet" className="text-blue-600 hover:text-blue-800">
                Centimeters to Feet
              </Link>
            </li>
            <li>
              <Link href="/Converters/CommonConversions/CmToInches" className="text-blue-600 hover:text-blue-800">
                Centimeters to Inches
              </Link>
            </li>
            <li>
              <Link href="/Converters/LengthUnits/CmToMeters" className="text-blue-600 hover:text-blue-800">
                Centimeters to Meters
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
