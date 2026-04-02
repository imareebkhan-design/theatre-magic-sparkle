import { motion } from 'framer-motion';

const days = [
  {
    day: "Day 01",
    date: "28th November 2026",
    title: "Pre-Wedding Celebrations",
    location: "Salem, Tamil Nadu",
    color: "#C97B5A",
    events: [
      {
        time: "12:30 PM – 1:30 PM",
        name: "Engagement",
        desc: "The formal union of two families, followed by a celebratory lunch",
        side: "left",
      },
      {
        time: "5:30 PM – 7:00 PM",
        name: "Baraat",
        desc: "The groom's grand procession — music, dance and celebration as Sarthak arrives",
        side: "right",
      },
      {
        time: "7:00 PM onwards",
        name: "Pre-Wedding Reception",
        desc: "An evening of joy, laughter and togetherness, followed by dinner",
        side: "left",
      },
      {
        time: "11:00 PM onwards",
        name: "Kankana Dharana",
        desc: "Elders tie a turmeric-soaked sacred knot — blessing the couple for the journey ahead",
        side: "right",
      },
    ],
  },
  {
    day: "Day 02",
    date: "29th November 2026",
    title: "The Wedding Day",
    location: "Sri Krishna Mahal Mantapa, Salem",
    color: "#AB8A3B",
    events: [
      {
        time: "8:30 AM onwards",
        name: "Muhurtham",
        desc: "The sacred moment — the tying of the thali around the holy fire, followed by breakfast",
        side: "left",
      },
      {
        time: "10:30 AM",
        name: "Aashirvadham",
        desc: "Elders shower their blessings upon Nikila and Sarthak as husband and wife",
        side: "right",
      },
      {
        time: "11:00 AM onwards",
        name: "Sadagungal",
        desc: "Sacred post-wedding rituals performed with family, followed by a traditional lunch",
        side: "left",
      },
    ],
  },
  {
    day: "Day 03",
    date: "6th December 2026",
    title: "Wedding Reception",
    location: "Jabalpur, Madhya Pradesh",
    color: "#7397A8",
    events: [
      {
        time: "6:30 PM onwards",
        name: "Reception Party",
        desc: "An elegant evening celebration bringing both families together, followed by dinner",
        side: "left",
      },
    ],
  },
];

const Divider = ({ color }: { color: string }) => (
  <div style={{
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', gap: '12px',
    margin: '48px auto',
  }}>
    <div style={{ width: '60px', height: '1px', background: `${color}60` }} />
    <div style={{ width: '6px', height: '6px', background: color, transform: 'rotate(45deg)' }} />
    <div style={{ width: '60px', height: '1px', background: `${color}60` }} />
  </div>
);

export default function WeddingTimeline() {
  return (
    <section style={{
      background: '#F6F0E6',
      padding: '80px 24px',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '80px' }}
      >
        <p style={{
          fontSize: '10px', letterSpacing: '0.4em',
          textTransform: 'uppercase', color: '#C97B5A', marginBottom: '12px',
        }}>
          28th Nov – 6th Dec 2026
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '42px', fontWeight: 300, color: '#223348', margin: '0 0 8px',
        }}>
          Three Days of Celebration
        </h2>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '16px', fontStyle: 'italic', color: '#7397A8', margin: 0,
        }}>
          Salem, Tamil Nadu · Jabalpur, Madhya Pradesh
        </p>
      </motion.div>

      {/* Days */}
      {days.map((day, dayIndex) => (
        <div key={dayIndex} style={{ marginBottom: dayIndex < days.length - 1 ? '80px' : 0 }}>
          {/* Day Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '48px' }}
          >
            {/* Day pill */}
            <div style={{
              display: 'inline-block',
              padding: '6px 20px',
              border: `1px solid ${day.color}`,
              borderRadius: '2px',
              marginBottom: '16px',
            }}>
              <span style={{
                fontSize: '10px', letterSpacing: '0.35em',
                textTransform: 'uppercase', color: day.color,
              }}>
                {day.day}
              </span>
            </div>

            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '32px', fontWeight: 300,
              color: '#223348', margin: '0 0 6px',
            }}>
              {day.title}
            </h3>
            <p style={{
              fontSize: '11px', letterSpacing: '0.25em',
              textTransform: 'uppercase', color: '#7397A8', margin: '0 0 4px',
            }}>
              {day.date}
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '14px', fontStyle: 'italic',
              color: day.color, margin: 0,
            }}>
              {day.location}
            </p>
          </motion.div>

          {/* Timeline */}
          {day.events.length === 1 ? (
            /* Single event — centered layout with dot above vertical line */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6 }}
              style={{
                maxWidth: '480px', margin: '0 auto',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', textAlign: 'center',
              }}
            >
              {/* Dot */}
              <div style={{
                width: '10px', height: '10px',
                background: day.color,
                borderRadius: '50%',
                flexShrink: 0,
                position: 'relative', zIndex: 1,
                border: '2px solid #F6F0E6',
                boxShadow: `0 0 0 1px ${day.color}`,
                marginBottom: '0',
              }} />
              {/* Vertical line */}
              <div style={{
                width: '1px', height: '32px',
                background: `${day.color}60`,
                marginBottom: '20px',
              }} />
              {/* Content */}
              <p style={{
                fontSize: '10px', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: day.color,
                marginBottom: '4px',
              }}>
                {day.events[0].time}
              </p>
              <h4 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '22px', fontWeight: 400,
                color: '#223348', margin: '0 0 6px',
              }}>
                {day.events[0].name}
              </h4>
              <p style={{
                fontSize: '12px', fontWeight: 300,
                color: '#53694D', lineHeight: 1.7, margin: 0,
              }}>
                {day.events[0].desc}
              </p>
            </motion.div>
          ) : (
            /* Multiple events — standard alternating timeline */
            <div style={{
              maxWidth: '680px', margin: '0 auto',
              position: 'relative',
            }}>
              {/* Vertical line */}
              <div style={{
                position: 'absolute', left: '50%', top: 0, bottom: 0,
                width: '1px',
                background: `linear-gradient(to bottom, transparent, ${day.color}60 10%, ${day.color}60 90%, transparent)`,
                transform: 'translateX(-50%)',
              }} />

              {/* Events */}
              {day.events.map((event, eventIndex) => (
                <motion.div
                  key={eventIndex}
                  initial={{ opacity: 0, x: event.side === 'left' ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: eventIndex * 0.12 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '40px',
                    flexDirection: event.side === 'right' ? 'row-reverse' : 'row',
                  }}
                >
                  {/* Content */}
                  <div style={{
                    flex: 1,
                    textAlign: event.side === 'left' ? 'right' : 'left',
                    paddingRight: event.side === 'left' ? '32px' : 0,
                    paddingLeft: event.side === 'right' ? '32px' : 0,
                  }}>
                    <p style={{
                      fontSize: '10px', letterSpacing: '0.2em',
                      textTransform: 'uppercase', color: day.color,
                      marginBottom: '4px',
                    }}>
                      {event.time}
                    </p>
                    <h4 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '22px', fontWeight: 400,
                      color: '#223348', margin: '0 0 6px',
                    }}>
                      {event.name}
                    </h4>
                    <p style={{
                      fontSize: '12px', fontWeight: 300,
                      color: '#53694D', lineHeight: 1.7, margin: 0,
                    }}>
                      {event.desc}
                    </p>
                  </div>

                  {/* Dot */}
                  <div style={{
                    width: '10px', height: '10px',
                    background: day.color,
                    borderRadius: '50%',
                    flexShrink: 0, marginTop: '8px',
                    position: 'relative', zIndex: 1,
                    border: '2px solid #F6F0E6',
                    boxShadow: `0 0 0 1px ${day.color}`,
                  }} />
                  <div style={{ flex: 1 }} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Day divider — not after last day */}
          {dayIndex < days.length - 1 && (
            <Divider color={day.color} />
          )}
        </div>
      ))}
    </section>
  );
}
