import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import envelopePoster from '@/assets/envelope-navy-bee.jpg';

interface EnvelopeRevealProps {
  onOpen?: () => void;
  children: React.ReactNode;
}

/**
 * Fullscreen envelope intro inspired by elegant invitation reveals:
 *  - envelope fills the viewport
 *  - tap anywhere → gold seal cracks & dissolves
 *  - envelope gently fades away revealing the hero underneath
 *  - everything is slow, soft, and minimal (no flap rotation, no bounce)
 */
export const EnvelopeReveal = ({ onOpen, children }: EnvelopeRevealProps) => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<'idle' | 'opening' | 'revealed'>('idle');
  const [showHint, setShowHint] = useState(false);

  // lock scroll while overlay is up
  useEffect(() => {
    document.body.style.overflow = stage !== 'revealed' ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [stage]);

  useEffect(() => {
    if (stage === 'idle') {
      const tm = window.setTimeout(() => setShowHint(true), 1200);
      return () => window.clearTimeout(tm);
    }
  }, [stage]);

  const handleOpen = () => {
    if (stage !== 'idle') return;
    setStage('opening');
    const delay = reduceMotion ? 300 : 2200;
    window.setTimeout(() => {
      setStage('revealed');
      onOpen?.();
    }, delay);
  };

  const opening = stage === 'opening' || stage === 'revealed';

  return (
    <>
      {/* Hero underneath — fades in as the envelope dissolves */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 'revealed' ? 1 : 0 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
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
            animate={{ opacity: stage === 'opening' ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: stage === 'opening' ? 1.4 : 0.6,
              ease: [0.4, 0, 0.2, 1],
              delay: stage === 'opening' ? 0.6 : 0,
            }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              overflow: 'hidden',
              cursor: stage === 'idle' ? 'pointer' : 'default',
              background: '#0B1426',
            }}
            role="button"
            tabIndex={0}
            aria-label="Open the wedding invitation"
            onClick={handleOpen}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpen();
              }
            }}
          >
            {/* Fullscreen envelope photo — fills viewport, very gentle breathing */}
            <motion.img
              src={envelopePoster}
              alt="Wedding envelope with gold wax seal"
              draggable={false}
              decoding="async"
              fetchPriority="high"
              initial={{ scale: 1.02 }}
              animate={
                stage === 'idle'
                  ? { scale: [1.02, 1.04, 1.02] }
                  : { scale: 1.06 }
              }
              transition={
                stage === 'idle'
                  ? { duration: 7, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 1.6, ease: [0.4, 0, 0.2, 1] }
              }
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />

            {/* Subtle warm glow over the seal */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 50% 50%, rgba(212,165,86,0.18) 0%, rgba(212,165,86,0) 45%)',
                pointerEvents: 'none',
              }}
            />

            {/* Cinematic vignette */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Crack-line that draws across the seal as it opens */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '22vmin',
                height: '22vmin',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                mixBlendMode: 'screen',
                opacity: opening ? 1 : 0,
                transition: 'opacity 0.3s ease-out',
              }}
            >
              <motion.path
                d="M50,8 L48,28 L54,42 L46,58 L52,74 L49,92"
                stroke="rgba(255,220,150,0.9)"
                strokeWidth="0.6"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  opening
                    ? { pathLength: 1, opacity: [0, 1, 0] }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{
                  pathLength: { duration: 0.7, ease: 'easeOut', delay: 0.1 },
                  opacity: { duration: 1.2, times: [0, 0.4, 1], delay: 0.1 },
                }}
              />
            </svg>

            {/* Bright golden bloom that pulses at the seal as it cracks */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={
                opening
                  ? { opacity: [0, 0.9, 0], scale: [0.6, 1.6, 2.2] }
                  : { opacity: 0, scale: 0.6 }
              }
              transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '40vmin',
                height: '40vmin',
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(255,220,140,0.85) 0%, rgba(255,200,100,0.35) 30%, rgba(212,165,86,0) 70%)',
                pointerEvents: 'none',
                mixBlendMode: 'screen',
              }}
            />

            {/* Soft pulsing gold halo while idle to invite the tap */}
            {stage === 'idle' && (
              <motion.div
                animate={{ opacity: [0.18, 0.45, 0.18], scale: [1, 1.08, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '34vmin',
                  height: '34vmin',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(212,165,86,0.4) 0%, rgba(212,165,86,0) 65%)',
                  pointerEvents: 'none',
                  mixBlendMode: 'screen',
                }}
              />
            )}

            {/* Tap hint pinned near the bottom */}
            <AnimatePresence>
              {stage === 'idle' && showHint && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: '8vh',
                    display: 'flex',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                >
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '11px',
                      letterSpacing: '0.4em',
                      color: '#D4A556',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      display: 'inline-block',
                    }}
                  >
                    {t('envelope.pull') || 'Tap to open'}
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnvelopeReveal;
