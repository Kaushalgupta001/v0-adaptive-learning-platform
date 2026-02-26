"use client"

import {
  Trophy,
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
  Brain,
  Route,
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
  userName: string
  accountType: "student" | "parent"
}

export function Dashboard({ onNavigate, userName, accountType }: DashboardProps) {
  const weakSubjects = subjects.filter((s) => s.mastery < 65)
  const totalQuestions = subjects.reduce((sum, s) => sum + s.totalQuestions, 0)
  const totalCorrect = subjects.reduce((sum, s) => sum + s.correctAnswers, 0)
  const avgAccuracy = Math.round((totalCorrect / totalQuestions) * 100)

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl text-balance font-[family-name:var(--font-display)]">
          {accountType === "parent"
            ? `Monitoring Dashboard`
            : `Welcome back, ${userName.split(" ")[0]}`}
        </h1>
        <p className="text-xs text-muted-foreground leading-relaxed sm:text-sm">
          {accountType === "parent"
            ? "Track your child's learning performance and progress"
            : "Here's your learning performance overview. Keep pushing!"}
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
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
          title="Avg. Response"
          value="42s"
          subtitle="-8s improvement"
          icon={<Clock className="size-4" />}
          trend="up"
          accentColor="text-primary"
        />
      </div>

      {/* Main Grid */}
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        {/* Performance Chart */}
        <Card className="lg:col-span-2 border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 lg:px-6">
            <CardTitle className="text-sm font-semibold text-card-foreground lg:text-base">
              Performance Trend
            </CardTitle>
            <Badge variant="outline" className="text-[10px] border-border text-muted-foreground">
              Last 8 Weeks
            </Badge>
          </CardHeader>
          <CardContent className="px-2 lg:px-6">
            <ChartContainer
              config={{
                math: { label: "Mathematics", color: COLORS.primary },
                physics: { label: "Physics", color: COLORS.danger },
                chemistry: { label: "Chemistry", color: COLORS.info },
                cs: { label: "Computer Science", color: COLORS.warning },
              }}
              className="h-[200px] w-full sm:h-[240px] lg:h-[280px]"
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
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} domain={[40, 100]} />
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
          <CardHeader className="pb-2 px-4 lg:px-6">
            <CardTitle className="text-sm font-semibold text-card-foreground lg:text-base">
              Mastery Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 px-4 lg:px-6">
            <div className="relative h-[140px] w-[140px] sm:h-[160px] sm:w-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="100%"
                  startAngle={90}
                  endAngle={-270}
                  data={radialData}
                  barSize={10}
                >
                  <RadialBar
                    dataKey="value"
                    cornerRadius={10}
                    background={{ fill: "hsl(var(--secondary))" }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground sm:text-3xl">{overallMastery}%</span>
                <span className="text-[10px] text-muted-foreground">Overall</span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              {subjects.map((subject) => (
                <div key={subject.id} className="flex items-center gap-2 sm:gap-3">
                  <span className="w-16 truncate text-[10px] text-muted-foreground sm:w-24 sm:text-xs">
                    {subject.name}
                  </span>
                  <Progress value={subject.mastery} className="h-1.5 flex-1" />
                  <span className="w-8 text-right text-[10px] font-medium text-foreground sm:text-xs">
                    {subject.mastery}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weakness + Study Time */}
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        {/* Weakness Detection */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 lg:px-6">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-card-foreground lg:text-base">
              <AlertTriangle className="size-4 text-warning" />
              Weakness Detection
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-primary hover:text-primary hover:bg-primary/10"
              onClick={() => onNavigate("quiz")}
            >
              Practice <ArrowRight className="ml-1 size-3" />
            </Button>
          </CardHeader>
          <CardContent className="px-4 lg:px-6">
            <div className="flex flex-col gap-3">
              {weakSubjects.map((subject) => (
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
              ))}
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

        {/* Study Time */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 lg:px-6">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-card-foreground lg:text-base">
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
          <CardContent className="px-2 lg:px-6">
            <ChartContainer
              config={{
                hours: { label: "Hours", color: COLORS.primary },
              }}
              className="h-[180px] w-full sm:h-[220px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studySessions} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="hours" radius={[6, 6, 0, 0]} maxBarSize={28}>
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
            <div className="mt-3 flex items-center justify-center gap-3 text-[10px] text-muted-foreground sm:text-xs sm:gap-4">
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full" style={{ background: COLORS.primary }} />
                {"80%+"}
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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Button
          onClick={() => onNavigate("quiz")}
          className="h-auto flex-col gap-2 bg-primary/10 py-4 text-primary hover:bg-primary/20 border border-primary/20 sm:py-5"
          variant="ghost"
        >
          <Brain className="size-5 sm:size-6" />
          <span className="text-xs font-semibold sm:text-sm">Start Smart Quiz</span>
          <span className="text-[10px] text-primary/70">Targets your weak spots</span>
        </Button>
        <Button
          onClick={() => onNavigate("paths")}
          className="h-auto flex-col gap-2 bg-info/10 py-4 text-info hover:bg-info/20 border border-info/20 sm:py-5"
          variant="ghost"
        >
          <Route className="size-5 sm:size-6" />
          <span className="text-xs font-semibold sm:text-sm">Continue Path</span>
          <span className="text-[10px] text-info/70">3 paths in progress</span>
        </Button>
        <Button
          onClick={() => onNavigate("analytics")}
          className="h-auto flex-col gap-2 bg-warning/10 py-4 text-warning hover:bg-warning/20 border border-warning/20 sm:py-5"
          variant="ghost"
        >
          <Trophy className="size-5 sm:size-6" />
          <span className="text-xs font-semibold sm:text-sm">View Leaderboard</span>
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
    <Card className="border-border bg-card shadow-sm group hover:border-primary/30 hover:shadow-md transition-all duration-300 dark:shadow-none dark:hover:shadow-none">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium text-muted-foreground sm:text-xs">{title}</span>
          <div className={`flex size-7 items-center justify-center rounded-lg bg-secondary sm:size-8 ${accentColor}`}>
            {icon}
          </div>
        </div>
        <div className="mt-1 sm:mt-2">
          <span className="text-lg font-bold text-foreground sm:text-2xl">{value}</span>
        </div>
        <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground sm:text-xs">
          {trend === "up" && <TrendingUp className="size-3 text-primary" />}
          {trend === "down" && <TrendingDown className="size-3 text-destructive" />}
          {trend === "stable" && <Minus className="size-3 text-warning" />}
          <span className="truncate">{subtitle}</span>
        </div>
      </CardContent>
    </Card>
  )
}
