import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function AnimatedTimelineLine() {
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const length = line.getTotalLength?.() ?? 800;
    line.style.strokeDasharray = `${length}`;
    line.style.strokeDashoffset = `${length}`;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        line.style.transition = 'stroke-dashoffset 2.5s ease-in-out';
        line.style.strokeDashoffset = '0';
      }
    }, { threshold: 0.1 });

    observer.observe(line);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        transform: 'translateX(-50%)',
        width: '2px',
        height: '100%',
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      <line
        ref={lineRef}
        x1="1" y1="0"
        x2="1" y2="100%"
        stroke="#AB8A3B"
        strokeWidth="1"
      />
    </svg>
  );
}

export function EventCard({
  children,
  side,
  index,
}: {
  children: React.ReactNode;
  side: 'left' | 'right';
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
