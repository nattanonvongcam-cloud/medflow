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
