import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/* ── Wax Seal SVG (lavender, monogram N|S) ── */
const WaxSeal = ({ broken }: { broken: boolean }) => (
  <motion.div
    animate={broken ? { scale: [1, 1.15, 0.9, 1.05, 0], opacity: [1, 1, 1, 0.6, 0] } : {}}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    style={{ position: 'relative', width: '120px', height: '120px' }}
  >
    <svg viewBox="0 0 120 120" width="120" height="120">
      <defs>
        <radialGradient id="sealGrad" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#C9B5DC" />
          <stop offset="45%" stopColor="#9C7FBE" />
          <stop offset="100%" stopColor="#6B4F8F" />
        </radialGradient>
        <radialGradient id="sealShine" cx="34%" cy="28%" r="45%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id="sealShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="rgba(60,40,90,0.35)" />
        </filter>
      </defs>

      {/* Organic wax blob — irregular outer edge */}
      <path
        d="M60,8
           C76,8 88,16 96,28
           C108,32 114,46 110,60
           C116,72 110,88 96,94
           C90,108 74,114 60,110
           C46,116 28,110 22,96
           C10,90 6,74 12,60
           C6,46 14,30 28,24
           C36,12 48,8 60,8 Z"
        fill="url(#sealGrad)"
        filter="url(#sealShadow)"
      />

      {/* Shine overlay */}
      <path
        d="M60,8 C76,8 88,16 96,28 C108,32 114,46 110,60 C116,72 110,88 96,94 C90,108 74,114 60,110 C46,116 28,110 22,96 C10,90 6,74 12,60 C6,46 14,30 28,24 C36,12 48,8 60,8 Z"
        fill="url(#sealShine)"
      />

      {/* Inner embossed circle */}
      <circle cx="60" cy="60" r="34" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

      {/* Monogram N | S */}
      <text
        x="44" y="68"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontSize="26"
        fontWeight="500"
        fill="rgba(40,20,70,0.6)"
      >
        N
      </text>
      <line
        x1="60" y1="46" x2="60" y2="74"
        stroke="rgba(40,20,70,0.5)"
        strokeWidth="1.2"
      />
      <text
        x="76" y="68"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontSize="26"
        fontWeight="500"
        fill="rgba(40,20,70,0.6)"
      >
        S
      </text>

      {/* Crack lines when broken */}
      {broken && (
        <>
          <motion.path
            d="M60 12 L57 32 L62 48 L58 60"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1.2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.path
            d="M60 108 L63 88 L58 72 L62 60"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1.2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          />
        </>
      )}
    </svg>
  </motion.div>
);

/* ── Lavender sprig that emerges from behind the seal ── */
const LavenderSprig = ({ flip = false, scale = 1 }: { flip?: boolean; scale?: number }) => (
  <svg
    viewBox="0 0 60 320"
    width={60 * scale}
    height={320 * scale}
    style={{ transform: flip ? 'scaleX(-1)' : 'none', display: 'block' }}
  >
    {/* Stem */}
    <path d="M30 320 Q28 230 30 150 Q32 80 30 10" stroke="#5E7A4A" strokeWidth="1.4" fill="none" />

    {/* Small leaves along stem */}
    <path d="M30 260 Q20 256 16 248" stroke="#5E7A4A" strokeWidth="1" fill="none" />
    <path d="M30 220 Q40 216 44 208" stroke="#5E7A4A" strokeWidth="1" fill="none" />
    <path d="M30 185 Q22 181 18 173" stroke="#5E7A4A" strokeWidth="1" fill="none" />

    {/* Lavender flower buds — clustered at top */}
    {[
      { cx: 30, cy: 14, r: 3.6 },
      { cx: 26, cy: 24, r: 3 },
      { cx: 34, cy: 25, r: 3 },
      { cx: 28, cy: 35, r: 3.2 },
      { cx: 33, cy: 37, r: 3 },
      { cx: 25, cy: 47, r: 2.8 },
      { cx: 31, cy: 49, r: 3 },
      { cx: 36, cy: 51, r: 2.6 },
      { cx: 27, cy: 61, r: 2.6 },
      { cx: 33, cy: 63, r: 2.4 },
      { cx: 30, cy: 75, r: 2.2 },
      { cx: 28, cy: 87, r: 2 },
      { cx: 33, cy: 89, r: 1.8 },
      { cx: 30, cy: 101, r: 1.6 },
      { cx: 30, cy: 113, r: 1.4 },
    ].map((b, i) => (
      <ellipse
        key={i}
        cx={b.cx} cy={b.cy} rx={b.r} ry={b.r * 1.35}
        fill={i % 3 === 0 ? '#9C7FBE' : i % 3 === 1 ? '#B095CF' : '#7E63A3'}
        opacity={0.88}
      />
    ))}
  </svg>
);

/* ── Envelope panel with crisp white paper ── */
const EnvelopePanel = ({ side }: { side: 'left' | 'right' }) => {
  const isLeft = side === 'left';
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(160deg, #FFFFFF 0%, #FBFAFD 50%, #F4EFF7 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Paper grain texture */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05 }}>
        <filter id={`noise-${side}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#noise-${side})`} />
      </svg>

      {/* Soft seam shadow */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0,
        [isLeft ? 'right' : 'left']: 0,
        width: '50px',
        background: isLeft
          ? 'linear-gradient(to left, rgba(107,79,143,0.10), transparent)'
          : 'linear-gradient(to right, rgba(107,79,143,0.10), transparent)',
      }} />
    </div>
  );
};

/* ── Main Component ── */
export default function EnvelopeReveal({
  children,
  onOpen,
}: {
  children: React.ReactNode;
  onOpen?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [sealBroken, setSealBroken] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) setShowHint(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const handleOpen = () => {
    if (isOpen) return;
    setHasInteracted(true);
    setShowHint(false);
    setSealBroken(true);
    setTimeout(() => {
      setIsOpen(true);
      onOpen?.();
    }, 380);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="envelope"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 1.8 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              display: 'flex',
              cursor: 'pointer',
              overflow: 'hidden',
            }}
            onClick={handleOpen}
          >
            {/* ── Left Panel ── */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: isOpen ? '-100%' : 0 }}
              transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              style={{
                position: 'relative',
                width: '50%',
                height: '100%',
                borderRight: '1px solid rgba(107,79,143,0.15)',
                boxShadow: '4px 0 24px rgba(60,40,90,0.10)',
                zIndex: 2,
              }}
            >
              <EnvelopePanel side="left" />
            </motion.div>

            {/* ── Right Panel ── */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: isOpen ? '100%' : 0 }}
              transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              style={{
                position: 'relative',
                width: '50%',
                height: '100%',
                borderLeft: '1px solid rgba(107,79,143,0.15)',
                boxShadow: '-4px 0 24px rgba(60,40,90,0.10)',
                zIndex: 2,
              }}
            >
              <EnvelopePanel side="right" />
            </motion.div>

            {/* ── Centre seam line ── */}
            <motion.div
              animate={{ opacity: isOpen ? 0 : 1, scaleY: isOpen ? 0 : 1 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '1px',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(to bottom, transparent 0%, rgba(107,79,143,0.35) 15%, rgba(107,79,143,0.35) 85%, transparent 100%)',
                zIndex: 6,
              }}
            />

            {/* ── Lavender sprigs behind seal — peeking from top ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? -30 : 0 }}
              transition={{ opacity: { duration: 0.9, delay: 0.4 }, y: { duration: 0.5 } }}
              style={{
                position: 'absolute',
                top: '4%',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 8,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '4px',
              }}
            >
              <div style={{ marginTop: '20px' }}>
                <LavenderSprig flip scale={0.85} />
              </div>
              <LavenderSprig />
              <div style={{ marginTop: '14px' }}>
                <LavenderSprig flip scale={0.9} />
              </div>
            </motion.div>

            {/* ── Wax seal — centered on seam ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                position: 'absolute',
                top: '54%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
              }}
            >
              <WaxSeal broken={sealBroken} />
            </motion.div>

            {/* ── Invitation text below seal ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isOpen ? 0 : 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              style={{
                position: 'absolute',
                bottom: '18%',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                zIndex: 9,
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '9px',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'rgba(107,79,143,0.55)',
                marginBottom: '8px',
              }}>
                A Wedding Invitation
              </p>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '28px',
                fontWeight: 300,
                color: '#3D2A5C',
                letterSpacing: '0.05em',
                lineHeight: 1,
              }}>
                Nikila &amp; Sarthak
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '9px',
                letterSpacing: '0.25em',
                color: 'rgba(107,79,143,0.5)',
                marginTop: '8px',
              }}>
                29 · 11 · 2026
              </p>
            </motion.div>

            {/* ── Tap / Click hint ── */}
            <AnimatePresence>
              {showHint && !isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: 'absolute',
                    bottom: '7%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    zIndex: 20,
                    pointerEvents: 'none',
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      border: '1px solid rgba(107,79,143,0.5)',
                      top: '-4px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  />
                  <motion.div
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ fontSize: '28px' }}
                  >
                    👆
                  </motion.div>
                  <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '10px',
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: '#6B4F8F',
                      margin: 0,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isMobile ? t('curtain.tap') : t('curtain.click')}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Light burst on open ── */}
            <AnimatePresence>
              {sealBroken && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 0.5, 0], scale: [0.5, 1.4, 2] }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    top: '54%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(156,127,190,0.28) 0%, transparent 70%)',
                    pointerEvents: 'none',
                    zIndex: 15,
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Content behind envelope ── */}
      <div
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'scale(1)' : 'scale(1.02)',
          transition: 'opacity 1s ease 0.4s, transform 1s ease 0.4s',
        }}
      >
        {children}
      </div>
    </>
  );
}
