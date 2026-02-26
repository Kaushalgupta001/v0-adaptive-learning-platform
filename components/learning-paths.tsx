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
  Pause,
  Star,
  Timer,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { learningPaths as initialPaths, type PathModule, type LearningPath } from "@/lib/data"

type ModuleActivity = {
  moduleId: string
  status: "reading" | "quiz-active" | "completed"
  progress: number
  startedAt: number
}

export function LearningPaths() {
  const [expandedPath, setExpandedPath] = React.useState<string | null>("lp1")
  const [paths, setPaths] = React.useState<LearningPath[]>(() =>
    JSON.parse(JSON.stringify(initialPaths))
  )
  const [activeModule, setActiveModule] = React.useState<ModuleActivity | null>(null)
  const [moduleTimer, setModuleTimer] = React.useState(0)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)

  // Module activity timer
  React.useEffect(() => {
    if (activeModule && activeModule.status !== "completed") {
      timerRef.current = setInterval(() => {
        setModuleTimer((t) => t + 1)
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [activeModule])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  const startModule = (pathId: string, moduleId: string) => {
    setPaths((prev) =>
      prev.map((p) =>
        p.id === pathId
          ? {
              ...p,
              modules: p.modules.map((m) =>
                m.id === moduleId ? { ...m, status: "in-progress" as const } : m
              ),
            }
          : p
      )
    )
    setActiveModule({
      moduleId,
      status: "reading",
      progress: 0,
      startedAt: Date.now(),
    })
    setModuleTimer(0)
  }

  const completeModule = (pathId: string, moduleId: string) => {
    if (timerRef.current) clearInterval(timerRef.current)

    setPaths((prev) =>
      prev.map((p) => {
        if (p.id !== pathId) return p
        const updatedModules = p.modules.map((m, i, arr) => {
          if (m.id === moduleId) return { ...m, status: "completed" as const }
          // Unlock next module
          const currentIdx = arr.findIndex((mod) => mod.id === moduleId)
          if (i === currentIdx + 1 && m.status === "locked") {
            return { ...m, status: "available" as const }
          }
          return m
        })
        const completedCount = updatedModules.filter((m) => m.status === "completed").length
        return {
          ...p,
          modules: updatedModules,
          completedModules: completedCount,
          progress: Math.round((completedCount / p.totalModules) * 100),
        }
      })
    )
    setActiveModule(null)
    setModuleTimer(0)
  }

  const pauseModule = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setActiveModule(null)
    setModuleTimer(0)
  }

  const totalModules = paths.reduce((s, p) => s + p.totalModules, 0)
  const completedModules = paths.reduce((s, p) => s + p.completedModules, 0)
  const totalHours = paths.reduce((s, p) => s + parseFloat(p.estimatedTime), 0).toFixed(0)

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl text-balance font-[family-name:var(--font-display)]">
          Personalized Learning Paths
        </h1>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed sm:text-sm">
          AI-generated paths based on your weakness detection results. Start, continue,
          and complete modules to unlock new content.
        </p>
      </div>

      {/* Active Module Session Banner */}
      {activeModule && (
        <Card className="border-info/30 bg-info/5 animate-in fade-in slide-in-from-top-2 duration-300">
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-info/10 animate-pulse">
                <Timer className="size-5 text-info" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Module In Progress</h3>
                <p className="text-xs text-muted-foreground">
                  Time elapsed: <span className="font-mono font-semibold text-info">{formatTime(moduleTimer)}</span>
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={pauseModule}
                className="border-border text-foreground hover:bg-accent"
              >
                <Pause className="mr-1.5 size-3.5" />
                Pause
              </Button>
              <Button
                size="sm"
                className="bg-info text-foreground hover:bg-info/80"
                onClick={() => {
                  const path = paths.find((p) =>
                    p.modules.some((m) => m.id === activeModule.moduleId)
                  )
                  if (path) completeModule(path.id, activeModule.moduleId)
                }}
              >
                <CheckCircle2 className="mr-1.5 size-3.5" />
                Mark Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-border bg-card">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 sm:size-10 sm:rounded-xl">
                <BookOpen className="size-4 text-primary sm:size-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground sm:text-2xl">{paths.length}</p>
                <p className="text-[10px] text-muted-foreground sm:text-xs">Active Paths</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-info/10 sm:size-10 sm:rounded-xl">
                <GraduationCap className="size-4 text-info sm:size-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground sm:text-2xl">{completedModules}</p>
                <p className="text-[10px] text-muted-foreground sm:text-xs">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-warning/10 sm:size-10 sm:rounded-xl">
                <Clock className="size-4 text-warning sm:size-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground sm:text-2xl">{totalHours}h</p>
                <p className="text-[10px] text-muted-foreground sm:text-xs">Est. Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Paths */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {paths.map((path) => {
          const isExpanded = expandedPath === path.id
          const isComplete = path.progress === 100
          return (
            <Card
              key={path.id}
              className={cn(
                "border-border bg-card transition-all duration-300",
                isExpanded && "border-primary/30",
                isComplete && "border-primary/40 bg-primary/5"
              )}
            >
              <CardHeader
                className="cursor-pointer p-4 sm:p-6"
                onClick={() => setExpandedPath(isExpanded ? null : path.id)}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-xl sm:size-12",
                      isComplete ? "bg-primary/10" : path.progress >= 50 ? "bg-primary/10" : "bg-warning/10"
                    )}
                  >
                    {isComplete ? (
                      <Star className="size-5 text-primary sm:size-6" />
                    ) : (
                      <BookOpen
                        className={cn(
                          "size-5 sm:size-6",
                          path.progress >= 50 ? "text-primary" : "text-warning"
                        )}
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-sm font-semibold text-card-foreground sm:text-base">
                      {path.title}
                    </CardTitle>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      <Badge variant="secondary" className="text-[10px] bg-secondary text-secondary-foreground">
                        {path.subject}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] bg-secondary text-secondary-foreground">
                        {path.difficulty}
                      </Badge>
                      <span className="hidden text-xs text-muted-foreground sm:inline">
                        {path.estimatedTime} remaining
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="flex flex-col items-end">
                      <span className="text-base font-bold text-foreground sm:text-lg">{path.progress}%</span>
                      <span className="text-[10px] text-muted-foreground">
                        {path.completedModules}/{path.totalModules}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="size-4 text-muted-foreground sm:size-5" />
                    ) : (
                      <ChevronDown className="size-4 text-muted-foreground sm:size-5" />
                    )}
                  </div>
                </div>
                <Progress value={path.progress} className="mt-3 h-1.5" />
              </CardHeader>

              {isExpanded && (
                <CardContent className="px-4 pb-4 pt-0 sm:px-6 sm:pb-6">
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    {path.modules.map((module, index) => (
                      <ModuleItem
                        key={module.id}
                        module={module}
                        index={index}
                        isLast={index === path.modules.length - 1}
                        isActive={activeModule?.moduleId === module.id}
                        timer={activeModule?.moduleId === module.id ? moduleTimer : 0}
                        onStart={() => startModule(path.id, module.id)}
                        onComplete={() => completeModule(path.id, module.id)}
                        onPause={pauseModule}
                        formatTime={formatTime}
                      />
                    ))}
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
  isActive,
  timer,
  onStart,
  onComplete,
  onPause,
  formatTime,
}: {
  module: PathModule
  index: number
  isLast: boolean
  isActive: boolean
  timer: number
  onStart: () => void
  onComplete: () => void
  onPause: () => void
  formatTime: (s: number) => string
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
    <div className="flex items-start gap-2 sm:gap-3">
      {/* Timeline */}
      <div className="flex flex-col items-center pt-1">
        <div
          className={cn(
            "flex size-7 items-center justify-center rounded-full sm:size-8",
            isActive ? "bg-info/20 ring-2 ring-info/40 animate-pulse" : statusInfo.bg
          )}
        >
          <StatusIcon className={cn("size-3.5 sm:size-4", isActive ? "text-info" : statusInfo.color)} />
        </div>
        {!isLast && (
          <div
            className={cn(
              "h-5 w-0.5 sm:h-6",
              module.status === "completed" ? "bg-primary/30" : "bg-border"
            )}
          />
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex flex-1 items-center justify-between rounded-lg border p-2.5 transition-all sm:p-3",
          isActive && "border-info/40 bg-info/5 ring-1 ring-info/20",
          !isActive && module.status === "locked" && "border-border bg-secondary/20 opacity-60",
          !isActive && module.status === "in-progress" && "border-info/30 bg-info/5",
          !isActive && module.status === "completed" && "border-primary/20 bg-primary/5",
          !isActive && module.status === "available" && "border-border bg-secondary/30 hover:border-primary/30 cursor-pointer"
        )}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <TypeIcon className={cn("size-3.5 shrink-0 sm:size-4", statusInfo.color)} />
          <div className="min-w-0">
            <p
              className={cn(
                "text-xs font-medium sm:text-sm",
                module.status === "locked" ? "text-muted-foreground" : "text-foreground"
              )}
            >
              {module.title}
            </p>
            <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
              <Badge variant="secondary" className="text-[9px] sm:text-[10px] bg-secondary text-secondary-foreground">
                {typeConfig[module.type].label}
              </Badge>
              <span className="text-[9px] text-muted-foreground sm:text-[10px]">{module.duration}</span>
              {isActive && (
                <span className="font-mono text-[10px] font-semibold text-info">
                  {formatTime(timer)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 ml-2">
          {isActive && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => { e.stopPropagation(); onPause() }}
                className="h-6 px-2 text-[10px] border-border text-foreground hover:bg-accent sm:h-7 sm:px-3"
              >
                <Pause className="mr-1 size-3" />
                <span className="hidden sm:inline">Pause</span>
              </Button>
              <Button
                size="sm"
                onClick={(e) => { e.stopPropagation(); onComplete() }}
                className="h-6 px-2 text-[10px] bg-primary text-primary-foreground hover:bg-primary/90 sm:h-7 sm:px-3"
              >
                <CheckCircle2 className="mr-1 size-3" />
                <span className="hidden sm:inline">Done</span>
              </Button>
            </>
          )}
          {!isActive && module.status === "in-progress" && (
            <Button
              size="sm"
              onClick={(e) => { e.stopPropagation(); onStart() }}
              className="h-6 px-2 text-[10px] bg-info text-foreground hover:bg-info/80 sm:h-7 sm:px-3"
            >
              Continue
            </Button>
          )}
          {!isActive && module.status === "available" && (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => { e.stopPropagation(); onStart() }}
              className="h-6 px-2 text-[10px] border-border text-foreground hover:bg-accent sm:h-7 sm:px-3"
            >
              Start
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
