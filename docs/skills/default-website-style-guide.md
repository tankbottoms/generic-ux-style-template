# Default Website Style Guide

A generic, TUI-compatible design system for web applications. Use this skill when creating HTML pages, dashboards, or web components that prioritize clarity, accessibility, and clean data presentation.

**Full Specification:** See [UX-SPECIFICATION.md](../UX-SPECIFICATION.md) for complete specifications including all page templates, D3 visualizations, and color palettes.

**Reference Implementations:**

- Timeline/Entry styling: https://cane.pantsonfire.xyz
- Card/Badge styling: https://cane.pantsonfire.xyz/team
- Table/Filter styling: https://sec-edgar-cane-cik-visualizer.vercel.app/data/triples

## Design Philosophy

### Core Principles

1. **TUI-Compatible**: Design patterns that translate well to terminal interfaces
2. **Information Density**: Maximize useful content without clutter
3. **Simple Palette**: White/black base with pastel badges for status
4. **Typography-First**: Monospace font for ALL text including h1 headings
5. **Minimal Shadows**: Only featured entries get box-shadow
6. **No Colored Left Borders**: Cards use uniform 1px borders only
7. **Rectangular Badges**: All badges use 3-5px border-radius (NOT pills)
8. **Accessible**: Semantic markup, keyboard navigable

## Typography

### Font Stack

```css
--font-mono: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
/* NO serif font - monospace for everything */
```

### Usage Guidelines

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Page title (h1) | Mono | 600 | 2rem |
| Section headers (h2) | Mono | 600 | 1.5rem |
| Subsection headers (h3+) | Mono | 600 | 1.1rem |
| Body text | Mono | 400 | 14px |
| Labels/captions | Mono | 400 | 0.75rem |
| Data values | Mono | 700 | varies |
| Button text | Mono | 500 | 0.85rem |
| Badge text | Mono | 500 | 0.65rem |

## Color System

### Light Mode

```css
:root {
    --color-bg: #fafafa;
    --color-bg-secondary: #ffffff;
    --color-text: #111111;
    --color-text-muted: #666666;
    --color-border: #e5e5e5;
    --color-border-dark: #000000;
    --color-link: #0066cc;
    --color-hover-bg: #f5f5f5;
    --color-shadow: rgba(0, 0, 0, 0.15);

    /* Accent - Sky-blue (NOT purple) */
    --color-accent: #0ea5e9;
    --color-accent-light: #e0f2fe;
    --color-accent-dark: #0369a1;
}
```

### Dark Mode

```css
[data-theme='dark'] {
    --color-bg: #0a0a0a;
    --color-bg-secondary: #1a1a1a;
    --color-text: #e5e5e5;
    --color-text-muted: #a0a0a0;
    --color-border: #2a2a2a;
    --color-border-dark: #e5e5e5;
    --color-link: #5c9fd8;
    --color-hover-bg: #252525;
    --color-shadow: rgba(0, 0, 0, 0.3);
}
```

## Badge System

### CRITICAL: Badge Shape Rules

**ALL badges are RECTANGULAR** with `border-radius: 3px`

Do NOT use pill-shaped badges (9999px). All badges use small border-radius.

| Type | Shape | Border Radius | Usage |
|------|-------|---------------|-------|
| Category | Rectangle | `3px` | Primary classifications |
| Entity/Person | Rectangle | `3px` | Warm-toned entity badges |
| Status | Rectangle | `3px` | State indicators (active, pending, etc.) |
| Tag/Keyword | Rectangle | `3px` | Outline-only chips |
| Document Type | Rectangle | `3px` | File types, format codes |

### Badge CSS Pattern

```css
.badge {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 500;
    padding: 0.15rem 0.5rem;
    border-radius: 3px;           /* RECTANGULAR - NOT 9999px */
    border: 1px solid;
    /* NO shadow on badges */
}

.badge:hover {
    transform: translateY(-1px);
    /* NO shadow on hover */
}
```

### Badge Color Palette (Pastel)

| Color | Background | Border | Text |
|-------|------------|--------|------|
| Green/Active | rgba(34, 197, 94, 0.15) | #22c55e | #16a34a |
| Blue/Primary | rgba(14, 165, 233, 0.15) | #0ea5e9 | #0284c7 |
| Yellow/Pending | rgba(234, 179, 8, 0.15) | #eab308 | #a16207 |
| Cyan/Info | rgba(6, 182, 212, 0.15) | #06b6d4 | #0891b2 |
| Red/Error | rgba(239, 68, 68, 0.15) | #ef4444 | #dc2626 |
| Gray/Neutral | rgba(107, 114, 128, 0.15) | #6b7280 | #4b5563 |
| Orange/Warning | rgba(249, 115, 22, 0.15) | #f97316 | #ea580c |
| Orange/Person | rgba(251, 146, 60, 0.12) | #fb923c | #ea580c |

## Shadow Rules

### CRITICAL: Minimal Shadows

Shadows are ONLY used on featured entries. Regular cards, badges, and containers do NOT get shadows.

```css
/* Featured Entry - ONLY element with shadow */
.featured-entry {
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border-dark);
    box-shadow: 3px 3px 0px var(--color-shadow);
    padding: var(--space-md);
}

/* Regular Entry - NO shadow */
.timeline-entry {
    border: 1px solid var(--color-border);
    /* NO shadow */
}

/* Cards - NO shadow */
.card {
    border: 1px solid var(--color-border);
    /* NO shadow, NO colored left border */
}
```

## Layout Structure

### Container Widths

```css
--width-content: 900px;      /* Main content area */
--width-narrow: 750px;       /* Blog posts, articles */
--width-wide: 1200px;        /* Dashboards, tables */
--width-modal: 500px;        /* Floating panes */
```

### Spacing Scale

```css
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-xxl: 3rem;      /* 48px */
```

## Timeline Entry Pattern

Use alternating featured/regular entries:

```html
<!-- Featured Entry - WITH shadow -->
<div class="timeline-entry featured">
    <span class="timeline-date">2024-01</span>
    <h3 class="timeline-title">Featured Event Title</h3>
    <p>Description text...</p>
    <div class="badge-group">
        <span class="badge badge-blue">Category</span>
        <span class="badge badge-green">Status</span>
    </div>
</div>

<!-- Regular Entry - NO shadow -->
<div class="timeline-entry regular">
    <span class="timeline-date">2024-02</span>
    <h3 class="timeline-title">Regular Event</h3>
</div>
```

## Icons (Font Awesome Thin)

Use Font Awesome Thin (`fat`) for light icon style. Do NOT use duotone (`fad`) as it requires a Pro license.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
```

### Common Icon Usage

| Purpose | Icon | Class |
|---------|------|-------|
| Info tooltip | fa-circle-question | `<i class="fat fa-circle-question"></i>` |
| Close/dismiss | fa-xmark | `<i class="fat fa-xmark"></i>` |
| Expand | fa-chevron-right | `<i class="fat fa-chevron-right"></i>` |
| Settings | fa-gear | `<i class="fat fa-gear"></i>` |
| External link | fa-arrow-up-right-from-square | `<i class="fat fa-arrow-up-right-from-square"></i>` |
| Search | fa-magnifying-glass | `<i class="fat fa-magnifying-glass"></i>` |

**Fallback:** If thin icons don't render, use light (`fal`) or regular (`far`).

## Default State

Pages should show ALL data by default, not empty waiting for user toggle. Filters should start in "show all" state.

## TUI Compatibility Notes

This design system translates well to terminal interfaces:

| Web Element | TUI Equivalent |
|-------------|----------------|
| Cards with borders | Box-drawing characters |
| Badges | Bracketed text `[ACTIVE]` |
| Buttons | Highlighted text or brackets |
| Tables | ASCII tables |
| Icons | Unicode symbols or text |
| Accordion | Collapsible sections with +/- |
| Modal | Centered overlay box |
| Colors | ANSI color codes |
