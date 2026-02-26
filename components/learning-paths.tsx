"use client"

import * as React from "react"
import {
  BookOpen, CheckCircle2, Lock, Play, Clock, ChevronDown, ChevronUp,
  GraduationCap, FileText, HelpCircle, RotateCcw, ArrowRight, Pause,
  Star, Timer, X, Lightbulb, ArrowLeft,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { learningPaths as initialPaths, moduleContents, type PathModule, type LearningPath } from "@/lib/data"

type ActiveView = "list" | "module-content"

export function LearningPaths() {
  const [expandedPath, setExpandedPath] = React.useState<string | null>("lp1")
  const [paths, setPaths] = React.useState<LearningPath[]>(() => JSON.parse(JSON.stringify(initialPaths)))
  const [activeModuleId, setActiveModuleId] = React.useState<string | null>(null)
  const [activePathId, setActivePathId] = React.useState<string | null>(null)
  const [moduleTimer, setModuleTimer] = React.useState(0)
  const [view, setView] = React.useState<ActiveView>("list")
  const [miniQuizAnswer, setMiniQuizAnswer] = React.useState<number | null>(null)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    if (activeModuleId && view === "module-content") {
      timerRef.current = setInterval(() => setModuleTimer((t) => t + 1), 1000)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [activeModuleId, view])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  const openModule = (pathId: string, moduleId: string) => {
    setPaths((prev) =>
      prev.map((p) =>
        p.id === pathId
          ? { ...p, modules: p.modules.map((m) => m.id === moduleId ? { ...m, status: "in-progress" as const } : m) }
          : p
      )
    )
    setActiveModuleId(moduleId)
    setActivePathId(pathId)
    setView("module-content")
    setModuleTimer(0)
    setMiniQuizAnswer(null)
  }

  const completeModule = () => {
    if (!activePathId || !activeModuleId) return
    if (timerRef.current) clearInterval(timerRef.current)
    setPaths((prev) =>
      prev.map((p) => {
        if (p.id !== activePathId) return p
        const updatedModules = p.modules.map((m, i, arr) => {
          if (m.id === activeModuleId) return { ...m, status: "completed" as const }
          const currentIdx = arr.findIndex((mod) => mod.id === activeModuleId)
          if (i === currentIdx + 1 && m.status === "locked") return { ...m, status: "available" as const }
          return m
        })
        const completedCount = updatedModules.filter((m) => m.status === "completed").length
        return { ...p, modules: updatedModules, completedModules: completedCount, progress: Math.round((completedCount / p.totalModules) * 100) }
      })
    )
    setView("list")
    setActiveModuleId(null)
    setActivePathId(null)
    setModuleTimer(0)
  }

  const goBack = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setView("list")
    setActiveModuleId(null)
    setActivePathId(null)
    setModuleTimer(0)
  }

  const totalModules = paths.reduce((s, p) => s + p.totalModules, 0)
  const completedModules = paths.reduce((s, p) => s + p.completedModules, 0)
  const totalHours = paths.reduce((s, p) => s + parseFloat(p.estimatedTime), 0).toFixed(0)

  // Module Content View
  if (view === "module-content" && activeModuleId) {
    const content = moduleContents[activeModuleId]
    const currentPath = paths.find((p) => p.id === activePathId)
    const currentModule = currentPath?.modules.find((m) => m.id === activeModuleId)

    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-4 lg:gap-6">
        {/* Back Nav */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={goBack} className="text-muted-foreground hover:text-foreground hover:bg-accent">
            <ArrowLeft className="mr-1.5 size-4" /> Back to Paths
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-border text-muted-foreground font-mono">
              <Timer className="mr-1 size-3" /> {formatTime(moduleTimer)}
            </Badge>
          </div>
        </div>

        {/* Module Header */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 sm:size-12">
                <BookOpen className="size-5 text-primary sm:size-6" />
              </div>
              <div className="flex-1">
                <h1 className="text-base font-bold text-foreground sm:text-xl font-[family-name:var(--font-display)]">
                  {currentModule?.title}
                </h1>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px] bg-secondary text-secondary-foreground">{currentPath?.subject}</Badge>
                  <Badge variant="secondary" className="text-[10px] bg-secondary text-secondary-foreground">{currentModule?.type}</Badge>
                  <span className="text-[10px] text-muted-foreground">{currentModule?.duration}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {content ? (
          <>
            {/* Summary */}
            <Card className="border-border bg-card">
              <CardHeader className="px-4 pb-2 sm:px-6">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-card-foreground sm:text-base">
                  <FileText className="size-4 text-info" /> Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{content.summary}</p>
              </CardContent>
            </Card>

            {/* Key Points */}
            <Card className="border-border bg-card">
              <CardHeader className="px-4 pb-2 sm:px-6">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-card-foreground sm:text-base">
                  <Star className="size-4 text-warning" /> Key Points
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <ul className="flex flex-col gap-2">
                  {content.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                      <span className="text-xs text-foreground leading-relaxed sm:text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Example */}
            {content.example && (
              <Card className="border-info/20 bg-info/5">
                <CardHeader className="px-4 pb-2 sm:px-6">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-info sm:text-base">
                    <Lightbulb className="size-4" /> {content.example.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <pre className="whitespace-pre-wrap rounded-lg border border-border bg-card p-3 font-mono text-[11px] text-foreground leading-relaxed sm:p-4 sm:text-xs">
                    {content.example.content}
                  </pre>
                </CardContent>
              </Card>
            )}

            {/* Mini Quiz */}
            {content.miniQuiz && (
              <Card className="border-border bg-card">
                <CardHeader className="px-4 pb-2 sm:px-6">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-card-foreground sm:text-base">
                    <HelpCircle className="size-4 text-primary" /> Quick Check
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <p className="mb-3 text-xs font-medium text-foreground sm:mb-4 sm:text-sm">{content.miniQuiz.question}</p>
                  <div className="flex flex-col gap-2">
                    {content.miniQuiz.options.map((opt, i) => {
                      const isSelected = miniQuizAnswer === i
                      const isCorrect = i === content.miniQuiz!.answer
                      const isAnswered = miniQuizAnswer !== null
                      return (
                        <button
                          key={i}
                          onClick={() => setMiniQuizAnswer(i)}
                          disabled={isAnswered}
                          className={cn(
                            "flex items-center gap-2 rounded-lg border-2 p-2.5 text-left transition-all sm:p-3",
                            !isAnswered && "border-border bg-secondary/30 hover:border-primary/50 cursor-pointer",
                            isAnswered && isCorrect && "border-primary bg-primary/10",
                            isAnswered && isSelected && !isCorrect && "border-destructive bg-destructive/10",
                            isAnswered && !isSelected && !isCorrect && "border-border bg-secondary/20 opacity-50"
                          )}
                        >
                          <div className={cn(
                            "flex size-6 shrink-0 items-center justify-center rounded text-[10px] font-bold sm:size-7 sm:text-xs",
                            isAnswered && isCorrect ? "bg-primary text-primary-foreground" :
                            isAnswered && isSelected && !isCorrect ? "bg-destructive text-destructive-foreground" :
                            "bg-secondary text-muted-foreground"
                          )}>
                            {isAnswered && isCorrect ? <CheckCircle2 className="size-3.5" /> :
                             isAnswered && isSelected && !isCorrect ? <X className="size-3.5" /> :
                             String.fromCharCode(65 + i)}
                          </div>
                          <span className="text-xs text-foreground sm:text-sm">{opt}</span>
                        </button>
                      )
                    })}
                  </div>
                  {miniQuizAnswer !== null && miniQuizAnswer === content.miniQuiz.answer && (
                    <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-2.5 sm:p-3">
                      <p className="text-xs text-primary font-medium">Correct! Great understanding.</p>
                    </div>
                  )}
                  {miniQuizAnswer !== null && miniQuizAnswer !== content.miniQuiz.answer && (
                    <div className="mt-3 rounded-lg border border-destructive/20 bg-destructive/5 p-2.5 sm:p-3">
                      <p className="text-xs text-destructive font-medium">
                        Not quite. The correct answer is: {content.miniQuiz.options[content.miniQuiz.answer]}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Complete Button */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={goBack} className="flex-1 border-border text-foreground hover:bg-accent">
                <Pause className="mr-2 size-4" /> Save & Exit
              </Button>
              <Button onClick={completeModule} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                <CheckCircle2 className="mr-2 size-4" /> Complete Module
              </Button>
            </div>
          </>
        ) : (
          /* No content available - still allow completion */
          <Card className="border-border bg-card">
            <CardContent className="flex flex-col items-center justify-center py-12 px-4">
              <GraduationCap className="size-10 text-muted-foreground/30 sm:size-12" />
              <p className="mt-3 text-sm font-medium text-foreground">Module In Progress</p>
              <p className="mt-1 text-xs text-muted-foreground text-center">
                Work through this {currentModule?.type} at your own pace. Mark complete when done.
              </p>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={goBack} className="border-border text-foreground hover:bg-accent">
                  <Pause className="mr-2 size-4" /> Pause
                </Button>
                <Button onClick={completeModule} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <CheckCircle2 className="mr-2 size-4" /> Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  // List View
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl text-balance font-[family-name:var(--font-display)]">
          Personalized Learning Paths
        </h1>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed sm:text-sm">
          AI-generated paths targeting your weak areas. Open any module to study its content, examples, and mini-quiz.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: BookOpen, color: "text-primary", bg: "bg-primary/10", value: paths.length, label: "Active Paths" },
          { icon: GraduationCap, color: "text-info", bg: "bg-info/10", value: completedModules, label: "Completed" },
          { icon: Clock, color: "text-warning", bg: "bg-warning/10", value: `${totalHours}h`, label: "Est. Time" },
        ].map((stat) => (
          <Card key={stat.label} className="border-border bg-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={cn("flex size-8 items-center justify-center rounded-lg sm:size-10 sm:rounded-xl", stat.bg)}>
                  <stat.icon className={cn("size-4 sm:size-5", stat.color)} />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground sm:text-2xl">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground sm:text-xs">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paths */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {paths.map((path) => {
          const isExpanded = expandedPath === path.id
          const isComplete = path.progress === 100
          return (
            <Card key={path.id} className={cn("border-border bg-card transition-all duration-300", isExpanded && "border-primary/30", isComplete && "border-primary/40 bg-primary/5")}>
              <CardHeader className="cursor-pointer p-4 sm:p-6" onClick={() => setExpandedPath(isExpanded ? null : path.id)}>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={cn("flex size-10 items-center justify-center rounded-xl sm:size-12", isComplete ? "bg-primary/10" : path.progress >= 50 ? "bg-primary/10" : "bg-warning/10")}>
                    {isComplete ? <Star className="size-5 text-primary sm:size-6" /> : <BookOpen className={cn("size-5 sm:size-6", path.progress >= 50 ? "text-primary" : "text-warning")} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-sm font-semibold text-card-foreground sm:text-base">{path.title}</CardTitle>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      <Badge variant="secondary" className="text-[10px] bg-secondary text-secondary-foreground">{path.subject}</Badge>
                      <Badge variant="secondary" className="text-[10px] bg-secondary text-secondary-foreground">{path.difficulty}</Badge>
                      <span className="hidden text-xs text-muted-foreground sm:inline">{path.estimatedTime} remaining</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="flex flex-col items-end">
                      <span className="text-base font-bold text-foreground sm:text-lg">{path.progress}%</span>
                      <span className="text-[10px] text-muted-foreground">{path.completedModules}/{path.totalModules}</span>
                    </div>
                    {isExpanded ? <ChevronUp className="size-4 text-muted-foreground sm:size-5" /> : <ChevronDown className="size-4 text-muted-foreground sm:size-5" />}
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
                        hasContent={!!moduleContents[module.id]}
                        onOpen={() => openModule(path.id, module.id)}
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

function ModuleItem({ module, index, isLast, hasContent, onOpen }: {
  module: PathModule; index: number; isLast: boolean; hasContent: boolean; onOpen: () => void
}) {
  const typeConfig = { lesson: { icon: FileText, label: "Lesson" }, quiz: { icon: HelpCircle, label: "Quiz" }, practice: { icon: Play, label: "Practice" }, review: { icon: RotateCcw, label: "Review" } }
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
      <div className="flex flex-col items-center pt-1">
        <div className={cn("flex size-7 items-center justify-center rounded-full sm:size-8", statusInfo.bg)}>
          <StatusIcon className={cn("size-3.5 sm:size-4", statusInfo.color)} />
        </div>
        {!isLast && <div className={cn("h-5 w-0.5 sm:h-6", module.status === "completed" ? "bg-primary/30" : "bg-border")} />}
      </div>
      <div className={cn(
        "flex flex-1 items-center justify-between rounded-lg border p-2.5 transition-all sm:p-3",
        module.status === "locked" && "border-border bg-secondary/20 opacity-60",
        module.status === "in-progress" && "border-info/30 bg-info/5",
        module.status === "completed" && "border-primary/20 bg-primary/5",
        module.status === "available" && "border-border bg-secondary/30 hover:border-primary/30 cursor-pointer"
      )}>
        <div className="flex items-center gap-2 sm:gap-3">
          <TypeIcon className={cn("size-3.5 shrink-0 sm:size-4", statusInfo.color)} />
          <div className="min-w-0">
            <p className={cn("text-xs font-medium sm:text-sm", module.status === "locked" ? "text-muted-foreground" : "text-foreground")}>{module.title}</p>
            <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
              <Badge variant="secondary" className="text-[9px] sm:text-[10px] bg-secondary text-secondary-foreground">{typeConfig[module.type].label}</Badge>
              <span className="text-[9px] text-muted-foreground sm:text-[10px]">{module.duration}</span>
              {hasContent && module.status !== "locked" && <Badge variant="secondary" className="text-[9px] bg-info/10 text-info border-0">Has Content</Badge>}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 ml-2">
          {module.status === "in-progress" && (
            <Button size="sm" onClick={(e) => { e.stopPropagation(); onOpen() }} className="h-6 px-2 text-[10px] bg-info text-foreground hover:bg-info/80 sm:h-7 sm:px-3">
              {hasContent ? "Open" : "Continue"}
            </Button>
          )}
          {module.status === "available" && (
            <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); onOpen() }} className="h-6 px-2 text-[10px] border-border text-foreground hover:bg-accent sm:h-7 sm:px-3">
              Start
            </Button>
          )}
          {module.status === "completed" && hasContent && (
            <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); onOpen() }} className="h-6 px-2 text-[10px] text-muted-foreground hover:text-foreground sm:h-7 sm:px-3">
              Review
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
