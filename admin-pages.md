# 🧭 Admin Dashboard — Complete Information Architecture

## `/a` — **Main Dashboard (Home)**

**Purpose:** Give the admin a quick overview of school performance, system usage, and important actions.

### 📊 Widgets / Components

| Component             | Description                                                                                                                          | Data Source                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `KpiCard`             | Displays total counts: `students`, `teachers`, `parents`, `schools`, `departments`, `classes`, `subjects`, `enrollments`, `payments` | Aggregated from collections: `users`, `schools`, `main_classes`, `main_subjects`, `payments` |
| `AttendanceChart`     | Line chart of daily or weekly attendance per school/class                                                                            | `attendance` collection                                                                      |
| `FeeCollectionChart`  | Bar or doughnut chart for total fees vs paid vs unpaid                                                                               | `payments`, `fee_items`                                                                      |
| `PerformanceOverview` | Average student performance (grade distribution)                                                                                     | `grades`, `subjects`                                                                         |
| `RecentActivity`      | Latest logins, CRUD changes, or events                                                                                               | `activity_logs`                                                                              |
| `QuickActions`        | Buttons: “Add School”, “Add Teacher”, “Upload Materials”, “View Reports”                                                             | Navigation shortcuts                                                                         |

---

## `/a/database` — **Database Overview**

**Purpose:** Show a health summary of all collections.

### Components

| Section          | Description                                                           |
| ---------------- | --------------------------------------------------------------------- |
| `DatabaseStats`  | Display DB size, collection count, total documents, and growth trends |
| `CollectionList` | Table listing collections: name, count, storage size                  |
| `ActionBar`      | “Export Backup”, “Refresh”, “Compact Database” (admin only)           |

**Data from backend:** `/admin/database-stats` endpoint (like your `get_database_stats()` in Rust).

---

## `/a/collections` — **Collections Center**

**Purpose:** Visualize and navigate all major collections in the system.

### Example Table

| Collection      | Description                                               | Count | Last Updated | Action |
| --------------- | --------------------------------------------------------- | ----- | ------------ | ------ |
| `users`         | All registered users (students, teachers, parents, staff) | 5300  | 2025-10-10   | View   |
| `schools`       | Registered schools                                        | 4     | 2025-10-05   | View   |
| `main_subjects` | All subjects across sectors                               | 62    | 2025-09-29   | View   |

---

## `/a/schools` — **Schools Management**

**Purpose:** Manage multiple schools and their info.

### Components

| Component           | Description                                                    | Data                           |
| ------------------- | -------------------------------------------------------------- | ------------------------------ |
| `SchoolCard`        | Logo, name, total students, and teachers                       | `schools`, joined with `users` |
| `AddSchoolModal`    | Add new school (name, code, logo, address, principal)          | `schools`                      |
| `SchoolDetail`      | Tabs: Overview / Departments / Students / Finance / Attendance | various                        |
| `AssignDepartments` | Add departments and assign heads                               | `departments`, `users`         |

---

## `/a/schools/[id]/departments` — **Department Management**

**Purpose:** Manage academic departments within a school.

### Data & UI

| Section             | Description                                 |
| ------------------- | ------------------------------------------- |
| Department List     | Department name, head, teachers, subjects   |
| Add/Edit Modal      | Add department, assign head teacher         |
| Teacher Assignments | Multi-select teachers                       |
| Department KPIs     | Subject count, class count, active teachers |

---

## `/a/main_classes` — **Class Management**

**Purpose:** Manage class structures, capacity, homerooms, and schedules.

### Components

| Component          | Description                                       | Data                         |
| ------------------ | ------------------------------------------------- | ---------------------------- |
| `ClassTable`       | List of classes per school                        | `main_classes`               |
| `ClassDetail`      | Students, teachers, timetable, attendance summary | `main_classes`, `attendance` |
| `AssignStudents`   | Add/remove students to class                      | `users`                      |
| `TimetableManager` | Manage schedule and subjects per class            | `timetables`, `subjects`     |

---

## `/a/main_subjects` — **Subject Management**

**Purpose:** Manage subjects globally across schools.

### Components

| Component         | Description                                      | Data                     |
| ----------------- | ------------------------------------------------ | ------------------------ |
| `SubjectTable`    | Subject name, code, sector, trade, hours, status | `main_subjects`          |
| `AddSubjectModal` | Create/edit subject                              | `main_subjects`          |
| `FilterBar`       | Filter by sector/trade                           | from `sectors`, `trades` |
| `ExportButton`    | Export subject list to JSON or CSV               | generated                |

---

## `/a/main_subjects/[code]` — **Subject Detail**

**Tabs:**

1. **Overview:** Name, sector, trade, description, hours
2. **Learning Outcomes:** CRUD + reorder outcomes
3. **Topics:** Nested topic editor
4. **Materials:** File uploads (PDF, video, link)
5. **Grading:** Configure weights and grading schema
6. **Progress:** Define progress milestones
7. **Contributors:** Assign teachers/authors

---

## `/a/users` — **User Management**

**Purpose:** Manage all user roles and permissions.

| Tab      | Description                                  |
| -------- | -------------------------------------------- |
| Students | Name, ID, class, guardian, enrollment status |
| Teachers | Subjects taught, department, classes         |
| Parents  | Linked students, contact info                |
| Staff    | Role, department, permissions                |

---

## `/a/settings/roles` — **Roles & Permissions**

**Purpose:** Define what each role can access or modify.

### Example Roles

| Role         | Description                      | Can Access               |
| ------------ | -------------------------------- | ------------------------ |
| Super Admin  | Full access to all               | All collections          |
| School Admin | One school management            | Users, Classes, Subjects |
| Teacher      | Assigned subjects and classes    | Lessons, Attendance      |
| Accountant   | Finance & Enrollments            | Finance                  |
| Parent       | Children’s grades and attendance | View only                |

---

## `/a/academic-years` — **Academic Years**

**Purpose:** Manage terms, start/end dates, active year.

### UI

- List of academic years
- Add/edit modal for term dates
- “Set Active Year” toggle

---

## `/a/finance` — **Finance Management**

**Subpages:**

- `/fee-items` — Define school fees per level or program
- `/payments` — Track transactions, generate invoices
- `/reports` — Financial summaries per term

### Key Components

| Component          | Description                         |
| ------------------ | ----------------------------------- |
| `FeeRuleForm`      | Discounts, scholarships, exemptions |
| `PaymentForm`      | Record payment with proof           |
| `InvoiceGenerator` | Auto-generate printable receipts    |
| `FinanceStats`     | Graphs: income vs pending           |

---

## `/a/enrollments` — **Enrollment Management**

**Purpose:** Approve or reject student enrollments.

### Components

- Enrollment Table: Student name, class, status, date
- Filters: School, class, status
- Bulk Approve / Reject buttons

---

## `/a/attendance` — **Attendance Dashboard**

**Purpose:** Visualize and manage student/teacher attendance.

### Charts & Data

| Chart             | Description          |
| ----------------- | -------------------- |
| Daily Attendance  | Line chart by date   |
| Class Attendance  | Comparison by class  |
| School Attendance | Comparison by school |

---

## `/a/reports` — **Reporting**

**Purpose:** Generate academic and financial reports.

### Examples

- Grade report per class/subject
- Attendance report
- Payment report
- Export formats: PDF, Excel, CSV

---

## `/a/settings/system` — **System Settings**

**Purpose:** Manage app configuration, backups, integrations.

### Sections

| Section      | Description                         |
| ------------ | ----------------------------------- |
| System Info  | Version, uptime, environment        |
| Integrations | Configure SMS, Email, Payment APIs  |
| Backups      | Manual/auto backups, database stats |
| Audit Logs   | User actions and errors             |

---

# 📦 Database Overview (Main Collections)

Here’s a simplified view of all main collections the admin dashboard connects to:

| Collection          | Description                                      |
| ------------------- | ------------------------------------------------ |
| `users`             | All user types (admin, teacher, student, parent) |
| `schools`           | Registered schools                               |
| `departments`       | School departments                               |
| `main_classes`      | Classes under schools                            |
| `main_subjects`     | Global subject definitions                       |
| `learning_outcomes` | Per-subject learning goals                       |
| `topics`            | Nested subject topics                            |
| `materials`         | Uploaded resources                               |
| `grades`            | Assessment data                                  |
| `attendance`        | Student attendance records                       |
| `enrollments`       | Student applications                             |
| `payments`          | Payment transactions                             |
| `fee_items`         | Fee structures                                   |
| `academic_years`    | Academic terms                                   |
| `activity_logs`     | Audit trail of actions                           |
| `notifications`     | System notifications                             |
