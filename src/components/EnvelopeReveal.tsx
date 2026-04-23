import { motion, AnimatePresence, useReducedMotion, PanInfo } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import envelopeFloral from '@/assets/envelope-floral.webp';

interface EnvelopeRevealProps {
  onOpen?: () => void;
  children: React.ReactNode;
}

/* ── Bow SVG (sits on top of the ribbon junction) ── */
const Bow = () => (
  <svg viewBox="0 0 80 60" width="80" height="60" style={{ overflow: 'visible' }}>
    <defs>
      <linearGradient id="bowGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F2B8C8" />
        <stop offset="50%" stopColor="#E89AAF" />
        <stop offset="100%" stopColor="#C97389" />
      </linearGradient>
    </defs>
    {/* left loop */}
    <path d="M40,30 C20,8 4,18 8,30 C4,42 22,48 40,30 Z" fill="url(#bowGrad)" stroke="#9E5468" strokeWidth="0.6" />
    {/* right loop */}
    <path d="M40,30 C60,8 76,18 72,30 C76,42 58,48 40,30 Z" fill="url(#bowGrad)" stroke="#9E5468" strokeWidth="0.6" />
    {/* knot */}
    <ellipse cx="40" cy="30" rx="6" ry="8" fill="#B8788A" stroke="#7E4658" strokeWidth="0.6" />
    {/* highlight */}
    <ellipse cx="38" cy="27" rx="2" ry="3" fill="rgba(255,255,255,0.4)" />
  </svg>
);

export const EnvelopeReveal = ({ onOpen, children }: EnvelopeRevealProps) => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<'idle' | 'opening' | 'revealed'>('idle');
  const [showHint, setShowHint] = useState(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    document.body.style.overflow = stage !== 'revealed' ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [stage]);

  useEffect(() => {
    if (stage === 'idle') {
      const tm = window.setTimeout(() => setShowHint(true), 1800);
      return () => window.clearTimeout(tm);
    }
  }, [stage]);

  const handleOpen = () => {
    if (stage !== 'idle') return;
    setStage('opening');

    if (reduceMotion) {
      const tm = window.setTimeout(() => { setStage('revealed'); onOpen?.(); }, 400);
      timersRef.current.push(tm);
      return;
    }

    const tm = window.setTimeout(() => { setStage('revealed'); onOpen?.(); }, 2400);
    timersRef.current.push(tm);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 35 || Math.abs(info.velocity.x) > 200) {
      handleOpen();
    }
  };

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  const opening = stage === 'opening' || stage === 'revealed';

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 'revealed' ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: stage === 'revealed' ? 0.05 : 0 }}
        style={{
          position: 'relative',
          zIndex: 1,
          pointerEvents: stage === 'revealed' ? 'auto' : 'none',
        }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {stage !== 'revealed' && (
          <motion.div
            key="envelope-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                'radial-gradient(ellipse at center, #FBF4E8 0%, #F0E2C8 55%, #DCC9A4 100%)',
              overflow: 'hidden',
              padding: '24px',
            }}
          >
            {/* Ambient glow */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 50% 45%, rgba(255,235,200,0.5) 0%, rgba(255,235,200,0) 60%)',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '460px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              {/* Envelope assembly — slides up & fades on reveal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={
                  stage === 'opening'
                    ? { opacity: [1, 1, 0], scale: [1, 1.06, 1.15], y: [0, -20, -60] }
                    : stage === 'idle'
                    ? { opacity: 1, scale: 1, y: [0, -6, 0] }
                    : { opacity: 0 }
                }
                transition={
                  stage === 'opening'
                    ? { duration: 1.6, times: [0, 0.6, 1], ease: [0.4, 0, 0.2, 1], delay: 0.7 }
                    : stage === 'idle'
                    ? {
                        opacity: { duration: 0.8 },
                        scale: { duration: 0.8 },
                        y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
                      }
                    : { duration: 0.4 }
                }
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '3 / 4',
                  filter:
                    'drop-shadow(0 30px 40px rgba(90,60,30,0.28)) drop-shadow(0 10px 18px rgba(90,60,30,0.18))',
                }}
              >
                {/* Floral envelope base image */}
                <img
                  src={envelopeFloral}
                  alt="Floral wedding envelope"
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                />

                {/* Wax seal — bottom-up reveal mask. Centered roughly where the bow sits. */}
                <motion.div
                  initial={{ clipPath: 'inset(0% 0 0 0)' }}
                  animate={{
                    clipPath: opening ? 'inset(100% 0 0 0)' : 'inset(0% 0 0 0)',
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.4, 0, 0.2, 1],
                    delay: opening ? 0.55 : 0,
                  }}
                  style={{
                    position: 'absolute',
                    top: '46%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70px',
                    height: '70px',
                    pointerEvents: 'none',
                  }}
                >
                  <svg viewBox="0 0 100 100" width="100%" height="100%">
                    <defs>
                      <radialGradient id="waxGrad" cx="38%" cy="32%" r="72%">
                        <stop offset="0%" stopColor="#C8313A" />
                        <stop offset="50%" stopColor="#9E1B23" />
                        <stop offset="100%" stopColor="#5E0E14" />
                      </radialGradient>
                    </defs>
                    <path
                      d="M50,5 C66,6 82,14 90,28 C100,40 104,56 100,72 C96,86 84,98 70,102 C58,106 42,106 30,102 C16,98 4,88 0,74 C-4,58 0,40 10,28 C18,16 34,6 50,5 Z"
                      fill="url(#waxGrad)"
                    />
                    <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(255,200,200,0.2)" strokeWidth="1.4" />
                    <text
                      x="50"
                      y="62"
                      textAnchor="middle"
                      fontFamily="Great Vibes, cursive"
                      fontSize="34"
                      fill="#F2D6B0"
                    >
                      N|S
                    </text>
                  </svg>
                </motion.div>

                {/* Crack line as seal melts away */}
                <motion.svg
                  viewBox="0 0 100 100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: opening ? [0, 0.7, 0] : 0 }}
                  transition={{ duration: 0.9, delay: 0.55, times: [0, 0.4, 1] }}
                  style={{
                    position: 'absolute',
                    top: '46%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70px',
                    height: '70px',
                    pointerEvents: 'none',
                  }}
                >
                  <path
                    d="M30,80 L45,55 L40,40 L55,25 L50,12"
                    stroke="#3A0608"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </motion.svg>

                {/* Pink ribbon — left half (draggable) */}
                <motion.div
                  drag={stage === 'idle' ? 'x' : false}
                  dragConstraints={{ left: -100, right: 0 }}
                  dragElastic={0.5}
                  onDragEnd={handleDragEnd}
                  onClick={handleOpen}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleOpen();
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Pull the ribbon to open the invitation"
                  initial={{ x: 0, opacity: 1 }}
                  animate={
                    opening
                      ? { x: -180, opacity: 0, rotate: -8 }
                      : { x: 0, opacity: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '50%',
                    height: '100%',
                    cursor: stage === 'idle' ? 'grab' : 'default',
                  }}
                  whileTap={{ cursor: 'grabbing' }}
                >
                  {/* Ribbon strip running across the envelope (left half) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '46%',
                      left: 0,
                      right: 0,
                      height: '14px',
                      transform: 'translateY(-50%)',
                      background:
                        'linear-gradient(180deg, #F2B8C8 0%, #E89AAF 50%, #C97389 100%)',
                      boxShadow:
                        'inset 0 -2px 4px rgba(120,40,60,0.25), 0 2px 4px rgba(0,0,0,0.12)',
                      borderRadius: '2px 0 0 2px',
                    }}
                  />
                </motion.div>

                {/* Pink ribbon — right half (draggable) */}
                <motion.div
                  drag={stage === 'idle' ? 'x' : false}
                  dragConstraints={{ left: 0, right: 100 }}
                  dragElastic={0.5}
                  onDragEnd={handleDragEnd}
                  onClick={handleOpen}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleOpen();
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Pull the ribbon to open the invitation"
                  initial={{ x: 0, opacity: 1 }}
                  animate={
                    opening
                      ? { x: 180, opacity: 0, rotate: 8 }
                      : { x: 0, opacity: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '50%',
                    height: '100%',
                    cursor: stage === 'idle' ? 'grab' : 'default',
                  }}
                  whileTap={{ cursor: 'grabbing' }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '46%',
                      left: 0,
                      right: 0,
                      height: '14px',
                      transform: 'translateY(-50%)',
                      background:
                        'linear-gradient(180deg, #F2B8C8 0%, #E89AAF 50%, #C97389 100%)',
                      boxShadow:
                        'inset 0 -2px 4px rgba(120,40,60,0.25), 0 2px 4px rgba(0,0,0,0.12)',
                      borderRadius: '0 2px 2px 0',
                    }}
                  />
                </motion.div>

                {/* Bow on top — fades & rotates away */}
                <motion.div
                  initial={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                  animate={
                    opening
                      ? { opacity: 0, y: 60, rotate: 25, scale: 0.7 }
                      : { opacity: 1, y: 0, rotate: 0, scale: 1 }
                  }
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  onClick={handleOpen}
                  style={{
                    position: 'absolute',
                    top: '46%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    cursor: stage === 'idle' ? 'pointer' : 'default',
                    zIndex: 6,
                    pointerEvents: stage === 'idle' ? 'auto' : 'none',
                  }}
                >
                  <Bow />
                  {/* Pulsing glow to draw attention */}
                  {stage === 'idle' && (
                    <motion.div
                      animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        position: 'absolute',
                        inset: '-20px',
                        borderRadius: '50%',
                        background:
                          'radial-gradient(circle, rgba(232,154,175,0.45) 0%, rgba(232,154,175,0) 70%)',
                        pointerEvents: 'none',
                        zIndex: -1,
                      }}
                    />
                  )}
                </motion.div>
              </motion.div>

              {/* Hint */}
              <AnimatePresence>
                {stage === 'idle' && showHint && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '11px',
                      letterSpacing: '0.35em',
                      color: '#7A5A3A',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                    }}
                  >
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ display: 'inline-block' }}
                    >
                      {t('envelope.pull')}
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnvelopeReveal;
