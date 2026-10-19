# ShikshaNet – Education Programme Command Centre

> **Frontend Prototype for the Department of School Education, Government of Madhya Pradesh**
> Built with Next.js 14 (App Router), TypeScript (Strict), Tailwind CSS, Recharts, Zustand, and Lucide Icons.

---

## 🌟 Executive Overview

**ShikshaNet** is a state-of-the-art Education Programme Command Centre designed for high-level state executive monitoring, divisional oversight, field audits, and institutional compliance.

The prototype faithfully realizes all 8 screens and 5 user roles:
1. **Option 1 (Full Detail, Dark)** – Command Centre with 6 KPI cards, 52-district interactive SVG choropleth map with callouts & zoom, AI Priorities card with instant chat drawer, Programme Progress dual-axis chart, District Performance table, and Vendor Performance table.
2. **Option 1 (Compact Variant, Dark)** – Compact 6-tile KPI strip, focused map, top AI insights, monthly trend, and real-time update ticker.
3. **Option 2 (Programme Focus, Light)** – High-level ministerial programme overview with 6 scheme cards (PM SHRI, LEP, TLM Kits, Smart Classroom, Infrastructure, Robotics & STEM) displaying budget, awarded %, physical %, financial %, and at-risk counts.
4. **Option 3 (AI + Decisions Focus, Dark)** – Executive decision cockpit featuring AI summary bullets, purple-gradient "Ask Shiksha AI" with prompt chips, 7 key decisions with Approve/Review/Escalate confirmation modals, and a semicircle Programme Health gauge.
5. **Minister Screen (Light)** – Personalized ministerial dashboard with greeting, 4 macro stat tiles, MP heat map, top 5 districts needing attention, programme progress bars, and action items.
6. **Commissioner / SPD Screen (Light)** – Jabalpur District Dashboard with tehsil block map with interactive pins, 5 KPI tiles, programme breakdown, and 32 delayed schools list.
7. **Field Officer Inspection App (Mobile 390px, Phone Frame)** – Inspection checklist with bottom sheet status updates, photo strip with upload/delete, GPS telemetry verification (within 50m check), notes, and submission validation.
8. **Principal / Staff School App (Mobile 390px, Phone Frame)** – Institutional portal for Govt HSS Ranjhi with Smart Classroom phase status, next actions compliance queue, delivered assets register, and inspection timeline.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14.2.15 (App Router, Server Components + Client interactivity)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS with custom CSS variables for dark and light themes
- **State Management**: Zustand (`useFilterStore` for global filters, `useAppStore` for roles, layout variants, AI chat)
- **Data Visualizations**: Recharts (dual Y-axis ComposedChart, BarChart, Semicircle HealthGauge)
- **Map Engine**: Custom calibrated SVG polygon choropleth for all 52 districts of Madhya Pradesh with hover tooltips, callout tags, zoom/pan controls, and legend filtering.
- **Icons**: Lucide React
- **Theme**: `next-themes` (Dark mode default for Command Centre, light theme for Minister and Commissioner screens)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or [http://localhost:3001](http://localhost:3001) if port 3000 is occupied).

### 3. Production Build
```bash
npm run build
npm run start
```
*Note: All 21 routes build statically and dynamically with 0 TypeScript and 0 lint errors.*

---

## 🎛️ Key Configuration & Customization

### 1. Swapping Budget Constants
All high-level financial figures and KPI counters are centralized in `src/data/config.ts`:

```typescript
// src/data/config.ts
export const CONFIG = {
  TOTAL_BUDGET_CR: 500,               // Default for Option 1 Full Detail screen (₹500 Cr)
  TOTAL_AGGREGATE_BUDGET_CR: 2480,   // High-level aggregate for Option 2 & Minister screen (₹2,480 Cr)
  FY_LABEL: "FY 2026-27",
  TOTAL_SCHOOLS: 8420,
  OVERALL_PHYSICAL_PROGRESS: 74,
  OVERALL_FINANCIAL_PROGRESS: 68,
  DELAYED_PROJECTS: 287,
  AT_RISK_AMOUNT_CR: 31.4,
  NEED_ATTENTION_COUNT: 1140,
  TOTAL_DISTRICTS: 52,
};
```
To adjust the numbers across all screens consistently, modify `src/data/config.ts` or `src/lib/selectors.ts`.

### 2. Replacing or Updating the Madhya Pradesh GeoJSON / SVG Map
The MP District Map engine is defined in `src/data/mp-map-data.ts` and rendered by `src/components/map/MPMap.tsx`.
- **District Polygons & Centroids**: Defined in `MP_DISTRICT_SHAPES` with calibrated 800x540 coordinates.
- **Callout Anchors**: Defined in `MP_MAP_CALLOUTS` for Gwalior, Rewa, Ujjain, Bhopal, Indore, and Jabalpur.
- **To swap with external GeoJSON**:
  Place your TopoJSON/GeoJSON in `src/data/mp-districts.geojson` and bind `d3-geo` projection (`geoMercator().fitSize([800, 540], geojson)`) directly inside `MPMap.tsx`.

---

## 🧭 Navigation & Role Switcher

You can switch between any of the 5 user roles and 3 layout variants at any time:
- **Role Switcher**: Click the floating pill at the top of the screen ("View as: Principal Secretary | Minister | Commissioner/SPD | Field Officer | School Principal").
- **Layout Variant Toolbar**: (On Command Centre) toggle between:
  - `Option 1 – Map Focus` (Full Detail or Compact Density)
  - `Option 2 – Programme Focus` (Light Theme)
  - `Option 3 – AI + Decisions` (Dark Cockpit)
- **AI Assistant Drawer**: Click any suggested chip (e.g. *"Show delayed schools in Rewa"*, *"What should I review today?"*, *"Which vendors are underperforming?"*) or type any prompt in the input box to open the streaming AI drawer.

---

## 📁 Directory Structure

```
src/
├── app/
│   ├── layout.tsx                      # Root layout, Inter font, ThemeProvider
│   ├── page.tsx                        # Redirects to /command-centre
│   ├── not-found.tsx                   # 404 handler
│   ├── loading.tsx                     # Skeleton loader
│   ├── (dashboard)/                    # Dark Command Centre Shell
│   │   ├── layout.tsx                  # Sidebar + TopBar + Global AI Chat Drawer
│   │   ├── command-centre/page.tsx     # Reads ?variant=1|2|3 & ?density=compact
│   │   ├── programmes/                 # Programme listing & [id] detail page
│   │   ├── projects/                   # 60 projects table & [id] detail page
│   │   ├── schools/                    # Directory & [udise] detail page
│   │   ├── vendors/                    # Empanelled contractors & [id] detail page
│   │   ├── inspections/                # Scheduled/Completed/Incomplete (17) & [id]
│   │   ├── finance/                    # PFMS disbursements & release chart
│   │   ├── documents/                  # Circulars & mock upload handler
│   │   ├── ai-insights/                # Early warnings & anomaly feed
│   │   └── reports/                    # Executive briefings & PDF download modal
│   ├── (light)/                        # Light Theme Shell (Minister & Commissioner)
│   │   ├── layout.tsx                  # Light top-nav shell
│   │   ├── minister/page.tsx           # Minister Dashboard
│   │   └── commissioner/[district]/    # Jabalpur District Dashboard
│   └── (mobile)/                       # PhoneFrame Wrapper for Mobile App Views
│       ├── layout.tsx                  # iPhone frame wrapper
│       ├── field/inspection/[schoolId] # Field Officer inspection audit
│       └── school/[udise]              # Principal compliance app
├── components/
│   ├── ai/                             # AiPriorities, ChatDrawer
│   ├── charts/                         # ProgramProgressChart, HealthGauge
│   ├── common/                         # KpiCard, StatusPill, ProgressBar, CountUp
│   ├── layout/                         # Sidebar, TopBar, RoleSwitcher, PhoneFrame
│   └── map/                            # MPMap with 52 districts, callouts & legend
├── data/                               # config.ts, districts, programmes, vendors,
│                                       # projects, schools, inspections, decisions
├── lib/                                # selectors.ts, status.ts, utils.ts
└── store/                              # useFilterStore, useAppStore (Zustand)
```

---

*ShikshaNet Prototype • State Department of School Education, Madhya Pradesh*
