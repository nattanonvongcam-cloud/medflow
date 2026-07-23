/**
 * MedFlow — Reception Dashboard page
 * Renders KPI cards, check-in queue, and appointment status from mock data.
 */

import {
  icons,
  receptionDashboardData,
  receptionKpis,
  receptionCheckInQueue,
  receptionAppointmentStatus,
} from "../mock-data.js";

const STATUS_BADGE_MAP = {
  pending: "badge--warning",
  "checked-in": "badge--success",
  registered: "badge--info",
  waiting: "badge--warning",
  "in-room": "badge--accent",
  completed: "badge--success",
};

const STATUS_LABEL_MAP = {
  pending: "Pending",
  "checked-in": "Checked In",
  registered: "Registered",
  waiting: "Waiting",
  "in-room": "In-Room",
  completed: "Completed",
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
 * Renders the check-in queue table.
 * @param {Array} queue
 * @returns {string}
 */
export function renderCheckInQueue(queue) {
  const rows = queue
    .map(
      (item) => `
    <tr class="table-row">
      <td class="table-cell"><strong>${item.patientName}</strong></td>
      <td class="table-cell"><code>${item.checkInTime}</code></td>
      <td class="table-cell"><code>${item.appointmentTime}</code></td>
      <td class="table-cell">${item.appointmentType}</td>
      <td class="table-cell">${renderStatusBadge(item.status)}</td>
    </tr>
  `
    )
    .join("");

  return `
    <article class="card table-card">
      <div class="table-card__header">
        <h3 class="table-card__title">Check-In Queue</h3>
      </div>
      <div class="table-card__body">
        <table class="table" role="grid" aria-label="Check-in queue">
          <thead class="table-head">
            <tr class="table-row table-row--header">
              <th class="table-cell table-cell--header">Patient</th>
              <th class="table-cell table-cell--header">Checked In</th>
              <th class="table-cell table-cell--header">Appointment</th>
              <th class="table-cell table-cell--header">Type</th>
              <th class="table-cell table-cell--header">Status</th>
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
 * Builds SVG arc path for a donut segment.
 * @param {number} cx
 * @param {number} cy
 * @param {number} radius
 * @param {number} startAngle
 * @param {number} endAngle
 * @returns {string}
 */
function describeArc(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArc,
    0,
    end.x,
    end.y,
  ].join(" ");
}

/**
 * @param {number} cx
 * @param {number} cy
 * @param {number} radius
 * @param {number} angleDeg
 * @returns {{ x: number, y: number }}
 */
function polarToCartesian(cx, cy, radius, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

/**
 * Renders donut chart for appointment status breakdown.
 * @param {Array} segments
 * @returns {string}
 */
export function renderAppointmentStatusDonut(segments) {
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 58;
  const strokeWidth = 18;

  const total = segments.reduce((sum, seg) => sum + seg.value, 0);
  let currentAngle = 0;

  const arcs = segments.map((seg) => {
    const sliceAngle = (seg.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle - 0.5;
    currentAngle += sliceAngle;

    if (seg.value === 0) return "";

    return `
      <path
        d="${describeArc(cx, cy, radius, startAngle, endAngle)}"
        fill="none"
        stroke="${seg.color}"
        stroke-width="${strokeWidth}"
        stroke-linecap="butt"
        aria-label="${seg.label}: ${seg.value}"
      />
    `;
  }).join("");

  const legend = segments
    .map(
      (seg) => `
      <div class="donut-legend-item">
        <span class="donut-legend-item__label">
          <span class="donut-legend-item__swatch" style="background: ${seg.color}"></span>
          ${seg.label}
        </span>
        <span class="donut-legend-item__value">${seg.value}</span>
      </div>
    `
    )
    .join("");

  return `
    <article class="card chart-card">
      <div class="chart-card__header">
        <h3 class="chart-card__title">Appointment Status</h3>
      </div>
      <div class="chart-card__body">
        <div class="donut-chart">
          <div class="donut-chart__svg-wrap">
            <svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Appointment status breakdown donut chart">
              <title>Appointment status breakdown</title>
              ${arcs}
              <text class="donut-chart__center-value" x="${cx}" y="${cy - 2}" text-anchor="middle" dominant-baseline="middle">${total}</text>
              <text class="donut-chart__center-label" x="${cx}" y="${cy + 14}" text-anchor="middle">Total</text>
            </svg>
          </div>
          <div class="donut-chart__legend">${legend}</div>
        </div>
      </div>
    </article>
  `;
}

/**
 * Renders the complete Reception Dashboard page.
 * @returns {string}
 */
export function renderReceptionDashboard() {
  return `
    <main class="content" id="main-content">
      <section class="dashboard-section">
        ${renderKpiRow(receptionKpis)}
      </section>

      <section class="dashboard-section">
        <div class="dashboard-grid dashboard-grid--2col">
          ${renderCheckInQueue(receptionCheckInQueue)}
          ${renderAppointmentStatusDonut(receptionAppointmentStatus)}
        </div>
      </section>
    </main>
  `;
}
