import { Info } from 'lucide-react';
import CurtainReveal from '../components/CurtainReveal';
import FlockingBirds from '../components/FlockingBirds';
import templeIllustration from '../assets/temple-illustration.png';
import coupleIllustration from '../assets/couple-illustration-lineart.png';
import receptionVenueIllustration from '../assets/reception-venue-illustration.png';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import WeddingTimeline from '../components/WeddingTimeline';
import WeddingShlokas from '../components/WeddingShlokas';
import { NameLetterStagger, CoupleParallax } from '../components/HeroAnimations';

/* ─────────────── Countdown Component ─────────────── */
function Countdown() {
  const target = new Date('2026-11-29T16:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, min: 0, sec: 0 });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        min: Math.floor((diff / (1000 * 60)) % 60),
        sec: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex gap-3 sm:gap-6 justify-center mt-4">
      {[
        { label: 'DAYS', value: String(timeLeft.days) },
        { label: 'HOURS', value: pad(timeLeft.hours) },
        { label: 'MIN', value: pad(timeLeft.min) },
        { label: 'SEC', value: pad(timeLeft.sec) },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="w-20 h-20 sm:w-28 sm:h-28 border border-brand-red-dark/40 flex items-center justify-center">
            <span className="font-serif text-3xl sm:text-4xl text-brand-red-dark">{item.value}</span>
          </div>
          <span className="text-[9px] font-sans tracking-[0.2em] mt-2 uppercase text-brand-red-dark/70">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────── Temple Illustration ─────────────── */
const VenueIllustration = () => (
  <img
    src={templeIllustration}
    alt="South Indian Temple Illustration"
    className="w-full max-w-md mx-auto"
    loading="lazy"
    width={1024}
    height={640}
  />
);

/* ─────────────── Menu Ribbon Frame SVG ─────────────── */
const MenuRibbonFrame = () => (
  <svg viewBox="0 0 480 60" className="w-full max-w-lg mx-auto" stroke="#223348" strokeWidth="1.5" fill="none">
    <path d="M215,30 C200,20 185,10 175,20 C165,30 180,38 215,30 Z" />
    <path d="M265,30 C280,20 295,10 305,20 C315,30 300,38 265,30 Z" />
    <circle cx="240" cy="30" r="5" fill="#223348" opacity="0.6" />
    <path d="M215,30 C195,26 175,34 155,28 C135,22 115,32 95,26 C75,20 55,30 35,24" />
    <path d="M265,30 C285,34 305,26 325,32 C345,38 365,28 385,34 C405,40 425,30 445,36" />
  </svg>
);

const MenuRibbonBottom = () => (
  <svg viewBox="0 0 480 60" className="w-full max-w-lg mx-auto" stroke="#223348" strokeWidth="1.5" fill="none">
    <path d="M35,30 C55,24 75,34 95,28 C115,22 135,32 155,26 C175,20 195,30 215,30" />
    <path d="M265,30 C285,30 305,20 325,26 C345,32 365,22 385,28 C405,34 425,24 445,30" />
  </svg>
);

/* ─────────────── Dinner Table Illustration ─────────────── */
const DinnerTableIllustration = () => (
  <svg viewBox="0 0 340 200" className="w-64 mx-auto" stroke="#223348" strokeWidth="1.2" fill="none">
    <ellipse cx="170" cy="110" rx="120" ry="40" />
    <path d="M50,110 Q80,155 115,160 Q170,170 225,160 Q260,155 290,110" />
    <rect x="110" y="65" width="8" height="35" />
    <rect x="162" y="55" width="8" height="45" />
    <rect x="220" y="65" width="8" height="35" />
    <path d="M111,63 Q114,55 117,63" strokeWidth="0.8" opacity="0.7" />
    <path d="M163,53 Q166,45 169,53" strokeWidth="0.8" opacity="0.7" />
    <path d="M221,63 Q224,55 227,63" strokeWidth="0.8" opacity="0.7" />
    <line x1="107" y1="100" x2="121" y2="100" />
    <line x1="159" y1="100" x2="173" y2="100" />
    <line x1="217" y1="100" x2="231" y2="100" />
    <path d="M155,80 Q170,65 185,80" strokeWidth="1.4" />
    <line x1="170" y1="80" x2="170" y2="105" />
    <ellipse cx="170" cy="107" rx="14" ry="6" />
    <ellipse cx="115" cy="118" rx="20" ry="7" />
    <ellipse cx="170" cy="125" rx="20" ry="7" />
    <ellipse cx="225" cy="118" rx="20" ry="7" />
    <path d="M95,100 Q100,112 105,116 L90,116 Q95,112 100,100" />
    <line x1="97.5" y1="116" x2="97.5" y2="125" />
    <line x1="92" y1="125" x2="103" y2="125" />
    <path d="M240,100 Q245,112 250,116 L235,116 Q240,112 245,100" />
    <line x1="242.5" y1="116" x2="242.5" y2="125" />
    <line x1="237" y1="125" x2="248" y2="125" />
    <path d="M50,105 Q40,90 50,80 L65,80 L65,105" />
    <line x1="42" y1="80" x2="42" y2="105" />
    <path d="M290,105 Q300,90 290,80 L275,80 L275,105" />
    <line x1="298" y1="80" x2="298" y2="105" />
  </svg>
);

/* ─────────────── Dress Code Figures Illustration ─────────────── */
const DressCodeFigures = () => (
  <svg viewBox="0 0 400 180" className="w-full max-w-sm mx-auto" stroke="#223348" strokeWidth="1.3" fill="none">
    {/* Figure 1 - Man in tux */}
    <circle cx="50" cy="35" r="12" />
    <path d="M38,47 L38,100 M62,47 L62,100" />
    <path d="M38,100 L32,140 M62,100 L68,140" />
    <path d="M38,60 L22,80 M62,60 L75,74" />
    <path d="M40,47 Q50,52 60,47 L64,75 L36,75 Z" fill="#223348" opacity="0.2" />
    {/* Figure 2 - Woman, green dress */}
    <circle cx="115" cy="32" r="11" />
    <path d="M104,43 Q115,50 126,43 L135,90 Q115,100 95,90 Z" fill="#223348" opacity="0.15" />
    <path d="M115,100 L108,140 M115,100 L122,140" />
    <path d="M104,55 L92,72 M126,55 L140,68" />
    {/* Figure 3 - Man, center */}
    <circle cx="190" cy="28" r="12" />
    <path d="M178,40 L178,95 M202,40 L202,95" />
    <path d="M178,95 L172,140 M202,95 L208,140" />
    <path d="M178,55 L162,70 M202,55 L218,62" />
    <path d="M180,40 Q190,46 200,40 L204,72 L176,72 Z" fill="#223348" opacity="0.2" />
    {/* Figure 4 - Woman, red dress */}
    <circle cx="265" cy="30" r="11" />
    <path d="M254,41 Q265,48 276,41 L284,92 Q265,102 246,92 Z" fill="#223348" opacity="0.2" />
    <path d="M265,102 L258,140 M265,102 L274,140" />
    <path d="M254,53 L240,38 M276,53 L290,72" />
    {/* Figure 5 - Woman, gold dress */}
    <circle cx="340" cy="35" r="11" />
    <path d="M329,46 Q340,53 351,46 L358,92 Q340,102 322,92 Z" fill="#223348" opacity="0.12" />
    <path d="M340,102 L334,140 M340,102 L348,140" />
    <path d="M329,56 L316,70 M351,56 L365,68" />
  </svg>
);

/* ─────────────── Wedding Car Illustration ─────────────── */
const WeddingCarIllustration = () => (
  <svg viewBox="0 0 300 160" className="w-64 mx-auto" stroke="#223348" strokeWidth="1.3" fill="none">
    <path d="M30,100 L30,70 Q50,40 100,35 L200,35 Q250,40 270,70 L270,100 Z" />
    <path d="M80,35 Q100,15 140,12 Q180,10 220,35" />
    <path d="M90,35 L85,70 L145,70 L145,35" />
    <path d="M155,35 L155,70 L215,70 L210,35" />
    <circle cx="80" cy="105" r="22" />
    <circle cx="80" cy="105" r="12" />
    <circle cx="220" cy="105" r="22" />
    <circle cx="220" cy="105" r="12" />
    <path d="M25,90 L15,90 L15,100 L25,100" />
    <path d="M275,90 L285,90 L285,100 L275,100" />
    <ellipse cx="268" cy="80" rx="6" ry="10" />
    <line x1="280" y1="100" x2="280" y2="140" />
    <line x1="285" y1="100" x2="290" y2="145" />
    <line x1="275" y1="100" x2="270" y2="142" />
    <rect x="275" y="140" width="10" height="12" rx="2" />
    <rect x="285" y="144" width="10" height="12" rx="2" />
    <rect x="264" y="141" width="10" height="12" rx="2" />
    <rect x="220" y="92" width="55" height="18" rx="3" />
    <text x="247" y="105" textAnchor="middle" fontSize="7" fontFamily="serif" stroke="none" fill="#223348">Just Married</text>
    <circle cx="120" cy="28" r="6" fill="#223348" opacity="0.2" />
    <circle cx="140" cy="22" r="5" fill="#223348" opacity="0.2" />
    <circle cx="160" cy="25" r="6" fill="#223348" opacity="0.2" />
    <circle cx="180" cy="22" r="5" fill="#223348" opacity="0.2" />
    <line x1="120" y1="28" x2="120" y2="35" strokeWidth="0.8" />
    <line x1="140" y1="22" x2="140" y2="35" strokeWidth="0.8" />
    <line x1="160" y1="25" x2="160" y2="35" strokeWidth="0.8" />
    <line x1="180" y1="22" x2="180" y2="35" strokeWidth="0.8" />
  </svg>
);

/* ─────────────── Thank You Card (deckled edge) ─────────────── */
const ThankYouCard = () => (
  <div className="relative w-full max-w-md mx-auto" style={{ aspectRatio: '1 / 1' }}>
    <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      <defs>
        <mask id="deckle-mask">
          <path d="
            M20,20
            L380,20
            L380,380
            L20,380
            Z
          " fill="white" />
        </mask>
        <filter id="deckle">
          <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="5" seed="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <rect
        x="20" y="20"
        width="360" height="360"
        fill="white"
        filter="url(#deckle)"
        rx="6"
      />
      <rect
        x="20" y="20"
        width="360" height="360"
        fill="none"
        stroke="#223348"
        strokeWidth="28"
        filter="url(#deckle)"
        rx="6"
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-12">
      <h2 className="font-script text-5xl text-brand-red-dark mb-4">Thank You</h2>
      <p className="font-serif text-sm text-brand-red-dark/80 leading-relaxed mb-6">
        For joining us on this special day.<br />Your presence is the best gift we could receive.
      </p>
      <p className="font-script text-3xl text-brand-red-dark">Sam &amp; Sofia</p>
    </div>
  </div>
);

/* ─────────────── Section wrapper ─────────────── */
/* Apple-style stagger container */
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const Section = ({ children, className = '', dark = false }: { children: React.ReactNode; className?: string; dark?: boolean }) => (
  <motion.section
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
    className={`w-full py-24 px-6 flex flex-col items-center text-center ${dark ? 'bg-[#EDEAE6]' : 'bg-[#F4EDE4]'} ${className}`}
  >
    {children}
  </motion.section>
);

/* ─────────────── Main Page ─────────────── */
export default function Index() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpChoice, setRsvpChoice] = useState<'yes' | 'no' | null>(null);
  const [eventChoice, setEventChoice] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const fadeInAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio.play().then(() => {
      setIsPlaying(true);
      let vol = 0;
      const step = 0.4 / (3000 / 50); // reach 0.4 over 3s
      const iv = setInterval(() => {
        vol = Math.min(vol + step, 0.4);
        audio.volume = vol;
        if (vol >= 0.4) clearInterval(iv);
      }, 50);
    }).catch(() => {});
  }, []);

  const handleCurtainOpen = useCallback(() => {
    setTimeout(fadeInAudio, 3000);
  }, [fadeInAudio]);

  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = 0.4;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  return (
    <div className="relative min-h-screen bg-[#F4EDE4] text-brand-dark overflow-hidden font-sans">
      <FlockingBirds />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full p-6 flex items-center justify-between z-[110] pointer-events-none">
        <div />

        <button className="w-10 h-10 bg-white/70 backdrop-blur-md rounded-full shadow-sm flex items-center justify-center pointer-events-auto border border-brand-accent/10">
          <Info size={16} className="text-brand-red-dark" />
        </button>
      </header>

      <audio ref={audioRef} id="bg-music" loop preload="auto">
        <source src="/wedding-music.mp3" type="audio/mpeg" />
      </audio>

      <CurtainReveal onOpen={handleCurtainOpen}>
        {/* ── SECTION 1: HERO INVITATION ── */}
        <Section className="!min-h-screen !justify-center !py-[80px] !px-6">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            {/* Line 1 */}
            <p className="font-dm-sans text-[12px] sm:text-[13px] uppercase tracking-[0.35em] text-[#C97B5A]">
              With Joy &amp; Love, We Invite You to Celebrate
            </p>

            {/* Gold divider with diamond — 100px each side */}
            <div className="flex items-center gap-3 mt-6" style={{ width: '260px' }}>
              <div style={{ width: '120px', height: '1px', background: 'rgba(34,51,72,0.25)' }} />
              <div className="w-2.5 h-2.5 rotate-45 border border-brand-red-dark/30" />
              <div style={{ width: '120px', height: '1px', background: 'rgba(34,51,72,0.25)' }} />
            </div>

            {/* Names */}
            <div className="flex flex-col items-center -space-y-2 sm:-space-y-4 mt-8">
              <h1 className="font-script text-[64px] sm:text-[100px]" style={{ color: '#AB8A3B', lineHeight: 1.05 }}><NameLetterStagger name="Nikila" /></h1>
              <span className="font-script text-3xl sm:text-4xl" style={{ color: '#AB8A3B', opacity: 0.5 }}>&amp;</span>
              <h1 className="font-script text-[64px] sm:text-[100px]" style={{ color: '#AB8A3B', lineHeight: 1.05 }}><NameLetterStagger name="Sarthak" /></h1>
            </div>

            {/* Lotus motif — 5 petals */}
            <svg width="36" height="22" viewBox="0 0 32 20" fill="none" className="mt-6">
              <path d="M16 0C16 0 13 4 13 8C13 10 14.5 12 16 12C17.5 12 19 10 19 8C19 4 16 0 16 0Z" fill="#AB8A3B" opacity="0.9" />
              <path d="M10 4C10 4 7 8 8 11C8.5 13 10.5 13.5 12 12C13.5 10.5 13 7 10 4Z" fill="#AB8A3B" opacity="0.6" />
              <path d="M22 4C22 4 25 8 24 11C23.5 13 21.5 13.5 20 12C18.5 10.5 19 7 22 4Z" fill="#AB8A3B" opacity="0.6" />
              <path d="M6 8C6 8 3 11 4 14C4.5 15.5 7 16 9 14C11 12 9 9 6 8Z" fill="#AB8A3B" opacity="0.35" />
              <path d="M26 8C26 8 29 11 28 14C27.5 15.5 25 16 23 14C21 12 23 9 26 8Z" fill="#AB8A3B" opacity="0.35" />
            </svg>

            {/* Request text */}
            <p className="font-serif text-[14px] tracking-[0.3em] uppercase text-brand-red-dark/60 mt-5">
              Request the honour of your presence
            </p>

            {/* Date */}
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 500, color: '#223348', letterSpacing: '0.25em', marginTop: '32px' }}>
              29 · 11 · 2026
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '15px', color: '#7397A8', marginTop: '8px' }}>
              8:30 AM · Salem, Tamil Nadu
            </p>

            {/* Venue in hero */}
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', color: '#223348', marginTop: '20px', fontWeight: 300 }}>Sri Krishna Mahal Mantapa</h3>

            {/* Divider */}
            <div className="flex items-center gap-3 mt-8" style={{ width: '260px' }}>
              <div style={{ width: '120px', height: '1px', background: 'rgba(34,51,72,0.25)' }} />
              <div className="w-2.5 h-2.5 rotate-45 border border-brand-red-dark/30" />
              <div style={{ width: '120px', height: '1px', background: 'rgba(34,51,72,0.25)' }} />
            </div>

            <style>{`
              @keyframes scrollPulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.4; }
              }
            `}</style>
            <div className="flex flex-col items-center mt-8" style={{ animation: 'scrollPulse 2s ease-in-out infinite' }}>
              <span className="font-serif text-[10px] tracking-[0.3em] uppercase" style={{ color: '#AB8A3B' }}>Scroll</span>
              <span style={{ color: '#AB8A3B', fontSize: '20px' }}>↓</span>
            </div>
          </div>
        </Section>

        {/* ── SECTION 2: ILLUSTRATION + COUNTDOWN ── */}
        <Section className="!pt-0 !-mt-20">
          <div className="max-w-3xl mx-auto flex flex-col items-center space-y-12">
            <CoupleParallax>
              <img
                src={coupleIllustration}
                alt="Couple illustration"
                className="w-full max-w-lg mx-auto mix-blend-multiply"
                loading="lazy"
              />
            </CoupleParallax>
            <div>
              <Countdown />
            </div>
            <p className="font-serif italic text-brand-red-dark/50 text-sm">until the big day</p>
          </div>
        </Section>

        {/* ── REMAINING SECTIONS ── */}
        <>
              {/* ── SECTION 3: WEDDING SHLOKAS ── */}
              <WeddingShlokas />

              {/* ── SECTION 4: WEDDING TIMELINE ── */}
              <WeddingTimeline />

              <Section className="!bg-[#F6F0E6]">
                <motion.div
                  className="max-w-3xl mx-auto flex flex-col items-center space-y-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                >
                  <motion.p variants={staggerItem} className="font-serif text-[10px] tracking-[0.25em] uppercase" style={{ color: '#C97B5A' }}>The sacred ceremony will take place at</motion.p>
                  <motion.div variants={staggerItem}>
                    <VenueIllustration />
                  </motion.div>
                  <motion.h3 variants={staggerItem} className="font-script text-4xl sm:text-5xl" style={{ color: '#223348' }}>Sri Krishna Mahal Mantapa</motion.h3>
                  <motion.p variants={staggerItem} className="font-serif text-[10px] tracking-[0.2em] uppercase" style={{ color: '#7397A8' }}>
                    Salem, Tamil Nadu
                  </motion.p>
                  <motion.p variants={staggerItem} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '13px', color: '#223348', margin: 0 }}>
                    29th November 2026 · 8:30 AM
                  </motion.p>
                  <motion.a
                    variants={staggerItem}
                    href="https://maps.google.com/?q=Sri+Krishna+Mahal+Mantapa+Salem+Tamil+Nadu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 mt-4 px-6 py-3 rounded-none transition-all duration-300"
                    style={{ border: '1px solid #AB8A3B', background: 'transparent' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg className="w-4 h-4 transition-colors" style={{ color: '#AB8A3B' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    <span className="font-serif text-[10px] tracking-[0.25em] uppercase" style={{ color: '#AB8A3B' }}>
                      View on Maps
                    </span>
                  </motion.a>

                  {/* Divider */}
                  <motion.div variants={staggerItem} className="flex items-center gap-3 w-full max-w-[140px] pt-8">
                    <div className="flex-1 h-px bg-brand-red-dark/20" />
                    <div className="w-1.5 h-1.5 rotate-45 border border-brand-red-dark/25" />
                    <div className="flex-1 h-px bg-brand-red-dark/20" />
                  </motion.div>
                </motion.div>
              </Section>

              {/* ── SECTION 5B: RECEPTION VENUE ── */}
              <Section className="!bg-[#F6F0E6]">
                <motion.div
                  className="max-w-3xl mx-auto flex flex-col items-center space-y-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                >
                  <motion.p variants={staggerItem} className="font-serif text-[10px] tracking-[0.25em] uppercase" style={{ color: '#C97B5A' }}>The wedding reception</motion.p>
                  <motion.img
                    variants={staggerItem}
                    src={receptionVenueIllustration}
                    alt="Reception venue illustration"
                    className="w-full max-w-md mx-auto mix-blend-multiply"
                    loading="lazy"
                  />
                  <h3 className="font-script text-4xl sm:text-5xl" style={{ color: '#223348' }}>Reception Celebration</h3>
                  <p className="font-serif text-[10px] tracking-[0.2em] uppercase" style={{ color: '#7397A8' }}>
                    Jabalpur, Madhya Pradesh
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '13px', color: '#223348', margin: 0 }}>
                    6th December 2026 · 7:00 PM onwards
                  </p>
                  <a
                    href="https://maps.google.com/?q=Jabalpur+Madhya+Pradesh+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 mt-4 px-6 py-3 rounded-none transition-all duration-300"
                    style={{ border: '1px solid #AB8A3B', background: 'transparent' }}
                  >
                    <svg className="w-4 h-4 transition-colors" style={{ color: '#AB8A3B' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    <span className="font-serif text-[10px] tracking-[0.25em] uppercase" style={{ color: '#AB8A3B' }}>
                      View on Maps
                    </span>
                  </a>
                </div>
              </Section>

              {/* ── SECTION 5: DRESS CODE ── */}
              <Section>
                <div className="max-w-2xl mx-auto space-y-6">
                  <h2 className="font-script text-6xl sm:text-7xl text-brand-red-dark">Dress Code</h2>
                  <DressCodeFigures />
                  <p className="font-serif text-sm text-brand-red-dark/70 max-w-md mx-auto leading-relaxed">
                    We invite you to dress elegantly and formally to celebrate this special day with us.
                  </p>
                  <h3 className="font-serif text-4xl sm:text-5xl text-brand-red-dark pt-2">Formal Attire</h3>
                  <p className="font-script text-3xl text-brand-red-dark/60 italic">Please avoid wearing white</p>
                </div>
              </Section>

              {/* ── SECTION 6: GIFTS ── */}
              <Section dark>
                <div className="max-w-lg mx-auto space-y-6">
                  <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-brand-red-dark/60">Wedding Registry</p>
                  <WeddingCarIllustration />
                  <h2 className="font-serif text-5xl sm:text-6xl text-brand-red-dark">Gifts</h2>
                  <p className="font-serif text-sm text-brand-red-dark/70 max-w-md mx-auto leading-relaxed">
                    Your presence is the best gift we could receive. However, if you wish to contribute to our new life together, you can do so via bank transfer.
                  </p>
                  <p className="font-script text-3xl text-brand-red-dark italic pt-2">With all our love</p>

                  <div className="pt-4 space-y-3">
                    <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-brand-red-dark/60">Bank Details</p>
                    <div className="border border-brand-red-dark/30 rounded-sm px-8 py-6 text-left space-y-2">
                      <p className="font-serif text-xs text-brand-red-dark tracking-widest uppercase">Account Holder: Sam &amp; Sofia</p>
                      <p className="font-serif text-xs text-brand-red-dark tracking-wider">IBAN: IT60 X054 2811 1010 0000 0123 456</p>
                      <p className="font-serif text-xs text-brand-red-dark tracking-wider">BIC/SWIFT: BLOPIT22</p>
                    </div>
                  </div>
                </div>
              </Section>

              {/* ── SECTION 7: TRANSPORT ── */}
              <Section>
                <div className="max-w-lg mx-auto space-y-6">
                  <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-brand-red-dark/60">Getting There</p>
                  <h2 className="font-serif text-5xl sm:text-6xl text-brand-red-dark">Transport</h2>
                  <div className="space-y-4 text-sm text-brand-red-dark/80 font-serif">
                    <p>A private bus will be available for guests departing from <strong>Piazza della Signoria, Florence</strong>.</p>
                    <div className="border-t border-brand-red-dark/15 pt-4 space-y-2">
                      <p className="font-serif text-[10px] tracking-widest uppercase text-brand-red-dark/50">Departure</p>
                      <p>Saturday, September 10 · <span className="font-semibold">2:30 PM</span></p>
                    </div>
                    <div className="border-t border-brand-red-dark/15 pt-4 space-y-2">
                      <p className="font-serif text-[10px] tracking-widest uppercase text-brand-red-dark/50">Return</p>
                      <p>Saturday, September 10 · <span className="font-semibold">1:00 AM</span></p>
                    </div>
                  </div>
                  <p className="font-serif italic text-brand-red-dark/50 text-xs pt-4">
                    Please indicate in your RSVP if you need transport.
                  </p>
                </div>
              </Section>

              {/* ── SECTION 8: RSVP ── */}
              <Section className="!bg-[#F6F0E6]">
                <div className="max-w-xl w-full mx-auto space-y-8">

                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', color: '#223348', fontWeight: 400 }}>Join Us in Celebration</h2>

                  <div style={{ background: '#FFFDF9', border: '1px solid rgba(171,138,59,0.15)', borderRadius: '2px', padding: '32px', width: '100%', textAlign: 'left' }} className="space-y-6">
                    <div className="space-y-1">
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.3em', color: '#C97B5A', textTransform: 'uppercase', display: 'block' }}>Full Name *</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full rounded-none bg-transparent px-4 py-3 font-serif text-sm placeholder:opacity-30 focus:outline-none"
                        style={{ border: '1px solid rgba(171,138,59,0.4)', color: '#223348' }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#AB8A3B'}
                        onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(171,138,59,0.4)'}
                      />
                    </div>
                    <div className="space-y-1">
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.3em', color: '#C97B5A', textTransform: 'uppercase', display: 'block' }}>Email *</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full rounded-none bg-transparent px-4 py-3 font-serif text-sm placeholder:opacity-30 focus:outline-none"
                        style={{ border: '1px solid rgba(171,138,59,0.4)', color: '#223348' }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#AB8A3B'}
                        onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(171,138,59,0.4)'}
                      />
                    </div>

                    {/* Event selection */}
                    <div className="space-y-3">
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.3em', color: '#C97B5A', textTransform: 'uppercase', display: 'block' }}>Which event will you attend? *</label>
                      <div className="flex flex-col gap-2">
                        {[
                          { value: 'salem', label: 'Salem Wedding — 29th Nov 2026' },
                          { value: 'jabalpur', label: 'Jabalpur Reception — 6th Dec 2026' },
                          { value: 'both', label: 'Both Celebrations' },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => setEventChoice(opt.value)}
                            className="w-full py-3 px-4 rounded-none font-serif text-sm transition-all text-left"
                            style={{
                              border: `1px solid ${eventChoice === opt.value ? '#223348' : 'rgba(171,138,59,0.4)'}`,
                              background: eventChoice === opt.value ? '#223348' : 'transparent',
                              color: eventChoice === opt.value ? '#F6F0E6' : '#223348',
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.3em', color: '#C97B5A', textTransform: 'uppercase', display: 'block' }}>Will you attend? *</label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setRsvpChoice('yes')}
                          className="flex-1 py-3 rounded-none font-serif text-sm transition-all"
                          style={{
                            border: '1px solid #223348',
                            background: rsvpChoice === 'yes' ? '#223348' : 'transparent',
                            color: rsvpChoice === 'yes' ? '#F6F0E6' : '#223348',
                          }}
                        >
                          Yes, I'll be there!
                        </button>
                        <button
                          onClick={() => setRsvpChoice('no')}
                          className="flex-1 py-3 rounded-none font-serif text-sm transition-all"
                          style={{
                            border: '1px solid #223348',
                            background: rsvpChoice === 'no' ? '#223348' : 'transparent',
                            color: rsvpChoice === 'no' ? '#F6F0E6' : '#223348',
                          }}
                        >
                          No, I can't make it
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.3em', color: '#C97B5A', textTransform: 'uppercase', display: 'block' }}>Message For The Couple (Optional)</label>
                      <textarea
                        placeholder="Write us a few words..."
                        rows={4}
                        className="w-full rounded-none bg-transparent px-4 py-3 font-serif text-sm placeholder:opacity-30 focus:outline-none resize-none"
                        style={{ border: '1px solid rgba(171,138,59,0.4)', color: '#223348' }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#AB8A3B'}
                        onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(171,138,59,0.4)'}
                      />
                    </div>
                    <button
                      className="w-full py-4 font-serif text-sm uppercase transition-colors flex items-center justify-center gap-3"
                      style={{ background: '#223348', color: '#F6F0E6', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.2em' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                      Confirm
                    </button>
                  </div>

                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', fontStyle: 'italic', color: '#7397A8' }}>
                    We can't wait to celebrate with you
                  </p>
                </div>
              </Section>

              {/* ── SECTION 9: FOOTER – THANK YOU CARD ── */}
              <section className="w-full py-24 px-8 flex flex-col items-center bg-[#F4EDE4]">
                <div className="max-w-md w-full">
                  <ThankYouCard />
                </div>
              </section>

              {/* ── FOOTER ── */}
              <footer style={{ background: '#223348', padding: '80px 24px 48px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
                {/* Om */}
                <span style={{ fontFamily: "'Tiro Devanagari Sanskrit', serif", fontSize: '24px', color: '#AB8A3B' }}>ॐ</span>

                {/* Names */}
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '52px', color: '#F6F0E6', margin: 0, lineHeight: 1.2 }}>
                  Nikila &amp; Sarthak
                </h2>

                {/* Gold divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '60px', height: '1px', background: '#AB8A3B' }} />
                  <div style={{ width: '6px', height: '6px', background: '#AB8A3B', transform: 'rotate(45deg)' }} />
                  <div style={{ width: '60px', height: '1px', background: '#AB8A3B' }} />
                </div>

                {/* Dates */}
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '12px', letterSpacing: '0.3em', color: '#7397A8', lineHeight: 2.2 }}>
                  <p style={{ margin: 0 }}>29 · 11 · 2026 — Salem, Tamil Nadu</p>
                  <p style={{ margin: 0 }}>06 · 12 · 2026 — Jabalpur, Madhya Pradesh</p>
                </div>

                {/* Blessing */}
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', fontStyle: 'italic', color: 'rgba(246,240,230,0.5)', maxWidth: '480px', lineHeight: 1.8, margin: 0 }}>
                  "May your home be filled with laughter, your hearts with love"
                </p>

                {/* Hashtag */}
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '13px', letterSpacing: '0.2em', color: '#AB8A3B', margin: 0 }}>
                  #NikilaWedsSarthak
                </p>

                {/* Crafted line */}
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '10px', color: 'rgba(246,240,230,0.2)', margin: '24px 0 0' }}>
                  Crafted with love · 2026
                </p>

                {/* shaadi.digital */}
                <a
                  href="https://shaadi.digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(246,240,230,0.35)', textDecoration: 'none', marginTop: '8px', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#AB8A3B')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(246,240,230,0.35)')}
                >
                  made with love by shaadi.digital
                </a>
              </footer>
        </>

        {/* Floating Speaker Toggle */}
        <button
          onClick={toggleAudio}
          className="fixed bottom-6 right-6 flex items-center justify-center z-[60] transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(244,237,228,0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(171,138,59,0.2)',
            cursor: 'pointer',
          }}
        >
          <span className="sr-only">Toggle Sound</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#AB8A3B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="none" />
            {isPlaying ? (
              <>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </>
            ) : (
              <>
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </>
            )}
          </svg>
        </button>
      </CurtainReveal>
    </div>
  );
}