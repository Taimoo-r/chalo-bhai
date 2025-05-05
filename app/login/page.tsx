"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, KeyRound, Smartphone } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const { toast } = useToast()
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [twoFactorMethod, setTwoFactorMethod] = useState<"app" | "sms">("app")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setShowTwoFactor(true)
    toast({
      title: "2FA Required",
      description: "Please complete two-factor authentication to continue.",
    })
  }

  const handleVerify2FA = () => {
    toast({
      title: "Login successful",
      description: "You have been logged in successfully.",
    })
    // Redirect to dashboard
    window.location.href = "/dashboard"
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="border-2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showTwoFactor ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.name@university.edu" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Button type="submit" className="w-full">
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800 text-sm">
                For your security, we need to verify your identity. We've sent a verification code to your registered
                device.
              </div>

              <Tabs value={twoFactorMethod} onValueChange={(v) => setTwoFactorMethod(v as "app" | "sms")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="app">
                    <KeyRound className="h-4 w-4 mr-2" />
                    Authenticator App
                  </TabsTrigger>
                  <TabsTrigger value="sms">
                    <Smartphone className="h-4 w-4 mr-2" />
                    SMS Code
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="app" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="authCode">Authentication Code</Label>
                    <Input id="authCode" placeholder="Enter 6-digit code" maxLength={6} />
                  </div>
                </TabsContent>
                <TabsContent value="sms" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="smsCode">SMS Code</Label>
                    <Input id="smsCode" placeholder="Enter 6-digit code" maxLength={6} />
                  </div>
                </TabsContent>
              </Tabs>

              <Button onClick={handleVerify2FA} className="w-full">
                Verify and Sign In
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="text-center w-full">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
