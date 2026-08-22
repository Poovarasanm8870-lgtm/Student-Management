// Comprehensive Mock Data for AuraSMS

export const INITIAL_USERS = [
  {
    id: "USR-1001",
    name: "Dr. Eleanor Vance",
    email: "eleanor.vance@aurasms.edu",
    role: "Admin",
    department: "Administration",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 234-5678",
    joinedDate: "2021-08-15",
  },
  {
    id: "USR-1002",
    name: "Prof. Marcus Thorne",
    email: "marcus.thorne@aurasms.edu",
    role: "Teacher",
    department: "Mathematics",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 345-6789",
    joinedDate: "2022-01-10",
  },
  {
    id: "USR-1003",
    name: "Sophia Chen",
    email: "sophia.chen@student.aurasms.edu",
    role: "Student",
    department: "Grade 10 - Science Stream",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 456-7890",
    joinedDate: "2023-09-01",
    gpa: 3.92,
    attendanceRate: 98.4,
    parentName: "David & Clara Chen",
  },
  {
    id: "USR-1004",
    name: "Alex Chen",
    email: "alex.chen@student.aurasms.edu",
    role: "Student",
    department: "Grade 7 - Junior Stream",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 456-7891",
    joinedDate: "2024-09-01",
    gpa: 3.65,
    attendanceRate: 94.2,
    parentName: "David & Clara Chen",
  },
  {
    id: "USR-1005",
    name: "Sarah Jenkins",
    email: "sarah.j@aurasms.edu",
    role: "Teacher",
    department: "Physics & Astronomy",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 567-8901",
    joinedDate: "2022-03-20",
  },
  {
    id: "USR-1006",
    name: "David Chen",
    email: "david.chen@gmail.com",
    role: "Parent",
    department: "Parent Association",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 678-9012",
    joinedDate: "2023-09-01",
  },
  {
    id: "USR-1007",
    name: "Liam O'Connor",
    email: "liam.o@student.aurasms.edu",
    role: "Student",
    department: "Grade 10 - Science Stream",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 789-0123",
    joinedDate: "2023-09-01",
    gpa: 3.40,
    attendanceRate: 92.0,
  },
  {
    id: "USR-1008",
    name: "Maya Lin",
    email: "maya.l@student.aurasms.edu",
    role: "Student",
    department: "Grade 10 - Science Stream",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 890-1234",
    joinedDate: "2023-09-01",
    gpa: 3.98,
    attendanceRate: 100.0,
  },
  {
    id: "USR-1009",
    name: "Ethan Wright",
    email: "ethan.w@student.aurasms.edu",
    role: "Student",
    department: "Grade 10 - Science Stream",
    status: "At Risk",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 901-2345",
    joinedDate: "2023-09-01",
    gpa: 2.15,
    attendanceRate: 81.5,
  },
  {
    id: "USR-1010",
    name: "Olivia Taylor",
    email: "olivia.t@aurasms.edu",
    role: "Teacher",
    department: "English Literature",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 012-3456",
    joinedDate: "2020-11-05",
  }
];

export const ADMIN_STATS = [
  {
    title: "Total Enrolled Students",
    value: "2,845",
    change: "+12.4%",
    isPositive: true,
    subtext: "vs. last semester",
    color: "indigo",
  },
  {
    title: "Active Academic Faculty",
    value: "142",
    change: "+4.2%",
    isPositive: true,
    subtext: "12 new hires",
    color: "violet",
  },
  {
    title: "Monthly Tuition Revenue",
    value: "$128,450",
    change: "+8.9%",
    isPositive: true,
    subtext: "94% collection rate",
    color: "emerald",
  },
  {
    title: "Overall Attendance Rate",
    value: "96.2%",
    change: "-0.5%",
    isPositive: false,
    subtext: "target 97.0%",
    color: "amber",
  },
];

export const ENROLLMENT_GROWTH_DATA = [
  { month: "Jan", students: 2400, revenue: 105000, performance: 84 },
  { month: "Feb", students: 2480, revenue: 108000, performance: 85 },
  { month: "Mar", students: 2550, revenue: 112000, performance: 87 },
  { month: "Apr", students: 2600, revenue: 115000, performance: 86 },
  { month: "May", students: 2680, revenue: 119000, performance: 89 },
  { month: "Jun", students: 2720, revenue: 122000, performance: 88 },
  { month: "Jul", students: 2780, revenue: 125000, performance: 90 },
  { month: "Aug", students: 2845, revenue: 128450, performance: 92 },
];

export const DEPARTMENT_PERFORMANCE_DATA = [
  { department: "Mathematics", avgGpa: 3.45, passRate: 94, budget: 45000 },
  { department: "Physics", avgGpa: 3.32, passRate: 91, budget: 52000 },
  { department: "Chemistry", avgGpa: 3.58, passRate: 96, budget: 48000 },
  { department: "Computer Science", avgGpa: 3.78, passRate: 98, budget: 65000 },
  { department: "English Lit", avgGpa: 3.62, passRate: 95, budget: 38000 },
  { department: "Fine Arts", avgGpa: 3.85, passRate: 99, budget: 30000 },
];

export const TEACHER_CLASSES = [
  {
    id: "CLS-10A",
    name: "Grade 10-A Advanced Mathematics",
    code: "MATH-401",
    room: "Building B - Room 204",
    time: "09:00 AM - 10:30 AM",
    totalStudents: 28,
    presentCount: 26,
    avgGrade: "A-",
    atRiskStudents: 1,
    schedule: "Mon, Wed, Fri",
  },
  {
    id: "CLS-11B",
    name: "Grade 11-B AP Physics Mechanics",
    code: "PHYS-502",
    room: "Science Lab 3",
    time: "11:00 AM - 12:30 PM",
    totalStudents: 24,
    presentCount: 23,
    avgGrade: "B+",
    atRiskStudents: 2,
    schedule: "Tue, Thu",
  },
  {
    id: "CLS-12C",
    name: "Grade 12-C Honors Calculus",
    code: "MATH-601",
    room: "Building B - Room 210",
    time: "01:30 PM - 03:00 PM",
    totalStudents: 22,
    presentCount: 22,
    avgGrade: "A",
    atRiskStudents: 0,
    schedule: "Mon, Wed, Fri",
  },
];

export const CLASS_ROSTER = [
  { id: "STU-001", name: "Sophia Chen", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", rollNo: "10A-01", status: "Present", midterm: 96, assignment: 98, quiz: 94, finalGpa: "4.0 (A+)" },
  { id: "STU-002", name: "Maya Lin", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80", rollNo: "10A-02", status: "Present", midterm: 98, assignment: 100, quiz: 95, finalGpa: "4.0 (A+)" },
  { id: "STU-003", name: "Liam O'Connor", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", rollNo: "10A-03", status: "Present", midterm: 84, assignment: 88, quiz: 82, finalGpa: "3.4 (B+)" },
  { id: "STU-004", name: "Ethan Wright", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80", rollNo: "10A-04", status: "Absent", midterm: 62, assignment: 70, quiz: 58, finalGpa: "2.1 (C-)" },
  { id: "STU-005", name: "Isabella Martinez", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", rollNo: "10A-05", status: "Present", midterm: 91, assignment: 94, quiz: 89, finalGpa: "3.8 (A-)" },
  { id: "STU-006", name: "Lucas Vance", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", rollNo: "10A-06", status: "Late", midterm: 78, assignment: 82, quiz: 80, finalGpa: "3.0 (B)" },
];

export const TEACHER_SCHEDULE = [
  { id: "SCH-1", time: "08:30 AM", title: "Faculty Morning Briefing", location: "Main Auditorium", type: "Meeting", status: "Completed" },
  { id: "SCH-2", time: "09:00 AM - 10:30 AM", title: "Grade 10-A Advanced Math", location: "Room 204", type: "Lecture", status: "In Progress", link: "https://zoom.us/mock" },
  { id: "SCH-3", time: "11:00 AM - 12:30 PM", title: "Grade 11-B AP Physics Mechanics", location: "Science Lab 3", type: "Lab Session", status: "Upcoming" },
  { id: "SCH-4", time: "01:30 PM - 02:30 PM", title: "Parent-Teacher Office Hours", location: "Office 102", type: "Consultation", status: "Upcoming" },
  { id: "SCH-5", time: "03:00 PM - 04:30 PM", title: "STEM Robotics Club Mentorship", location: "Tech Hub", type: "Extracurricular", status: "Upcoming" },
];

export const PARENT_CHILDREN = [
  {
    id: "CHILD-1",
    name: "Sophia Chen",
    grade: "Grade 10 - Science Stream",
    school: "Aura High School for STEM",
    gpa: 3.92,
    rank: "2nd in Class",
    attendanceRate: 98.4,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    advisor: "Prof. Marcus Thorne",
    courses: [
      { name: "Advanced Mathematics", code: "MATH-401", grade: "A+", percentage: 97, teacher: "Prof. Thorne", color: "indigo" },
      { name: "AP Physics Mechanics", code: "PHYS-502", grade: "A", percentage: 94, teacher: "Sarah Jenkins", color: "violet" },
      { name: "Organic Chemistry", code: "CHEM-301", grade: "A-", percentage: 91, teacher: "Dr. Aris Thorne", color: "emerald" },
      { name: "English Literature", code: "ENG-204", grade: "A", percentage: 95, teacher: "Olivia Taylor", color: "amber" },
      { name: "Computer Science", code: "CS-101", grade: "A+", percentage: 99, teacher: "Prof. Thorne", color: "sky" },
    ],
    upcomingTests: [
      { subject: "AP Physics Mechanics", topic: "Kinematics & Rotational Dynamics", date: "Aug 26, 2026", daysLeft: 4 },
      { subject: "Advanced Mathematics", topic: "Multivariable Differential Equations", date: "Aug 29, 2026", daysLeft: 7 },
    ]
  },
  {
    id: "CHILD-2",
    name: "Alex Chen",
    grade: "Grade 7 - Junior Stream",
    school: "Aura Junior Academy",
    gpa: 3.65,
    rank: "8th in Class",
    attendanceRate: 94.2,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    advisor: "Mrs. Clara Oswald",
    courses: [
      { name: "Pre-Algebra", code: "MATH-102", grade: "B+", percentage: 88, teacher: "Mr. Harrison", color: "indigo" },
      { name: "General Science", code: "SCI-101", grade: "A", percentage: 93, teacher: "Mrs. Oswald", color: "emerald" },
      { name: "World History", code: "HIST-101", grade: "A-", percentage: 90, teacher: "Mr. Davis", color: "amber" },
      { name: "Creative Writing", code: "ENG-101", grade: "A", percentage: 94, teacher: "Ms. Green", color: "violet" },
    ],
    upcomingTests: [
      { subject: "Pre-Algebra", topic: "Linear Equations & Graphing", date: "Aug 27, 2026", daysLeft: 5 },
    ]
  }
];

export const PARENT_ATTENDANCE_DONUT = [
  { name: "Present", value: 98, color: "#10b981" },
  { name: "Late / Excused", value: 3, color: "#f59e0b" },
  { name: "Unexcused Absent", value: 1, color: "#f43f5e" },
];

export const PARENT_ATTENDANCE_HEATMAP = [
  { day: "Aug 01", status: "Present", note: "On time" },
  { day: "Aug 02", status: "Present", note: "On time" },
  { day: "Aug 03", status: "Weekend", note: "-" },
  { day: "Aug 04", status: "Weekend", note: "-" },
  { day: "Aug 05", status: "Present", note: "On time" },
  { day: "Aug 06", status: "Present", note: "On time" },
  { day: "Aug 07", status: "Late", note: "Arrived 10 mins late - Traffic delay" },
  { day: "Aug 08", status: "Present", note: "On time" },
  { day: "Aug 09", status: "Present", note: "On time" },
  { day: "Aug 10", status: "Weekend", note: "-" },
  { day: "Aug 11", status: "Weekend", note: "-" },
  { day: "Aug 12", status: "Excused", note: "Medical Checkup appointment approved" },
  { day: "Aug 13", status: "Present", note: "On time" },
  { day: "Aug 14", status: "Present", note: "On time" },
  { day: "Aug 15", status: "Present", note: "On time" },
  { day: "Aug 16", status: "Present", note: "On time" },
  { day: "Aug 17", status: "Weekend", note: "-" },
  { day: "Aug 18", status: "Weekend", note: "-" },
  { day: "Aug 19", status: "Present", note: "On time" },
  { day: "Aug 20", status: "Present", note: "On time" },
  { day: "Aug 21", status: "Present", note: "On time" },
  { day: "Aug 22", status: "Present", note: "On time (Today)" },
];

export const MESSAGES_FEED = [
  {
    id: "MSG-101",
    sender: "Prof. Marcus Thorne",
    role: "Mathematics Dept Chair",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    time: "Today, 10:45 AM",
    subject: "Sophia's Exceptional Performance in Multivariable Calculus Quiz",
    preview: "Sophia scored 98/100 on today's quiz. She demonstrated advanced conceptual clarity...",
    fullMessage: "Dear Mr. & Mrs. Chen, I wanted to personally congratulate you on Sophia's performance. She scored 98/100 on today's Multivariable Calculus Quiz and helped explain difficult concepts to her study circle. We are nominating her for the National Science Olympiad team.",
    unread: true,
    childName: "Sophia Chen",
  },
  {
    id: "MSG-102",
    sender: "Dr. Eleanor Vance",
    role: "Principal & Head of School",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    time: "Yesterday, 02:15 PM",
    subject: "Annual STEM Fair & Parent-Faculty Gala Invitation",
    preview: "You are cordially invited to Aura High's Annual STEM Fair next Friday starting at 4 PM...",
    fullMessage: "Dear Aura High Families, We look forward to welcoming you to our Fall STEM Showcase. Sophia's Robotics exhibit will be highlighted in Main Hall B. Refreshments will be served.",
    unread: false,
    childName: "Sophia Chen",
  },
  {
    id: "MSG-103",
    sender: "Mrs. Clara Oswald",
    role: "Grade 7 Class Advisor",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    time: "Aug 18, 2026",
    subject: "Alex's Field Trip Permission & Supply List",
    preview: "Please review and sign Alex's permission slip for the Science Museum trip next month...",
    fullMessage: "Hi Mr. Chen, Just a quick reminder to sign Alex's digital consent form for the upcoming planetarium field trip on September 5th.",
    unread: false,
    childName: "Alex Chen",
  }
];

export const PARENT_INVOICES = [
  {
    id: "INV-2026-08",
    term: "Fall Semester 2026 - Installment 2",
    dueDate: "Sep 01, 2026",
    amount: 1450.00,
    status: "Pending",
    student: "Sophia Chen",
    breakdown: [
      { item: "Tuition Fee (STEM Honors)", cost: 1100.00 },
      { item: "Advanced Lab & Robotics Kit", cost: 200.00 },
      { item: "Athletic & Digital Library Fund", cost: 150.00 },
    ]
  },
  {
    id: "INV-2026-07",
    term: "Fall Semester 2026 - Installment 1",
    dueDate: "Aug 01, 2026",
    amount: 1450.00,
    status: "Paid",
    paidDate: "Jul 28, 2026",
    student: "Sophia Chen",
    breakdown: [
      { item: "Tuition Fee (STEM Honors)", cost: 1100.00 },
      { item: "Registration & Technology Access", cost: 350.00 },
    ]
  },
  {
    id: "INV-2026-06",
    term: "Junior Academy - Term 1 Fee",
    dueDate: "Sep 05, 2026",
    amount: 980.00,
    status: "Pending",
    student: "Alex Chen",
    breakdown: [
      { item: "Grade 7 Curriculum Tuition", cost: 800.00 },
      { item: "Arts & Sports Equipment Access", cost: 180.00 },
    ]
  }
];

export const SYSTEM_SETTINGS_MOCK = {
  maintenanceMode: false,
  emailNotifications: true,
  twoFactorAuth: true,
  autoBackupDaily: true,
  smsAlerts: false,
  portalVersion: "v4.2.8-production",
};
