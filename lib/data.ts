// Simulated data store for the adaptive learning platform

export interface Subject {
  id: string
  name: string
  icon: string
  mastery: number
  totalQuestions: number
  correctAnswers: number
  avgTime: number
  difficulty: "beginner" | "intermediate" | "advanced"
  trend: "up" | "down" | "stable"
  weakTopics: string[]
  strongTopics: string[]
}

export interface QuizQuestion {
  id: string
  subject: string
  topic: string
  question: string
  options: string[]
  correctAnswer: number
  difficulty: 1 | 2 | 3 | 4 | 5
  explanation: string
  timeLimit: number
}

export interface LearningPath {
  id: string
  title: string
  subject: string
  progress: number
  totalModules: number
  completedModules: number
  estimatedTime: string
  difficulty: string
  modules: PathModule[]
}

export interface PathModule {
  id: string
  title: string
  type: "lesson" | "quiz" | "practice" | "review"
  status: "completed" | "in-progress" | "locked" | "available"
  duration: string
}

export interface PeerData {
  id: string
  name: string
  avatar: string
  score: number
  streak: number
  rank: number
  mastery: number
  improvement: number
}

export interface Nudge {
  id: string
  type: "warning" | "encouragement" | "milestone" | "reminder" | "challenge"
  title: string
  message: string
  action: string
  priority: "high" | "medium" | "low"
  timestamp: string
  read: boolean
}

export interface StudySession {
  day: string
  hours: number
  efficiency: number
}

export const subjects: Subject[] = [
  {
    id: "math",
    name: "Mathematics",
    icon: "Calculator",
    mastery: 72,
    totalQuestions: 245,
    correctAnswers: 176,
    avgTime: 42,
    difficulty: "intermediate",
    trend: "up",
    weakTopics: ["Integration", "Probability", "Complex Numbers"],
    strongTopics: ["Algebra", "Geometry", "Statistics"],
  },
  {
    id: "physics",
    name: "Physics",
    icon: "Atom",
    mastery: 58,
    totalQuestions: 180,
    correctAnswers: 104,
    avgTime: 55,
    difficulty: "intermediate",
    trend: "down",
    weakTopics: ["Electromagnetism", "Thermodynamics", "Quantum Mechanics"],
    strongTopics: ["Kinematics", "Optics"],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: "FlaskConical",
    mastery: 85,
    totalQuestions: 200,
    correctAnswers: 170,
    avgTime: 38,
    difficulty: "advanced",
    trend: "up",
    weakTopics: ["Organic Reactions"],
    strongTopics: ["Periodic Table", "Chemical Bonding", "Stoichiometry", "Acids & Bases"],
  },
  {
    id: "biology",
    name: "Biology",
    icon: "Dna",
    mastery: 64,
    totalQuestions: 160,
    correctAnswers: 102,
    avgTime: 48,
    difficulty: "beginner",
    trend: "stable",
    weakTopics: ["Genetics", "Ecology", "Cell Division"],
    strongTopics: ["Anatomy", "Taxonomy"],
  },
  {
    id: "cs",
    name: "Computer Science",
    icon: "Code",
    mastery: 91,
    totalQuestions: 300,
    correctAnswers: 273,
    avgTime: 30,
    difficulty: "advanced",
    trend: "up",
    weakTopics: ["Machine Learning"],
    strongTopics: ["Data Structures", "Algorithms", "Databases", "Networking", "OOP"],
  },
]

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    subject: "Mathematics",
    topic: "Integration",
    question: "What is the integral of 2x dx?",
    options: ["x\u00B2 + C", "2x\u00B2 + C", "x + C", "2x + C"],
    correctAnswer: 0,
    difficulty: 2,
    explanation: "The integral of 2x dx = 2 * (x\u00B2/2) + C = x\u00B2 + C by the power rule.",
    timeLimit: 60,
  },
  {
    id: "q2",
    subject: "Mathematics",
    topic: "Probability",
    question: "A fair die is thrown twice. What is the probability of getting a sum of 7?",
    options: ["1/6", "5/36", "1/9", "7/36"],
    correctAnswer: 0,
    difficulty: 3,
    explanation: "There are 6 favorable outcomes: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) out of 36 total = 6/36 = 1/6.",
    timeLimit: 90,
  },
  {
    id: "q3",
    subject: "Physics",
    topic: "Electromagnetism",
    question: "What is the SI unit of magnetic flux?",
    options: ["Weber", "Tesla", "Henry", "Gauss"],
    correctAnswer: 0,
    difficulty: 1,
    explanation: "The SI unit of magnetic flux is the Weber (Wb), which equals one volt-second.",
    timeLimit: 30,
  },
  {
    id: "q4",
    subject: "Physics",
    topic: "Thermodynamics",
    question: "In an isothermal process, which quantity remains constant?",
    options: ["Temperature", "Pressure", "Volume", "Entropy"],
    correctAnswer: 0,
    difficulty: 2,
    explanation: "In an isothermal process, the temperature of the system remains constant throughout.",
    timeLimit: 45,
  },
  {
    id: "q5",
    subject: "Chemistry",
    topic: "Organic Reactions",
    question: "Which reagent is used for the Grignard reaction?",
    options: ["RMgX", "RLi", "NaBH4", "LiAlH4"],
    correctAnswer: 0,
    difficulty: 3,
    explanation: "Grignard reagents are organomagnesium halides (RMgX) used for C-C bond formation.",
    timeLimit: 60,
  },
  {
    id: "q6",
    subject: "Biology",
    topic: "Genetics",
    question: "Which molecule carries genetic information from DNA to ribosomes?",
    options: ["mRNA", "tRNA", "rRNA", "snRNA"],
    correctAnswer: 0,
    difficulty: 2,
    explanation: "Messenger RNA (mRNA) carries the genetic code from DNA to ribosomes for protein synthesis.",
    timeLimit: 45,
  },
  {
    id: "q7",
    subject: "Computer Science",
    topic: "Data Structures",
    question: "What is the time complexity of searching in a balanced BST?",
    options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"],
    correctAnswer: 0,
    difficulty: 2,
    explanation: "A balanced BST halves the search space at each step, resulting in O(log n) complexity.",
    timeLimit: 45,
  },
  {
    id: "q8",
    subject: "Mathematics",
    topic: "Complex Numbers",
    question: "What is the modulus of the complex number 3 + 4i?",
    options: ["5", "7", "25", "1"],
    correctAnswer: 0,
    difficulty: 2,
    explanation: "|3 + 4i| = sqrt(3\u00B2 + 4\u00B2) = sqrt(9 + 16) = sqrt(25) = 5.",
    timeLimit: 45,
  },
  {
    id: "q9",
    subject: "Physics",
    topic: "Quantum Mechanics",
    question: "The Heisenberg Uncertainty Principle states that we cannot simultaneously know:",
    options: ["Position and momentum", "Energy and time only", "Spin and charge", "Mass and velocity"],
    correctAnswer: 0,
    difficulty: 4,
    explanation: "Heisenberg's principle states: \u0394x \u00B7 \u0394p >= \u0127/2, meaning position and momentum cannot be simultaneously measured with arbitrary precision.",
    timeLimit: 60,
  },
  {
    id: "q10",
    subject: "Computer Science",
    topic: "Machine Learning",
    question: "Which of the following is an unsupervised learning algorithm?",
    options: ["K-Means Clustering", "Linear Regression", "Decision Tree", "SVM"],
    correctAnswer: 0,
    difficulty: 3,
    explanation: "K-Means Clustering is an unsupervised algorithm that groups data into K clusters without labeled training data.",
    timeLimit: 60,
  },
]

export const learningPaths: LearningPath[] = [
  {
    id: "lp1",
    title: "Master Integration Techniques",
    subject: "Mathematics",
    progress: 35,
    totalModules: 8,
    completedModules: 3,
    estimatedTime: "4h 30m",
    difficulty: "Intermediate",
    modules: [
      { id: "m1", title: "Basic Integration Rules", type: "lesson", status: "completed", duration: "25m" },
      { id: "m2", title: "Integration by Substitution", type: "lesson", status: "completed", duration: "35m" },
      { id: "m3", title: "Practice: Substitution", type: "practice", status: "completed", duration: "20m" },
      { id: "m4", title: "Integration by Parts", type: "lesson", status: "in-progress", duration: "40m" },
      { id: "m5", title: "Partial Fractions", type: "lesson", status: "available", duration: "35m" },
      { id: "m6", title: "Trigonometric Integrals", type: "lesson", status: "locked", duration: "30m" },
      { id: "m7", title: "Comprehensive Quiz", type: "quiz", status: "locked", duration: "25m" },
      { id: "m8", title: "Final Review", type: "review", status: "locked", duration: "20m" },
    ],
  },
  {
    id: "lp2",
    title: "Electromagnetism Foundations",
    subject: "Physics",
    progress: 12,
    totalModules: 10,
    completedModules: 1,
    estimatedTime: "6h 15m",
    difficulty: "Advanced",
    modules: [
      { id: "m9", title: "Electric Fields", type: "lesson", status: "completed", duration: "30m" },
      { id: "m10", title: "Gauss's Law", type: "lesson", status: "in-progress", duration: "40m" },
      { id: "m11", title: "Electric Potential", type: "lesson", status: "available", duration: "35m" },
      { id: "m12", title: "Practice: E-Fields", type: "practice", status: "locked", duration: "25m" },
      { id: "m13", title: "Magnetic Fields", type: "lesson", status: "locked", duration: "40m" },
      { id: "m14", title: "Ampere's Law", type: "lesson", status: "locked", duration: "35m" },
      { id: "m15", title: "Faraday's Law", type: "lesson", status: "locked", duration: "40m" },
      { id: "m16", title: "Practice: Magnetism", type: "practice", status: "locked", duration: "25m" },
      { id: "m17", title: "Maxwell's Equations", type: "lesson", status: "locked", duration: "45m" },
      { id: "m18", title: "Final Assessment", type: "quiz", status: "locked", duration: "30m" },
    ],
  },
  {
    id: "lp3",
    title: "Genetics Deep Dive",
    subject: "Biology",
    progress: 50,
    totalModules: 6,
    completedModules: 3,
    estimatedTime: "3h 00m",
    difficulty: "Beginner",
    modules: [
      { id: "m19", title: "DNA Structure", type: "lesson", status: "completed", duration: "25m" },
      { id: "m20", title: "Replication", type: "lesson", status: "completed", duration: "30m" },
      { id: "m21", title: "Transcription & Translation", type: "lesson", status: "completed", duration: "35m" },
      { id: "m22", title: "Mendelian Genetics", type: "lesson", status: "in-progress", duration: "30m" },
      { id: "m23", title: "Genetic Mutations", type: "lesson", status: "available", duration: "25m" },
      { id: "m24", title: "Genetics Quiz", type: "quiz", status: "locked", duration: "20m" },
    ],
  },
]

export const peerData: PeerData[] = [
  { id: "p1", name: "Alex Chen", avatar: "AC", score: 9450, streak: 32, rank: 1, mastery: 94, improvement: 12 },
  { id: "p2", name: "Priya Sharma", avatar: "PS", score: 9120, streak: 28, rank: 2, mastery: 91, improvement: 8 },
  { id: "p3", name: "Marcus Johnson", avatar: "MJ", score: 8890, streak: 21, rank: 3, mastery: 89, improvement: 15 },
  { id: "p4", name: "You", avatar: "YU", score: 8650, streak: 18, rank: 4, mastery: 86, improvement: 22 },
  { id: "p5", name: "Sofia Garcia", avatar: "SG", score: 8400, streak: 25, rank: 5, mastery: 84, improvement: 6 },
  { id: "p6", name: "James Wilson", avatar: "JW", score: 8150, streak: 15, rank: 6, mastery: 82, improvement: 10 },
  { id: "p7", name: "Aisha Patel", avatar: "AP", score: 7900, streak: 12, rank: 7, mastery: 79, improvement: 18 },
  { id: "p8", name: "Liam O'Brien", avatar: "LO", score: 7650, streak: 9, rank: 8, mastery: 76, improvement: 5 },
  { id: "p9", name: "Emma Kim", avatar: "EK", score: 7400, streak: 14, rank: 9, mastery: 74, improvement: 11 },
  { id: "p10", name: "David Brown", avatar: "DB", score: 7100, streak: 7, rank: 10, mastery: 71, improvement: 3 },
]

export const nudges: Nudge[] = [
  {
    id: "n1",
    type: "warning",
    title: "Physics Needs Attention",
    message: "Your Physics mastery dropped 5% this week. Electromagnetism is your weakest topic.",
    action: "Start Review",
    priority: "high",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "n2",
    type: "milestone",
    title: "Chemistry Milestone!",
    message: "You've reached 85% mastery in Chemistry. Only 15% more to achieve Expert level!",
    action: "Continue Learning",
    priority: "medium",
    timestamp: "5 hours ago",
    read: false,
  },
  {
    id: "n3",
    type: "reminder",
    title: "Study Session Due",
    message: "You haven't studied Biology in 3 days. Consistent practice helps retention.",
    action: "Start Session",
    priority: "medium",
    timestamp: "1 day ago",
    read: false,
  },
  {
    id: "n4",
    type: "challenge",
    title: "Daily Challenge Available",
    message: "A new cross-subject challenge is ready. Complete it to earn 50 bonus XP!",
    action: "Take Challenge",
    priority: "low",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "n5",
    type: "encouragement",
    title: "Great Streak!",
    message: "18-day learning streak! You're in the top 15% of consistent learners.",
    action: "View Stats",
    priority: "low",
    timestamp: "1 day ago",
    read: true,
  },
]

export const studySessions: StudySession[] = [
  { day: "Mon", hours: 2.5, efficiency: 78 },
  { day: "Tue", hours: 3.0, efficiency: 82 },
  { day: "Wed", hours: 1.5, efficiency: 65 },
  { day: "Thu", hours: 4.0, efficiency: 91 },
  { day: "Fri", hours: 2.0, efficiency: 74 },
  { day: "Sat", hours: 3.5, efficiency: 88 },
  { day: "Sun", hours: 1.0, efficiency: 60 },
]

export const performanceTrend = [
  { week: "W1", math: 62, physics: 48, chemistry: 78, biology: 55, cs: 85 },
  { week: "W2", math: 65, physics: 50, chemistry: 80, biology: 57, cs: 86 },
  { week: "W3", math: 64, physics: 52, chemistry: 79, biology: 58, cs: 88 },
  { week: "W4", math: 68, physics: 51, chemistry: 82, biology: 60, cs: 89 },
  { week: "W5", math: 67, physics: 54, chemistry: 81, biology: 59, cs: 90 },
  { week: "W6", math: 70, physics: 55, chemistry: 83, biology: 62, cs: 90 },
  { week: "W7", math: 69, physics: 56, chemistry: 84, biology: 63, cs: 91 },
  { week: "W8", math: 72, physics: 58, chemistry: 85, biology: 64, cs: 91 },
]
