import { dbPromise } from "./db.js";

function rowsFromStatement(stmt) {
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

async function prepare(query, params = []) {
  const db = await dbPromise;
  const stmt = db.prepare(query);
  stmt.bind(params);
  return stmt;
}

export async function getAllPatients() {
  const stmt = await prepare(`SELECT * FROM patients ORDER BY name ASC`);
  return rowsFromStatement(stmt);
}

export async function searchPatients(term) {
  const normalized = `%${term.toLowerCase()}%`;
  const stmt = await prepare(
    `SELECT * FROM patients
     WHERE LOWER(name) LIKE ? OR LOWER(diagnosis) LIKE ?
     ORDER BY name ASC`,
    [normalized, normalized]
  );
  return rowsFromStatement(stmt);
}

export async function insertPatient(patient) {
  const stmt = await prepare(
    `INSERT INTO patients (id, name, age, gender, diagnosis, assigned_doctor, status, room, admitted_date, last_updated)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      patient.id,
      patient.name,
      patient.age,
      patient.gender,
      patient.diagnosis,
      patient.assignedDoctor,
      patient.status,
      patient.room,
      patient.admittedDate,
      patient.lastUpdated,
    ]
  );
  stmt.step();
  stmt.free();
}

export async function getDoctorAppointments() {
  const stmt = await prepare(
    `SELECT a.id,
       a.patient_id,
       p.name AS patientName,
       a.time,
       a.duration,
       a.room,
       a.status,
       a.last_updated AS lastUpdated
     FROM appointments a
     LEFT JOIN patients p ON a.patient_id = p.id
     ORDER BY a.time ASC`
  );
  return rowsFromStatement(stmt);
}

export async function getPendingResults() {
  const stmt = await prepare(
    `SELECT id,
       patient_name AS patientName,
       test_type AS testType,
       priority,
       submitted_at AS submittedAt
     FROM pending_results
     ORDER BY submitted_at ASC`
  );
  return rowsFromStatement(stmt);
}

export async function getCheckInQueue() {
  const stmt = await prepare(
    `SELECT c.id,
       c.patient_id,
       p.name AS patientName,
       c.check_in_time AS checkInTime,
       c.appointment_time AS appointmentTime,
       c.appointment_type AS appointmentType,
       c.status
     FROM check_ins c
     LEFT JOIN patients p ON c.patient_id = p.id
     ORDER BY c.check_in_time ASC`
  );
  return rowsFromStatement(stmt);
}

export async function getPrescriptionQueue() {
  const stmt = await prepare(
    `SELECT pr.id,
       pr.patient_id,
       p.name AS patientName,
       pr.medication_id,
       m.name AS medicationName,
       pr.quantity,
       pr.status,
       pr.created_at AS createdAt
     FROM prescriptions pr
     LEFT JOIN patients p ON pr.patient_id = p.id
     LEFT JOIN medications m ON pr.medication_id = m.id
     ORDER BY pr.created_at ASC`
  );
  return rowsFromStatement(stmt);
}

export async function getLowStockMedications() {
  const stmt = await prepare(`SELECT * FROM medications WHERE status != 'ok' ORDER BY current_stock ASC`);
  return rowsFromStatement(stmt);
}

export async function getPatientStatusBreakdown() {
  const stmt = await prepare(
    `SELECT status AS id, COUNT(*) AS value FROM patients GROUP BY status`
  );
  return rowsFromStatement(stmt);
}

export async function getPriorityPatientQueue() {
  const stmt = await prepare(
    `SELECT id, name, diagnosis, status, room, last_updated
     FROM patients
     WHERE status IN ('critical', 'monitoring')
     ORDER BY CASE status WHEN 'critical' THEN 1 WHEN 'monitoring' THEN 2 ELSE 3 END, last_updated ASC
     LIMIT 6`
  );
  return rowsFromStatement(stmt);
}

export async function getReceptionAppointmentStatus() {
  const stmt = await prepare(
    `SELECT status AS id, COUNT(*) AS value FROM check_ins GROUP BY status`
  );
  return rowsFromStatement(stmt);
}

// ------------------------
// Dashboard KPI / Charts
// ------------------------

export async function getAdminKpis() {
  // Active patients (not discharged)
  const stmt1 = await prepare(`SELECT COUNT(*) AS value FROM patients WHERE status != 'discharged'`);
  const activeRows = rowsFromStatement(stmt1);
  const active = Number(activeRows[0]?.value || 0);

  // Today's appointments (best-effort: count all appointments)
  const stmt2 = await prepare(`SELECT COUNT(*) AS value FROM appointments`);
  const apptRows = rowsFromStatement(stmt2);
  const todaysAppts = Number(apptRows[0]?.value || 0);

  // Available beds (assume 50 total beds as a simple capacity estimate)
  const stmt3 = await prepare(`SELECT COUNT(*) AS value FROM patients WHERE room IS NOT NULL`);
  const occupiedRows = rowsFromStatement(stmt3);
  const occupied = Number(occupiedRows[0]?.value || 0);
  const totalBeds = 50;
  const availableBeds = Math.max(totalBeds - occupied, 0);

  // Critical alerts (patients in critical status)
  const stmt4 = await prepare(`SELECT COUNT(*) AS value FROM patients WHERE status = 'critical'`);
  const criticalRows = rowsFromStatement(stmt4);
  const critical = Number(criticalRows[0]?.value || 0);

  return [
    {
      id: "active-patients",
      label: "Active Patients",
      value: active,
      trend: { direction: "up", percent: 0.0, period: "vs last week" },
      icon: "users",
      iconTone: "accent",
    },
    {
      id: "todays-appointments",
      label: "Today's Appointments",
      value: todaysAppts,
      trend: { direction: "up", percent: 0.0, period: "vs yesterday" },
      icon: "calendar",
      iconTone: "info",
    },
    {
      id: "available-beds",
      label: "Available Beds",
      value: availableBeds,
      trend: { direction: "down", percent: 0.0, period: "vs last week" },
      icon: "bed",
      iconTone: "success",
    },
    {
      id: "critical-alerts",
      label: "Critical Alerts",
      value: critical,
      trend: { direction: "down", percent: 0.0, period: "vs last week" },
      icon: "alertTriangle",
      iconTone: "critical",
    },
  ];
}

export async function getWeeklyAdmissions() {
  // Get counts by admitted_date for the last 7 days (including today)
  const stmt = await prepare(
    `SELECT admitted_date AS date, COUNT(*) AS count
     FROM patients
     WHERE admitted_date >= date('now','-6 days')
     GROUP BY admitted_date`
  );
  const rows = rowsFromStatement(stmt);

  // Build last 7 days array (Mon..Sun short names based on local locale)
  const days = [];
  const values = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
    days.push(weekday);
    const found = rows.find((r) => r.date === iso);
    values.push(found ? Number(found.count || 0) : 0);
  }

  return {
    days,
    series: [
      {
        id: "admissions",
        label: "Admissions",
        color: "var(--color-accent)",
        values,
      },
    ],
  };
}

export async function getDoctorKpis() {
  const stmt1 = await prepare(`SELECT COUNT(*) AS value FROM appointments`);
  const apptRows = rowsFromStatement(stmt1);
  const todaysAppts = Number(apptRows[0]?.value || 0);

  const stmt2 = await prepare(`SELECT COUNT(*) AS value FROM patients`);
  const patientRows = rowsFromStatement(stmt2);
  const assignedPatients = Number(patientRows[0]?.value || 0);

  const stmt3 = await prepare(`SELECT COUNT(*) AS value FROM pending_results`);
  const pendingRows = rowsFromStatement(stmt3);
  const pendingResults = Number(pendingRows[0]?.value || 0);

  const stmt4 = await prepare(`SELECT 0 AS value`);
  const completedRows = rowsFromStatement(stmt4);
  const completedToday = Number(completedRows[0]?.value || 0);

  return [
    {
      id: "todays-appointments",
      label: "Today's Appointments",
      value: todaysAppts,
      trend: { direction: "up", percent: 0.0, period: "vs yesterday" },
      icon: "calendar",
      iconTone: "info",
    },
    {
      id: "assigned-patients",
      label: "Assigned Patients",
      value: assignedPatients,
      trend: { direction: "up", percent: 0.0, period: "vs last week" },
      icon: "users",
      iconTone: "accent",
    },
    {
      id: "pending-results",
      label: "Pending Results",
      value: pendingResults,
      trend: { direction: "down", percent: 0.0, period: "vs last week" },
      icon: "fileText",
      iconTone: "warning",
    },
    {
      id: "completed-today",
      label: "Completed Today",
      value: completedToday,
      trend: { direction: "up", percent: 0.0, period: "vs average" },
      icon: "sparkles",
      iconTone: "success",
    },
  ];
}

export async function getReceptionKpis() {
  const stmt1 = await prepare(`SELECT COUNT(*) AS value FROM check_ins`);
  const checkInRows = rowsFromStatement(stmt1);
  const checkIns = Number(checkInRows[0]?.value || 0);

  const stmt2 = await prepare(`SELECT COUNT(*) AS value FROM check_ins WHERE status = 'waiting'`);
  const waitingRows = rowsFromStatement(stmt2);
  const waiting = Number(waitingRows[0]?.value || 0);

  const stmt3 = await prepare(`SELECT COUNT(*) AS value FROM check_ins WHERE status = 'checked-in'`);
  const checkedInRows = rowsFromStatement(stmt3);
  const checkedIn = Number(checkedInRows[0]?.value || 0);

  const stmt4 = await prepare(`SELECT 0 AS value`);
  const registeredRows = rowsFromStatement(stmt4);
  const registered = Number(registeredRows[0]?.value || 0);

  return [
    {
      id: "check-ins",
      label: "Check-Ins",
      value: checkIns,
      trend: { direction: "up", percent: 0.0, period: "vs yesterday" },
      icon: "calendar",
      iconTone: "info",
    },
    {
      id: "waiting",
      label: "Waiting",
      value: waiting,
      trend: { direction: "down", percent: 0.0, period: "vs last week" },
      icon: "users",
      iconTone: "warning",
    },
    {
      id: "checked-in",
      label: "Checked In",
      value: checkedIn,
      trend: { direction: "up", percent: 0.0, period: "vs last week" },
      icon: "users",
      iconTone: "accent",
    },
    {
      id: "registered",
      label: "Registered",
      value: registered,
      trend: { direction: "up", percent: 0.0, period: "vs last week" },
      icon: "users",
      iconTone: "info",
    },
  ];
}

export async function getPharmacyKpis() {
  const stmt1 = await prepare(`SELECT COUNT(*) AS value FROM prescriptions WHERE status = 'pending'`);
  const pendingRows = rowsFromStatement(stmt1);
  const pending = Number(pendingRows[0]?.value || 0);

  const stmt2 = await prepare(`SELECT COUNT(*) AS value FROM medications WHERE status != 'ok'`);
  const lowStockRows = rowsFromStatement(stmt2);
  const lowStock = Number(lowStockRows[0]?.value || 0);

  const stmt3 = await prepare(`SELECT COUNT(*) AS value FROM prescriptions`);
  const totalPresRows = rowsFromStatement(stmt3);
  const totalPrescriptions = Number(totalPresRows[0]?.value || 0);

  const stmt4 = await prepare(`SELECT 0 AS value`);
  const dispensedRows = rowsFromStatement(stmt4);
  const dispensedToday = Number(dispensedRows[0]?.value || 0);

  return [
    {
      id: "pending-prescriptions",
      label: "Pending Prescriptions",
      value: pending,
      trend: { direction: "up", percent: 0.0, period: "vs yesterday" },
      icon: "fileText",
      iconTone: "warning",
    },
    {
      id: "low-stock",
      label: "Low Stock Medications",
      value: lowStock,
      trend: { direction: "down", percent: 0.0, period: "vs last week" },
      icon: "alertTriangle",
      iconTone: "critical",
    },
    {
      id: "total-prescriptions",
      label: "Total Prescriptions",
      value: totalPrescriptions,
      trend: { direction: "up", percent: 0.0, period: "vs last week" },
      icon: "fileText",
      iconTone: "accent",
    },
    {
      id: "dispensed-today",
      label: "Dispensed Today",
      value: dispensedToday,
      trend: { direction: "up", percent: 0.0, period: "vs average" },
      icon: "sparkles",
      iconTone: "success",
    },
  ];
}
