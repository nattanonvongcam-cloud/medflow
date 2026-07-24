# MedFlow

MedFlow is a clinic management UI built as a vanilla HTML, CSS, and JavaScript project. It is designed as an internal staff dashboard for hospital operations and is intentionally implemented as a static site with no frameworks or build tooling.

## Current Status

The project now includes a polished dark-theme interface with:

- An Admin Dashboard with KPI cards, charts, and a priority patient queue
- A Patients page with a searchable patient directory table
- Sidebar navigation for multiple dashboard views
- Glass-style cards and updated visual polish

## Tech Stack

- HTML, CSS, JavaScript (vanilla)
- No frameworks, no npm packages, no build tools
- Static deployment on [Vercel](https://vercel.com)

## Project Structure

```text
MedFlow/
├── index.html                # Entry point
├── css/
│   ├── variables.css         # Design tokens and theme values
│   ├── base.css              # Reset and base typography
│   ├── components.css        # Reusable UI components
│   └── layout.css            # App shell layout
├── js/
│   ├── app.js                # App initialization
│   ├── nav.js                # Sidebar rendering and page switching
│   ├── mock-data.js          # Mock data for dashboards and patients
│   └── pages/
│       ├── dashboard.js
│       ├── doctor-dashboard.js
│       ├── reception-dashboard.js
│       ├── pharmacy-dashboard.js
│       └── patients.js
├── assets/                   # Reserved for icons and images
└── README.md
```

## Getting Started

Run the site locally with any static file server:

```bash
# Python
python -m http.server 8000

# or
py -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Design Direction

- Premium SaaS-inspired dark UI
- Emerald green accent color
- Rounded glass-style cards and layered surfaces
- Desktop-first layout with responsive behavior

## Roadmap

| Phase | Scope |
|-------|-------|
| **1** | App shell, design system, navigation |
| **2** | Dashboard content, patient directory, and UI polish |
| **3** | Data integration, ER diagrams, SQL, and CRUD workflows *(in progress)* |
| **4** | Authentication and role-based access |

## Architecture Notes

- Mock data lives in js/mock-data.js and is used to render the current UI.
- Page rendering follows the existing template-based pattern in the js/pages modules.
- Navigation is handled in js/nav.js with simple client-side page swaps.

## License

University course project — internal use only.
