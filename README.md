# AGverse — The Intelligence of the Earth (Full-Stack AgriTech Platform)

A responsive marketing website and platform application for **AGverse**, a Dubai (UAE) based agri-tech mega-platform that combines artificial intelligence, autonomous robotics, drones, and precision telemetry to achieve zero-waste global food production.

Built according to the comprehensive **AGverse Website: Build Specification** (Base System + Part B Enhancements).

---

## 🌿 Brand & Design System

- **Tagline**: *"The Intelligence of the Earth."*
- **Palette**:
  - **Deep Forest Green** (`#0B3D2E`): Primary brand foundation
  - **Fresh Lime** (`#8BC34A`): High-energy accent & interactive highlights
  - **Sand** (`#F5F1E8`): Natural light background
  - **Dark Charcoal** (`#14201B`): Technical dark sections and rich contrast
  - **White** (`#FFFFFF`): Clean card surfaces and contrast text
- **Typography**:
  - Headings: **Sora** (600 / 700 / 800)
  - Body: **Inter** (400 / 500 / 600)
  - Arabic (RTL): **Tajawal** (400 / 500 / 700)
- **UI Components**:
  - Pill-shaped buttons (`rounded-full`) with subtle elevation and lime glow
  - Soft shadow cards (`rounded-2xl`) with gentle 4px raise on hover
  - Standard section padding: 96px desktop (`py-24`) / 64px mobile (`py-16`)
  - Max container width: 1200px (`max-w-[1200px]`)
  - Support for both Light and Dark mode tokens + full RTL Arabic toggle

---

## 🚀 Key Page Sections (Strict Specification Order)

### 1. Global Navigation (`Header`)
- Sticky navigation bar that transitions from transparent to solid frosted glass (`bg-[#0B3D2E]/90 backdrop-blur-md`) after 40px of scroll.
- Custom SVG wordmark **AGverse** with leaf/globe mark.
- Smooth-scroll anchor links (`#about`, `#technology`, `#sustainability`, `#roi`, `#case-studies`, `#faq`).
- Dual language toggle (**English** / **العربية**) with automatic document RTL alignment.
- Dark / Light theme toggle.
- **"Contact us"** pill button scrolling to `#contact`.
- Full-screen slide-in mobile navigation drawer.
- **"Skip to main content"** accessibility link.

### 2. Hero (`#home`)
- Full-viewport cinematic background with layered deep forest green to charcoal gradient overlay.
- Eyebrow: `Dubai · AgriTech`.
- H1: *"The Intelligence of the Earth."*
- Subtext: *"AI, robotics and drones working together to grow more food with zero waste."*
- Dual CTAs:
  - Primary: **"Request a Tech Audit"** (smooth-scrolls to `#contact` and pre-selects the Tech Audit option).
  - Secondary: **"Explore Technology"** (smooth-scrolls to `#technology`).
- Animated scroll-down badge.

### 3. About (`#about`)
- Section title: *"About AGverse"*.
- Narrative on building an autonomous, zero-waste food production biosphere engineered in Dubai for arid climates.
- Three feature cards with icons:
  1. **Precision Farming**: Every plant monitored and micro-dosed individually.
  2. **Data-Driven Decisions**: Soil chemistry, weather, and crop telemetry turned into clear actions.
  3. **Maximum Efficiency**: Faster production cycles with minimal input.
- Highlight stat banner beside cards: Viewport-triggered animated **"10x"** count-up (*faster than traditional farming methods*).

### 4. Technology (`#technology`)
- Dark charcoal (`#14201B`) background.
- Three large alternating image/text rows:
  1. **AI & Machine Learning**: Analyzes soil, weather, and plant canopy health to predict yield and recommend actions.
  2. **Autonomous Robotics**: Solar-powered robots working 24/7 for planting, laser weeding, and harvesting.
  3. **Advanced Drone Fleet**: Multispectral aerial scouts that map fields and detect moisture stress early.
- Each row includes a **"Learn more"** link that opens an accessible modal with 3 detailed technical bullet points.

### 5. Stats Band
- Four animated counters in a row (2x2 on mobile):
  - **10x**: Faster crop simulation and breeding (counts 0 → 10x).
  - **Zero**: Waste irrigation systems (correctly renders as **"Zero"**, eliminating the 0x bug).
  - **24/7**: Autonomous robotic monitoring.
  - **2030**: Net-zero carbon target (counts up to 2030).

### 6. CTA Banner
- Headline: *"Stop guessing. Start growing with confidence."*
- Subtext: *"Transform your acreage into a climate-resilient, precision-controlled food engine today."*
- Button: **"Request a Tech Audit for Your Farm"** (scrolls to `#contact`).

### 7. Sustainability (`#sustainability`)
- Light sand background (`#F5F1E8`).
- Three core pillars:
  1. **Minimal carbon footprint**: Optimized logistics and 100% solar-powered field automation.
  2. **Resource conservation**: Up to 90% less water and fertilizer *(labeled as target, based on pilot goals)*.
  3. **Climate resilience**: Cultivars and systems engineered to thrive in extreme 50°C summer conditions.

---

## ⚡ Part B Enhancements

1. **Interactive ROI & Savings Calculator (`#roi`)**:
   - Sliders for farm size (10 to 500+ hectares), crop selection (Dates, Greenhouses, Citrus, Fodder), and annual water expenditure.
   - Calculates annual water saved (AED & millions of liters), automated labor hours, projected yield gain (+19% to +34%), and estimated payback period in months.
2. **Multispectral Drone Telemetry Simulator (`#drone-sim`)**:
   - Interactive toggle between standard optical RGB aerial imagery and NDVI calibrated plant health index.
   - Interactive hotspot beacons pinpointing canopy vigor, moisture deficits, and automated valve adjustments.
3. **Regional Pilots & Proof (`#case-studies`)**:
   - Commercial field trials from Al Ain (-84% water waste) and Ras Al Khaimah (+28% yield).
   - Institutional standards: UAE Food Security Strategy 2051, Global G.A.P., ISO 14001, Solar Impulse Foundation.
4. **FAQ Accordion (`#faq`)**:
   - Covers audit details, extreme Gulf heat resilience (IP67 liquid cooled), legacy tractor/irrigation retrofits, and minimum acreage requirements.
5. **Contact & Lead Capture (`#contact`)**:
   - Two-column layout with Dubai coordinates (`hello@agverse.ae`, `+971 4 800 AGVERSE`, Dubai Silicon Oasis & DIFC).
   - Full validation, inline error messaging, honeypot anti-spam protection, loading state, and success confirmation.
   - Direct integration with backend `POST /api/contact`.
6. **Tech Audit Calendar Booking Modal**:
   - Interactive date and time slot selector for reserving 30-min discovery sessions with senior agronomists.
7. **Legal Compliance & Cookie Consent**:
   - UAE PDPL & GDPR compliant Cookie Consent banner with local preference storage.
   - Full Privacy Policy and Terms of Service modal.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**:
  - React 18
  - Vite 6
  - Tailwind CSS 3
  - Framer Motion (scroll-reveal, drawers, modals)
  - Lucide React & inline SVG icon system
- **Backend API**:
  - Node.js & Express
  - REST endpoints:
    - `POST /api/contact`: Validates, prevents spam via honeypot, persists submission to `server/data/contacts.json`, logs payload to console, and returns 200 OK.
    - `GET /api/contact`: Retrieves submitted contacts list.
    - `POST /api/audit-request`: Diagnostic audit requests.
    - `GET /api/health`: Health check and uptime.
- **SEO & Performance**:
  - Complete Open Graph & Twitter meta tags
  - Schema.org `Organization` JSON-LD
  - `sitemap.xml` & `robots.txt`

---

## 🏃 Running the Application

### 1. Prerequisites
- **Node.js** v18+ (Tested on v24.13.1)
- **npm** v9+

### 2. Install Dependencies (if not already installed)
```bash
npm run install:all
```

### 3. Development Mode
Run both frontend and backend concurrently:
```bash
npm run dev
```
- Client runs on `http://localhost:5050`
- API requests to `/api/*` are proxied to the backend on `http://localhost:5001`

### 4. Production Build & Execution
```bash
# Build the client distribution
npm run build

# Start the unified production server
npm start
```
The server serves the compiled frontend from `client/dist` and handles API requests on `http://localhost:5050`.

---

## ✅ Acceptance Criteria Checklist

- [x] All nav links smooth-scroll to the right section; mobile menu works.
- [x] Every section matches the order and content of the build specification.
- [x] Stats animate once and show correct values (10x, Zero, 24/7, 2030) with no "0x" bug.
- [x] Contact form validates client-side, submits to `/api/contact`, and displays success state.
- [x] No horizontal scroll at 375px; no layout shift.
- [x] Keyboard navigable, visible focus rings, AA color contrast.
- [x] Full RTL Arabic language support with instant switcher.
- [x] Part B features implemented: ROI calculator, drone NDVI simulator, pilots & certifications, FAQ, calendar booking, cookie banner.
