"use client"

import * as React from "react"
import {
  Bell, AlertTriangle, Trophy, Clock, Zap, Heart, CheckCircle2, X, ArrowRight, ChevronDown, ChevronUp, XCircle, Lightbulb,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { nudges as initialNudges, type Nudge } from "@/lib/data"

const nudgeConfig = {
  warning: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
  milestone: { icon: Trophy, color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
  reminder: { icon: Clock, color: "text-info", bg: "bg-info/10", border: "border-info/20" },
  challenge: { icon: Zap, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  encouragement: { icon: Heart, color: "text-chart-4", bg: "bg-chart-4/10", border: "border-chart-4/20" },
}

export function SmartNudges({ onMarkRead }: { onMarkRead: () => void }) {
  const [nudgesList, setNudgesList] = React.useState<Nudge[]>(initialNudges)
  const [filter, setFilter] = React.useState<string>("all")
  const [expandedNudge, setExpandedNudge] = React.useState<string | null>(null)
  const [quizAnswers, setQuizAnswers] = React.useState<Record<string, number[]>>({})
  const [actionedIds, setActionedIds] = React.useState<Set<string>>(new Set())

  const markAsRead = (id: string) => {
    setNudgesList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    setActionedIds((prev) => new Set(prev).add(id))
    onMarkRead()
  }

  const dismiss = (id: string) => {
    setNudgesList((prev) => prev.filter((n) => n.id !== id))
  }

  const markAllRead = () => {
    setNudgesList((prev) => prev.map((n) => ({ ...n, read: true })))
    onMarkRead()
  }

  const answerNudgeQuiz = (nudgeId: string, qIndex: number, ansIndex: number) => {
    setQuizAnswers((prev) => {
      const current = prev[nudgeId] || []
      const updated = [...current]
      updated[qIndex] = ansIndex
      return { ...prev, [nudgeId]: updated }
    })
  }

  const toggleExpand = (id: string) => {
    setExpandedNudge(expandedNudge === id ? null : id)
    if (!actionedIds.has(id)) {
      markAsRead(id)
    }
  }

  const filtered = filter === "all" ? nudgesList
    : filter === "unread" ? nudgesList.filter((n) => !n.read)
    : nudgesList.filter((n) => n.type === filter)

  const unreadCount = nudgesList.filter((n) => !n.read).length

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl text-balance font-[family-name:var(--font-display)]">Smart Nudges</h1>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed sm:text-sm">Intelligent notifications with built-in quizzes and action items for each subject.</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead} className="border-border text-foreground hover:bg-accent w-fit">
            <CheckCircle2 className="mr-1.5 size-3.5" /> Mark all read ({unreadCount})
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {[
          { id: "all", label: "All" }, { id: "unread", label: `Unread (${unreadCount})` },
          { id: "warning", label: "Warnings" }, { id: "milestone", label: "Milestones" },
          { id: "reminder", label: "Reminders" }, { id: "challenge", label: "Challenges" },
          { id: "encouragement", label: "Encouragement" },
        ].map((f) => (
          <Button
            key={f.id}
            variant={filter === f.id ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f.id)}
            className={cn(
              "h-7 text-[10px] sm:h-8 sm:text-xs",
              filter === f.id ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border-border text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Nudge Cards */}
      <div className="flex flex-col gap-2 sm:gap-3">
        {filtered.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="size-10 text-muted-foreground/30 sm:size-12" />
              <p className="mt-3 text-xs text-muted-foreground sm:mt-4 sm:text-sm">No notifications to show</p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((nudge) => {
            const config = nudgeConfig[nudge.type]
            const Icon = config.icon
            const actioned = actionedIds.has(nudge.id)
            const isExpanded = expandedNudge === nudge.id
            const answers = quizAnswers[nudge.id] || []
            const hasQuiz = nudge.quizQuestions && nudge.quizQuestions.length > 0

            return (
              <Card
                key={nudge.id}
                className={cn(
                  "border-border bg-card transition-all duration-300",
                  !nudge.read && `${config.border} ${config.bg}`,
                  isExpanded && "border-primary/30"
                )}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={cn("mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg sm:size-10 sm:rounded-xl", config.bg)}>
                      <Icon className={cn("size-4 sm:size-5", config.color)} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs font-semibold text-foreground sm:text-sm">{nudge.title}</h3>
                        {!nudge.read && <span className="size-1.5 shrink-0 rounded-full bg-primary sm:size-2" />}
                        {nudge.subject && (
                          <Badge variant="secondary" className="text-[9px] bg-secondary text-secondary-foreground sm:text-[10px]">{nudge.subject}</Badge>
                        )}
                        <Badge variant="secondary" className={cn(
                          "ml-auto text-[9px] shrink-0 sm:text-[10px]",
                          nudge.priority === "high" ? "bg-destructive/10 text-destructive" : nudge.priority === "medium" ? "bg-warning/10 text-warning" : "bg-secondary text-muted-foreground"
                        )}>
                          {nudge.priority}
                        </Badge>
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed sm:text-sm">{nudge.message}</p>
                      <div className="mt-2 flex items-center gap-2 sm:mt-3">
                        <Button
                          size="sm"
                          className="h-6 px-2 text-[10px] bg-primary text-primary-foreground hover:bg-primary/90 sm:h-7 sm:px-3 sm:text-xs"
                          onClick={() => toggleExpand(nudge.id)}
                        >
                          {nudge.action}
                          {isExpanded ? <ChevronUp className="ml-1 size-3" /> : <ArrowRight className="ml-1 size-3" />}
                        </Button>
                        {hasQuiz && (
                          <Badge variant="secondary" className="text-[9px] bg-info/10 text-info border-0">
                            {nudge.quizQuestions!.length} questions
                          </Badge>
                        )}
                        <span className="text-[9px] text-muted-foreground ml-auto sm:text-[10px]">{nudge.timestamp}</span>
                      </div>

                      {/* Expanded Quiz Section */}
                      {isExpanded && hasQuiz && (
                        <div className="mt-3 flex flex-col gap-3 rounded-lg border border-border bg-secondary/20 p-3 sm:mt-4 sm:p-4">
                          <h4 className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                            <Lightbulb className="size-3.5 text-warning" /> Quick Review Questions
                          </h4>
                          {nudge.quizQuestions!.map((qq, qIdx) => {
                            const userAnswer = answers[qIdx]
                            const isAnswered = userAnswer !== undefined
                            const isCorrect = userAnswer === qq.answer
                            return (
                              <div key={qIdx} className="flex flex-col gap-2">
                                <p className="text-[11px] font-medium text-foreground sm:text-xs">
                                  {qIdx + 1}. {qq.question}
                                </p>
                                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                                  {qq.options.map((opt, oIdx) => {
                                    const isSelectedOpt = userAnswer === oIdx
                                    const isCorrectOpt = oIdx === qq.answer
                                    return (
                                      <button
                                        key={oIdx}
                                        onClick={() => !isAnswered && answerNudgeQuiz(nudge.id, qIdx, oIdx)}
                                        disabled={isAnswered}
                                        className={cn(
                                          "flex items-center gap-2 rounded-lg border p-2 text-left transition-all text-[10px] sm:text-xs",
                                          !isAnswered && "border-border bg-card hover:border-primary/50 cursor-pointer",
                                          isAnswered && isCorrectOpt && "border-primary bg-primary/10",
                                          isAnswered && isSelectedOpt && !isCorrectOpt && "border-destructive bg-destructive/10",
                                          isAnswered && !isSelectedOpt && !isCorrectOpt && "border-border bg-card opacity-50"
                                        )}
                                      >
                                        {isAnswered && isCorrectOpt ? <CheckCircle2 className="size-3 shrink-0 text-primary" /> :
                                         isAnswered && isSelectedOpt && !isCorrectOpt ? <XCircle className="size-3 shrink-0 text-destructive" /> :
                                         <span className="flex size-4 shrink-0 items-center justify-center rounded text-[9px] font-bold bg-secondary text-muted-foreground">{String.fromCharCode(65 + oIdx)}</span>
                                        }
                                        <span className={cn(
                                          isAnswered && isCorrectOpt ? "text-primary" : isAnswered && isSelectedOpt && !isCorrectOpt ? "text-destructive" : "text-foreground"
                                        )}>{opt}</span>
                                      </button>
                                    )
                                  })}
                                </div>
                                {isAnswered && (
                                  <div className={cn("rounded-lg border p-2 text-[10px] leading-relaxed sm:text-xs",
                                    isCorrect ? "border-primary/20 bg-primary/5 text-primary" : "border-destructive/20 bg-destructive/5 text-destructive"
                                  )}>
                                    {isCorrect ? "Correct! " : "Incorrect. "}{qq.explanation}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                          {/* Completion summary */}
                          {nudge.quizQuestions!.every((_, i) => answers[i] !== undefined) && (
                            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-center">
                              <p className="text-xs font-semibold text-primary">
                                {answers.filter((a, i) => a === nudge.quizQuestions![i].answer).length}/{nudge.quizQuestions!.length} correct
                              </p>
                              <p className="mt-1 text-[10px] text-muted-foreground">
                                {answers.filter((a, i) => a === nudge.quizQuestions![i].answer).length === nudge.quizQuestions!.length
                                  ? "Perfect score! Great job."
                                  : "Review the explanations above to strengthen your understanding."}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="size-6 shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent sm:size-7" onClick={() => dismiss(nudge.id)}>
                      <X className="size-3 sm:size-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
