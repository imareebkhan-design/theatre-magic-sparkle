

# Premium Cinematic Envelope Reveal

Replace the current full-screen split-panel envelope with a **realistic, centered envelope object** (like the reference image) that the user clicks to open — wax seal cracks, top flap folds back, and the invitation card slides out and zooms to fill the screen.

## What the user will see

1. **Entry** — Soft warm gradient backdrop (cream/ivory). A single envelope appears centered, fading in with a gentle scale-up (0.95 → 1) and a slow "breathing" float.
2. **Idle** — Envelope sits centered with a soft drop shadow. A lavender wax seal with **N | S** monogram rests on the front. A subtle "Tap to open" hint appears after ~2.5s.
3. **Hover (desktop)** — Envelope tilts slightly (3D perspective) and shadow deepens.
4. **Click / Tap** — Cinematic opening sequence (~2s total):
   - Wax seal cracks down the middle, two halves fall away with slight rotation + fade.
   - Top triangular flap folds upward (3D rotateX from 0° → -180°) with realistic easing.
   - Invitation card slides up out of the envelope pocket (~40% peek).
   - Camera "zooms in": card scales up smoothly while envelope fades, until the card fills the viewport.
   - Seamless cross-fade into the actual invitation content (existing children).
5. **Mobile** — Same flow, tap-driven, smaller envelope size, no hover tilt, GPU-accelerated transforms only.

## Visual style

- Ivory envelope (`#F5EFE4` → `#EAE0CC` gradient) with paper grain texture.
- Lavender wax seal (keep existing monogram styling, consistent with current theme).
- Warm radial backdrop (`#F8F1E6` → `#E8DCC4`).
- Soft multi-layer drop shadow for depth.
- Couple names + date subtly visible on the card peeking from the envelope.

## Technical approach

- **File**: rewrite `src/components/EnvelopeReveal.tsx` only. Public API unchanged: `<EnvelopeReveal onOpen={...}>{children}</EnvelopeReveal>` — no changes needed in `src/pages/Index.tsx`.
- **Animation lib**: keep `framer-motion` (already installed; lighter than adding GSAP). Use `transform-style: preserve-3d` + `perspective` on the wrapper for the flap fold and hover tilt.
- **Structure**:
  - Backdrop layer (fixed, full screen, gradient).
  - Envelope wrapper (centered, ~420×280px desktop / ~300×200 mobile, with `perspective: 1500px`).
  - Back pocket (static rectangle).
  - Card (positioned inside pocket, animates `y` upward + `scale` up on open).
  - Front pocket panel (with diagonal flap edges drawn via SVG/clip-path so the card slides out *behind* it).
  - Top flap (triangular, `rotateX` pivot at top edge, fold animation).
  - Wax seal (centered on flap seam; two halves animate apart with rotation + fade when broken).
- **Easing**: `[0.76, 0, 0.24, 1]` for flap fold; `[0.34, 1.56, 0.64, 1]` for card emergence; standard ease-out for fades.
- **Timeline** (after click):
  - 0.0s → seal cracks (0.5s)
  - 0.3s → flap folds open (0.9s)
  - 0.8s → card slides up + scales (1.0s)
  - 1.6s → envelope fades, card fills viewport (0.5s)
  - 2.1s → `onOpen()` fires, children fade in
- **Performance**: only `transform` + `opacity` animated; `will-change` hints; SVG seal reused; no heavy filters on mobile (conditionally drop the noise SVG below 768px).
- **Accessibility**: respect `prefers-reduced-motion` — skip the cinematic sequence and just fade out.
- **Body scroll lock**: keep existing `overflow: hidden` logic during closed state.

## Files touched

- ✏️ `src/components/EnvelopeReveal.tsx` — full rewrite

## Files NOT touched

- `src/pages/Index.tsx`, `LanguageContext.tsx`, all other components, UI primitives, theme/tailwind config.

