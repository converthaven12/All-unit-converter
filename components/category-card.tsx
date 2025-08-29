import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CategoryCardProps {
  name: string
  description: string
  href: string
  unitCount: number
  popularUnits: string[]
  className?: string
}

export function CategoryCard({ name, description, href, unitCount, popularUnits, className }: CategoryCardProps) {
  return (
    <Link href={href} className="block group">
      <Card
        className={`h-full transition-all duration-200 group-hover:shadow-md group-hover:border-primary/20 ${className}`}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">{name}</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {unitCount} units
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-1">
            {popularUnits.slice(0, 4).map((unit) => (
              <Badge key={unit} variant="outline" className="text-xs">
                {unit}
              </Badge>
            ))}
            {popularUnits.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{popularUnits.length - 4} more
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
