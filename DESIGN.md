# AGVERSE — Design System & Craft Guidelines

> **World:** Arid Mineral & Autonomous Agronomy  
> **Mode:** Persuade & Experience  
> **Audience:** Agricultural enterprise owners, sovereign food security leaders, agronomists, and land stewards across the UAE and global arid regions.  
> **Tooling:** React 18, Tailwind CSS, Lucide Icons, Impeccable Engine v0.1.23.

---

## 1. Visual World & Direction

AGverse is the operating system for global zero-waste food production. Its visual identity avoids generic tech stereotypes (e.g. purple gradients, repetitive 3-card containers, floating meaningless badges) in favor of **grounded agronomic reality**:
- Deep soil and mineral depths inspired by nocturnal desert landscapes.
- Luminous oasis teal (`#ACD5D1`) and chlorophyll green (`#2CC56F`) as intentional, purposeful signals of biological life and telemetry accuracy.
- Tactile, asymmetric layouts reflecting real field operating systems.

---

## 2. Color Palette & Surface Tokens

All secondary texts are tinted from the ambient ground hue rather than neutral gray, ensuring contrast ratios $\ge 4.5:1$ across all viewports.

| Token | Hex / Value | Usage & Meaning |
|---|---|---|
| `--ag-dark` | `#021312` | Deepest root ground (night terrain) |
| `--ag-dark-loam` | `#06201D` | Primary card & section surface |
| `--ag-dark-surface` | `#0A2B27` | Interactive hover & elevated container |
| `--ag-dark-elevated` | `#0F3833` | Active selections & focal controls |
| `--ag-teal` | `#ACD5D1` | Signature brand accent & key metric numerals |
| `--ag-teal-light` | `#D4EBE9` | Emphasized headings & lead paragraphs |
| `--ag-chlorophyll` | `#2CC56F` | Positive telemetry, live node status, Net-Zero badges |
| `--ag-wheat` | `#E4D5BE` | Warm harvest & earth contrast accent |
| `--ag-muted` | `#96B1AC` | Tinted secondary labels & technical descriptions |
| `--ag-border` | `rgba(172, 213, 209, 0.16)` | Subtle structural divider |
| `--ag-border-strong`| `rgba(172, 213, 209, 0.35)` | Active state & focused input boundaries |

---

## 3. Typography Hierarchy

| Role | Font Family | Weight | Size / Line Height | Tracking |
|---|---|---|---|---|
| **Display / Hero Primary** | `Manrope`, sans-serif | 800 (Extrabold) | 4rem–5.5rem / 1.05 | `-0.03em` |
| **Display / Hero Accent** | `Marcellus`, serif | 400 (Regular) | 3.5rem–5rem / 1.1 | `-0.01em` |
| **Section Headings** | `Manrope`, sans-serif | 700–800 | 2.5rem–3.75rem / 1.15 | `-0.02em` |
| **Subheadings & Leads** | `Manrope`, sans-serif | 500 (Medium) | 1.125rem–1.25rem / 1.5 | `normal` |
| **Body Copy** | `Manrope`, sans-serif | 400 (Regular) | 0.875rem–1rem / 1.65 | `normal` (Max 65–75ch) |
| **Technical Telemetry / Specs** | `Manrope`, monospace fallback | 600 (Semibold) | 0.6875rem–0.75rem / 1.4 | `+0.08em` (Uppercase) |

---

## 4. Impeccable Anti-Pattern Guardrails

The interface has been audited and verified via `npx impeccable detect client/src` against the craft floor:

- ❌ **No Eyebrow / Kicker Labels:** Heading hierarchies stand on their own without redundant pill labels above them.
- ❌ **No Generic Identical Cards:** Symmetrical `[icon + title + text]` card grids are replaced with master-detail views, asymmetric comparisons, and interactive telemetry instruments.
- ❌ **No Gradient Text:** Headlines rely on optical size, letter spacing, and weight rather than decorative gradient text fills.
- ❌ **No Artificial Bounce Easings:** Transitions utilize smooth exponential curves (`cubic-bezier(0.16, 1, 0.3, 1)`).
- ✅ **Themed Browser Surfaces:** Custom scrollbars, focus rings, and selection highlights are natively styled to match the palette.

---

## 5. Component Anatomy & Interaction Patterns

### 5.1 Hero with Live Telemetry
- **Left Column:** Typographic statement "The Intelligence of the Earth" with dual tactile CTAs.
- **Right Column:** Living Agronomic Telemetry Canvas tracking subsurface irrigation loss, multispectral drone flight area, and neural soil models.
- **Micro-Interaction:** Cursor tracking creates smooth 3D parallax across terrain strata (`banner-img.jpeg`).

### 5.2 About — Living Field Narrative
- Replaces repetitive cards with an editorial comparison of fragmented industrial agriculture versus the AGverse mega-platform.
- **Telemetry Counter:** An integrated viewport-triggered instrument that animates smoothly from 0 to 10 (`10x Faster than traditional farming methods`).

### 5.3 Technology — Master-Detail Field Triad
- Interactive selector between:
  1. **The Brain:** AI & Neural Soil Optimization (`AI-brain.jpeg`)
  2. **The Hands:** Autonomous Bifacial Solar Robotics (`AI-brain-2.jpeg`)
  3. **The Eyes:** Advanced Drone Multispectral Fleet (`AI-brain-3.jpeg`)
- Displays live engineering specifications (latencies, navigation accuracy, sensor bands).

### 5.4 Statistics — Agronomic Benchmark Matrix
- Four interconnected benchmarks (`10x`, `ZERO`, `24/7`, `NET-ZERO`) with contextual agricultural explanations instead of floating metrics.

### 5.5 Sustainability & Call To Action
- Desert resilience manifesto aligned with the **UAE Net Zero 2050** strategic initiative.
- High-contrast field survey invitation with direct access to the audit diagnostic suite.

### 5.6 Farm Tech Audit Diagnostic Studio (Modal)
- Full-stack interactive workflow:
  - Validates full name, corporate email, phone/WhatsApp, and farm name.
  - Captures acreage, operational location, and specific crop/irrigation challenges.
  - Submits to Node.js REST API (`POST /api/audit-request`).
  - Returns a unique audit reference (`#AGV-XXXXXX`) and celebration confetti.

---

## 6. Audit & Verification Record

```bash
npx impeccable detect client/src
# Result: 13 files scanned. 0 anti-patterns found. Clean bill of health.
```
