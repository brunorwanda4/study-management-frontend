# 🧠 Space-Together Frontend TODO

Frontend built with **Next.js 15**, **TypeScript**, **TailwindCSS**, **TanStack Table**, and **Realtime (Pusher/SSE/WebSocket)**.
Goal: manage schools, users, classes, and communication seamlessly.

---

## 🏗️ 1. Core Setup

- [ ] Configure project structure:
  - [ ] `/app` directory routes (Next.js App Router)
  - [ ] `/components` for reusable UI
  - [ ] `/lib` for helpers and API client
  - [ ] `/hooks` for custom hooks
  - [ ] `/service` for API integration
  - [ ] `/types` for global types/interfaces
- [ ] Setup TailwindCSS + ShadCN UI
- [ ] Add environment variables schema (using `zod` or `env.mjs`)
- [ ] Configure Axios/Fetch wrapper for API calls
- [ ] Setup authentication flow (Auth.js or custom JWT)
- [ ] Create layout (sidebar + topbar + main content)

---

## 👥 2. User & Role Management

- [ ] User Login/Register pages
- [ ] Role-based dashboard (Admin / Teacher / Student / Parent)
- [ ] Profile management (edit name, photo, password)
- [ ] Permissions system (hide/show components per role)
- [ ] Invite new users (email or code)

---

## 🏫 3. Schools & Classes Module

- [ ] Display all schools (admin view)
- [ ] Create/Edit/Delete school
- [ ] Class management (create, assign teacher/students)
- [ ] Subject management UI
- [ ] Assign teachers to subjects/classes
- [ ] Display subject details (learning outcomes, progress)

---

## 📚 4. Academic Data

- [ ] Add subjects with outcomes
- [ ] Track student progress per subject
- [ ] Grading input for teachers
- [ ] View grades for students/parents
- [ ] Filter and sort by class, subject, date
- [ ] Persist filters with query params (TanStack Table integration)

---

## 💬 5. Communication & Realtime

- [ ] Class chat (teacher ↔ students)
- [ ] Direct messages (between users)
- [ ] Notifications (real-time via Pusher or SSE)
- [ ] Presence tracking (online/offline indicators)
- [ ] Announcements feed (school-wide + class-specific)
- [ ] Realtime updates for academic data (grades, notes)

---

## 💸 6. Finance & Donations (if applicable)

- [ ] Donation dashboard
- [ ] Transaction list (funds in/out)
- [ ] Role-restricted access (accountant, president)
- [ ] Charts for income vs. expenses
- [ ] Add/Edit/Delete transactions

---

## 📢 7. News & Resources

- [ ] Display latest news from API
- [ ] News detail page
- [ ] Resource list (documents, forms, links)
- [ ] Category filtering
- [ ] Markdown/HTML support for news content

---

## 🧾 8. Attendance & Reports

- [ ] Attendance list per class
- [ ] Mark attendance (teacher)
- [ ] Attendance summary for students
- [ ] Export attendance data
- [ ] Reports: Grades, Attendance, Donations

---

## ⚙️ 9. Settings & Administration

- [ ] Manage roles & permissions
- [ ] System settings (language, theme, notifications)
- [ ] Multilingual support (EN, FR, RW)
- [ ] Audit logs (who changed what)
- [ ] Backup & restore settings

---

## 🚀 10. UI / UX Enhancements

- [ ] Responsive design (mobile/tablet)
- [ ] Animations (GSAP / Framer Motion)
- [ ] Dark mode toggle
- [ ] Loading states & skeletons
- [ ] Accessibility improvements (a11y)
- [ ] Page transition animations

---

## 🧩 11. Integrations

- [ ] Cloudinary image uploads (avatars, resources)
- [ ] API sync with backend (Actix + MongoDB)
- [ ] Offline caching (Service Worker)
- [ ] Push notifications (optional PWA)
- [ ] Integration tests (Playwright or Cypress)

---

## 🧪 12. Testing & Deployment

- [ ] Component tests (React Testing Library)
- [ ] End-to-end tests (Cypress)
- [ ] Type safety checks (tsc)
- [ ] ESLint + Prettier setup
- [ ] Vercel / Docker deployment scripts

---

## 🧱 13. Future Enhancements

- [ ] AI-based insights (student performance prediction)
- [ ] Parent portal mobile view
- [ ] Offline classroom notes
- [ ] File sharing in chat
- [ ] Analytics dashboard

---

## ✅ Progress Tracker

| Module            | Status         |
| :---------------- | :------------- |
| Core Setup        | ⏳ In progress |
| Auth & Users      | ⏳ In progress |
| Schools & Classes | ⏳ In progress |
| Communication     | ⏳ Planned     |
| Finance           | ⏳ Planned     |
| News & Resources  | ⏳ Planned     |
| Reports           | ⏳ Planned     |

---

## 💡 Notes

- All API endpoints are under `/api/v1/*`
- Backend uses **Actix + MongoDB + Prisma (TS mirror)**
- Realtime handled via **Pusher or WebSockets**
- Maintain strong type contracts between frontend & backend

---

### Join school request id to data page is for UI

- https://dashui.codescandy.com/dashuipro/pages/mail.html

### FIX on creating main subject

- add realtime on create subject topic and fix on how it look
