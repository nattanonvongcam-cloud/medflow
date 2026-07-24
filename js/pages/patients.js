/**
 * MedFlow — Patients page
 * Renders a searchable patient directory from mock data.
 */

import { icons } from "../mock-data.js";
import { getAllPatients, searchPatients, insertPatient } from "../db/queries.js";

const STATUS_BADGE_MAP = {
  critical: "badge--critical",
  stable: "badge--success",
  monitoring: "badge--warning",
};

const STATUS_LABEL_MAP = {
  critical: "Critical",
  stable: "Stable",
  monitoring: "Monitoring",
};

function renderStatusBadge(status) {
  const badgeClass = STATUS_BADGE_MAP[status] || "badge--neutral";
  const label = STATUS_LABEL_MAP[status] || status;
  return `<span class="badge ${badgeClass}">${label}</span>`;
}

function renderPatientRow(patient) {
  return `
      <tr class="table-row" data-patient-id="${patient.id}" data-patient-name="${patient.name}">
        <td class="table-cell"><strong>${patient.name}</strong></td>
        <td class="table-cell">${patient.age} / ${patient.gender}</td>
        <td class="table-cell">${patient.diagnosis}</td>
        <td class="table-cell">${patient.assigned_doctor}</td>
        <td class="table-cell">${renderStatusBadge(patient.status)}</td>
        <td class="table-cell">${patient.room}</td>
        <td class="table-cell table-cell--secondary">${patient.admitted_date}</td>
      </tr>
    `;
}

export function renderPatientsPage() {
  return `
    <main class="content dashboard" id="main-content">
      <header class="dashboard__header">
        <h2 class="dashboard__title">Patients</h2>
        <p class="dashboard__subtitle">Complete patient roster and care status</p>
      </header>

      <section class="dashboard-section" aria-label="Patients search and list">
        <label class="input" for="patients-search">
          <span class="input__icon" aria-hidden="true">${icons.search || ""}</span>
          <input id="patients-search" class="input__field" type="search" placeholder="Search patients..." data-patients-search aria-label="Search patients" />
        </label>

        <article class="card table-card">
          <div class="table-card__header">
            <div>
              <h3 class="table-card__title">Patient Directory</h3>
              <p class="table-card__subtitle" id="patients-count">Loading patients...</p>
            </div>
          </div>
          <div class="table-card__body">
            <table class="table" role="grid" aria-label="Patients list">
              <thead class="table-head">
                <tr class="table-row table-row--header">
                  <th class="table-cell table-cell--header" scope="col">Name</th>
                  <th class="table-cell table-cell--header" scope="col">Age / Gender</th>
                  <th class="table-cell table-cell--header" scope="col">Diagnosis</th>
                  <th class="table-cell table-cell--header" scope="col">Assigned Doctor</th>
                  <th class="table-cell table-cell--header" scope="col">Status</th>
                  <th class="table-cell table-cell--header" scope="col">Room</th>
                  <th class="table-cell table-cell--header table-cell--secondary" scope="col">Admitted</th>
                </tr>
              </thead>
              <tbody id="patients-table-body" class="table-body">
                <tr class="table-row"><td class="table-cell" colspan="7">Loading records…</td></tr>
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <section class="dashboard-section" aria-label="Add new patient">
        <article class="card form-card">
          <div class="form-card__header">
            <h3 class="form-card__title">Add Patient</h3>
          </div>
          <form id="add-patient-form" class="form-grid" data-patient-form>
            <label class="input">
              <span class="input__label">Name</span>
              <input class="input__field" name="name" type="text" required />
            </label>
            <label class="input">
              <span class="input__label">Age</span>
              <input class="input__field" name="age" type="number" min="0" required />
            </label>
            <label class="input">
              <span class="input__label">Gender</span>
              <select class="input__field" name="gender" required>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label class="input input--full-width">
              <span class="input__label">Diagnosis</span>
              <input class="input__field" name="diagnosis" type="text" required />
            </label>
            <label class="input">
              <span class="input__label">Assigned Doctor</span>
              <input class="input__field" name="assignedDoctor" type="text" required />
            </label>
            <label class="input">
              <span class="input__label">Status</span>
              <select class="input__field" name="status" required>
                <option value="stable">Stable</option>
                <option value="monitoring">Monitoring</option>
                <option value="critical">Critical</option>
              </select>
            </label>
            <label class="input input--full-width">
              <span class="input__label">Room</span>
              <input class="input__field" name="room" type="text" required />
            </label>
            <div class="form-actions input--full-width">
              <button type="submit" class="btn btn--primary">Add Patient</button>
            </div>
          </form>
        </article>
      </section>
    </main>
  `;
}

async function loadPatients(query = "") {
  const patients = query.trim() ? await searchPatients(query) : await getAllPatients();
  const tableBody = document.getElementById("patients-table-body");
  const countLabel = document.getElementById("patients-count");

  if (!tableBody || !countLabel) return;

  if (!patients.length) {
    tableBody.innerHTML = `
      <tr class="table-row">
        <td class="table-cell" colspan="7">No patients found.</td>
      </tr>
    `;
  } else {
    tableBody.innerHTML = patients.map(renderPatientRow).join("");
  }

  countLabel.textContent = `${patients.length} patients`;
}

function normalizePatientId(name) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `pt_${slug || "new"}_${Date.now()}`;
}

async function handlePatientFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const patient = {
    id: normalizePatientId(String(formData.get("name") || "new patient")),
    name: String(formData.get("name") || ""),
    age: Number(formData.get("age") || 0),
    gender: String(formData.get("gender") || "Other"),
    diagnosis: String(formData.get("diagnosis") || ""),
    assignedDoctor: String(formData.get("assignedDoctor") || ""),
    status: String(formData.get("status") || "stable"),
    room: String(formData.get("room") || ""),
    admittedDate: new Date().toISOString().slice(0, 10),
    lastUpdated: "Just now",
  };

  await insertPatient(patient);
  form.reset();
  await loadPatients(document.querySelector("[data-patients-search]")?.value || "");
}

export async function initPatientsPage() {
  const searchInput = document.querySelector("[data-patients-search]");
  const form = document.querySelector("[data-patient-form]");

  if (searchInput) {
    searchInput.addEventListener("input", async (event) => {
      await loadPatients(event.target.value);
    });
  }

  if (form) {
    form.addEventListener("submit", handlePatientFormSubmit);
  }

  await loadPatients();
}

export default renderPatientsPage;
