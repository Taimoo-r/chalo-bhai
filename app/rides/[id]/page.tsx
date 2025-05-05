"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  Car,
  Check,
  Clock,
  Coins,
  MapPin,
  MessageSquare,
  Music,
  Phone,
  Shield,
  CigaretteIcon as Smoking,
  Star,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import RideMap from "@/components/ride-map"

export default function RideDetailsPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [requestSent, setRequestSent] = useState(false)

  const handleSendRequest = () => {
    setRequestSent(true)
    toast({
      title: "Request sent",
      description: "Your ride request has been sent to the driver.",
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ride Details</h1>
          <p className="text-muted-foreground">View details and request this ride</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/rides/browse">Back to Browse</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">Central Library to North Campus</CardTitle>
                  <CardDescription>Today at 5:00 PM</CardDescription>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Coins className="h-3 w-3" /> +15 coins
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>2.5 miles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>3 seats available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>~15 min travel time</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>May 10, 2025</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Route</h3>
                <div className="border rounded-md overflow-hidden h-64">
                  <RideMap />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Ride Preferences</h3>
                <div className="flex flex-wrap gap-4">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Music className="h-3 w-3" /> Music allowed
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Smoking className="h-3 w-3" /> No smoking
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" /> Same gender only
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Additional Notes</h3>
                <p className="text-sm text-muted-foreground">
                  I have a regular commute from the Central Library to North Campus. I usually have space for 3
                  passengers. I prefer to keep conversation minimal during the ride as I like to listen to podcasts.
                  Please be on time as I cannot wait more than 5 minutes.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              {!requestSent ? (
                <Button className="w-full" onClick={handleSendRequest}>
                  <Car className="h-4 w-4 mr-2" />
                  Request This Ride
                </Button>
              ) : (
                <Button className="w-full" variant="outline" disabled>
                  <Check className="h-4 w-4 mr-2" />
                  Request Sent
                </Button>
              )}
            </CardFooter>
          </Card>

          <Tabs defaultValue="reviews">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reviews">Driver Reviews</TabsTrigger>
              <TabsTrigger value="questions">Questions (3)</TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="space-y-4 pt-4">
              {[1, 2, 3].map((review) => (
                <Card key={review}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage
                          src={`/placeholder.svg?height=40&width=40&text=U${review}`}
                          alt={`User ${review}`}
                        />
                        <AvatarFallback>U{review}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">Sarah Miller</h4>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < 5 - (review % 2) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">April {10 + review}, 2025</p>
                        <p className="text-sm mt-2">
                          {review === 1
                            ? "Great driver! Very punctual and the ride was smooth. Would definitely ride with them again."
                            : review === 2
                              ? "The driver was friendly and got me to my destination on time. The car was clean and comfortable."
                              : "Excellent experience. The driver was professional and made sure everyone was comfortable during the ride."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="flex justify-center">
                <Button variant="ghost">View All Reviews</Button>
              </div>
            </TabsContent>

            <TabsContent value="questions" className="space-y-4 pt-4">
              {[1, 2, 3].map((question) => (
                <Card key={question}>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=Q${question}`}
                            alt={`User Q${question}`}
                          />
                          <AvatarFallback>Q{question}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">Mike Johnson</h4>
                            <Badge variant="outline" className="text-xs">
                              Question
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">May {1 + question}, 2025</p>
                          <p className="text-sm mt-2">
                            {question === 1
                              ? "Do you have space for a small backpack?"
                              : question === 2
                                ? "Is it possible to be dropped off at the Science Building instead of North Campus?"
                                : "What time do you usually arrive at North Campus?"}
                          </p>
                        </div>
                      </div>

                      {question !== 3 && (
                        <div className="flex items-start gap-4 pl-12">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40&text=AJ" alt="Alex Johnson" />
                            <AvatarFallback>AJ</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">Alex Johnson</h4>
                              <Badge variant="outline" className="text-xs">
                                Driver
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">May {2 + question}, 2025</p>
                            <p className="text-sm mt-2">
                              {question === 1
                                ? "Yes, there's plenty of space for backpacks and small bags."
                                : "I can drop you off at the Science Building, it's on the way."}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Ask a Question</h4>
                    <Textarea placeholder="Type your question here..." />
                    <Button>Send Question</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Driver</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64&text=AJ" alt="Alex Johnson" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">Alex Johnson</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">(15 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Toyota Corolla (Blue)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Verified Driver</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Member since January 2025</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/messages/driver-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="tel:+15551234567">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Rides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((ride) => (
                <div key={ride} className="border rounded-md p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Central Library to North Campus</h4>
                      <p className="text-xs text-muted-foreground">Today at {4 + ride}:00 PM</p>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Coins className="h-3 w-3" /> +{10 + ride}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span>
                      {ride} seat{ride > 1 ? "s" : ""}
                    </span>
                    <Clock className="h-3 w-3 text-muted-foreground ml-2" />
                    <span>~15 min</span>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link href={`/rides/${ride + 10}`}>View Ride</Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Emergency Assistance
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                In case of emergency, tap the button above to contact campus security and share your location.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
