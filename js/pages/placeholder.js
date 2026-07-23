/**
 * MedFlow — Placeholder page for routes not yet implemented.
 */

import { icons } from "../mock-data.js";

/**
 * Renders a Phase 2 placeholder for nav pages without content yet.
 * @param {string|null} pageLabel
 * @returns {string}
 */
export function renderPlaceholderPage(pageLabel = null) {
  const title = pageLabel
    ? `${pageLabel} — Coming in Phase 2`
    : "Welcome to MedFlow";
  const text = pageLabel
    ? "Dashboard content, charts, and data tables will be built in the next phase. The app shell is ready for backend integration."
    : "Select a page from the sidebar to get started. Phase 1 provides the layout shell only.";

  return `
    <main class="content" id="main-content">
      <div class="content__placeholder card card--ghost">
        <div class="content__placeholder-icon" aria-hidden="true">
          ${icons.layout}
        </div>
        <h2 class="content__placeholder-title">${title}</h2>
        <p class="content__placeholder-text">
          ${text}
        </p>
        <p class="content__placeholder-hint">
          Phase 2 will add dashboard KPIs, charts, tables, and page-specific content.
        </p>
      </div>
    </main>
  `;
}
