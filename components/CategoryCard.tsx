import Link from "next/link"
import type { Category } from "@/lib/catalog"

interface CategoryCardProps {
  category: Category
  converterCount: number
}

export default function CategoryCard({ category, converterCount }: CategoryCardProps) {
  return (
    <Link
      href={`/${category.id}`}
      className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
    >
      <h2 className="text-lg font-semibold text-blue-600 mb-2">{category.name}</h2>
      <p className="text-gray-600 text-sm mb-3">{category.description}</p>
      <div className="text-blue-600 text-sm font-medium">{converterCount} converters</div>
    </Link>
  )
}
