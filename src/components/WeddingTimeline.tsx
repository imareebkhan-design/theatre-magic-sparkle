import { motion } from 'framer-motion';
import { AnimatedTimelineLine, EventCard } from './TimelineAnimations';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTimeZone } from '@/hooks/useTimeZone';

const eventKeys = [
  { time: "5:30 AM", nameKey: 'event.naandi.name', tamil: "நாந்தி", descKey: 'event.naandi.desc', side: "left" as const },
  { time: "7:00 AM", nameKey: 'event.kashi.name', tamil: "காசி யாத்திரை", descKey: 'event.kashi.desc', side: "right" as const },
  { time: "8:30 AM", nameKey: 'event.muhurtham.name', tamil: "முகூர்த்தம்", descKey: 'event.muhurtham.desc', side: "left" as const },
  { time: "9:30 AM", nameKey: 'event.oonjal.name', tamil: "ஊஞ்சல்", descKey: 'event.oonjal.desc', side: "right" as const },
  { time: "10:15 AM", nameKey: 'event.saptapadi.name', tamil: "சப்தபதி", descKey: 'event.saptapadi.desc', side: "left" as const },
  { time: "11:00 AM", nameKey: 'event.aashirvadham.name', tamil: "ஆசீர்வாதம்", descKey: 'event.aashirvadham.desc', side: "right" as const },
  { time: "12:30 PM", nameKey: 'event.virundhu.name', tamil: "விருந்து", descKey: 'event.virundhu.desc', side: "left" as const },
];

export default function WeddingTimeline() {
  const { t } = useLanguage();

  return (
    <section style={{ background: '#F6F0E6', padding: '80px 24px', fontFamily: "'DM Sans', sans-serif" }}>
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginBottom: '48px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C97B5A', marginBottom: '12px' }}>
          {t('timeline.header.date')}
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 6vw, 38px)', fontWeight: 300, color: '#223348', margin: '0 0 8px' }}>
          {t('timeline.header.title')}
        </h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', fontStyle: 'italic', color: '#7397A8', margin: '0 0 32px' }}>
          {t('timeline.header.venue')}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <div style={{ height: '1px', width: '80px', background: '#AB8A3B' }} />
          <div style={{ width: '6px', height: '6px', background: '#AB8A3B', transform: 'rotate(45deg)' }} />
          <div style={{ height: '1px', width: '80px', background: '#AB8A3B' }} />
        </div>
      </motion.div>

      {/* Timeline */}
      <div style={{ maxWidth: '640px', margin: '0 auto 64px', position: 'relative' }}>
        <AnimatedTimelineLine />
        
        {eventKeys.map((event, i) => (
          <EventCard key={i} side={event.side} index={i}>
            <div
              style={{ display: 'flex', alignItems: 'flex-start', gap: '0', marginBottom: '36px', flexDirection: event.side === 'right' ? 'row-reverse' : 'row' }}
            >
              {/* Content */}
              <div style={{ flex: 1, textAlign: event.side === 'left' ? 'right' : 'left', paddingRight: event.side === 'left' ? '32px' : '0', paddingLeft: event.side === 'right' ? '32px' : '0' }}>
                <p style={{ fontSize: '10px', letterSpacing: '0.25em', color: '#AB8A3B', textTransform: 'uppercase', marginBottom: '4px' }}>{event.time}</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 400, color: '#223348', margin: '0 0 2px' }}>{t(event.nameKey)}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', fontStyle: 'italic', color: '#7397A8', margin: '0 0 4px' }}>{event.tamil}</p>
                <p style={{ fontSize: '12px', fontWeight: 300, color: '#53694D', lineHeight: 1.6, margin: 0 }}>{t(event.descKey)}</p>
              </div>

              {/* Dot */}
              <div style={{ width: '10px', height: '10px', background: '#AB8A3B', borderRadius: '50%', flexShrink: 0, marginTop: '8px', position: 'relative', zIndex: 1, border: '2px solid #F6F0E6', boxShadow: '0 0 0 1px #AB8A3B' }} />
              <div style={{ flex: 1 }} />
            </div>
          </EventCard>
        ))}
      </div>

      {/* Section Divider */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ display: 'flex', alignItems: 'center', gap: '20px', maxWidth: '400px', margin: '0 auto 48px' }}>
        <div style={{ flex: 1, height: '1px', background: 'rgba(171,138,59,0.3)' }} />
        <span style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#C97B5A', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{t('timeline.reception.date')}</span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(171,138,59,0.3)' }} />
      </motion.div>

      {/* Reception Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center', padding: '40px 32px', border: '1px solid rgba(171,138,59,0.2)' }}>
        <p style={{ fontSize: '18px', color: '#AB8A3B', marginBottom: '12px' }}>✦</p>
        <p style={{ fontSize: '10px', letterSpacing: '0.35em', color: '#AB8A3B', textTransform: 'uppercase', marginBottom: '8px' }}>{t('timeline.reception.time')}</p>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 300, color: '#223348', margin: '0 0 6px' }}>{t('timeline.reception.title')}</h3>
        <p style={{ fontSize: '12px', fontWeight: 300, color: '#7397A8', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{t('timeline.reception.location')}</p>
      </motion.div>
    </section>
  );
}
