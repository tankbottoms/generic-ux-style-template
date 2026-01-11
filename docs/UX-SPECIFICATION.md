# UX Specification - Comprehensive Design System

**Version:** 4.0
**Generated:** 2026-01-11
**Purpose:** Domain-agnostic design patterns for consistent UI generation

This specification provides precise, unambiguous styling rules for all UI components. Follow these patterns exactly to ensure visual consistency across all generated pages. The patterns are generic - adapt category names and colors to your specific domain while maintaining the exact visual styling.

**Reference Implementations:**
- Timeline/Cards: https://cane.pantsonfire.xyz
- Team Cards/Badges: https://cane.pantsonfire.xyz/team
- Tables/Filters: https://sec-edgar-cane-cik-visualizer.vercel.app/data/entities
- Triples/Relationships: https://sec-edgar-cane-cik-visualizer.vercel.app/data/triples

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Badge System](#4-badge-system) - **CRITICAL: Rectangular shape, pastel colors**
5. [Search Interface](#5-search-interface)
6. [Timeline Component](#6-timeline-component)
7. [Data Table Patterns](#7-data-table-patterns)
8. [Filter Controls](#8-filter-controls)
9. [Visualization Patterns](#9-visualization-patterns)
10. [Card and Box Patterns](#10-card-and-box-patterns)
11. [Layout Patterns](#11-layout-patterns)
12. [Navigation Patterns](#12-navigation-patterns)
13. [Interactive States](#13-interactive-states)
14. [Responsive Design](#14-responsive-design)
15. [Page Templates](#15-page-templates)
16. [D3 Visualization Examples](#16-d3-visualization-examples)

---

## 1. Design Philosophy

### Core Principles

| Principle | Implementation |
|-----------|----------------|
| Terminal Aesthetic | Monospace-first typography for ALL elements including h1 |
| Information Density | Compact layouts, timeline-based navigation with sticky markers |
| Minimal Shadow | Shadow ONLY on featured entries (3px 3px 0px), not on regular elements |
| Pastel Color Palette | Light pastel backgrounds with colored text/borders, never dark solid fills |
| Sky-Blue Preference | Use sky-blue tones instead of purple throughout the design |

### Critical Rules

1. **NO border-radius on containers** - Cards, boxes, sections use `border-radius: 0` or max `5px`
2. **RECTANGULAR badges** - All badges use `border-radius: 3px` to `5px`, NOT pills (9999px)
3. **Minimal shadows** - Shadow ONLY on featured/highlighted entries, not on regular cards or badges
4. **No colored left borders** - Cards and entries use simple borders, no accent left borders
5. **Pastel badge colors** - Light backgrounds (20% opacity) with matching colored text
6. **Show all by default** - Pages display all data initially, not empty waiting for user toggle

---

## 2. Color System

### CSS Variables (Required)

```css
:root {
  /* Backgrounds */
  --color-bg: #fafafa;
  --color-bg-secondary: #ffffff;
  --color-hover-bg: #f5f5f5;

  /* Text */
  --color-text: #111111;
  --color-text-muted: #666666;
  --color-link: #0066cc;

  /* Borders */
  --color-border: #e5e5e5;
  --color-border-dark: #000000;
  --color-timeline: #d4d4d4;

  /* Shadows - Use sparingly, only on featured elements */
  --color-shadow: rgba(0, 0, 0, 0.15);

  /* Fonts - Monospace for everything */
  --font-mono: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;

  /* Accent Colors - Sky-blue preferred over purple */
  --color-accent-primary: #0ea5e9;    /* Sky-500 */
  --color-accent-light: #e0f2fe;      /* Sky-100 */
  --color-accent-dark: #0369a1;       /* Sky-700 */
}

[data-theme='dark'] {
  --color-bg: #0a0a0a;
  --color-bg-secondary: #1a1a1a;
  --color-hover-bg: #252525;
  --color-text: #e5e5e5;
  --color-text-muted: #a0a0a0;
  --color-link: #38bdf8;
  --color-border: #2a2a2a;
  --color-border-dark: #e5e5e5;
  --color-timeline: #3a3a3a;
  --color-accent-primary: #38bdf8;
  --color-accent-light: #0c4a6e;
  --color-accent-dark: #7dd3fc;
}
```

### Accent Color Note

**DO NOT use purple.** Replace any purple tones with sky-blue alternatives:

| Instead of | Use |
|------------|-----|
| #9c27b0 (purple) | #0ea5e9 (sky-blue) |
| #7b1fa2 (dark purple) | #0369a1 (dark sky-blue) |
| #e8d5f0 (light purple) | #e0f2fe (light sky-blue) |

---

## 3. Typography

### Font Usage

**IMPORTANT:** Use monospace for ALL elements including h1. No serif fonts.

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Page title (h1) | mono | 2rem | 600 |
| Section heading (h2) | mono | 1.5rem | 600 |
| Section heading (h3) | mono | 1.25rem | 600 |
| Body text | mono | 14px | 400 |
| Badge text | mono | 0.7rem | 500 |
| Table headers | mono | 0.75rem | 600 |
| Muted/meta text | mono | 0.75rem | 400 |

### CSS Implementation

```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-mono);
}

h1 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

/* DO NOT use serif fonts anywhere */
```

---

## 4. Badge System

### CRITICAL: Badge Shape and Color Reference

**All badges are RECTANGULAR with `border-radius: 3px` to `5px`** - NOT pills

**All badges use pastel backgrounds** - Light colors (15-25% opacity) with matching text

### 4.1 Base Badge Styling

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;           /* NOT 9999px - rectangular! */
  border: 1px solid;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

/* NO shadows on badges */
.badge:hover {
  filter: brightness(0.95);
}
```

### 4.2 Category/Filter Badges

Used for: Main groupings, filtering, scheme tags

**Shape:** Rectangular (`border-radius: 3px`)
**Style:** Light pastel background, colored border and text
**With count:** Display count number after label (e.g., "CATEGORY 123")

```css
.category-badge {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
  border: 1px solid;
}

.category-badge .count {
  font-weight: 600;
  margin-left: 0.25rem;
  opacity: 0.7;
}
```

**Category Color Palette (Pastel - NO purple):**

| Color ID | Semantic Use | Background | Border | Text |
|----------|--------------|------------|--------|------|
| pink-1 | Alert, critical | #fce4ec | #f48fb1 | #c2185b |
| red-1 | Error, danger | #ffebee | #ef9a9a | #c62828 |
| orange-1 | Warning | #fff3e0 | #ffcc80 | #e65100 |
| amber-1 | Attention | #fffde7 | #fff176 | #f57f17 |
| green-1 | Success, active | #e8f5e9 | #a5d6a7 | #2e7d32 |
| teal-1 | Verified | #e0f2f1 | #80cbc4 | #00695c |
| sky-1 | Primary, info | #e0f7fa | #80deea | #00838f |
| blue-1 | Secondary info | #e3f2fd | #90caf9 | #1565c0 |
| indigo-1 | Special | #e8eaf6 | #9fa8da | #303f9f |
| gray-1 | Neutral, inactive | #f5f5f5 | #e0e0e0 | #616161 |
| gray-2 | Muted | #eceff1 | #b0bec5 | #546e7a |

### 4.3 Status Badges

Used for: Entity status (active, defunct, merged, etc.), type indicators

**Shape:** Rectangular (`border-radius: 3px`)
**Position:** Inline in tables or top-right in cards
**Style:** Uppercase text, compact padding

```css
.status-badge {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  border: 1px solid;
}
```

**Status Color Palette (as seen in reference sites):**

| Status | Background | Border | Text |
|--------|------------|--------|------|
| active | #e8f5e9 | #66bb6a | #2e7d32 |
| public | #e3f2fd | #64b5f6 | #1565c0 |
| private | #f5f5f5 | #bdbdbd | #616161 |
| defunct | #eceff1 | #90a4ae | #546e7a |
| dissolved | #ffebee | #ef9a9a | #c62828 |
| merged | #eceff1 | #90a4ae | #546e7a |
| revoked | #ffebee | #ef9a9a | #c62828 |
| name_changed | #fff8e1 | #ffd54f | #f57f17 |
| deregistered | #eceff1 | #90a4ae | #546e7a |
| unknown | #f5f5f5 | #e0e0e0 | #9e9e9e |
| indicted | #ffebee | #ef5350 | #c62828 |
| convicted | #ffebee | #e53935 | #b71c1c |
| named | #e3f2fd | #42a5f5 | #1565c0 |
| judgment | #fff3e0 | #ffb74d | #e65100 |

### 4.4 Entity Type Badges

Used for: INDIVIDUAL, ENTITY, LITERAL type indicators in tables

**Shape:** Rectangular, very compact
**Style:** Uppercase, small font

```css
.entity-type-badge {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  border: 1px solid;
}
```

| Type | Background | Border | Text |
|------|------------|--------|------|
| individual | #e0f2fe | #7dd3fc | #0369a1 |
| entity | #f0fdf4 | #86efac | #166534 |
| literal | #f5f5f5 | #d4d4d4 | #737373 |

### 4.5 Scheme/Project Badges with Date Ranges

Used for: Scheme tags in cards (e.g., "WEST 1996-2001")

**Shape:** Rectangular
**Style:** Two-part badge with scheme code and date range

```css
.scheme-badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  border-radius: 3px;
  border: 1px solid;
  overflow: hidden;
}

.scheme-badge .code {
  font-weight: 600;
  padding: 0.15rem 0.4rem;
}

.scheme-badge .date {
  font-weight: 400;
  padding: 0.15rem 0.4rem;
  opacity: 0.7;
  font-size: 0.6rem;
}
```

### 4.6 Toggle States

**Untoggled (default):** Light pastel background, show all by default
**Toggled/Active:** Slightly darker background or inverted colors

```css
/* Default/untoggled state - light and pastel */
.badge {
  background: var(--badge-bg);
  border-color: var(--badge-border);
  color: var(--badge-text);
}

/* Active/toggled state */
.badge.active {
  background: var(--badge-border);
  color: white;
}

/* Or alternative: darker pastel */
.badge.active {
  filter: brightness(0.85);
}
```

**IMPORTANT:** Pages should show all data by default. Badges start "untoggled" (pastel/light) and toggle to filter DOWN, not up.

---

## 5. Search Interface

### Search Input

```css
.search-input {
  width: 100%;
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--color-text);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-text);
  padding: 0.5rem 0;
  outline: none;
}

.search-input:focus {
  border-bottom-width: 2px;
}

.search-input::placeholder {
  color: var(--color-text-muted);
  opacity: 0.6;
}
```

### Filter Badge Groups

Layout filter badges in labeled groups:

```html
<div class="filter-group">
  <span class="filter-label">Category Type A:</span>
  <div class="filter-badges">
    <!-- Primary category badges here -->
  </div>
</div>
<div class="filter-group">
  <span class="filter-label">Category Type B:</span>
  <div class="filter-badges">
    <!-- Secondary category badges here -->
  </div>
</div>
<div class="filter-group">
  <span class="filter-label">Tags:</span>
  <div class="filter-badges">
    <!-- Tag chips here -->
  </div>
</div>
```

```css
.filter-group {
  margin-bottom: 1rem;
}

.filter-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.filter-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
```

### Previous Searches

Store and display recent searches:

```css
.previous-searches {
  margin-top: 1rem;
  font-size: 0.8rem;
}

.previous-searches-label {
  color: var(--color-text-muted);
  margin-right: 0.5rem;
}

.previous-search-chip {
  /* Use tag-chip styling */
  cursor: pointer;
}
```

**Behavior:**

- Store in localStorage under key `previousSearches`
- Display most recent 10 searches
- Click to re-execute search
- Update URL to `?q={search-term}`

---

## 6. Timeline Component

### Structure

```
Timeline Container
  Year Section (sticky)
    Year Marker
    Month Section
      Month Marker (sticky)
      Timeline Line (vertical)
        Timeline Entry (alternating: featured / regular)
          Entry Header (date + title)
          Entry Content (description)
          Entry Meta (badges + severity rating)
```

### Year/Month Markers

```css
.year-marker {
  position: sticky;
  top: 1rem;
  z-index: 10;
  font-family: var(--font-mono);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-text-muted);
  opacity: 0.4;
  width: 70px;
  transition: opacity 0.3s ease;
}

.year-marker.sticky-active {
  opacity: 1;
  color: var(--color-text);
}

.month-marker {
  position: sticky;
  top: 3.5rem;
  z-index: 5;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}
```

### Timeline Line

```css
.timeline {
  position: relative;
  border-left: 1px solid var(--color-timeline);
  margin-left: 1rem;
  padding-left: 1.5rem;
}

.timeline-dot {
  position: absolute;
  left: -4px;
  top: 0.5rem;
  width: 7px;
  height: 7px;
  background: var(--color-border-dark);
  border-radius: 1px;
  outline: 2px solid var(--color-bg);
}
```

### Timeline Entry (Alternating Pattern)

**Pattern:** 1 featured (boxed with shadow), 2 regular (simple border or no border), repeat

**IMPORTANT:**
- NO colored left border on entries
- Shadow ONLY on featured entries
- Regular entries have simple 1px border OR no border

```css
.timeline-entry {
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  transition: all 0.15s ease;
}

/* Featured entries - ONLY these get shadow */
.timeline-entry.featured {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-dark);
  box-shadow: 3px 3px 0px var(--color-shadow);
  /* NO colored left border - just uniform 1px border */
}

.timeline-entry.featured:hover {
  transform: translateY(-1px);
}

/* Regular entries - simple border, NO shadow */
.timeline-entry.regular {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  /* NO shadow */
  /* NO colored left border */
}

.timeline-entry.regular:hover {
  border-color: var(--color-border-dark);
}

/* Borderless entries */
.timeline-entry.borderless {
  background: transparent;
  border: none;
}

.timeline-entry.borderless:hover {
  background: var(--color-hover-bg);
}
```

### Entry Content

```css
.entry-header {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.entry-date {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.entry-title {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
}

.entry-description {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  line-height: 1.6;
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

.entry-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.entry-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.entry-rating {
  display: flex;
  gap: 2px;
}
```

### Severity Rating Icons

Use custom icons or Font Awesome to indicate importance/severity (1-5 scale):

```css
.severity-rating {
  display: flex;
  gap: 2px;
}

.severity-icon {
  width: 18px;
  height: 18px;
  opacity: 0.25;
}

.severity-icon.filled {
  opacity: 1;
}

/* Click to filter by severity */
.severity-icon:hover {
  cursor: pointer;
  transform: scale(1.1);
}
```

### Filter by Severity

Display filter icons above timeline for severity filtering:

```css
.severity-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.severity-filter-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}
```

---

## 7. Data Table Patterns

### Page Structure

```
Page Container
  Back Link
  Page Title (with icon)
  Description Box (bordered, narrative text)
  Filter Box (dropdowns, search, buttons)
  View Toggle (Grouped / Flat List)
  Data Table or Grouped Sections
```

### Description Box

```css
.description-box {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  line-height: 1.6;
}
```

### Filter Box

```css
.filter-box {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.filter-box h3 {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-box h3 i {
  color: var(--color-text-muted);
}

.filter-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.filter-select {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-button {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border-dark);
  background: var(--color-bg-secondary);
  cursor: pointer;
}

.filter-button:hover {
  box-shadow: 2px 2px 0px var(--color-shadow);
}

.filter-button.primary {
  background: var(--color-border-dark);
  color: var(--color-bg);
}
```

### View Toggle

```css
.view-toggle {
  display: inline-flex;
  margin-bottom: 1rem;
}

.view-toggle-button {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border-dark);
  background: var(--color-bg-secondary);
  cursor: pointer;
}

.view-toggle-button:first-child {
  border-right: none;
}

.view-toggle-button.active {
  background: var(--color-border-dark);
  color: var(--color-bg);
}
```

### Data Table

```css
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-mono);
  font-size: 0.8rem;
}

.data-table th {
  text-align: left;
  font-weight: 600;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 0.75rem;
  border-bottom: 2px solid var(--color-border-dark);
  color: var(--color-text-muted);
}

.data-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--color-border);
  vertical-align: top;
}

.data-table tr:hover {
  background: var(--color-hover-bg);
}
```

### Grouped Sections

```css
.grouped-section {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  margin-bottom: 1rem;
}

.grouped-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border);
}

.grouped-section-title {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 600;
}

.grouped-section-count {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.expand-button {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-link);
  cursor: pointer;
}
```

---

## 8. Filter Controls

### Category Filter Buttons

Colorful pill buttons for filtering by category:

```css
.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-filter-button {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  padding: 0.3rem 0.6rem;
  border-radius: 9999px;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.15s ease;
}

/* Each category gets its own color - see Badge System section */
```

**Filter Category Colors (10 types for navigation/filtering):**

| Color ID | Background | Border | Text |
|----------|------------|--------|------|
| filter-1 | #e2e8f0 | #64748b | #475569 |
| filter-2 | #ccfbf1 | #14b8a6 | #0f766e |
| filter-3 | #fef3c7 | #f59e0b | #b45309 |
| filter-4 | #fce7f3 | #ec4899 | #be185d |
| filter-5 | #fed7d7 | #f87171 | #b91c1c |
| filter-6 | #fef9c3 | #eab308 | #a16207 |
| filter-7 | #f1f5f9 | #94a3b8 | #64748b |
| filter-8 | #fef3c7 | #fbbf24 | #b45309 |
| filter-9 | #dbeafe | #3b82f6 | #1d4ed8 |
| filter-10 | #ede9fe | #8b5cf6 | #6d28d9 |

---

## 9. Visualization Patterns

### Common Structure

```
Visualization Page
  Back Link
  Page Title (with icon)
  Description (1-2 sentences)
  Stats Line (node count, relationship count)
  Controls (sliders, dropdowns, checkboxes)
  Visualization Container (SVG/Canvas)
  Legend Sections
  Navigation Help
```

### Visualization Container

```css
.viz-container {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  padding: 1rem;
  margin-bottom: 1.5rem;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Controls Row

```css
.viz-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 1rem;
}

.viz-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.viz-control-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.viz-slider {
  width: 120px;
}

.viz-dropdown {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--color-border);
}

.viz-checkbox {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
}
```

### Legend Sections

```css
.legend-section {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  padding: 1rem;
  margin-bottom: 1rem;
}

.legend-title {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.legend-line {
  width: 20px;
  height: 3px;
}
```

### Node Category Colors (for network diagrams)

| Category Type | Color |
|---------------|-------|
| Primary nodes | #ef5350 |
| Secondary nodes | #ffa726 |
| Public/external | #42a5f5 |
| Private/internal | #66bb6a |
| Events/actions | #ab47bc |
| Documents | #26c6da |
| Other/default | #bdbdbd |

### Flow Diagram Colors (for sankey/flow charts)

| Node Type | Color |
|-----------|-------|
| Source nodes | #90a4ae |
| Primary destination | #42a5f5 |
| Secondary destination | #7e57c2 |
| Transform/process | #ef5350 |
| Terminal nodes | #26c6da |
| Highlighted | #ef5350 |
| Inactive | #78909c |

---

## 10. Card and Box Patterns

### Section Box

**IMPORTANT:** No colored left borders. Simple 1px uniform border.

```css
.section-box {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  /* NO shadow by default */
  /* NO colored left border */
}

.section-box:hover {
  border-color: var(--color-border-dark);
  /* NO shadow on hover for regular boxes */
}
```

### Information Card (Team Page Style)

As seen on https://cane.pantsonfire.xyz/team

**IMPORTANT:**
- Simple 1px border, NO colored left accent
- Status badge in top-right corner
- Scheme badges at bottom with pastel colors

```css
.info-card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  padding: 1rem 1.25rem;
  position: relative;
  /* NO border-left accent color */
  /* NO shadow */
}

.info-card:hover {
  border-color: var(--color-border-dark);
}

.info-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.info-card-name {
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 600;
}

.info-card-status {
  /* Status badge positioned in top-right */
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
}

.info-card-full-name {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
}

.info-card-role {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.info-card-expertise {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-style: italic;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.info-card-description {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.info-card-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
```

### Featured Box (With Shadow)

Only featured/highlighted content gets shadow styling:

```css
.featured-box {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-dark);
  box-shadow: 3px 3px 0px var(--color-shadow);
  padding: 1rem 1.25rem;
  /* NO colored left border */
}
```

### Description Box

Used for intro text in pages:

```css
.description-box {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  /* NO shadow */
  /* NO colored border */
}

.description-box p {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.6;
  margin: 0;
}
```

### Stats Box

Box displaying summary statistics:

```css
.stats-box {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
}

.stats-box .stat-count {
  font-family: var(--font-mono);
  font-weight: 700;
}
```

---

## 11. Layout Patterns

### Page Container

```css
.page-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-container.wide {
  max-width: 1200px;
}

.page-container.narrow {
  max-width: 750px;
}
```

### Page Header

```css
.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-family: var(--font-mono);
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.page-title i {
  color: var(--color-text-muted);
}

.page-subtitle {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--color-text-muted);
}
```

### Grid Layouts

```css
/* Auto-fit grid for cards */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

/* Two-column layout */
.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

/* Sidebar layout */
.with-sidebar {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .two-column,
  .with-sidebar {
    grid-template-columns: 1fr;
  }
}
```

---

## 12. Navigation Patterns

### Header Navigation

```css
.nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--color-text);
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
  text-underline-offset: 6px;
  text-decoration-thickness: 2px;
}

.nav-link.active {
  text-decoration: underline;
  text-decoration-thickness: 2px;
}
```

### Back Link

```css
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-link);
  text-decoration: none;
  margin-bottom: 1.5rem;
}

.back-link:hover {
  text-decoration: underline;
}
```

---

## 13. Interactive States

### Hover Effects

```css
/* Card hover */
.card:hover {
  border-color: var(--color-border-dark);
  box-shadow: 2px 2px 0px var(--color-shadow);
}

/* Badge hover */
.badge:hover {
  transform: translateY(-1px);
  box-shadow: 1px 1px 0px var(--color-shadow);
}

/* Button hover */
.button:hover {
  box-shadow: 2px 2px 0px var(--color-shadow);
}

/* Link hover */
a:hover {
  text-decoration: underline;
  text-decoration-thickness: 2px;
}
```

### Active/Selected States

```css
.badge.active,
.filter-button.active {
  box-shadow: inset 0 0 0 1px var(--color-border-dark);
}

.toggle-button.active {
  background: var(--color-border-dark);
  color: var(--color-bg);
}
```

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--color-link);
  outline-offset: 2px;
}
```

---

## 14. Responsive Design

### Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| mobile | < 640px | Phones |
| tablet | 640-1024px | Tablets |
| desktop | > 1024px | Desktop |

### Mobile Adjustments

```css
@media (max-width: 640px) {
  .page-container {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.25rem;
  }

  .card-grid {
    grid-template-columns: 1fr;
  }

  .filter-row {
    grid-template-columns: 1fr;
  }

  .viz-controls {
    flex-direction: column;
    align-items: flex-start;
  }

  .data-table {
    font-size: 0.7rem;
  }

  .data-table th,
  .data-table td {
    padding: 0.5rem;
  }
}
```

---

## 15. Page Templates

### Template 1: Timeline Page (Landing/Home)

Use for: Home pages, chronological content, blog/entry listings

**Structure:**

1. Header with logo, title, navigation
2. Introduction box (bordered)
3. Filter controls (icon-based severity, category badges)
4. Timeline with year/month markers
5. Entries with alternating boxed/floating pattern (1 boxed, 2 floating, repeat)
6. Entry content: title, description, badges, rating icons

### Template 2: Search Page

Use for: Search interfaces, filtering interfaces

**Structure:**

1. Search input (underline style)
2. Filter groups by type:
   - Category Type A: Colorful pill badges
   - Category Type B: Warm-toned pill badges
   - Tags: Outline-style rectangular chips
3. Results list with badges and metadata
4. Previous searches section (localStorage)

### Template 3: Data Table Page

Use for: Document indexes, structured data, listings

**Structure:**

1. Back link
2. Page title with icon
3. Description box (narrative text)
4. Filter box (dropdowns, search input, action buttons)
5. View toggle (Grouped / Flat List)
6. Data table or grouped sections
7. Expandable rows for additional info

### Template 4: Card Grid Page

Use for: Entities, items, collections

**Structure:**

1. Page title
2. Description/context
3. Card grid (auto-fit)
4. Each card:
   - Left accent border (category color, 4px)
   - Title with optional icon
   - Status badge (top-right)
   - Subtitle/secondary text
   - Description
   - Category badges at bottom

### Template 5: Visualization Page

Use for: Network graphs, flow diagrams, charts

**Structure:**

1. Back link
2. Page title with icon
3. Brief description
4. Stats line (counts, metrics)
5. Controls row (sliders, dropdowns, checkboxes)
6. Visualization container (SVG/Canvas)
7. Legend sections (categories, relationships)
8. Navigation help text

### Template 6: Reference/Index Page

Use for: Glossaries, type indexes, reference material

**Structure:**

1. Back link
2. Page title
3. Introduction paragraphs with links
4. Search input
5. Category filter buttons (colorful pills)
6. Type filter buttons (optional importance indicators)
7. Reference table with expandable descriptions

---

## Icon Reference

### Font Awesome Setup

**IMPORTANT: Duotone icons require Font Awesome Pro license.** If duotone icons are not rendering, use thin (`fat`) or light (`fal`) variants instead.

**Required CSS include:**

```html
<!-- Font Awesome 6 Pro (if licensed) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<!-- OR self-hosted (recommended) -->
<link rel="stylesheet" href="/fontawesome/css/all.min.css">
```

### Icon Style Classes

| Style | Class Prefix | Description |
|-------|--------------|-------------|
| Thin | `fat` | Lightest weight, recommended |
| Light | `fal` | Light weight |
| Regular | `far` | Standard weight |
| Solid | `fas` | Bold/filled |
| Duotone | `fad` | Two-tone (Pro only) |

**Duotone Fallback:** If duotone (`fad`) icons don't render, replace with thin (`fat`) or light (`fal`):

```html
<!-- Duotone (may not render without Pro) -->
<i class="fad fa-search"></i>

<!-- Fallback to thin (always works) -->
<i class="fat fa-search"></i>

<!-- Or light -->
<i class="fal fa-search"></i>
```

### Common Icons

| Purpose | Icon Name | Recommended Usage |
|---------|-----------|-------------------|
| Search | `fa-magnifying-glass` | `<i class="fat fa-magnifying-glass"></i>` |
| Filter | `fa-filter` | `<i class="fat fa-filter"></i>` |
| Back | `fa-arrow-left` | `<i class="fat fa-arrow-left"></i>` |
| External link | `fa-arrow-up-right-from-square` | `<i class="fat fa-arrow-up-right-from-square"></i>` |
| Document | `fa-file-lines` | `<i class="fat fa-file-lines"></i>` |
| Calendar | `fa-calendar` | `<i class="fat fa-calendar"></i>` |
| User | `fa-user` | `<i class="fat fa-user"></i>` |
| Building | `fa-building` | `<i class="fat fa-building"></i>` |
| Chart | `fa-chart-line` | `<i class="fat fa-chart-line"></i>` |
| Network | `fa-diagram-project` | `<i class="fat fa-diagram-project"></i>` |
| Warning | `fa-triangle-exclamation` | `<i class="fat fa-triangle-exclamation"></i>` |
| Info | `fa-circle-info` | `<i class="fat fa-circle-info"></i>` |
| Check | `fa-check` | `<i class="fat fa-check"></i>` |
| Copy | `fa-copy` | `<i class="fat fa-copy"></i>` |
| Theme toggle | `fa-sun` / `fa-moon` | `<i class="fat fa-sun"></i>` |
| Star | `fa-star` | `<i class="fat fa-star"></i>` |
| Settings | `fa-gear` | `<i class="fat fa-gear"></i>` |
| Menu | `fa-bars` | `<i class="fat fa-bars"></i>` |
| Grid view | `fa-table-cells` | `<i class="fat fa-table-cells"></i>` |
| List view | `fa-list` | `<i class="fat fa-list"></i>` |
| Close | `fa-xmark` | `<i class="fat fa-xmark"></i>` |

### Icon in Headers

```html
<h2><i class="fat fa-filter"></i> Section Title</h2>
```

```css
h2 i {
  color: var(--color-text-muted);
  margin-right: 0.5rem;
}
```

---

## Quick Reference: Badge Shapes

**ALL badges are RECTANGULAR** - no pills!

| Badge Type | Border Radius | Use Case |
|------------|---------------|----------|
| Category badges | `3px` (rectangular) | Primary classifications, filters |
| Status badges | `3px` (rectangular) | Active, defunct, merged, etc. |
| Entity type badges | `3px` (rectangular) | Individual, entity, literal |
| Scheme badges | `3px` (rectangular) | Project/scheme tags with dates |
| Filter chips | `3px` (rectangular) | Toggle filters |
| Tag chips | `3px` (rectangular) | Keywords, search terms |

---

## 16. D3 Visualization Examples

### Recommended Chart Types

| Chart Type | Use Case | D3 Module |
|------------|----------|-----------|
| Force-Directed Graph | Entity relationships, networks | d3-force |
| Sankey Diagram | Fund flows, transactions | d3-sankey |
| Timeline | Chronological events | d3-axis, d3-scale |
| Treemap | Hierarchical data, ownership | d3-hierarchy |
| Bar Chart | Comparisons, counts | d3-scale, d3-axis |
| Sunburst | Hierarchical relationships | d3-hierarchy |

### Force-Directed Network Graph

Used for entity relationships (as seen in SEC visualizer):

```javascript
// D3 Force-Directed Graph Setup
const width = 900;
const height = 600;

const svg = d3.select('#viz-container')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// Node colors based on entity type
const nodeColors = {
  individual: '#e0f2fe',   // Sky-100
  entity: '#f0fdf4',       // Green-50
  filing: '#fef3c7',       // Amber-100
  scheme: '#fce4ec'        // Pink-100
};

const simulation = d3.forceSimulation(nodes)
  .force('link', d3.forceLink(links).id(d => d.id).distance(100))
  .force('charge', d3.forceManyBody().strength(-300))
  .force('center', d3.forceCenter(width / 2, height / 2))
  .force('collision', d3.forceCollide().radius(30));

// Draw links
const link = svg.append('g')
  .selectAll('line')
  .data(links)
  .join('line')
  .attr('stroke', '#d4d4d4')
  .attr('stroke-width', 1);

// Draw nodes
const node = svg.append('g')
  .selectAll('circle')
  .data(nodes)
  .join('circle')
  .attr('r', d => d.importance ? 12 : 8)
  .attr('fill', d => nodeColors[d.type] || '#f5f5f5')
  .attr('stroke', '#000')
  .attr('stroke-width', 1);
```

### Sankey Diagram (Fund Flows)

```javascript
// D3 Sankey Setup
const sankey = d3.sankey()
  .nodeWidth(20)
  .nodePadding(10)
  .extent([[1, 1], [width - 1, height - 1]]);

const { nodes, links } = sankey({
  nodes: data.nodes.map(d => Object.assign({}, d)),
  links: data.links.map(d => Object.assign({}, d))
});

// Node colors
const nodeColors = {
  source: '#e0f2fe',       // Sky-100
  intermediary: '#fef3c7', // Amber-100
  destination: '#f0fdf4'   // Green-50
};

// Draw links
svg.append('g')
  .selectAll('path')
  .data(links)
  .join('path')
  .attr('d', d3.sankeyLinkHorizontal())
  .attr('fill', 'none')
  .attr('stroke', d => nodeColors[d.source.type])
  .attr('stroke-opacity', 0.5)
  .attr('stroke-width', d => Math.max(1, d.width));
```

### Timeline Visualization

```javascript
// D3 Timeline Setup
const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const width = 900 - margin.left - margin.right;
const height = 200 - margin.top - margin.bottom;

const x = d3.scaleTime()
  .domain(d3.extent(data, d => d.date))
  .range([0, width]);

const svg = d3.select('#timeline')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

// Draw axis
svg.append('g')
  .attr('transform', `translate(0,${height})`)
  .call(d3.axisBottom(x))
  .style('font-family', 'var(--font-mono)')
  .style('font-size', '0.7rem');

// Draw events
svg.selectAll('circle')
  .data(data)
  .join('circle')
  .attr('cx', d => x(d.date))
  .attr('cy', height / 2)
  .attr('r', 6)
  .attr('fill', '#e0f2fe')
  .attr('stroke', '#0ea5e9')
  .attr('stroke-width', 1);
```

### Treemap (Ownership Structure)

```javascript
// D3 Treemap Setup
const treemap = d3.treemap()
  .size([width, height])
  .padding(2);

const root = d3.hierarchy(data)
  .sum(d => d.value)
  .sort((a, b) => b.value - a.value);

treemap(root);

// Color scale
const color = d3.scaleOrdinal()
  .domain(['public', 'private', 'offshore'])
  .range(['#e3f2fd', '#f5f5f5', '#fef3c7']);

// Draw cells
svg.selectAll('rect')
  .data(root.leaves())
  .join('rect')
  .attr('x', d => d.x0)
  .attr('y', d => d.y0)
  .attr('width', d => d.x1 - d.x0)
  .attr('height', d => d.y1 - d.y0)
  .attr('fill', d => color(d.data.type))
  .attr('stroke', '#000')
  .attr('stroke-width', 1);
```

### Visualization Container Styling

```css
.viz-container {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  padding: 1rem;
  min-height: 500px;
}

.viz-container svg {
  display: block;
  margin: 0 auto;
}

/* Node labels */
.viz-container text {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  fill: var(--color-text);
}

/* Tooltip */
.viz-tooltip {
  position: absolute;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-dark);
  padding: 0.5rem 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  pointer-events: none;
  z-index: 100;
}
```

### Legend Styling

```css
.viz-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.viz-legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.viz-legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  border: 1px solid var(--color-border-dark);
}

.viz-legend-line {
  width: 20px;
  height: 2px;
}
```

---

*This specification provides exact styling rules. Follow these patterns precisely to maintain visual consistency across all generated pages. Adapt category names to your domain while preserving the exact CSS values.*

**Version 4.0** - Updated 2026-01-11
- Changed all badges from pills to rectangular (border-radius: 3px)
- Replaced purple with sky-blue throughout
- Removed colored left borders from cards/entries
- Restricted shadows to featured entries only
- Added monospace font for all headings including h1
- Fixed Font Awesome icon references (use `fat` instead of `fad`)
- Added D3 visualization examples
- Pages show all data by default
