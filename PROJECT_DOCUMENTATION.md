# Megaleio 2026 — Project Documentation

---

## 1. What Is This Project?

**Megaleio** is a national-level intercollegiate technical fest website for the 2026 edition, organized by **St. John College of Engineering and Management, Palghar, Maharashtra**.

The website is a **frontend-only informational portal** for the fest. It serves three main audiences:
- **Participants** — find events, register, and plan attendance using the schedule.
- **Visitors** — learn what the fest is about, who organizes it, and how to contact them.
- **Organizers** — have a central public-facing hub to promote and communicate the fest.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS 4 |
| Scroll | Lenis (smooth scroll) |
| Animation | GSAP 3 + ScrollTrigger |
| Carousel | Swiper.js 12 |
| Icons | React Icons 5 |
| Deployment | Vercel (SPA rewrite via `vercel.json`) |

---

## 3. Entry Points

| File | Role |
|---|---|
| `index.html` | HTML shell; mounts React app at `#root` |
| `src/main.jsx` | React root; wraps app in `<BrowserRouter>` |
| `src/App.jsx` | Root component; defines all routes; initializes Lenis + ScrollToTop |
| `src/layouts/MainLayout.jsx` | Shared layout wrapper; renders `<Navbar>` + `<Outlet>` |

---

## 4. Site Map — All Pages & Routes

| Route | Page File | Purpose |
|---|---|---|
| `/` | `src/pages/Home.jsx` | Landing page — intro, countdown, event preview, highlights |
| `/event` | `src/pages/Event.jsx` | Full searchable event catalog |
| `/schedule` | `src/pages/Schedule.jsx` | Day-wise timeline of all events |
| `/team` | `src/pages/Team.jsx` | Organizing committee with roles and LinkedIn |
| `/contactUs` | `src/pages/ContactUs.jsx` | Coordinator contacts, address, Google Map |
| `/megahack` | *(Not yet implemented)* | Placeholder in Navbar; no route or page exists yet |

---

## 5. Page-by-Page Breakdown

---

### 5.1 Home Page — `/`
**File:** `src/pages/Home.jsx`

Contains the following sections in order:

| Component | File | What It Does |
|---|---|---|
| `Video` | `src/components/Home/Video.jsx` | Full-screen background video (hosted on Cloudinary) that auto-plays, loops, and is muted |
| `Hero` | `src/components/Home/Hero.jsx` | Intro section with event tagline and a "Explore The Unknown" button |
| `Countdown` | `src/components/Home/CountDown.jsx` | Live real-time countdown to **March 13, 2026 at 00:00 AM** shows Days / Hours / Minutes / Seconds |
| `EventsGallery` | `src/components/Home/Events.jsx` | Scrollable image gallery of all event images split into 4 columns with a "View All Events →" button that navigates to `/event` |
| `ImageCarousel` | `src/components/Home/highlights.jsx` | Coverflow carousel of 6 photos from **Megaleio 2025** (past edition highlights) |
| `Footer` | `src/components/Footer.jsx` | Contact form (name/phone/query) + coordinator phone numbers + social links (Instagram, YouTube, Facebook) + copyright |

---

### 5.2 Event Page — `/event`
**File:** `src/pages/Event.jsx`

| Component | File | What It Does |
|---|---|---|
| `EventsGrid` | `src/components/Events/EventsGrid.jsx` | Shows all 16 events as cards. Has a **live search bar** (filters events by title). Each card shows event title, description, and two buttons: `REGISTER NOW` and `VIEW DETAILS` |
| `Footer` | `src/components/Footer.jsx` | Same shared footer |

**Data source:** `src/data/eventsGridData.js`

**Note:** Both `registerLink` and `detailsLink` are currently `"#"` (not connected to external pages/backends yet).

---

### 5.3 Schedule Page — `/schedule`
**File:** `src/pages/Schedule.jsx`

| Component | File | What It Does |
|---|---|---|
| `Timeline` | `src/components/Schedule/Timeline.jsx` | Two-day timeline for March 13 and 14, showing each event block with time, event name, and venue location |
| `Footer` | `src/components/Footer.jsx` | Same shared footer |

**Data source:** `src/data/eventsData.js`

---

### 5.4 Team Page — `/team`
**File:** `src/pages/Team.jsx`

| Component | File | What It Does |
|---|---|---|
| `StickyCards` | `src/components/Teams/StickyCards.jsx` | Scroll-driven stacked cards, one per committee member, showing role, name, description, photo, and LinkedIn link |

**Data source:** `src/data/teamData.js`

---

### 5.5 Contact Us Page — `/contactUs`
**File:** `src/pages/ContactUs.jsx`

| Component | File | What It Does |
|---|---|---|
| `SpookyContactPoster` | `src/components/ContactUs/Contact.jsx` | Lists all student committee members (name, role, phone), faculty coordinators, and embeds a Google Map at the college location |

**College address shown:**
> St. John College of Engineering and Management,
> Palghar-Manor Rd, near Shakti Udyog, Industrial Area, Vevoor,
> Palghar, Maharashtra 401404

---

## 6. All Events (16 Total)

| # | Event Name | Category | Description |
|---|---|---|---|
| 1 | Idea 2 Impact | Innovation | Present a concept showing real-world impact |
| 2 | Line Follower | Robotics | Program a robot to follow a path autonomously |
| 3 | Bridge IT | Civil Engg | Build a bridge structure within given constraints |
| 4 | Robo Soccer | Robotics | Control a robot to compete in robotic soccer |
| 5 | Robo Maze | Robotics | Navigate a robot through a maze |
| 6 | Business Plan Presentation | Management | Pitch a startup idea to a panel of judges |
| 7 | Civil Junkyard | Civil Engg | Build structures using scrap materials |
| 8 | Drone Dexterity | Drone | Pilot a drone through obstacle courses |
| 9 | Blind C | Coding | Write C code without seeing the output screen |
| 10 | Tech Quiz | Knowledge | Fast-paced quiz covering tech and engineering |
| 11 | BGMI Tournament | Esports | Battle Royale mobile gaming tournament |
| 12 | E-Football | Esports | Virtual football gaming tournament |
| 13 | Powerlifting | Sports | Strength competition across weight categories |
| 14 | Arm Wrestling | Sports | Strength competition |
| 15 | AI-Based Project Presentation | AI/ML | Present AI-powered real-world projects |
| 16 | GDG Workshop | Workshop | Hands-on workshop by GDG experts |

---

## 7. Schedule (All Events by Day & Time)

### Day 1 — March 13, 2026

| Time | Event | Venue |
|---|---|---|
| 11:30 AM | Megahack | Main Arena |
| 11:30 AM | BGMI | Gaming Zone |
| 11:30 AM | E Football | Gaming Zone |
| 11:30 AM | Robo Soccer | Robotics Arena |
| 11:30 AM | Idea2Impact | Seminar Hall |
| 11:30 AM | Bridge IT | IT Lab |
| 11:30 AM | GDG Workshop ⭐ (highlighted) | Workshop Room |
| 01:00 PM | Arm Wrestling | Sports Area |
| 01:00 PM | Powerlifting | Sports Arena |
| 02:00 PM | BPP (Business Plan Presentation) | Conference Hall |
| 02:00 PM | Tech Quiz | Auditorium |

### Day 2 — March 14, 2026

| Time | Event | Venue |
|---|---|---|
| 11:00 AM | Drone Dexterity | Outdoor Arena |
| 11:30 AM | Bridge IT Continue | IT Lab |
| 11:30 AM | AI Project Presentation | Seminar Hall |
| 11:30 AM | Blind C | Coding Lab |
| 11:30 AM | BGMI Continue | Gaming Zone |
| 11:30 AM | E Football Continue | Gaming Zone |
| 11:30 AM | Idea2Impact Continue | Seminar Hall |
| 01:00 PM | Civil Junkyard | Engineering Block |
| 11:00 PM | Line Follower | Robotics Arena |
| 11:00 PM | Robomaze | Robotics Arena |

---

## 8. Organizing Team

| Role | Name | LinkedIn |
|---|---|---|
| President | Mr. Dev Sarkar | [LinkedIn](https://www.linkedin.com/in/dev-sarkar-7926ab315) |
| Vice President | Ms. Gracy Yadav | [LinkedIn](https://www.linkedin.com/in/gracy-yadav-969b31259) |
| General Secretary | Ms. Meghana Kamath | [LinkedIn](https://www.linkedin.com/in/meghana-kamath-a71344321) |
| Joint Secretary | Mr. Sharvil Patil | — |
| Treasurer | Mr. Devank Mhatre | [LinkedIn](https://www.linkedin.com/in/devank-mhatre-1b8751264) |
| Advisor | Ms. Harshita Gharat | [LinkedIn](https://www.linkedin.com/in/harshita-gharat-baa347321) |

---

## 9. Contact Information

### Student Coordinators
| Name | Role | Phone |
|---|---|---|
| Dev Sarkar | President | +91 70284 55752 |
| Gracy Yadav | Vice President | +91 87678 20269 |
| Meghana Kamath | Secretary | +91 91683 97791 |
| Sharvil Patil | Joint Secretary | +91 70587 21858 |
| Devank Mhatre | Treasurer | +91 72489 16210 |
| Harshita Gharat | Advisor | +91 98677 07542 |

### Faculty Coordinators
| Name | Phone |
|---|---|
| Mr. Swapnil Malipatil | +91 81473 34657 |
| Mrs. Vishakha Rane | +91 97303 71605 |

### Social Media
| Platform | Link |
|---|---|
| Instagram | [megaleio2025](https://www.instagram.com/megaleio2025) |
| YouTube | [megaleiosjcem6968](https://youtube.com/@megaleiosjcem6968) |
| Facebook | facebook.com |

---

## 10. Data Files

| File | Contents |
|---|---|
| `src/data/eventsGridData.js` | 16 event objects with title, description, image, registerLink, detailsLink |
| `src/data/eventsData.js` | Day 1 and Day 2 timeline arrays with time, title, location, highlight flag |
| `src/data/teamData.js` | 6 committee member objects with role, name, description, image, linkedin |
| `src/data/EventImages.js` | Ordered list of 16 event images used in the home page gallery |

---

## 11. Hooks / Utilities

| File | Purpose |
|---|---|
| `src/hook/useSmoothScroll.js` | Initializes Lenis global smooth scroll + syncs with GSAP ScrollTrigger |
| `src/hook/ScrollToTop.jsx` | On every route change: scrolls to top and refreshes ScrollTrigger triggers |
| `src/hook/reveal.jsx` | Reusable scroll-reveal animation hook (fade-in + slide-up on scroll for `.reveal` elements) |

---

## 12. Assets Structure

| Folder | Contents |
|---|---|
| `src/assets/carousel/` | 6 images from Megaleio 2025 (for home carousel) |
| `src/assets/events/` | 15 event poster images (one per event) |
| `src/assets/team/` | 6 team member photos |
| `src/assets/display/` | Background images for sections (hero, countdown, schedule, contact) |
| `src/assets/images/` | Site logo |
| `src/assets/title/` | Title/wordmark image shown in navbar |

---

## 13. What Is Not Yet Done (Pending)

| Item | Location | Status |
|---|---|---|
| Registration links for events | `src/data/eventsGridData.js` → `registerLink` | All set to `"#"` — not connected |
| Event details links | `src/data/eventsGridData.js` → `detailsLink` | All set to `"#"` — not connected |
| MegaHack page | Navbar links to `/megahack` | No route or page file exists |
| Footer contact form submission | `src/components/Footer.jsx` | No `onSubmit` handler or API — form does nothing |
| Page title in browser | `index.html` | Still says `"frontend"` — should be updated to `"Megaleio 2026"` |

---

## 14. Deployment

- Deployed on **Vercel**.
- `vercel.json` contains a catch-all rewrite so all routes resolve to `index.html` (required for React SPA client-side routing).

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

*Last updated: March 3, 2026*
