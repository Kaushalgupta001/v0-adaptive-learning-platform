"use client"

import * as React from "react"
import {
  Bell,
  AlertTriangle,
  Trophy,
  Clock,
  Zap,
  Heart,
  CheckCircle2,
  X,
  ArrowRight,
  Filter,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { nudges as initialNudges, type Nudge } from "@/lib/data"

const nudgeConfig = {
  warning: {
    icon: AlertTriangle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
  },
  milestone: {
    icon: Trophy,
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/20",
  },
  reminder: {
    icon: Clock,
    color: "text-info",
    bg: "bg-info/10",
    border: "border-info/20",
  },
  challenge: {
    icon: Zap,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  encouragement: {
    icon: Heart,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
}

export function SmartNudges({ onMarkRead }: { onMarkRead: () => void }) {
  const [nudgesList, setNudgesList] = React.useState<Nudge[]>(initialNudges)
  const [filter, setFilter] = React.useState<string>("all")

  const markAsRead = (id: string) => {
    setNudgesList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
    onMarkRead()
  }

  const dismiss = (id: string) => {
    setNudgesList((prev) => prev.filter((n) => n.id !== id))
  }

  const markAllRead = () => {
    setNudgesList((prev) => prev.map((n) => ({ ...n, read: true })))
    onMarkRead()
  }

  const filtered =
    filter === "all"
      ? nudgesList
      : filter === "unread"
      ? nudgesList.filter((n) => !n.read)
      : nudgesList.filter((n) => n.type === filter)

  const unreadCount = nudgesList.filter((n) => !n.read).length

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl text-balance">
            Smart Nudges
          </h1>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            Intelligent notifications that help you stay on track and improve
            your learning outcomes.
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllRead}
            className="border-border text-foreground hover:bg-accent w-fit"
          >
            <CheckCircle2 className="mr-2 size-4" />
            Mark all read ({unreadCount})
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "all", label: "All" },
          { id: "unread", label: `Unread (${unreadCount})` },
          { id: "warning", label: "Warnings" },
          { id: "milestone", label: "Milestones" },
          { id: "reminder", label: "Reminders" },
          { id: "challenge", label: "Challenges" },
          { id: "encouragement", label: "Encouragement" },
        ].map((f) => (
          <Button
            key={f.id}
            variant={filter === f.id ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f.id)}
            className={cn(
              "h-8 text-xs",
              filter === f.id
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "border-border text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Nudge Cards */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="size-12 text-muted-foreground/30" />
              <p className="mt-4 text-sm text-muted-foreground">No notifications to show</p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((nudge) => {
            const config = nudgeConfig[nudge.type]
            const Icon = config.icon
            return (
              <Card
                key={nudge.id}
                className={cn(
                  "border-border bg-card transition-all duration-300 hover:border-primary/20",
                  !nudge.read && `${config.border} ${config.bg}`
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl",
                        config.bg
                      )}
                    >
                      <Icon className={cn("size-5", config.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground">{nudge.title}</h3>
                        {!nudge.read && (
                          <span className="size-2 rounded-full bg-primary" />
                        )}
                        <Badge
                          variant="secondary"
                          className={cn(
                            "ml-auto text-[10px] shrink-0",
                            nudge.priority === "high"
                              ? "bg-destructive/10 text-destructive"
                              : nudge.priority === "medium"
                              ? "bg-warning/10 text-warning"
                              : "bg-secondary text-muted-foreground"
                          )}
                        >
                          {nudge.priority}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {nudge.message}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Button
                          size="sm"
                          className="h-7 bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
                          onClick={() => markAsRead(nudge.id)}
                        >
                          {nudge.action}
                          <ArrowRight className="ml-1 size-3" />
                        </Button>
                        <span className="text-[10px] text-muted-foreground ml-2">
                          {nudge.timestamp}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                      onClick={() => dismiss(nudge.id)}
                    >
                      <X className="size-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
