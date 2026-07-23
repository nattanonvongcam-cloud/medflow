# MedFlow

A **Clinic Management System** dashboard built as a university Database Systems course project. MedFlow is an internal staff tool for clinic operations — not a public-facing hospital website.

## Phase 1 — App Shell (Current)

Phase 1 delivers the UI foundation only: design system, layout shell, sidebar navigation, and top bar. No dashboard content, database, or authentication yet.

### Tech Stack

- HTML, CSS, JavaScript (vanilla)
- No frameworks or build tools
- Deployed on [Vercel](https://vercel.com)

### Folder Structure

```
MedFlow/
├── index.html              # Entry point
├── css/
│   ├── variables.css       # Design tokens (colors, typography, spacing)
│   ├── base.css            # Reset and typography defaults
│   ├── components.css      # Reusable UI components
│   └── layout.css          # App shell layout (sidebar, topbar, content)
├── js/
│   ├── app.js              # App initialization and shell mounting
│   ├── nav.js              # Sidebar rendering and navigation logic
│   └── mock-data.js        # Mock data simulating future API responses
├── assets/                 # Icons and images (reserved)
└── README.md
```

### Getting Started

Serve locally with any static file server:

```bash
# Python
python -m http.server 3000

# Node (npx)
npx serve .
```

Open `http://localhost:3000` in your browser.

### Design Direction

- Premium SaaS aesthetic (Linear, Vercel, Stripe-inspired)
- Dark theme with emerald green accent
- Layered backgrounds, rounded cards, soft shadows
- Desktop-first, responsive down to tablet/mobile

## Roadmap

| Phase | Scope |
|-------|-------|
| **1** | App shell, design system, navigation *(current)* |
| **2** | Dashboard content — KPIs, charts, tables |
| **3** | Database, ER diagrams, SQL, CRUD |
| **4** | Authentication and role-based access (Admin, Doctor, Receptionist, Patient) |

## Architecture Notes

- **Mock data first:** All dynamic content lives in `js/mock-data.js`. When the backend is ready, replace exports with `fetch()` calls — the rendering layer stays the same.
- **Component tokens:** CSS custom properties in `variables.css` drive the entire design system. Extend tokens before adding one-off styles.
- **Navigation:** `nav.js` handles section collapse, expandable sub-menus, and active states. Page routing can be added in Phase 2 via hash or history API.

## License

University course project — internal use.
