"use client"

import * as React from "react"
import {
  Clock,
  TrendingUp,
  Brain,
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
  time: Math.round(s.avgTime),
}))

const weeklyGoalHours = 17.5
const weeklyActualHours = studySessions.reduce((s, d) => s + d.hours, 0)
const weeklyGoalPercent = Math.round((weeklyActualHours / weeklyGoalHours) * 100)

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

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl text-balance">
          Study Time Optimizer
        </h1>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          AI-powered analysis of your study patterns to maximize learning efficiency and minimize
          wasted time.
        </p>
      </div>

      {/* Weekly Goal */}
      <Card className="border-border bg-card">
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                <Target className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Weekly Study Goal</h3>
                <p className="text-sm text-muted-foreground">
                  {weeklyActualHours}h / {weeklyGoalHours}h completed
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32">
                <Progress value={weeklyGoalPercent} className="h-2" />
              </div>
              <span className="text-sm font-bold text-foreground">{weeklyGoalPercent}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Peak Performance Times */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-card-foreground">
              <Clock className="size-4 text-info" />
              Peak Performance Times
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {timeSlots.map((slot, index) => {
                const Icon = slot.icon
                const isOptimal = slot.efficiency >= 85
                return (
                  <div
                    key={slot.slot}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border p-3 transition-all",
                      isOptimal
                        ? "border-primary/20 bg-primary/5"
                        : "border-border bg-secondary/20"
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-8 items-center justify-center rounded-lg",
                        isOptimal ? "bg-primary/10" : "bg-secondary"
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-4",
                          isOptimal ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{slot.slot}</span>
                        {isOptimal && (
                          <Badge className="text-[10px] bg-primary text-primary-foreground border-0">
                            Optimal
                          </Badge>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <Progress
                          value={slot.efficiency}
                          className="h-1 flex-1"
                        />
                        <span
                          className={cn(
                            "text-xs font-semibold",
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
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-card-foreground">
              <BarChart3 className="size-4 text-primary" />
              Subject Efficiency Radar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                mastery: { label: "Mastery", color: COLORS.primary },
                efficiency: { label: "Efficiency", color: COLORS.info },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
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
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-card-foreground">
            <TrendingUp className="size-4 text-primary" />
            Daily Study Efficiency
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              efficiency: { label: "Efficiency %", color: COLORS.primary },
              hours: { label: "Hours", color: COLORS.info },
            }}
            className="h-[220px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={studySessions}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="gradEfficiency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="efficiency"
                  stroke={COLORS.primary}
                  fill="url(#gradEfficiency)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <Lightbulb className="size-4 text-warning" />
          AI Recommendations
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {recommendations.map((rec, index) => (
            <Card
              key={index}
              className={cn(
                "border-border bg-card cursor-pointer transition-all duration-300 hover:border-primary/30",
                activeRec === index && "border-primary/30 bg-primary/5"
              )}
              onClick={() => setActiveRec(activeRec === index ? null : index)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      className={cn(
                        "size-4 shrink-0",
                        activeRec === index ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <h3 className="text-sm font-semibold text-foreground">{rec.title}</h3>
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-[10px] shrink-0",
                      rec.impact === "High"
                        ? "bg-primary/10 text-primary"
                        : "bg-warning/10 text-warning"
                    )}
                  >
                    {rec.impact}
                  </Badge>
                </div>
                {activeRec === index && (
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {rec.description}
                    </p>
                    <Button
                      size="sm"
                      className="mt-3 h-7 bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
                    >
                      <Play className="mr-1 size-3" />
                      Apply Recommendation
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
