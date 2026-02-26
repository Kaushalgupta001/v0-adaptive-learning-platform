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

export interface ModuleContent {
  summary: string
  keyPoints: string[]
  example?: { title: string; content: string }
  miniQuiz?: { question: string; options: string[]; answer: number }
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
  content?: ModuleContent
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
  subject?: string
  actionType?: "quiz" | "lesson" | "review" | "link"
  quizQuestions?: { question: string; options: string[]; answer: number; explanation: string }[]
}

export interface StudySession {
  day: string
  hours: number
  efficiency: number
}

export interface StudyModule {
  id: string
  title: string
  subject: string
  type: "focus" | "review" | "practice" | "break"
  duration: number
  completed: boolean
  description: string
  tasks: { label: string; done: boolean }[]
}

export interface SaathiFAQ {
  id: string
  question: string
  answer: string
  category: "general" | "quiz" | "learning" | "technical" | "motivation" | "parent"
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
  // Mathematics (6 questions)
  { id: "q1", subject: "Mathematics", topic: "Integration", question: "What is the integral of 2x dx?", options: ["x\u00B2 + C", "2x\u00B2 + C", "x + C", "2x + C"], correctAnswer: 0, difficulty: 2, explanation: "The integral of 2x dx = 2 * (x\u00B2/2) + C = x\u00B2 + C by the power rule.", timeLimit: 60 },
  { id: "q2", subject: "Mathematics", topic: "Probability", question: "A fair die is thrown twice. What is the probability of getting a sum of 7?", options: ["1/6", "5/36", "1/9", "7/36"], correctAnswer: 0, difficulty: 3, explanation: "There are 6 favorable outcomes: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) out of 36 total = 6/36 = 1/6.", timeLimit: 90 },
  { id: "q8", subject: "Mathematics", topic: "Complex Numbers", question: "What is the modulus of the complex number 3 + 4i?", options: ["5", "7", "25", "1"], correctAnswer: 0, difficulty: 2, explanation: "|3 + 4i| = sqrt(3\u00B2 + 4\u00B2) = sqrt(9 + 16) = sqrt(25) = 5.", timeLimit: 45 },
  { id: "q11", subject: "Mathematics", topic: "Algebra", question: "What is the solution set of |2x - 3| = 5?", options: ["{-1, 4}", "{1, 4}", "{-1, -4}", "{1, -4}"], correctAnswer: 0, difficulty: 2, explanation: "2x - 3 = 5 gives x = 4; 2x - 3 = -5 gives x = -1. So the solution set is {-1, 4}.", timeLimit: 60 },
  { id: "q12", subject: "Mathematics", topic: "Geometry", question: "What is the area of a triangle with sides 3, 4, and 5?", options: ["6", "10", "7.5", "12"], correctAnswer: 0, difficulty: 1, explanation: "This is a right triangle (3-4-5). Area = (1/2) * base * height = (1/2) * 3 * 4 = 6.", timeLimit: 45 },
  { id: "q13", subject: "Mathematics", topic: "Statistics", question: "What is the standard deviation of the dataset {2, 4, 4, 4, 5, 5, 7, 9}?", options: ["2", "3", "4", "1.5"], correctAnswer: 0, difficulty: 3, explanation: "Mean = 5, variance = [(9+1+1+1+0+0+4+16)/8] = 4, so SD = sqrt(4) = 2.", timeLimit: 90 },
  // Physics (5 questions)
  { id: "q3", subject: "Physics", topic: "Electromagnetism", question: "What is the SI unit of magnetic flux?", options: ["Weber", "Tesla", "Henry", "Gauss"], correctAnswer: 0, difficulty: 1, explanation: "The SI unit of magnetic flux is the Weber (Wb), which equals one volt-second.", timeLimit: 30 },
  { id: "q4", subject: "Physics", topic: "Thermodynamics", question: "In an isothermal process, which quantity remains constant?", options: ["Temperature", "Pressure", "Volume", "Entropy"], correctAnswer: 0, difficulty: 2, explanation: "In an isothermal process, the temperature of the system remains constant throughout.", timeLimit: 45 },
  { id: "q9", subject: "Physics", topic: "Quantum Mechanics", question: "The Heisenberg Uncertainty Principle states that we cannot simultaneously know:", options: ["Position and momentum", "Energy and time only", "Spin and charge", "Mass and velocity"], correctAnswer: 0, difficulty: 4, explanation: "Heisenberg's principle states position and momentum cannot be simultaneously measured with arbitrary precision.", timeLimit: 60 },
  { id: "q14", subject: "Physics", topic: "Kinematics", question: "A ball is thrown upward with velocity 20 m/s. What is the maximum height? (g=10 m/s\u00B2)", options: ["20 m", "10 m", "40 m", "15 m"], correctAnswer: 0, difficulty: 2, explanation: "Using v\u00B2 = u\u00B2 - 2gh, at max height v=0: h = u\u00B2/(2g) = 400/20 = 20 m.", timeLimit: 60 },
  { id: "q15", subject: "Physics", topic: "Optics", question: "What is the critical angle for total internal reflection when refractive index is sqrt(2)?", options: ["45\u00B0", "30\u00B0", "60\u00B0", "90\u00B0"], correctAnswer: 0, difficulty: 3, explanation: "sin(c) = 1/n = 1/sqrt(2), so c = 45\u00B0.", timeLimit: 60 },
  // Chemistry (4 questions)
  { id: "q5", subject: "Chemistry", topic: "Organic Reactions", question: "Which reagent is used for the Grignard reaction?", options: ["RMgX", "RLi", "NaBH4", "LiAlH4"], correctAnswer: 0, difficulty: 3, explanation: "Grignard reagents are organomagnesium halides (RMgX) used for C-C bond formation.", timeLimit: 60 },
  { id: "q16", subject: "Chemistry", topic: "Chemical Bonding", question: "How many lone pairs does water (H2O) have on oxygen?", options: ["2", "1", "3", "0"], correctAnswer: 0, difficulty: 1, explanation: "Oxygen in water has 2 lone pairs and 2 bonding pairs, giving a bent molecular geometry.", timeLimit: 30 },
  { id: "q17", subject: "Chemistry", topic: "Stoichiometry", question: "How many moles of O2 are needed to completely combust 1 mole of CH4?", options: ["2", "1", "3", "4"], correctAnswer: 0, difficulty: 2, explanation: "CH4 + 2O2 -> CO2 + 2H2O. So 2 moles of O2 are needed per mole of CH4.", timeLimit: 45 },
  { id: "q18", subject: "Chemistry", topic: "Periodic Table", question: "Which element has the highest electronegativity?", options: ["Fluorine", "Oxygen", "Chlorine", "Nitrogen"], correctAnswer: 0, difficulty: 1, explanation: "Fluorine has the highest electronegativity (3.98) on the Pauling scale.", timeLimit: 30 },
  // Biology (4 questions)
  { id: "q6", subject: "Biology", topic: "Genetics", question: "Which molecule carries genetic information from DNA to ribosomes?", options: ["mRNA", "tRNA", "rRNA", "snRNA"], correctAnswer: 0, difficulty: 2, explanation: "Messenger RNA (mRNA) carries the genetic code from DNA to ribosomes for protein synthesis.", timeLimit: 45 },
  { id: "q19", subject: "Biology", topic: "Ecology", question: "What is the primary producer in most food chains?", options: ["Plants", "Herbivores", "Fungi", "Bacteria"], correctAnswer: 0, difficulty: 1, explanation: "Plants are primary producers that convert sunlight into energy through photosynthesis.", timeLimit: 30 },
  { id: "q20", subject: "Biology", topic: "Cell Division", question: "In which phase of mitosis do chromosomes line up at the cell equator?", options: ["Metaphase", "Prophase", "Anaphase", "Telophase"], correctAnswer: 0, difficulty: 2, explanation: "During metaphase, chromosomes align at the metaphase plate (cell equator) before separation.", timeLimit: 45 },
  { id: "q21", subject: "Biology", topic: "Anatomy", question: "Which organ is responsible for filtering blood and producing urine?", options: ["Kidney", "Liver", "Spleen", "Pancreas"], correctAnswer: 0, difficulty: 1, explanation: "The kidneys filter blood to remove waste products and excess fluid, producing urine.", timeLimit: 30 },
  // Computer Science (4 questions)
  { id: "q7", subject: "Computer Science", topic: "Data Structures", question: "What is the time complexity of searching in a balanced BST?", options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"], correctAnswer: 0, difficulty: 2, explanation: "A balanced BST halves the search space at each step, resulting in O(log n) complexity.", timeLimit: 45 },
  { id: "q10", subject: "Computer Science", topic: "Machine Learning", question: "Which of the following is an unsupervised learning algorithm?", options: ["K-Means Clustering", "Linear Regression", "Decision Tree", "SVM"], correctAnswer: 0, difficulty: 3, explanation: "K-Means Clustering groups data into K clusters without labeled training data.", timeLimit: 60 },
  { id: "q22", subject: "Computer Science", topic: "Algorithms", question: "What is the worst-case time complexity of QuickSort?", options: ["O(n\u00B2)", "O(n log n)", "O(n)", "O(log n)"], correctAnswer: 0, difficulty: 2, explanation: "QuickSort has O(n\u00B2) worst case when the pivot is always the smallest/largest element.", timeLimit: 45 },
  { id: "q23", subject: "Computer Science", topic: "Databases", question: "Which SQL keyword is used to remove duplicate rows from a result set?", options: ["DISTINCT", "UNIQUE", "DIFFERENT", "REMOVE"], correctAnswer: 0, difficulty: 1, explanation: "SELECT DISTINCT removes duplicate rows from the query result set.", timeLimit: 30 },
]

// Module content for learning paths
export const moduleContents: Record<string, ModuleContent> = {
  m1: {
    summary: "Integration is the reverse process of differentiation. The basic rules include the power rule, constant rule, and sum rule.",
    keyPoints: [
      "Power Rule: integral of x^n = x^(n+1)/(n+1) + C",
      "Constant Rule: integral of k dx = kx + C",
      "Sum Rule: integral of [f(x) + g(x)] = integral of f(x) + integral of g(x)",
    ],
    example: { title: "Example: Power Rule", content: "Find integral of 3x^2 dx\nSolution: 3 * x^3/3 + C = x^3 + C" },
    miniQuiz: { question: "What is the integral of 5x^4 dx?", options: ["x^5 + C", "5x^5 + C", "20x^3 + C", "x^4 + C"], answer: 0 },
  },
  m2: {
    summary: "Integration by substitution (u-substitution) simplifies integrals by replacing complex expressions with a single variable u.",
    keyPoints: [
      "Choose u as the inner function of a composition",
      "Compute du/dx and solve for dx",
      "Replace all x terms with u terms and integrate",
      "Substitute back to get the answer in terms of x",
    ],
    example: { title: "Example: U-Substitution", content: "Find integral of 2x * cos(x^2) dx\nLet u = x^2, du = 2x dx\nIntegral becomes cos(u) du = sin(u) + C = sin(x^2) + C" },
    miniQuiz: { question: "For integral of 3x^2 * e^(x^3) dx, what should u be?", options: ["x^3", "3x^2", "e^(x^3)", "x^2"], answer: 0 },
  },
  m3: {
    summary: "Practice applying u-substitution to various integral problems. Focus on identifying the right substitution quickly.",
    keyPoints: [
      "Look for a function and its derivative in the integrand",
      "Trigonometric substitutions follow specific patterns",
      "Always check your answer by differentiating",
    ],
    example: { title: "Practice Problem", content: "Evaluate integral of sin(3x) dx\nLet u = 3x, du = 3dx, dx = du/3\n= (1/3) integral sin(u) du = -(1/3)cos(3x) + C" },
    miniQuiz: { question: "What is the integral of cos(5x) dx?", options: ["sin(5x)/5 + C", "sin(5x) + C", "5sin(5x) + C", "-sin(5x)/5 + C"], answer: 0 },
  },
  m4: {
    summary: "Integration by parts is used when the integrand is a product of two functions. It follows the formula: integral of u dv = uv - integral of v du.",
    keyPoints: [
      "Use the LIATE rule to choose u (Log, Inverse trig, Algebraic, Trig, Exponential)",
      "Formula: integral of u dv = uv - integral of v du",
      "Sometimes you need to apply integration by parts more than once",
    ],
    example: { title: "Example: Integration by Parts", content: "Find integral of x * e^x dx\nLet u = x, dv = e^x dx\nThen du = dx, v = e^x\n= x*e^x - integral of e^x dx = x*e^x - e^x + C = e^x(x-1) + C" },
    miniQuiz: { question: "In integration by parts of integral(x*sin(x)dx), what should u be?", options: ["x", "sin(x)", "x*sin(x)", "cos(x)"], answer: 0 },
  },
  m5: {
    summary: "Partial fractions decompose a complex rational function into simpler fractions that are easier to integrate.",
    keyPoints: [
      "Factor the denominator completely",
      "Write one fraction for each factor",
      "Solve for the constants by substitution or equating coefficients",
      "Integrate each simple fraction separately",
    ],
    example: { title: "Example: Partial Fractions", content: "Integrate 1/((x-1)(x+1)) dx\n= 1/2 * [1/(x-1) - 1/(x+1)] dx\n= (1/2)ln|x-1| - (1/2)ln|x+1| + C" },
    miniQuiz: { question: "How do you decompose 3/(x(x+1))?", options: ["3/x - 3/(x+1)", "1/x + 2/(x+1)", "3/(x+1) - 3/x", "1.5/x + 1.5/(x+1)"], answer: 0 },
  },
  m9: {
    summary: "Electric fields are regions around charged objects where other charges experience a force. The field points away from positive charges and toward negative charges.",
    keyPoints: [
      "Coulomb's Law: F = kQ1Q2/r^2",
      "Electric Field: E = F/q = kQ/r^2",
      "Field lines go from positive to negative charges",
      "Superposition: Total field = vector sum of individual fields",
    ],
    example: { title: "Example: Electric Field", content: "Find the electric field 0.5m from a 2 micro-C charge.\nE = kQ/r^2 = (9*10^9)(2*10^-6)/(0.5)^2 = 72,000 N/C" },
    miniQuiz: { question: "If the distance from a charge doubles, the electric field becomes:", options: ["1/4 of original", "1/2 of original", "2x original", "Same"], answer: 0 },
  },
  m10: {
    summary: "Gauss's Law relates the electric flux through a closed surface to the charge enclosed within it.",
    keyPoints: [
      "Electric Flux: Phi = E * A * cos(theta)",
      "Gauss's Law: Phi = Q_enclosed / epsilon_0",
      "Choose Gaussian surfaces that match the symmetry",
      "Works best for spherical, cylindrical, and planar symmetry",
    ],
    example: { title: "Example: Gauss's Law", content: "Find E outside a sphere of charge Q.\nGaussian surface: sphere of radius r\nE * 4*pi*r^2 = Q/epsilon_0\nE = Q/(4*pi*epsilon_0*r^2) = kQ/r^2" },
    miniQuiz: { question: "What Gaussian surface would you use for an infinite line charge?", options: ["Cylinder", "Sphere", "Cube", "Cone"], answer: 0 },
  },
  m19: {
    summary: "DNA (Deoxyribonucleic Acid) is a double-stranded helix that stores genetic information in all living organisms.",
    keyPoints: [
      "DNA is made of nucleotides: sugar + phosphate + base",
      "Four bases: Adenine(A), Thymine(T), Guanine(G), Cytosine(C)",
      "A pairs with T (2 hydrogen bonds), G pairs with C (3 hydrogen bonds)",
      "The two strands run antiparallel (5' to 3' and 3' to 5')",
    ],
    example: { title: "Example: Base Pairing", content: "If one DNA strand reads 5'-ATCGGA-3'\nThe complementary strand is 3'-TAGCCT-5'\n(A pairs with T, C pairs with G)" },
    miniQuiz: { question: "If a DNA sample has 30% Adenine, what percent is Cytosine?", options: ["20%", "30%", "25%", "40%"], answer: 0 },
  },
  m20: {
    summary: "DNA replication is the process by which DNA makes an identical copy of itself during cell division.",
    keyPoints: [
      "Replication is semi-conservative: each new molecule has one old and one new strand",
      "Helicase unwinds the double helix",
      "DNA polymerase adds nucleotides in the 5' to 3' direction",
      "Leading strand is continuous, lagging strand has Okazaki fragments",
    ],
    example: { title: "Example: Replication Fork", content: "At the replication fork:\n1. Helicase unzips DNA\n2. Primase adds RNA primer\n3. DNA Pol III extends the primer\n4. DNA Pol I replaces primer with DNA\n5. Ligase seals gaps" },
    miniQuiz: { question: "Which enzyme joins Okazaki fragments?", options: ["DNA Ligase", "Helicase", "DNA Polymerase", "Primase"], answer: 0 },
  },
  m21: {
    summary: "Transcription converts DNA to mRNA, and translation converts mRNA to protein at the ribosome.",
    keyPoints: [
      "Transcription: DNA -> mRNA (in nucleus)",
      "RNA Polymerase reads the template strand 3' to 5'",
      "mRNA is processed: 5' cap, 3' poly-A tail, intron splicing",
      "Translation: mRNA -> Protein (at ribosome)",
      "Codons (3 bases) specify amino acids",
    ],
    example: { title: "Example: Codon to Amino Acid", content: "DNA template: 3'-TAC-GCA-AAT-5'\nmRNA: 5'-AUG-CGU-UUA-3'\nAmino acids: Met-Arg-Leu\n(AUG = start codon = Methionine)" },
    miniQuiz: { question: "What is the start codon in mRNA?", options: ["AUG", "UAG", "UGA", "UAA"], answer: 0 },
  },
  m22: {
    summary: "Mendelian genetics explains inheritance patterns using dominant and recessive alleles.",
    keyPoints: [
      "Law of Segregation: alleles separate during gamete formation",
      "Law of Independent Assortment: genes on different chromosomes sort independently",
      "Dominant allele masks recessive allele",
      "Punnett squares predict offspring ratios",
    ],
    example: { title: "Example: Monohybrid Cross", content: "Cross Aa x Aa:\n    A    a\nA | AA | Aa |\na | Aa | aa |\nPhenotype ratio: 3 dominant : 1 recessive\nGenotype ratio: 1 AA : 2 Aa : 1 aa" },
    miniQuiz: { question: "In Aa x Aa cross, what fraction of offspring are homozygous dominant?", options: ["1/4", "1/2", "3/4", "1/3"], answer: 0 },
  },
}

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
      { id: "m1", title: "Basic Integration Rules", type: "lesson", status: "completed", duration: "25m", content: undefined },
      { id: "m2", title: "Integration by Substitution", type: "lesson", status: "completed", duration: "35m", content: undefined },
      { id: "m3", title: "Practice: Substitution", type: "practice", status: "completed", duration: "20m", content: undefined },
      { id: "m4", title: "Integration by Parts", type: "lesson", status: "in-progress", duration: "40m", content: undefined },
      { id: "m5", title: "Partial Fractions", type: "lesson", status: "available", duration: "35m", content: undefined },
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
      { id: "m9", title: "Electric Fields", type: "lesson", status: "completed", duration: "30m", content: undefined },
      { id: "m10", title: "Gauss's Law", type: "lesson", status: "in-progress", duration: "40m", content: undefined },
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
      { id: "m19", title: "DNA Structure", type: "lesson", status: "completed", duration: "25m", content: undefined },
      { id: "m20", title: "Replication", type: "lesson", status: "completed", duration: "30m", content: undefined },
      { id: "m21", title: "Transcription & Translation", type: "lesson", status: "completed", duration: "35m", content: undefined },
      { id: "m22", title: "Mendelian Genetics", type: "lesson", status: "in-progress", duration: "30m", content: undefined },
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
    id: "n1", type: "warning", title: "Physics Needs Attention", message: "Your Physics mastery dropped 5% this week. Electromagnetism is your weakest topic. Take a quick 5-question review to get back on track.", action: "Start Review", priority: "high", timestamp: "2 hours ago", read: false, subject: "Physics", actionType: "quiz",
    quizQuestions: [
      { question: "What is the SI unit of electric field strength?", options: ["N/C", "C/m", "V/A", "J/C"], answer: 0, explanation: "Electric field strength is measured in Newtons per Coulomb (N/C)." },
      { question: "What is Faraday's Law about?", options: ["Electromagnetic induction", "Electrostatics", "Magnetostatics", "Ohm's Law"], answer: 0, explanation: "Faraday's Law describes how a changing magnetic field induces an electric field." },
      { question: "The magnetic force on a stationary charge is:", options: ["Zero", "Maximum", "Depends on field", "Infinite"], answer: 0, explanation: "Magnetic force F = qvBsin(theta). If v=0, the force is zero." },
    ],
  },
  {
    id: "n2", type: "milestone", title: "Chemistry Milestone!", message: "You've reached 85% mastery in Chemistry. Complete 3 more practice problems to reach Expert level!", action: "Practice Now", priority: "medium", timestamp: "5 hours ago", read: false, subject: "Chemistry", actionType: "quiz",
    quizQuestions: [
      { question: "What type of bond forms between Na and Cl?", options: ["Ionic", "Covalent", "Metallic", "Hydrogen"], answer: 0, explanation: "Na donates an electron to Cl, forming an ionic bond." },
      { question: "What is the pH of a neutral solution at 25C?", options: ["7", "0", "14", "1"], answer: 0, explanation: "At 25C, water's autoionization gives [H+] = 10^-7, so pH = 7." },
      { question: "Which gas is produced when an acid reacts with a carbonate?", options: ["CO2", "O2", "H2", "N2"], answer: 0, explanation: "Acid + Carbonate -> Salt + Water + Carbon Dioxide (CO2)." },
    ],
  },
  {
    id: "n3", type: "reminder", title: "Biology Study Session Due", message: "You haven't studied Biology in 3 days. Consistent daily practice improves long-term retention by 40%. Start with Genetics review.", action: "Start Session", priority: "medium", timestamp: "1 day ago", read: false, subject: "Biology", actionType: "lesson",
    quizQuestions: [
      { question: "What are the base pairs in DNA?", options: ["A-T, G-C", "A-G, T-C", "A-C, G-T", "A-U, G-C"], answer: 0, explanation: "In DNA, Adenine pairs with Thymine, and Guanine pairs with Cytosine." },
      { question: "What is the function of mitochondria?", options: ["Energy production (ATP)", "Protein synthesis", "Cell division", "Storage"], answer: 0, explanation: "Mitochondria are the powerhouse of the cell, producing ATP through cellular respiration." },
    ],
  },
  {
    id: "n4", type: "challenge", title: "Daily Math Challenge", message: "Solve this integration challenge: Find the integral of x*ln(x) dx. Complete within 3 minutes for 50 bonus XP!", action: "Take Challenge", priority: "low", timestamp: "3 hours ago", read: true, subject: "Mathematics", actionType: "quiz",
    quizQuestions: [
      { question: "What is the integral of x*ln(x) dx?", options: ["(x^2/2)ln(x) - x^2/4 + C", "x^2*ln(x) + C", "(x^2)ln(x)/2 + C", "x*ln(x) - x + C"], answer: 0, explanation: "Using integration by parts: u=ln(x), dv=xdx. Result: (x^2/2)ln(x) - x^2/4 + C." },
      { question: "What is d/dx [x^2 * e^x]?", options: ["e^x(x^2 + 2x)", "2x*e^x", "x^2*e^x", "e^x(2x)"], answer: 0, explanation: "Product rule: d/dx[x^2*e^x] = 2x*e^x + x^2*e^x = e^x(x^2+2x)." },
    ],
  },
  {
    id: "n5", type: "encouragement", title: "Great Streak!", message: "18-day learning streak! You're in the top 15% of consistent learners. Your dedication is paying off with a 22% improvement this month.", action: "View Stats", priority: "low", timestamp: "1 day ago", read: true, subject: undefined, actionType: "link",
  },
  {
    id: "n6", type: "warning", title: "CS: Machine Learning Gap", message: "Your ML topic score is 45% below your CS average. Focus on supervised vs unsupervised learning concepts.", action: "Study ML Basics", priority: "high", timestamp: "4 hours ago", read: false, subject: "Computer Science", actionType: "quiz",
    quizQuestions: [
      { question: "What is the difference between supervised and unsupervised learning?", options: ["Labeled vs unlabeled data", "Fast vs slow", "Simple vs complex", "Online vs offline"], answer: 0, explanation: "Supervised learning uses labeled training data; unsupervised learning finds patterns in unlabeled data." },
      { question: "Which is a classification algorithm?", options: ["Random Forest", "K-Means", "PCA", "DBSCAN"], answer: 0, explanation: "Random Forest is a supervised classification/regression algorithm using ensemble of decision trees." },
      { question: "What does overfitting mean?", options: ["Model memorizes training data", "Model is too simple", "Model trains too fast", "Model has too few features"], answer: 0, explanation: "Overfitting means the model performs well on training data but poorly on unseen data." },
    ],
  },
  {
    id: "n7", type: "challenge", title: "Cross-Subject Speed Round", message: "Answer 5 questions from different subjects in under 5 minutes. Top performers earn a special badge!", action: "Begin Speed Round", priority: "medium", timestamp: "6 hours ago", read: true, subject: undefined, actionType: "quiz",
    quizQuestions: [
      { question: "What is 15% of 200?", options: ["30", "25", "35", "20"], answer: 0, explanation: "15% of 200 = 0.15 * 200 = 30." },
      { question: "What is Newton's second law?", options: ["F = ma", "E = mc^2", "V = IR", "PV = nRT"], answer: 0, explanation: "Newton's second law states that Force equals mass times acceleration." },
      { question: "What is H2O commonly known as?", options: ["Water", "Hydrogen Peroxide", "Heavy Water", "Ozone"], answer: 0, explanation: "H2O is the chemical formula for water." },
      { question: "What is the powerhouse of the cell?", options: ["Mitochondria", "Nucleus", "Ribosome", "Golgi"], answer: 0, explanation: "Mitochondria produce ATP, the energy currency of the cell." },
      { question: "What does HTML stand for?", options: ["HyperText Markup Language", "High Tech Machine Learning", "Hyper Transfer ML", "Home Tool Markup Language"], answer: 0, explanation: "HTML stands for HyperText Markup Language, used for web pages." },
    ],
  },
  {
    id: "n8", type: "reminder", title: "Weekly Goal: 3h Remaining", message: "You've studied 14.5h this week. Just 3 more hours to hit your 17.5h weekly target. You can do it!", action: "Plan Session", priority: "low", timestamp: "8 hours ago", read: true, subject: undefined, actionType: "link",
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

export const studyModules: StudyModule[] = [
  {
    id: "sm1", title: "Physics: Electromagnetism Review", subject: "Physics", type: "focus", duration: 30, completed: false,
    description: "Deep review of electromagnetism concepts focusing on your weakest areas.",
    tasks: [
      { label: "Review Electric Field formulas", done: false },
      { label: "Solve 3 Gauss's Law problems", done: false },
      { label: "Watch explanation video on Faraday's Law", done: false },
      { label: "Complete mini-quiz (5 questions)", done: false },
    ],
  },
  {
    id: "sm2", title: "Mathematics: Integration Practice", subject: "Mathematics", type: "practice", duration: 25, completed: false,
    description: "Hands-on practice with integration by parts and partial fractions.",
    tasks: [
      { label: "Solve 5 integration by parts problems", done: false },
      { label: "Work through 3 partial fraction examples", done: false },
      { label: "Time yourself on 2 challenge problems", done: false },
    ],
  },
  {
    id: "sm3", title: "Short Break & Mindfulness", subject: "Break", type: "break", duration: 10, completed: false,
    description: "Take a mindful break to reset your focus. Stretching and breathing exercises.",
    tasks: [
      { label: "5 deep breaths (box breathing)", done: false },
      { label: "Quick stretch routine", done: false },
      { label: "Drink water", done: false },
    ],
  },
  {
    id: "sm4", title: "Biology: Genetics Flashcard Review", subject: "Biology", type: "review", duration: 20, completed: false,
    description: "Spaced repetition review of genetics concepts using active recall.",
    tasks: [
      { label: "Review DNA structure flashcards", done: false },
      { label: "Practice Punnett square problems", done: false },
      { label: "Recall transcription & translation steps", done: false },
    ],
  },
  {
    id: "sm5", title: "CS: Data Structures Deep Dive", subject: "Computer Science", type: "focus", duration: 35, completed: false,
    description: "Strengthen your understanding of trees, graphs, and hash tables.",
    tasks: [
      { label: "Implement a BST insert function", done: false },
      { label: "Solve 2 graph traversal problems", done: false },
      { label: "Review hash collision strategies", done: false },
      { label: "Compare time complexities of operations", done: false },
    ],
  },
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

export const saathiFAQs: SaathiFAQ[] = [
  { id: "f1", question: "How does the adaptive quiz engine work?", answer: "The Smart Quiz Engine analyzes your past performance data across all subjects. It identifies topics where you score below average and prioritizes questions from those weak areas. The difficulty adjusts dynamically - if you answer correctly, the next question gets harder; if you struggle, it gets easier. This spaced-repetition approach ensures you focus on what needs the most improvement.", category: "quiz" },
  { id: "f2", question: "What are learning paths and how are they personalized?", answer: "Learning paths are AI-generated sequences of lessons, practice sessions, and quizzes tailored to your weakness profile. When the system detects a low-mastery topic (like 'Integration' in Math), it creates a structured path with progressive modules. Each module includes a summary, key points, worked examples, and a mini-quiz. You unlock modules sequentially as you complete them.", category: "learning" },
  { id: "f3", question: "How does weakness detection work?", answer: "Weakness detection analyzes three data points: (1) Quiz accuracy per topic, (2) Time spent per question compared to average, and (3) Trend over last 4 weeks. If your accuracy in a topic drops below 65% or your response time is 30%+ higher than average, it flags that topic as a weakness. The dashboard highlights these areas with specific recommendations.", category: "general" },
  { id: "f4", question: "How do streak awards work?", answer: "You earn E-Awards (digital badges) for maintaining consistent learning streaks. Awards unlock at every 3-day milestone: Day 3 (First Spark), Day 6 (Flame Starter), Day 9 (Consistency King), and so on up to Day 30 (Legend Status). Each milestone has a tier: Bronze (3-6 days), Silver (9-12), Gold (15-18), Platinum (21-24), and Diamond (27-30). Missing a day resets your streak.", category: "general" },
  { id: "f5", question: "How is the leaderboard calculated?", answer: "Your XP score is calculated from: Quiz accuracy (40%), Consistency/streak (25%), Improvement rate (20%), and Study time (15%). Mastery percentage is the weighted average across all subjects. The leaderboard updates daily and shows your rank among all learners in your cohort.", category: "general" },
  { id: "f6", question: "What should I do if I'm stuck on a topic?", answer: "If you're stuck: (1) Go to Learning Paths and start the relevant path for that topic, (2) Read through the module content and examples, (3) Try the mini-quiz to test understanding, (4) Use the Smart Quiz to practice specific questions on that topic, (5) Check Study Optimizer for the best time to study difficult topics. If you're still stuck, try breaking the topic into smaller sub-topics.", category: "learning" },
  { id: "f7", question: "How does the study time optimizer work?", answer: "The optimizer tracks when you study and how well you perform during those sessions. It identifies your peak performance hours (when you score highest on quizzes and complete tasks fastest). It then recommends scheduling difficult subjects during your peak hours and easier reviews during low-energy periods. It also suggests Pomodoro-style breaks for sustained focus.", category: "technical" },
  { id: "f8", question: "I'm feeling overwhelmed with my studies. What should I do?", answer: "It's completely normal to feel overwhelmed. Here are some steps: (1) Focus on just ONE weak topic at a time, (2) Use the Study Optimizer to set a realistic daily goal (even 30 minutes counts!), (3) Take regular breaks - our system includes mindfulness break modules, (4) Celebrate small wins - check your streak awards for motivation, (5) If you're feeling persistent stress or anxiety, please use our Mental Health Support resources in the sidebar. You can call 988 (Suicide & Crisis Lifeline) or text HOME to 741741 anytime.", category: "motivation" },
  { id: "f9", question: "What can my parent see in Parent Mode?", answer: "In Parent Mode, your guardian can see: (1) Overall mastery percentages per subject, (2) Study time and consistency data, (3) Weakness alerts and areas needing attention, (4) Streak progress, (5) Performance trends over time. Parents cannot see individual quiz answers or modify your learning paths. The goal is to help them support your learning journey.", category: "parent" },
  { id: "f10", question: "How do smart nudges help me learn?", answer: "Smart nudges are intelligent notifications that keep you on track. There are 5 types: Warnings (when performance drops), Milestones (celebrating achievements), Reminders (study session due dates), Challenges (bonus XP opportunities), and Encouragement (positive reinforcement). Each nudge includes an actionable button - like 'Start Review' which opens a targeted mini-quiz for that specific weakness.", category: "general" },
  { id: "f11", question: "Can I reset my progress?", answer: "Currently, your progress is cumulative and cannot be fully reset. However, you can: (1) Retake any quiz to improve your scores, (2) Restart learning path modules, (3) Your mastery scores are weighted toward recent performance, so consistent improvement will quickly raise your scores even if you had a rough start.", category: "technical" },
  { id: "f12", question: "How do I improve my rank on the leaderboard?", answer: "To climb the leaderboard: (1) Maintain your daily streak - consistency is worth 25% of your score, (2) Focus on weak subjects - improving from 50% to 70% gives more points than 80% to 85%, (3) Complete daily challenges for bonus XP, (4) Study during your peak performance hours for better quiz scores, (5) Use learning paths to systematically improve rather than random studying.", category: "motivation" },
]
