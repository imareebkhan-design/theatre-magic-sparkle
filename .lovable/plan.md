

# Add Doodles to Every Timeline Event

Currently 3 of 8 events have doodles (Engagement, Baraat, Muhurtham). The remaining 5 events feel bare by comparison. I'll create a matching watercolor doodle for each remaining function, picked to symbolize its ritual meaning, and render them with the same style treatment already established (`mixBlendMode: multiply`, soft opacity, ~130–170px wide, side-aligned with the event card).

## Doodle assignments

| Day | Event | Symbol & meaning |
|---|---|---|
| 01 | Engagement | ✅ already done — hands exchanging rings |
| 01 | Baraat | ✅ already done — parrot on branch |
| 01 | **Pre-Wedding Reception** | 🆕 **Lit diya / oil lamp with flame** — evening celebration, light, festivity |
| 01 | **Kankana Dharana** | 🆕 **Turmeric-soaked sacred thread / kankanam** tied around a wrist — literal ritual symbol |
| 02 | Muhurtham | ✅ already done — kalash |
| 02 | **Aashirvadham** | 🆕 **Showering rice & flower petals from cupped elder hands** — the blessing gesture |
| 02 | **Sadagungal** | 🆕 **Banana leaf with traditional South Indian thali** (rice mound, side bowls) — post-wedding sadya/lunch ritual |
| 03 | **Reception Party** | 🆕 **Pair of champagne coupes / clinking glasses with floral garland** — formal evening celebration |

All doodles will follow the established **soft watercolor + ink line** aesthetic (same look as the engagement hands and kalash) so the page reads as one cohesive illustrated set.

## What the user will see

Each event card on the timeline now has a small hand-drawn doodle tucked beneath its description, aligned to the inner edge (toward the center line). The doodles fade-in with the existing card animation, giving the whole timeline a warm, illustrated-storybook feel — every ceremony visually represented, not just the three that currently are.

## Technical changes

**New asset files** (placed in `src/assets/`):
- `reception-diya.png` — oil lamp doodle (Pre-Wedding Reception)
- `kankana-thread.png` — turmeric thread on wrist (Kankana Dharana)
- `blessing-hands.png` — hands showering petals/rice (Aashirvadham)
- `banana-leaf-meal.png` — banana leaf thali (Sadagungal)
- `champagne-toast.png` — clinking glasses with garland (Reception Party)

These will be generated as watercolor-style PNGs (transparent background) matching the tone/saturation of the existing `engagement-hands.jpg` and `kalash.jpg`.

**`src/components/WeddingTimeline.tsx`** — single file edit:
1. Import the 5 new assets.
2. Expand the `decoration` union type:
   ```ts
   decoration?: 'parrot' | 'engagement-hands' | 'kalash'
              | 'diya' | 'kankana' | 'blessing-hands'
              | 'banana-leaf' | 'champagne';
   ```
3. Add `decoration: '...'` to each of the 5 currently-bare event objects.
4. Refactor the three repeated `event.decoration === '...'` JSX blocks into a single `<EventDoodle>` helper driven by a `{ key → { src, width, alt } }` map — keeps the file clean as we go from 2 image cases to 7.
5. The single-event Day 03 layout (Reception Party) currently has no decoration slot — add the same `<EventDoodle>` render below its `<DressCodeLine>`, centered.

**Files NOT touched:** `SouthIndianIllustrations.tsx`, `ParallaxTemple.tsx`, `Index.tsx`, theme/tailwind config, all other components.

## Style consistency rules applied to every doodle

- `mixBlendMode: 'multiply'` + `opacity: 0.95` — blends with the `#F6F0E6` cream background
- Width 130–170px (smaller for tall portraits like diya/kankana, wider for horizontal scenes like banana leaf/toast)
- Aligned to the inner edge of the event card (toward the center timeline) so the doodle "points" into the spine of the page
- No new animations — inherits the parent card's `whileInView` fade-in

