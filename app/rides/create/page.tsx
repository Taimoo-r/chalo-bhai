"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Car, Coins, Info, MapPin, Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import RideMap from "@/components/ride-map"

export default function CreateRidePage() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date>()
  const [step, setStep] = useState(1)

  const handleCreateRide = () => {
    toast({
      title: "Ride created successfully",
      description: "Your ride request has been posted.",
    })
    // Redirect to dashboard
    window.location.href = "/dashboard"
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create a Ride</h1>
        <p className="text-muted-foreground">Post a ride request to find drivers or passengers</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ride Details</CardTitle>
          <CardDescription>Provide details about your ride to help match with the right people</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 ? (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rideType">Ride Type</Label>
                  <RadioGroup defaultValue="request" id="rideType" className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="request" id="request" />
                      <Label htmlFor="request" className="font-normal">
                        Request a Ride (I need a driver)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="offer" id="offer" />
                      <Label htmlFor="offer" className="font-normal">
                        Offer a Ride (I am driving)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickup">Pickup Location</Label>
                    <div className="flex space-x-2">
                      <Input id="pickup" placeholder="e.g. North Campus" />
                      <Button variant="outline" size="icon">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <div className="flex space-x-2">
                      <Input id="destination" placeholder="e.g. Engineering Building" />
                      <Button variant="outline" size="icon">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Select>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }).map((_, i) => (
                          <SelectItem key={i} value={`${i}:00`}>
                            {i === 0 ? "12:00 AM" : i < 12 ? `${i}:00 AM` : i === 12 ? "12:00 PM" : `${i - 12}:00 PM`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="seats">Number of Seats</Label>
                    <span className="text-sm text-muted-foreground">3 seats</span>
                  </div>
                  <Slider defaultValue={[3]} max={7} min={1} step={1} className="w-full" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recurring">Recurring Ride</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="recurring" />
                    <Label htmlFor="recurring" className="font-normal">
                      This is a recurring ride
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)}>
                  Continue
                  <Plus className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific details about your ride (e.g., luggage space needed, etc.)"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Ride Preferences</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="music" />
                      <Label htmlFor="music" className="font-normal">
                        Music allowed
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="smoking" />
                      <Label htmlFor="smoking" className="font-normal">
                        Smoking allowed
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="pets" />
                      <Label htmlFor="pets" className="font-normal">
                        Pets allowed
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="samegender" />
                      <Label htmlFor="samegender" className="font-normal">
                        Same gender only
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Coin Reward</Label>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Info className="h-4 w-4" />
                      <span>Your balance: 125 coins</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-yellow-500" />
                    <Select defaultValue="15">
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Coins" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground">coins for this ride</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Route Preview</Label>
                  <div className="border rounded-md overflow-hidden h-64">
                    <RideMap />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleCreateRide}>
                  Create Ride
                  <Car className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
