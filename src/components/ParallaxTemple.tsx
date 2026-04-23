import { motion } from 'framer-motion';
import templeGopuram from '@/assets/temple-gopuram.png';

/**
 * Elegant temple reveal
 * - Soft warm halo fades in behind the gopuram
 * - Temple rises and scales gently into view
 * - Subtle continuous float once settled
 */
export default function ParallaxTemple({
  caption = 'Sri Krishna Mahal Mantapa, Salem',
}: {
  caption?: string;
}) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto 16px',
        textAlign: 'center',
        padding: '24px 16px 8px',
      }}
    >
      {/* Warm halo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '52%',
          width: '340px',
          height: '340px',
          marginLeft: '-170px',
          marginTop: '-170px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(232,101,26,0.16) 0%, rgba(212,160,23,0.08) 45%, rgba(246,240,230,0) 72%)',
          pointerEvents: 'none',
        }}
      />

      {/* Temple — rises in, then floats subtly forever */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative' }}
      >
        <motion.img
          src={templeGopuram}
          alt="South Indian temple gopuram"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            width: '70%',
            maxWidth: '360px',
            display: 'block',
            margin: '0 auto',
            filter: 'drop-shadow(0 14px 22px rgba(34,51,72,0.18))',
          }}
        />
      </motion.div>

      {caption && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '13px',
            color: '#7397A8',
            marginTop: '12px',
          }}
        >
          {caption}
        </motion.p>
      )}
    </div>
  );
}
