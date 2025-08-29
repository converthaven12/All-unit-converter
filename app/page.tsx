export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Unit Converter</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert between different units of measurement quickly and accurately. Choose from length, weight,
            temperature, and more.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">Length</h2>
            <p className="text-blue-700 mb-4">Convert between meters, feet, inches, kilometers, and more.</p>
            <div className="space-y-2">
              <div className="text-sm text-blue-600">• Meters to Feet</div>
              <div className="text-sm text-blue-600">• Centimeters to Inches</div>
              <div className="text-sm text-blue-600">• Kilometers to Miles</div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h2 className="text-xl font-semibold text-green-900 mb-3">Weight</h2>
            <p className="text-green-700 mb-4">Convert between kilograms, pounds, ounces, and more.</p>
            <div className="space-y-2">
              <div className="text-sm text-green-600">• Kilograms to Pounds</div>
              <div className="text-sm text-green-600">• Grams to Ounces</div>
              <div className="text-sm text-green-600">• Tons to Pounds</div>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h2 className="text-xl font-semibold text-red-900 mb-3">Temperature</h2>
            <p className="text-red-700 mb-4">Convert between Celsius, Fahrenheit, and Kelvin.</p>
            <div className="space-y-2">
              <div className="text-sm text-red-600">• Celsius to Fahrenheit</div>
              <div className="text-sm text-red-600">• Fahrenheit to Kelvin</div>
              <div className="text-sm text-red-600">• Kelvin to Celsius</div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h2 className="text-xl font-semibold text-purple-900 mb-3">Volume</h2>
            <p className="text-purple-700 mb-4">Convert between liters, gallons, cups, and more.</p>
            <div className="space-y-2">
              <div className="text-sm text-purple-600">• Liters to Gallons</div>
              <div className="text-sm text-purple-600">• Milliliters to Cups</div>
              <div className="text-sm text-purple-600">• Gallons to Liters</div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h2 className="text-xl font-semibold text-yellow-900 mb-3">Area</h2>
            <p className="text-yellow-700 mb-4">Convert between square meters, acres, square feet, and more.</p>
            <div className="space-y-2">
              <div className="text-sm text-yellow-600">• Square Meters to Square Feet</div>
              <div className="text-sm text-yellow-600">• Acres to Hectares</div>
              <div className="text-sm text-yellow-600">• Square Miles to Square Kilometers</div>
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
            <h2 className="text-xl font-semibold text-indigo-900 mb-3">Speed</h2>
            <p className="text-indigo-700 mb-4">Convert between mph, km/h, m/s, and more.</p>
            <div className="space-y-2">
              <div className="text-sm text-indigo-600">• Miles per Hour to Km/h</div>
              <div className="text-sm text-indigo-600">• Meters per Second to Mph</div>
              <div className="text-sm text-indigo-600">• Knots to Km/h</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
