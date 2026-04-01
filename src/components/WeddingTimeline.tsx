import { motion } from 'framer-motion';

const events = [
  { time: "5:30 AM", name: "Naandi", tamil: "நாந்தி", desc: "Ancestral blessings invoked to sanctify the wedding day", side: "left" },
  { time: "7:00 AM", name: "Kashi Yatra", tamil: "காசி யாத்திரை", desc: "The groom's playful pilgrimage — stopped by the bride's father", side: "right" },
  { time: "8:30 AM", name: "Muhurtham", tamil: "முகூர்த்தம்", desc: "The sacred moment — tying of the thali around the sacred fire", side: "left" },
  { time: "9:30 AM", name: "Oonjal", tamil: "ஊஞ்சல்", desc: "The swing ceremony — the couple seated together as families sing", side: "right" },
  { time: "10:15 AM", name: "Saptapadi", tamil: "சப்தபதி", desc: "Seven sacred steps — seven vows for a lifetime together", side: "left" },
  { time: "11:00 AM", name: "Aashirvadham", tamil: "ஆசீர்வாதம்", desc: "Elders bless the couple as husband and wife", side: "right" },
  { time: "12:30 PM", name: "Virundhu", tamil: "விருந்து", desc: "Traditional feast served on banana leaf for all guests", side: "left" },
];

export default function WeddingTimeline() {
  return (
    <section style={{ background: '#F6F0E6', padding: '80px 24px', fontFamily: "'DM Sans', sans-serif" }}>
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginBottom: '48px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C97B5A', marginBottom: '12px' }}>
          29th November 2026 · Salem, Tamil Nadu
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '38px', fontWeight: 300, color: '#223348', margin: '0 0 8px' }}>
          The Wedding Day
        </h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', fontStyle: 'italic', color: '#7397A8', margin: '0 0 32px' }}>
          Sri Krishna Mahal Mantapa
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <div style={{ height: '1px', width: '80px', background: '#AB8A3B' }} />
          <div style={{ width: '6px', height: '6px', background: '#AB8A3B', transform: 'rotate(45deg)' }} />
          <div style={{ height: '1px', width: '80px', background: '#AB8A3B' }} />
        </div>
      </motion.div>

      {/* Timeline */}
      <div style={{ maxWidth: '640px', margin: '0 auto 64px', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, transparent, #AB8A3B 10%, #AB8A3B 90%, transparent)', transform: 'translateX(-50%)' }} />
        
        {events.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: event.side === 'left' ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            style={{ display: 'flex', alignItems: 'flex-start', gap: '0', marginBottom: '36px', flexDirection: event.side === 'right' ? 'row-reverse' : 'row' }}
          >
            {/* Content */}
            <div style={{ flex: 1, textAlign: event.side === 'left' ? 'right' : 'left', paddingRight: event.side === 'left' ? '32px' : '0', paddingLeft: event.side === 'right' ? '32px' : '0' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.25em', color: '#AB8A3B', textTransform: 'uppercase', marginBottom: '4px' }}>{event.time}</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 400, color: '#223348', margin: '0 0 2px' }}>{event.name}</h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', fontStyle: 'italic', color: '#7397A8', margin: '0 0 4px' }}>{event.tamil}</p>
              <p style={{ fontSize: '12px', fontWeight: 300, color: '#53694D', lineHeight: 1.6, margin: 0 }}>{event.desc}</p>
            </div>

            {/* Dot */}
            <div style={{ width: '10px', height: '10px', background: '#AB8A3B', borderRadius: '50%', flexShrink: 0, marginTop: '8px', position: 'relative', zIndex: 1, border: '2px solid #F6F0E6', boxShadow: '0 0 0 1px #AB8A3B' }} />
            <div style={{ flex: 1 }} />
          </motion.div>
        ))}
      </div>

      {/* Section Divider */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ display: 'flex', alignItems: 'center', gap: '20px', maxWidth: '400px', margin: '0 auto 48px' }}>
        <div style={{ flex: 1, height: '1px', background: 'rgba(171,138,59,0.3)' }} />
        <span style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#C97B5A', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>6th December 2026</span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(171,138,59,0.3)' }} />
      </motion.div>

      {/* Reception Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center', padding: '40px 32px', border: '1px solid rgba(171,138,59,0.2)' }}>
        <p style={{ fontSize: '18px', color: '#AB8A3B', marginBottom: '12px' }}>✦</p>
        <p style={{ fontSize: '10px', letterSpacing: '0.35em', color: '#AB8A3B', textTransform: 'uppercase', marginBottom: '8px' }}>7:00 PM onwards</p>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 300, color: '#223348', margin: '0 0 6px' }}>Reception</h3>
        <p style={{ fontSize: '12px', fontWeight: 300, color: '#7397A8', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Jabalpur, Madhya Pradesh</p>
      </motion.div>
    </section>
  );
}
