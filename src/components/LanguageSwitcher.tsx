import { useLanguage, Language } from '@/contexts/LanguageContext';

const langs: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'hi', label: 'हिंदी' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="pointer-events-auto flex items-center rounded-full overflow-hidden"
      style={{
        background: 'rgba(34,51,72,0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(171,138,59,0.3)',
        padding: '3px',
      }}
    >
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLanguage(l.code)}
          className="transition-all duration-300"
          style={{
            padding: '5px 10px',
            borderRadius: '20px',
            fontSize: '10px',
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: '0.05em',
            fontWeight: language === l.code ? 600 : 400,
            background: language === l.code ? 'rgba(171,138,59,0.2)' : 'transparent',
            color: language === l.code ? '#AB8A3B' : 'rgba(246,240,230,0.6)',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
