"use client"

import * as React from "react"
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Play,
  Clock,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  FileText,
  HelpCircle,
  RotateCcw,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { learningPaths, type PathModule } from "@/lib/data"

export function LearningPaths() {
  const [expandedPath, setExpandedPath] = React.useState<string | null>("lp1")

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl text-balance">
          Personalized Learning Paths
        </h1>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          AI-generated paths based on your weakness detection results. Each path targets specific
          topics where you need improvement.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <BookOpen className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{learningPaths.length}</p>
                <p className="text-xs text-muted-foreground">Active Paths</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-info/10">
                <GraduationCap className="size-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {learningPaths.reduce((sum, p) => sum + p.completedModules, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Modules Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-warning/10">
                <Clock className="size-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {learningPaths.reduce(
                    (sum, p) => sum + parseFloat(p.estimatedTime),
                    0
                  ).toFixed(0)}h
                </p>
                <p className="text-xs text-muted-foreground">Total Est. Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Paths */}
      <div className="flex flex-col gap-4">
        {learningPaths.map((path) => {
          const isExpanded = expandedPath === path.id
          return (
            <Card
              key={path.id}
              className={cn(
                "border-border bg-card transition-all duration-300",
                isExpanded && "border-primary/30"
              )}
            >
              <CardHeader
                className="cursor-pointer"
                onClick={() =>
                  setExpandedPath(isExpanded ? null : path.id)
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "flex size-12 items-center justify-center rounded-xl",
                        path.progress >= 50
                          ? "bg-primary/10"
                          : "bg-warning/10"
                      )}
                    >
                      <BookOpen
                        className={cn(
                          "size-6",
                          path.progress >= 50
                            ? "text-primary"
                            : "text-warning"
                        )}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base text-card-foreground">
                        {path.title}
                      </CardTitle>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px] bg-secondary text-secondary-foreground">
                          {path.subject}
                        </Badge>
                        <Badge variant="secondary" className="text-[10px] bg-secondary text-secondary-foreground">
                          {path.difficulty}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {path.estimatedTime} remaining
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-lg font-bold text-foreground">{path.progress}%</span>
                      <span className="text-[10px] text-muted-foreground">
                        {path.completedModules}/{path.totalModules} modules
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="size-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="size-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <Progress value={path.progress} className="mt-3 h-1.5" />
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="flex flex-col gap-2">
                    {path.modules.map((module, index) => (
                      <ModuleItem
                        key={module.id}
                        module={module}
                        index={index}
                        isLast={index === path.modules.length - 1}
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Continue Path <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function ModuleItem({
  module,
  index,
  isLast,
}: {
  module: PathModule
  index: number
  isLast: boolean
}) {
  const typeConfig = {
    lesson: { icon: FileText, label: "Lesson" },
    quiz: { icon: HelpCircle, label: "Quiz" },
    practice: { icon: Play, label: "Practice" },
    review: { icon: RotateCcw, label: "Review" },
  }

  const statusConfig = {
    completed: { color: "text-primary", bg: "bg-primary/10", icon: CheckCircle2 },
    "in-progress": { color: "text-info", bg: "bg-info/10", icon: Play },
    available: { color: "text-warning", bg: "bg-warning/10", icon: ArrowRight },
    locked: { color: "text-muted-foreground", bg: "bg-secondary", icon: Lock },
  }

  const TypeIcon = typeConfig[module.type].icon
  const statusInfo = statusConfig[module.status]
  const StatusIcon = statusInfo.icon

  return (
    <div className="flex items-center gap-3">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex size-8 items-center justify-center rounded-full",
            statusInfo.bg
          )}
        >
          <StatusIcon className={cn("size-4", statusInfo.color)} />
        </div>
        {!isLast && (
          <div
            className={cn(
              "h-6 w-0.5",
              module.status === "completed" ? "bg-primary/30" : "bg-border"
            )}
          />
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex flex-1 items-center justify-between rounded-lg border p-3 transition-all",
          module.status === "locked"
            ? "border-border bg-secondary/20 opacity-60"
            : module.status === "in-progress"
            ? "border-info/30 bg-info/5"
            : module.status === "completed"
            ? "border-primary/20 bg-primary/5"
            : "border-border bg-secondary/30 hover:border-primary/30 cursor-pointer"
        )}
      >
        <div className="flex items-center gap-3">
          <TypeIcon className={cn("size-4", statusInfo.color)} />
          <div>
            <p className={cn("text-sm font-medium", module.status === "locked" ? "text-muted-foreground" : "text-foreground")}>
              {module.title}
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-[10px] bg-secondary text-secondary-foreground">
                {typeConfig[module.type].label}
              </Badge>
              <span className="text-[10px] text-muted-foreground">{module.duration}</span>
            </div>
          </div>
        </div>
        {module.status === "in-progress" && (
          <Button size="sm" className="h-7 bg-info text-foreground hover:bg-info/80 text-xs">
            Continue
          </Button>
        )}
        {module.status === "available" && (
          <Button size="sm" variant="outline" className="h-7 border-border text-foreground hover:bg-accent text-xs">
            Start
          </Button>
        )}
      </div>
    </div>
  )
}
