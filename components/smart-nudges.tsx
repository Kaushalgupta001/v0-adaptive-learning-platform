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
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
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
    color: "text-chart-4",
    bg: "bg-chart-4/10",
    border: "border-chart-4/20",
  },
}

export function SmartNudges({ onMarkRead }: { onMarkRead: () => void }) {
  const [nudgesList, setNudgesList] = React.useState<Nudge[]>(initialNudges)
  const [filter, setFilter] = React.useState<string>("all")
  const [actionedIds, setActionedIds] = React.useState<Set<string>>(new Set())

  const markAsRead = (id: string) => {
    setNudgesList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
    setActionedIds((prev) => new Set(prev).add(id))
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
    <div className="flex flex-col gap-4 lg:gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl text-balance font-[family-name:var(--font-display)]">
            Smart Nudges
          </h1>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed sm:text-sm">
            Intelligent notifications to keep you on track and improve learning outcomes.
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllRead}
            className="border-border text-foreground hover:bg-accent w-fit"
          >
            <CheckCircle2 className="mr-1.5 size-3.5" />
            Mark all read ({unreadCount})
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
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
              "h-7 text-[10px] sm:h-8 sm:text-xs",
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
      <div className="flex flex-col gap-2 sm:gap-3">
        {filtered.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="size-10 text-muted-foreground/30 sm:size-12" />
              <p className="mt-3 text-xs text-muted-foreground sm:mt-4 sm:text-sm">No notifications to show</p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((nudge) => {
            const config = nudgeConfig[nudge.type]
            const Icon = config.icon
            const actioned = actionedIds.has(nudge.id)
            return (
              <Card
                key={nudge.id}
                className={cn(
                  "border-border bg-card transition-all duration-300 hover:border-primary/20",
                  !nudge.read && `${config.border} ${config.bg}`,
                  actioned && "border-primary/20 bg-primary/5"
                )}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div
                      className={cn(
                        "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg sm:size-10 sm:rounded-xl",
                        config.bg
                      )}
                    >
                      <Icon className={cn("size-4 sm:size-5", config.color)} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs font-semibold text-foreground sm:text-sm">{nudge.title}</h3>
                        {!nudge.read && (
                          <span className="size-1.5 shrink-0 rounded-full bg-primary sm:size-2" />
                        )}
                        {actioned && (
                          <Badge variant="secondary" className="text-[9px] bg-primary/10 text-primary border-0 sm:text-[10px]">
                            Actioned
                          </Badge>
                        )}
                        <Badge
                          variant="secondary"
                          className={cn(
                            "ml-auto text-[9px] shrink-0 sm:text-[10px]",
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
                      <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed sm:text-sm">
                        {nudge.message}
                      </p>
                      <div className="mt-2 flex items-center gap-2 sm:mt-3">
                        <Button
                          size="sm"
                          className="h-6 px-2 text-[10px] bg-primary text-primary-foreground hover:bg-primary/90 sm:h-7 sm:px-3 sm:text-xs"
                          onClick={() => markAsRead(nudge.id)}
                        >
                          {nudge.action}
                          <ArrowRight className="ml-1 size-3" />
                        </Button>
                        <span className="text-[9px] text-muted-foreground ml-1 sm:text-[10px]">
                          {nudge.timestamp}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6 shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent sm:size-7"
                      onClick={() => dismiss(nudge.id)}
                    >
                      <X className="size-3 sm:size-3.5" />
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
