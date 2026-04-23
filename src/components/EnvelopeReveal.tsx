import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import envelopePoster from '@/assets/envelope-floral.webp';
import envelopeIntroAsset from '@/assets/envelope-intro.mp4.asset.json';

interface EnvelopeRevealProps {
  onOpen?: () => void;
  children: React.ReactNode;
}

const VIDEO_URL = envelopeIntroAsset.url;

export const EnvelopeReveal = ({ onOpen, children }: EnvelopeRevealProps) => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<'idle' | 'opening' | 'revealed'>('idle');
  const [showHint, setShowHint] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // lock scroll while overlay is up
  useEffect(() => {
    document.body.style.overflow = stage !== 'revealed' ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [stage]);

  // hint after a beat
  useEffect(() => {
    if (stage === 'idle') {
      const tm = window.setTimeout(() => setShowHint(true), 1400);
      return () => window.clearTimeout(tm);
    }
  }, [stage]);

  const reveal = () => {
    setStage('revealed');
    onOpen?.();
  };

  const handleOpen = () => {
    if (stage !== 'idle') return;
    setStage('opening');

    if (reduceMotion) {
      window.setTimeout(reveal, 400);
      return;
    }

    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      const p = v.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => {
          // autoplay/playback failed — fall back to timed reveal
          window.setTimeout(reveal, 1200);
        });
      }
    } else {
      window.setTimeout(reveal, 1200);
    }
  };

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
            transition={{ duration: 0.7, ease: 'easeOut' }}
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
            {/* warm glow */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 50% 45%, rgba(255,235,200,0.55) 0%, rgba(255,235,200,0) 60%)',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '520px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '28px',
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={
                  stage === 'idle'
                    ? { opacity: 1, scale: 1, y: [0, -6, 0] }
                    : { opacity: 1, scale: 1, y: 0 }
                }
                transition={
                  stage === 'idle'
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
                  cursor: stage === 'idle' ? 'pointer' : 'default',
                }}
              >
                {/* Poster image — visible while idle, hidden once video starts */}
                <motion.img
                  src={envelopePoster}
                  alt="Floral wedding envelope"
                  draggable={false}
                  decoding="async"
                  fetchPriority="high"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: stage === 'idle' ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                />

                {/* Cinematic envelope-opening video */}
                <video
                  ref={videoRef}
                  src={VIDEO_URL}
                  poster={envelopePoster}
                  playsInline
                  preload="auto"
                  muted
                  onEnded={reveal}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    opacity: stage === 'opening' ? 1 : 0,
                    transition: 'opacity 0.25s ease-out',
                    pointerEvents: 'none',
                  }}
                />

                {/* Soft pulsing glow around the envelope to draw the tap */}
                {stage === 'idle' && (
                  <motion.div
                    animate={{ opacity: [0.25, 0.6, 0.25], scale: [1, 1.05, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      inset: '-8%',
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle, rgba(232,154,175,0.35) 0%, rgba(232,154,175,0) 70%)',
                      pointerEvents: 'none',
                      zIndex: -1,
                    }}
                  />
                )}
              </motion.div>

              {/* Tap hint */}
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
                      {t('envelope.pull') || 'Tap to open'}
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
