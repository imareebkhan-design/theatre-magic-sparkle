import { useEffect, useRef } from 'react';

const shlokas = [
  {
    ref: "RIGVEDA · X.85.47",
    script: "समानो मन्त्रः समिति: समानी\nसमानं मनः सह चित्तमेषाम्",
    english: '"May we share the same thoughts, the same purpose, the same heart."',
    isDevanagari: true,
  },
  {
    ref: "ATHARVAVEDA · XIV.1",
    script: "त्वं मम, अहं तव\nआवां उभौ एकमेव",
    english: '"You are mine, I am yours — we are one soul in two bodies."',
    isDevanagari: true,
  },
  {
    ref: "THIRUKKURAL · 1121",
    script: "அறிதோறும் அறியாமை கண்டற்றால்\nகாமம் காமவர் நட்பு",
    english: '"To know you more is to discover I still don\'t know you enough."',
    isDevanagari: false,
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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.15 });

    blockRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{
      background: '#F6F0E6',
      padding: '80px 24px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Om watermark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '400px',
        color: 'rgba(34,51,72,0.04)',
        fontFamily: "'Tiro Devanagari Sanskrit', serif",
        pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
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
            <p style={{
              fontFamily: s.isDevanagari
                ? "'Tiro Devanagari Sanskrit', serif"
                : "'Noto Sans Tamil', sans-serif",
              fontSize: s.isDevanagari ? '42px' : '32px',
              color: '#223348',
              lineHeight: 1.7,
              margin: '0 0 40px',
              whiteSpace: 'pre-line',
              letterSpacing: '0.02em',
            }}>
              {s.script}
            </p>

            {/* English translation */}
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
              {s.english}
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
