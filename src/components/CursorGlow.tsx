import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -200, y: -200 });
  const currentRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const handleMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMove);

    let frame: number;
    const animate = () => {
      currentRef.current.x +=
        (posRef.current.x - currentRef.current.x) * 0.08;
      currentRef.current.y +=
        (posRef.current.y - currentRef.current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${
          currentRef.current.x - 60
        }px, ${currentRef.current.y - 60}px)`;
      }

      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(171,138,59,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 49,
        willChange: 'transform',
      }}
    />
  );
}
