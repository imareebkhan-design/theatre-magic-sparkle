import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// Generates an SVG texture matching the target's hand-drawn curtain folds
const CurtainTexture = () => (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute inset-0 z-0">
        <defs>
            {/* Pattern mimicking stylized curtain fabric folds */}
            <pattern id="curtain-folds" width="100" height="800" patternUnits="userSpaceOnUse">
                <path d="M 10,0 Q 15,200 12,400 T 10,800" stroke="#4a6a8a" strokeWidth="2" fill="none" opacity="0.4" />
                <path d="M 25,50 Q 20,250 22,500 T 25,800" stroke="#4a6a8a" strokeWidth="1" fill="none" opacity="0.2" />
                <path d="M 40,0 Q 45,300 42,600 T 40,800" stroke="#4a6a8a" strokeWidth="2.5" fill="none" opacity="0.5" />
                <path d="M 60,100 Q 55,400 58,600 T 60,800" stroke="#4a6a8a" strokeWidth="1" fill="none" opacity="0.3" />
                <path d="M 75,0 Q 80,200 78,450 T 75,800" stroke="#4a6a8a" strokeWidth="1.5" fill="none" opacity="0.4" />
                <path d="M 90,20 Q 85,300 88,550 T 90,800" stroke="#4a6a8a" strokeWidth="1" fill="none" opacity="0.2" />
            </pattern>
            <linearGradient id="shading" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#0f1a2a" stopOpacity="0.8" />
                <stop offset="20%" stopColor="#1a2d45" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#162438" stopOpacity="0" />
                <stop offset="80%" stopColor="#1a2d45" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0f1a2a" stopOpacity="0.8" />
            </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#shading)" />
        <rect width="100%" height="100%" fill="url(#curtain-folds)" />
    </svg>
);

export default function CurtainReveal({ children, onOpen }: { children: React.ReactNode; onOpen?: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const hintTimer = setTimeout(() => {
            if (!hasInteracted) setShowHint(true);
        }, 3000);
        return () => clearTimeout(hintTimer);
    }, [hasInteracted]);

    const handleInteraction = () => {
        setHasInteracted(true);
        setShowHint(false);
    };

    const handleOpen = () => {
        handleInteraction();
        setIsOpen(true);
        onOpen?.();
    };

    return (
        <>
            <AnimatePresence>
                <motion.div
                    className="fixed inset-0 z-[100] flex overflow-hidden"
                    style={{ pointerEvents: isOpen ? 'none' : 'auto' }}
                    onClick={isOpen ? undefined : handleOpen}
                    onTouchStart={isOpen ? undefined : handleInteraction}
                >
                    {/* Left Curtain */}
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: isOpen ? '-100%' : 0 }}
                        transition={{ duration: 4.0, ease: [0.45, 0, 0.15, 1] }}
                        className="relative h-full w-1/2 overflow-hidden border-r border-black/30 shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-10 cursor-pointer pointer-events-auto"
                        style={{ backgroundColor: '#1a2d45' }}
                    >
                        <CurtainTexture />
                    </motion.div>

                    {/* Right Curtain */}
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: isOpen ? '100%' : 0 }}
                        transition={{ duration: 4.0, ease: [0.45, 0, 0.15, 1] }}
                        className="relative h-full w-1/2 overflow-hidden border-l border-black/30 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-10 cursor-pointer pointer-events-auto"
                        style={{ backgroundColor: '#1a2d45' }}
                    >
                        <CurtainTexture />
                        <div className="absolute inset-0 scale-x-[-1] pointer-events-none">
                            <CurtainTexture />
                        </div>
                    </motion.div>

                    {/* Light ray effect */}
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0, 0.6, 0] }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        style={{
                          position: 'absolute',
                          top: '50%', left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '300px', height: '100vh',
                          background: 'conic-gradient(from 270deg at 50% 50%, transparent 60deg, rgba(171,138,59,0.15) 90deg, transparent 120deg, transparent 240deg, rgba(171,138,59,0.1) 270deg, transparent 300deg)',
                          pointerEvents: 'none',
                          zIndex: 5,
                          filter: 'blur(8px)',
                        }}
                      />
                    )}

                    {/* Tap/Click hint */}
                    <AnimatePresence>
                      {showHint && !isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          style={{
                            position: 'absolute',
                            bottom: '12%',
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
                          {/* Ripple ring */}
                          <motion.div
                            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                            style={{
                              position: 'absolute',
                              width: '56px',
                              height: '56px',
                              borderRadius: '50%',
                              border: '1.5px solid rgba(171,138,59,0.6)',
                              top: '-4px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                            }}
                          />
                          {/* Hand icon */}
                          <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ fontSize: '32px', lineHeight: 1 }}
                          >
                            👆
                          </motion.div>
                          {/* Text */}
                          <motion.p
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: '11px',
                              letterSpacing: '0.25em',
                              textTransform: 'uppercase',
                              color: '#AB8A3B',
                              margin: 0,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {isMobile ? 'Tap to open' : 'Click to open'}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>

            <div className={!isOpen ? 'opacity-0 scale-[1.02]' : 'opacity-100 scale-100 transition-all duration-1000 ease-out delay-100'}>
                {children}
            </div>
        </>
    );
}
