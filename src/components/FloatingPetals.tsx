import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  drift: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  shape: 'circle' | 'oval' | 'diamond';
}

const COLORS = [
  'rgba(171,138,59,',   // Antique Gold
  'rgba(201,123,90,',   // Terracotta
  'rgba(171,138,59,',   // Gold again — more frequent
  'rgba(83,105,77,',    // Olive Green
];

export default function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const createPetal = (startFromBottom = false): Petal => ({
      x: Math.random() * window.innerWidth,
      y: startFromBottom
        ? window.innerHeight + Math.random() * 100
        : Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.6 + 0.2,
      drift: (Math.random() - 0.5) * 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: ['circle', 'oval', 'diamond'][
        Math.floor(Math.random() * 3)
      ] as Petal['shape'],
    });

    petalsRef.current = Array.from({ length: 18 }, () =>
      createPetal(false)
    );

    const drawPetal = (ctx: CanvasRenderingContext2D, p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = `${p.color}${p.opacity})`;

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'oval') {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.6, p.size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 1.2);
        ctx.lineTo(p.size * 0.7, 0);
        ctx.lineTo(0, p.size * 1.2);
        ctx.lineTo(-p.size * 0.7, 0);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petalsRef.current.forEach((petal, i) => {
        petal.y -= petal.speed;
        petal.x += petal.drift;
        petal.rotation += petal.rotationSpeed;
        petal.x += Math.sin(petal.y * 0.02) * 0.3;
        petal.opacity = 0.15 + Math.sin(Date.now() * 0.001 + i) * 0.1;

        if (petal.y < -20) {
          petalsRef.current[i] = createPetal(true);
        }

        drawPetal(ctx, petal);
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    />
  );
}
