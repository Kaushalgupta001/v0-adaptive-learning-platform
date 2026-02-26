"use client"

import * as React from "react"
import { User, Mail, Phone, School, Calendar, Camera, Save, Edit3, Shield, Award, Flame, Target, BookOpen, X, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { subjects } from "@/lib/data"

interface ProfilePageProps {
  userName: string
  accountType: "student" | "parent"
}

interface ProfileData {
  displayName: string
  email: string
  phone: string
  school: string
  grade: string
  bio: string
  avatarUrl: string
}

export function ProfilePage({ userName, accountType }: ProfilePageProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [profile, setProfile] = React.useState<ProfileData>({
    displayName: userName,
    email: "student@growthbuddy.com",
    phone: "+1 (555) 123-4567",
    school: "Greenfield Academy",
    grade: "11th Grade",
    bio: "Passionate learner focused on Science & Mathematics. Aspiring engineer with a love for problem-solving.",
    avatarUrl: "",
  })
  const [editProfile, setEditProfile] = React.useState<ProfileData>(profile)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const initials = profile.displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)

  const handleSave = () => {
    setProfile(editProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditProfile(profile)
    setIsEditing(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setEditProfile((prev) => ({ ...prev, avatarUrl: url }))
      if (!isEditing) setProfile((prev) => ({ ...prev, avatarUrl: url }))
    }
  }

  const overallMastery = Math.round(subjects.reduce((s, sub) => s + sub.mastery, 0) / subjects.length)
  const totalQuestions = subjects.reduce((s, sub) => s + sub.totalQuestions, 0)
  const totalCorrect = subjects.reduce((s, sub) => s + sub.correctAnswers, 0)

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl text-balance font-[family-name:var(--font-display)]">
          Profile
        </h1>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed sm:text-sm">
          Manage your account details and view your learning statistics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 md:gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1 border-border bg-card">
          <CardContent className="flex flex-col items-center p-6 text-center">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="size-20 border-2 border-primary/30 sm:size-24">
                {profile.avatarUrl ? (
                  <AvatarImage src={profile.avatarUrl} alt={profile.displayName} className="object-cover" />
                ) : null}
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold sm:text-2xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                aria-label="Upload photo"
              >
                <Camera className="size-3.5" />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>

            <h2 className="mt-4 text-base font-bold text-foreground sm:text-lg">{profile.displayName}</h2>
            <Badge variant="secondary" className="mt-1.5 text-[10px] bg-primary/10 text-primary border-0 sm:text-xs">
              {accountType === "parent" ? "Parent Account" : "Student Account"}
            </Badge>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{profile.bio}</p>

            {/* Quick Stats */}
            <div className="mt-6 grid w-full grid-cols-3 gap-2">
              {[
                { icon: Target, value: `${overallMastery}%`, label: "Mastery", color: "text-primary" },
                { icon: Flame, value: "18", label: "Streak", color: "text-warning" },
                { icon: Award, value: "6", label: "Awards", color: "text-info" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center rounded-lg border border-border bg-secondary/30 p-2.5">
                  <stat.icon className={cn("size-4", stat.color)} />
                  <span className="mt-1 text-sm font-bold text-foreground">{stat.value}</span>
                  <span className="text-[9px] text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <Card className="md:col-span-2 border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between px-4 sm:px-6">
            <CardTitle className="text-sm font-semibold text-card-foreground sm:text-base">Personal Information</CardTitle>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => { setEditProfile(profile); setIsEditing(true) }} className="border-border text-foreground hover:bg-accent">
                <Edit3 className="mr-1.5 size-3.5" /> Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel} className="border-border text-muted-foreground hover:bg-accent">
                  <X className="mr-1 size-3.5" /> Cancel
                </Button>
                <Button size="sm" onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Check className="mr-1 size-3.5" /> Save
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="flex flex-col gap-4">
              {[
                { icon: User, label: "Full Name", key: "displayName" as const, type: "text" },
                { icon: Mail, label: "Email", key: "email" as const, type: "email" },
                { icon: Phone, label: "Phone", key: "phone" as const, type: "tel" },
                { icon: School, label: "School", key: "school" as const, type: "text" },
                { icon: Calendar, label: "Grade", key: "grade" as const, type: "text" },
              ].map((field) => (
                <div key={field.key} className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex items-center gap-2 sm:w-32">
                    <field.icon className="size-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground sm:text-sm">{field.label}</span>
                  </div>
                  {isEditing ? (
                    <Input
                      type={field.type}
                      value={editProfile[field.key]}
                      onChange={(e) => setEditProfile((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      className="h-9 flex-1 border-border bg-secondary/50 text-sm text-foreground"
                    />
                  ) : (
                    <span className="text-sm text-foreground">{profile[field.key]}</span>
                  )}
                </div>
              ))}

              {/* Bio */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <BookOpen className="size-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground sm:text-sm">Bio</span>
                </div>
                {isEditing ? (
                  <textarea
                    value={editProfile.bio}
                    onChange={(e) => setEditProfile((prev) => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    className="rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                ) : (
                  <p className="text-sm text-foreground leading-relaxed">{profile.bio}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Performance */}
      <Card className="border-border bg-card">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-card-foreground sm:text-base">
            <Target className="size-4 text-primary" /> Subject Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((sub) => (
              <div key={sub.id} className="rounded-lg border border-border bg-secondary/20 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground sm:text-sm">{sub.name}</span>
                  <Badge variant="secondary" className={cn(
                    "text-[10px] border-0",
                    sub.mastery >= 80 ? "bg-primary/10 text-primary" : sub.mastery >= 60 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                  )}>
                    {sub.mastery}%
                  </Badge>
                </div>
                <Progress value={sub.mastery} className="mt-2 h-1.5" />
                <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{sub.correctAnswers}/{sub.totalQuestions} correct</span>
                  <span>Avg: {sub.avgTime}s</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
        {[
          { label: "Total Questions", value: totalQuestions.toLocaleString(), color: "text-primary" },
          { label: "Correct Answers", value: totalCorrect.toLocaleString(), color: "text-info" },
          { label: "Accuracy", value: `${Math.round((totalCorrect / totalQuestions) * 100)}%`, color: "text-warning" },
          { label: "Account Type", value: accountType === "parent" ? "Parent" : "Student", color: "text-foreground" },
        ].map((stat) => (
          <Card key={stat.label} className="border-border bg-card">
            <CardContent className="flex flex-col items-center p-4 text-center">
              <span className={cn("text-xl font-bold sm:text-2xl", stat.color)}>{stat.value}</span>
              <span className="mt-1 text-[10px] text-muted-foreground sm:text-xs">{stat.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
