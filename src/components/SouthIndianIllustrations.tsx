/**
 * SouthIndianIllustrations.tsx
 * Watercolor-style South Indian wedding illustration components
 * Style: soft gouache/watercolor, warm festive palette
 * Elements: jasmine, kolam, banana leaves, gopuram, couple, brass lamps
 */

/* ─── COLOR PALETTE ─── */
// Saffron: #E8651A
// Turmeric: #D4A017
// Temple Green: #3B6B4A
// Deep Rose: #B5334E
// Coral: #E07B54
// Jasmine White: #FFF9E6
// Brass Gold: #C9922A
// Soft Teal: #4A8B7F

/* ════════════════════════════════════════════════
   1. JASMINE TORAN — hangs from top of page
   ════════════════════════════════════════════════ */
export const JasmineToran = () => (
  <svg
    viewBox="0 0 800 120"
    width="100%"
    height="120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', pointerEvents: 'none' }}
  >
    {/* Main hanging rope/string */}
    <path
      d="M0,15 Q100,55 200,30 Q300,5 400,35 Q500,65 600,30 Q700,5 800,25"
      stroke="#C9922A"
      strokeWidth="1.5"
      fill="none"
      opacity="0.6"
    />

    {/* Jasmine flower clusters along the string */}
    {[60, 140, 220, 300, 380, 460, 540, 620, 700, 760].map((x, i) => {
      const y = i % 2 === 0 ? 28 : 38;
      return (
        <g key={i} transform={`translate(${x}, ${y})`}>
          {/* Jasmine bud cluster */}
          {[0, 60, 120, 180, 240, 300].map((angle, j) => {
            const rad = (angle * Math.PI) / 180;
            const px = Math.cos(rad) * 5;
            const py = Math.sin(rad) * 5;
            return (
              <ellipse
                key={j}
                cx={px}
                cy={py}
                rx="2.5"
                ry="4"
                transform={`rotate(${angle}, ${px}, ${py})`}
                fill="#FFF9E6"
                opacity="0.9"
              />
            );
          })}
          <circle cx="0" cy="0" r="2" fill="#FFF176" opacity="0.8" />
        </g>
      );
    })}

    {/* Hanging tassels — brass bells */}
    {[80, 200, 320, 400, 480, 600, 720].map((x, i) => {
      const baseY = i % 2 === 0 ? 32 : 42;
      return (
        <g key={i} transform={`translate(${x}, ${baseY})`}>
          {/* String */}
          <line x1="0" y1="0" x2="0" y2="22" stroke="#C9922A" strokeWidth="0.8" opacity="0.7" />
          {/* Bell body */}
          <path
            d="M-6,22 Q-8,34 0,38 Q8,34 6,22 Z"
            fill="#C9922A"
            opacity="0.8"
          />
          {/* Bell shine */}
          <path
            d="M-3,24 Q-4,30 -2,33"
            stroke="#E8B84B"
            strokeWidth="0.8"
            fill="none"
            opacity="0.6"
          />
          {/* Bell clapper */}
          <circle cx="0" cy="40" r="2" fill="#A07820" opacity="0.9" />
          {/* Marigold tuft on top */}
          {[-1, 0, 1].map((dx, j) => (
            <circle key={j} cx={dx * 3} cy={18} r="3.5" fill="#E8651A" opacity="0.75" />
          ))}
          <circle cx="0" cy="16" r="2.5" fill="#D4A017" opacity="0.8" />
        </g>
      );
    })}

    {/* Marigold garland drops */}
    {[160, 400, 640].map((x, i) => (
      <g key={i}>
        {[0, 1, 2, 3, 4].map((j) => (
          <circle
            key={j}
            cx={x}
            cy={50 + j * 8}
            r="4"
            fill={j % 2 === 0 ? '#E8651A' : '#D4A017'}
            opacity="0.7"
          />
        ))}
      </g>
    ))}

    {/* Banana leaf tips at edges */}
    <path
      d="M0,0 Q-10,40 20,80 Q10,50 30,20 Q15,10 0,0Z"
      fill="#3B6B4A"
      opacity="0.5"
      transform="translate(5, 10)"
    />
    <path
      d="M0,0 Q10,40 -20,80 Q-10,50 -30,20 Q-15,10 0,0Z"
      fill="#3B6B4A"
      opacity="0.5"
      transform="translate(790, 10)"
    />
  </svg>
);

/* ════════════════════════════════════════════════
   2. KOLAM BORDER DIVIDER
   Dot-grid kolam pattern used between sections
   ════════════════════════════════════════════════ */
export const KolamDivider = ({ color = '#B5334E' }: { color?: string }) => {
  // Kolam dot grid — traditional South Indian floor art
  const dots: { x: number; y: number; r: number }[] = [];
  const cols = 21;
  const spacing = 18;
  const startX = (800 - (cols - 1) * spacing) / 2;

  for (let i = 0; i < cols; i++) {
    dots.push({ x: startX + i * spacing, y: 30, r: i % 4 === 0 ? 3 : i % 2 === 0 ? 2 : 1.2 });
  }

  return (
    <svg
      viewBox="0 0 800 60"
      width="100%"
      height="60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', pointerEvents: 'none', overflow: 'visible' }}
    >
      {/* Connecting lines through dots */}
      <path
        d={`M${startX},30 ${dots.map(d => `L${d.x},30`).join(' ')}`}
        stroke={color}
        strokeWidth="0.5"
        opacity="0.25"
      />

      {/* Kolam curve — figure-8 loops through dots */}
      {dots.filter((_, i) => i % 2 === 0 && i > 0 && i < cols - 1).map((d, i) => (
        <g key={i}>
          <path
            d={`M${d.x - 9},24 Q${d.x},18 ${d.x + 9},24 Q${d.x + 9},36 ${d.x},36 Q${d.x - 9},36 ${d.x - 9},24Z`}
            stroke={color}
            strokeWidth="0.8"
            fill="none"
            opacity="0.35"
          />
        </g>
      ))}

      {/* Dots */}
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill={i % 6 === 0 ? '#E8651A' : i % 3 === 0 ? '#D4A017' : color}
          opacity={i % 4 === 0 ? 0.9 : 0.55}
        />
      ))}

      {/* Diamond motifs at key points */}
      {[0, 5, 10, 15, 20].map((i) => {
        const d = dots[i];
        return (
          <g key={i} transform={`translate(${d.x}, ${d.y})`}>
            <rect
              x="-5" y="-5"
              width="10" height="10"
              transform="rotate(45)"
              fill="none"
              stroke={color}
              strokeWidth="0.8"
              opacity="0.45"
            />
          </g>
        );
      })}

      {/* Centre lotus motif */}
      <g transform="translate(400, 30)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <ellipse
              key={i}
              cx={Math.cos(rad) * 9}
              cy={Math.sin(rad) * 9}
              rx="3"
              ry="6"
              transform={`rotate(${angle}, ${Math.cos(rad) * 9}, ${Math.sin(rad) * 9})`}
              fill={i % 2 === 0 ? '#E8651A' : '#B5334E'}
              opacity="0.7"
            />
          );
        })}
        <circle cx="0" cy="0" r="4" fill="#D4A017" opacity="0.9" />
      </g>
    </svg>
  );
};

/* ════════════════════════════════════════════════
   3. SOUTH INDIAN COUPLE ILLUSTRATION
   Bride in Kanjivaram saree, groom in veshti
   Watercolor painterly style
   ════════════════════════════════════════════════ */
export const SouthIndianCouple = () => (
  <svg
    viewBox="0 0 400 340"
    width="100%"
    height="340"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ maxWidth: '400px', margin: '0 auto', display: 'block' }}
  >
    {/* ── BRIDE (left) ── */}
    <g transform="translate(80, 20)">
      {/* Saree — Kanjivaram deep rose/red */}
      {/* Skirt/pleats */}
      <path
        d="M40,160 Q20,200 15,280 Q35,290 60,285 Q70,230 75,170Z"
        fill="#B5334E"
        opacity="0.85"
      />
      {/* Gold border on saree */}
      <path
        d="M17,275 Q35,288 58,283"
        stroke="#C9922A"
        strokeWidth="4"
        fill="none"
        opacity="0.9"
      />
      <path
        d="M17,268 Q35,281 58,276"
        stroke="#E8B84B"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
      {/* Pallu/drape over shoulder */}
      <path
        d="M60,160 Q90,140 100,100 Q95,85 85,90 Q75,130 50,150Z"
        fill="#B5334E"
        opacity="0.75"
      />
      {/* Blouse */}
      <path
        d="M35,155 Q55,148 75,155 Q78,175 72,185 Q55,190 38,185Z"
        fill="#8B1A2E"
        opacity="0.9"
      />
      {/* Gold zari on blouse */}
      <path d="M38,162 Q55,157 72,162" stroke="#C9922A" strokeWidth="1.5" fill="none" opacity="0.8" />

      {/* Head & face */}
      <ellipse cx="57" cy="60" rx="22" ry="26" fill="#D4956A" opacity="0.9" />
      {/* Hair — oiled, pulled back */}
      <path
        d="M35,55 Q30,40 38,28 Q55,18 75,28 Q82,40 78,55"
        fill="#1A0A00"
        opacity="0.9"
      />
      {/* Jasmine in hair */}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx={42 + i * 7}
          cy={32 + Math.sin(i) * 3}
          r="3"
          fill="#FFF9E6"
          opacity="0.9"
        />
      ))}
      {/* Braid */}
      <path
        d="M72,50 Q78,80 75,120 Q72,140 68,160"
        stroke="#1A0A00"
        strokeWidth="5"
        fill="none"
        opacity="0.8"
        strokeLinecap="round"
      />
      {/* Braid flowers */}
      {[70, 90, 110, 130].map((y, i) => (
        <circle key={i} cx={76 - i * 1.5} cy={y} r="3.5" fill="#FFF9E6" opacity="0.8" />
      ))}

      {/* Facial features */}
      <ellipse cx="50" cy="62" rx="3" ry="2.5" fill="#1A0A00" opacity="0.7" />
      <ellipse cx="64" cy="62" rx="3" ry="2.5" fill="#1A0A00" opacity="0.7" />
      <path d="M50,72 Q57,77 64,72" stroke="#8B3A3A" strokeWidth="1.2" fill="none" />
      {/* Bindi */}
      <circle cx="57" cy="52" r="3" fill="#B5334E" opacity="0.9" />
      {/* Nose ring */}
      <circle cx="62" cy="68" r="2" fill="none" stroke="#C9922A" strokeWidth="1" opacity="0.8" />

      {/* Jewellery */}
      {/* Necklace */}
      <path
        d="M42,92 Q57,102 72,92"
        stroke="#C9922A"
        strokeWidth="2.5"
        fill="none"
        opacity="0.9"
      />
      {[44, 50, 57, 64, 70].map((x, i) => (
        <circle key={i} cx={x} cy={94 + Math.sin((i - 2) * 0.5) * 3} r="2" fill="#C9922A" opacity="0.9" />
      ))}
      {/* Earrings */}
      <path d="M35,65 L32,80" stroke="#C9922A" strokeWidth="1.5" opacity="0.8" />
      <circle cx="32" cy="82" r="4" fill="#C9922A" opacity="0.8" />

      {/* Arms */}
      <path
        d="M38,185 Q25,200 30,230"
        stroke="#D4956A"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Bangles */}
      {[195, 203, 211].map((y, i) => (
        <ellipse key={i} cx={32 - i * 0.5} cy={y} rx="6" ry="3"
          fill="none" stroke={i === 1 ? '#C9922A' : '#D4A017'}
          strokeWidth="1.5" opacity="0.9" />
      ))}
      {/* Right arm reaching toward groom */}
      <path
        d="M72,185 Q95,195 115,205"
        stroke="#D4956A"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
    </g>

    {/* ── GROOM (right) ── */}
    <g transform="translate(200, 20)">
      {/* Veshti — white with gold border */}
      <path
        d="M35,155 Q18,195 15,280 Q40,288 65,285 Q68,220 70,155Z"
        fill="#FAFAF5"
        opacity="0.92"
      />
      {/* Gold border veshti */}
      <path d="M16,270 Q40,284 63,278" stroke="#C9922A" strokeWidth="4" fill="none" opacity="0.9" />
      <path d="M16,263 Q40,277 63,271" stroke="#E8B84B" strokeWidth="1.5" fill="none" opacity="0.6" />
      {/* Vertical centre fold */}
      <line x1="42" y1="160" x2="40" y2="280" stroke="#C9922A" strokeWidth="0.8" opacity="0.3" />

      {/* Angavastram / upper cloth */}
      <path
        d="M25,130 Q42,125 60,130 Q65,155 60,165 Q42,170 25,165Z"
        fill="#E8651A"
        opacity="0.8"
      />
      {/* Gold border on angavastram */}
      <path d="M25,165 Q42,172 60,165" stroke="#C9922A" strokeWidth="2" fill="none" opacity="0.85" />

      {/* Dhoti upper wrap */}
      <path
        d="M60,130 Q80,110 85,80 Q80,70 72,75 Q68,105 55,125Z"
        fill="#FAFAF5"
        opacity="0.7"
      />

      {/* Head & face */}
      <ellipse cx="43" cy="58" rx="22" ry="25" fill="#C4855A" opacity="0.9" />
      {/* Hair */}
      <path
        d="M22,52 Q23,35 30,25 Q43,17 56,25 Q63,35 64,52"
        fill="#1A0A00"
        opacity="0.9"
      />
      {/* Traditional tilak */}
      <path d="M43,44 L43,36" stroke="#D4A017" strokeWidth="2" opacity="0.9" />
      <rect x="39" y="36" width="8" height="2" fill="#D4A017" opacity="0.8" rx="1" />

      {/* Facial features */}
      <ellipse cx="36" cy="60" rx="3" ry="2.5" fill="#1A0A00" opacity="0.7" />
      <ellipse cx="50" cy="60" rx="3" ry="2.5" fill="#1A0A00" opacity="0.7" />
      <path d="M36,70 Q43,75 50,70" stroke="#8B3A3A" strokeWidth="1.2" fill="none" />

      {/* Moustache */}
      <path d="M36,66 Q43,64 50,66" stroke="#1A0A00" strokeWidth="1.5" fill="none" opacity="0.6" />

      {/* Jewellery — gold chain */}
      <path d="M28,90 Q43,100 58,90" stroke="#C9922A" strokeWidth="2" fill="none" opacity="0.8" />
      {[30, 37, 43, 49, 56].map((x, i) => (
        <circle key={i} cx={x} cy={91 + Math.sin((i - 2) * 0.4) * 2} r="1.8" fill="#C9922A" opacity="0.85" />
      ))}

      {/* Arms */}
      <path
        d="M25,165 Q12,185 10,215"
        stroke="#C4855A"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Right arm */}
      <path
        d="M60,165 Q70,182 68,210"
        stroke="#C4855A"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
    </g>

    {/* ── JOINED HANDS in centre ── */}
    <g transform="translate(185, 215)">
      <ellipse cx="0" cy="0" rx="18" ry="12" fill="#D4956A" opacity="0.8" />
      <ellipse cx="8" cy="-3" rx="14" ry="10" fill="#C4855A" opacity="0.75" />
      {/* Mehendi pattern on bride's hand */}
      <path d="M-12,2 Q-5,-5 5,2 Q-2,8 -12,2Z" stroke="#8B1A2E" strokeWidth="0.6" fill="none" opacity="0.6" />
      {/* Gold ring */}
      <circle cx="-5" cy="4" r="3" fill="none" stroke="#C9922A" strokeWidth="1.2" opacity="0.8" />
    </g>

    {/* ── DECORATIVE ELEMENTS ── */}
    {/* Parrot — top right */}
    <g transform="translate(330, 60)">
      <ellipse cx="0" cy="0" rx="10" ry="14" fill="#3B6B4A" opacity="0.85" />
      <circle cx="0" cy="-12" r="8" fill="#4A8B40" opacity="0.85" />
      <path d="M4,-14 L10,-10" stroke="#E8651A" strokeWidth="2" strokeLinecap="round" />
      <circle cx="3" cy="-14" r="2" fill="#1A0A00" opacity="0.8" />
      <path d="M-8,5 L-18,10" stroke="#4A8B40" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <path d="M8,5 L18,12" stroke="#4A8B40" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
    </g>

    {/* Kuthuvilakku (brass lamp) — left */}
    <g transform="translate(18, 180)">
      <rect x="-3" y="0" width="6" height="40" fill="#C9922A" opacity="0.8" rx="2" />
      <path d="M-12,-15 Q0,-5 12,-15 Q8,-25 0,-22 Q-8,-25 -12,-15Z" fill="#C9922A" opacity="0.85" />
      <circle cx="0" cy="-18" r="4" fill="#E8B84B" opacity="0.9" />
      <path d="M-1,-24 Q0,-32 1,-24" stroke="#E8651A" strokeWidth="2" fill="none" opacity="0.9" />
      <ellipse cx="0" cy="40" rx="15" ry="5" fill="#C9922A" opacity="0.7" />
      <ellipse cx="0" cy="42" rx="20" ry="4" fill="#A07820" opacity="0.6" />
    </g>

    {/* Kuthuvilakku — right */}
    <g transform="translate(378, 180)">
      <rect x="-3" y="0" width="6" height="40" fill="#C9922A" opacity="0.8" rx="2" />
      <path d="M-12,-15 Q0,-5 12,-15 Q8,-25 0,-22 Q-8,-25 -12,-15Z" fill="#C9922A" opacity="0.85" />
      <circle cx="0" cy="-18" r="4" fill="#E8B84B" opacity="0.9" />
      <path d="M-1,-24 Q0,-32 1,-24" stroke="#E8651A" strokeWidth="2" fill="none" opacity="0.9" />
      <ellipse cx="0" cy="40" rx="15" ry="5" fill="#C9922A" opacity="0.7" />
      <ellipse cx="0" cy="42" rx="20" ry="4" fill="#A07820" opacity="0.6" />
    </g>

    {/* Marigold scatter */}
    {[
      { x: 30, y: 300, c: '#E8651A' },
      { x: 60, y: 315, c: '#D4A017' },
      { x: 340, y: 305, c: '#E8651A' },
      { x: 370, y: 318, c: '#D4A017' },
      { x: 200, y: 320, c: '#E8651A' },
    ].map((p, i) => (
      <g key={i} transform={`translate(${p.x}, ${p.y})`}>
        {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a, j) => {
          const rad = (a * Math.PI) / 180;
          return (
            <ellipse
              key={j}
              cx={Math.cos(rad) * 6}
              cy={Math.sin(rad) * 6}
              rx="2.5"
              ry="5"
              transform={`rotate(${a}, ${Math.cos(rad) * 6}, ${Math.sin(rad) * 6})`}
              fill={p.c}
              opacity="0.7"
            />
          );
        })}
        <circle cx="0" cy="0" r="3" fill="#FFF176" opacity="0.9" />
      </g>
    ))}

    {/* Banana leaf accents bottom corners */}
    <path
      d="M0,340 Q-5,290 30,260 Q20,290 40,320 Q20,330 0,340Z"
      fill="#3B6B4A"
      opacity="0.55"
    />
    <path
      d="M400,340 Q405,290 370,260 Q380,290 360,320 Q380,330 400,340Z"
      fill="#3B6B4A"
      opacity="0.55"
    />
  </svg>
);

/* ════════════════════════════════════════════════
   4. GOPURAM SILHOUETTE — section background accent
   ════════════════════════════════════════════════ */
export const GopuramAccent = () => (
  <svg
    viewBox="0 0 300 200"
    width="300"
    height="200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity: 0.08, pointerEvents: 'none' }}
  >
    {/* Main tower */}
    <rect x="110" y="120" width="80" height="80" fill="#223348" />
    {/* Tiered spires */}
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const w = 80 - i * 10;
      const h = 16;
      const x = 150 - w / 2;
      const y = 120 - i * h;
      return <rect key={i} x={x} y={y} width={w} height={h} fill="#223348" />;
    })}
    {/* Kalasha (pot) on top */}
    <ellipse cx="150" cy="18" rx="12" ry="8" fill="#223348" />
    <rect x="146" y="10" width="8" height="10" fill="#223348" />
    <ellipse cx="150" cy="10" rx="6" ry="4" fill="#223348" />
    {/* Decorative niches */}
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${120 + i * 25}, 135)`}>
        <path d="M0,0 L8,0 L8,20 Q4,25 0,20 Z" fill="#F4EDE4" opacity="0.5" />
      </g>
    ))}
    {/* Horizontal bands */}
    {[120, 104, 88, 72, 56, 40].map((y, i) => (
      <line key={i} x1={150 - (80 - i * 10) / 2} y1={y} x2={150 + (80 - i * 10) / 2} y2={y}
        stroke="#F4EDE4" strokeWidth="0.8" opacity="0.3" />
    ))}
    {/* Side wings */}
    <rect x="60" y="150" width="50" height="50" fill="#223348" opacity="0.6" />
    <rect x="190" y="150" width="50" height="50" fill="#223348" opacity="0.6" />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={60 - i * 5} y={150 - i * 12} width={50 + i * 10} height={12}
        fill="#223348" opacity="0.5" />
    ))}
    {[0, 1, 2].map((i) => (
      <rect key={i} x={190 - i * 5} y={150 - i * 12} width={50 + i * 10} height={12}
        fill="#223348" opacity="0.5" />
    ))}
  </svg>
);

/* ════════════════════════════════════════════════
   5. BANANA LEAF SECTION FRAME
   Decorative banana leaves for section edges
   ════════════════════════════════════════════════ */
export const BananaLeafFrame = () => (
  <svg
    viewBox="0 0 800 80"
    width="100%"
    height="80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', pointerEvents: 'none' }}
  >
    {/* Left cluster */}
    <g transform="translate(20, 10)">
      <path d="M0,70 Q-8,30 20,0 Q15,35 30,60 Q15,65 0,70Z" fill="#3B6B4A" opacity="0.6" />
      <path d="M10,65 Q5,25 30,0 Q22,32 35,55 Q22,62 10,65Z" fill="#4A8B40" opacity="0.45" />
      <path d="M-5,60 Q-15,20 10,0 Q8,28 18,55 Q5,58 -5,60Z" fill="#3B6B4A" opacity="0.4" />
      {/* Midrib */}
      <path d="M20,0 Q12,35 2,68" stroke="#2D5238" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M30,0 Q24,32 18,63" stroke="#2D5238" strokeWidth="0.8" fill="none" opacity="0.4" />
    </g>

    {/* Right cluster */}
    <g transform="translate(760, 10) scale(-1, 1)">
      <path d="M0,70 Q-8,30 20,0 Q15,35 30,60 Q15,65 0,70Z" fill="#3B6B4A" opacity="0.6" />
      <path d="M10,65 Q5,25 30,0 Q22,32 35,55 Q22,62 10,65Z" fill="#4A8B40" opacity="0.45" />
      <path d="M-5,60 Q-15,20 10,0 Q8,28 18,55 Q5,58 -5,60Z" fill="#3B6B4A" opacity="0.4" />
      <path d="M20,0 Q12,35 2,68" stroke="#2D5238" strokeWidth="0.8" fill="none" opacity="0.5" />
    </g>

    {/* Centre jasmine string */}
    <path
      d="M80,40 Q200,25 400,40 Q600,55 720,38"
      stroke="#C9922A"
      strokeWidth="0.8"
      fill="none"
      opacity="0.4"
      strokeDasharray="4,6"
    />
    {/* Jasmine flowers on string */}
    {[120, 200, 280, 400, 520, 600, 680].map((x, i) => (
      <g key={i} transform={`translate(${x}, ${35 + Math.sin(i * 0.8) * 6})`}>
        {[0, 72, 144, 216, 288].map((a, j) => {
          const rad = (a * Math.PI) / 180;
          return (
            <ellipse key={j} cx={Math.cos(rad) * 4} cy={Math.sin(rad) * 4}
              rx="1.5" ry="3"
              transform={`rotate(${a}, ${Math.cos(rad) * 4}, ${Math.sin(rad) * 4})`}
              fill="#FFF9E6" opacity="0.85" />
          );
        })}
        <circle cx="0" cy="0" r="1.5" fill="#FFF176" opacity="0.9" />
      </g>
    ))}
  </svg>
);

/* ════════════════════════════════════════════════
   6. KOLAM CORNER ORNAMENT
   For use in section corners
   ════════════════════════════════════════════════ */
export const KolamCorner = ({ flip = false }: { flip?: boolean }) => (
  <svg
    viewBox="0 0 80 80"
    width="80"
    height="80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: flip ? 'scaleX(-1)' : undefined,
      pointerEvents: 'none',
    }}
  >
    {/* Curved kolam lines */}
    <path d="M5,75 Q5,5 75,5" stroke="#B5334E" strokeWidth="0.8" fill="none" opacity="0.3" />
    <path d="M5,65 Q15,15 65,5" stroke="#E8651A" strokeWidth="0.8" fill="none" opacity="0.3" />
    <path d="M5,55 Q25,25 55,5" stroke="#D4A017" strokeWidth="0.8" fill="none" opacity="0.3" />

    {/* Dot grid */}
    {[0, 1, 2, 3].map((row) =>
      [0, 1, 2, 3].map((col) => {
        if (row + col > 3) return null;
        return (
          <circle
            key={`${row}-${col}`}
            cx={10 + col * 18}
            cy={10 + row * 18}
            r={row + col === 0 ? 4 : row + col < 3 ? 2.5 : 1.5}
            fill={row === 0 && col === 0 ? '#E8651A' : row + col < 2 ? '#D4A017' : '#B5334E'}
            opacity={0.7 - (row + col) * 0.1}
          />
        );
      })
    )}

    {/* Lotus corner bloom */}
    <g transform="translate(10, 10)">
      {[0, 90, 180, 270].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <ellipse
            key={i}
            cx={Math.cos(rad) * 8}
            cy={Math.sin(rad) * 8}
            rx="3"
            ry="6"
            transform={`rotate(${a}, ${Math.cos(rad) * 8}, ${Math.sin(rad) * 8})`}
            fill={i % 2 === 0 ? '#E8651A' : '#B5334E'}
            opacity="0.65"
          />
        );
      })}
      <circle cx="0" cy="0" r="3" fill="#D4A017" opacity="0.85" />
    </g>
  </svg>
);
