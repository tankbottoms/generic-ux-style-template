# Terminal-Inspired UI Design (Web Applications)

## Overview

**Core principle:** Design web applications with developer/terminal aesthetic - monospace-first typography, clean greyscale palettes, data density, and structural clarity. This is for browser-based interfaces (HTML/CSS/JS), NOT actual CLI applications.

**Target:** Data-rich web apps (React, Svelte, Vue) styled like developer tools, documentation sites, forensic analysis dashboards, and timeline-based information systems.

**Aesthetic:** Clean, minimal, data-dense, monospace-first. Subtle refinements make it accessible while maintaining technical feel.

**Implementation Pattern:** Sites are generated from structured data (semantic triples) with consistent page layouts, badge systems, timeline components, and D3 visualizations.

---

## Design Philosophy

### Neo-Brutalist Principles

1. **Raw Honesty** - Monospace typography, visible borders, unapologetic structure
2. **Information Density** - Maximize content per viewport without overwhelming
3. **Functional Aesthetics** - Every visual element serves a purpose
4. **High Contrast** - Clear distinction between foreground and background
5. **Tactile Interaction** - Box shadows that feel "pressable", hover states that respond

### Design Rules

1. **No border-radius on containers** - Cards, boxes, sections use `border-radius: 0` or max `5px`
2. **FULL border-radius on badges** - Category/status/relationship badges use `border-radius: 9999px` (pills)
3. **Rectangular chips for tags** - Keywords, hashtags, document types use `border-radius: 3px`
4. **Hard offset shadows**: `box-shadow: 2px 2px 0px var(--color-shadow)` (3px for featured)
5. **1px borders** on containers - NO left accent borders unless explicitly requested
6. **Color in content only**: Badges, icons, values get color; containers stay neutral
7. **Monospace body text**: Reinforces terminal/developer aesthetic
8. **Serif headings**: H1 only uses serif for visual hierarchy break

---

## Color System

### CSS Variable Architecture

All colors MUST use CSS variables. Never hardcode hex values.

### Light Mode (Default)

```css
:root, [data-theme='light'] {
  /* Backgrounds */
  --color-bg: #fafafa;
  --color-bg-secondary: #ffffff;
  --color-bg-callout: #fafaf8;
  --color-hover-bg: #e8e8e8;
  --color-code-bg: #f5f5f5;
  --color-featured-bg: #ffffff;

  /* Text */
  --color-text: #111111;
  --color-text-muted: #666666;
  --color-code-text: #111111;
  --color-link: #0066cc;

  /* Borders & Lines */
  --color-border: #e5e5e5;
  --color-border-dark: #000000;
  --color-timeline: #d4d4d4;
  --color-featured-border: #000000;

  /* Shadows */
  --color-shadow: #000000;
}
```

### Dark Mode

```css
[data-theme='dark'] {
  --color-bg: #0a0a0a;
  --color-bg-secondary: #1a1a1a;
  --color-bg-callout: #1a1a18;
  --color-hover-bg: #1a1a1a;
  --color-code-bg: #0f0f0f;
  --color-featured-bg: #1a1a1a;

  --color-text: #e5e5e5;
  --color-text-muted: #a0a0a0;
  --color-code-text: #d4d4d4;
  --color-link: #5c9fd8;

  --color-border: #2a2a2a;
  --color-border-dark: #e5e5e5;
  --color-timeline: #3a3a3a;
  --color-featured-border: #e5e5e5;

  --color-shadow: #000000;
}
```

---

## Typography

### Font Stacks

```css
:root {
  --font-mono: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
  --font-serif: 'Georgia', 'Times New Roman', serif;
}
```

### Type Scale

| Element | Font Family | Size | Weight |
|---------|-------------|------|--------|
| Body text | `var(--font-mono)` | 14px | 400 |
| Page titles (h1) | `var(--font-serif)` | 2rem | 600 |
| Section headings (h2) | `var(--font-mono)` | 1.5rem | 600 |
| Subsection headings (h3) | `var(--font-mono)` | 1.25rem | 600 |
| Timeline entry title | `var(--font-mono)` | 0.875rem | 600 |
| Timeline blurb | `var(--font-mono)` | 0.75rem | 400 |
| Badge/tag text | `var(--font-mono)` | 0.65-0.7rem | 400 |
| Date display | `var(--font-mono)` | 0.7rem | 400 |

---

## Badge System

### CRITICAL: Badge Shape Rules

| Type | Shape | Border Radius | Usage |
|------|-------|---------------|-------|
| Category (Type A) | Pill | `9999px` | Primary classifications, main groupings |
| Secondary (Type B) | Pill | `9999px` | Entities, people, warm-toned colors |
| Status (Type C) | Pill | `9999px` | Hierarchy levels, state indicators |
| Relationship | Pill | `9999px` | Connections between entities, with count indicators |
| Tag/Keyword | Rectangle | `3px` | Outline-only chips for search terms |
| Document Type | Rectangle | `3px` | File types, format codes |

### Category Badge (Pill)

```css
.category-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.65rem;
  font-weight: 500;
  padding: 0.15rem 0.5rem;
  border: 1px solid;
  border-radius: 9999px;  /* PILL SHAPE - always */
  font-family: var(--font-mono);
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.15s ease;
}

.category-badge:hover {
  transform: translateY(-1px);
  box-shadow: 1px 1px 0px var(--color-shadow);
}
```

### Tag Chip (Rectangular)

```css
.tag-chip {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 400;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;  /* RECTANGULAR - for tags only */
  border: 1px solid var(--color-border-dark);
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
}

.tag-chip:hover {
  background: var(--color-hover-bg);
}
```

---

## Icon System

Use Font Awesome Pro with preference for **thin/light styles** for a clean, minimal look:

### Icon Style Preference (Priority Order)

1. `fat` / `fa-thin` - **DEFAULT** (weight 100)
2. `fal` / `fa-light` - Secondary (weight 300)
3. `far` / `fa-regular` - Tertiary (weight 400)
4. `fad` / `fa-duotone` - For emphasis (two-tone)
5. `fas` / `fa-solid` - **AVOID** unless necessary (weight 900)

### Common Icons

| Purpose | Icon |
|---------|------|
| Back/Return | fa-arrow-left |
| Search | fa-search / fa-magnifying-glass |
| External link | fa-arrow-up-right-from-square |
| Calendar/Date | fa-calendar |
| Document | fa-file-lines |
| User/Individual | fa-user |
| Entity/Building | fa-building |
| Network | fa-chart-network |
| Timeline | fa-timeline |
| Filter | fa-filter |
| Copy | fa-copy |

---

## Implementation Checklist

Before deploying, verify:

- [ ] Background uses CSS variables (#fafafa light, #0a0a0a dark)
- [ ] Body text uses monospace fonts
- [ ] H1 uses serif (Georgia), other headings use monospace
- [ ] Containers have border-radius 0 or max 5px (no rounding)
- [ ] Category/status/relationship badges use border-radius: 9999px (pill shape)
- [ ] Tag chips and document type badges use border-radius: 3px (rectangular)
- [ ] Section boxes have uniform 1px borders (NO left accent borders)
- [ ] Hard offset shadows (2px 2px 0px) on interactive elements
- [ ] Icons use fa-thin (fat) style by default
- [ ] Category badges have consistent colors across site
- [ ] Filter badges are non-mutually exclusive toggles (pill shape)
- [ ] All links verified working
- [ ] Build produces no errors or warnings

---

## Anti-Patterns to Avoid

| Anti-Pattern | Better Approach |
|--------------|-----------------|
| Left accent borders on section boxes | Uniform 1px borders all sides |
| Rounded corners on containers | Containers use border-radius: 0 or max 5px |
| Rectangular badges for categories | Category/status badges use border-radius: 9999px (pill) |
| Pill-shaped tag chips | Tags/keywords use border-radius: 3px (rectangular) |
| fa-solid icons by default | Use fa-thin (fat) icons |
| Hardcoded colors | Always use CSS variables |
| Sans-serif body fonts | Monospace for body text |
| Mutually exclusive filter badges | Non-mutually exclusive toggles |
| Missing count indicators | Show counts on sections |
| No back links on detail pages | Always include back link |
