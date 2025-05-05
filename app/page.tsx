import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, Coins, MapPin, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import EventBanner from "@/components/event-banner"
import RideStats from "@/components/ride-stats"

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Welcome to UniRide</h1>
            <p className="text-muted-foreground text-lg">
              The smart way to share rides on campus. Earn coins, attend events, and make connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link href="/rides/create">
                  Request a Ride <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/rides/browse">Browse Available Rides</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-full md:w-1/2 aspect-video rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Students sharing a ride"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-6">
        <h2 className="text-2xl font-bold mb-6">Upcoming University Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EventBanner
            title="Speed Programming Contest"
            date="May 15, 2025"
            location="Computer Science Building"
            imageUrl="/placeholder.svg?height=200&width=400"
            coinCost={50}
          />
          <EventBanner
            title="Qawali Night"
            date="May 20, 2025"
            location="University Amphitheater"
            imageUrl="/placeholder.svg?height=200&width=400"
            coinCost={30}
          />
          <EventBanner
            title="Tech Hackathon"
            date="June 5, 2025"
            location="Innovation Center"
            imageUrl="/placeholder.svg?height=200&width=400"
            coinCost={60}
          />
        </div>
      </section>

      <section>
        <Tabs defaultValue="available" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Rides</h2>
            <TabsList>
              <TabsTrigger value="available">Available</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="available" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((ride) => (
                <Card key={ride}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Central Library to North Campus</CardTitle>
                        <CardDescription>Today at {3 + ride}:00 PM</CardDescription>
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Coins className="h-3 w-3" /> +15 coins
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>2.5 miles</span>
                      <Users className="h-4 w-4 text-muted-foreground ml-2" />
                      <span>2 seats</span>
                      <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                      <span>15 min</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={`/rides/${ride}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="ghost" asChild>
                <Link href="/rides/browse">View All Available Rides</Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((ride) => (
                <Card key={ride}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Engineering Building to Student Housing</CardTitle>
                        <CardDescription>Tomorrow at {1 + ride}:00 PM</CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>May {5 + ride}, 2025</span>
                      <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                      <span>{1 + ride}:00 PM</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={`/rides/upcoming/${ride}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="ghost" asChild>
                <Link href="/rides/upcoming">View All Upcoming Rides</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <RideStats />
    </div>
  )
}
