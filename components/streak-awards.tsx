"use client"

import * as React from "react"
import {
  Award,
  Flame,
  Trophy,
  Star,
  Zap,
  Crown,
  Shield,
  Target,
  Sparkles,
  Lock,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface StreakAward {
  id: string
  days: number
  title: string
  description: string
  icon: React.ElementType
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond"
  unlocked: boolean
  unlockedDate?: string
}

const currentStreak = 18

const tierColors = {
  bronze: { bg: "bg-chart-5/10", border: "border-chart-5/20", text: "text-chart-5", fill: "#c2884b" },
  silver: { bg: "bg-muted", border: "border-muted-foreground/20", text: "text-muted-foreground", fill: "#94a3b8" },
  gold: { bg: "bg-warning/10", border: "border-warning/20", text: "text-warning", fill: "#e5b84c" },
  platinum: { bg: "bg-info/10", border: "border-info/20", text: "text-info", fill: "#5b8def" },
  diamond: { bg: "bg-primary/10", border: "border-primary/20", text: "text-primary", fill: "#22d3a7" },
}

const awards: StreakAward[] = [
  { id: "a1", days: 3, title: "First Spark", description: "Maintain a 3-day learning streak", icon: Zap, tier: "bronze", unlocked: true, unlockedDate: "Feb 8, 2026" },
  { id: "a2", days: 6, title: "Flame Starter", description: "Maintain a 6-day learning streak", icon: Flame, tier: "bronze", unlocked: true, unlockedDate: "Feb 11, 2026" },
  { id: "a3", days: 9, title: "Consistency King", description: "Maintain a 9-day learning streak", icon: Star, tier: "silver", unlocked: true, unlockedDate: "Feb 14, 2026" },
  { id: "a4", days: 12, title: "Dedicated Learner", description: "Maintain a 12-day learning streak", icon: Target, tier: "silver", unlocked: true, unlockedDate: "Feb 17, 2026" },
  { id: "a5", days: 15, title: "Knowledge Warrior", description: "Maintain a 15-day learning streak", icon: Shield, tier: "gold", unlocked: true, unlockedDate: "Feb 20, 2026" },
  { id: "a6", days: 18, title: "Brain Champion", description: "Maintain an 18-day learning streak", icon: Trophy, tier: "gold", unlocked: true, unlockedDate: "Feb 23, 2026" },
  { id: "a7", days: 21, title: "Scholar Elite", description: "Maintain a 21-day learning streak", icon: Award, tier: "platinum", unlocked: false },
  { id: "a8", days: 24, title: "Master Mind", description: "Maintain a 24-day learning streak", icon: Crown, tier: "platinum", unlocked: false },
  { id: "a9", days: 27, title: "Genius Level", description: "Maintain a 27-day learning streak", icon: Sparkles, tier: "diamond", unlocked: false },
  { id: "a10", days: 30, title: "Legend Status", description: "Maintain a 30-day learning streak", icon: Crown, tier: "diamond", unlocked: false },
]

const nextAward = awards.find((a) => !a.unlocked)
const unlockedCount = awards.filter((a) => a.unlocked).length

export function StreakAwards() {
  const [selectedAward, setSelectedAward] = React.useState<string | null>(null)

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl text-balance font-[family-name:var(--font-display)]">
          Streak Awards & E-Badges
        </h1>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed sm:text-sm">
          Earn exclusive awards for maintaining consistent learning streaks. Awards unlock every 3 days.
        </p>
      </div>

      {/* Current Streak Banner */}
      <Card className="border-primary/20 bg-primary/5 overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex size-16 items-center justify-center rounded-2xl bg-primary/10 sm:size-20">
                <Flame className="size-8 text-primary sm:size-10" />
                <div className="absolute -top-1 -right-1 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground sm:size-8">
                  {currentStreak}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">{currentStreak} Day Streak</h2>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  {unlockedCount} of {awards.length} awards earned
                </p>
              </div>
            </div>
            {nextAward && (
              <div className="rounded-xl border border-border bg-card p-3 sm:p-4">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">Next Award</p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">{nextAward.title}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Progress
                    value={(currentStreak / nextAward.days) * 100}
                    className="h-1.5 flex-1"
                  />
                  <span className="text-[10px] font-medium text-muted-foreground sm:text-xs">
                    {nextAward.days - currentStreak} days left
                  </span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Streak Timeline */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card p-3 sm:p-4">
        <div className="flex min-w-[400px] items-center gap-0.5 sm:min-w-0 sm:gap-0">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
            <div key={day} className="flex-1" title={`Day ${day}${day % 3 === 0 ? " - Award Day" : ""}`}>
              <div
                className={cn(
                  "mx-auto h-3 min-w-[8px] rounded-full sm:h-3.5",
                  day <= currentStreak
                    ? day % 3 === 0
                      ? "bg-primary"
                      : "bg-primary/50"
                    : "bg-secondary"
                )}
              />
              {day % 3 === 0 && (
                <p className="mt-1 text-center text-[7px] text-muted-foreground sm:text-[8px]">{day}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {awards.map((award) => {
          const tier = tierColors[award.tier]
          const Icon = award.icon
          const isSelected = selectedAward === award.id

          return (
            <Card
              key={award.id}
              className={cn(
                "cursor-pointer transition-all duration-300 border-border bg-card",
                award.unlocked
                  ? `hover:${tier.border} hover:shadow-lg`
                  : "opacity-60",
                isSelected && award.unlocked && `${tier.border} ${tier.bg}`
              )}
              onClick={() => setSelectedAward(isSelected ? null : award.id)}
            >
              <CardContent className="flex flex-col items-center p-4 text-center sm:p-5">
                <div
                  className={cn(
                    "relative flex size-14 items-center justify-center rounded-2xl sm:size-16",
                    award.unlocked ? tier.bg : "bg-secondary"
                  )}
                >
                  {award.unlocked ? (
                    <Icon className={cn("size-7 sm:size-8", tier.text)} />
                  ) : (
                    <Lock className="size-6 text-muted-foreground" />
                  )}
                  {award.unlocked && (
                    <div className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-card">
                      <CheckCircle2 className={cn("size-4", tier.text)} />
                    </div>
                  )}
                </div>
                <h3 className="mt-3 text-sm font-semibold text-foreground">{award.title}</h3>
                <Badge
                  variant="secondary"
                  className={cn(
                    "mt-1.5 text-[10px] capitalize",
                    award.unlocked ? `${tier.bg} ${tier.text} border-0` : "bg-secondary text-muted-foreground"
                  )}
                >
                  {award.days} Days - {award.tier}
                </Badge>
                {isSelected && (
                  <div className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
                    {award.description}
                    {award.unlockedDate && (
                      <p className={cn("mt-1 font-medium", tier.text)}>
                        Earned: {award.unlockedDate}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center p-4 text-center">
            <span className="text-2xl font-bold text-primary">{unlockedCount}</span>
            <span className="mt-1 text-[10px] text-muted-foreground sm:text-xs">Awards Earned</span>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center p-4 text-center">
            <span className="text-2xl font-bold text-warning">{currentStreak}</span>
            <span className="mt-1 text-[10px] text-muted-foreground sm:text-xs">Current Streak</span>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center p-4 text-center">
            <span className="text-2xl font-bold text-info">24</span>
            <span className="mt-1 text-[10px] text-muted-foreground sm:text-xs">Best Streak</span>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center p-4 text-center">
            <span className="text-2xl font-bold text-foreground">{awards.length - unlockedCount}</span>
            <span className="mt-1 text-[10px] text-muted-foreground sm:text-xs">Remaining</span>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
