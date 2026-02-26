"use client"

import * as React from "react"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Phone,
  Heart,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"

type AuthMode = "login" | "signup"
type AccountType = "student" | "parent"

interface PasswordStrength {
  score: number
  label: string
  color: string
  checks: { label: string; passed: boolean }[]
}

function getPasswordStrength(password: string): PasswordStrength {
  const checks = [
    { label: "At least 8 characters", passed: password.length >= 8 },
    { label: "Contains uppercase letter", passed: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", passed: /[a-z]/.test(password) },
    { label: "Contains a number", passed: /[0-9]/.test(password) },
    { label: "Contains special character", passed: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ]
  const score = checks.filter((c) => c.passed).length
  const labels: Record<number, { label: string; color: string }> = {
    0: { label: "Very Weak", color: "bg-destructive" },
    1: { label: "Weak", color: "bg-destructive" },
    2: { label: "Fair", color: "bg-chart-5" },
    3: { label: "Good", color: "bg-warning" },
    4: { label: "Strong", color: "bg-info" },
    5: { label: "Excellent", color: "bg-success" },
  }
  return { score, ...labels[score], checks }
}

interface AuthPageProps {
  onLogin: (name: string, accountType: AccountType) => void
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [mode, setMode] = React.useState<AuthMode>("login")
  const [accountType, setAccountType] = React.useState<AccountType>("student")
  const [showPassword, setShowPassword] = React.useState(false)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [childName, setChildName] = React.useState("")
  const [childAge, setChildAge] = React.useState("")
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const strength = getPasswordStrength(password)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (mode === "signup") {
      if (!name || !email || !password || !confirmPassword) {
        setError("All fields are required")
        return
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match")
        return
      }
      if (strength.score < 3) {
        setError("Password is too weak. Please make it stronger.")
        return
      }
      if (accountType === "parent" && (!childName || !childAge)) {
        setError("Please fill in your child's details")
        return
      }
    } else {
      if (!email || !password) {
        setError("Email and password are required")
        return
      }
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin(
        name || email.split("@")[0],
        accountType
      )
    }, 1200)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-5xl">
        <div className="grid gap-0 overflow-hidden rounded-2xl border border-border shadow-xl dark:shadow-2xl lg:grid-cols-5">
          {/* Left Panel - Branding */}
          <div className="relative flex flex-col items-center justify-center bg-secondary p-8 dark:bg-card lg:col-span-2 lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent dark:from-primary/10" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-6 flex size-20 items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-lg shadow-primary/10 dark:bg-primary/10 dark:shadow-primary/5">
                <Image
                  src="/images/logo.jpg"
                  alt="GrowthBuddy Logo"
                  width={80}
                  height={80}
                  className="rounded-xl object-cover"
                />
              </div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
                GrowthBuddy
              </h1>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Adaptive Learning Engine
              </p>
              <div className="mt-8 flex flex-col gap-3 text-left">
                {[
                  "AI-powered weakness detection",
                  "Personalized learning paths",
                  "Smart quiz engine",
                  "Performance analytics",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-primary" />
                    <span className="text-xs text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Mental Health Support */}
              <div className="mt-8 w-full rounded-xl border border-chart-4/20 bg-chart-4/5 p-4">
                <div className="flex items-center gap-2">
                  <Heart className="size-4 text-chart-4" />
                  <span className="text-xs font-semibold text-chart-4">Need Support?</span>
                </div>
                <p className="mt-1.5 text-[11px] text-muted-foreground leading-relaxed">
                  If you or someone you know is struggling, reach out:
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Phone className="size-3 text-chart-4" />
                  <a
                    href="tel:988"
                    className="text-xs font-bold text-chart-4 hover:underline"
                  >
                    988 Suicide & Crisis Lifeline
                  </a>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <Phone className="size-3 text-chart-4" />
                  <a
                    href="tel:18002738255"
                    className="text-xs font-bold text-chart-4 hover:underline"
                  >
                    1-800-273-8255
                  </a>
                </div>
                <p className="mt-1.5 text-[10px] text-muted-foreground">
                  Available 24/7, free and confidential.
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="flex flex-col justify-center bg-card p-6 dark:bg-background lg:col-span-3 lg:p-10">
            <div className="mx-auto w-full max-w-sm">
              {/* Account Type Toggle */}
              <div className="mb-6 flex rounded-xl border border-border bg-card p-1">
                <button
                  onClick={() => setAccountType("student")}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all",
                    accountType === "student"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <User className="size-4" />
                  Student
                </button>
                <button
                  onClick={() => setAccountType("parent")}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all",
                    accountType === "parent"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <ShieldCheck className="size-4" />
                  Parent
                </button>
              </div>

              {/* Mode Toggle */}
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-foreground">
                  {mode === "login" ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {mode === "login"
                    ? `Sign in as ${accountType === "parent" ? "a Parent" : "a Student"}`
                    : `Register as ${accountType === "parent" ? "a Parent" : "a Student"}`}
                </p>
                {accountType === "student" && (
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    Students 18+ do not require parental supervision
                  </p>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {mode === "signup" && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 border-border bg-card pl-10 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                )}

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 border-border bg-card pl-10 text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 border-border bg-card pl-10 pr-10 text-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>

                {/* Password Strength */}
                {mode === "signup" && password.length > 0 && (
                  <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Password Strength</span>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-[10px]",
                          strength.score <= 2 && "bg-destructive/10 text-destructive",
                          strength.score === 3 && "bg-warning/10 text-warning",
                          strength.score >= 4 && "bg-success/10 text-success"
                        )}
                      >
                        {strength.label}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={cn(
                            "h-1.5 flex-1 rounded-full transition-all",
                            level <= strength.score ? strength.color : "bg-secondary"
                          )}
                        />
                      ))}
                    </div>
                    <div className="flex flex-col gap-1">
                      {strength.checks.map((check) => (
                        <div key={check.label} className="flex items-center gap-1.5">
                          {check.passed ? (
                            <CheckCircle2 className="size-3 text-success" />
                          ) : (
                            <XCircle className="size-3 text-muted-foreground" />
                          )}
                          <span
                            className={cn(
                              "text-[10px]",
                              check.passed ? "text-success" : "text-muted-foreground"
                            )}
                          >
                            {check.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {mode === "signup" && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={cn(
                        "h-11 border-border bg-card pl-10 text-foreground placeholder:text-muted-foreground",
                        confirmPassword &&
                          password !== confirmPassword &&
                          "border-destructive"
                      )}
                    />
                    {confirmPassword && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {password === confirmPassword ? (
                          <CheckCircle2 className="size-4 text-success" />
                        ) : (
                          <XCircle className="size-4 text-destructive" />
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Parent-specific fields */}
                {mode === "signup" && accountType === "parent" && (
                  <div className="flex flex-col gap-3 rounded-lg border border-info/20 bg-info/5 p-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="size-4 text-info" />
                      <span className="text-xs font-semibold text-info">
                        Child Information
                      </span>
                    </div>
                    <Input
                      placeholder="Child's Full Name"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="h-10 border-border bg-card text-foreground placeholder:text-muted-foreground"
                    />
                    <Input
                      type="number"
                      placeholder="Child's Age"
                      min={5}
                      max={17}
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      className="h-10 border-border bg-card text-foreground placeholder:text-muted-foreground"
                    />
                    <p className="text-[10px] text-muted-foreground">
                      As a parent, you will have a supervision dashboard to monitor progress.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                    <XCircle className="size-4 shrink-0 text-destructive" />
                    <span className="text-xs text-destructive">{error}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      {mode === "login" ? "Signing in..." : "Creating account..."}
                    </div>
                  ) : mode === "login" ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              {/* Switch mode */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    onClick={() => {
                      setMode(mode === "login" ? "signup" : "login")
                      setError("")
                    }}
                    className="font-semibold text-primary hover:underline"
                  >
                    {mode === "login" ? "Sign Up" : "Sign In"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
