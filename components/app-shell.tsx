"use client"

import * as React from "react"
import {
  LayoutDashboard, Brain, Route, Trophy, Bell, Clock, Zap, ChevronRight,
  Search, User, Settings, LogOut, Moon, Sun, Phone, Heart, ShieldCheck,
  Menu, Award, X, MessageCircle, BarChart3, BookOpen, AlertTriangle,
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { subjects } from "@/lib/data"

interface AppShellProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
  unreadNudges: number
  userName: string
  accountType: "student" | "parent"
  streak: number
  onLogout: () => void
}

const studentNavItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "quiz", label: "Smart Quiz", icon: Brain },
  { id: "paths", label: "Learning Paths", icon: Route },
  { id: "analytics", label: "Leaderboard", icon: Trophy },
  { id: "streaks", label: "Streak Awards", icon: Award },
  { id: "nudges", label: "Smart Nudges", icon: Bell },
  { id: "optimizer", label: "Study Optimizer", icon: Clock },
]

const parentNavItems = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "parent-monitor", label: "Child Monitor", icon: ShieldCheck },
  { id: "analytics", label: "Leaderboard", icon: Trophy },
  { id: "nudges", label: "Alerts", icon: Bell },
]

export function AppShell({ children, activeTab, onTabChange, unreadNudges, userName, accountType, streak, onLogout }: AppShellProps) {
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const navItems = accountType === "parent" ? parentNavItems : studentNavItems
  const initials = userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Mobile Overlay */}
        {mobileOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />}

        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-sidebar transition-all duration-300 ease-in-out",
          collapsed ? "w-[68px]" : "w-[260px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}>
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-border px-4">
            <div className="flex size-9 items-center justify-center overflow-hidden rounded-xl bg-card shadow-sm ring-1 ring-border dark:bg-transparent dark:shadow-none dark:ring-0">
              <Image src="/images/logo.jpg" alt="GrowthBuddy" width={36} height={36} className="rounded-xl object-cover" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-gradient font-[family-name:var(--font-display)]">GrowthBuddy</span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  {accountType === "parent" ? "Parent Mode" : "Adaptive Engine"}
                </span>
              </div>
            )}
            <button onClick={() => setMobileOpen(false)} className="ml-auto flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground lg:hidden">
              <X className="size-4" />
            </button>
          </div>

          {/* Parent Mode Badge */}
          {!collapsed && accountType === "parent" && (
            <div className="mx-3 mt-3 rounded-lg border border-info/20 bg-info/5 p-2.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-info" />
                <span className="text-[11px] font-semibold text-info">Parent Supervision</span>
              </div>
              <p className="mt-0.5 text-[10px] text-muted-foreground">Monitoring child progress & safety</p>
            </div>
          )}

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id
                return (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => { onTabChange(item.id); setMobileOpen(false) }}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                          isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        {isActive && <div className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />}
                        <item.icon className={cn("size-[18px] shrink-0", isActive && "text-primary")} />
                        {!collapsed && <span>{item.label}</span>}
                        {!collapsed && item.id === "nudges" && unreadNudges > 0 && (
                          <Badge className="ml-auto h-5 min-w-5 bg-primary text-primary-foreground text-[10px] px-1.5">{unreadNudges}</Badge>
                        )}
                      </button>
                    </TooltipTrigger>
                    {collapsed && <TooltipContent side="right" className="bg-popover text-popover-foreground">{item.label}</TooltipContent>}
                  </Tooltip>
                )
              })}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-border p-3">
            {!collapsed && (
              <div className="mb-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
                <div className="flex items-center gap-2">
                  <Zap className="size-4 text-primary" />
                  <span className="text-xs font-semibold text-primary">{streak} Day Streak</span>
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground leading-relaxed">
                  {streak >= 6 ? "Incredible consistency!" : "Keep going for your next award!"}
                </p>
              </div>
            )}
            {!collapsed && (
              <Dialog>
                <DialogTrigger asChild>
                  <button className="mb-3 flex w-full items-center gap-2 rounded-lg border border-chart-4/20 bg-chart-4/5 p-2.5 text-left transition-colors hover:bg-chart-4/10">
                    <Heart className="size-4 shrink-0 text-chart-4" />
                    <div>
                      <span className="text-[11px] font-semibold text-chart-4">Need Help?</span>
                      <p className="text-[9px] text-muted-foreground">Crisis support available</p>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-foreground">
                      <Heart className="size-5 text-chart-4" /> Mental Health Support
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your mental health matters. If you or someone you know is struggling, please reach out to a trained counselor.
                    </p>
                    {[
                      { href: "tel:988", label: "988 Suicide & Crisis Lifeline", sub: "Call or text 988 - Available 24/7", color: "chart-4" },
                      { href: "tel:18002738255", label: "SAMHSA Helpline", sub: "1-800-662-4357 - Free & Confidential", color: "info" },
                      { href: "sms:741741&body=HELLO", label: "Crisis Text Line", sub: "Text HOME to 741741", color: "primary" },
                    ].map((line) => (
                      <a key={line.href} href={line.href} className={`flex items-center gap-3 rounded-xl border border-${line.color}/20 bg-${line.color}/5 p-4 transition-colors hover:bg-${line.color}/10`}>
                        <Phone className={`size-5 text-${line.color}`} />
                        <div>
                          <p className="text-sm font-semibold text-foreground">{line.label}</p>
                          <p className="text-xs text-muted-foreground">{line.sub}</p>
                        </div>
                      </a>
                    ))}
                    <p className="text-[10px] text-muted-foreground text-center">All services are free, confidential, and available 24/7.</p>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            <button onClick={() => setCollapsed(!collapsed)} className="flex w-full items-center justify-center rounded-lg py-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              <ChevronRight className={cn("size-4 transition-transform duration-300", collapsed ? "" : "rotate-180")} />
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className={cn("flex flex-1 flex-col transition-all duration-300", collapsed ? "lg:ml-[68px]" : "lg:ml-[260px]")}>
          {/* Top Bar */}
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/90 px-4 shadow-sm backdrop-blur-xl dark:bg-background/80 dark:shadow-none lg:h-16 lg:px-6">
            <button onClick={() => setMobileOpen(true)} className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent lg:hidden">
              <Menu className="size-5" />
            </button>
            <div className="relative hidden flex-1 max-w-md sm:block">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search topics, quizzes, paths..." className="h-9 border-border bg-secondary/50 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:bg-accent" />
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              {mounted && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-9 text-muted-foreground hover:text-foreground" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                      {theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-popover text-popover-foreground">{theme === "dark" ? "Light Mode" : "Dark Mode"}</TooltipContent>
                </Tooltip>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative size-9 text-muted-foreground hover:text-foreground" onClick={() => onTabChange("nudges")}>
                    <Bell className="size-[18px]" />
                    {unreadNudges > 0 && <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary animate-pulse" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-popover text-popover-foreground">Notifications</TooltipContent>
              </Tooltip>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 px-2 text-foreground hover:bg-accent">
                    <Avatar className="size-7 border border-primary/30">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">{initials}</AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm font-medium lg:inline">{userName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-popover text-popover-foreground border-border">
                  <DropdownMenuLabel className="text-foreground">
                    {userName}
                    <p className="text-[10px] font-normal text-muted-foreground mt-0.5">{accountType === "parent" ? "Parent Account" : "Student Account"}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem className="text-muted-foreground hover:text-foreground" onClick={() => onTabChange("profile")}>
                    <User className="mr-2 size-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-muted-foreground hover:text-foreground">
                    <Settings className="mr-2 size-4" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem className="text-destructive hover:text-destructive" onClick={onLogout}>
                    <LogOut className="mr-2 size-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 pb-24 lg:p-6 lg:pb-8">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  )
}

// Parent Monitor Dashboard component
export function ParentMonitor() {
  const weakSubjects = subjects.filter((s) => s.mastery < 65)
  const overallMastery = Math.round(subjects.reduce((s, sub) => s + sub.mastery, 0) / subjects.length)

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div>
        <h1 className="text-xl font-bold text-gradient sm:text-2xl lg:text-3xl text-balance font-[family-name:var(--font-display)]">Child Progress Monitor</h1>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed sm:text-sm">Track your child's learning journey, identify areas needing attention, and support their growth.</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
        {[
          { label: "Overall Mastery", value: `${overallMastery}%`, icon: BarChart3, color: "text-primary", bg: "bg-primary/10" },
          { label: "Study Streak", value: "18 days", icon: Zap, color: "text-warning", bg: "bg-warning/10" },
          { label: "Weak Areas", value: weakSubjects.length.toString(), icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
          { label: "Subjects", value: subjects.length.toString(), icon: BookOpen, color: "text-info", bg: "bg-info/10" },
        ].map((stat) => (
          <Card key={stat.label} className="border-border bg-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={cn("flex size-8 items-center justify-center rounded-lg sm:size-10", stat.bg)}>
                  <stat.icon className={cn("size-4 sm:size-5", stat.color)} />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground sm:text-2xl">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground sm:text-xs">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subject Breakdown */}
      <Card className="border-border bg-card">
        <CardContent className="p-4 sm:p-6">
          <h2 className="mb-4 text-sm font-semibold text-card-foreground sm:text-base">Subject Performance</h2>
          <div className="flex flex-col gap-3">
            {subjects.map((sub) => (
              <div key={sub.id} className={cn(
                "rounded-lg border p-3 sm:p-4",
                sub.mastery < 65 ? "border-destructive/20 bg-destructive/5" : sub.mastery < 80 ? "border-warning/20 bg-warning/5" : "border-primary/20 bg-primary/5"
              )}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{sub.name}</span>
                    {sub.mastery < 65 && <Badge className="text-[9px] bg-destructive/10 text-destructive border-0">Needs Attention</Badge>}
                    {sub.mastery >= 80 && <Badge className="text-[9px] bg-primary/10 text-primary border-0">On Track</Badge>}
                  </div>
                  <span className={cn(
                    "text-sm font-bold",
                    sub.mastery < 65 ? "text-destructive" : sub.mastery < 80 ? "text-warning" : "text-primary"
                  )}>{sub.mastery}%</span>
                </div>
                <Progress value={sub.mastery} className="mt-2 h-2" />
                <div className="mt-2 flex flex-wrap gap-1">
                  {sub.weakTopics.map((t) => (
                    <Badge key={t} variant="secondary" className="text-[9px] bg-destructive/10 text-destructive border-0 sm:text-[10px]">{t}</Badge>
                  ))}
                  {sub.strongTopics.slice(0, 2).map((t) => (
                    <Badge key={t} variant="secondary" className="text-[9px] bg-primary/10 text-primary border-0 sm:text-[10px]">{t}</Badge>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-4 text-[10px] text-muted-foreground sm:text-xs">
                  <span>{sub.correctAnswers}/{sub.totalQuestions} correct</span>
                  <span>Avg time: {sub.avgTime}s</span>
                  <span className={cn(
                    sub.trend === "up" ? "text-primary" : sub.trend === "down" ? "text-destructive" : "text-warning"
                  )}>Trend: {sub.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safety Notice */}
      <Card className="border-chart-4/20 bg-chart-4/5">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <Heart className="size-5 shrink-0 text-chart-4 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">Mental Health Monitoring</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                GrowthBuddy monitors study patterns for signs of academic burnout. If your child shows decreased activity or
                extended periods of low performance, we will notify you. Remember, mental health resources are always available
                through the sidebar. The 988 Suicide & Crisis Lifeline is available 24/7.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
