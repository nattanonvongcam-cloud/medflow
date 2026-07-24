/**
 * MedFlow — Mock data layer
 * Simulates API responses for Phase 1 shell.
 * Replace with fetch() calls when backend is integrated.
 */

export const user = {
  id: "usr_001",
  name: "Dr. Rivera",
  role: "Cardiologist",
  initials: "DR",
  email: "d.rivera@medflow.clinic",
  avatar: null,
};

export const clinic = {
  name: "MedFlow",
  tagline: "Clinic Management",
  ward: "Cardiology Ward · Building A",
};

export const greeting = {
  period: "morning",
  messages: {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
  },
};

export const icons = {
  grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  stethoscope: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>`,
  fileText: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
  layout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
  bed: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`,
  alertTriangle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
  trendingUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  trendingDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>`,
};

/** Admin Dashboard — KPI summary cards */
export const dashboardKpis = [
  {
    id: "active-patients",
    label: "Active Patients",
    value: 248,
    trend: { direction: "up", percent: 5.2, period: "vs last week" },
    icon: "users",
    iconTone: "accent",
  },
  {
    id: "todays-appointments",
    label: "Today's Appointments",
    value: 36,
    trend: { direction: "up", percent: 12.4, period: "vs yesterday" },
    icon: "calendar",
    iconTone: "info",
  },
  {
    id: "available-beds",
    label: "Available Beds",
    value: 18,
    trend: { direction: "down", percent: 8.1, period: "vs last week" },
    icon: "bed",
    iconTone: "success",
  },
  {
    id: "critical-alerts",
    label: "Critical Alerts",
    value: 7,
    trend: { direction: "down", percent: 22.0, period: "vs last week" },
    icon: "alertTriangle",
    iconTone: "critical",
  },
];

/** Admin Dashboard — weekly admissions bar chart data */
export const weeklyAdmissions = {
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  series: [
    {
      id: "emergency",
      label: "Emergency",
      color: "var(--color-critical)",
      values: [8, 12, 6, 14, 10, 5, 4],
    },
    {
      id: "scheduled",
      label: "Scheduled",
      color: "var(--color-accent)",
      values: [15, 18, 22, 19, 24, 8, 6],
    },
  ],
};

/** Admin Dashboard — patient status donut chart segments */
export const patientStatusBreakdown = [
  { id: "admitted", label: "Admitted", value: 42, color: "var(--color-info)" },
  { id: "discharged", label: "Discharged", value: 28, color: "var(--color-success)" },
  { id: "in-treatment", label: "In Treatment", value: 35, color: "var(--color-accent)" },
  { id: "critical", label: "Critical", value: 12, color: "var(--color-critical)" },
];

/** Admin Dashboard — priority patient queue table rows */
export const priorityPatientQueue = [
  {
    id: "pt_001",
    name: "Elena Vasquez",
    diagnosis: "Acute Myocardial Infarction",
    status: "critical",
    room: "ICU-204 · Cardiology",
    lastUpdated: "3 min ago",
  },
  {
    id: "pt_002",
    name: "James Okafor",
    diagnosis: "Post-operative monitoring",
    status: "monitoring",
    room: "Ward B-12 · Surgery",
    lastUpdated: "8 min ago",
  },
  {
    id: "pt_003",
    name: "Maria Chen",
    diagnosis: "Pneumonia — severe",
    status: "critical",
    room: "ICU-118 · Pulmonology",
    lastUpdated: "12 min ago",
  },
  {
    id: "pt_004",
    name: "Robert Klein",
    diagnosis: "Hypertension management",
    status: "stable",
    room: "Ward A-07 · General",
    lastUpdated: "18 min ago",
  },
  {
    id: "pt_005",
    name: "Aisha Rahman",
    diagnosis: "Diabetic ketoacidosis",
    status: "monitoring",
    room: "ICU-302 · Endocrinology",
    lastUpdated: "22 min ago",
  },
  {
    id: "pt_006",
    name: "Thomas Wright",
    diagnosis: "Stroke rehabilitation",
    status: "stable",
    room: "Ward C-15 · Neurology",
    lastUpdated: "35 min ago",
  },
];

export const allPatients = [
  {
    id: "pt_001",
    name: "Elena Vasquez",
    age: 42,
    gender: "Female",
    diagnosis: "Acute Myocardial Infarction",
    assignedDoctor: "Dr. Rivera",
    status: "critical",
    room: "ICU-204 · Cardiology",
    admittedDate: "2026-07-23",
    lastUpdated: "3 min ago",
  },
  {
    id: "pt_002",
    name: "James Okafor",
    age: 31,
    gender: "Male",
    diagnosis: "Post-operative monitoring",
    assignedDoctor: "Dr. Patel",
    status: "monitoring",
    room: "Ward B-12 · Surgery",
    admittedDate: "2026-07-21",
    lastUpdated: "8 min ago",
  },
  {
    id: "pt_003",
    name: "Maria Chen",
    age: 58,
    gender: "Female",
    diagnosis: "Pneumonia — severe",
    assignedDoctor: "Dr. Singh",
    status: "critical",
    room: "ICU-118 · Pulmonology",
    admittedDate: "2026-07-22",
    lastUpdated: "12 min ago",
  },
  {
    id: "pt_004",
    name: "Robert Klein",
    age: 67,
    gender: "Male",
    diagnosis: "Hypertension management",
    assignedDoctor: "Dr. Alvarez",
    status: "stable",
    room: "Ward A-07 · General",
    admittedDate: "2026-07-18",
    lastUpdated: "18 min ago",
  },
  {
    id: "pt_005",
    name: "Aisha Rahman",
    age: 29,
    gender: "Female",
    diagnosis: "Diabetic ketoacidosis",
    assignedDoctor: "Dr. Gomez",
    status: "monitoring",
    room: "ICU-302 · Endocrinology",
    admittedDate: "2026-07-20",
    lastUpdated: "22 min ago",
  },
  {
    id: "pt_006",
    name: "Thomas Wright",
    age: 74,
    gender: "Male",
    diagnosis: "Stroke rehabilitation",
    assignedDoctor: "Dr. Rivera",
    status: "stable",
    room: "Ward C-15 · Neurology",
    admittedDate: "2026-07-15",
    lastUpdated: "35 min ago",
  },
  {
    id: "pt_007",
    name: "Sophia Nguyen",
    age: 36,
    gender: "Female",
    diagnosis: "Asthma exacerbation",
    assignedDoctor: "Dr. Patel",
    status: "stable",
    room: "Ward D-04 · Respiratory",
    admittedDate: "2026-07-16",
    lastUpdated: "45 min ago",
  },
  {
    id: "pt_008",
    name: "Daniel Brooks",
    age: 48,
    gender: "Male",
    diagnosis: "Sepsis protocol",
    assignedDoctor: "Dr. Singh",
    status: "critical",
    room: "ICU-309 · Infectious Disease",
    admittedDate: "2026-07-24",
    lastUpdated: "1 hr ago",
  },
  {
    id: "pt_009",
    name: "Lina Torres",
    age: 54,
    gender: "Female",
    diagnosis: "Post-viral recovery",
    assignedDoctor: "Dr. Alvarez",
    status: "monitoring",
    room: "Ward E-10 · General",
    admittedDate: "2026-07-14",
    lastUpdated: "2 hr ago",
  },
  {
    id: "pt_010",
    name: "Noah Kim",
    age: 19,
    gender: "Male",
    diagnosis: "Appendicitis recovery",
    assignedDoctor: "Dr. Gomez",
    status: "stable",
    room: "Ward F-02 · Surgery",
    admittedDate: "2026-07-13",
    lastUpdated: "3 hr ago",
  },
  {
    id: "pt_011",
    name: "Maya Patel",
    age: 63,
    gender: "Female",
    diagnosis: "Cardiac arrhythmia",
    assignedDoctor: "Dr. Rivera",
    status: "monitoring",
    room: "Ward A-11 · Cardiology",
    admittedDate: "2026-07-12",
    lastUpdated: "4 hr ago",
  },
  {
    id: "pt_012",
    name: "Owen Scott",
    age: 45,
    gender: "Male",
    diagnosis: "Orthopedic follow-up",
    assignedDoctor: "Dr. Patel",
    status: "stable",
    room: "Ward G-07 · Orthopedics",
    admittedDate: "2026-07-11",
    lastUpdated: "5 hr ago",
  },
];

/** Bundled Admin Dashboard payload (swap with API response later) */
export const adminDashboardData = {
  kpis: dashboardKpis,
  admissions: weeklyAdmissions,
  statusBreakdown: patientStatusBreakdown,
  patientQueue: priorityPatientQueue,
};

/** ─────────────────────────────────────────────────────────────
    DOCTOR DASHBOARD
    ───────────────────────────────────────────────────────────── */

/** Doctor Dashboard — KPI summary cards */
export const doctorKpis = [
  {
    id: "todays-appointments",
    label: "Today's Appointments",
    value: 12,
    trend: { direction: "up", percent: 8.5, period: "vs yesterday" },
    icon: "calendar",
    iconTone: "info",
  },
  {
    id: "assigned-patients",
    label: "Assigned Patients",
    value: 47,
    trend: { direction: "up", percent: 3.2, period: "vs last week" },
    icon: "users",
    iconTone: "accent",
  },
  {
    id: "pending-results",
    label: "Pending Results",
    value: 8,
    trend: { direction: "down", percent: 15.0, period: "vs last week" },
    icon: "fileText",
    iconTone: "warning",
  },
  {
    id: "completed-today",
    label: "Completed Today",
    value: 9,
    trend: { direction: "up", percent: 22.5, period: "vs average" },
    icon: "sparkles",
    iconTone: "success",
  },
];

/** Doctor Dashboard — today's appointment schedule */
export const doctorAppointments = [
  {
    id: "apt_001",
    patientId: "pt_001",
    patientName: "Elena Vasquez",
    time: "09:00 AM",
    duration: "30 min",
    room: "Exam-01",
    status: "completed",
    lastUpdated: "2 hours ago",
  },
  {
    id: "apt_002",
    patientId: "pt_002",
    patientName: "James Okafor",
    time: "09:45 AM",
    duration: "30 min",
    room: "Exam-02",
    status: "in-progress",
    lastUpdated: "now",
  },
  {
    id: "apt_003",
    patientId: "pt_003",
    patientName: "Maria Chen",
    time: "10:30 AM",
    duration: "45 min",
    room: "Exam-03",
    status: "scheduled",
    lastUpdated: "in 15 min",
  },
  {
    id: "apt_004",
    patientId: "pt_004",
    patientName: "Robert Klein",
    time: "11:30 AM",
    duration: "30 min",
    room: "Exam-01",
    status: "scheduled",
    lastUpdated: "in 1h 15m",
  },
  {
    id: "apt_005",
    patientId: "pt_005",
    patientName: "Aisha Rahman",
    time: "01:00 PM",
    duration: "60 min",
    room: "Exam-04",
    status: "scheduled",
    lastUpdated: "in 3h 45m",
  },
];

/** Doctor Dashboard — pending results and alerts */
export const doctorPendingResults = [
  { id: "res_001", patientName: "Marcus Johnson", testType: "Blood Work", priority: "critical", submittedAt: "4 hours ago" },
  { id: "res_002", patientName: "Sophia Martinez", testType: "ECG Analysis", priority: "high", submittedAt: "2 hours ago" },
  { id: "res_003", patientName: "David Kim", testType: "Ultrasound Report", priority: "normal", submittedAt: "30 min ago" },
  { id: "res_004", patientName: "Lisa Wong", testType: "Lab Results", priority: "normal", submittedAt: "15 min ago" },
];

export const doctorDashboardData = {
  kpis: doctorKpis,
  appointments: doctorAppointments,
  pendingResults: doctorPendingResults,
};

/** ─────────────────────────────────────────────────────────────
    RECEPTION DASHBOARD
    ───────────────────────────────────────────────────────────── */

/** Reception Dashboard — KPI summary cards */
export const receptionKpis = [
  {
    id: "check-in-queue",
    label: "Check-In Queue",
    value: 7,
    trend: { direction: "down", percent: 18.3, period: "vs 1h ago" },
    icon: "calendar",
    iconTone: "critical",
  },
  {
    id: "todays-appointments",
    label: "Today's Appointments",
    value: 36,
    trend: { direction: "up", percent: 5.0, period: "vs yesterday" },
    icon: "calendar",
    iconTone: "info",
  },
  {
    id: "waiting-patients",
    label: "Waiting Patients",
    value: 14,
    trend: { direction: "up", percent: 12.0, period: "vs average" },
    icon: "users",
    iconTone: "warning",
  },
  {
    id: "in-room-count",
    label: "In-Room",
    value: 8,
    trend: { direction: "up", percent: 6.7, period: "vs average" },
    icon: "bed",
    iconTone: "success",
  },
];

/** Reception Dashboard — check-in queue */
export const receptionCheckInQueue = [
  {
    id: "checkin_001",
    patientId: "pt_006",
    patientName: "Thomas Wright",
    checkInTime: "08:45 AM",
    appointmentTime: "09:00 AM",
    appointmentType: "Follow-up",
    status: "pending",
  },
  {
    id: "checkin_002",
    patientId: "pt_007",
    patientName: "Nina Okonkwo",
    checkInTime: "08:50 AM",
    appointmentTime: "09:15 AM",
    appointmentType: "Initial",
    status: "pending",
  },
  {
    id: "checkin_003",
    patientId: "pt_008",
    patientName: "Carlos Ruiz",
    checkInTime: "08:55 AM",
    appointmentTime: "09:30 AM",
    appointmentType: "Checkup",
    status: "pending",
  },
  {
    id: "checkin_004",
    patientId: "pt_009",
    patientName: "Sophie Laurent",
    checkInTime: "09:02 AM",
    appointmentTime: "09:45 AM",
    appointmentType: "Follow-up",
    status: "checked-in",
  },
  {
    id: "checkin_005",
    patientId: "pt_010",
    patientName: "Ahmed Hassan",
    checkInTime: "09:08 AM",
    appointmentTime: "10:00 AM",
    appointmentType: "Consultation",
    status: "checked-in",
  },
];

/** Reception Dashboard — appointment status breakdown */
export const receptionAppointmentStatus = [
  { id: "registered", label: "Registered", value: 12, color: "var(--color-info)" },
  { id: "waiting", label: "Waiting", value: 14, color: "var(--color-warning)" },
  { id: "in-room", label: "In-Room", value: 8, color: "var(--color-accent)" },
  { id: "completed", label: "Completed", value: 2, color: "var(--color-success)" },
];

export const receptionDashboardData = {
  kpis: receptionKpis,
  checkInQueue: receptionCheckInQueue,
  appointmentStatus: receptionAppointmentStatus,
};

/** ─────────────────────────────────────────────────────────────
    PHARMACY DASHBOARD
    ───────────────────────────────────────────────────────────── */

/** Pharmacy Dashboard — KPI summary cards */
export const pharmacyKpis = [
  {
    id: "prescription-queue",
    label: "Prescription Queue",
    value: 12,
    trend: { direction: "down", percent: 25.0, period: "vs 1h ago" },
    icon: "fileText",
    iconTone: "accent",
  },
  {
    id: "low-stock-alerts",
    label: "Low Stock Alerts",
    value: 5,
    trend: { direction: "up", percent: 16.7, period: "vs yesterday" },
    icon: "alertTriangle",
    iconTone: "critical",
  },
  {
    id: "dispensed-today",
    label: "Dispensed Today",
    value: 67,
    trend: { direction: "up", percent: 18.3, period: "vs average" },
    icon: "sparkles",
    iconTone: "success",
  },
  {
    id: "pending-verification",
    label: "Pending Verification",
    value: 3,
    trend: { direction: "down", percent: 40.0, period: "vs average" },
    icon: "users",
    iconTone: "info",
  },
];

/** Pharmacy Dashboard — prescription queue */
export const prescriptions = [
  {
    id: "prx_001",
    patientId: "pt_001",
    patientName: "Elena Vasquez",
    medicationId: "med_001",
    medicationName: "Metoprolol",
    quantity: 30,
    status: "pending",
    createdAt: "10:15 AM",
  },
  {
    id: "prx_002",
    patientId: "pt_002",
    patientName: "James Okafor",
    medicationId: "med_002",
    medicationName: "Lisinopril",
    quantity: 60,
    status: "pending",
    createdAt: "10:22 AM",
  },
  {
    id: "prx_003",
    patientId: "pt_003",
    patientName: "Maria Chen",
    medicationId: "med_003",
    medicationName: "Amoxicillin",
    quantity: 20,
    status: "verified",
    createdAt: "10:05 AM",
  },
  {
    id: "prx_004",
    patientId: "pt_004",
    patientName: "Robert Klein",
    medicationId: "med_004",
    medicationName: "Atorvastatin",
    quantity: 90,
    status: "dispensed",
    createdAt: "09:45 AM",
  },
  {
    id: "prx_005",
    patientId: "pt_005",
    patientName: "Aisha Rahman",
    medicationId: "med_005",
    medicationName: "Insulin Glargine",
    quantity: 10,
    status: "dispensed",
    createdAt: "09:30 AM",
  },
];

/** Pharmacy Dashboard — medication inventory with low-stock alerts */
export const medications = [
  {
    id: "med_001",
    name: "Metoprolol 50mg",
    currentStock: 45,
    lowStockThreshold: 50,
    unit: "tablets",
    status: "low-stock",
  },
  {
    id: "med_002",
    name: "Lisinopril 10mg",
    currentStock: 120,
    lowStockThreshold: 100,
    unit: "tablets",
    status: "ok",
  },
  {
    id: "med_003",
    name: "Amoxicillin 500mg",
    currentStock: 23,
    lowStockThreshold: 40,
    unit: "capsules",
    status: "low-stock",
  },
  {
    id: "med_004",
    name: "Atorvastatin 20mg",
    currentStock: 15,
    lowStockThreshold: 60,
    unit: "tablets",
    status: "low-stock",
  },
  {
    id: "med_005",
    name: "Insulin Glargine",
    currentStock: 8,
    lowStockThreshold: 20,
    unit: "vials",
    status: "critical",
  },
  {
    id: "med_006",
    name: "Omeprazole 20mg",
    currentStock: 200,
    lowStockThreshold: 80,
    unit: "capsules",
    status: "ok",
  },
];

export const pharmacyDashboardData = {
  kpis: pharmacyKpis,
  prescriptions: prescriptions,
  medications: medications,
};

export const navSections = [
  {
    id: "overview",
    label: "Overview",
    collapsed: false,
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "grid",
        active: true,
        expandable: true,
        expanded: true,
        children: [
          { id: "admin-dashboard", label: "Admin Dashboard", active: true },
          { id: "doctor-dashboard", label: "Doctor Dashboard" },
          { id: "reception-dashboard", label: "Reception Dashboard" },
          { id: "pharmacy-dashboard", label: "Pharmacy Dashboard" },
        ],
      },
      {
        id: "patients",
        label: "Patients",
        icon: "users",
        badge: { type: "count", value: 12 },
      },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    collapsed: false,
    items: [
      {
        id: "ai-predictions",
        label: "AI Predictions",
        icon: "sparkles",
        badge: { type: "dot" },
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: "chart",
      },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    collapsed: false,
    items: [
      {
        id: "appointments",
        label: "Appointments",
        icon: "calendar",
        expandable: true,
        expanded: false,
        children: [
          { id: "appointments-list", label: "All Appointments" },
          { id: "appointments-schedule", label: "Schedule" },
          { id: "appointments-waitlist", label: "Waitlist" },
        ],
      },
      {
        id: "doctors",
        label: "Doctors",
        icon: "stethoscope",
        expandable: true,
        expanded: false,
        children: [
          { id: "doctors-list", label: "All Doctors" },
          { id: "doctors-schedule", label: "Schedules" },
          { id: "doctors-departments", label: "Departments" },
        ],
      },
      {
        id: "reports",
        label: "Reports",
        icon: "fileText",
        expandable: true,
        expanded: false,
        children: [
          { id: "reports-daily", label: "Daily Reports" },
          { id: "reports-monthly", label: "Monthly Summary" },
          { id: "reports-export", label: "Export Data" },
        ],
      },
    ],
  },
  {
    id: "system",
    label: "System",
    collapsed: false,
    items: [
      {
        id: "settings",
        label: "Settings",
        icon: "settings",
        expandable: true,
        expanded: false,
        children: [
          { id: "settings-clinic", label: "Clinic Profile" },
          { id: "settings-users", label: "User Management" },
          { id: "settings-preferences", label: "Preferences" },
        ],
      },
    ],
  },
];

export const notifications = {
  unreadCount: 3,
  items: [],
};

export const searchConfig = {
  placeholder: "Search patients, reports…",
  shortcut: "⌘K",
};

/**
 * Returns formatted date string for top bar display.
 * @returns {string}
 */
export function getFormattedDate() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}

/**
 * Returns greeting key based on current hour.
 * @returns {"morning"|"afternoon"|"evening"}
 */
export function getGreetingPeriod() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

/**
 * Returns greeting emoji for time of day.
 * @param {"morning"|"afternoon"|"evening"} period
 * @returns {string}
 */
export function getGreetingIcon(period) {
  const icons_map = { morning: "☀️", afternoon: "🌤️", evening: "🌙" };
  return icons_map[period] || "👋";
}
