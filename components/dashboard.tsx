"use client"

import {
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Clock,
  Zap,
  Award,
  ArrowRight,
  AlertTriangle,
  BookOpen,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  RadialBarChart,
  RadialBar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { subjects, performanceTrend, studySessions } from "@/lib/data"

const COLORS = {
  primary: "#22d3a7",
  info: "#5b8def",
  warning: "#e5b84c",
  danger: "#ef6461",
  muted: "#64748b",
}

const overallMastery = Math.round(
  subjects.reduce((sum, s) => sum + s.mastery, 0) / subjects.length
)

const radialData = [{ name: "Mastery", value: overallMastery, fill: COLORS.primary }]

interface DashboardProps {
  onNavigate: (tab: string) => void
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const weakSubjects = subjects.filter((s) => s.mastery < 65)
  const totalQuestions = subjects.reduce((sum, s) => sum + s.totalQuestions, 0)
  const totalCorrect = subjects.reduce((sum, s) => sum + s.correctAnswers, 0)
  const avgAccuracy = Math.round((totalCorrect / totalQuestions) * 100)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
          Welcome back, Naman
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Here{"'"}s your learning performance overview. You{"'"}re making great progress!
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Overall Mastery"
          value={`${overallMastery}%`}
          subtitle="+3.2% from last week"
          icon={<Target className="size-4" />}
          trend="up"
          accentColor="text-primary"
        />
        <StatCard
          title="Quiz Accuracy"
          value={`${avgAccuracy}%`}
          subtitle={`${totalCorrect}/${totalQuestions} correct`}
          icon={<Zap className="size-4" />}
          trend="up"
          accentColor="text-info"
        />
        <StatCard
          title="Study Streak"
          value="18 days"
          subtitle="Personal best: 24 days"
          icon={<Award className="size-4" />}
          trend="stable"
          accentColor="text-warning"
        />
        <StatCard
          title="Avg. Response Time"
          value="42s"
          subtitle="-8s improvement"
          icon={<Clock className="size-4" />}
          trend="up"
          accentColor="text-primary"
        />
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Performance Chart */}
        <Card className="col-span-full lg:col-span-2 border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold text-card-foreground">
              Performance Trend
            </CardTitle>
            <Badge variant="outline" className="text-xs border-border text-muted-foreground">
              Last 8 Weeks
            </Badge>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                math: { label: "Mathematics", color: COLORS.primary },
                physics: { label: "Physics", color: COLORS.danger },
                chemistry: { label: "Chemistry", color: COLORS.info },
                cs: { label: "Computer Science", color: COLORS.warning },
              }}
              className="h-[280px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradMath" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradPhysics" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.danger} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.danger} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} domain={[40, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="math" stroke={COLORS.primary} fill="url(#gradMath)" strokeWidth={2} />
                  <Area type="monotone" dataKey="physics" stroke={COLORS.danger} fill="url(#gradPhysics)" strokeWidth={2} />
                  <Area type="monotone" dataKey="chemistry" stroke={COLORS.info} fill="transparent" strokeWidth={2} />
                  <Area type="monotone" dataKey="cs" stroke={COLORS.warning} fill="transparent" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Mastery Radial */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-card-foreground">
              Mastery Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="relative h-[180px] w-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="100%"
                  startAngle={90}
                  endAngle={-270}
                  data={radialData}
                  barSize={12}
                >
                  <RadialBar
                    dataKey="value"
                    cornerRadius={10}
                    background={{ fill: "hsl(var(--secondary))" }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-foreground">{overallMastery}%</span>
                <span className="text-xs text-muted-foreground">Overall</span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              {subjects.map((subject) => (
                <div key={subject.id} className="flex items-center gap-3">
                  <span className="w-24 truncate text-xs text-muted-foreground">{subject.name}</span>
                  <Progress value={subject.mastery} className="h-1.5 flex-1" />
                  <span className="w-8 text-right text-xs font-medium text-foreground">{subject.mastery}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weakness Detection + Study Time */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weakness Detection */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-card-foreground">
              <AlertTriangle className="size-4 text-warning" />
              Weakness Detection
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-primary hover:text-primary hover:bg-primary/10"
              onClick={() => onNavigate("quiz")}
            >
              Practice Now <ArrowRight className="ml-1 size-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {weakSubjects.length > 0 ? (
                weakSubjects.map((subject) => (
                  <div key={subject.id} className="rounded-lg border border-border bg-secondary/30 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{subject.name}</span>
                      <Badge
                        variant="outline"
                        className={
                          subject.trend === "down"
                            ? "border-destructive/30 text-destructive"
                            : "border-warning/30 text-warning"
                        }
                      >
                        {subject.trend === "down" ? (
                          <TrendingDown className="mr-1 size-3" />
                        ) : (
                          <Minus className="mr-1 size-3" />
                        )}
                        {subject.mastery}%
                      </Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {subject.weakTopics.map((topic) => (
                        <Badge
                          key={topic}
                          variant="secondary"
                          className="text-[10px] bg-destructive/10 text-destructive border-0"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  Great job! No major weaknesses detected.
                </div>
              )}
              {subjects
                .filter((s) => s.mastery >= 65 && s.mastery < 80)
                .slice(0, 1)
                .map((subject) => (
                  <div key={subject.id} className="rounded-lg border border-border bg-secondary/30 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{subject.name}</span>
                      <Badge variant="outline" className="border-warning/30 text-warning">
                        <Minus className="mr-1 size-3" />
                        {subject.mastery}%
                      </Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {subject.weakTopics.map((topic) => (
                        <Badge
                          key={topic}
                          variant="secondary"
                          className="text-[10px] bg-warning/10 text-warning border-0"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Study Time Chart */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-card-foreground">
              <BookOpen className="size-4 text-info" />
              Weekly Study Time
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-primary hover:text-primary hover:bg-primary/10"
              onClick={() => onNavigate("optimizer")}
            >
              Optimize <ArrowRight className="ml-1 size-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                hours: { label: "Hours", color: COLORS.primary },
                efficiency: { label: "Efficiency", color: COLORS.info },
              }}
              className="h-[220px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studySessions} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="hours" radius={[6, 6, 0, 0]} maxBarSize={32}>
                    {studySessions.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.efficiency >= 80 ? COLORS.primary : entry.efficiency >= 70 ? COLORS.warning : COLORS.danger}
                        opacity={0.85}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full" style={{ background: COLORS.primary }} />
                {"Efficiency >= 80%"}
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full" style={{ background: COLORS.warning }} />
                {"70-79%"}
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full" style={{ background: COLORS.danger }} />
                {"< 70%"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Button
          onClick={() => onNavigate("quiz")}
          className="h-auto flex-col gap-2 bg-primary/10 py-5 text-primary hover:bg-primary/20 border border-primary/20"
          variant="ghost"
        >
          <Brain className="size-6" />
          <span className="text-sm font-semibold">Start Smart Quiz</span>
          <span className="text-[10px] text-primary/70">Targets your weak spots</span>
        </Button>
        <Button
          onClick={() => onNavigate("paths")}
          className="h-auto flex-col gap-2 bg-info/10 py-5 text-info hover:bg-info/20 border border-info/20"
          variant="ghost"
        >
          <Route className="size-6" />
          <span className="text-sm font-semibold">Continue Path</span>
          <span className="text-[10px] text-info/70">3 paths in progress</span>
        </Button>
        <Button
          onClick={() => onNavigate("analytics")}
          className="h-auto flex-col gap-2 bg-warning/10 py-5 text-warning hover:bg-warning/20 border border-warning/20"
          variant="ghost"
        >
          <Trophy className="size-6" />
          <span className="text-sm font-semibold">View Leaderboard</span>
          <span className="text-[10px] text-warning/70">You{"'"}re ranked #4</span>
        </Button>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  accentColor,
}: {
  title: string
  value: string
  subtitle: string
  icon: React.ReactNode
  trend: "up" | "down" | "stable"
  accentColor: string
}) {
  return (
    <Card className="border-border bg-card group hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">{title}</span>
          <div className={`flex size-8 items-center justify-center rounded-lg bg-secondary ${accentColor}`}>
            {icon}
          </div>
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold text-foreground">{value}</span>
        </div>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          {trend === "up" && <TrendingUp className="size-3 text-primary" />}
          {trend === "down" && <TrendingDown className="size-3 text-destructive" />}
          {trend === "stable" && <Minus className="size-3 text-warning" />}
          {subtitle}
        </div>
      </CardContent>
    </Card>
  )
}

// Re-export icons used in quick actions
import { Brain, Route } from "lucide-react"
