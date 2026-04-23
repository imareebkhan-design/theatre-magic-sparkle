import { useEffect, useRef, useState } from 'react';
import templeGopuram from '@/assets/temple-gopuram.png';

/**
 * Parallax temple gopuram
 * - As the user scrolls the temple into view, layered transforms make
 *   it appear to grow taller and rise toward the viewer (3D perspective).
 */
export default function ParallaxTemple({
  caption = 'Sri Krishna Mahal Mantapa, Salem',
}: {
  caption?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 → 1 as section scrolls through viewport

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the section's top hits the bottom of viewport,
      // 1 when its bottom passes the top of viewport.
      const raw = 1 - (rect.top + rect.height * 0.3) / vh;
      setProgress(Math.max(0, Math.min(1, raw)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Derived parallax values
  const scaleY = 0.85 + progress * 0.55; // grows taller as you scroll
  const scaleX = 0.95 + progress * 0.1;
  const translateY = (1 - progress) * 60; // rises up
  const rotateX = (1 - progress) * 18; // tilts upright
  const opacity = 0.25 + progress * 0.95;

  // Background haze layers also drift
  const hazeY1 = (1 - progress) * 30;
  const hazeY2 = (1 - progress) * -20;

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto 16px',
        textAlign: 'center',
        perspective: '1200px',
        perspectiveOrigin: '50% 90%',
        minHeight: '420px',
        overflow: 'visible',
      }}
    >
      {/* Soft halo / sun behind temple */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '40%',
          width: '320px',
          height: '320px',
          marginLeft: '-160px',
          marginTop: '-160px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(232,101,26,0.18) 0%, rgba(212,160,23,0.10) 40%, rgba(246,240,230,0) 70%)',
          transform: `translateY(${hazeY1}px) scale(${0.9 + progress * 0.3})`,
          transition: 'transform 0.1s linear',
          pointerEvents: 'none',
        }}
      />
      {/* Faint duplicate temple silhouette behind for depth */}
      <img
        src={templeGopuram}
        alt=""
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          width: '78%',
          transform: `translateX(-50%) translateY(${hazeY2}px) scale(${
            1 + progress * 0.15
          }, ${0.9 + progress * 0.4})`,
          opacity: 0.15 + progress * 0.15,
          filter: 'blur(6px) saturate(0.7)',
          pointerEvents: 'none',
          transition: 'transform 0.1s linear, opacity 0.1s linear',
        }}
      />

      {/* Main temple — parallax + 3D tilt */}
      <img
        src={templeGopuram}
        alt="South Indian temple gopuram"
        style={{
          position: 'relative',
          width: '70%',
          maxWidth: '380px',
          display: 'block',
          margin: '0 auto',
          transformOrigin: '50% 100%',
          transform: `translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scaleX}, ${scaleY})`,
          opacity,
          transition: 'transform 0.12s linear, opacity 0.2s linear',
          willChange: 'transform, opacity',
          filter: 'drop-shadow(0 18px 24px rgba(34,51,72,0.18))',
        }}
      />

      {caption && (
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '13px',
            color: '#7397A8',
            marginTop: '12px',
            opacity: 0.5 + progress * 0.5,
            transition: 'opacity 0.2s linear',
          }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}
