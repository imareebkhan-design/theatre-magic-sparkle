

## Replace Envelope with Floral Envelope + Ribbon-Pull Reveal

Replace the existing wax-seal envelope intro with the user's floral envelope artwork. The user touches/drags the pink ribbon to "untie" it — this triggers the wax seal cracking from the bottom up, the envelope flap opening, and the hero section emerging.

### What will be built

**1. New asset**
- Save the uploaded floral envelope PNG to `src/assets/envelope-floral.png`.
- Process with ImageMagick to remove the white background and the "photo" watermark text (floodfill + crop), producing a clean transparent PNG.

**2. Rewrite `src/components/EnvelopeReveal.tsx`**

Replace the entire SVG/CSS envelope construction with a layered composition built on top of the floral envelope image. Public API (`onOpen`, `children`) stays identical so `Index.tsx` doesn't change.

**Visual structure (z-stacked):**
```text
  ┌─────────────────────────────┐
  │  Floral envelope image      │  ← base layer (PNG)
  │   ┌──────────────┐          │
  │   │  ribbon (L)  │ribbon(R) │  ← two halves of the pink ribbon
  │   └──────┬───────┘          │     (interactive — drag/tap)
  │       [wax seal]            │  ← seal mask, reveals from bottom-up
  └─────────────────────────────┘
```

The pink ribbon and wax seal in the source image are masked out (via a darker overlay or by re-drawing them on top as motion elements), so we can animate them independently while the floral envelope body stays static.

**Interaction & animation sequence:**
1. **Idle**: envelope floats with gentle breathing motion. After ~2s a "Pull the ribbon" hint appears near the bow.
2. **User pulls ribbon**: ribbon is a draggable element (Framer Motion `drag="x"` with elastic constraints) OR a simple tap target on mobile. Either gesture triggers `stage = 'opening'`.
3. **Ribbon opens** (0.0–0.7s): the two ribbon halves slide apart left/right, the bow loosens and falls away with rotation + opacity fade.
4. **Seal cracks bottom-up** (0.5–1.4s): the wax seal is masked with an animated `clip-path: inset(X% 0 0 0)` that progresses from `inset(0 0 0 0)` → `inset(100% 0 0 0)`, revealing nothing underneath (seal "melts away" upward). A subtle crack SVG line draws across it as it disappears.
5. **Flap opens** (1.2–2.0s): the top triangular flap of the floral envelope rotates open via `rotateX(-170deg)` with `transformOrigin: top`.
6. **Hero emerges** (1.8–2.6s): a card containing "Nikila & Sarthak / Save the Date" slides up from inside the envelope, scales up, and cross-fades into the full hero — same final transition as today.
7. `onOpen()` fires, scroll unlocks, hero is interactive.

**Reduced-motion fallback**: tap ribbon → 400ms fade to revealed (kept as today).

### Technical details

- Framer Motion `drag` with `dragConstraints={{ left: -80, right: 80 }}`, `dragElastic={0.4}`, `onDragEnd` checks if `info.offset.x` exceeds threshold (±40px) → trigger open. Tap also triggers open for accessibility.
- Seal bottom-up reveal uses `animate={{ clipPath: 'inset(100% 0 0 0)' }}` over 0.9s with `ease: [0.4, 0, 0.2, 1]`.
- Ribbon halves: two absolutely positioned `<motion.div>`s with the pink ribbon redrawn as CSS gradient strips (`linear-gradient(180deg, #E8A3B8, #D17F95)`) plus a small SVG bow on top that fades out on open.
- Flap: a CSS-only triangular `clip-path: polygon(0 0, 100% 0, 50% 100%)` overlay sized to the top ~55% of the envelope, gradient-tinted to match the cream paper of the floral image, animated with `rotateX`.
- Image processing command (run during implementation):
  ```bash
  magick src/assets/envelope-floral-raw.jpg \
    -fuzz 12% -fill none -draw "matte 0,0 floodfill" \
    -trim +repage src/assets/envelope-floral.png
  ```
- Keep the existing scroll-lock, keyboard (`Enter`/`Space`) accessibility, language hint key (`envelope.tap` → updated copy "Pull the ribbon").
- No changes needed in `Index.tsx`, `App.tsx`, or routing.

### Files touched
- **Create**: `src/assets/envelope-floral-raw.jpg`, `src/assets/envelope-floral.png`
- **Edit**: `src/components/EnvelopeReveal.tsx` (full rewrite of internals; same exported API)
- **Edit**: `src/contexts/LanguageContext.tsx` (update `envelope.tap` copy to "Pull the ribbon to open")

