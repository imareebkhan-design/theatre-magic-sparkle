import { motion } from 'framer-motion';
import { MarigoldBellString, ParrotOnBranch } from './SouthIndianIllustrations';

type EventItem = {
  time: string;
  name: string;
  desc: string;
  dressCode?: string;
  colors?: string[];
  decoration?: 'parrot';
};

type Day = {
  day: string;
  numeral: string;
  date: string;
  title: string;
  location: string;
  color: string;
  events: EventItem[];
};

const days: Day[] = [
  {
    day: 'Day One',
    numeral: 'I',
    date: '28 · 11 · 2026',
    title: 'Pre-Wedding Celebrations',
    location: 'Salem, Tamil Nadu',
    color: '#C97B5A',
    events: [
      {
        time: '12:30 — 1:30 PM',
        name: 'Engagement',
        desc: 'The formal union of two families, followed by a celebratory lunch.',
        dressCode: 'Indo-Western',
        colors: ['#F4D5C5', '#FFF8EC'],
      },
      {
        time: '5:30 — 7:00 PM',
        name: 'Baraat',
        desc: "The groom's grand procession — music, dance and celebration as Sarthak arrives.",
        decoration: 'parrot',
      },
      {
        time: '7:00 PM onwards',
        name: 'Pre-Wedding Reception',
        desc: 'An evening of joy, laughter and togetherness, followed by dinner.',
        dressCode: 'Cocktail',
        colors: ['#1E2A4A', '#C9922A'],
      },
      {
        time: '11:00 PM onwards',
        name: 'Kankana Dharana',
        desc: 'Elders tie a turmeric-soaked sacred knot — blessing the couple for the journey ahead.',
      },
    ],
  },
  {
    day: 'Day Two',
    numeral: 'II',
    date: '29 · 11 · 2026',
    title: 'The Wedding Day',
    location: 'Sri Krishna Mahal Mantapa, Salem',
    color: '#AB8A3B',
    events: [
      {
        time: '8:30 AM onwards',
        name: 'Muhurtham',
        desc: 'The sacred moment — the tying of the thali around the holy fire, followed by breakfast.',
      },
      {
        time: '10:30 AM',
        name: 'Aashirvadham',
        desc: 'Elders shower their blessings upon Nikila and Sarthak as husband and wife.',
      },
      {
        time: '11:00 AM onwards',
        name: 'Sadagungal',
        desc: 'Sacred post-wedding rituals performed with family, followed by a traditional lunch.',
      },
    ],
  },
  {
    day: 'Day Three',
    numeral: 'III',
    date: '06 · 12 · 2026',
    title: 'Wedding Reception',
    location: 'Jabalpur, Madhya Pradesh',
    color: '#7397A8',
    events: [
      {
        time: '6:30 PM onwards',
        name: 'Reception Party',
        desc: 'An elegant evening celebration bringing both families together, followed by dinner.',
        dressCode: 'Formal',
        colors: ['#0F4D3A', '#E8D49A'],
      },
    ],
  },
];

/* ─── Ornament: thin filigree flourish ─── */
const Flourish = ({ color, flip = false }: { color: string; flip?: boolean }) => (
  <svg
    viewBox="0 0 240 24"
    width="220"
    height="22"
    fill="none"
    stroke={color}
    strokeWidth="1"
    strokeLinecap="round"
    style={{ transform: flip ? 'scaleX(-1)' : undefined, opacity: 0.75 }}
    aria-hidden
  >
    <path d="M2 12 H88" />
    <path d="M88 12 q6 -8 14 -8 t14 8 q-6 8 -14 8 t-14 -8 z" />
    <circle cx="120" cy="12" r="2" fill={color} stroke="none" />
    <path d="M152 12 q-6 -8 -14 -8 t-14 8 q6 8 14 8 t14 -8 z" />
    <path d="M152 12 H238" />
  </svg>
);

/* ─── Dress code: stripped, no pill ─── */
const DressCode = ({ color, code, swatches }: { color: string; code: string; swatches: string[] }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      marginTop: '14px',
      paddingTop: '12px',
      borderTop: `1px solid ${color}30`,
    }}
  >
    <span
      style={{
        fontSize: '9px',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color,
      }}
    >
      Attire
    </span>
    <span
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: '13px',
        color: '#223348',
      }}
    >
      {code}
    </span>
    <span style={{ display: 'inline-flex', gap: '5px' }}>
      {swatches.map((c, i) => (
        <span
          key={i}
          style={{
            width: '11px',
            height: '11px',
            borderRadius: '50%',
            background: c,
            border: '1px solid rgba(34,51,72,0.18)',
          }}
        />
      ))}
    </span>
  </div>
);

/* ─── A single event row ─── */
const EventRow = ({
  event,
  color,
  index,
}: {
  event: EventItem;
  color: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    style={{
      display: 'grid',
      gridTemplateColumns: '160px 1fr',
      gap: '36px',
      padding: '32px 0',
      borderBottom: 'rgba(34,51,72,0.08) 1px dashed',
      alignItems: 'baseline',
    }}
    className="event-row"
  >
    {/* Time column */}
    <div style={{ textAlign: 'right', paddingTop: '4px' }}>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '13px',
          fontStyle: 'italic',
          letterSpacing: '0.05em',
          color,
        }}
      >
        {event.time}
      </div>
    </div>

    {/* Content column */}
    <div>
      <h4
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '30px',
          fontWeight: 400,
          color: '#223348',
          margin: '0 0 8px',
          lineHeight: 1.1,
          letterSpacing: '-0.005em',
        }}
      >
        {event.name}
      </h4>
      <p
        style={{
          fontSize: '13px',
          fontWeight: 300,
          color: 'rgba(34,51,72,0.7)',
          lineHeight: 1.75,
          margin: 0,
          maxWidth: '520px',
        }}
      >
        {event.desc}
      </p>
      {event.dressCode && (
        <DressCode color={color} code={event.dressCode} swatches={event.colors || []} />
      )}
      {event.decoration === 'parrot' && (
        <div style={{ marginTop: '14px', opacity: 0.85 }}>
          <ParrotOnBranch />
        </div>
      )}
    </div>
  </motion.div>
);

export default function WeddingTimeline() {
  return (
    <section
      style={{
        background: '#F6F0E6',
        padding: '120px 24px',
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ textAlign: 'center', marginBottom: '120px', maxWidth: '760px', margin: '0 auto 120px' }}
      >
        <p
          style={{
            fontSize: '10px',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: '#C97B5A',
            marginBottom: '24px',
          }}
        >
          The Celebration
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(40px, 6vw, 68px)',
            fontWeight: 300,
            color: '#223348',
            margin: '0 0 22px',
            lineHeight: 1.05,
            letterSpacing: '-0.015em',
          }}
        >
          Three Days,<br />
          <em style={{ fontWeight: 300, color: '#AB8A3B' }}>One Story.</em>
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 22px' }}>
          <Flourish color="#AB8A3B" />
        </div>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '17px',
            fontStyle: 'italic',
            color: 'rgba(34,51,72,0.7)',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          From the warm temples of Salem to the regal halls of Jabalpur —
          <br />
          a journey woven in turmeric, jasmine, and song.
        </p>
      </motion.div>

      {/* Days */}
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        {days.map((day, dayIndex) => (
          <div
            key={dayIndex}
            style={{
              marginBottom: dayIndex < days.length - 1 ? '140px' : 0,
              position: 'relative',
            }}
          >
            {/* Day 01 marigold accents — softer placement */}
            {dayIndex === 0 && (
              <>
                <div
                  style={{
                    position: 'absolute',
                    top: '-60px',
                    left: '-20px',
                    pointerEvents: 'none',
                    opacity: 0.7,
                    zIndex: 0,
                  }}
                >
                  <MarigoldBellString side="left" />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: '-60px',
                    right: '-20px',
                    pointerEvents: 'none',
                    opacity: 0.7,
                    zIndex: 0,
                  }}
                >
                  <MarigoldBellString side="right" />
                </div>
              </>
            )}

            {/* Day Header — editorial typography, NO boxes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              style={{
                textAlign: 'center',
                marginBottom: '60px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Giant ghosted roman numeral as backdrop */}
              <div
                aria-hidden
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(180px, 26vw, 320px)',
                  fontWeight: 300,
                  color: day.color,
                  opacity: 0.07,
                  lineHeight: 0.85,
                  letterSpacing: '-0.04em',
                  position: 'absolute',
                  top: '-30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  zIndex: 0,
                  fontStyle: 'italic',
                }}
              >
                {day.numeral}
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <p
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.5em',
                    textTransform: 'uppercase',
                    color: day.color,
                    margin: '0 0 18px',
                    paddingLeft: '0.5em',
                  }}
                >
                  {day.day}
                </p>

                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(32px, 5vw, 48px)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: '#223348',
                    margin: '0 0 18px',
                    lineHeight: 1.1,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {day.title}
                </h3>

                {/* Date · Location — single elegant line */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '14px',
                    fontSize: '11px',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'rgba(34,51,72,0.55)',
                  }}
                >
                  <span>{day.date}</span>
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: day.color,
                      opacity: 0.6,
                    }}
                  />
                  <span>{day.location}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                  <Flourish color={day.color} />
                </div>
              </div>
            </motion.div>

            {/* Events list — clean two-column rows, no boxes */}
            <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              {day.events.map((event, i) => (
                <EventRow key={i} event={event} color={day.color} index={i} />
              ))}
            </div>

            {/* Day-to-day separator */}
            {dayIndex < days.length - 1 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '14px',
                  marginTop: '90px',
                }}
              >
                <div
                  style={{
                    width: '1px',
                    height: '50px',
                    background: `linear-gradient(to bottom, transparent, ${day.color}80, transparent)`,
                  }}
                />
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: day.color,
                    opacity: 0.5,
                  }}
                />
                <div
                  style={{
                    width: '1px',
                    height: '50px',
                    background: `linear-gradient(to bottom, ${day.color}80, transparent)`,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile responsive override */}
      <style>{`
        @media (max-width: 640px) {
          .event-row {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
            text-align: left !important;
          }
          .event-row > div:first-child {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}
