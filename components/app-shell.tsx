"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Brain,
  Route,
  Trophy,
  Bell,
  Clock,
  Zap,
  ChevronRight,
  Search,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  Phone,
  Heart,
  ShieldCheck,
  Menu,
  Award,
  X,
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"

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

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "quiz", label: "Smart Quiz", icon: Brain },
  { id: "paths", label: "Learning Paths", icon: Route },
  { id: "analytics", label: "Leaderboard", icon: Trophy },
  { id: "streaks", label: "Streak Awards", icon: Award },
  { id: "nudges", label: "Smart Nudges", icon: Bell },
  { id: "optimizer", label: "Study Optimizer", icon: Clock },
]

export function AppShell({
  children,
  activeTab,
  onTabChange,
  unreadNudges,
  userName,
  accountType,
  streak,
  onLogout,
}: AppShellProps) {
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Mobile Overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-sidebar transition-all duration-300 ease-in-out",
            collapsed ? "w-[68px]" : "w-[260px]",
            mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-border px-4">
            <div className="flex size-9 items-center justify-center overflow-hidden rounded-lg">
              <Image src="/images/logo.jpg" alt="GrowthBuddy" width={36} height={36} className="rounded-lg object-cover" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-foreground font-[family-name:var(--font-display)]">
                  GrowthBuddy
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  {accountType === "parent" ? "Parent Mode" : "Adaptive Engine"}
                </span>
              </div>
            )}
            <button
              onClick={() => setMobileOpen(false)}
              className="ml-auto flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground lg:hidden"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Account Type Badge */}
          {!collapsed && accountType === "parent" && (
            <div className="mx-3 mt-3 rounded-lg border border-info/20 bg-info/5 p-2.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-info" />
                <span className="text-[11px] font-semibold text-info">
                  Parent Supervision
                </span>
              </div>
              <p className="mt-0.5 text-[10px] text-muted-foreground">Monitoring child progress</p>
            </div>
          )}

          {/* Nav Items */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id
                return (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          onTabChange(item.id)
                          setMobileOpen(false)
                        }}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
                        )}
                        <item.icon className={cn("size-[18px] shrink-0", isActive && "text-primary")} />
                        {!collapsed && <span>{item.label}</span>}
                        {!collapsed && item.id === "nudges" && unreadNudges > 0 && (
                          <Badge className="ml-auto h-5 min-w-5 bg-primary text-primary-foreground text-[10px] px-1.5">
                            {unreadNudges}
                          </Badge>
                        )}
                      </button>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right" className="bg-popover text-popover-foreground">
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                )
              })}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-border p-3">
            {/* Streak Card */}
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

            {/* Mental Health Support */}
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
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-foreground">
                      <Heart className="size-5 text-chart-4" />
                      Mental Health Support
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your mental health matters. If you or someone you know is struggling with
                      depression, anxiety, or any emotional crisis, please reach out to a trained
                      counselor.
                    </p>
                    <div className="flex flex-col gap-3">
                      <a
                        href="tel:988"
                        className="flex items-center gap-3 rounded-xl border border-chart-4/20 bg-chart-4/5 p-4 transition-colors hover:bg-chart-4/10"
                      >
                        <Phone className="size-5 text-chart-4" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">988 Suicide & Crisis Lifeline</p>
                          <p className="text-xs text-muted-foreground">Call or text 988 - Available 24/7</p>
                        </div>
                      </a>
                      <a
                        href="tel:18002738255"
                        className="flex items-center gap-3 rounded-xl border border-info/20 bg-info/5 p-4 transition-colors hover:bg-info/10"
                      >
                        <Phone className="size-5 text-info" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">SAMHSA Helpline</p>
                          <p className="text-xs text-muted-foreground">1-800-662-4357 - Free & Confidential</p>
                        </div>
                      </a>
                      <a
                        href="sms:741741&body=HELLO"
                        className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 transition-colors hover:bg-primary/10"
                      >
                        <Phone className="size-5 text-primary" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">Crisis Text Line</p>
                          <p className="text-xs text-muted-foreground">Text HOME to 741741</p>
                        </div>
                      </a>
                    </div>
                    <p className="text-[10px] text-muted-foreground text-center">
                      All services are free, confidential, and available 24/7.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex w-full items-center justify-center rounded-lg py-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              <ChevronRight
                className={cn(
                  "size-4 transition-transform duration-300",
                  collapsed ? "" : "rotate-180"
                )}
              />
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div
          className={cn(
            "flex flex-1 flex-col transition-all duration-300",
            collapsed ? "lg:ml-[68px]" : "lg:ml-[260px]"
          )}
        >
          {/* Top Bar */}
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl lg:h-16 lg:px-6">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent lg:hidden"
            >
              <Menu className="size-5" />
            </button>

            <div className="relative hidden flex-1 max-w-md sm:block">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search topics, quizzes, paths..."
                className="h-9 border-border bg-secondary/50 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:bg-accent"
              />
            </div>

            <div className="ml-auto flex items-center gap-1.5">
              {/* Theme Toggle */}
              {mounted && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-9 text-muted-foreground hover:text-foreground"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                      {theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-popover text-popover-foreground">
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </TooltipContent>
                </Tooltip>
              )}

              {/* Notifications */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative size-9 text-muted-foreground hover:text-foreground"
                    onClick={() => onTabChange("nudges")}
                  >
                    <Bell className="size-[18px]" />
                    {unreadNudges > 0 && (
                      <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-popover text-popover-foreground">
                  Notifications
                </TooltipContent>
              </Tooltip>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 px-2 text-foreground hover:bg-accent">
                    <Avatar className="size-7 border border-primary/30">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm font-medium lg:inline">{userName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-popover text-popover-foreground border-border">
                  <DropdownMenuLabel className="text-foreground">
                    {userName}
                    <p className="text-[10px] font-normal text-muted-foreground mt-0.5">
                      {accountType === "parent" ? "Parent Account" : "Student Account"}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem className="text-muted-foreground hover:text-foreground">
                    <User className="mr-2 size-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-muted-foreground hover:text-foreground">
                    <Settings className="mr-2 size-4" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem
                    className="text-destructive hover:text-destructive"
                    onClick={onLogout}
                  >
                    <LogOut className="mr-2 size-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
