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
  you: "#22d3a7",
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
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl text-balance">
          Peer Analytics & Leaderboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          Compare your performance with peers. See where you stand and get motivated to climb
          higher.
        </p>
      </div>

      {/* Your Position */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="size-14 border-2 border-primary">
                  <AvatarFallback className="bg-primary/20 text-primary text-lg font-bold">
                    {you.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  #{you.rank}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Your Standing</h3>
                <p className="text-sm text-muted-foreground">
                  Rank #{you.rank} out of {peerData.length} learners
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{you.score.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">XP Score</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{you.mastery}%</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Mastery</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <ArrowUp className="size-4 text-primary" />
                  <p className="text-2xl font-bold text-primary">+{you.improvement}%</p>
                </div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Growth</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Leaderboard */}
        <Card className="lg:col-span-3 border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-card-foreground">
              <Trophy className="size-4 text-warning" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Top 3 Podium */}
            <div className="mb-6 flex items-end justify-center gap-4">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <Avatar className="size-11 border-2" style={{ borderColor: COLORS.silver }}>
                  <AvatarFallback className="bg-secondary text-muted-foreground text-sm font-bold">
                    {topThree[1].avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-2 flex flex-col items-center rounded-t-lg bg-secondary/50 px-6 py-4">
                  <Medal className="size-5" style={{ color: COLORS.silver }} />
                  <span className="mt-1 text-xs font-semibold text-foreground">2nd</span>
                  <span className="text-[10px] text-muted-foreground">{topThree[1].score.toLocaleString()}</span>
                </div>
              </div>
              {/* 1st Place */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="size-14 border-2" style={{ borderColor: COLORS.gold }}>
                    <AvatarFallback className="bg-warning/20 text-warning text-lg font-bold">
                      {topThree[0].avatar}
                    </AvatarFallback>
                  </Avatar>
                  <Crown className="absolute -top-3 left-1/2 -translate-x-1/2 size-5" style={{ color: COLORS.gold }} />
                </div>
                <div className="mt-2 flex flex-col items-center rounded-t-lg bg-warning/10 px-8 py-6">
                  <Medal className="size-6" style={{ color: COLORS.gold }} />
                  <span className="mt-1 text-sm font-bold text-foreground">1st</span>
                  <span className="text-xs text-muted-foreground">{topThree[0].score.toLocaleString()}</span>
                </div>
              </div>
              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <Avatar className="size-10 border-2" style={{ borderColor: COLORS.bronze }}>
                  <AvatarFallback className="bg-secondary text-muted-foreground text-xs font-bold">
                    {topThree[2].avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-2 flex flex-col items-center rounded-t-lg bg-secondary/50 px-5 py-3">
                  <Medal className="size-4" style={{ color: COLORS.bronze }} />
                  <span className="mt-1 text-xs font-semibold text-foreground">3rd</span>
                  <span className="text-[10px] text-muted-foreground">{topThree[2].score.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Full List */}
            <div className="flex flex-col gap-2">
              {peerData.map((peer) => (
                <div
                  key={peer.id}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border p-3 transition-all",
                    peer.name === "You"
                      ? "border-primary/30 bg-primary/5"
                      : "border-border bg-secondary/20"
                  )}
                >
                  <span className="w-6 text-center text-sm font-bold text-muted-foreground">
                    {peer.rank}
                  </span>
                  <Avatar className="size-8">
                    <AvatarFallback
                      className={cn(
                        "text-xs font-bold",
                        peer.name === "You"
                          ? "bg-primary/20 text-primary"
                          : "bg-secondary text-muted-foreground"
                      )}
                    >
                      {peer.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        peer.name === "You" ? "text-primary" : "text-foreground"
                      )}
                    >
                      {peer.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Flame className="size-3 text-warning" />
                    {peer.streak}d
                  </div>
                  <Badge variant="secondary" className="text-[10px] bg-secondary text-secondary-foreground">
                    {peer.mastery}%
                  </Badge>
                  <span className="w-16 text-right text-sm font-semibold text-foreground">
                    {peer.score.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Comparison Chart */}
        <Card className="lg:col-span-2 border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-card-foreground">
              <Users className="size-4 text-info" />
              Mastery Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                mastery: { label: "Mastery %", color: COLORS.info },
              }}
              className="h-[280px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={60} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="mastery" radius={[0, 6, 6, 0]} maxBarSize={24}>
                    {comparisonData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isYou ? COLORS.you : COLORS.info}
                        opacity={entry.isYou ? 1 : 0.6}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            {/* Stats */}
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3">
                <div className="flex items-center gap-2">
                  <Target className="size-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Your Rank</span>
                </div>
                <span className="text-sm font-bold text-foreground">#{you.rank} of {peerData.length}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Weekly Growth</span>
                </div>
                <span className="text-sm font-bold text-primary">+{you.improvement}%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3">
                <div className="flex items-center gap-2">
                  <Flame className="size-4 text-warning" />
                  <span className="text-xs text-muted-foreground">Streak</span>
                </div>
                <span className="text-sm font-bold text-foreground">{you.streak} days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
