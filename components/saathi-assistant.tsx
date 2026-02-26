"use client"

import * as React from "react"
import { MessageCircle, Send, X, Bot, User, ChevronDown, Sparkles, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { saathiFAQs } from "@/lib/data"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const suggestedQuestions = [
  "How does the adaptive quiz engine work?",
  "What are learning paths?",
  "How do streak awards work?",
  "I'm feeling overwhelmed with my studies",
  "How do I improve my rank?",
  "What can my parent see?",
]

function findAnswer(query: string): string {
  const q = query.toLowerCase()
  // Try direct FAQ match first
  for (const faq of saathiFAQs) {
    const faqQ = faq.question.toLowerCase()
    const faqKeywords = faqQ.split(/\s+/).filter((w) => w.length > 3)
    const matchCount = faqKeywords.filter((kw) => q.includes(kw)).length
    if (matchCount >= 2 || q.includes(faqQ.slice(0, 20))) {
      return faq.answer
    }
  }
  // Keyword matching
  if (q.includes("quiz") || q.includes("test") || q.includes("exam")) {
    return saathiFAQs.find((f) => f.id === "f1")!.answer
  }
  if (q.includes("learn") || q.includes("path") || q.includes("module") || q.includes("chapter")) {
    return saathiFAQs.find((f) => f.id === "f2")!.answer
  }
  if (q.includes("weak") || q.includes("detection") || q.includes("struggle")) {
    return saathiFAQs.find((f) => f.id === "f3")!.answer
  }
  if (q.includes("streak") || q.includes("award") || q.includes("badge")) {
    return saathiFAQs.find((f) => f.id === "f4")!.answer
  }
  if (q.includes("leader") || q.includes("rank") || q.includes("score") || q.includes("xp")) {
    return saathiFAQs.find((f) => f.id === "f5")!.answer
  }
  if (q.includes("stuck") || q.includes("help") || q.includes("difficult") || q.includes("hard")) {
    return saathiFAQs.find((f) => f.id === "f6")!.answer
  }
  if (q.includes("optim") || q.includes("time") || q.includes("schedule") || q.includes("when")) {
    return saathiFAQs.find((f) => f.id === "f7")!.answer
  }
  if (q.includes("overwhelm") || q.includes("stress") || q.includes("anxiety") || q.includes("depress") || q.includes("sad") || q.includes("mental")) {
    return saathiFAQs.find((f) => f.id === "f8")!.answer
  }
  if (q.includes("parent") || q.includes("guardian") || q.includes("supervision") || q.includes("monitor")) {
    return saathiFAQs.find((f) => f.id === "f9")!.answer
  }
  if (q.includes("nudge") || q.includes("notification") || q.includes("alert")) {
    return saathiFAQs.find((f) => f.id === "f10")!.answer
  }
  if (q.includes("reset") || q.includes("restart") || q.includes("start over")) {
    return saathiFAQs.find((f) => f.id === "f11")!.answer
  }
  if (q.includes("improve") || q.includes("better") || q.includes("climb") || q.includes("increase")) {
    return saathiFAQs.find((f) => f.id === "f12")!.answer
  }
  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return "Hello! I'm SAATHI, your learning companion. I can help you with questions about quizzes, learning paths, streak awards, study optimization, and more. What would you like to know?"
  }
  if (q.includes("thank") || q.includes("thanks")) {
    return "You're welcome! Keep up the great work with your learning. If you have any more questions, I'm always here to help."
  }
  return "That's a great question! I'm SAATHI, your learning assistant. I can help with topics like:\n\n- How the adaptive quiz engine works\n- Learning paths and modules\n- Weakness detection and improvement\n- Streak awards and badges\n- Study time optimization\n- Leaderboard rankings\n- Parent mode features\n- Mental health support resources\n\nTry asking me about any of these topics!"
}

export function SaathiAssistant() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm SAATHI, your personal learning assistant. I can answer questions about GrowthBuddy features, study tips, and help you navigate the platform. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text.trim(), timestamp: new Date() }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const answer = findAnswer(text)
      const botMsg: Message = { id: `b-${Date.now()}`, role: "assistant", content: answer, timestamp: new Date() }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 600 + Math.random() * 800)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setTimeout(() => inputRef.current?.focus(), 100) }}
        className={cn(
          "fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 sm:bottom-6 sm:right-6",
          isOpen
            ? "size-10 bg-card border border-border text-muted-foreground hover:text-foreground sm:size-12"
            : "size-12 bg-primary text-primary-foreground hover:bg-primary/90 sm:size-14"
        )}
        aria-label={isOpen ? "Close SAATHI" : "Open SAATHI Assistant"}
      >
        {isOpen ? <ChevronDown className="size-5" /> : <MessageCircle className="size-5 sm:size-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 z-50 flex h-[70vh] w-[calc(100vw-2rem)] max-h-[560px] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:bottom-20 sm:right-6">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-primary/5 px-4 py-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary/10">
              <Bot className="size-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-foreground">SAATHI</h3>
              <p className="text-[10px] text-muted-foreground">Your Learning Assistant</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-0 text-[10px]">
              <Sparkles className="mr-1 size-3" /> Online
            </Badge>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4">
            <div className="flex flex-col gap-3">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex gap-2", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                  <div className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full",
                    msg.role === "user" ? "bg-info/10" : "bg-primary/10"
                  )}>
                    {msg.role === "user" ? <User className="size-3.5 text-info" /> : <Bot className="size-3.5 text-primary" />}
                  </div>
                  <div className={cn(
                    "max-w-[85%] rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5",
                    msg.role === "user"
                      ? "rounded-tr-sm bg-info/10 text-foreground"
                      : "rounded-tl-sm bg-secondary text-foreground"
                  )}>
                    <p className="whitespace-pre-line text-xs leading-relaxed sm:text-[13px]">{msg.content}</p>
                    <p className="mt-1 text-[9px] text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="size-3.5 text-primary" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-secondary px-4 py-3">
                    <div className="flex gap-1">
                      <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Suggested Questions (show when few messages) */}
          {messages.length <= 2 && (
            <div className="border-t border-border px-3 py-2 sm:px-4">
              <p className="mb-1.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                <HelpCircle className="size-3" /> Quick questions:
              </p>
              <div className="flex flex-wrap gap-1">
                {suggestedQuestions.slice(0, 4).map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-[10px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {q.length > 30 ? q.slice(0, 30) + "..." : q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border p-3 sm:p-4">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask SAATHI anything..."
              className="h-9 flex-1 border-border bg-secondary/50 text-xs text-foreground placeholder:text-muted-foreground"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isTyping}
              className="size-9 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  )
}
