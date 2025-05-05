import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Coins, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface EventBannerProps {
  title: string
  date: string
  location: string
  imageUrl: string
  coinCost: number
}

export default function EventBanner({ title, date, location, imageUrl, coinCost }: EventBannerProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <Badge className="absolute top-2 right-2 flex items-center gap-1">
          <Coins className="h-3 w-3" /> {coinCost} coins
        </Badge>
      </div>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/events/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"))}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
