import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function DoorLightRay({ visible }: { visible: boolean }) {
  return visible ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.7, 0] }}
      transition={{ duration: 2.2, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px', height: '100vh',
        background: 'conic-gradient(from 270deg at 50% 50%, transparent 55deg, rgba(171,138,59,0.18) 90deg, transparent 125deg, transparent 235deg, rgba(171,138,59,0.12) 270deg, transparent 305deg)',
        pointerEvents: 'none',
        zIndex: 5,
        filter: 'blur(10px)',
      }}
    />
  ) : null;
}

export function NameLetterStagger({ name }: { name: string }) {
  return (
    <span>
      {name.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: i * 0.055,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function CoupleParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -70]);

  return (
    <motion.div ref={ref} style={{ y, willChange: 'transform' }}>
      {children}
    </motion.div>
  );
}
