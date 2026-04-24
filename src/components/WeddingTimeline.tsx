import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion';
import {
  SouthIndianDayFrame,
  MarigoldBellString,
} from './SouthIndianIllustrations';

/* Scroll-driven garland: drops down as user scrolls the day into view.
   Uses clip-path reveal + subtle vertical drift + sway on the SVG. */
const ScrollGarland = ({
  side,
  containerRef,
}: {
  side: 'left' | 'right';
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.6,
  });
  const clip = useTransform(
    smooth,
    [0, 0.05, 0.55, 1],
    ['inset(0 0 100% 0)', 'inset(0 0 100% 0)', 'inset(0 0 0% 0)', 'inset(0 0 0% 0)']
  );
  const y = useTransform(smooth, [0, 0.55], [-30, 0]);
  const swayDeg: MotionValue<number> = useTransform(smooth, (v) =>
    Math.sin(v * Math.PI * 2) * (side === 'left' ? 1.2 : -1.2)
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        [side]: '2%',
        pointerEvents: 'none',
        opacity: 0.9,
        zIndex: 0,
        clipPath: clip,
        WebkitClipPath: clip,
        y,
        rotate: swayDeg,
        transformOrigin: 'top center',
      } as unknown as React.CSSProperties}
    >
      <MarigoldBellString side={side} />
    </motion.div>
  );
};

import engagementHands from '@/assets/engagement-ring.webp';
import handsExchangingRings from '@/assets/engagement-hands.webp';
import kalash from '@/assets/kalash.webp';
import receptionProposal from '@/assets/reception-proposal.webp';
import kankanaThread from '@/assets/kankana-thread.webp';
import blessingHands from '@/assets/blessing-hands.webp';
import bananaLeafMeal from '@/assets/banana-leaf-meal.webp';
import champagneToast from '@/assets/doodle-reception-party.webp';
import baraatFeet from '@/assets/baraat-couple.webp';
import muhurthamFeet from '@/assets/muhurtham-feet.webp';

type DecorationKey =
  | 'baraat-feet'
  | 'engagement-hands'
  | 'kalash'
  | 'diya'
  | 'kankana'
  | 'blessing-hands'
  | 'banana-leaf'
  | 'champagne';

type EventItem = {
  time: string;
  name: string;
  desc: string;
  side: 'left' | 'right';
  dressCode?: string;
  colors?: string[];
  decoration?: DecorationKey;
};

const DOODLE_SIZE = 160;

const DOODLE_MAP: Record<
  DecorationKey,
  { src: string; alt: string; width?: number; height?: number }
> = {
  'baraat-feet': {
    src: baraatFeet,
    alt: 'Illustration of bride and groom in wedding attire — baraat',
  },
  'engagement-hands': {
    src: engagementHands,
    alt: 'Engagement ring in floral-adorned box',
  },
  kalash: {
    src: muhurthamFeet,
    alt: 'Watercolor of bride and groom feet with anklets — muhurtham',
  },
  diya: {
    src: receptionProposal,
    alt: 'Illustration of a marriage proposal — pre-wedding reception',
  },
  kankana: {
    src: handsExchangingRings,
    alt: 'Hands exchanging rings — kankana dharana',
  },
  'blessing-hands': {
    src: blessingHands,
    alt: 'Cupped hands showering rice and petals — blessing',
  },
  'banana-leaf': {
    src: bananaLeafMeal,
    alt: 'Banana leaf thali with traditional South Indian meal',
  },
  champagne: {
    src: champagneToast,
    alt: 'Illustrated wedding party with bride, groom and families celebrating',
    width: 440,
    height: 270,
  },
};

const EventDoodle = ({
  decoration,
  align,
}: {
  decoration: DecorationKey;
  align: 'left' | 'right' | 'center';
}) => {
  const config = DOODLE_MAP[decoration];
  const justify =
    align === 'left' ? 'flex-end' :
    align === 'right' ? 'flex-start' :
    'center';
  return (
    <div style={{
      marginTop: '12px',
      display: 'flex',
      justifyContent: justify,
    }}>
      <div style={{
        width: `${config.width ?? DOODLE_SIZE}px`,
        height: `${config.height ?? DOODLE_SIZE}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img
          src={config.src}
          alt={config.alt}
          loading="eager"
          decoding="async"
          fetchPriority="low"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            mixBlendMode: 'multiply',
            opacity: 0.95,
          }}
        />
      </div>
    </div>
  );
};

const days: {
  day: string;
  date: string;
  title: string;
  location: string;
  color: string;
  events: EventItem[];
}[] = [
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
        dressCode: "Indo-Western",
        colors: ["#F4D5C5", "#FFF8EC"],
        decoration: "engagement-hands",
      },
      {
        time: "5:30 PM – 7:00 PM",
        name: "Baraat",
        desc: "The groom's grand procession — music, dance and celebration as Sarthak arrives",
        side: "right",
        decoration: "baraat-feet",
      },
      {
        time: "7:00 PM onwards",
        name: "Pre-Wedding Reception",
        desc: "An evening of joy, laughter and togetherness, followed by dinner",
        side: "left",
        dressCode: "Cocktail",
        colors: ["#1E2A4A", "#C9922A"],
        decoration: "diya",
      },
      {
        time: "11:00 PM onwards",
        name: "Kankana Dharana",
        desc: "Elders tie a turmeric-soaked sacred knot — blessing the couple for the journey ahead",
        side: "right",
        decoration: "kankana",
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
        decoration: "kalash",
      },
      {
        time: "10:30 AM",
        name: "Aashirvadham",
        desc: "Elders shower their blessings upon Nikila and Sarthak as husband and wife",
        side: "right",
        decoration: "blessing-hands",
      },
      {
        time: "11:00 AM onwards",
        name: "Sadagungal",
        desc: "Sacred post-wedding rituals performed with family, followed by a traditional lunch",
        side: "left",
        decoration: "banana-leaf",
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
        dressCode: "Formal",
        colors: ["#0F4D3A", "#E8D49A"],
        decoration: "champagne",
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

const DressCodeLine = ({
  align,
  color,
  code,
  swatches,
}: {
  align: 'left' | 'right' | 'center';
  color: string;
  code: string;
  swatches: string[];
}) => {
  const justify =
    align === 'left' ? 'flex-start' :
    align === 'right' ? 'flex-end' : 'center';
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: justify,
      gap: '8px',
      marginTop: '10px',
    }}>
      <span style={{
        fontSize: '9px',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: color,
        opacity: 0.85,
      }}>
        Dress Code
      </span>
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: '12px',
        color: '#223348',
      }}>
        {code}
      </span>
      <span style={{ display: 'inline-flex', gap: '4px', marginLeft: '4px' }}>
        {swatches.map((c, i) => (
          <span
            key={i}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: c,
              border: '1px solid rgba(34,51,72,0.15)',
              display: 'inline-block',
            }}
          />
        ))}
      </span>
    </div>
  );
};

export default function WeddingTimeline() {
  return (
    <section style={{
      background: '#F6F0E6',
      padding: '80px 24px',
      fontFamily: "'DM Sans', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Wrapper that spans from the section heading through the end of Day 01.
          The marigold garlands stretch the full height of this wrapper. */}
      <div style={{ position: 'relative' }}>
        {/* Marigold bell strings — span heading → end of Day 01 timeline */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: '2%',
          pointerEvents: 'none', opacity: 0.85, zIndex: 0,
        }}>
          <MarigoldBellString side="left" />
        </div>
        <div style={{
          position: 'absolute', top: 0, bottom: 0, right: '2%',
          pointerEvents: 'none', opacity: 0.85, zIndex: 0,
        }}>
          <MarigoldBellString side="right" />
        </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '80px', position: 'relative', zIndex: 1 }}
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

      {/* Day 01 — inside the garland wrapper so garlands stretch from heading to end of Day 01 */}
      {days.slice(0, 1).map((day, dayIndex) => (
        <div key={dayIndex} style={{
          marginBottom: dayIndex < days.length - 1 ? '80px' : 0,
          position: 'relative',
        }}>

          {/* Day Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '48px', position: 'relative', zIndex: 1 }}
          >
            {/* Day pill — wrapped in South Indian decorative frame */}
            <div style={{ marginBottom: '16px' }}>
              <SouthIndianDayFrame color={day.color}>
                <div style={{
                  display: 'inline-block',
                  padding: '6px 20px',
                  border: `1px solid ${day.color}`,
                  borderRadius: '2px',
                }}>
                  <span style={{
                    fontSize: '10px', letterSpacing: '0.35em',
                    textTransform: 'uppercase', color: day.color,
                  }}>
                    {day.day}
                  </span>
                </div>
              </SouthIndianDayFrame>
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
                position: 'relative', zIndex: 1,
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
              {day.events[0].dressCode && (
                <DressCodeLine
                  align="center"
                  color={day.color}
                  code={day.events[0].dressCode}
                  swatches={day.events[0].colors || []}
                />
              )}
              {day.events[0].decoration && (
                <EventDoodle
                  decoration={day.events[0].decoration}
                  align="center"
                />
              )}
            </motion.div>
          ) : (
            /* Multiple events — standard alternating timeline */
            <div style={{
              maxWidth: '680px', margin: '0 auto',
              position: 'relative', zIndex: 1,
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
                    {event.dressCode && (
                      <DressCodeLine
                        align={event.side === 'left' ? 'right' : 'left'}
                        color={day.color}
                        code={event.dressCode}
                        swatches={event.colors || []}
                      />
                    )}
                    {event.decoration && (
                      <EventDoodle
                        decoration={event.decoration}
                        align={event.side}
                      />
                    )}
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

          {/* Divider after Day 01 (always, since more days follow) */}
          <Divider color={day.color} />
        </div>
      ))}
      </div>

      {/* Remaining days (Day 02 onward) — rendered outside garland wrapper */}
      {days.slice(1).map((day, idx) => {
        const dayIndex = idx + 1;
        return (
        <div key={dayIndex} style={{
          marginBottom: dayIndex < days.length - 1 ? '80px' : 0,
          position: 'relative',
        }}>
          {/* Marigold bell strings — span the full height of this day */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: '2%',
            pointerEvents: 'none', opacity: 0.85, zIndex: 0,
          }}>
            <MarigoldBellString side="left" />
          </div>
          <div style={{
            position: 'absolute', top: 0, bottom: 0, right: '2%',
            pointerEvents: 'none', opacity: 0.85, zIndex: 0,
          }}>
            <MarigoldBellString side="right" />
          </div>

          {/* Day Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '48px', position: 'relative', zIndex: 1 }}
          >
            <div style={{ marginBottom: '16px' }}>
              <SouthIndianDayFrame color={day.color}>
                <div style={{
                  display: 'inline-block',
                  padding: '6px 20px',
                  border: `1px solid ${day.color}`,
                  borderRadius: '2px',
                }}>
                  <span style={{
                    fontSize: '10px', letterSpacing: '0.35em',
                    textTransform: 'uppercase', color: day.color,
                  }}>
                    {day.day}
                  </span>
                </div>
              </SouthIndianDayFrame>
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

          {day.events.length === 1 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6 }}
              style={{
                maxWidth: '480px', margin: '0 auto',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', textAlign: 'center',
                position: 'relative', zIndex: 1,
              }}
            >
              <div style={{
                width: '10px', height: '10px',
                background: day.color,
                borderRadius: '50%',
                flexShrink: 0,
                position: 'relative', zIndex: 1,
                border: '2px solid #F6F0E6',
                boxShadow: `0 0 0 1px ${day.color}`,
              }} />
              <div style={{
                width: '1px', height: '32px',
                background: `${day.color}60`,
                marginBottom: '20px',
              }} />
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
              {day.events[0].dressCode && (
                <DressCodeLine
                  align="center"
                  color={day.color}
                  code={day.events[0].dressCode}
                  swatches={day.events[0].colors || []}
                />
              )}
              {day.events[0].decoration && (
                <EventDoodle
                  decoration={day.events[0].decoration}
                  align="center"
                />
              )}
            </motion.div>
          ) : (
            <div style={{
              maxWidth: '680px', margin: '0 auto',
              position: 'relative', zIndex: 1,
            }}>
              <div style={{
                position: 'absolute', left: '50%', top: 0, bottom: 0,
                width: '1px',
                background: `linear-gradient(to bottom, transparent, ${day.color}60 10%, ${day.color}60 90%, transparent)`,
                transform: 'translateX(-50%)',
              }} />
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
                    {event.dressCode && (
                      <DressCodeLine
                        align={event.side === 'left' ? 'right' : 'left'}
                        color={day.color}
                        code={event.dressCode}
                        swatches={event.colors || []}
                      />
                    )}
                    {event.decoration && (
                      <EventDoodle
                        decoration={event.decoration}
                        align={event.side}
                      />
                    )}
                  </div>
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

          {dayIndex < days.length - 1 && <Divider color={day.color} />}
        </div>
        );
      })}
    </section>
  );
}
