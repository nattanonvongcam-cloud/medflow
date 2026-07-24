/**
 * MedFlow — Doctor Dashboard page
 * Renders KPI cards, appointment schedule, and pending results from mock data.
 */

import { icons } from "../mock-data.js";
import { getDoctorAppointments, getPendingResults, getDoctorKpis } from "../db/queries.js";

const STATUS_BADGE_MAP = {
  completed: "badge--success",
  "in-progress": "badge--accent",
  scheduled: "badge--info",
  critical: "badge--critical",
  high: "badge--warning",
  normal: "badge--info",
};

const STATUS_LABEL_MAP = {
  completed: "Completed",
  "in-progress": "In Progress",
  scheduled: "Scheduled",
};

/**
 * Formats a number for KPI display.
 * @param {number} value
 * @returns {string}
 */
function formatKpiValue(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

/**
 * Renders a single KPI card.
 * @param {object} kpi
 * @returns {string}
 */
export function renderKpiCard(kpi) {
  const trendClass =
    kpi.trend.direction === "up" ? "kpi-card__trend--up" : "kpi-card__trend--down";
  const trendIcon =
    kpi.trend.direction === "up" ? icons.trendingUp : icons.trendingDown;

  return `
    <article class="card kpi-card" aria-labelledby="kpi-${kpi.id}">
      <div class="kpi-card__header">
        <span class="kpi-card__label" id="kpi-${kpi.id}">${kpi.label}</span>
        <span class="kpi-card__icon kpi-card__icon--${kpi.iconTone || "accent"}" aria-hidden="true">${icons[kpi.icon] || ""}</span>
      </div>
      <div class="kpi-card__body">
        <span class="kpi-card__value">${formatKpiValue(kpi.value)}</span>
        <span class="kpi-card__trend ${trendClass}">
          <span aria-hidden="true">${trendIcon}</span>
          <span>${kpi.trend.percent}%</span>
          <span class="kpi-card__trend-period">${kpi.trend.period}</span>
        </span>
      </div>
    </article>
  `;
}

/**
 * Renders the KPI row.
 * @param {Array} kpis
 * @returns {string}
 */
export function renderKpiRow(kpis) {
  return `
    <section class="dashboard-kpis" aria-label="Key performance indicators">
      ${kpis.map(renderKpiCard).join("")}
    </section>
  `;
}

/**
 * Renders status badge for an appointment.
 * @param {string} status
 * @returns {string}
 */
function renderStatusBadge(status) {
  const badgeClass = STATUS_BADGE_MAP[status] || "badge--neutral";
  const label = STATUS_LABEL_MAP[status] || status;

  return `<span class="badge ${badgeClass}">${label}</span>`;
}

/**
 * Renders the appointment schedule table.
 * @param {Array} appointments
 * @returns {string}
 */
export function renderAppointmentSchedule(appointments) {
  const rows = appointments
    .map(
      (apt) => `
    <tr class="table-row">
      <td class="table-cell"><strong>${apt.patientName}</strong></td>
      <td class="table-cell"><code>${apt.time}</code></td>
      <td class="table-cell">${apt.duration}</td>
      <td class="table-cell">${apt.room}</td>
      <td class="table-cell">${renderStatusBadge(apt.status)}</td>
      <td class="table-cell table-cell--secondary">${apt.lastUpdated}</td>
    </tr>
  `
    )
    .join("");

  return `
    <article class="card table-card">
      <div class="table-card__header">
        <h3 class="table-card__title">Today's Appointment Schedule</h3>
      </div>
      <div class="table-card__body">
        <table class="table" role="grid" aria-label="Today's appointments">
          <thead class="table-head">
            <tr class="table-row table-row--header">
              <th class="table-cell table-cell--header">Patient</th>
              <th class="table-cell table-cell--header">Time</th>
              <th class="table-cell table-cell--header">Duration</th>
              <th class="table-cell table-cell--header">Room</th>
              <th class="table-cell table-cell--header">Status</th>
              <th class="table-cell table-cell--header table-cell--secondary">Last Update</th>
            </tr>
          </thead>
          <tbody class="table-body">
            ${rows}
          </tbody>
        </table>
      </div>
    </article>
  `;
}

/**
 * Renders the pending results and alerts table.
 * @param {Array} results
 * @returns {string}
 */
export function renderPendingResults(results) {
  const rows = results
    .map(
      (result) => `
    <tr class="table-row">
      <td class="table-cell"><strong>${result.patientName}</strong></td>
      <td class="table-cell">${result.testType}</td>
      <td class="table-cell">${renderStatusBadge(result.priority)}</td>
      <td class="table-cell table-cell--secondary">${result.submittedAt}</td>
    </tr>
  `
    )
    .join("");

  return `
    <article class="card table-card">
      <div class="table-card__header">
        <h3 class="table-card__title">Pending Results & Alerts</h3>
      </div>
      <div class="table-card__body">
        <table class="table" role="grid" aria-label="Pending results and alerts">
          <thead class="table-head">
            <tr class="table-row table-row--header">
              <th class="table-cell table-cell--header">Patient</th>
              <th class="table-cell table-cell--header">Test Type</th>
              <th class="table-cell table-cell--header">Priority</th>
              <th class="table-cell table-cell--header table-cell--secondary">Submitted</th>
            </tr>
          </thead>
          <tbody class="table-body">
            ${rows}
          </tbody>
        </table>
      </div>
    </article>
  `;
}

/**
 * Renders the complete Doctor Dashboard page.
 * @returns {string}
 */
export function renderDoctorDashboard() {
  return `
    <main class="content" id="main-content">
      <section class="dashboard-section">
        <div id="doctor-kpi-row">${renderKpiRow([])}</div>
      </section>

      <section class="dashboard-section">
        <div class="dashboard-grid dashboard-grid--2col">
          <div id="doctor-appointment-schedule">${renderAppointmentSchedule([])}</div>
          <div id="doctor-pending-results">${renderPendingResults([])}</div>
        </div>
      </section>
    </main>
  `;
}

export async function initDoctorDashboard() {
  // Load KPI cards
  const kpis = await getDoctorKpis();
  const kpiContainer = document.getElementById("doctor-kpi-row");
  if (kpiContainer) {
    kpiContainer.innerHTML = renderKpiRow(kpis);
  }

  const appointments = await getDoctorAppointments();
  const results = await getPendingResults();

  const scheduleContainer = document.getElementById("doctor-appointment-schedule");
  if (scheduleContainer) {
    scheduleContainer.innerHTML = renderAppointmentSchedule(appointments);
  }

  const resultsContainer = document.getElementById("doctor-pending-results");
  if (resultsContainer) {
    resultsContainer.innerHTML = renderPendingResults(results);
  }
}
