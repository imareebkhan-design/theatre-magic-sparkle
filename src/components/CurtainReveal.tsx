import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import coupleImg from '@/assets/couple-illustration.jpg';

/* ─── Marigold Garland (cascading flowers) ─── */
const MarigoldGarland = ({ side }: { side: 'left' | 'right' }) => {
  const flowers = Array.from({ length: 18 }, (_, i) => ({
    y: 30 + i * 42,
    x: side === 'left' ? 12 + Math.sin(i * 0.7) * 6 : 12 + Math.sin(i * 0.7 + 1) * 6,
    size: 10 + Math.random() * 6,
    color: i % 3 === 0 ? '#C97B5A' : i % 3 === 1 ? '#AB8A3B' : '#D4944A',
    delay: i * 0.05,
  }));

  return (
    <div className={`absolute top-0 ${side === 'left' ? 'left-0' : 'right-0'} w-10 sm:w-14 h-full z-20 overflow-hidden`}>
      <svg width="100%" height="100%" viewBox="0 0 36 800" preserveAspectRatio="none">
        {/* Stem/string */}
        <path
          d={`M18,0 Q${side === 'left' ? '22' : '14'},200 18,400 Q${side === 'left' ? '14' : '22'},600 18,800`}
          stroke="#5A8C3C"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
        {/* Leaves */}
        {flowers.filter((_, i) => i % 3 === 0).map((f, i) => (
          <ellipse key={`leaf-${i}`} cx={f.x + 8} cy={f.y - 6} rx="5" ry="3" fill="#5A8C3C" opacity="0.4" transform={`rotate(${side === 'left' ? -20 : 20} ${f.x + 8} ${f.y - 6})`} />
        ))}
        {/* Flowers */}
        {flowers.map((f, i) => (
          <g key={i}>
            <circle cx={f.x} cy={f.y} r={f.size / 2} fill={f.color} opacity="0.85" />
            <circle cx={f.x} cy={f.y} r={f.size / 4} fill="#E8B86D" opacity="0.6" />
          </g>
        ))}
      </svg>
    </div>
  );
};

/* ─── Temple Door Panel SVG ─── */
const DoorPanel = ({ side }: { side: 'left' | 'right' }) => (
  <svg width="100%" height="100%" viewBox="0 0 200 500" preserveAspectRatio="none">
    {/* Door panel background */}
    <rect width="200" height="500" fill="#F6F0E6" />
    {/* Border lines */}
    <rect x="8" y="8" width="184" height="484" fill="none" stroke="#AB8A3B" strokeWidth="2" />
    <rect x="16" y="16" width="168" height="468" fill="none" stroke="#AB8A3B" strokeWidth="0.5" opacity="0.5" />
    {/* Upper panel */}
    <rect x="24" y="24" width="152" height="200" fill="none" stroke="#AB8A3B" strokeWidth="1" opacity="0.6" />
    {/* Lower panel */}
    <rect x="24" y="260" width="152" height="200" fill="none" stroke="#AB8A3B" strokeWidth="1" opacity="0.6" />
    {/* Gold ring half (center seam) */}
    {side === 'left' ? (
      <>
        <path d="M200,220 A40,40 0 0,0 200,300" fill="none" stroke="#AB8A3B" strokeWidth="3" />
        <path d="M200,230 A30,30 0 0,0 200,290" fill="none" stroke="#AB8A3B" strokeWidth="1.5" opacity="0.5" />
      </>
    ) : (
      <>
        <path d="M0,220 A40,40 0 0,1 0,300" fill="none" stroke="#AB8A3B" strokeWidth="3" />
        <path d="M0,230 A30,30 0 0,1 0,290" fill="none" stroke="#AB8A3B" strokeWidth="1.5" opacity="0.5" />
      </>
    )}
  </svg>
);

/* ─── Arch Frame SVG ─── */
const ArchFrame = () => (
  <div className="absolute inset-0 pointer-events-none z-10">
    <svg width="100%" height="100%" viewBox="0 0 400 600" preserveAspectRatio="none">
      {/* Dark teak frame surround - fills outside the arch */}
      <defs>
        <clipPath id="arch-clip">
          <path d="M40,600 L40,200 A160,160 0 0,1 360,200 L360,600 Z" />
        </clipPath>
      </defs>
      {/* Outer frame fill */}
      <rect width="400" height="600" fill="#2A1F14" />
      {/* Cut out the arch opening */}
      <path d="M40,600 L40,200 A160,160 0 0,1 360,200 L360,600 Z" fill="transparent" />
      {/* Arch border decorative line */}
      <path d="M44,600 L44,202 A156,156 0 0,1 356,202 L356,600" fill="none" stroke="#AB8A3B" strokeWidth="2" opacity="0.6" />
      <path d="M50,600 L50,204 A150,150 0 0,1 350,204 L350,600" fill="none" stroke="#AB8A3B" strokeWidth="0.5" opacity="0.3" />
    </svg>
  </div>
);

/* ─── Lotus Ornament SVG ─── */
const LotusOrnament = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" className="inline-block">
    <path d="M10,2 Q7,0 5,4 Q3,8 10,12 Q17,8 15,4 Q13,0 10,2Z" fill="#AB8A3B" opacity="0.7" />
    <path d="M10,4 Q8,2 7,5 Q6,8 10,10 Q14,8 13,5 Q12,2 10,4Z" fill="#AB8A3B" opacity="0.4" />
  </svg>
);

/* ─── Main Component ─── */
export default function CurtainReveal({ children }: { children: React.ReactNode }) {
  const [stage, setStage] = useState(0); // 0=door, 1=opening, 2=couple, 3=text, 4=done
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    // Stage 1: Start opening at 1s
    const t1 = setTimeout(() => setStage(1), 1000);
    // Stage 2: Couple appears at 2.5s
    const t2 = setTimeout(() => setStage(2), 2500);
    // Stage 3: Text at 5.5s
    const t3 = setTimeout(() => setStage(3), 5500);
    // Stage 4: Done — reveal content at 10s
    const t4 = setTimeout(() => { setStage(4); setIsOpen(true); }, 10000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const textLines = [
    { delay: 0, content: 'line1' },
    { delay: 0.4, content: 'line2' },
    { delay: 0.8, content: 'ornament' },
    { delay: 1.2, content: 'line3' },
  ];

  return (
    <>
      <AnimatePresence>
        {stage < 4 && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ backgroundColor: '#223348' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            {/* Golden glow behind door */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '40vmin',
                height: '40vmin',
                background: 'radial-gradient(circle, rgba(171,138,59,0.4) 0%, rgba(171,138,59,0) 70%)',
              }}
              animate={{
                scale: stage >= 1 ? 2.5 : 1,
                opacity: stage >= 1 ? 0.8 : 0.5,
              }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />

            {/* Door container with arch */}
            <div className="relative w-[75vw] sm:w-[50vw] md:w-[35vw] max-w-[400px]" style={{ aspectRatio: '2/3' }}>
              <ArchFrame />

              {/* Door panels container - inside the arch */}
              <div className="absolute inset-0 z-[5] overflow-hidden" style={{ clipPath: 'ellipse(40% 48% at 50% 55%)' }}>
                {/* Revealed content behind doors */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{ background: 'linear-gradient(180deg, #7397A8 0%, #B8CCd6 40%, #F6F0E6 60%, #F6F0E6 100%)' }}
                >
                  {/* Couple illustration */}
                  <AnimatePresence>
                    {stage >= 2 && stage < 3 && (
                      <motion.img
                        src={coupleImg}
                        alt="Couple illustration"
                        className="w-full h-full object-contain object-bottom"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Text reveal */}
                  {stage >= 3 && (
                    <div className="flex flex-col items-center justify-center px-4 gap-3 sm:gap-4">
                      {textLines.map((line, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: line.delay, ease: 'easeOut' }}
                        >
                          {line.content === 'line1' && (
                            <p
                              className="text-center"
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: '8px',
                                letterSpacing: '0.3em',
                                textTransform: 'uppercase',
                                color: '#C97B5A',
                                fontWeight: 400,
                              }}
                            >
                              WITH JOY & LOVE, WE INVITE YOU TO CELEBRATE
                            </p>
                          )}
                          {line.content === 'line2' && (
                            <h2
                              className="text-center"
                              style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 'clamp(24px, 5vw, 52px)',
                                color: '#AB8A3B',
                                fontWeight: 300,
                              }}
                            >
                              Nikila & Sarthak
                            </h2>
                          )}
                          {line.content === 'ornament' && (
                            <div className="flex items-center gap-2 justify-center">
                              <div className="h-px w-12 sm:w-16" style={{ backgroundColor: '#AB8A3B', opacity: 0.5 }} />
                              <LotusOrnament />
                              <div className="h-px w-12 sm:w-16" style={{ backgroundColor: '#AB8A3B', opacity: 0.5 }} />
                            </div>
                          )}
                          {line.content === 'line3' && (
                            <p
                              className="text-center leading-relaxed"
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: '10px',
                                color: '#223348',
                                fontWeight: 300,
                                lineHeight: 1.8,
                              }}
                            >
                              Request the honour of your presence<br />at their wedding celebration
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Left door */}
                <motion.div
                  className="absolute top-0 left-0 w-1/2 h-full origin-left"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{
                    rotateY: stage >= 1 ? -85 : 0,
                  }}
                  transition={{
                    duration: 1.8,
                    delay: 0,
                    ease: [0.25, 0.1, 0.1, 1],
                  }}
                >
                  <DoorPanel side="left" />
                </motion.div>

                {/* Right door */}
                <motion.div
                  className="absolute top-0 right-0 w-1/2 h-full origin-right"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{
                    rotateY: stage >= 1 ? 85 : 0,
                  }}
                  transition={{
                    duration: 1.8,
                    delay: 0,
                    ease: [0.25, 0.1, 0.1, 1],
                  }}
                >
                  <DoorPanel side="right" />
                </motion.div>

                {/* Marigold garlands */}
                <MarigoldGarland side="left" />
                <MarigoldGarland side="right" />
              </div>
            </div>

            {/* Scroll chevron after text is visible */}
            {stage >= 3 && (
              <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <motion.span
                  className="text-2xl"
                  style={{ color: '#AB8A3B' }}
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ∨
                </motion.span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={!isOpen ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000 ease-out'}>
        {children}
      </div>
    </>
  );
}
