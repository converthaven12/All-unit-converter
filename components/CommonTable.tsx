"use client"

interface CommonTableProps {
  title?: string
  leftLabel: string
  rightLabel: string
  rows?: Array<[string, string]>
  className?: string
}

export default function CommonTable({
  title = "Common Conversions",
  leftLabel,
  rightLabel,
  rows,
  className = "",
}: CommonTableProps) {
  const handleDownloadCSV = () => {
    if (!rows) return

    const csvContent = [`${leftLabel},${rightLabel}`, ...rows.map((row) => `${row[0]},${row[1]}`)].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `conversion-table.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {rows && (
          <button
            onClick={handleDownloadCSV}
            className="px-3 py-1 text-sm bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition-colors"
          >
            Download CSV
          </button>
        )}
      </div>
      <div className="overflow-x-auto max-h-96">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {leftLabel}
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {rightLabel}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows ? (
              rows.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-mono">{row[0]}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-mono">{row[1]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-6 py-8 text-center text-gray-500">
                  Generating…
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { CommonTable }
