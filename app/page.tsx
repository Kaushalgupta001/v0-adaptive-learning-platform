"use client"

import * as React from "react"
import { AppShell } from "@/components/app-shell"
import { Dashboard } from "@/components/dashboard"
import { QuizEngine } from "@/components/quiz-engine"
import { LearningPaths } from "@/components/learning-paths"
import { PeerAnalytics } from "@/components/peer-analytics"
import { SmartNudges } from "@/components/smart-nudges"
import { StudyOptimizer } from "@/components/study-optimizer"

export default function Page() {
  const [activeTab, setActiveTab] = React.useState("dashboard")
  const [unreadNudges, setUnreadNudges] = React.useState(3)

  const handleMarkRead = () => {
    setUnreadNudges((prev) => Math.max(0, prev - 1))
  }

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab} unreadNudges={unreadNudges}>
      {activeTab === "dashboard" && <Dashboard onNavigate={setActiveTab} />}
      {activeTab === "quiz" && <QuizEngine />}
      {activeTab === "paths" && <LearningPaths />}
      {activeTab === "analytics" && <PeerAnalytics />}
      {activeTab === "nudges" && <SmartNudges onMarkRead={handleMarkRead} />}
      {activeTab === "optimizer" && <StudyOptimizer />}
    </AppShell>
  )
}
