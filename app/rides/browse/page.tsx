import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Calendar, Clock, Coins, Filter, MapPin, Star, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import RideMap from "@/components/ride-map"

export default function BrowseRidesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Browse Rides</h1>
          <p className="text-muted-foreground">
            Find available rides that match your schedule
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button asChild>
            <Link href="/rides/create">Create Ride</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Search Rides</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input placeholder="From: e.g. North Campus" />
                </div>
                <div className="space-y-2">
                  <Input placeholder="To: e.g. Engineering Building" />
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-4">
                <Select defaultValue="today">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="custom">Custom Date</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="anytime">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anytime">Anytime</SelectItem>
                    <SelectItem value="morning">Morning (6AM-12PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12PM-5PM)</SelectItem>
                    <SelectItem value="evening">Evening (5PM-10PM)</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button className="ml-auto">Search</Button>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All Rides</TabsTrigger>
                <TabsTrigger value="matches">Best Matches</TabsTrigger>
                <TabsTrigger value="nearby">Nearby</TabsTrigger>
              </TabsList>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="departure">Departure Time</SelectItem>
                  <SelectItem value="coins">Highest Coins</SelectItem>
                  <SelectItem value="distance">Shortest Distance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <TabsContent value="all" className="space-y-4">
              {[1, 2, 3, 4, 5].map((ride) => (
                <Card key={ride}>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-4 md:p-6 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">Central Library to North Campus</h3>
                            <p className="text-sm text-muted-foreground">Today at {3 + ride}:00 PM</p>
                          </div>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Coins className="h-3 w-3" /> +{10 + ride} coins
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>2.{ride} miles</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{ride} seat{ride > 1 ? 's' : ''} available</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>~{10 + ride} min</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>May {5 + ride}, 2025</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-4">
                          <div className="h-8 w-8 rounded-full overflow-hidden">
                            <Image 
                              src={`/placeholder.svg?height=32&width=32&text=U${ride}`} 
                              alt={`User ${ride}`} 
                              width={32} 
                              height={32} 
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Alex Johnson</div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                              <span>4.{ride} ({ride * 3} reviews)</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" asChild className="flex-1">
                            <Link href={`/rides/${ride}`}>View Details</Link>
                          </Button>
                          <Button size="sm" className="flex-1">Request Ride</Button>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-64 h-auto md:h-auto">
                        <div className="h-40 md:h-full relative">
                          <RideMap small />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="matches" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-center items-center flex-col gap-2 py-8">
                    <p className="text-muted-foreground">No matching rides found for your schedule.</p>
                    <Button variant="outline" asChild className="mt-2">
                      <Link href="/rides/create">Create a Ride Request</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="nearby" className="space-y-4">
              {[1, 2].map((ride) => (
                <Card key={ride}>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-4 md:p-6 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">Student Center to Engineering Building</h3>
                            <p className="text-sm text-muted-foreground">Today at {1 + ride}:00 PM</p>
                          </div>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Coins className="h-3 w-3" /> +{5 + ride} coins
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>0.{ride} miles</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{ride} seat{ride > 1 ? 's' : ''} available</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>~{5 + ride} min</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-4">
                          <div className="h-8 w-8 rounded-full overflow-hidden">
                            <Image 
                              src={`/placeholder.svg?height=32&width=32&text=U${ride}`} 
                              alt={`User ${ride}`} 
                              width={32} 
                              height={32} 
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Sarah Miller</div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                              <span>4.{8 - ride} ({ride * 5} reviews)</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" asChild className="flex-1">
                            <Link href={`/rides/${ride + 10}`}>View Details</Link>
                          </Button>
                          <Button size="sm" className="flex-1">Request Ride</Button>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-64 h-auto md:h-auto">
                        <div className="h-40 md:h-full relative">
                          <RideMap small />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filter Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Distance</Label>
                  <span className="text-sm text-muted-foreground\">5 miles</span>
                </div>
                <Slider
                  defaultValue={[5]}
                  max={20}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Departure Time</Label>
                <Select defaultValue="anytime">
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anytime">Anytime</SelectItem>
                    <SelectItem value="morning">Morning (6AM-12PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12PM-5PM)</SelectItem>
                    <SelectItem value="evening">Evening (5PM-10PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Seats Needed</Label>
                <Select defaultValue="1">
                  <SelectTrigger>
                    <SelectValue placeholder="Select seats" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 seat</SelectItem>
                    <SelectItem value="2">2 seats</SelectItem>
                    <SelectItem value="3">3 seats</SelectItem>
                    <SelectItem value="4">4+ seats</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Ride Type</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="request">Ride Requests</SelectItem>
                    <SelectItem value="offer">Ride Offers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Minimum Driver Rating</Label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Rating</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full">Apply Filters</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Popular Routes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "North Campus ↔ Engineering Building",
                "Student Housing ↔ Central Library",
                "Science Center ↔ Student Union",
                "Sports Complex ↔ Main Campus",
                "Downtown ↔ University Hospital"
              ].map((route, i) => (
                <Button key={i} variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/rides/browse?route=${i}`}>
                    <MapPin className="h-4 w-4 mr-2" />
                    {route}
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
