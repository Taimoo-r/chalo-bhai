"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, CheckCircle2, Info } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  const handleSendVerification = () => {
    setVerificationSent(true)
    toast({
      title: "Verification email sent",
      description: "Please check your university email for the verification code.",
    })
  }

  const handleVerify = () => {
    if (verificationCode.length === 6) {
      setStep(2)
      toast({
        title: "Email verified successfully",
        description: "Your university email has been verified.",
      })
    } else {
      toast({
        title: "Invalid verification code",
        description: "Please enter the 6-digit code sent to your email.",
        variant: "destructive",
      })
    }
  }

  const handleRegister = () => {
    toast({
      title: "Registration successful",
      description: "Your account has been created. You can now log in.",
    })
    // Redirect to login page
    window.location.href = "/login"
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="border-2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Join UniRide to start sharing rides with fellow students</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">University Email</Label>
                <div className="flex space-x-2">
                  <Input id="email" type="email" placeholder="your.name@university.edu" className="flex-1" />
                  <Button onClick={handleSendVerification} disabled={verificationSent}>
                    {verificationSent ? "Sent" : "Verify"}
                  </Button>
                </div>
                {verificationSent && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    Verification code sent to your university email
                  </p>
                )}
              </div>

              {verificationSent && (
                <div className="space-y-2">
                  <Label htmlFor="verification">Verification Code</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="verification"
                      placeholder="6-digit code"
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleVerify}>Verify</Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-sm text-green-600 mb-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>University email verified</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input id="studentId" placeholder="e.g. S12345678" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your university" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uni1">University of Technology</SelectItem>
                    <SelectItem value="uni2">State University</SelectItem>
                    <SelectItem value="uni3">National University</SelectItem>
                    <SelectItem value="uni4">City University</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary underline">
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary underline">
                    privacy policy
                  </Link>
                </label>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          {step === 1 ? (
            <div className="w-full flex justify-between items-center">
              <Link href="/login" className="text-sm text-muted-foreground hover:underline">
                Already have an account?
              </Link>
            </div>
          ) : (
            <div className="w-full space-y-4">
              <Button className="w-full" onClick={handleRegister}>
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="text-center">
                <Link href="/login" className="text-sm text-muted-foreground hover:underline">
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
