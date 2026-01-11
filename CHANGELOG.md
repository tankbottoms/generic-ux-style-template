# Changelog

All notable changes to this project will be documented in this file.

## [v3.1] - 2026-01-11

### Added

- **Icons Section on Main Page**: New accordion section demonstrating Font Awesome styles
  - Comparison table of all 5 styles (thin, light, regular, solid, duotone)
  - Usage examples with code snippets
  - Grid of 12 commonly used icons
  - Link to full icon reference page

- **Icon Reference Page** (`/icons`): Comprehensive icon browser
  - 10 categories: Interface, Navigation, Status & Alerts, Communication, Data & Files, Users & People, Shapes & Symbols, Business & Finance, Technology, Media & Content
  - 180+ commonly used icons with descriptions
  - Style selector to preview icons in any of 5 Font Awesome styles
  - Search functionality to filter icons by name or description
  - Copy-to-clipboard for icon class names (copies full class e.g., `fat fa-house`)
  - Visual feedback on successful copy

### Changed

- Updated project structure to include `/icons` route
- Added `expandedSections.icons` to main page accordion state

## [v3.0] - 2026-01-10

### Added

- **SvelteKit 2 Reference Implementation**: Complete web application showcasing the design system
  - Live color palette with primary categories, secondary badges, status badges, and filter tags
  - Typography samples demonstrating font hierarchy
  - Component library: cards, alerts, tables, form elements
  - Layout pattern demonstrations: spacing scale, shadow styles, border radius
  - CSS variables reference with copy-ready code
  - Dark/light theme toggle

- **Project Structure**:
  - `src/app.css`: Complete design system CSS with variables
  - `src/routes/+page.svelte`: Main UX specification page
  - `src/routes/+layout.svelte`: App layout with navigation and theme toggle
  - `src/app.html`: HTML template with Font Awesome integration

- **Documentation Structure**:
  - `docs/UX-SPECIFICATION.md`: Comprehensive design specification (moved from root)
  - `docs/skills/terminal-ui-design.md`: Terminal UI design skill reference
  - `docs/skills/default-website-style-guide.md`: Website style guide skill

### Changed

- **Generic Terminology**: Replaced all domain-specific terms with generic concepts:
  - "Fraud schemes, LTEN, DAVI" replaced with "Category A, B, C, D" (color IDs: green-1, blue-1, etc.)
  - "Principal, Accomplice, Victim" replaced with "Type Alpha, Beta, Gamma, Delta" (warm-1, cool-1, etc.)
  - "Federal, State, Local" replaced with "Primary, Secondary, Tertiary" (level-1, level-2, etc.)

- **Tech Stack**: Migrated to Bun/TypeScript with SvelteKit 2

### Removed

- Legacy template documentation folder
- Old ux-specification-v2.md reference file

## [v0.50] - 2026-01-08

### Added (Major Consolidation)

This release consolidated content from `ux-specification-v2.md` and `template/01-ux-specification.md` into a single comprehensive document with 21 sections.

**New Sections:**

- Table of Contents with quick navigation
- Spacing System with 8px base grid
- Layout Patterns for page structure
- Timeline Component with sticky markers
- Navigation Patterns for header/footer
- Form Controls and Interactive States
- Special Content Blocks (alerts, code, tables)
- Animation Patterns and Keyframes
- Responsive Design breakpoints
- Accessibility requirements
- Theme Customization guide
- Required Assets specification

## [v0.23] - 2026-01-08

### Fixed

- Metadata separator corrected from "." to bullet character
- Added explicit CSS variable for last viewed color

### Added

- Monospace text for tag chips
- Filter tag table with text style column

## [v0.20] - 2026-01-08

### Added

- Alternating Box Pattern (1-2-1 rhythm)
- Timeline Entry Box with asymmetric border-shadow
- Timeline Marker indicators
- Toggle Chip Interaction States
- Search Interface section
- Entry Metadata formatting

## [v0.08] - 2026-01-08

### Added

- Design Principles (Visual Rhythm, Categorical Color Consistency)
- Callout Box and Information Card components
- Categorical Color Palette (6 groups)
- Filter Controls section
- Status Badges (Indicted, Judgment states)

## [v0.01] - 2026-01-07

### Added

- Initial UX specification document
- Core color palette
- Typography system
- Box types (Section, Filter, Stats, Timeline, Featured)
- Category and Status badges
- Icon reference
