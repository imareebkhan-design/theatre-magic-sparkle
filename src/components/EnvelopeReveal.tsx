import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/* ── Wax Seal Half (left or right) ── */
const SealHalf = ({ side, broken }: { side: 'left' | 'right'; broken: boolean }) => {
  const isLeft = side === 'left';
  return (
    <motion.div
      initial={{ x: 0, rotate: 0, opacity: 1 }}
      animate={
        broken
          ? {
              x: isLeft ? -60 : 60,
              y: 40,
              rotate: isLeft ? -35 : 35,
              opacity: 0,
            }
          : { x: 0, rotate: 0, opacity: 1 }
      }
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: broken ? 0.05 : 0 }}
      style={{
        position: 'absolute',
        top: 0,
        left: isLeft ? 0 : '50%',
        width: '50%',
        height: '100%',
        overflow: 'hidden',
        transformOrigin: isLeft ? 'right center' : 'left center',
      }}
    >
      <svg
        viewBox="0 0 120 120"
        width="120"
        height="120"
        style={{
          position: 'absolute',
          top: 0,
          left: isLeft ? 0 : '-100%',
        }}
      >
        <defs>
          <radialGradient id={`sealGrad-${side}`} cx="38%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#C9B5DC" />
            <stop offset="45%" stopColor="#9C7FBE" />
            <stop offset="100%" stopColor="#5E4582" />
          </radialGradient>
          <filter id={`sealShadow-${side}`}>
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="rgba(60,40,90,0.45)" />
          </filter>
        </defs>
        <path
          d="M60,8 C78,10 95,22 102,38 C112,52 112,72 104,86 C96,102 78,112 60,112 C42,112 24,102 16,86 C8,72 8,52 18,38 C25,22 42,10 60,8 Z"
          fill={`url(#sealGrad-${side})`}
          filter={`url(#sealShadow-${side})`}
        />
        {/* Monogram */}
        <text
          x="60"
          y="72"
          textAnchor="middle"
          fontFamily="Great Vibes, cursive"
          fontSize="44"
          fill="#F5EFE4"
          opacity="0.95"
        >
          N|S
        </text>
        {/* Highlight */}
        <ellipse cx="44" cy="38" rx="20" ry="12" fill="rgba(255,255,255,0.25)" />
      </svg>
    </motion.div>
  );
};

interface EnvelopeRevealProps {
  onOpen?: () => void;
  children: React.ReactNode;
}

export const EnvelopeReveal = ({ onOpen, children }: EnvelopeRevealProps) => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<'idle' | 'opening' | 'revealed'>('idle');
  const [showHint, setShowHint] = useState(false);
  const timersRef = useRef<number[]>([]);

  // Lock scroll while envelope is closed
  useEffect(() => {
    if (stage !== 'revealed') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [stage]);

  // Show "tap to open" hint after delay
  useEffect(() => {
    if (stage === 'idle') {
      const t = window.setTimeout(() => setShowHint(true), 2200);
      return () => window.clearTimeout(t);
    }
  }, [stage]);

  const handleOpen = () => {
    if (stage !== 'idle') return;
    setStage('opening');

    if (reduceMotion) {
      const t = window.setTimeout(() => {
        setStage('revealed');
        onOpen?.();
      }, 400);
      timersRef.current.push(t);
      return;
    }

    // After full sequence, reveal
    const t1 = window.setTimeout(() => {
      setStage('revealed');
      onOpen?.();
    }, 2100);
    timersRef.current.push(t1);
  };

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  const broken = stage !== 'idle';
  const opening = stage === 'opening' || stage === 'revealed';

  return (
    <>
      {/* Children always mounted underneath; revealed via fade */}
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
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                'radial-gradient(ellipse at center, #F8F1E6 0%, #EFE3CC 55%, #E0D0B0 100%)',
              overflow: 'hidden',
              padding: '24px',
            }}
          >
            {/* Subtle ambient glow */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 50% 45%, rgba(255,235,200,0.45) 0%, rgba(255,235,200,0) 60%)',
                pointerEvents: 'none',
              }}
            />

            {/* 3D Stage */}
            <div
              style={{
                perspective: '1800px',
                width: '100%',
                maxWidth: '460px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '32px',
              }}
            >
              {/* Envelope wrapper — entry + breathing + hover */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={
                  opening
                    ? { opacity: 1, scale: 1, y: 0 }
                    : {
                        opacity: 1,
                        scale: 1,
                        y: [0, -6, 0],
                      }
                }
                transition={
                  opening
                    ? { duration: 0.4, ease: 'easeOut' }
                    : {
                        opacity: { duration: 0.8, ease: 'easeOut' },
                        scale: { duration: 0.8, ease: 'easeOut' },
                        y: {
                          duration: 4.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      }
                }
                whileHover={
                  !opening
                    ? { rotateX: -6, rotateY: 4, scale: 1.02 }
                    : undefined
                }
                onClick={handleOpen}
                onTap={handleOpen}
                role="button"
                aria-label="Open invitation"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleOpen();
                }}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1.5 / 1',
                  cursor: stage === 'idle' ? 'pointer' : 'default',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  filter:
                    'drop-shadow(0 30px 40px rgba(90,60,30,0.28)) drop-shadow(0 10px 18px rgba(90,60,30,0.18))',
                }}
              >
                {/* Card — slides up from inside the envelope, then scales to fill viewport */}
                <motion.div
                  initial={{ y: '0%', scale: 1, opacity: 1 }}
                  animate={
                    stage === 'opening'
                      ? {
                          y: ['0%', '-38%', '-38%', '-50%'],
                          scale: [1, 1, 1.05, 8],
                          opacity: [1, 1, 1, 0],
                        }
                      : { y: '0%', scale: 1 }
                  }
                  transition={
                    stage === 'opening'
                      ? {
                          duration: 1.6,
                          times: [0, 0.55, 0.65, 1],
                          ease: [0.34, 1.2, 0.64, 1],
                          delay: 0.55,
                        }
                      : { duration: 0.3 }
                  }
                  style={{
                    position: 'absolute',
                    top: '8%',
                    left: '8%',
                    width: '84%',
                    height: '84%',
                    background:
                      'linear-gradient(180deg, #FBF6EC 0%, #F2E8D3 100%)',
                    borderRadius: '4px',
                    boxShadow:
                      'inset 0 0 24px rgba(180,140,80,0.12), 0 2px 6px rgba(0,0,0,0.08)',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '14% 10% 30%',
                    textAlign: 'center',
                    transformOrigin: 'center center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Great Vibes, cursive',
                      fontSize: 'clamp(22px, 4vw, 34px)',
                      color: '#7A2F3E',
                      lineHeight: 1,
                      marginBottom: '8px',
                    }}
                  >
                    Nikila &amp; Sarthak
                  </div>
                  <div
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '10px',
                      letterSpacing: '0.3em',
                      color: '#9C7FBE',
                      textTransform: 'uppercase',
                    }}
                  >
                    Save the Date
                  </div>
                </motion.div>

                {/* Back pocket of envelope */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(135deg, #F5EFE4 0%, #EAE0CC 100%)',
                    borderRadius: '6px',
                    boxShadow:
                      'inset 0 -2px 4px rgba(120,90,50,0.12), inset 0 2px 4px rgba(255,255,255,0.5)',
                    zIndex: 0,
                  }}
                />

                {/* Front pocket panel — V-shape clip so card peeks above */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(165deg, #EFE5D2 0%, #E0D2B5 100%)',
                    borderRadius: '6px',
                    clipPath:
                      'polygon(0 38%, 50% 100%, 100% 38%, 100% 100%, 0 100%)',
                    boxShadow: 'inset 0 2px 6px rgba(120,90,50,0.18)',
                    zIndex: 2,
                  }}
                />

                {/* Diagonal seam lines (V shape on front) */}
                <svg
                  viewBox="0 0 150 100"
                  preserveAspectRatio="none"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 3,
                    pointerEvents: 'none',
                  }}
                >
                  <line
                    x1="0"
                    y1="38"
                    x2="75"
                    y2="100"
                    stroke="rgba(140,100,60,0.25)"
                    strokeWidth="0.4"
                  />
                  <line
                    x1="150"
                    y1="38"
                    x2="75"
                    y2="100"
                    stroke="rgba(140,100,60,0.25)"
                    strokeWidth="0.4"
                  />
                </svg>

                {/* Top flap — folds upward (rotateX) */}
                <motion.div
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: opening ? -178 : 0 }}
                  transition={{
                    duration: 0.95,
                    ease: [0.76, 0, 0.24, 1],
                    delay: opening ? 0.35 : 0,
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '62%',
                    transformOrigin: 'top center',
                    transformStyle: 'preserve-3d',
                    zIndex: 4,
                    willChange: 'transform',
                  }}
                >
                  {/* Flap front face */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, #F5EFE4 0%, #E6D9BF 100%)',
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      backfaceVisibility: 'hidden',
                      boxShadow: 'inset 0 -4px 8px rgba(120,90,50,0.15)',
                    }}
                  />
                  {/* Flap back face (visible when folded open) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(0deg, #EFE3CC 0%, #DCCBA8 100%)',
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateX(180deg)',
                      boxShadow: 'inset 0 4px 10px rgba(120,90,50,0.2)',
                    }}
                  />

                  {/* Wax seal sits at the tip of the flap */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '4%',
                      left: '50%',
                      transform: 'translate(-50%, 50%)',
                      width: '90px',
                      height: '90px',
                      zIndex: 5,
                    }}
                  >
                    <SealHalf side="left" broken={broken} />
                    <SealHalf side="right" broken={broken} />
                  </div>
                </motion.div>
              </motion.div>

              {/* Tap to open hint */}
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
                      {t('envelope.tap') || 'Tap to open'}
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
