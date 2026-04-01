import { useEffect, useRef } from 'react';

const shlokas = [
  {
    ref: "Rigveda · X.85.47",
    source: "Rigveda — The oldest wedding hymn",
    sanskrit: ["समानो मन्त्रः समिति: समानी", "समानं मनः सह चित्तमेषाम्"],
    tamil: ["ஒரே மனம், ஒரே எண்ணம்", "இருவரும் ஒன்றாய் வாழட்டும்"],
    english: ["May we share the same thoughts,", "the same purpose, the same heart"],
    highlight: "the same heart",
  },
  {
    ref: "Atharvaveda · XIV.1",
    source: "Atharvaveda — Vivah Sukta",
    sanskrit: ["त्वं मम, अहं तव", "आवां उभौ एकमेव"],
    tamil: ["நீ என்னுடையவள், நான் உன்னுடையவன்", "நாம் இருவரும் ஒரே ஆன்மா"],
    english: ["You are mine, I am yours —", "we are one soul in two bodies"],
    highlight: "we are one soul",
  },
  {
    ref: "Thirukkural · 1121",
    source: "Thiruvalluvar — Book of Love",
    sanskrit: ["அறிதோறும் அறியாமை கண்டற்றால்", "காமம் காமவர் நட்பு"],
    tamil: ["திருவள்ளுவர் எழுதிய காதல் குறள்"],
    english: ["To know you more is to discover", "I still don't know you enough"],
    highlight: "I still don't know you enough",
    isTamil: true,
  },
];

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
    }, { threshold: 0.2 });

    blockRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section style={{
      background: '#223348',
      padding: '100px 24px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Background Om */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '320px', color: 'rgba(171,138,59,0.04)',
        fontFamily: "'Tiro Devanagari Sanskrit', serif",
        pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
      }}>ॐ</div>

      {/* Header */}
      <p style={{ fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#AB8A3B', marginBottom: '12px' }}>
        Hindu Scriptures
      </p>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(246,240,230,0.5)', marginBottom: '80px', letterSpacing: '0.1em' }}>
        Words written for them, long before they met
      </p>

      {/* Shlokas */}
      {shlokas.map((s, i) => (
        <div
          key={i}
          ref={(el) => (blockRefs.current[i] = el)}
          style={{
            maxWidth: '680px', margin: '0 auto 80px',
            padding: '0 16px',
            opacity: 0,
            transform: 'translateY(30px)',
            transition: `opacity 0.9s ease ${i * 0.1}s, transform 0.9s ease ${i * 0.1}s`,
          }}
        >
          {/* Ref */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '1px', background: 'rgba(171,138,59,0.4)' }} />
            <span style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#AB8A3B', textTransform: 'uppercase' }}>{s.ref}</span>
            <div style={{ width: '40px', height: '1px', background: 'rgba(171,138,59,0.4)' }} />
          </div>

          {/* Sanskrit / Tamil verse */}
          <p style={{
            fontFamily: s.isTamil ? "'Noto Sans Tamil', sans-serif" : "'Tiro Devanagari Sanskrit', serif",
            fontSize: s.isTamil ? '22px' : '28px',
            color: s.isTamil ? '#C97B5A' : '#F6F0E6',
            lineHeight: 1.8, marginBottom: '12px', letterSpacing: '0.02em',
          }}>
            {s.sanskrit.map((line, j) => (<span key={j}>{line}{j < s.sanskrit.length - 1 && <br />}</span>))}
          </p>

          {/* Source */}
          <p style={{ fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#AB8A3B', marginBottom: '16px' }}>
            {s.source}
          </p>

          {/* Tamil */}
          <p style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: '15px', fontWeight: 300, color: '#7397A8', lineHeight: 1.9, marginBottom: '20px' }}>
            {s.tamil.map((line, j) => (<span key={j}>{line}{j < s.tamil.length - 1 && <br />}</span>))}
          </p>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '32px', height: '1px', background: 'rgba(171,138,59,0.3)' }} />
            <div style={{ width: '4px', height: '4px', background: '#AB8A3B', transform: 'rotate(45deg)' }} />
            <div style={{ width: '32px', height: '1px', background: 'rgba(171,138,59,0.3)' }} />
          </div>

          {/* English */}
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(246,240,230,0.7)', lineHeight: 2 }}>
            {s.english.map((line, j) => {
              const parts = line.split(s.highlight);
              return (
                <span key={j}>
                  {parts.length > 1 ? (
                    <>{parts[0]}<span style={{ color: '#AB8A3B', fontStyle: 'normal' }}>{s.highlight}</span>{parts[1]}</>
                  ) : line}
                  {j < s.english.length - 1 && <br />}
                </span>
              );
            })}
          </p>
        </div>
      ))}

      {/* Footer */}
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', fontStyle: 'italic', color: 'rgba(171,138,59,0.6)', letterSpacing: '0.1em', marginTop: '40px' }}>
        ॥ शुभ विवाह ॥
      </p>
    </section>
  );
}
