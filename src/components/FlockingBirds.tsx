import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Hand-drawn sketch-style bird — simple pen strokes
const SketchBird = ({ flip = false }: { flip?: boolean }) => (
  <svg
    viewBox="0 0 40 20"
    width="40"
    height="20"
    fill="none"
    style={{ transform: flip ? 'scaleX(-1)' : undefined }}
  >
    {/* Left wing — loose pen stroke */}
    <path
      d="M20 12 Q14 4, 4 2 Q8 6, 10 10 Q14 8, 20 12Z"
      stroke="#223348"
      strokeWidth="0.8"
      fill="none"
      strokeLinecap="round"
      opacity="0.25"
    />
    {/* Right wing */}
    <path
      d="M20 12 Q26 4, 36 2 Q32 6, 30 10 Q26 8, 20 12Z"
      stroke="#223348"
      strokeWidth="0.8"
      fill="none"
      strokeLinecap="round"
      opacity="0.25"
    />
    {/* Body hint */}
    <path
      d="M18 13 Q20 14, 22 13"
      stroke="#223348"
      strokeWidth="0.6"
      fill="none"
      strokeLinecap="round"
      opacity="0.2"
    />
  </svg>
);

interface Bird {
  id: number;
  initialX: string;
  initialY: string;
  duration: number;
  delay: number;
  scale: number;
  flip: boolean;
}

export default function FlockingBirds() {
  const [birds, setBirds] = useState<Bird[]>([]);

  useEffect(() => {
    const newBirds = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      initialX: `${-10 - Math.random() * 15}%`,
      initialY: `${5 + Math.random() * 35}%`,
      duration: 20 + Math.random() * 25,
      delay: Math.random() * 12,
      scale: 0.6 + Math.random() * 1.2,
      flip: Math.random() > 0.5,
    }));
    setBirds(newBirds);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {birds.map((bird) => (
        <motion.div
          key={bird.id}
          className="absolute"
          initial={{ left: bird.initialX, top: bird.initialY, scale: bird.scale, opacity: 0 }}
          animate={{
            left: '110%',
            top: [
              `${parseFloat(bird.initialY)}%`,
              `${parseFloat(bird.initialY) - 5 + Math.random() * 10}%`,
              `${parseFloat(bird.initialY) + 3}%`,
            ],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: bird.duration,
            delay: bird.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Wing flap animation */}
          <motion.div
            animate={{ scaleY: [1, 0.7, 1] }}
            transition={{ duration: 0.8 + Math.random() * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <SketchBird flip={bird.flip} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
