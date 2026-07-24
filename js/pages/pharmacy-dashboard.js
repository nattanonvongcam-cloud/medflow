/**
 * MedFlow — Pharmacy Dashboard page
 * Renders KPI cards, prescription queue, and low-stock alerts from mock data.
 */

import { icons } from "../mock-data.js";
import { getPrescriptionQueue, getLowStockMedications, getPharmacyKpis } from "../db/queries.js";

const STATUS_BADGE_MAP = {
  pending: "badge--warning",
  verified: "badge--info",
  dispensed: "badge--success",
  critical: "badge--critical",
  "low-stock": "badge--warning",
  ok: "badge--success",
};

const STATUS_LABEL_MAP = {
  pending: "Pending",
  verified: "Verified",
  dispensed: "Dispensed",
  critical: "Critical",
  "low-stock": "Low Stock",
  ok: "OK",
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
 * Renders status badge.
 * @param {string} status
 * @returns {string}
 */
function renderStatusBadge(status) {
  const badgeClass = STATUS_BADGE_MAP[status] || "badge--neutral";
  const label = STATUS_LABEL_MAP[status] || status;

  return `<span class="badge ${badgeClass}">${label}</span>`;
}

/**
 * Renders the prescription queue table.
 * @param {Array} prx
 * @returns {string}
 */
export function renderPrescriptionQueue(prx) {
  const rows = prx
    .map(
      (item) => `
    <tr class="table-row">
      <td class="table-cell"><strong>${item.patientName}</strong></td>
      <td class="table-cell">${item.medicationName}</td>
      <td class="table-cell"><code>${item.quantity} ${item.quantity > 1 ? "tablets" : "tablet"}</code></td>
      <td class="table-cell">${renderStatusBadge(item.status)}</td>
      <td class="table-cell table-cell--secondary">${item.createdAt}</td>
    </tr>
  `
    )
    .join("");

  return `
    <article class="card table-card">
      <div class="table-card__header">
        <h3 class="table-card__title">Prescription Queue</h3>
      </div>
      <div class="table-card__body">
        <table class="table" role="grid" aria-label="Prescription queue">
          <thead class="table-head">
            <tr class="table-row table-row--header">
              <th class="table-cell table-cell--header">Patient</th>
              <th class="table-cell table-cell--header">Medication</th>
              <th class="table-cell table-cell--header">Quantity</th>
              <th class="table-cell table-cell--header">Status</th>
              <th class="table-cell table-cell--header table-cell--secondary">Created</th>
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
 * Renders the low-stock medications table.
 * @param {Array} meds
 * @returns {string}
 */
export function renderLowStockAlerts(meds) {
  const lowStockMeds = meds.filter((m) => m.status !== "ok");

  const rows = lowStockMeds
    .map(
      (med) => `
    <tr class="table-row">
      <td class="table-cell"><strong>${med.name}</strong></td>
      <td class="table-cell"><code>${med.currentStock}</code></td>
      <td class="table-cell"><code>${med.lowStockThreshold}</code></td>
      <td class="table-cell">${renderStatusBadge(med.status)}</td>
      <td class="table-cell table-cell--secondary">${med.unit}</td>
    </tr>
  `
    )
    .join("");

  return `
    <article class="card table-card">
      <div class="table-card__header">
        <h3 class="table-card__title">Low Stock Alerts</h3>
      </div>
      <div class="table-card__body">
        <table class="table" role="grid" aria-label="Low stock medications">
          <thead class="table-head">
            <tr class="table-row table-row--header">
              <th class="table-cell table-cell--header">Medication</th>
              <th class="table-cell table-cell--header">Current</th>
              <th class="table-cell table-cell--header">Threshold</th>
              <th class="table-cell table-cell--header">Status</th>
              <th class="table-cell table-cell--header table-cell--secondary">Unit</th>
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
 * Renders the complete Pharmacy Dashboard page.
 * @returns {string}
 */
export function renderPharmacyDashboard() {
  return `
    <main class="content" id="main-content">
      <section class="dashboard-section">
        <div id="pharmacy-kpi-row">${renderKpiRow([])}</div>
      </section>

      <section class="dashboard-section">
        <div class="dashboard-grid dashboard-grid--2col">
          <div id="pharmacy-prescription-queue">${renderPrescriptionQueue([])}</div>
          <div id="pharmacy-low-stock-alerts">${renderLowStockAlerts([])}</div>
        </div>
      </section>
    </main>
  `;
}

export async function initPharmacyDashboard() {
  // Load KPI cards
  const kpis = await getPharmacyKpis();
  const kpiContainer = document.getElementById("pharmacy-kpi-row");
  if (kpiContainer) {
    kpiContainer.innerHTML = renderKpiRow(kpis);
  }

  const prescriptions = await getPrescriptionQueue();
  const lowStock = await getLowStockMedications();

  const prescriptionContainer = document.getElementById("pharmacy-prescription-queue");
  if (prescriptionContainer) {
    prescriptionContainer.innerHTML = renderPrescriptionQueue(prescriptions);
  }

  const lowStockContainer = document.getElementById("pharmacy-low-stock-alerts");
  if (lowStockContainer) {
    lowStockContainer.innerHTML = renderLowStockAlerts(lowStock);
  }
}
