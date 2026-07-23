/**
 * MedFlow — Application entry point
 * Initializes the app shell and top bar from mock data.
 */

import {
  user,
  clinic,
  greeting,
  icons,
  notifications,
  searchConfig,
  getFormattedDate,
  getGreetingPeriod,
  getGreetingIcon,
} from "./mock-data.js";

import { renderSidebar, initNavigation } from "./nav.js";
import { renderPlaceholderPage } from "./pages/placeholder.js";

/**
 * Renders the top bar with greeting, search, and user actions.
 * @returns {string}
 */
function renderTopbar() {
  const period = getGreetingPeriod();
  const greetingText = greeting.messages[period];

  return `
    <header class="topbar" id="topbar">
      <div class="topbar__greeting">
        <h1 class="topbar__greeting-title">
          <span class="topbar__greeting-icon" aria-hidden="true">${getGreetingIcon(period)}</span>
          ${greetingText}, ${user.name}
        </h1>
        <div class="topbar__greeting-meta">
          <span>${getFormattedDate()}</span>
          <span aria-hidden="true">·</span>
          <span>${clinic.ward}</span>
          <span class="badge badge--live">
            <span class="badge__dot" aria-hidden="true"></span>
            Live Monitoring
          </span>
        </div>
      </div>

      <div class="topbar__actions">
        <label class="input topbar__search" aria-label="Search">
          <span class="input__icon" aria-hidden="true">${icons.search}</span>
          <input
            type="search"
            class="input__field"
            placeholder="${searchConfig.placeholder}"
            autocomplete="off"
          />
          <kbd class="input__shortcut">${searchConfig.shortcut}</kbd>
        </label>

        <div class="topbar__divider" aria-hidden="true"></div>

        <button type="button" class="icon-btn" aria-label="Notifications">
          <span aria-hidden="true">${icons.bell}</span>
          ${
            notifications.unreadCount > 0
              ? `<span class="icon-btn__badge" aria-label="${notifications.unreadCount} unread notifications"></span>`
              : ""
          }
        </button>

        <div class="user-chip" role="button" tabindex="0" aria-label="User menu">
          <div class="avatar avatar--lg">${user.initials}</div>
          <div class="user-chip__info">
            <span class="user-chip__name">${user.name}</span>
            <span class="user-chip__role">${user.role}</span>
          </div>
        </div>
      </div>
    </header>
  `;
}

/**
 * Renders the main content placeholder area.
 * @returns {string}
 */
function renderContent() {
  return renderPlaceholderPage();
}

/**
 * Builds and mounts the application shell into the DOM.
 */
function mountApp() {
  const root = document.getElementById("app");
  if (!root) return;

  root.innerHTML = `
    ${renderSidebar()}
    <div class="main">
      ${renderTopbar()}
      ${renderContent()}
    </div>
  `;
}

/**
 * Initializes keyboard shortcut for search focus.
 */
function initSearchShortcut() {
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      event.preventDefault();
      const searchInput = document.querySelector(".topbar__search .input__field");
      searchInput?.focus();
    }
  });
}

/**
 * Application bootstrap.
 */
function init() {
  mountApp();
  initNavigation();
  initSearchShortcut();
}

document.addEventListener("DOMContentLoaded", init);
