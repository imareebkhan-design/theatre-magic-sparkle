import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import templeDoor from '@/assets/temple-door.jpg';
import coupleSwing from '@/assets/couple-swing.jpg';

export default function HeroSection() {
  const [stage, setStage] = useState(0);
  // 0 = door closed, 1 = door opening, 2 = couple visible, 3 = couple fading, 4 = text

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),    // Start opening at 1s
      setTimeout(() => setStage(2), 3000),     // Couple appears at 3s
      setTimeout(() => setStage(3), 6000),     // Couple fades at 6s
      setTimeout(() => setStage(4), 7500),     // Text reveals at 7.5s
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: '#F6F0E6' }}>
      {/* Navy background behind doors */}
      <div className="absolute inset-0" style={{ backgroundColor: stage >= 1 ? '#F6F0E6' : '#223348', transition: 'background-color 1.5s ease' }} />

      {/* Couple Image */}
      <motion.div
        className="absolute inset-0 flex items-end justify-center z-10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: stage === 2 ? 1 : stage === 3 ? 0 : 0,
        }}
        transition={{
          opacity: {
            duration: stage === 3 ? 1 : 1.5,
            ease: 'easeOut',
          },
        }}
      >
        <motion.img
          src={coupleSwing}
          alt="Couple on swing watercolor"
          className="max-w-[600px] w-full object-contain"
          style={{ mixBlendMode: 'multiply' }}
          initial={{ y: 30, opacity: 0 }}
          animate={{
            y: stage >= 2 ? 0 : 30,
            opacity: stage === 2 ? 1 : stage === 3 ? 0 : 0,
          }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6">
        {stage >= 4 && (
          <div className="flex flex-col items-center gap-6">
            {/* Line 1 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0 }}
              className="text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#C97B5A' }}
            >
              WITH JOY & LOVE, WE INVITE YOU TO CELEBRATE
            </motion.p>

            {/* Line 2 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-[56px] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#AB8A3B' }}
            >
              Nikila & Sarthak
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-16 sm:w-20" style={{ backgroundColor: '#AB8A3B' }} />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="#AB8A3B">
                <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z" />
              </svg>
              <div className="h-px w-16 sm:w-20" style={{ backgroundColor: '#AB8A3B' }} />
            </motion.div>

            {/* Line 3 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-center"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '15px', color: '#223348', lineHeight: 2 }}
            >
              Request the honour of your presence<br />
              at their wedding celebration
            </motion.p>

            {/* Chevron */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="mt-8"
            >
              <motion.svg
                width="24"
                height="14"
                viewBox="0 0 24 14"
                fill="none"
                stroke="#AB8A3B"
                strokeWidth="1.5"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path d="M2 2L12 12L22 2" />
              </motion.svg>
            </motion.div>
          </div>
        )}
      </div>

      {/* Left Door */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full z-30 overflow-hidden"
        style={{
          transformOrigin: 'left center',
          backgroundImage: `url(${templeDoor})`,
          backgroundSize: '200% 100%',
          backgroundPosition: 'left center',
        }}
        animate={{
          rotateY: stage >= 1 ? -90 : 0,
        }}
        transition={{
          duration: 2,
          ease: [0.25, 0.1, 0.1, 1],
        }}
      />

      {/* Right Door */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full z-30 overflow-hidden"
        style={{
          transformOrigin: 'right center',
          backgroundImage: `url(${templeDoor})`,
          backgroundSize: '200% 100%',
          backgroundPosition: 'right center',
        }}
        animate={{
          rotateY: stage >= 1 ? 90 : 0,
        }}
        transition={{
          duration: 2,
          ease: [0.25, 0.1, 0.1, 1],
        }}
      />
    </section>
  );
}
