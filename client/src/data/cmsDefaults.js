import { translations } from './translations.js';

const crops = {
  dates: { waterSavingPct: 0.82, laborHoursPerHa: 42, yieldGain: 24, paybackMonths: 13 },
  greenhouse: { waterSavingPct: 0.90, laborHoursPerHa: 85, yieldGain: 34, paybackMonths: 10 },
  citrus: { waterSavingPct: 0.78, laborHoursPerHa: 36, yieldGain: 22, paybackMonths: 15 },
  fodder: { waterSavingPct: 0.85, laborHoursPerHa: 28, yieldGain: 19, paybackMonths: 14 },
};

const hotspots = [
  { id: 0, x: '32%', y: '38%', label: 'Sector Alpha-3', reading: 'NDVI 0.84 — Healthy Canopy', action: 'Automated drip rate reduced 12%' },
  { id: 1, x: '68%', y: '45%', label: 'Sector Beta-7', reading: 'NDVI 0.46 — Moisture Deficit', action: 'Subsurface valve #14 pulsed for 15 mins' },
  { id: 2, x: '52%', y: '70%', label: 'Sector Gamma-1', reading: 'Nitrogen Variance Detected', action: 'Targeted micro-nutrient spray dispatched' },
];

const sectionCopy = {
  "about": {
    "benchmark": "Benchmark",
    "acceleration": "Field Acceleration",
    "evidence": "Derived from closed-loop automated sensing vs traditional manual sampling cycles in desert pilots."
  },
  "technology": {
    "systemLayer": "System Layer",
    "fieldSpec": "Verified UAE Field Spec"
  },
  "sustainability": {
    "targetLabel": "Net-Zero 2030"
  },
  "caseStudies": {
    "verified": "Verified",
    "evidence": "Audited telemetry logs & satellite verification",
    "standards": "Institutional Standards & Enterprise Certifications"
  },
  "contact": {
    "eyebrow": "Get In Touch",
    "inquiries": "Direct Inquiries",
    "office": "Regional Office",
    "expedited": "Need an expedited assessment?",
    "discovery": "Schedule a 30-min discovery session",
    "chooseDate": "Pick a Date",
    "sendAgain": "Send Another Inquiry"
  },
  "roi": {
    "pilotRange": "10 ha (Pilot)",
    "middleRange": "250 ha",
    "commercialRange": "500+ ha (Commercial)",
    "projections": "Live Yield & Savings Projections",
    "pilotData": "Based on pilot data",
    "laborDetail": "Autonomous laser weeding & scouting",
    "yieldDetail": "Higher grade harvest classification",
    "paybackDetail": "Fast capital amortization",
    "assumptionsDetail": "Projections calibrated against UAE pilot conditions and regional electricity/water tariffs."
  },
  "ndviDemo": {
    "actionLabel": "Action:",
    "telemetryLabel": "Interactive Drone Telemetry"
  }
};

const types = ['hero', 'about', 'technology', 'stats', 'ctaBanner', 'sustainability', 'roi', 'ndviDemo', 'caseStudies', 'faq', 'contact'];
const destinations = { about: '#about', technology: '#technology', sustainability: '#sustainability', roi: '#roi', proof: '#case-studies', faq: '#faq' };

export const defaultPage = {
  blocks: types.map((type) => ({ id: type, type, enabled: true })),
  content: Object.fromEntries(Object.entries(translations).map(([lang, t]) => [lang, {
    ...Object.fromEntries(types.map((type) => [type, { ...t[type], ...sectionCopy[type] }])),
    meta: { title: 'AGverse — The Intelligence of the Earth', description: t.hero.subtitle },
    hero: {
      ...t.hero, image: '/images/hero-farm.jpg', alt: lang === 'ar' ? 'صورة جوية لأرض زراعية' : 'Cinematic aerial view of AGverse monitored agricultural land',
      youtube: '', mp4: '', videoLabel: lang === 'ar' ? 'شاهد الفيديو' : 'Watch video',
      primaryHref: '#contact', secondaryHref: '#technology', scrollHref: '#about',
    },
    technology: { ...t.technology, ...sectionCopy.technology, items: t.technology.items.map((item) => ({ ...item, alt: item.title })) },
    roi: {
      ...Object.fromEntries(Object.entries(t.roi).filter(([key]) => key !== 'crops')),
      ...sectionCopy.roi,
      cropOptions: Object.entries(crops).map(([id, assumptions]) => ({ id, label: t.roi.crops[id], ...assumptions })),
      waterLitersFactor: 18500,
      parametersTitle: 'Farm Parameters',
    },
    ndviDemo: { ...t.ndviDemo, ...sectionCopy.ndviDemo, hotspots, image: '/images/hero-farm.jpg', alt: lang === 'ar' ? 'صورة جوية لأرض زراعية' : 'Aerial view of surveyed farmland', flightLabel: 'Live Flight Path: Drone Hive #02 (Al Ain Sector 4)' },
    caseStudies: { ...t.caseStudies, ...sectionCopy.caseStudies, certifications: [
      { label: 'UAE National Food Security Strategy 2051', sub: 'Technology Alignment' },
      { label: 'Global G.A.P. Compliant', sub: 'Farm Traceability Standard' },
      { label: 'ISO 14001 Certified', sub: 'Environmental Management' },
      { label: 'Solar Impulse Efficient Solution', sub: 'Clean Tech Endorsement' },
    ] },
  }])),
};

const globalCopy = {
  "legal": {
    "privacy": {
      "title": "Privacy & Data Protection Policy",
      "body": "1. Compliance Framework: AGverse adheres strictly to UAE Federal Decree-Law No. 45 of 2021 regarding Personal Data Protection (PDPL) as well as the General Data Protection Regulation (GDPR).\n\n2. Agricultural Telemetry: All soil composition data, drone multispectral orthomosaics, and irrigation consumption metrics captured from client farms remain the exclusive property of the landowner.\n\n3. Information We Collect: We collect contact details provided via our audit request forms, technical inquiries, and automated IoT sensor heartbeats.\n\n4. Security & Encryption: All data transmitted between field rovers, docking hives, and the AGverse cloud engine is secured using AES-256 encryption.\n\n5. Inquiries: For inquiries regarding your farm data or erasure requests, contact privacy@agverse.ae."
    },
    "terms": {
      "title": "Terms of Service & Farm SLA",
      "body": "1. Scope of Service: AGverse provides autonomous agricultural telemetry, robotic weed management, and predictive yield analytics.\n\n2. Airspace & UAE GCAA Compliance: All drone scout operations are performed in full accordance with UAE General Civil Aviation Authority (GCAA) regulations and licensed local airspace parameters.\n\n3. Hardware Reliability & SLAs: AGverse guarantees a 99.4% uptime for deployed field hives and automated subsurface irrigation controllers.\n\n4. Intellectual Property: The AGverse neural agronomy models, hardware end-effectors, and platform interfaces are proprietary trade secrets of AGverse Ltd. (Dubai, UAE)."
    },
    "close": "Understood"
  },
  "cookies": {
    "title": "Privacy & Cookie Preferences",
    "body": "We use telemetry and functional cookies to ensure reliable precision mapping and optimize regional site performance. Read our",
    "privacy": "Privacy Policy",
    "acceptAll": "Accept All",
    "essentialOnly": "Essential Only"
  },
  "auditCalendar": {
    "dates": [
      {
        "day": "Mon",
        "date": "24 Nov",
        "val": "2026-11-24"
      },
      {
        "day": "Tue",
        "date": "25 Nov",
        "val": "2026-11-25"
      },
      {
        "day": "Wed",
        "date": "26 Nov",
        "val": "2026-11-26"
      },
      {
        "day": "Thu",
        "date": "27 Nov",
        "val": "2026-11-27"
      }
    ],
    "times": [
      "09:00 AM",
      "10:30 AM",
      "01:00 PM",
      "03:30 PM",
      "05:00 PM"
    ],
    "title": "Schedule Farm Tech Audit Call",
    "confirmed": "Discovery Call Confirmed!",
    "confirmation": "We have reserved {time} on {date} (GST Dubai Time). A calendar invitation with Google Meet link has been sent to {email}.",
    "done": "Done",
    "dateLabel": "Select Date (Gulf Standard Time)",
    "timeLabel": "Select Time Slot (30 Mins)",
    "nameLabel": "Your Name *",
    "emailLabel": "Email Address *",
    "namePlaceholder": "e.g. Sultan Al Nuaimi",
    "emailPlaceholder": "sultan@agriholdings.ae",
    "submitLabel": "Confirm Call with Senior Agronomist"
  }
};

export const defaultSettings = Object.fromEntries(Object.entries(translations).map(([lang, t]) => {
  const links = Object.entries(destinations).map(([key, href]) => ({ label: t.nav[key], href }));
  return [lang, {
    ...globalCopy,
    brand: 'AGverse', logo: '', logoAlt: 'AGverse', seoTitle: defaultPage.content[lang].meta.title, seoDescription: t.hero.subtitle,
    nav: { ...t.nav, links: [...links, { label: lang === 'ar' ? 'المقالات' : 'Articles', href: '/articles' }] },
    footer: {
      ...t.footer, navigationLabel: 'Navigation', backToTop: 'Back to Top', links: [...links, { label: t.nav.contact, href: '#contact' }],
      linkedin: 'https://linkedin.com/company/agverse-tech', x: 'https://x.com/agverse_tech', instagram: 'https://instagram.com/agverse.ae', facebook: 'https://facebook.com/agverse.ae',
    },
  }];
}));

