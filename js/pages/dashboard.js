/**
 * MedFlow — Admin Dashboard page
 * Renders KPI cards, SVG charts, and priority patient table from mock data.
 */

import {
  icons,
  dashboardKpis,
  weeklyAdmissions,
} from "../mock-data.js";
import { getPatientStatusBreakdown, getPriorityPatientQueue } from "../db/queries.js";

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
 * Renders the KPI row from an array of KPI objects.
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
 * Renders grouped bar chart SVG for weekly admissions.
 * @param {object} data
 * @returns {string}
 */
export function renderWeeklyAdmissionsChart(data) {
  const width = 480;
  const height = 220;
  const padding = { top: 12, right: 12, bottom: 32, left: 36 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const allValues = data.series.flatMap((s) => s.values);
  const maxValue = Math.max(...allValues, 1);
  const yTicks = 4;
  const yStep = maxValue / yTicks;

  const groupCount = data.days.length;
  const groupWidth = chartWidth / groupCount;
  const barGap = 4;
  const barWidth = (groupWidth - barGap * 3) / data.series.length;

  const gridLines = Array.from({ length: yTicks + 1 }, (_, i) => {
    const y = padding.top + chartHeight - (i / yTicks) * chartHeight;
    const value = Math.round(i * yStep);
    return `
      <line class="bar-chart__grid-line" x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" />
      <text class="bar-chart__axis-label" x="${padding.left - 8}" y="${y + 4}" text-anchor="end">${value}</text>
    `;
  }).join("");

  const bars = data.days
    .map((day, dayIndex) => {
      const groupX = padding.left + dayIndex * groupWidth + barGap;
      const dayBars = data.series
        .map((series, seriesIndex) => {
          const value = series.values[dayIndex];
          const barHeight = (value / maxValue) * chartHeight;
          const x = groupX + seriesIndex * (barWidth + barGap);
          const y = padding.top + chartHeight - barHeight;
          return `
            <rect
              class="bar-chart__bar"
              x="${x.toFixed(1)}"
              y="${y.toFixed(1)}"
              width="${barWidth.toFixed(1)}"
              height="${barHeight.toFixed(1)}"
              rx="3"
              fill="${series.color}"
              aria-label="${series.label} ${day}: ${value}"
            />
          `;
        })
        .join("");

      const labelX = padding.left + dayIndex * groupWidth + groupWidth / 2;
      const labelY = height - 8;

      return `
        ${dayBars}
        <text class="bar-chart__axis-label" x="${labelX}" y="${labelY}" text-anchor="middle">${day}</text>
      `;
    })
    .join("");

  const legend = data.series
    .map(
      (series) => `
      <span class="chart-legend-item">
        <span class="chart-legend-item__swatch" style="background: ${series.color}"></span>
        ${series.label}
      </span>
    `
    )
    .join("");

  return `
    <article class="card chart-card">
      <div class="chart-card__header">
        <h3 class="chart-card__title">Weekly Admissions</h3>
        <div class="chart-card__legend" aria-hidden="true">${legend}</div>
      </div>
      <div class="chart-card__body">
        <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Weekly admissions bar chart">
          <title>Weekly admissions: Emergency vs Scheduled</title>
          ${gridLines}
          ${bars}
        </svg>
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
 * Renders donut chart SVG for patient status breakdown.
 * @param {Array} segments
 * @returns {string}
 */
export function renderPatientStatusDonut(segments) {
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
        <h3 class="chart-card__title">Patient Status Breakdown</h3>
      </div>
      <div class="chart-card__body">
        <div class="donut-chart">
          <div class="donut-chart__svg-wrap">
            <svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Patient status breakdown donut chart">
              <title>Patient status breakdown</title>
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
 * Renders status badge for a patient row.
 * @param {string} status
 * @returns {string}
 */
function renderStatusBadge(status) {
  const badgeClass = STATUS_BADGE_MAP[status] || "badge--neutral";
  const label = STATUS_LABEL_MAP[status] || status;

  return `<span class="badge ${badgeClass}">${label}</span>`;
}

/**
 * Renders priority patient queue table.
 * @param {Array} patients
 * @returns {string}
 */
export function renderPriorityPatientTable(patients) {
  const rows = patients
    .map(
      (patient) => `
      <tr>
        <td class="dashboard-table__name">${patient.name}</td>
        <td>${patient.diagnosis}</td>
        <td>${renderStatusBadge(patient.status)}</td>
        <td>${patient.room}</td>
        <td class="dashboard-table__updated">${patient.lastUpdated}</td>
      </tr>
    `
    )
    .join("");

  return `
    <article class="card dashboard-table-card">
      <div class="dashboard-table-card__header">
        <h3 class="dashboard-table-card__title">Priority Patient Queue</h3>
        <span class="dashboard-table-card__count">${patients.length} patients</span>
      </div>
      <div class="dashboard-table-wrap">
        <table class="dashboard-table">
          <thead>
            <tr>
              <th scope="col">Patient</th>
              <th scope="col">Diagnosis</th>
              <th scope="col">Status</th>
              <th scope="col">Room / Ward</th>
              <th scope="col">Last Updated</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </article>
  `;
}

/**
 * Renders the full Admin Dashboard page.
 * @param {object} [data]
 * @param {Array} [data.kpis]
 * @param {object} [data.admissions]
 * @param {Array} [data.statusBreakdown]
 * @param {Array} [data.patientQueue]
 * @returns {string}
 */
export function renderAdminDashboard() {
  return `
    <main class="content dashboard" id="main-content">
      <header class="dashboard__header">
        <h2 class="dashboard__title">Admin Dashboard</h2>
        <p class="dashboard__subtitle">Real-time overview of clinic operations and patient flow</p>
      </header>

      ${renderKpiRow(dashboardKpis)}

      <section class="dashboard-charts" aria-label="Charts">
        ${renderWeeklyAdmissionsChart(weeklyAdmissions)}
        <article class="card chart-card" id="status-breakdown-card">
          <div class="chart-card__header">
            <h3 class="chart-card__title">Patient Status Breakdown</h3>
          </div>
          <div class="chart-card__body" id="status-breakdown-chart">
            Loading breakdown...
          </div>
        </article>
      </section>

      <div id="priority-queue-content">
        <article class="card dashboard-table-card">
          <div class="dashboard-table-card__header">
            <h3 class="dashboard-table-card__title">Priority Patient Queue</h3>
            <span class="dashboard-table-card__count">Loading…</span>
          </div>
          <div class="dashboard-table-wrap">
            <table class="dashboard-table">
              <thead>
                <tr>
                  <th scope="col">Patient</th>
                  <th scope="col">Diagnosis</th>
                  <th scope="col">Status</th>
                  <th scope="col">Room / Ward</th>
                  <th scope="col">Last Updated</th>
                </tr>
              </thead>
              <tbody id="priority-queue-body">
                <tr>
                  <td class="dashboard-table__empty" colspan="5">Loading queue...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </main>
  `;
}

export async function initAdminDashboard() {
  const breakdown = await getPatientStatusBreakdown();
  const statusSegments = breakdown.map((segment) => ({
    id: segment.id,
    label:
      segment.id === "critical"
        ? "Critical"
        : segment.id === "monitoring"
        ? "Monitoring"
        : segment.id === "stable"
        ? "Stable"
        : segment.id,
    value: Number(segment.value),
    color:
      segment.id === "critical"
        ? "var(--color-critical)"
        : segment.id === "monitoring"
        ? "var(--color-warning)"
        : segment.id === "stable"
        ? "var(--color-success)"
        : "var(--color-accent)",
  }));

  const breakdownContainer = document.getElementById("status-breakdown-chart");
  if (breakdownContainer) {
    breakdownContainer.innerHTML = renderPatientStatusDonut(statusSegments);
  }

  const queue = await getPriorityPatientQueue();
  const queueContainer = document.getElementById("priority-queue-content");
  if (queueContainer) {
    queueContainer.innerHTML = renderPriorityPatientTable(
      queue.map((patient) => ({
        ...patient,
        lastUpdated: patient.last_updated || patient.lastUpdated || "",
      }))
    );
  }
}
