"use client"

import * as React from "react"
import {
  Clock,
  TrendingUp,
  Target,
  Coffee,
  Moon,
  Sun,
  Sunrise,
  BarChart3,
  Lightbulb,
  CheckCircle2,
  Play,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { studySessions, subjects } from "@/lib/data"

const COLORS = {
  primary: "#22d3a7",
  info: "#5b8def",
  warning: "#e5b84c",
  danger: "#ef6461",
}

const timeSlots = [
  { slot: "6-9 AM", efficiency: 72, icon: Sunrise, label: "Morning" },
  { slot: "9-12 PM", efficiency: 91, icon: Sun, label: "Late Morning" },
  { slot: "12-3 PM", efficiency: 65, icon: Coffee, label: "Afternoon" },
  { slot: "3-6 PM", efficiency: 82, icon: Sun, label: "Late Afternoon" },
  { slot: "6-9 PM", efficiency: 88, icon: Moon, label: "Evening" },
  { slot: "9-12 AM", efficiency: 58, icon: Moon, label: "Night" },
]

const radarData = subjects.map((s) => ({
  subject: s.name.substring(0, 4),
  mastery: s.mastery,
  efficiency: Math.round(70 + Math.random() * 25),
}))

const weeklyGoalHours = 17.5
const weeklyActualHours = studySessions.reduce((s, d) => s + d.hours, 0)
const weeklyGoalPercent = Math.min(100, Math.round((weeklyActualHours / weeklyGoalHours) * 100))

const recommendations = [
  {
    title: "Study Physics during peak hours",
    description: "Your lowest-performing subject should be studied between 9 AM - 12 PM when your focus is highest.",
    impact: "High",
    category: "timing",
  },
  {
    title: "Break Biology sessions into 25-min blocks",
    description: "Pomodoro technique works best for Biology where your attention drops after 28 minutes.",
    impact: "Medium",
    category: "technique",
  },
  {
    title: "Review weak topics before sleep",
    description: "Spaced repetition research shows reviewing difficult concepts before sleep improves retention by 23%.",
    impact: "High",
    category: "retention",
  },
  {
    title: "Increase Wednesday study time",
    description: "Wednesday is your least productive day. Adding 1 more hour could boost weekly efficiency by 8%.",
    impact: "Medium",
    category: "consistency",
  },
]

export function StudyOptimizer() {
  const [activeRec, setActiveRec] = React.useState<number | null>(null)
  const [appliedRecs, setAppliedRecs] = React.useState<Set<number>>(new Set())

  const applyRecommendation = (index: number) => {
    setAppliedRecs((prev) => new Set(prev).add(index))
  }

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl text-balance font-[family-name:var(--font-display)]">
          Study Time Optimizer
        </h1>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed sm:text-sm">
          AI-powered analysis of your study patterns to maximize learning efficiency.
        </p>
      </div>

      {/* Weekly Goal */}
      <Card className="border-border bg-card">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 sm:size-12">
                <Target className="size-5 text-primary sm:size-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground sm:text-base">Weekly Study Goal</h3>
                <p className="text-xs text-muted-foreground">
                  {weeklyActualHours}h / {weeklyGoalHours}h completed
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 sm:w-32">
                <Progress value={weeklyGoalPercent} className="h-2" />
              </div>
              <span className="text-sm font-bold text-foreground">{weeklyGoalPercent}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        {/* Peak Performance Times */}
        <Card className="border-border bg-card">
          <CardHeader className="px-4 pb-2 sm:px-6">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-card-foreground sm:text-base">
              <Clock className="size-4 text-info" />
              Peak Performance Times
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              {timeSlots.map((slot) => {
                const Icon = slot.icon
                const isOptimal = slot.efficiency >= 85
                return (
                  <div
                    key={slot.slot}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border p-2 transition-all sm:gap-3 sm:p-3",
                      isOptimal
                        ? "border-primary/20 bg-primary/5"
                        : "border-border bg-secondary/20"
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-7 items-center justify-center rounded-lg sm:size-8",
                        isOptimal ? "bg-primary/10" : "bg-secondary"
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-3.5 sm:size-4",
                          isOptimal ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-foreground sm:text-sm">{slot.slot}</span>
                        {isOptimal && (
                          <Badge className="text-[9px] bg-primary text-primary-foreground border-0 sm:text-[10px]">
                            Optimal
                          </Badge>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <Progress value={slot.efficiency} className="h-1 flex-1" />
                        <span
                          className={cn(
                            "text-[10px] font-semibold sm:text-xs",
                            slot.efficiency >= 85
                              ? "text-primary"
                              : slot.efficiency >= 70
                              ? "text-warning"
                              : "text-destructive"
                          )}
                        >
                          {slot.efficiency}%
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Subject Radar */}
        <Card className="border-border bg-card">
          <CardHeader className="px-4 pb-2 sm:px-6">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-card-foreground sm:text-base">
              <BarChart3 className="size-4 text-primary" />
              Subject Efficiency Radar
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <ChartContainer
              config={{
                mastery: { label: "Mastery", color: COLORS.primary },
                efficiency: { label: "Efficiency", color: COLORS.info },
              }}
              className="h-[250px] w-full sm:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fontSize: 9, fill: "var(--color-muted-foreground)" }}
                  />
                  <Radar
                    name="Mastery"
                    dataKey="mastery"
                    stroke={COLORS.primary}
                    fill={COLORS.primary}
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Efficiency"
                    dataKey="efficiency"
                    stroke={COLORS.info}
                    fill={COLORS.info}
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Daily Efficiency Chart */}
      <Card className="border-border bg-card">
        <CardHeader className="px-4 pb-2 sm:px-6">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-card-foreground sm:text-base">
            <TrendingUp className="size-4 text-primary" />
            Daily Study Efficiency
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <ChartContainer
            config={{
              efficiency: { label: "Efficiency %", color: COLORS.primary },
            }}
            className="h-[180px] w-full sm:h-[220px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={studySessions}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="gradEff" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="efficiency"
                  stroke={COLORS.primary}
                  fill="url(#gradEff)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:text-sm">
          <Lightbulb className="size-3.5 text-warning sm:size-4" />
          AI Recommendations
        </h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
          {recommendations.map((rec, index) => {
            const isApplied = appliedRecs.has(index)
            return (
              <Card
                key={index}
                className={cn(
                  "border-border bg-card cursor-pointer transition-all duration-300 hover:border-primary/30",
                  activeRec === index && "border-primary/30 bg-primary/5",
                  isApplied && "border-primary/40 bg-primary/10"
                )}
                onClick={() => setActiveRec(activeRec === index ? null : index)}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={cn(
                          "size-3.5 shrink-0 sm:size-4",
                          isApplied ? "text-primary" : activeRec === index ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                      <h3 className="text-xs font-semibold text-foreground sm:text-sm">{rec.title}</h3>
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-[9px] shrink-0 sm:text-[10px]",
                        rec.impact === "High"
                          ? "bg-primary/10 text-primary"
                          : "bg-warning/10 text-warning"
                      )}
                    >
                      {rec.impact}
                    </Badge>
                  </div>
                  {activeRec === index && (
                    <div className="mt-2 sm:mt-3">
                      <p className="text-[11px] text-muted-foreground leading-relaxed sm:text-sm">
                        {rec.description}
                      </p>
                      <Button
                        size="sm"
                        disabled={isApplied}
                        className={cn(
                          "mt-2 h-6 px-2 text-[10px] sm:mt-3 sm:h-7 sm:px-3 sm:text-xs",
                          isApplied
                            ? "bg-primary/20 text-primary cursor-default"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        )}
                        onClick={(e) => {
                          e.stopPropagation()
                          applyRecommendation(index)
                        }}
                      >
                        {isApplied ? (
                          <>
                            <CheckCircle2 className="mr-1 size-3" />
                            Applied
                          </>
                        ) : (
                          <>
                            <Play className="mr-1 size-3" />
                            Apply
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
