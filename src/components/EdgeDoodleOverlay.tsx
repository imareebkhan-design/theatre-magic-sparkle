/**
 * EdgeDoodleOverlay.tsx
 * Fixed, full-viewport decorative overlay that places the watercolor
 * South Indian doodle on the LEFT and (mirrored) RIGHT edges of the page.
 * Sits behind content (z-0) and is non-interactive.
 * Repeats vertically so it runs through the entire scrollable page.
 */
import edgeDoodle from '@/assets/edge-doodle.png';

const EdgeDoodleOverlay = () => {
  // Width of each edge column — scales down on small screens
  const columnStyle: React.CSSProperties = {
    backgroundImage: `url(${edgeDoodle})`,
    backgroundRepeat: 'repeat-y',
    backgroundSize: '100% auto',
    backgroundPosition: 'top center',
    opacity: 0.85,
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Left edge */}
      <div
        className="absolute top-0 left-0 h-full w-[120px] sm:w-[160px] md:w-[200px]"
        style={columnStyle}
      />
      {/* Right edge — mirrored */}
      <div
        className="absolute top-0 right-0 h-full w-[120px] sm:w-[160px] md:w-[200px]"
        style={{ ...columnStyle, transform: 'scaleX(-1)' }}
      />
    </div>
  );
};

export default EdgeDoodleOverlay;
