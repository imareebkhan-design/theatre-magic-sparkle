import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import envelopePoster from '@/assets/envelope-navy-bee.jpg';
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
                'radial-gradient(ellipse at center, #15233F 0%, #0B1426 70%, #050912 100%)',
              overflow: 'hidden',
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
            {/* warm gold glow behind the seal */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 50% 50%, rgba(212,165,86,0.18) 0%, rgba(212,165,86,0) 55%)',
                pointerEvents: 'none',
              }}
            />

            {/* Fullscreen envelope assembly */}
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              animate={
                stage === 'idle'
                  ? { opacity: 1, scale: [1, 1.015, 1] }
                  : { opacity: 1, scale: 1 }
              }
              transition={
                stage === 'idle'
                  ? {
                      opacity: { duration: 0.8 },
                      scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                    }
                  : { duration: 0.4 }
              }
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                cursor: stage === 'idle' ? 'pointer' : 'default',
              }}
            >
              {/* Poster image — visible while idle, hidden once video starts */}
              <motion.img
                src={envelopePoster}
                alt="Wedding envelope with gold wax seal"
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
                  objectFit: 'cover',
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
                  objectFit: 'cover',
                  opacity: stage === 'opening' ? 1 : 0,
                  transition: 'opacity 0.25s ease-out',
                  pointerEvents: 'none',
                }}
              />

              {/* Subtle vignette for cinematic depth */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.45) 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Soft pulsing gold glow over the seal area to draw the tap */}
              {stage === 'idle' && (
                <motion.div
                  animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '40vmin',
                    height: '40vmin',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle, rgba(212,165,86,0.35) 0%, rgba(212,165,86,0) 65%)',
                    pointerEvents: 'none',
                    mixBlendMode: 'screen',
                  }}
                />
              )}
            </motion.div>

            {/* Tap hint pinned near the bottom */}
            <div
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
                      color: '#D4A556',
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
