import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ta' | 'hi';

type Translations = Record<string, Record<Language, string>>;

const translations: Translations = {
  // Hero
  'hero.invite': { en: 'With Joy & Love, We Invite You to Celebrate', ta: 'மகிழ்ச்சியுடனும் அன்புடனும், கொண்டாட உங்களை அழைக்கிறோம்', hi: 'खुशी और प्यार के साथ, हम आपको उत्सव में आमंत्रित करते हैं' },
  'hero.honour': { en: 'Request the honour of your presence', ta: 'உங்கள் வருகையை கோருகிறோம்', hi: 'आपकी उपस्थिति का सम्मान चाहते हैं' },
  'hero.scroll': { en: 'Scroll', ta: 'உருட்டவும்', hi: 'स्क्रॉल करें' },
  'hero.time': { en: '8:30 AM · Salem, Tamil Nadu', ta: '8:30 AM · சேலம், தமிழ்நாடு', hi: '8:30 AM · सलेम, तमिलनाडु' },
  'hero.venue': { en: 'Sri Krishna Mahal Mantapa', ta: 'ஸ்ரீ கிருஷ்ணா மஹால் மண்டபம்', hi: 'श्री कृष्णा महल मंटपा' },

  // Countdown
  'countdown.days': { en: 'DAYS', ta: 'நாட்கள்', hi: 'दिन' },
  'countdown.hours': { en: 'HOURS', ta: 'மணி', hi: 'घंटे' },
  'countdown.min': { en: 'MIN', ta: 'நிமி', hi: 'मिनट' },
  'countdown.sec': { en: 'SEC', ta: 'வினா', hi: 'सेकंड' },
  'countdown.until': { en: 'until the big day', ta: 'பெரிய நாளுக்கு', hi: 'बड़े दिन तक' },

  // Timeline
  'timeline.header.date': { en: '29th November 2026 · Salem, Tamil Nadu', ta: '29 நவம்பர் 2026 · சேலம், தமிழ்நாடு', hi: '29 नवंबर 2026 · सलेम, तमिलनाडु' },
  'timeline.header.title': { en: 'The Wedding Day', ta: 'திருமண நாள்', hi: 'विवाह दिवस' },
  'timeline.header.venue': { en: 'Sri Krishna Mahal Mantapa', ta: 'ஸ்ரீ கிருஷ்ணா மஹால் மண்டபம்', hi: 'श्री कृष्णा महल मंटपा' },
  'timeline.reception.date': { en: '6th December 2026', ta: '6 டிசம்பர் 2026', hi: '6 दिसंबर 2026' },
  'timeline.reception.time': { en: '7:00 PM onwards', ta: 'மாலை 7:00 மணி முதல்', hi: 'शाम 7:00 बजे से' },
  'timeline.reception.title': { en: 'Reception', ta: 'வரவேற்பு', hi: 'स्वागत समारोह' },
  'timeline.reception.location': { en: 'Jabalpur, Madhya Pradesh', ta: 'ஜபல்பூர், மத்தியப் பிரதேசம்', hi: 'जबलपुर, मध्य प्रदेश' },

  // Timeline events
  'event.naandi.name': { en: 'Naandi', ta: 'நாந்தி', hi: 'नांदी' },
  'event.naandi.desc': { en: 'Ancestral blessings invoked to sanctify the wedding day', ta: 'திருமண நாளை புனிதமாக்க மூதாதையர் ஆசிகள் வேண்டப்படுகின்றன', hi: 'विवाह दिवस को पवित्र करने के लिए पूर्वजों का आशीर्वाद' },
  'event.kashi.name': { en: 'Kashi Yatra', ta: 'காசி யாத்திரை', hi: 'काशी यात्रा' },
  'event.kashi.desc': { en: "The groom's playful pilgrimage — stopped by the bride's father", ta: 'மணமகனின் விளையாட்டுப் பயணம் — மணமகளின் தந்தையால் தடுக்கப்படுகிறது', hi: 'दूल्हे की चंचल तीर्थयात्रा — दुल्हन के पिता द्वारा रोकी गई' },
  'event.muhurtham.name': { en: 'Muhurtham', ta: 'முகூர்த்தம்', hi: 'मुहूर्तम' },
  'event.muhurtham.desc': { en: 'The sacred moment — tying of the thali around the sacred fire', ta: 'புனித தருணம் — புனித அக்னியில் தாலி கட்டுதல்', hi: 'पवित्र क्षण — पवित्र अग्नि के चारों ओर थाली बांधना' },
  'event.oonjal.name': { en: 'Oonjal', ta: 'ஊஞ்சல்', hi: 'ऊंजल' },
  'event.oonjal.desc': { en: 'The swing ceremony — the couple seated together as families sing', ta: 'ஊஞ்சல் விழா — குடும்பங்கள் பாடும்போது தம்பதி ஒன்றாக அமர்ந்திருப்பர்', hi: 'झूले की रस्म — परिवार के गाने के साथ जोड़ा बैठता है' },
  'event.saptapadi.name': { en: 'Saptapadi', ta: 'சப்தபதி', hi: 'सप्तपदी' },
  'event.saptapadi.desc': { en: 'Seven sacred steps — seven vows for a lifetime together', ta: 'ஏழு புனித அடிகள் — வாழ்நாள் முழுவதும் ஏழு உறுதிமொழிகள்', hi: 'सात पवित्र कदम — जीवनभर साथ रहने के सात वचन' },
  'event.aashirvadham.name': { en: 'Aashirvadham', ta: 'ஆசீர்வாதம்', hi: 'आशीर्वादम' },
  'event.aashirvadham.desc': { en: 'Elders bless the couple as husband and wife', ta: 'பெரியவர்கள் கணவன் மனைவியாக ஆசீர்வதிக்கின்றனர்', hi: 'बड़े-बुजुर्ग पति-पत्नी को आशीर्वाद देते हैं' },
  'event.virundhu.name': { en: 'Virundhu', ta: 'விருந்து', hi: 'विरुंधु' },
  'event.virundhu.desc': { en: 'Traditional feast served on banana leaf for all guests', ta: 'அனைத்து விருந்தினர்களுக்கும் வாழை இலையில் பாரம்பரிய விருந்து', hi: 'सभी मेहमानों के लिए केले के पत्ते पर पारंपरिक भोज' },

  // Venue sections
  'venue.ceremony.subtitle': { en: 'The sacred ceremony will take place at', ta: 'புனிதமான விழா நடைபெறும் இடம்', hi: 'पवित्र समारोह यहाँ होगा' },
  'venue.ceremony.location': { en: 'Salem, Tamil Nadu', ta: 'சேலம், தமிழ்நாடு', hi: 'सलेम, तमिलनाडु' },
  'venue.ceremony.datetime': { en: '29th November 2026 · 8:30 AM', ta: '29 நவம்பர் 2026 · காலை 8:30', hi: '29 नवंबर 2026 · सुबह 8:30' },
  'venue.maps': { en: 'View on Maps', ta: 'வரைபடத்தில் காண்க', hi: 'मानचित्र पर देखें' },
  'venue.reception.subtitle': { en: 'The wedding reception', ta: 'திருமண வரவேற்பு', hi: 'विवाह स्वागत समारोह' },
  'venue.reception.title': { en: 'Reception Celebration', ta: 'வரவேற்பு விழா', hi: 'स्वागत समारोह' },
  'venue.reception.location': { en: 'Jabalpur, Madhya Pradesh', ta: 'ஜபல்பூர், மத்தியப் பிரதேசம்', hi: 'जबलपुर, मध्य प्रदेश' },
  'venue.reception.datetime': { en: '6th December 2026 · 7:00 PM onwards', ta: '6 டிசம்பர் 2026 · மாலை 7:00 முதல்', hi: '6 दिसंबर 2026 · शाम 7:00 बजे से' },

  // Dress code
  'dress.title': { en: 'Dress Code', ta: 'உடையமைப்பு', hi: 'ड्रेस कोड' },
  'dress.desc': { en: 'We invite you to dress in traditional attire to celebrate this special day with us.', ta: 'இந்த சிறப்பு நாளை எங்களுடன் கொண்டாட பாரம்பரிய உடையணிய அழைக்கிறோம்.', hi: 'हम आपको इस विशेष दिन को हमारे साथ मनाने के लिए पारंपरिक पोशाक पहनने के लिए आमंत्रित करते हैं।' },
  'dress.formal': { en: 'Traditional Attire', ta: 'பாரம்பரிய உடை', hi: 'पारंपरिक पोशाक' },
  'dress.nowhite': { en: 'Please avoid wearing white', ta: 'வெள்ளை நிற உடை தவிர்க்கவும்', hi: 'कृपया सफेद पहनने से बचें' },

  // Gifts
  'gifts.registry': { en: 'Wedding Registry', ta: 'திருமண பதிவேடு', hi: 'विवाह रजिस्ट्री' },
  'gifts.title': { en: 'Gifts', ta: 'பரிசுகள்', hi: 'उपहार' },
  'gifts.desc': { en: 'Your presence is the best gift we could receive. However, if you wish to contribute to our new life together, you can do so via bank transfer.', ta: 'உங்கள் வருகையே எங்களுக்கு கிடைக்கக்கூடிய சிறந்த பரிசு. இருப்பினும், எங்கள் புதிய வாழ்க்கைக்கு பங்களிக்க விரும்பினால், வங்கி மாற்றம் மூலம் செய்யலாம்.', hi: 'आपकी उपस्थिति ही हमारे लिए सबसे बड़ा उपहार है। हालांकि, यदि आप हमारे नए जीवन में योगदान देना चाहते हैं, तो बैंक ट्रांसफर के माध्यम से कर सकते हैं।' },
  'gifts.love': { en: 'With all our love', ta: 'எங்கள் முழு அன்புடன்', hi: 'हमारे सारे प्यार के साथ' },
  'gifts.bank': { en: 'Bank Details', ta: 'வங்கி விவரங்கள்', hi: 'बैंक विवरण' },

  // Transport
  'transport.subtitle': { en: 'Getting There', ta: 'எப்படி வருவது', hi: 'कैसे पहुँचें' },
  'transport.title': { en: 'Transport', ta: 'போக்குவரத்து', hi: 'परिवहन' },
  'transport.desc': { en: 'A private bus will be available for guests departing from Piazza della Signoria, Florence.', ta: 'பியாஸா டெல்லா சிக்னோரியா, புளோரன்ஸிலிருந்து புறப்படும் விருந்தினர்களுக்கு தனியார் பேருந்து கிடைக்கும்.', hi: 'पियाज़ा डेला सिग्नोरिया, फ्लोरेंस से जाने वाले मेहमानों के लिए एक निजी बस उपलब्ध होगी।' },
  'transport.departure': { en: 'Departure', ta: 'புறப்பாடு', hi: 'प्रस्थान' },
  'transport.return': { en: 'Return', ta: 'திரும்புதல்', hi: 'वापसी' },
  'transport.rsvpnote': { en: 'Please indicate in your RSVP if you need transport.', ta: 'போக்குவரத்து தேவைப்பட்டால் உங்கள் RSVP இல் குறிப்பிடவும்.', hi: 'यदि आपको परिवहन की आवश्यकता है तो कृपया अपने RSVP में बताएं।' },

  // RSVP
  'rsvp.title': { en: 'Join Us in Celebration', ta: 'கொண்டாட்டத்தில் எங்களுடன் சேருங்கள்', hi: 'उत्सव में हमारे साथ शामिल हों' },
  'rsvp.name': { en: 'Full Name *', ta: 'முழு பெயர் *', hi: 'पूरा नाम *' },
  'rsvp.namePlaceholder': { en: 'Your name', ta: 'உங்கள் பெயர்', hi: 'आपका नाम' },
  'rsvp.email': { en: 'Email *', ta: 'மின்னஞ்சல் *', hi: 'ईमेल *' },
  'rsvp.event': { en: 'Which event will you attend? *', ta: 'எந்த நிகழ்வில் கலந்துகொள்வீர்கள்? *', hi: 'आप किस कार्यक्रम में शामिल होंगे? *' },
  'rsvp.salem': { en: 'Salem Wedding — 29th Nov 2026', ta: 'சேலம் திருமணம் — 29 நவம்பர் 2026', hi: 'सलेम विवाह — 29 नवंबर 2026' },
  'rsvp.jabalpur': { en: 'Jabalpur Reception — 6th Dec 2026', ta: 'ஜபல்பூர் வரவேற்பு — 6 டிசம்பர் 2026', hi: 'जबलपुर स्वागत — 6 दिसंबर 2026' },
  'rsvp.both': { en: 'Both Celebrations', ta: 'இரண்டு கொண்டாட்டங்களும்', hi: 'दोनों समारोह' },
  'rsvp.attend': { en: 'Will you attend? *', ta: 'நீங்கள் கலந்துகொள்வீர்களா? *', hi: 'क्या आप शामिल होंगे? *' },
  'rsvp.yes': { en: "Yes, I'll be there!", ta: 'ஆம், நான் வருவேன்!', hi: 'हाँ, मैं आऊँगा/आऊँगी!' },
  'rsvp.no': { en: "No, I can't make it", ta: 'இல்லை, என்னால் வர இயலாது', hi: 'नहीं, मैं नहीं आ सकता/सकती' },
  'rsvp.message': { en: 'Message For The Couple (Optional)', ta: 'தம்பதிக்கு செய்தி (விரும்பினால்)', hi: 'जोड़े के लिए संदेश (वैकल्पिक)' },
  'rsvp.messagePlaceholder': { en: 'Write us a few words...', ta: 'எங்களுக்கு சில வார்த்தைகள் எழுதுங்கள்...', hi: 'हमें कुछ शब्द लिखें...' },
  'rsvp.confirm': { en: 'Confirm', ta: 'உறுதிசெய்', hi: 'पुष्टि करें' },
  'rsvp.cantwait': { en: "We can't wait to celebrate with you", ta: 'உங்களுடன் கொண்டாட ஆவலுடன் காத்திருக்கிறோம்', hi: 'हम आपके साथ जश्न मनाने के लिए बेताब हैं' },

  // Thank you
  'thankyou.title': { en: 'Thank You', ta: 'நன்றி', hi: 'धन्यवाद' },
  'thankyou.desc': { en: 'For joining us on this special day.\nYour presence is the best gift we could receive.', ta: 'இந்த சிறப்பு நாளில் எங்களுடன் சேர்ந்ததற்கு.\nஉங்கள் வருகையே எங்களுக்கு கிடைக்கும் சிறந்த பரிசு.', hi: 'इस विशेष दिन पर हमारे साथ शामिल होने के लिए।\nआपकी उपस्थिति ही सबसे बड़ा उपहार है।' },

  // Footer
  'footer.blessing': { en: '"May your home be filled with laughter, your hearts with love"', ta: '"உங்கள் இல்லம் சிரிப்பாலும், உங்கள் இதயங்கள் அன்பாலும் நிரம்பட்டும்"', hi: '"आपका घर हंसी से भरा हो, आपके दिल प्यार से"' },
  'footer.crafted': { en: 'Crafted with love · 2026', ta: 'அன்புடன் உருவாக்கப்பட்டது · 2026', hi: 'प्यार से बनाया · 2026' },

  // Curtain
  'curtain.tap': { en: 'Tap to open', ta: 'திறக்க தட்டவும்', hi: 'खोलने के लिए टैप करें' },
  'curtain.click': { en: 'Click to open', ta: 'திறக்க கிளிக் செய்யவும்', hi: 'खोलने के लिए क्लिक करें' },

  // Menu section
  'menu.title': { en: 'Wedding Feast', ta: 'திருமண விருந்து', hi: 'विवाह भोज' },
  'menu.subtitle': { en: 'THE MENU', ta: 'பட்டியல்', hi: 'मेनू' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
