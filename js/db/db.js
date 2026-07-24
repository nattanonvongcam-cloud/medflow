import initSqlJs from "https://cdn.jsdelivr.net/npm/sql.js@1.8.0/dist/sql-wasm.js";
import {
  allPatients,
  doctorAppointments,
  doctorPendingResults,
  receptionCheckInQueue,
  prescriptions,
  medications,
} from "../mock-data.js";

async function initDatabase() {
  const SQL = await initSqlJs({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/sql.js@1.8.0/dist/${file}`,
  });

  const db = new SQL.Database();
  const schemaText = await fetch(new URL("./schema.sql", import.meta.url)).then((response) => response.text());
  db.run(schemaText);
  seedDatabase(db);
  return db;
}

function seedDatabase(db) {
  for (const patient of allPatients) {
    db.run(
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
  }

  for (const appointment of doctorAppointments) {
    db.run(
      `INSERT INTO appointments (id, patient_id, time, duration, room, status, last_updated)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        appointment.id,
        appointment.patientId,
        appointment.time,
        appointment.duration,
        appointment.room,
        appointment.status,
        appointment.lastUpdated,
      ]
    );
  }

  for (const result of doctorPendingResults) {
    db.run(
      `INSERT INTO pending_results (id, patient_name, test_type, priority, submitted_at)
       VALUES (?, ?, ?, ?, ?)`,
      [
        result.id,
        result.patientName,
        result.testType,
        result.priority,
        result.submittedAt,
      ]
    );
  }

  for (const queueItem of receptionCheckInQueue) {
    db.run(
      `INSERT INTO check_ins (id, patient_id, check_in_time, appointment_time, appointment_type, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        queueItem.id,
        queueItem.patientId,
        queueItem.checkInTime,
        queueItem.appointmentTime,
        queueItem.appointmentType,
        queueItem.status,
      ]
    );
  }

  for (const medication of medications) {
    db.run(
      `INSERT INTO medications (id, name, current_stock, low_stock_threshold, unit, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        medication.id,
        medication.name,
        medication.currentStock,
        medication.lowStockThreshold,
        medication.unit,
        medication.status,
      ]
    );
  }

  for (const prescription of prescriptions) {
    db.run(
      `INSERT INTO prescriptions (id, patient_id, medication_id, quantity, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        prescription.id,
        prescription.patientId,
        prescription.medicationId,
        prescription.quantity,
        prescription.status,
        prescription.createdAt,
      ]
    );
  }
}

export const dbPromise = initDatabase();
