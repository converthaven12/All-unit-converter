import Link from "next/link"
import { CATEGORIES, getConvertersByCategory } from "@/lib/catalog"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
      <div className="p-4">
        <div className="bg-blue-600 text-white px-3 py-2 rounded-md mb-4">
          <h2 className="font-semibold tracking-tighter">All Converters</h2>
        </div>
        <nav className="space-y-4">
          {CATEGORIES.map((category) => {
            const converters = getConvertersByCategory(category.id)
            return (
              <div key={category.id}>
                <Link
                  href={`/${category.id}`}
                  className="block font-medium text-gray-900 hover:text-white hover:bg-blue-600 px-2 py-1 rounded transition-colors mb-2"
                >
                  {category.name}
                </Link>
                <ul className="ml-3 space-y-1">
                  {converters.slice(0, 8).map((converter) => (
                    <li key={converter.slug}>
                      <Link
                        href={`/${converter.categoryId}/${converter.slug}`}
                        className="block text-sm text-gray-700 hover:text-white hover:bg-blue-600 px-2 py-1 rounded transition-colors"
                      >
                        {converter.from} → {converter.to}
                      </Link>
                    </li>
                  ))}
                  {converters.length > 8 && (
                    <li>
                      <Link
                        href={`/${category.id}`}
                        className="block text-sm text-blue-600 hover:text-blue-800 px-2 py-1"
                      >
                        View all {converters.length} converters →
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
