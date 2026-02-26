"use client"

import * as React from "react"
import {
  Brain,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Zap,
  Target,
  ChevronRight,
  Lightbulb,
  Trophy,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { quizQuestions } from "@/lib/data"

type QuizState = "menu" | "active" | "review" | "results"

interface QuizResult {
  questionId: string
  correct: boolean
  timeTaken: number
  selectedAnswer: number
}

export function QuizEngine() {
  const [quizState, setQuizState] = React.useState<QuizState>("menu")
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null)
  const [showExplanation, setShowExplanation] = React.useState(false)
  const [results, setResults] = React.useState<QuizResult[]>([])
  const [timeLeft, setTimeLeft] = React.useState(0)
  const [selectedSubject, setSelectedSubject] = React.useState<string | null>(null)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)

  const filteredQuestions = selectedSubject
    ? quizQuestions.filter((q) => q.subject === selectedSubject)
    : quizQuestions

  const currentQuestion = filteredQuestions[currentQuestionIndex]

  const startQuiz = (subject: string | null) => {
    setSelectedSubject(subject)
    setQuizState("active")
    setCurrentQuestionIndex(0)
    setResults([])
    setSelectedAnswer(null)
    setShowExplanation(false)
    const questions = subject
      ? quizQuestions.filter((q) => q.subject === subject)
      : quizQuestions
    setTimeLeft(questions[0]?.timeLimit || 60)
  }

  React.useEffect(() => {
    if (quizState === "active" && timeLeft > 0 && selectedAnswer === null) {
      timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    }
    if (timeLeft === 0 && quizState === "active" && selectedAnswer === null) {
      handleAnswer(-1)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [timeLeft, quizState, selectedAnswer])

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    const isCorrect = answerIndex === currentQuestion.correctAnswer
    setResults((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        correct: isCorrect,
        timeTaken: currentQuestion.timeLimit - timeLeft,
        selectedAnswer: answerIndex,
      },
    ])
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setTimeLeft(filteredQuestions[currentQuestionIndex + 1].timeLimit)
    } else {
      setQuizState("results")
    }
  }

  const resetQuiz = () => {
    setQuizState("menu")
    setCurrentQuestionIndex(0)
    setResults([])
    setSelectedAnswer(null)
    setShowExplanation(false)
    setSelectedSubject(null)
  }

  if (quizState === "menu") {
    return <QuizMenu onStart={startQuiz} />
  }

  if (quizState === "results") {
    return (
      <QuizResults
        results={results}
        questions={filteredQuestions}
        onRetry={() => startQuiz(selectedSubject)}
        onBack={resetQuiz}
      />
    )
  }

  const progressPercent =
    ((currentQuestionIndex + 1) / filteredQuestions.length) * 100
  const timePercent = (timeLeft / currentQuestion.timeLimit) * 100

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      {/* Quiz Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <Brain className="size-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Smart Quiz</h2>
              <p className="text-xs text-muted-foreground">
                {selectedSubject || "All Subjects"} - Question{" "}
                {currentQuestionIndex + 1} of {filteredQuestions.length}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "text-sm border-border",
              timeLeft <= 10 ? "border-destructive text-destructive animate-pulse" : "text-muted-foreground"
            )}
          >
            <Clock className="mr-1 size-3.5" />
            {timeLeft}s
          </Badge>
        </div>
        <Progress value={progressPercent} className="h-1.5" />
      </div>

      {/* Timer Bar */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-linear",
            timePercent > 50
              ? "bg-primary"
              : timePercent > 25
              ? "bg-warning"
              : "bg-destructive"
          )}
          style={{ width: `${timePercent}%` }}
        />
      </div>

      {/* Question Card */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px] bg-secondary text-secondary-foreground">
              {currentQuestion.subject}
            </Badge>
            <Badge variant="secondary" className="text-[10px] bg-secondary text-secondary-foreground">
              {currentQuestion.topic}
            </Badge>
            <Badge
              variant="secondary"
              className={cn(
                "text-[10px] border-0",
                currentQuestion.difficulty <= 2
                  ? "bg-primary/10 text-primary"
                  : currentQuestion.difficulty <= 3
                  ? "bg-warning/10 text-warning"
                  : "bg-destructive/10 text-destructive"
              )}
            >
              {"Level "}{currentQuestion.difficulty}
            </Badge>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground leading-relaxed">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="mt-6 flex flex-col gap-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === currentQuestion.correctAnswer
              const isAnswered = selectedAnswer !== null

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200",
                    !isAnswered &&
                      "border-border bg-secondary/30 hover:border-primary/50 hover:bg-primary/5 cursor-pointer",
                    isAnswered && isCorrect && "border-primary bg-primary/10",
                    isAnswered && isSelected && !isCorrect && "border-destructive bg-destructive/10",
                    isAnswered && !isSelected && !isCorrect && "border-border bg-secondary/20 opacity-50"
                  )}
                >
                  <div
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
                      !isAnswered && "bg-secondary text-muted-foreground",
                      isAnswered && isCorrect && "bg-primary text-primary-foreground",
                      isAnswered && isSelected && !isCorrect && "bg-destructive text-destructive-foreground"
                    )}
                  >
                    {isAnswered && isCorrect ? (
                      <CheckCircle2 className="size-4" />
                    ) : isAnswered && isSelected && !isCorrect ? (
                      <XCircle className="size-4" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isAnswered && isCorrect
                        ? "text-primary"
                        : isAnswered && isSelected && !isCorrect
                        ? "text-destructive"
                        : "text-foreground"
                    )}
                  >
                    {option}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Lightbulb className="size-4" />
                Explanation
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      {selectedAnswer !== null && (
        <div className="flex justify-end">
          <Button
            onClick={nextQuestion}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {currentQuestionIndex < filteredQuestions.length - 1
              ? "Next Question"
              : "View Results"}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

function QuizMenu({ onStart }: { onStart: (subject: string | null) => void }) {
  const subjects = [
    { name: "Mathematics", questions: 3, color: "text-primary", bg: "bg-primary/10" },
    { name: "Physics", questions: 3, color: "text-info", bg: "bg-info/10" },
    { name: "Chemistry", questions: 1, color: "text-warning", bg: "bg-warning/10" },
    { name: "Biology", questions: 1, color: "text-success", bg: "bg-success/10" },
    { name: "Computer Science", questions: 2, color: "text-info", bg: "bg-info/10" },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl text-balance">Smart Quiz Engine</h1>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          AI-powered quizzes that adapt to your weaknesses. Questions are selected based on your
          performance data to help you improve fastest.
        </p>
      </div>

      {/* Quick Start */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-center justify-between p-5">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <Zap className="size-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Adaptive Challenge</h3>
              <p className="text-xs text-muted-foreground">
                10 questions across all subjects, targeting your weak spots
              </p>
            </div>
          </div>
          <Button
            onClick={() => onStart(null)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Start <ChevronRight className="ml-1 size-4" />
          </Button>
        </CardContent>
      </Card>

      {/* By Subject */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          By Subject
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <Card
              key={subject.name}
              className="border-border bg-card group cursor-pointer hover:border-primary/30 transition-all duration-300"
              onClick={() => onStart(subject.name)}
            >
              <CardContent className="flex items-center gap-3 p-4">
                <div className={`flex size-10 items-center justify-center rounded-xl ${subject.bg}`}>
                  <Target className={`size-5 ${subject.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground">{subject.name}</h3>
                  <p className="text-xs text-muted-foreground">{subject.questions} questions</p>
                </div>
                <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function QuizResults({
  results,
  questions,
  onRetry,
  onBack,
}: {
  results: QuizResult[]
  questions: typeof quizQuestions
  onRetry: () => void
  onBack: () => void
}) {
  const correct = results.filter((r) => r.correct).length
  const total = results.length
  const percentage = Math.round((correct / total) * 100)
  const avgTime = Math.round(
    results.reduce((sum, r) => sum + r.timeTaken, 0) / total
  )

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      {/* Score Card */}
      <Card className="border-border bg-card overflow-hidden">
        <div
          className={cn(
            "p-8 text-center",
            percentage >= 80
              ? "bg-primary/10"
              : percentage >= 60
              ? "bg-warning/10"
              : "bg-destructive/10"
          )}
        >
          <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full border-4 border-current">
            {percentage >= 80 ? (
              <Trophy className="size-8 text-primary" />
            ) : percentage >= 60 ? (
              <Target className="size-8 text-warning" />
            ) : (
              <Brain className="size-8 text-destructive" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-foreground">{percentage}%</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {correct} of {total} correct
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Average response time: {avgTime}s
          </p>
        </div>
        <CardContent className="p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Question Breakdown
          </h3>
          <div className="flex flex-col gap-3">
            {results.map((result, index) => {
              const question = questions[index]
              return (
                <div
                  key={result.questionId}
                  className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3"
                >
                  <div
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-lg",
                      result.correct
                        ? "bg-primary/10 text-primary"
                        : "bg-destructive/10 text-destructive"
                    )}
                  >
                    {result.correct ? (
                      <CheckCircle2 className="size-4" />
                    ) : (
                      <XCircle className="size-4" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {question.question}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary" className="text-[10px] bg-secondary text-secondary-foreground">
                        {question.topic}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">
                        {result.timeTaken}s
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1 border-border text-foreground hover:bg-accent">
          <RotateCcw className="mr-2 size-4" />
          Back to Menu
        </Button>
        <Button onClick={onRetry} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
          Retry Quiz
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  )
}
