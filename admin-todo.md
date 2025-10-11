# Space-Together — Admin Frontend TODO (Updated)

> Purpose: Developer-focused roadmap for building the **Space-Together** Admin Portal — a centralized platform to manage multi-school operations including academics, attendance, finance, enrollment, and reporting.

---

## ⚙️ Project Setup & Conventions

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + DaisyUI
- **Data Fetching:** React Query (TanStack Query)
- **Tables:** TanStack Table (server-side pagination)
- **Forms & Validation:** React Hook Form + Zod
- **Routing:** `app/[lang]/(application)/a/...` for admin pages
- **Auth:** Auth.js + RBAC-aware `useCan()` and `usePermissions()` hooks
- **Storage:** Cloudinary or S3 via presigned uploads (backend provided URLs)
- **Realtime:** NATS, SSE, or WebSockets (with fallback polling)

---

# 🗺️ Roadmap & Implementation Phases

## Phase 1 — Core Administration (MVP)

**Goal:** Build the foundation — authentication, RBAC, global navigation, and core CRUD for academic structure.

### Pages

- `/a` — Dashboard with KPIs and shortcuts
- `/a/database` — Overview of database collections and data count
- `/a/collections` — Central list of main collections
- `/a/settings/roles` — Role & permission management

### Core Collections

```ts
const mainCollections = [
  {
    name: "users",
    label: "Users",
    icon: "/icons/family.png",
    href: "/a/collections/users",
  },
  {
    name: "sectors",
    label: "Sectors",
    icon: "/icons/education.png",
    href: "/a/collections/sectors",
  },
  {
    name: "trades",
    label: "Trades",
    icon: "/icons/training.png",
    href: "/a/collections/trades",
  },
  {
    name: "main_classes",
    label: "Main Classes",
    icon: "/icons/classroom.png",
    href: "/a/collections/main_classes",
  },
  {
    name: "main_subjects",
    label: "Main Subjects",
    icon: "/icons/notebook.png",
    href: "/a/collections/main_subjects",
  },
];
```

### Components

- `AdminLayout` — Topbar, sidebar, and school selector
- `KpiCard` — Displays system stats (schools, students, teachers, revenue)
- `DataTable` — Reusable TanStack Table with pagination, sorting, and filters
- `Modal` — Generic form modal for create/edit
- `FormField` — Consistent input styling with validation
- `PermissionsGate` — Restrict UI visibility by role

### MVP Tasks

1. Build `AdminLayout` and sidebar navigation ✅
2. Add Auth guard for admin routes ✅
3. Implement server-side `DataTable` ✅
4. CRUD: Sectors, Trades, and Main Classes ✅
5. Create basic `MainSubject` management UI ✅

**Acceptance Criteria:** Admin login, RBAC works, CRUD ops functional, data tables load correctly.

---

## Phase 2 — Academic Core (Subjects Deep Dive)

**Goal:** Complete the academic foundation — subjects, learning outcomes, topics, materials, grading, and progress tracking.

### Pages

- `/a/main_subjects/[code]` — Subject detail page (tabbed)
  - `learning-outcomes/`
  - `topics/`
  - `materials/`
  - `grading/`
  - `progress/`
  - `contributors/`

### Components

- `SubjectTabs` — Navigation tabs for sub-sections
- `LearningOutcomeList` — CRUD + drag & reorder (via DnD)
- `TopicsTree` — Nested topic editor with subtopics
- `MaterialUploader` — File and link manager with preview
- `GradingEditor` — Grade boundaries, weights, and letter/percentage mapping
- `ProgressConfigForm` — Toggles and thresholds
- `ContributorPicker` — Add/remove contributors

### Tasks

1. Subject detail layout and tabs ✅
2. Data fetching with `useSubjectWithOthers` ✅
3. CRUD Learning Outcomes with drag & reorder ✅
4. Recursive Topics Tree (create/edit/delete) ✅
5. Upload flow using presigned URLs ✅
6. Grading Editor (based on SubjectGradingScheme) ✅
7. Progress tracking configuration form ✅
8. Subject duplication & JSON export ✅

**Acceptance Criteria:** All sub-resources manageable; subject fully editable.

---

## Phase 3 — School Management

**Goal:** Manage schools, departments, and academic years.

### Pages

- `/a/schools` — List and manage schools (multi-school setup)
- `/a/schools/[id]/departments` — Manage departments, staff, and roles
- `/a/academic-years` — Configure terms and academic year range

### Components

- `SchoolCard` — Displays logo, name, and student stats
- `DepartmentManager` — Assign teachers and heads
- `YearEditor` — Manage term dates and labels

### Tasks

1. CRUD for schools and departments ✅
2. Assign teachers and roles ✅
3. Manage academic years and terms ✅

---

## Phase 4 — Finance & Enrollments

**Goal:** Tuition, fees, payments, and enrollment workflows.

### Pages

- `/a/finance/fee-items` — Define fee structures and plans
- `/a/finance/payments` — List and record payments
- `/a/enrollments` — Manage enrollment requests and approvals

### Components

- `FeeRuleForm` — Define discounts, scholarships, or custom fee rules
- `PaymentForm` — Record payments, proof upload
- `InvoiceGenerator` — Printable invoices/receipts

### Tasks

1. Implement fee setup and assignment ✅
2. Handle student payments and receipts ✅
3. Enrollment request approval workflow ✅

**Acceptance Criteria:** Accountant and admin roles can process and monitor payments.

---

## Phase 5 — Reports & Integrations

**Goal:** Provide insights, exports, and third-party integrations.

### Pages

- `/a/reports` — Report builder and saved templates
- `/a/settings/integrations` — SMS/email/payment gateway integration
- `/a/settings/system` — Backups and database health monitoring

### Tasks

1. Attendance, grade, and fee reports with export ✅
2. Automated report emails and schedules ✅
3. SMS/email gateway integration ✅
4. Backup triggers and health checks ✅

---

## UX & Interaction Standards

- **Optimistic UI updates** via React Query mutations
- **Persistent filters & table layouts** (localStorage / query params)
- **Bulk actions** for CRUD lists
- **Inline edits** for quick updates (e.g., subject hours)
- **Accessibility:** keyboard navigation & ARIA-compliant modals

---

## Testing & QA

- Unit tests (DataTable, Forms, Tabs)
- Integration: subject creation → LO → topic → material
- E2E (Playwright): login + role + CRUD flow
- Accessibility: axe-core validation in CI

---

## Deployment & CI/CD

- Host: Vercel (Next.js optimized)
- CI: GitHub Actions (lint, test, build)
- Feature flags via `.env` or DB table
- Env vars for backend URL, API keys, Cloudinary, NATS

---

## Deliverables Checklist

- [ ] Phase 1: Admin core + CRUD
- [ ] Phase 2: Subject submodules
- [ ] Phase 3: School management
- [ ] Phase 4: Finance & enrollment
- [ ] Phase 5: Reports & integrations

---

## Next Suggested Steps

1️⃣ Generate `/a/collections/main_subjects` skeleton page (Next.js + TS + Tailwind)
2️⃣ Create `permissions matrix` (Markdown/CSV)
3️⃣ Scaffold `SubjectDetail` with Learning Outcomes tab
