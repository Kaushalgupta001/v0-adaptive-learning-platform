"use client"

import {
  Trophy,
  Medal,
  TrendingUp,
  Flame,
  Crown,
  Users,
  Target,
  ArrowUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { peerData } from "@/lib/data"

const COLORS = {
  gold: "#f59e0b",
  silver: "#94a3b8",
  bronze: "#c2884b",
  primary: "#22d3a7",
  info: "#5b8def",
}

const comparisonData = peerData.slice(0, 6).map((p) => ({
  name: p.name === "You" ? "You" : p.name.split(" ")[0],
  mastery: p.mastery,
  isYou: p.name === "You",
}))

export function PeerAnalytics() {
  const you = peerData.find((p) => p.name === "You")!
  const topThree = peerData.slice(0, 3)

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gradient sm:text-2xl lg:text-3xl text-balance font-[family-name:var(--font-display)]">
          Peer Analytics & Leaderboard
        </h1>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed sm:text-sm">
          Compare your performance with peers. See where you stand and get motivated to climb higher.
        </p>
      </div>

      {/* Your Position */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <Avatar className="size-12 border-2 border-primary sm:size-14">
                  <AvatarFallback className="bg-primary/20 text-primary text-base font-bold sm:text-lg">
                    {you.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground sm:size-6 sm:text-[10px]">
                  #{you.rank}
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-gradient sm:text-lg">Your Standing</h3>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Rank #{you.rank} out of {peerData.length} learners
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <p className="text-lg font-bold text-foreground sm:text-2xl">{you.score.toLocaleString()}</p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-wider sm:text-[10px]">XP Score</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground sm:text-2xl">{you.mastery}%</p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-wider sm:text-[10px]">Mastery</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <ArrowUp className="size-3 text-primary sm:size-4" />
                  <p className="text-lg font-bold text-primary sm:text-2xl">+{you.improvement}%</p>
                </div>
                <p className="text-[9px] text-muted-foreground uppercase tracking-wider sm:text-[10px]">Growth</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-5 lg:gap-6">
        {/* Leaderboard */}
        <Card className="lg:col-span-3 border-border bg-card">
          <CardHeader className="px-4 pb-2 sm:px-6">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-card-foreground sm:text-base">
              <Trophy className="size-4 text-warning" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            {/* Top 3 Podium */}
            <div className="mb-4 flex items-end justify-center gap-3 sm:mb-6 sm:gap-4">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <Avatar className="size-9 border-2 sm:size-11" style={{ borderColor: COLORS.silver }}>
                  <AvatarFallback className="bg-secondary text-muted-foreground text-xs font-bold sm:text-sm">
                    {topThree[1].avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-1.5 flex flex-col items-center rounded-t-lg bg-secondary/50 px-3 py-2 sm:mt-2 sm:px-6 sm:py-4">
                  <Medal className="size-4 sm:size-5" style={{ color: COLORS.silver }} />
                  <span className="mt-0.5 text-[10px] font-semibold text-foreground sm:mt-1 sm:text-xs">2nd</span>
                  <span className="text-[9px] text-muted-foreground sm:text-[10px]">{topThree[1].score.toLocaleString()}</span>
                </div>
              </div>
              {/* 1st Place */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="size-11 border-2 sm:size-14" style={{ borderColor: COLORS.gold }}>
                    <AvatarFallback className="bg-warning/20 text-warning text-sm font-bold sm:text-lg">
                      {topThree[0].avatar}
                    </AvatarFallback>
                  </Avatar>
                  <Crown className="absolute -top-2.5 left-1/2 -translate-x-1/2 size-4 sm:-top-3 sm:size-5" style={{ color: COLORS.gold }} />
                </div>
                <div className="mt-1.5 flex flex-col items-center rounded-t-lg bg-warning/10 px-4 py-3 sm:mt-2 sm:px-8 sm:py-6">
                  <Medal className="size-5 sm:size-6" style={{ color: COLORS.gold }} />
                  <span className="mt-0.5 text-xs font-bold text-foreground sm:mt-1 sm:text-sm">1st</span>
                  <span className="text-[10px] text-muted-foreground sm:text-xs">{topThree[0].score.toLocaleString()}</span>
                </div>
              </div>
              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <Avatar className="size-8 border-2 sm:size-10" style={{ borderColor: COLORS.bronze }}>
                  <AvatarFallback className="bg-secondary text-muted-foreground text-[10px] font-bold sm:text-xs">
                    {topThree[2].avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-1.5 flex flex-col items-center rounded-t-lg bg-secondary/50 px-2 py-1.5 sm:mt-2 sm:px-5 sm:py-3">
                  <Medal className="size-3.5 sm:size-4" style={{ color: COLORS.bronze }} />
                  <span className="mt-0.5 text-[10px] font-semibold text-foreground sm:mt-1 sm:text-xs">3rd</span>
                  <span className="text-[9px] text-muted-foreground sm:text-[10px]">{topThree[2].score.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Full List */}
            <div className="flex flex-col gap-1.5 sm:gap-2">
              {peerData.map((peer) => (
                <div
                  key={peer.id}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border p-2 transition-all sm:gap-3 sm:p-3",
                    peer.name === "You"
                      ? "border-primary/30 bg-primary/5"
                      : "border-border bg-secondary/20"
                  )}
                >
                  <span className="w-5 text-center text-xs font-bold text-muted-foreground sm:w-6 sm:text-sm">
                    {peer.rank}
                  </span>
                  <Avatar className="size-7 sm:size-8">
                    <AvatarFallback
                      className={cn(
                        "text-[10px] font-bold sm:text-xs",
                        peer.name === "You"
                          ? "bg-primary/20 text-primary"
                          : "bg-secondary text-muted-foreground"
                      )}
                    >
                      {peer.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={cn(
                      "min-w-0 flex-1 truncate text-xs font-medium sm:text-sm",
                      peer.name === "You" ? "text-primary" : "text-foreground"
                    )}
                  >
                    {peer.name}
                  </span>
                  <div className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                    <Flame className="size-3 text-warning" />
                    {peer.streak}d
                  </div>
                  <Badge variant="secondary" className="hidden text-[10px] bg-secondary text-secondary-foreground sm:inline-flex">
                    {peer.mastery}%
                  </Badge>
                  <span className="w-12 text-right text-xs font-semibold text-foreground sm:w-16 sm:text-sm">
                    {peer.score.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Comparison Chart + Stats */}
        <Card className="lg:col-span-2 border-border bg-card">
          <CardHeader className="px-4 pb-2 sm:px-6">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-card-foreground sm:text-base">
              <Users className="size-4 text-info" />
              Mastery Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <ChartContainer
              config={{
                mastery: { label: "Mastery %", color: COLORS.info },
              }}
              className="h-[200px] w-full sm:h-[280px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  layout="vertical"
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-border)" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} width={50} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="mastery" radius={[0, 6, 6, 0]} maxBarSize={20}>
                    {comparisonData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isYou ? COLORS.primary : COLORS.info}
                        opacity={entry.isYou ? 1 : 0.6}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            {/* Stats */}
            <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:gap-3">
              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-2.5 sm:p-3">
                <div className="flex items-center gap-2">
                  <Target className="size-3.5 text-primary sm:size-4" />
                  <span className="text-[10px] text-muted-foreground sm:text-xs">Your Rank</span>
                </div>
                <span className="text-xs font-bold text-foreground sm:text-sm">#{you.rank} of {peerData.length}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-2.5 sm:p-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-3.5 text-primary sm:size-4" />
                  <span className="text-[10px] text-muted-foreground sm:text-xs">Weekly Growth</span>
                </div>
                <span className="text-xs font-bold text-primary sm:text-sm">+{you.improvement}%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-2.5 sm:p-3">
                <div className="flex items-center gap-2">
                  <Flame className="size-3.5 text-warning sm:size-4" />
                  <span className="text-[10px] text-muted-foreground sm:text-xs">Streak</span>
                </div>
                <span className="text-xs font-bold text-foreground sm:text-sm">{you.streak} days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
