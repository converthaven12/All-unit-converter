interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
}

export default function FAQ({ items }: FAQProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index}>
            <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
            <p className="text-gray-600 text-sm">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export { FAQ }
