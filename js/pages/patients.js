/**
 * MedFlow — Patients page
 * Renders a searchable patient directory from mock data.
 */

import { allPatients, icons } from "../mock-data.js";

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

/**
 * Renders a status badge for a patient row.
 * @param {string} status
 * @returns {string}
 */
function renderStatusBadge(status) {
  const badgeClass = STATUS_BADGE_MAP[status] || "badge--neutral";
  const label = STATUS_LABEL_MAP[status] || status;

  return `<span class="badge ${badgeClass}">${label}</span>`;
}

/**
 * Renders the full Patients page.
 * @returns {string}
 */
export function renderPatientsPage() {
  const rows = allPatients
    .map(
      (patient) => `
      <tr class="table-row" data-patient-id="${patient.id}" data-patient-name="${patient.name}">
        <td class="table-cell"><strong>${patient.name}</strong></td>
        <td class="table-cell">${patient.age} / ${patient.gender}</td>
        <td class="table-cell">${patient.diagnosis}</td>
        <td class="table-cell">${patient.assignedDoctor}</td>
        <td class="table-cell">${renderStatusBadge(patient.status)}</td>
        <td class="table-cell">${patient.room}</td>
        <td class="table-cell table-cell--secondary">${patient.admittedDate}</td>
      </tr>
    `
    )
    .join("");

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
            <h3 class="table-card__title">Patient Directory</h3>
            <span class="dashboard-table-card__count">${allPatients.length} patients</span>
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
              <tbody class="table-body">
                ${rows}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  `;
}

export default renderPatientsPage;
