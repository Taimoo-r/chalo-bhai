"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Car, Coins, LogOut, Menu, MessageSquare, Search, Settings, User, X, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarTrigger } from "@/components/sidebar-provider"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AppHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <SidebarTrigger className="mr-2 md:hidden" />

        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-6 w-6" />
            <span className="font-bold">UniRide</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {isSearchOpen ? (
              <div className="flex items-center">
                <Input type="search" placeholder="Search rides, users..." className="h-9 md:w-[300px] lg:w-[400px]" />
                <Button variant="ghost" size="icon" className="ml-2" onClick={() => setIsSearchOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}
            <div className="hidden md:block">
              <Button variant="outline" size="sm" className="h-9 px-4" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search className="mr-2 h-4 w-4" />
                <span>Search rides, users...</span>
              </Button>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  3
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                {[1, 2, 3].map((notification) => (
                  <DropdownMenuItem key={notification} className="cursor-pointer py-3">
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        {notification === 1 ? (
                          <Car className="h-4 w-4 text-primary" />
                        ) : notification === 2 ? (
                          <MessageSquare className="h-4 w-4 text-primary" />
                        ) : (
                          <Coins className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {notification === 1
                            ? "New ride request match"
                            : notification === 2
                              ? "New message from Alex"
                              : "You earned 15 coins"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification === 1
                            ? "A new ride matches your schedule"
                            : notification === 2
                              ? "Hey, are you still available for the ride today?"
                              : "For completing your ride with Sarah"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification === 1 ? "5 min ago" : notification === 2 ? "20 min ago" : "1 hour ago"}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer justify-center">
                <Link href="/notifications">View all notifications</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <MobileNav />
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32&text=JD" alt="@user" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <Car className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/logout">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

function MobileNav() {
  return (
    <div className="flex flex-col gap-4 py-4">
      <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm font-medium">
        <Car className="h-5 w-5" />
        Dashboard
      </Link>
      <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm font-medium">
        <User className="h-5 w-5" />
        Profile
      </Link>
      <Link href="/rides/create" className="flex items-center gap-2 px-4 py-2 text-sm font-medium">
        <Plus className="h-5 w-5" />
        Create Ride
      </Link>
      <Link href="/rides/browse" className="flex items-center gap-2 px-4 py-2 text-sm font-medium">
        <Search className="h-5 w-5" />
        Browse Rides
      </Link>
      <Link href="/messages" className="flex items-center gap-2 px-4 py-2 text-sm font-medium">
        <MessageSquare className="h-5 w-5" />
        Messages
      </Link>
      <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm font-medium">
        <Settings className="h-5 w-5" />
        Settings
      </Link>
    </div>
  )
}
