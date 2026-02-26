"use client"

import * as React from "react"
import { AuthPage } from "@/components/auth-page"
import { AppShell } from "@/components/app-shell"
import { Dashboard } from "@/components/dashboard"
import { QuizEngine } from "@/components/quiz-engine"
import { LearningPaths } from "@/components/learning-paths"
import { PeerAnalytics } from "@/components/peer-analytics"
import { SmartNudges } from "@/components/smart-nudges"
import { StudyOptimizer } from "@/components/study-optimizer"
import { StreakAwards } from "@/components/streak-awards"

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [userName, setUserName] = React.useState("")
  const [accountType, setAccountType] = React.useState<"student" | "parent">("student")
  const [activeTab, setActiveTab] = React.useState("dashboard")
  const [unreadNudges, setUnreadNudges] = React.useState(3)

  const handleLogin = (name: string, type: "student" | "parent") => {
    setUserName(name)
    setAccountType(type)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserName("")
    setAccountType("student")
    setActiveTab("dashboard")
    setUnreadNudges(3)
  }

  const handleMarkRead = () => {
    setUnreadNudges((prev) => Math.max(0, prev - 1))
  }

  if (!isLoggedIn) {
    return <AuthPage onLogin={handleLogin} />
  }

  return (
    <AppShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      unreadNudges={unreadNudges}
      userName={userName}
      accountType={accountType}
      streak={18}
      onLogout={handleLogout}
    >
      {activeTab === "dashboard" && (
        <Dashboard onNavigate={setActiveTab} userName={userName} accountType={accountType} />
      )}
      {activeTab === "quiz" && <QuizEngine />}
      {activeTab === "paths" && <LearningPaths />}
      {activeTab === "analytics" && <PeerAnalytics />}
      {activeTab === "streaks" && <StreakAwards />}
      {activeTab === "nudges" && <SmartNudges onMarkRead={handleMarkRead} />}
      {activeTab === "optimizer" && <StudyOptimizer />}
    </AppShell>
  )
}
