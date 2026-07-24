/**
 * MedFlow — Sidebar navigation module
 * Renders nav from mock data and handles interactions.
 */

import {
  navSections,
  icons,
  user,
  clinic,
} from "./mock-data.js";
import { renderPlaceholderPage } from "./pages/placeholder.js";
import { renderAdminDashboard, initAdminDashboard } from "./pages/dashboard.js";
import { renderDoctorDashboard, initDoctorDashboard } from "./pages/doctor-dashboard.js";
import { renderReceptionDashboard, initReceptionDashboard } from "./pages/reception-dashboard.js";
import { renderPharmacyDashboard, initPharmacyDashboard } from "./pages/pharmacy-dashboard.js";
import { renderPatientsPage, initPatientsPage } from "./pages/patients.js";

let activeItemId = "admin-dashboard";
let activeParentId = "dashboard";

/**
 * Renders a badge element for a nav item.
 * @param {{ type: string, value?: number }} badge
 * @returns {string}
 */
function renderBadge(badge) {
  if (!badge) return "";

  if (badge.type === "count") {
    return `<span class="badge badge--count">${badge.value}</span>`;
  }

  if (badge.type === "dot") {
    return `<span class="badge badge--dot-only" aria-label="New"></span>`;
  }

  return "";
}

/**
 * Renders sub-navigation items.
 * @param {Array} children
 * @param {string} parentId
 * @param {boolean} isOpen
 * @returns {string}
 */
function renderSubItems(children, parentId, isOpen) {
  if (!children?.length) return "";

  const items = children
    .map(
      (child) => `
      <button
        type="button"
        class="nav-subitem${child.active || activeItemId === child.id ? " nav-subitem--active" : ""}"
        data-nav-id="${child.id}"
        data-nav-parent="${parentId}"
        aria-current="${activeItemId === child.id ? "page" : "false"}"
      >
        <span class="nav-subitem__dot" aria-hidden="true"></span>
        <span>${child.label}</span>
      </button>
    `
    )
    .join("");

  return `
    <div class="nav-sublist${isOpen ? " nav-sublist--open" : ""}" data-sublist="${parentId}">
      ${items}
    </div>
  `;
}

/**
 * Renders a single nav item.
 * @param {object} item
 * @returns {string}
 */
function renderNavItem(item) {
  const isActive =
    item.active ||
    activeItemId === item.id ||
    (item.children?.some((c) => c.id === activeItemId));

  const hasChildren = item.expandable && item.children?.length;
  const isExpanded = item.expanded || item.children?.some((c) => c.id === activeItemId);

  return `
    <div class="nav-item-group" data-nav-group="${item.id}">
      <button
        type="button"
        class="nav-item${isActive ? " nav-item--active" : ""}"
        data-nav-id="${item.id}"
        data-nav-expandable="${hasChildren ? "true" : "false"}"
        aria-expanded="${hasChildren ? isExpanded : undefined}"
        aria-current="${!hasChildren && activeItemId === item.id ? "page" : "false"}"
      >
        <span class="nav-item__icon" aria-hidden="true">${icons[item.icon] || ""}</span>
        <span class="nav-item__label">${item.label}</span>
        <span class="nav-item__badges">
          ${renderBadge(item.badge)}
          ${
            hasChildren
              ? `<span class="nav-item__chevron${isExpanded ? " nav-item__chevron--open" : ""}" aria-hidden="true">${icons.chevron}</span>`
              : ""
          }
        </span>
      </button>
      ${hasChildren ? renderSubItems(item.children, item.id, isExpanded) : ""}
    </div>
  `;
}

/**
 * Renders a nav section with collapsible header.
 * @param {object} section
 * @returns {string}
 */
function renderNavSection(section) {
  return `
    <div class="nav-section" data-section-id="${section.id}">
      <button
        type="button"
        class="nav-section__header"
        data-section-toggle="${section.id}"
        aria-expanded="${!section.collapsed}"
      >
        <span class="nav-section__title">${section.label}</span>
        <span class="nav-section__toggle${section.collapsed ? " nav-section__toggle--collapsed" : ""}" aria-hidden="true">
          ${icons.chevron}
        </span>
      </button>
      <div
        class="nav-section__items${section.collapsed ? " nav-section__items--collapsed" : ""}"
        data-section-items="${section.id}"
        style="max-height: ${section.collapsed ? "0" : "500px"}"
      >
        ${section.items.map(renderNavItem).join("")}
      </div>
    </div>
  `;
}

/**
 * Renders the complete sidebar navigation.
 * @returns {string}
 */
export function renderSidebar() {
  return `
    <aside class="sidebar" id="sidebar" aria-label="Main navigation">
      <div class="sidebar__header">
        <div class="sidebar__logo" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        </div>
        <div class="sidebar__brand">
          <span class="sidebar__brand-name">${clinic.name}</span>
          <span class="sidebar__brand-tagline">${clinic.tagline}</span>
        </div>
      </div>

      <nav class="sidebar__nav" id="sidebar-nav">
        ${navSections.map(renderNavSection).join("")}
      </nav>

      <div class="sidebar__footer">
        <div class="sidebar__user" role="button" tabindex="0" aria-label="User profile">
          <div class="avatar">${user.initials}</div>
          <div class="sidebar__user-info">
            <div class="sidebar__user-name">${user.name}</div>
            <div class="sidebar__user-role">${user.role}</div>
          </div>
        </div>
      </div>
    </aside>
  `;
}

/**
 * Clears active states from all nav elements.
 */
function clearActiveStates() {
  document.querySelectorAll(".nav-item--active").forEach((el) => {
    el.classList.remove("nav-item--active");
  });
  document.querySelectorAll(".nav-subitem--active").forEach((el) => {
    el.classList.remove("nav-subitem--active");
  });
}

/**
 * Sets active state on a nav item or sub-item.
 * @param {string} itemId
 * @param {string|null} parentId
 */
function setActiveItem(itemId, parentId = null) {
  activeItemId = itemId;
  activeParentId = parentId;

  clearActiveStates();

  const subItem = document.querySelector(`[data-nav-id="${itemId}"].nav-subitem`);
  if (subItem) {
    subItem.classList.add("nav-subitem--active");
    subItem.setAttribute("aria-current", "page");

    const parentBtn = document.querySelector(
      `[data-nav-group="${parentId}"] > .nav-item`
    );
    if (parentBtn) {
      parentBtn.classList.add("nav-item--active");
    }
    return;
  }

  const navItem = document.querySelector(
    `[data-nav-id="${itemId}"].nav-item`
  );
  if (navItem) {
    navItem.classList.add("nav-item--active");
    navItem.setAttribute("aria-current", "page");
  }
}

/**
 * Toggles expandable nav item sub-list.
 * @param {string} itemId
 */
function toggleNavExpand(itemId) {
  const group = document.querySelector(`[data-nav-group="${itemId}"]`);
  if (!group) return;

  const btn = group.querySelector(".nav-item");
  const sublist = group.querySelector(".nav-sublist");
  const chevron = group.querySelector(".nav-item__chevron");

  if (!sublist) return;

  const isOpen = sublist.classList.toggle("nav-sublist--open");
  chevron?.classList.toggle("nav-item__chevron--open", isOpen);
  btn?.setAttribute("aria-expanded", String(isOpen));
}

/**
 * Toggles nav section collapse.
 * @param {string} sectionId
 */
function toggleSection(sectionId) {
  const section = document.querySelector(`[data-section-id="${sectionId}"]`);
  if (!section) return;

  const items = section.querySelector("[data-section-items]");
  const toggle = section.querySelector(".nav-section__toggle");
  const header = section.querySelector(".nav-section__header");

  if (!items) return;

  const isCollapsed = items.classList.toggle("nav-section__items--collapsed");
  toggle?.classList.toggle("nav-section__toggle--collapsed", isCollapsed);
  header?.setAttribute("aria-expanded", String(!isCollapsed));
  items.style.maxHeight = isCollapsed ? "0" : "500px";

  const sectionData = navSections.find((s) => s.id === sectionId);
  if (sectionData) sectionData.collapsed = isCollapsed;
}

/** Nav item ids that render a full page module instead of the placeholder. */
const PAGE_RENDERERS = {
  "admin-dashboard": () => renderAdminDashboard(),
  "doctor-dashboard": () => renderDoctorDashboard(),
  "reception-dashboard": () => renderReceptionDashboard(),
  "pharmacy-dashboard": () => renderPharmacyDashboard(),
  patients: () => renderPatientsPage(),
};

/**
 * Swaps main content based on selected nav item.
 * @param {string} itemId
 */
const PAGE_INIT_HANDLERS = {
  "admin-dashboard": initAdminDashboard,
  "doctor-dashboard": initDoctorDashboard,
  "reception-dashboard": initReceptionDashboard,
  "pharmacy-dashboard": initPharmacyDashboard,
  patients: initPatientsPage,
};

function updateMainContent(itemId) {
  const main = document.getElementById("main-content");
  if (!main) return;

  const renderPage = PAGE_RENDERERS[itemId];
  if (renderPage) {
    main.outerHTML = renderPage();
    PAGE_INIT_HANDLERS[itemId]?.();
    return;
  }

  main.outerHTML = renderPlaceholderPage(findNavLabel(itemId));
}

/**
 * Finds nav item label by id across all sections.
 * @param {string} itemId
 * @returns {string|null}
 */
function findNavLabel(itemId) {
  for (const section of navSections) {
    for (const item of section.items) {
      if (item.id === itemId) return item.label;
      if (item.children) {
        const child = item.children.find((c) => c.id === itemId);
        if (child) return child.label;
      }
    }
  }
  return null;
}

/**
 * Binds all sidebar navigation event listeners.
 */
export function initNavigation() {
  const nav = document.getElementById("sidebar-nav");
  if (!nav) return;

  nav.addEventListener("click", (event) => {
    const sectionToggle = event.target.closest("[data-section-toggle]");
    if (sectionToggle) {
      toggleSection(sectionToggle.dataset.sectionToggle);
      return;
    }

    const subItem = event.target.closest(".nav-subitem");
    if (subItem) {
      setActiveItem(subItem.dataset.navId, subItem.dataset.navParent);
      updateMainContent(subItem.dataset.navId);
      return;
    }

    const navItem = event.target.closest(".nav-item");
    if (!navItem) return;

    const itemId = navItem.dataset.navId;
    const isExpandable = navItem.dataset.navExpandable === "true";

    if (isExpandable) {
      toggleNavExpand(itemId);
    } else {
      setActiveItem(itemId);
      updateMainContent(itemId);
    }
  });

  updateMainContent(activeItemId);
}

export function getActiveNavId() {
  return activeItemId;
}
