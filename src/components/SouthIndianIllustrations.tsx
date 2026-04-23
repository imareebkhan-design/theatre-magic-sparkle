/**
 * SouthIndianIllustrations.tsx
 * Watercolor-style South Indian wedding illustration components
 * Style: soft gouache/watercolor, warm festive palette
 * Elements: jasmine, kolam, banana leaves, gopuram, couple, brass lamps
 */
import coupleMandap from '@/assets/couple-mandap.png';

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
  <img
    src={coupleMandap}
    alt="South Indian couple seated under floral mandap"
    style={{
      width: '100%',
      maxWidth: '440px',
      height: 'auto',
      margin: '0 auto',
      display: 'block',
    }}
    loading="lazy"
  />
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

/* ════════════════════════════════════════════════
   7. SOUTH INDIAN DAY FRAME
   Decorative corner brackets + knot motifs around day pills
   ════════════════════════════════════════════════ */
export const SouthIndianDayFrame = ({
  color = '#C97B5A',
  children,
}: {
  color?: string;
  children: React.ReactNode;
}) => (
  <div style={{ position: 'relative', display: 'inline-block', padding: '14px 22px' }}>
    {/* Corner brackets + knot rosettes */}
    <svg
      viewBox="0 0 200 80"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      {/* Four corner brackets */}
      {[
        { x: 0, y: 0, sx: 1, sy: 1 },     // top-left
        { x: 200, y: 0, sx: -1, sy: 1 },  // top-right
        { x: 0, y: 80, sx: 1, sy: -1 },   // bottom-left
        { x: 200, y: 80, sx: -1, sy: -1 },// bottom-right
      ].map((c, i) => (
        <g key={i} transform={`translate(${c.x},${c.y}) scale(${c.sx},${c.sy})`}>
          <path
            d="M0,12 L0,0 L12,0"
            stroke={color}
            strokeWidth="1.2"
            fill="none"
            opacity="0.8"
            strokeLinecap="round"
          />
          {/* tiny corner dot */}
          <circle cx="0" cy="0" r="1.4" fill={color} opacity="0.9" />
        </g>
      ))}

      {/* Mid-side knot rosettes */}
      {[
        { x: 100, y: 0 },   // top-mid
        { x: 100, y: 80 },  // bottom-mid
        { x: 0, y: 40 },    // left-mid
        { x: 200, y: 40 },  // right-mid
      ].map((p, i) => (
        <g key={i} transform={`translate(${p.x},${p.y})`}>
          {/* knot diamond */}
          <path
            d="M0,-3 L3,0 L0,3 L-3,0 Z"
            fill="none"
            stroke={color}
            strokeWidth="1"
            opacity="0.75"
          />
          {/* small petal flare */}
          <circle cx="0" cy="0" r="1.2" fill={color} opacity="0.9" />
        </g>
      ))}
    </svg>
    {children}
  </div>
);

/* ════════════════════════════════════════════════
   8. MARIGOLD BELL STRING — hangs from top corners
   ════════════════════════════════════════════════ */
export const MarigoldBellString = ({ side = 'left' }: { side?: 'left' | 'right' }) => (
  <svg
    viewBox="0 0 80 160"
    width="60"
    height="120"
    style={{
      transform: side === 'right' ? 'scaleX(-1)' : undefined,
      pointerEvents: 'none',
      display: 'block',
    }}
  >
    {/* String */}
    <path d="M40,0 Q38,40 42,80 Q40,120 38,160" stroke="#C9922A" strokeWidth="0.8" fill="none" opacity="0.6" />
    {/* Marigold balls along string */}
    {[15, 35, 55, 75, 95, 115, 135].map((y, i) => {
      const cx = 40 + Math.sin(i * 1.3) * 4;
      const isSaffron = i % 2 === 0;
      return (
        <g key={i} transform={`translate(${cx}, ${y})`}>
          {/* Outer petals */}
          {[0, 60, 120, 180, 240, 300].map((a, j) => {
            const rad = (a * Math.PI) / 180;
            return (
              <circle
                key={j}
                cx={Math.cos(rad) * 3}
                cy={Math.sin(rad) * 3}
                r="2.5"
                fill={isSaffron ? '#E8651A' : '#D4A017'}
                opacity="0.7"
              />
            );
          })}
          <circle cx="0" cy="0" r="2" fill={isSaffron ? '#D4A017' : '#E8651A'} opacity="0.9" />
        </g>
      );
    })}
    {/* End tassel bell */}
    <g transform="translate(38, 152)">
      <path d="M-4,0 Q-5,8 0,10 Q5,8 4,0 Z" fill="#C9922A" opacity="0.8" />
      <circle cx="0" cy="11" r="1.4" fill="#A07820" opacity="0.9" />
    </g>
  </svg>
);

/* ════════════════════════════════════════════════
   9. PARROT ON BRANCH — small accent doodle
   ════════════════════════════════════════════════ */
export const ParrotOnBranch = () => (
  <svg
    viewBox="0 0 100 80"
    width="80"
    height="64"
    style={{ pointerEvents: 'none', display: 'block' }}
  >
    {/* Branch */}
    <path d="M5,60 Q40,55 95,62" stroke="#6B4A2A" strokeWidth="1.2" fill="none" opacity="0.55" />
    {/* Small leaf */}
    <path d="M20,58 Q15,50 25,48 Q22,55 20,58 Z" fill="#3B6B4A" opacity="0.6" />
    <path d="M75,60 Q72,52 82,52 Q78,58 75,60 Z" fill="#3B6B4A" opacity="0.6" />
    {/* Parrot body */}
    <ellipse cx="50" cy="38" rx="14" ry="11" fill="#3B6B4A" opacity="0.7" />
    {/* Belly */}
    <ellipse cx="48" cy="42" rx="8" ry="6" fill="#D4A017" opacity="0.55" />
    {/* Head */}
    <circle cx="62" cy="30" r="7" fill="#3B6B4A" opacity="0.75" />
    {/* Beak */}
    <path d="M68,30 Q73,32 70,35 Z" fill="#E8651A" opacity="0.85" />
    {/* Eye */}
    <circle cx="64" cy="29" r="0.9" fill="#223348" />
    {/* Wing */}
    <path d="M44,32 Q50,42 56,46 Q44,48 42,40 Z" fill="#2D5238" opacity="0.6" />
    {/* Tail */}
    <path d="M38,38 Q28,40 22,46 Q34,44 38,42 Z" fill="#3B6B4A" opacity="0.6" />
    {/* Feet on branch */}
    <line x1="48" y1="49" x2="46" y2="58" stroke="#6B4A2A" strokeWidth="0.8" opacity="0.7" />
    <line x1="54" y1="49" x2="56" y2="58" stroke="#6B4A2A" strokeWidth="0.8" opacity="0.7" />
  </svg>
);

/* ════════════════════════════════════════════════
   10. VENUE WATERCOLOR FRAME
   Square framed venue image with ornamental border
   ════════════════════════════════════════════════ */
export const VenueWatercolorFrame = ({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) => (
  <div style={{ maxWidth: '320px', margin: '0 auto 32px', textAlign: 'center' }}>
    <div style={{ position: 'relative', padding: '14px' }}>
      {/* Ornamental corner brackets */}
      <svg
        viewBox="0 0 320 320"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {[
          { x: 0, y: 0, sx: 1, sy: 1 },
          { x: 320, y: 0, sx: -1, sy: 1 },
          { x: 0, y: 320, sx: 1, sy: -1 },
          { x: 320, y: 320, sx: -1, sy: -1 },
        ].map((c, i) => (
          <g key={i} transform={`translate(${c.x},${c.y}) scale(${c.sx},${c.sy})`}>
            <path d="M0,28 L0,0 L28,0" stroke="#B5334E" strokeWidth="1.2" fill="none" opacity="0.6" />
            <path d="M6,16 L6,6 L16,6" stroke="#D4A017" strokeWidth="0.9" fill="none" opacity="0.6" />
            <circle cx="0" cy="0" r="2" fill="#E8651A" opacity="0.8" />
          </g>
        ))}
        {/* Mid knots */}
        {[
          { x: 160, y: 0 }, { x: 160, y: 320 }, { x: 0, y: 160 }, { x: 320, y: 160 },
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.x},${p.y})`}>
            <path d="M0,-4 L4,0 L0,4 L-4,0 Z" fill="none" stroke="#B5334E" strokeWidth="1" opacity="0.55" />
            <circle cx="0" cy="0" r="1.4" fill="#D4A017" opacity="0.85" />
          </g>
        ))}
      </svg>
      <div style={{
        aspectRatio: '1 / 1',
        width: '100%',
        overflow: 'hidden',
        border: '1px solid rgba(181, 51, 78, 0.18)',
        background: '#F6F0E6',
      }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    </div>
    {caption && (
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: '13px',
        color: '#7397A8',
        marginTop: '8px',
      }}>
        {caption}
      </p>
    )}
  </div>
);
