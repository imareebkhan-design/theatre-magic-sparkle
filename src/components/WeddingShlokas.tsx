import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/contexts/LanguageContext';

const shlokas = [
  {
    ref: "RIGVEDA · X.85.47",
    script: {
      en: "समानो मन्त्रः समिति: समानी\nसमानं मनः सह चित्तमेषाम्",
      ta: "சமானோ மந்த்ர: சமிதி: சமானீ\nசமானம் மன: சஹ சித்தமேஷாம்",
      hi: "समानो मन्त्रः समिति: समानी\nसमानं मनः सह चित्तमेषाम्",
    },
    translation: {
      en: '"May we share the same thoughts, the same purpose, the same heart."',
      ta: '"நாம் ஒரே எண்ணங்களையும், ஒரே நோக்கத்தையும், ஒரே இதயத்தையும் பகிர்ந்து கொள்வோம்."',
      hi: '"हम एक ही विचार, एक ही उद्देश्य, एक ही हृदय साझा करें।"',
    },
    scriptFont: (lang: Language) => lang === 'ta' ? "'Noto Sans Tamil', sans-serif" : "'Tiro Devanagari Sanskrit', serif",
    scriptSize: (lang: Language) => lang === 'ta' ? '32px' : '42px',
  },
  {
    ref: "ATHARVAVEDA · XIV.1",
    script: {
      en: "त्वं मम, अहं तव\nआवां उभौ एकमेव",
      ta: "த்வம் மம, அஹம் தவ\nஆவாம் உபௌ ஏகமேவ",
      hi: "त्वं मम, अहं तव\nआवां उभौ एकमेव",
    },
    translation: {
      en: '"You are mine, I am yours — we are one soul in two bodies."',
      ta: '"நீ என்னுடையவள், நான் உன்னுடையவன் — இரு உடல்களில் ஒரே ஆத்மா."',
      hi: '"तुम मेरी हो, मैं तुम्हारा — दो शरीरों में एक आत्मा।"',
    },
    scriptFont: (lang: Language) => lang === 'ta' ? "'Noto Sans Tamil', sans-serif" : "'Tiro Devanagari Sanskrit', serif",
    scriptSize: (lang: Language) => lang === 'ta' ? '32px' : '42px',
  },
  {
    ref: "THIRUKKURAL · 1121",
    script: {
      en: "அறிதோறும் அறியாமை கண்டற்றால்\nகாமம் காமவர் நட்பு",
      ta: "அறிதோறும் அறியாமை கண்டற்றால்\nகாமம் காமவர் நட்பு",
      hi: "जानने पर भी अनजाना लगे\nप्रेम प्रेमियों की मित्रता",
    },
    translation: {
      en: '"To know you more is to discover I still don\'t know you enough."',
      ta: '"உன்னை அறிய அறிய, உன்னை இன்னும் அறியவில்லை என்பதை உணர்கிறேன்."',
      hi: '"तुम्हें जानना यह जानना है कि मैं अभी भी तुम्हें पूरी तरह नहीं जानता।"',
    },
    scriptFont: (lang: Language) => lang === 'hi' ? "'Tiro Devanagari Sanskrit', serif" : "'Noto Sans Tamil', sans-serif",
    scriptSize: (lang: Language) => lang === 'hi' ? '42px' : '32px',
  },
];

const Divider = () => (
  <div style={{
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', gap: '12px',
    margin: '64px auto',
  }}>
    <div style={{ width: '60px', height: '1px', background: 'rgba(171,138,59,0.4)' }} />
    <div style={{ width: '6px', height: '6px', background: '#AB8A3B', transform: 'rotate(45deg)' }} />
    <div style={{ width: '60px', height: '1px', background: 'rgba(171,138,59,0.4)' }} />
  </div>
);

export default function WeddingShlokas() {
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shimmerRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.15 });

    const shimmerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('playing');
          setTimeout(() => {
            (entry.target as HTMLElement).classList.remove('playing');
          }, 2500);
          shimmerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    blockRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    shimmerRefs.current.forEach((ref) => { if (ref) shimmerObserver.observe(ref); });

    return () => {
      observer.disconnect();
      shimmerObserver.disconnect();
    };
  }, []);

  return (
    <section style={{
      background: '#F6F0E6',
      padding: '80px 24px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes omPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.03; }
          50% { transform: translate(-50%, -50%) scale(1.06); opacity: 0.055; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shloka-shimmer {
          background: linear-gradient(90deg, #223348 30%, #AB8A3B 50%, #223348 70%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .shloka-shimmer.playing {
          animation: shimmer 2.5s linear 1;
        }
      `}</style>

      {/* Background Om watermark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        fontSize: '400px',
        color: 'rgba(34,51,72,0.04)',
        fontFamily: "'Tiro Devanagari Sanskrit', serif",
        pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
        animation: 'omPulse 5s ease-in-out infinite',
      }}>ॐ</div>

      <Divider />

      {shlokas.map((s, i) => (
        <div key={i}>
          <div
            ref={(el) => (blockRefs.current[i] = el)}
            style={{
              maxWidth: '760px',
              margin: '0 auto',
              padding: '0 24px',
              opacity: 0,
              transform: 'translateY(24px)',
              transition: `opacity 1s ease, transform 1s ease`,
            }}
          >
            {/* Large script */}
            <p
              ref={(el) => (shimmerRefs.current[i] = el)}
              className="shloka-shimmer"
              style={{
                fontFamily: s.scriptFont(language),
                fontSize: `clamp(24px, 6vw, ${s.scriptSize(language)})`,
                lineHeight: 1.7,
                margin: '0 0 32px',
                whiteSpace: 'pre-line',
                letterSpacing: '0.02em',
              }}
            >
              {s.script[language]}
            </p>

            {/* Translation */}
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '20px',
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#53694D',
              lineHeight: 1.9,
              margin: '0 0 24px',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              {s.translation[language]}
            </p>

            {/* Source */}
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#AB8A3B',
            }}>
              — {s.ref}
            </p>
          </div>

          <Divider />
        </div>
      ))}
    </section>
  );
}
