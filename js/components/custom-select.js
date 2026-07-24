import { icons } from "../mock-data.js";

let customSelectsInitialized = false;
let documentClickHandler = null;
let documentKeydownHandler = null;

function getSelectOptions(selectRoot) {
  return Array.from(selectRoot.querySelectorAll("[data-custom-select-option]"));
}

function getSelectedOption(selectRoot) {
  const options = getSelectOptions(selectRoot);
  return options.find((option) => option.dataset.value === selectRoot.querySelector("[data-custom-select-input]")?.value) || options[0];
}

function setHighlighted(selectRoot, index) {
  const options = getSelectOptions(selectRoot);
  const safeIndex = Math.max(0, Math.min(index, options.length - 1));
  options.forEach((option, optionIndex) => {
    const isHighlighted = optionIndex === safeIndex;
    option.classList.toggle("custom-select__option--highlighted", isHighlighted);
    option.setAttribute("aria-selected", String(isHighlighted));
  });
  return safeIndex;
}

function syncSelection(selectRoot) {
  const input = selectRoot.querySelector("[data-custom-select-input]");
  const trigger = selectRoot.querySelector("[data-custom-select-trigger]");
  const valueLabel = trigger?.querySelector(".custom-select__value");
  const options = getSelectOptions(selectRoot);
  const selectedOption = options.find((option) => option.dataset.value === input?.value) || options[0];

  options.forEach((option) => {
    const isSelected = option === selectedOption;
    option.classList.toggle("custom-select__option--selected", isSelected);
    option.setAttribute("aria-selected", String(isSelected));
  });

  if (valueLabel && selectedOption) {
    valueLabel.textContent = selectedOption.textContent.trim();
  }
}

function openSelect(selectRoot) {
  const panel = selectRoot.querySelector("[data-custom-select-panel]");
  const trigger = selectRoot.querySelector("[data-custom-select-trigger]");
  if (!panel || !trigger) return;

  closeAllCustomSelects(selectRoot);
  panel.hidden = false;
  trigger.setAttribute("aria-expanded", "true");
  selectRoot.classList.add("custom-select--open");
  const selectedIndex = getSelectedOption(selectRoot) ? getSelectOptions(selectRoot).indexOf(getSelectedOption(selectRoot)) : 0;
  setHighlighted(selectRoot, selectedIndex >= 0 ? selectedIndex : 0);
}

function closeSelect(selectRoot) {
  const panel = selectRoot.querySelector("[data-custom-select-panel]");
  const trigger = selectRoot.querySelector("[data-custom-select-trigger]");
  if (!panel || !trigger) return;

  panel.hidden = true;
  trigger.setAttribute("aria-expanded", "false");
  selectRoot.classList.remove("custom-select--open");
}

export function closeAllCustomSelects(excludeRoot = null) {
  const selects = Array.from(document.querySelectorAll("[data-custom-select]"));
  selects.forEach((selectRoot) => {
    if (selectRoot !== excludeRoot) {
      closeSelect(selectRoot);
    }
  });
}

function selectOption(selectRoot, optionElement) {
  const input = selectRoot.querySelector("[data-custom-select-input]");
  if (!input || !optionElement) return;

  input.value = optionElement.dataset.value || "";
  syncSelection(selectRoot);
  const event = new Event("change", { bubbles: true });
  input.dispatchEvent(event);
  closeSelect(selectRoot);
}

function bindCustomSelect(selectRoot) {
  const trigger = selectRoot.querySelector("[data-custom-select-trigger]");
  const panel = selectRoot.querySelector("[data-custom-select-panel]");
  const options = getSelectOptions(selectRoot);

  if (!trigger || !panel) return;

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeSelect(selectRoot);
    } else {
      openSelect(selectRoot);
    }
  });

  options.forEach((option) => {
    option.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      selectOption(selectRoot, option);
    });

    option.addEventListener("mouseenter", () => {
      const optionIndex = options.indexOf(option);
      setHighlighted(selectRoot, optionIndex);
    });

    option.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        const currentIndex = options.indexOf(option);
        setHighlighted(selectRoot, currentIndex + 1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        const currentIndex = options.indexOf(option);
        setHighlighted(selectRoot, currentIndex - 1);
      } else if (event.key === "Enter") {
        event.preventDefault();
        selectOption(selectRoot, option);
      } else if (event.key === "Escape") {
        event.preventDefault();
        closeSelect(selectRoot);
        trigger.focus();
      }
    });
  });

  trigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openSelect(selectRoot);
      const selectedIndex = getSelectedOption(selectRoot) ? getSelectOptions(selectRoot).indexOf(getSelectedOption(selectRoot)) : 0;
      setHighlighted(selectRoot, selectedIndex + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openSelect(selectRoot);
      const selectedIndex = getSelectedOption(selectRoot) ? getSelectOptions(selectRoot).indexOf(getSelectedOption(selectRoot)) : 0;
      setHighlighted(selectRoot, selectedIndex - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const isOpen = trigger.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        const highlightedOption = panel.querySelector(".custom-select__option--highlighted");
        if (highlightedOption) {
          selectOption(selectRoot, highlightedOption);
        }
      } else {
        openSelect(selectRoot);
      }
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeSelect(selectRoot);
    }
  });

  syncSelection(selectRoot);
}

export function renderCustomSelect({ id, name, label, options, selected, inputAttributes = {} }) {
  const normalizedOptions = Array.isArray(options) ? options : [];
  const selectedValue = normalizedOptions.some((option) => option.value === selected) ? selected : normalizedOptions[0]?.value || "";
  const selectedOption = normalizedOptions.find((option) => option.value === selectedValue) || normalizedOptions[0] || { label: "", value: "" };

  const inputAttributesMarkup = Object.entries(inputAttributes)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}="${String(value)}"`)
    .join(" ");

  const optionMarkup = normalizedOptions
    .map((option) => {
      const isSelected = option.value === selectedValue;
      return `
        <button
          type="button"
          class="custom-select__option${isSelected ? " custom-select__option--selected" : ""}"
          role="option"
          aria-selected="${isSelected}"
          data-custom-select-option
          data-value="${option.value}"
        >
          ${option.label}
        </button>
      `;
    })
    .join("");

  return `
    <div class="custom-select" data-custom-select>
      <input type="hidden" ${name ? `name="${name}"` : ""} value="${selectedValue}" data-custom-select-input ${inputAttributesMarkup} />
      <button
        type="button"
        class="custom-select__trigger input"
        id="${id}"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-label="${label}"
        data-custom-select-trigger
      >
        <span class="input__field custom-select__value">${selectedOption.label}</span>
        <span class="input__icon" aria-hidden="true">${icons.chevron}</span>
      </button>
      <div class="custom-select__panel" role="listbox" aria-label="${label}" hidden data-custom-select-panel>
        ${optionMarkup}
      </div>
    </div>
  `;
}

export function initCustomSelects(container = document) {
  const root = container && typeof container.querySelectorAll === "function" ? container : document;
  const selectRoots = Array.from(root.querySelectorAll("[data-custom-select]"));

  if (!selectRoots.length) {
    return;
  }

  if (!customSelectsInitialized) {
    documentClickHandler = (event) => {
      if (!event.target.closest("[data-custom-select]")) {
        closeAllCustomSelects();
      }
    };

    documentKeydownHandler = (event) => {
      if (event.key === "Escape") {
        const openSelect = document.querySelector("[data-custom-select].custom-select--open");
        if (openSelect) {
          closeSelect(openSelect);
          openSelect.querySelector("[data-custom-select-trigger]")?.focus();
        }
      }
    };

    document.addEventListener("click", documentClickHandler);
    document.addEventListener("keydown", documentKeydownHandler);
    customSelectsInitialized = true;
  }

  selectRoots.forEach((selectRoot) => {
    bindCustomSelect(selectRoot);
  });
}
