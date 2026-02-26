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
  Sparkles,
} from "lucide-react"
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

interface AppShellProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
  unreadNudges: number
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "quiz", label: "Smart Quiz", icon: Brain },
  { id: "paths", label: "Learning Paths", icon: Route },
  { id: "analytics", label: "Leaderboard", icon: Trophy },
  { id: "nudges", label: "Smart Nudges", icon: Bell },
  { id: "optimizer", label: "Study Optimizer", icon: Clock },
]

export function AppShell({ children, activeTab, onTabChange, unreadNudges }: AppShellProps) {
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Mobile Overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-sidebar transition-all duration-300 ease-in-out",
            collapsed ? "w-[68px]" : "w-[260px]",
            mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-border px-4">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="size-5 text-primary" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-foreground">NeuronIQ</span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Adaptive Engine
                </span>
              </div>
            )}
          </div>

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
            {!collapsed && (
              <div className="mb-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
                <div className="flex items-center gap-2">
                  <Zap className="size-4 text-primary" />
                  <span className="text-xs font-semibold text-primary">18 Day Streak</span>
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground leading-relaxed">
                  Keep going! You{"'"}re in the top 15% of learners.
                </p>
              </div>
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
            collapsed ? "md:ml-[68px]" : "md:ml-[260px]"
          )}
        >
          {/* Top Bar */}
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-6">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent md:hidden"
            >
              <LayoutDashboard className="size-5" />
            </button>

            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search topics, quizzes, paths..."
                className="h-9 border-border bg-secondary/50 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:bg-accent"
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 px-2 text-foreground hover:bg-accent">
                    <Avatar className="size-7 border border-primary/30">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        NK
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm font-medium md:inline">Naman K.</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-popover text-popover-foreground border-border">
                  <DropdownMenuLabel className="text-foreground">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem className="text-muted-foreground hover:text-foreground">
                    <User className="mr-2 size-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-muted-foreground hover:text-foreground">
                    <Settings className="mr-2 size-4" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem className="text-muted-foreground hover:text-foreground">
                    <LogOut className="mr-2 size-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
