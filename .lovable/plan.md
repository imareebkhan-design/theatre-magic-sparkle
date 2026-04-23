

# Wedding Invitation — Document-Driven Iterations

Based on the couple's reference document, three targeted improvements to align the invitation with their vision. The envelope opening (item #1 in their doc) is already implemented — these changes cover the remaining items.

## What the user will see

### 1. South Indian decorative box around "Day 01 / Day 02 / Day 03" pills
Replace the plain rectangular border around each day pill in the wedding timeline with a south-Indian-styled decorative frame (matching the red knotwork box reference): four short corner brackets with small ornamental knot motifs at the midpoint of each side, drawn in the pill's existing color (`#C97B5A` saffron / `#AB8A3B` brass / `#7397A8` blue). Subtle, single-line, watercolor weight — not heavy.

### 2. Venue image slot in the timeline header
Add a square watercolor "venue" illustration above the "Three Days of Celebration" heading (where the red arrow in the reference points). Uses an existing watercolor placeholder (Kanota Camp / mandap-style scene) styled to blend with the ivory background, framed with a soft south-Indian border.

### 3. Dress code & color-code line on each event
Below event descriptions that need it, add a small "Dress Code" line (e.g. *Indo-Western* with two small color swatches) — matching the handwritten note in their reference. Initial values:
- **Engagement** — Indo-Western, blush + ivory swatches
- **Pre-Wedding Reception** — Cocktail, navy + gold swatches
- **Reception Party** — Formal, emerald + champagne swatches

(Other events left clean; couple can request more later.)

### 4. Slightly more vibrant doodle accents (carnival reference)
Add two more small watercolor doodle motifs in the "Rang Rave Carnival" spirit they referenced — hanging marigold bell-strings (`#E8651A` saffron + `#D4A017` turmeric) at the top corners of the Pre-Wedding Celebrations day section, and a small parrot-on-branch doodle near the Baraat event. Watercolor tone, soft, blends with the cream background.

## Visual style

- Reuse the existing south Indian palette (saffron `#E8651A`, turmeric `#D4A017`, temple green `#3B6B4A`, deep rose `#B5334E`, brass gold `#C9922A`).
- All new SVG strokes thin (1–1.3px), watercolor-soft.
- New decorative day-box: each side is a short line + tiny knot rosette — does NOT enclose the pill in a heavy box, sits OUTSIDE it as accent corners.

## Technical approach

- ✏️ `src/components/SouthIndianIllustrations.tsx` — add new exports:
  - `SouthIndianDayFrame({ color })` — SVG corner brackets + knot motifs that wrap the day pill.
  - `MarigoldBellString({ side })` — hanging marigold bell doodle.
  - `ParrotOnBranch()` — small parrot watercolor.
  - `VenueWatercolorFrame({ src, alt })` — venue image with ornamental border.
- ✏️ `src/components/WeddingTimeline.tsx` —
  - Wrap the existing "day pill" `<div>` in `<SouthIndianDayFrame color={day.color}>` (positioned absolutely around it).
  - Add `dressCode` and `colors` optional fields to the events data, render them as a small line under `event.desc` when present.
  - Place `<MarigoldBellString />` decorations at top-left/right of Day 01 header.
  - Place `<ParrotOnBranch />` near the Baraat event.
- ✏️ `src/pages/Index.tsx` (timeline section only) — insert `<VenueWatercolorFrame>` above the timeline section header, using the existing `templeIllustration` asset (already imported) as a starting placeholder. Couple can swap later by uploading a real venue photo.
- 🆕 `src/assets/venue-placeholder.png` — only if a new asset is needed; otherwise reuse `templeIllustration`. Will reuse existing to keep change small.

## Files NOT touched

- `EnvelopeReveal.tsx`, `WeddingShlokas.tsx`, `LanguageContext.tsx`, `FloatingPetals.tsx`, `CursorGlow.tsx`, `App.tsx`
- All `src/components/ui/*`, `tailwind.config.ts`, `index.css`
- Hero, RSVP, Thank You sections

