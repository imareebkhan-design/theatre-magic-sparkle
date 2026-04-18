import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/* ── Wax Seal SVG ── */
const WaxSeal = ({ broken }: { broken: boolean }) => (
  <motion.div
    animate={broken ? { scale: [1, 1.15, 0.9, 1.05, 0], opacity: [1, 1, 1, 0.6, 0] } : {}}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    style={{ position: 'relative', width: '90px', height: '90px' }}
  >
    <svg viewBox="0 0 90 90" width="90" height="90">
      <defs>
        <radialGradient id="sealGrad" cx="38%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#D4AA5A" />
          <stop offset="40%" stopColor="#AB8A3B" />
          <stop offset="100%" stopColor="#7A6020" />
        </radialGradient>
        <radialGradient id="sealShine" cx="35%" cy="30%" r="50%">
          <stop offset="0%" stopColor="rgba(255,245,200,0.55)" />
          <stop offset="100%" stopColor="rgba(255,245,200,0)" />
        </radialGradient>
        <filter id="sealShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.25)" />
        </filter>
      </defs>

      {/* Outer star-burst ring */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const r1 = 42, r2 = 38;
        const x1 = 45 + Math.cos(angle) * r1;
        const y1 = 45 + Math.sin(angle) * r1;
        const midAngle = angle + Math.PI / 20;
        const x2 = 45 + Math.cos(midAngle) * r2;
        const y2 = 45 + Math.sin(midAngle) * r2;
        return <line key={i} x1="45" y1="45" x2={x1} y2={y1} stroke="#AB8A3B" strokeWidth="1.5" opacity="0.5" />;
      })}

      {/* Main seal circle */}
      <circle cx="45" cy="45" r="36" fill="url(#sealGrad)" filter="url(#sealShadow)" />

      {/* Inner embossed ring */}
      <circle cx="45" cy="45" r="30" fill="none" stroke="rgba(255,240,180,0.3)" strokeWidth="1.5" />
      <circle cx="45" cy="45" r="26" fill="none" stroke="rgba(255,240,180,0.2)" strokeWidth="0.8" />

      {/* Shine overlay */}
      <circle cx="45" cy="45" r="36" fill="url(#sealShine)" />

      {/* Initials N & S */}
      <text
        x="45" y="41"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontSize="11"
        fontWeight="300"
        letterSpacing="3"
        fill="rgba(255,248,220,0.9)"
      >
        N
      </text>
      <text
        x="45" y="52"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontSize="8"
        fontWeight="300"
        fill="rgba(255,248,220,0.6)"
        letterSpacing="1"
      >
        &amp;
      </text>
      <text
        x="45" y="63"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontSize="11"
        fontWeight="300"
        letterSpacing="3"
        fill="rgba(255,248,220,0.9)"
      >
        S
      </text>

      {/* Crack lines when broken */}
      {broken && (
        <>
          <motion.path
            d="M45 9 L43 25 L46 35 L44 45"
            stroke="rgba(255,248,220,0.8)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.path
            d="M45 81 L47 65 L44 55 L46 45"
            stroke="rgba(255,248,220,0.8)"
            strokeWidth="1"
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

/* ── Lotus / Botanical SVG that peeks from top ── */
const EnvelopeBotanical = () => (
  <svg viewBox="0 0 220 160" width="220" height="160" fill="none" style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
    {/* Stems */}
    <path d="M110 160 Q108 120 105 90 Q102 60 100 40" stroke="#53694D" strokeWidth="1.2" fill="none" opacity="0.7" />
    <path d="M110 160 Q113 115 116 85 Q119 55 122 35" stroke="#53694D" strokeWidth="1.2" fill="none" opacity="0.7" />
    <path d="M110 160 Q105 130 95 105 Q85 80 78 55" stroke="#53694D" strokeWidth="1" fill="none" opacity="0.5" />
    <path d="M110 160 Q117 128 128 104 Q138 82 144 58" stroke="#53694D" strokeWidth="1" fill="none" opacity="0.5" />

    {/* Lotus centre */}
    <path d="M110 30 C110 30 104 18 104 10 C104 5 107 2 110 2 C113 2 116 5 116 10 C116 18 110 30 110 30Z" fill="#C97B5A" opacity="0.8" />
    <path d="M103 28 C103 28 94 20 91 13 C89 7 91 3 94 4 C97 5 100 10 103 28Z" fill="#AB8A3B" opacity="0.7" />
    <path d="M117 28 C117 28 126 20 129 13 C131 7 129 3 126 4 C123 5 120 10 117 28Z" fill="#AB8A3B" opacity="0.7" />
    <path d="M96 32 C96 32 86 26 82 20 C79 14 82 10 85 11 C88 12 92 20 96 32Z" fill="#C97B5A" opacity="0.5" />
    <path d="M124 32 C124 32 134 26 138 20 C141 14 138 10 135 11 C132 12 128 20 124 32Z" fill="#C97B5A" opacity="0.5" />

    {/* Left branch leaves */}
    <path d="M95 80 C85 75 75 72 70 65 C78 63 88 68 95 80Z" fill="#53694D" opacity="0.6" />
    <path d="M90 100 C80 92 68 90 62 82 C70 80 82 86 90 100Z" fill="#53694D" opacity="0.5" />

    {/* Right branch leaves */}
    <path d="M126 78 C136 73 146 70 151 63 C143 61 133 66 126 78Z" fill="#53694D" opacity="0.6" />
    <path d="M130 98 C140 90 152 88 158 80 C150 78 138 84 130 98Z" fill="#53694D" opacity="0.5" />

    {/* Small gold dots — kolam style */}
    <circle cx="80" cy="55" r="2" fill="#AB8A3B" opacity="0.6" />
    <circle cx="142" cy="57" r="2" fill="#AB8A3B" opacity="0.6" />
    <circle cx="72" cy="70" r="1.5" fill="#AB8A3B" opacity="0.4" />
    <circle cx="150" cy="68" r="1.5" fill="#AB8A3B" opacity="0.4" />
  </svg>
);

/* ── Envelope fold lines / paper texture ── */
const EnvelopePanel = ({ side }: { side: 'left' | 'right' }) => {
  const isLeft = side === 'left';
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(160deg, #FFFDF8 0%, #F9F3E8 50%, #F4EDE4 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Paper grain texture */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }}>
        <filter id={`noise-${side}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#noise-${side})`} />
      </svg>

      {/* Diagonal fold lines — envelope interior lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 50 100" preserveAspectRatio="none">
        {isLeft ? (
          <>
            {/* Left panel: lines go from centre-right edge toward top-left and bottom-left */}
            <path d="M50,0 L0,35" stroke="#AB8A3B" strokeWidth="0.3" opacity="0.2" />
            <path d="M50,100 L0,65" stroke="#AB8A3B" strokeWidth="0.3" opacity="0.2" />
            {/* Subtle horizontal envelope lines */}
            <line x1="0" y1="33" x2="50" y2="33" stroke="#AB8A3B" strokeWidth="0.15" opacity="0.12" />
            <line x1="0" y1="67" x2="50" y2="67" stroke="#AB8A3B" strokeWidth="0.15" opacity="0.12" />
          </>
        ) : (
          <>
            <path d="M0,0 L50,35" stroke="#AB8A3B" strokeWidth="0.3" opacity="0.2" />
            <path d="M0,100 L50,65" stroke="#AB8A3B" strokeWidth="0.3" opacity="0.2" />
            <line x1="0" y1="33" x2="50" y2="33" stroke="#AB8A3B" strokeWidth="0.15" opacity="0.12" />
            <line x1="0" y1="67" x2="50" y2="67" stroke="#AB8A3B" strokeWidth="0.15" opacity="0.12" />
          </>
        )}
      </svg>

      {/* Edge shadow on seam side */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0,
        [isLeft ? 'right' : 'left']: 0,
        width: '40px',
        background: isLeft
          ? 'linear-gradient(to left, rgba(34,51,72,0.08), transparent)'
          : 'linear-gradient(to right, rgba(34,51,72,0.08), transparent)',
      }} />

      {/* Gold border edge on outer sides */}
      <div style={{
        position: 'absolute',
        top: '16px', bottom: '16px',
        [isLeft ? 'left' : 'right']: '16px',
        width: '1px',
        background: 'linear-gradient(to bottom, transparent, rgba(171,138,59,0.3) 20%, rgba(171,138,59,0.3) 80%, transparent)',
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
    // Slight delay so seal crack plays before panels split
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
                borderRight: '1px solid rgba(171,138,59,0.15)',
                boxShadow: '4px 0 24px rgba(34,51,72,0.12)',
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
                borderLeft: '1px solid rgba(171,138,59,0.15)',
                boxShadow: '-4px 0 24px rgba(34,51,72,0.12)',
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
                background: 'linear-gradient(to bottom, transparent 0%, rgba(171,138,59,0.5) 15%, rgba(171,138,59,0.5) 85%, transparent 100%)',
                zIndex: 10,
              }}
            />

            {/* ── Botanical illustration ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? -40 : 0 }}
              transition={{ opacity: { duration: 0.6, delay: 0.3 }, y: { duration: 0.25 } }}
              style={{
                position: 'absolute',
                top: '8%',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 8,
                pointerEvents: 'none',
              }}
            >
              <EnvelopeBotanical />
            </motion.div>

            {/* ── Wax seal ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                position: 'absolute',
                bottom: '18%',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
              }}
            >
              <WaxSeal broken={sealBroken} />
            </motion.div>

            {/* ── Invitation text on envelope ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isOpen ? 0 : 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{
                position: 'absolute',
                top: '42%',
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
                color: 'rgba(34,51,72,0.4)',
                marginBottom: '8px',
              }}>
                A Wedding Invitation
              </p>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '28px',
                fontWeight: 300,
                color: '#223348',
                letterSpacing: '0.05em',
                lineHeight: 1,
              }}>
                Nikila &amp; Sarthak
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '9px',
                letterSpacing: '0.25em',
                color: 'rgba(34,51,72,0.35)',
                marginTop: '8px',
              }}>
                29 · 11 · 2026
              </p>
            </motion.div>

            {/* ── Gold decorative dots ── */}
            {[
              { top: '30%', left: '25%' },
              { top: '70%', left: '25%' },
              { top: '30%', right: '25%' },
              { top: '70%', right: '25%' },
            ].map((pos, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: isOpen ? 0 : 0.35, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                style={{
                  position: 'absolute',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#AB8A3B',
                  zIndex: 8,
                  ...pos,
                }}
              />
            ))}

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
                    bottom: '8%',
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
                  {/* Ripple */}
                  <motion.div
                    animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      border: '1px solid rgba(171,138,59,0.5)',
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
                      color: '#AB8A3B',
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
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(171,138,59,0.2) 0%, transparent 70%)',
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
