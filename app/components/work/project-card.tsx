import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  image: string
  category: string
  href: string
}

export default function ProjectCard({ title, image, category, href }: ProjectCardProps) {
  return (
    <Link href={href}>
      <Card className="overflow-hidden transition-all hover:scale-[1.02]">
        <div className="relative aspect-[4/3]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{category}</p>
        </CardContent>
      </Card>
    </Link>
  )
}