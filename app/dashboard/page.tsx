import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowRight, Bell, Calendar, Car, Clock, Coins, MapPin, MessageSquare, Star, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import CoinBalance from "@/components/coin-balance"
import NotificationList from "@/components/notification-list"
import RideStats from "@/components/ride-stats"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <section className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your rides and activity.</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Rides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
              </CardContent>
              <CardFooter>
                <Link href="/rides/upcoming" className="text-xs text-muted-foreground hover:underline">
                  View all upcoming rides
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Rides Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">27</div>
              </CardContent>
              <CardFooter>
                <Link href="/rides/past" className="text-xs text-muted-foreground hover:underline">
                  View ride history
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center">
                  4.8
                  <Star className="h-4 w-4 ml-1 fill-yellow-400 text-yellow-400" />
                </div>
              </CardContent>
              <CardFooter>
                <span className="text-xs text-muted-foreground">Based on 15 reviews</span>
              </CardFooter>
            </Card>
          </div>

          <Alert>
            <Bell className="h-4 w-4" />
            <AlertTitle>New ride request matches your schedule!</AlertTitle>
            <AlertDescription>
              There are 2 new ride requests that match your usual route to campus.
              <Button variant="link" size="sm" asChild className="p-0 h-auto font-normal">
                <Link href="/rides/browse">View matches</Link>
              </Button>
            </AlertDescription>
          </Alert>

          <section>
            <h2 className="text-xl font-bold mb-4">Your Next Ride</h2>
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Engineering Building to Student Housing</CardTitle>
                    <CardDescription>Today at 5:30 PM</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>2.5 miles</span>
                    <Users className="h-4 w-4 text-muted-foreground ml-2" />
                    <span>3 passengers</span>
                    <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                    <span>15 min</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((user) => (
                        <div key={user} className="h-8 w-8 rounded-full border-2 border-background overflow-hidden">
                          <Image
                            src={`/placeholder.svg?height=32&width=32&text=U${user}`}
                            alt={`User ${user}`}
                            width={32}
                            height={32}
                          />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">You'll be riding with Sarah, Mike, and Alex</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href="/rides/upcoming/1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Link>
                </Button>
                <Button size="sm" className="flex-1" asChild>
                  <Link href="/rides/upcoming/1">
                    <Car className="h-4 w-4 mr-2" />
                    View Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </section>
        </div>

        <div className="w-full md:w-80 space-y-6">
          <CoinBalance balance={125} />

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <NotificationList />
            </CardContent>
            <CardFooter className="pt-2 pb-4">
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/notifications">View All Notifications</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Speed Programming Contest</h3>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Coins className="h-3 w-3" /> 50
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>May 15, 2025</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Computer Science Building</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Qawali Night</h3>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Coins className="h-3 w-3" /> 30
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>May 20, 2025</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>University Amphitheater</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/events">
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <RideStats />
    </div>
  )
}
