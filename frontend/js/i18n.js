/* RoamLocal – Languages, Currencies & Global Config */

const LANGS = [
  { code: "en", name: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  { code: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "zh", name: "中文", flag: "🇨🇳", dir: "ltr" },
  { code: "ja", name: "日本語", flag: "🇯🇵", dir: "ltr" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩", dir: "ltr" },
  { code: "pt", name: "Português", flag: "🇧🇷", dir: "ltr" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳", dir: "ltr" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳", dir: "ltr" }
];

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 83.5 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 149 },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", rate: 7.2 },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah", rate: 15600 },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", rate: 5.0 },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", rate: 3.67 },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal", rate: 3.75 },
  { code: "MXN", symbol: "$", name: "Mexican Peso", rate: 17.1 },
  { code: "THB", symbol: "฿", name: "Thai Baht", rate: 35.5 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.53 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 1.36 }
];

/* Approximate FX rates vs USD for demo display only */
function formatPrice(usdAmount, currencyCode) {
  const cur = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];
  const val = usdAmount * cur.rate;
  if (cur.code === "JPY" || cur.code === "IDR" || cur.code === "INR") {
    return cur.symbol + Math.round(val).toLocaleString();
  }
  return cur.symbol + val.toFixed(cur.code === "USD" || cur.code === "EUR" || cur.code === "GBP" ? 0 : 0);
}

const T = {
  en: {
    brand: "RoamLocal",
    nav_home: "Home", nav_explore: "Explore", nav_planner: "Build ur journey", nav_map: "Hidden Gems Map", nav_impact: "My Impact", nav_signin: "Sign in", nav_build: "Build ur journey",
    hero_badge: "AI-powered · Community-first · Low-crowd travel",
    hero_title: "Travel beyond the crowded places.",
    hero_sub: "Discover authentic local experiences, support communities, and explore responsibly with AI.",
    hero_search: "Where do you want to explore responsibly?",
    hero_cta1: "Build ur journey", hero_cta2: "Explore Hidden Gems",
    stats_biz: "Local businesses supported", stats_gems: "Hidden destinations", stats_carbon: "Est. carbon saved", stats_travelers: "Responsible travelers",
    sample_title: "See what an AI journey looks like", sample_sub: "Personalized for budget, interests, accessibility and sustainability.",
    sample_label: "AI-generated sample · Demo data only", sample_link: "Create your own journey",
    why_title: "Why RoamLocal?", why_sub: "Built to solve overcrowding and help every traveler find authentic local experiences worldwide.",
    why1: "Build ur journey", why1d: "Personalized day-by-day plans based on budget, interests, mobility and sustainability.",
    why2: "Hidden Gems Map", why2d: "Lesser-known attractions and local businesses with transparent impact scores.",
    why3: "Crowd Dashboard", why3d: "See estimated crowd levels and get quieter alternatives nearby.",
    why4: "Local Guides", why4d: "Verified local guides and small businesses. Money stays in the community.",
    why5: "Local Impact Score", why5d: "Clear 0–100 score for ownership, environment and distance from crowds.",
    why6: "Safety & Access", why6d: "Emergency contacts, accessibility info, and share-itinerary features.",
    featured: "Featured Hidden Gems", featured_sub: "Experiences with high local impact around the world",
    voices: "Voices from the road & the community",
    cta_title: "Your next meaningful journey starts here.", cta_sub: "Support local communities, avoid the crowds, travel with purpose.",
    from: "from", impact: "Impact", crowd: "Crowd", low: "low", medium: "medium", high: "high",
    planner_title: "Build a responsible journey", planner_sub: "Answer a few questions. We generate a plan focused on hidden gems and local impact.",
    how: "How it works", how1: "Tell us destination, budget, days and interests", how2: "Set mobility needs and sustainability preference", how3: "Receive a personalized journey (demo sample data)",
    start: "Start planning", dest: "Destination", budget: "Budget", duration: "Duration (days)", interests: "Interests",
    mobility: "Mobility needs", sustain: "Sustainability priority", generate: "Build ur journey", back: "Back",
    crafting: "Crafting your journey…", regenerate: "Regenerate", view_map: "View on map", edit: "Edit preferences",
    ai_warn: "AI-generated sample journey. This demo uses mock data only. Real-time prices and crowds are not available.",
    explore_title: "Explore Hidden Gems", explore_sub: "Lesser-known experiences worldwide with local impact scores",
    search: "Search experiences…", map_title: "Hidden Gems Map", map_sub: "Interactive map · Sample locations worldwide",
    dash_title: "Sustainability & Impact Dashboard", dash_sub: "Your contribution and crowd insights (sample data)",
    points: "Impact points", businesses: "Local businesses", co2: "Est. CO₂ avoided", level: "Responsible Traveler",
    crowd_snap: "Live Crowd Snapshot", badges: "Your badges", tips: "Travel tips", emergency: "Emergency & Accessibility",
    book: "Request / Book experience", report: "Report incorrect information", sent: "Request sent!",
    signin: "Sign in", create: "Create account", welcome: "Welcome to RoamLocal",
    lang: "Language", currency: "Currency", country: "Country / Region",
    days: "days", day: "Day", total: "Total", sustain_label: "Sustain."
  },
  hi: {
    brand: "RoamLocal",
    nav_home: "होम", nav_explore: "खोजें", nav_planner: "यात्रा बनाएं", nav_map: "छुपे रत्न मानचित्र", nav_impact: "मेरा प्रभाव", nav_signin: "साइन इन", nav_build: "यात्रा बनाएं",
    hero_badge: "AI · समुदाय-पहले · कम भीड़ यात्रा",
    hero_title: "भीड़ भरी जगहों से आगे यात्रा करें।",
    hero_sub: "प्रामाणिक स्थानीय अनुभव खोजें, समुदायों का समर्थन करें, और AI के साथ जिम्मेदारी से घूमें।",
    hero_search: "आप जिम्मेदारी से कहाँ घूमना चाहते हैं?",
    hero_cta1: "यात्रा बनाएं", hero_cta2: "छुपे रत्न देखें",
    stats_biz: "समर्थित स्थानीय व्यवसाय", stats_gems: "छुपे गंतव्य", stats_carbon: "अनुमानित कार्बन बचत", stats_travelers: "जिम्मेदार यात्री",
    sample_title: "AI यात्रा योजना कैसी दिखती है", sample_sub: "बजट, रुचियों और स्थिरता के अनुसार व्यक्तिगत।",
    sample_label: "AI नमूना · केवल डेमो डेटा", sample_link: "अपनी योजना बनाएं",
    why_title: "RoamLocal क्यों?", why_sub: "भीड़ कम करने और दुनिया भर में प्रामाणिक अनुभव खोजने के लिए।",
    why1: "AI यात्रा योजनाकार", why1d: "बजट, रुचि और स्थिरता के आधार पर दिन-प्रतिदिन की योजना।",
    why2: "छुपे रत्न मानचित्र", why2d: "कम जाने गए स्थान और स्थानीय व्यवसाय, प्रभाव स्कोर के साथ।",
    why3: "भीड़ डैशबोर्ड", why3d: "अनुमानित भीड़ देखें और शांत विकल्प पाएं।",
    why4: "स्थानीय गाइड", why4d: "सत्यापित स्थानीय गाइड। पैसा समुदाय में रहता है।",
    why5: "स्थानीय प्रभाव स्कोर", why5d: "0–100 स्कोर: स्वामित्व, पर्यावरण, भीड़ से दूरी।",
    why6: "सुरक्षा व पहुँच", why6d: "आपातकालीन संपर्क और पहुँच संबंधी जानकारी।",
    featured: "विशेष छुपे रत्न", featured_sub: "दुनिया भर में उच्च प्रभाव वाले अनुभव",
    voices: "यात्रियों और समुदाय की आवाज़ें",
    cta_title: "आपकी अगली सार्थक यात्रा यहीं से शुरू होती है।", cta_sub: "स्थानीय समुदायों का समर्थन करें, भीड़ से बचें।",
    from: "से", impact: "प्रभाव", crowd: "भीड़", low: "कम", medium: "मध्यम", high: "अधिक",
    planner_title: "जिम्मेदार यात्रा योजना बनाएं", planner_sub: "कुछ प्रश्न उत्तर दें। हम छुपे रत्नों पर केंद्रित योजना बनाते हैं।",
    how: "कैसे काम करता है", how1: "गंतव्य, बजट, दिन और रुचियाँ बताएं", how2: "गतिशीलता और स्थिरता प्राथमिकता सेट करें", how3: "व्यक्तिगत यात्रा योजना प्राप्त करें",
    start: "योजना शुरू करें", dest: "गंतव्य", budget: "बजट", duration: "अवधि (दिन)", interests: "रुचियाँ",
    mobility: "गतिशीलता आवश्यकताएँ", sustain: "स्थिरता प्राथमिकता", generate: "योजना बनाएं", back: "वापस",
    crafting: "आपकी योजना बन रही है…", regenerate: "फिर बनाएं", view_map: "मानचित्र पर देखें", edit: "वरीयताएँ बदलें",
    ai_warn: "AI-जनित नमूना यात्रा। केवल डेमो डेटा। वास्तविक कीमतें उपलब्ध नहीं।",
    explore_title: "छुपे रत्न खोजें", explore_sub: "दुनिया भर के कम जाने गए अनुभव",
    search: "अनुभव खोजें…", map_title: "छुपे रत्न मानचित्र", map_sub: "इंटरैक्टिव मानचित्र · नमूना स्थान",
    dash_title: "स्थिरता और प्रभाव डैशबोर्ड", dash_sub: "आपका योगदान (नमूना डेटा)",
    points: "प्रभाव अंक", businesses: "स्थानीय व्यवसाय", co2: "अनुमानित CO₂ बचत", level: "जिम्मेदार यात्री",
    crowd_snap: "भीड़ स्नैपशॉट", badges: "आपके बैज", tips: "यात्रा सुझाव", emergency: "आपातकाल व पहुँच",
    book: "अनुभव बुक / अनुरोध करें", report: "गलत जानकारी रिपोर्ट करें", sent: "अनुरोध भेजा गया!",
    signin: "साइन इन", create: "खाता बनाएं", welcome: "RoamLocal में आपका स्वागत है",
    lang: "भाषा", currency: "मुद्रा", country: "देश / क्षेत्र",
    days: "दिन", day: "दिन", total: "कुल", sustain_label: "स्थिरता"
  },
  te: {
    brand: "RoamLocal",
    nav_home: "హోమ్", nav_explore: "అన్వేషించండి", nav_planner: "AI ప్రయాణ ప్రణాళిక", nav_map: "దాగిన రత్నాల మ్యాప్", nav_impact: "నా ప్రభావం", nav_signin: "సైన్ ఇన్", nav_build: "ప్రయాణం రూపొందించండి",
    hero_badge: "AI · సమాజం-ముందు · తక్కువ గుంపు ప్రయాణం",
    hero_title: "గుంపులుగా ఉన్న ప్రదేశాలకు మించి ప్రయాణించండి.",
    hero_sub: "నిజమైన స్థానిక అనుభవాలను కనుగొనండి, సమాజాలకు మద్దతు ఇవ్వండి, AIతో బాధ్యతగా అన్వేషించండి.",
    hero_search: "మీరు బాధ్యతగా ఎక్కడ అన్వేషించాలనుకుంటున్నారు?",
    hero_cta1: "ప్రయాణం రూపొందించండి", hero_cta2: "దాగిన రత్నాలు చూడండి",
    stats_biz: "మద్దతు పొందిన స్థానిక వ్యాపారాలు", stats_gems: "దాగిన గమ్యస్థానాలు", stats_carbon: "అంచనా కార్బన్ ఆదా", stats_travelers: "బాధ్యతాయుత ప్రయాణికులు",
    sample_title: "AI ప్రయాణ ప్రణాళిక ఎలా ఉంటుంది", sample_sub: "బడ్జెట్, ఆసక్తులు, స్థిరత్వం ఆధారంగా వ్యక్తిగతం.",
    sample_label: "AI నమూనా · డెమో డేటా మాత్రమే", sample_link: "మీ ప్రణాళిక సృష్టించండి",
    why_title: "RoamLocal ఎందుకు?", why_sub: "గుంపులను తగ్గించి ప్రపంచవ్యాప్తంగా నిజమైన అనుభవాలు కనుగొనడానికి.",
    why1: "AI ప్రయాణ ప్రణాళిక", why1d: "బడ్జెట్, ఆసక్తి, స్థిరత్వం ఆధారంగా రోజువారీ ప్రణాళిక.",
    why2: "దాగిన రత్నాల మ్యాప్", why2d: "తక్కువగా తెలిసిన ప్రదేశాలు, ప్రభావ స్కోర్లతో.",
    why3: "గుంపు డాష్‌బోర్డ్", why3d: "అంచనా గుంపు స్థాయిలు మరియు ప్రశాంత ప్రత్యామ్నాయాలు.",
    why4: "స్థానిక గైడ్‌లు", why4d: "ధృవీకరించబడిన స్థానిక గైడ్‌లు. డబ్బు సమాజంలోనే ఉంటుంది.",
    why5: "స్థానిక ప్రభావ స్కోర్", why5d: "0–100 స్కోర్: యాజమాన్యం, పర్యావరణం, గుంపు దూరం.",
    why6: "భద్రత & ప్రాప్యత", why6d: "అత్యవసర సంప్రదింపులు మరియు ప్రాప్యత సమాచారం.",
    featured: "ప్రత్యేక దాగిన రత్నాలు", featured_sub: "ప్రపంచవ్యాప్తంగా అధిక ప్రభావ అనుభవాలు",
    voices: "ప్రయాణికులు & సమాజం నుండి స్వరాలు",
    cta_title: "మీ తదుపరి అర్థవంతమైన ప్రయాణం ఇక్కడే మొదలవుతుంది.", cta_sub: "స్థానిక సమాజాలకు మద్దతు, గుంపులు నివారించండి.",
    from: "నుండి", impact: "ప్రభావం", crowd: "గుంపు", low: "తక్కువ", medium: "మధ్యస్థ", high: "ఎక్కువ",
    planner_title: "బాధ్యతాయుత ప్రయాణ ప్రణాళిక", planner_sub: "కొన్ని ప్రశ్నలకు సమాధానం ఇవ్వండి. దాగిన రత్నాలపై దృష్టి పెట్టిన ప్రణాళిక.",
    how: "ఎలా పనిచేస్తుంది", how1: "గమ్యం, బడ్జెట్, రోజులు, ఆసక్తులు చెప్పండి", how2: "చలనం & స్థిరత్వ ప్రాధాన్యత సెట్ చేయండి", how3: "వ్యక్తిగత ప్రణాళిక పొందండి",
    start: "ప్రణాళిక ప్రారంభించండి", dest: "గమ్యస్థానం", budget: "బడ్జెట్", duration: "వ్యవధి (రోజులు)", interests: "ఆసక్తులు",
    mobility: "చలన అవసరాలు", sustain: "స్థిరత్వ ప్రాధాన్యత", generate: "ప్రణాళిక రూపొందించండి", back: "వెనుకకు",
    crafting: "మీ ప్రణాళిక తయారవుతోంది…", regenerate: "మళ్లీ రూపొందించండి", view_map: "మ్యాప్‌లో చూడండి", edit: "అభిరుచులు మార్చండి",
    ai_warn: "AI-జనిత నమూనా ప్రణాళిక. డెమో డేటా మాత్రమే. నిజ-సమయ ధరలు అందుబాటులో లేవు.",
    explore_title: "దాగిన రత్నాలు అన్వేషించండి", explore_sub: "ప్రపంచవ్యాప్తంగా తక్కువగా తెలిసిన అనుభవాలు",
    search: "అనుభవాలు వెతకండి…", map_title: "దాగిన రత్నాల మ్యాప్", map_sub: "ఇంటరాక్టివ్ మ్యాప్ · నమూనా స్థానాలు",
    dash_title: "స్థిరత్వం & ప్రభావ డాష్‌బోర్డ్", dash_sub: "మీ సహకారం (నమూనా డేటా)",
    points: "ప్రభావ పాయింట్లు", businesses: "స్థానిక వ్యాపారాలు", co2: "అంచనా CO₂ ఆదా", level: "బాధ్యతాయుత ప్రయాణికుడు",
    crowd_snap: "గుంపు స్నాప్‌షాట్", badges: "మీ బ్యాడ్జ్‌లు", tips: "ప్రయాణ చిట్కాలు", emergency: "అత్యవసర & ప్రాప్యత",
    book: "అనుభవం బుక్ / అభ్యర్థించండి", report: "తప్పు సమాచారం రిపోర్ట్ చేయండి", sent: "అభ్యర్థన పంపబడింది!",
    signin: "సైన్ ఇన్", create: "ఖాతా సృష్టించండి", welcome: "RoamLocalకు స్వాగతం",
    lang: "భాష", currency: "కరెన్సీ", country: "దేశం / ప్రాంతం",
    days: "రోజులు", day: "రోజు", total: "మొత్తం", sustain_label: "స్థిరత్వం"
  },
  es: {
    brand: "RoamLocal",
    nav_home: "Inicio", nav_explore: "Explorar", nav_planner: "Planificador IA", nav_map: "Mapa de joyas ocultas", nav_impact: "Mi impacto", nav_signin: "Entrar", nav_build: "Crear mi viaje",
    hero_badge: "IA · Comunidad primero · Viajes sin muchedumbres",
    hero_title: "Viaja más allá de los lugares saturados.",
    hero_sub: "Descubre experiencias locales auténticas, apoya comunidades y explora de forma responsable con IA.",
    hero_search: "¿Dónde quieres explorar de forma responsable?",
    hero_cta1: "Crear mi viaje", hero_cta2: "Explorar joyas ocultas",
    stats_biz: "Negocios locales apoyados", stats_gems: "Destinos ocultos", stats_carbon: "Carbono estimado ahorrado", stats_travelers: "Viajeros responsables",
    sample_title: "Así se ve un itinerario con IA", sample_sub: "Personalizado según presupuesto, intereses y sostenibilidad.",
    sample_label: "Muestra generada por IA · Solo datos demo", sample_link: "Crea tu propio itinerario",
    why_title: "¿Por qué RoamLocal?", why_sub: "Para reducir el hacinamiento y encontrar experiencias auténticas en todo el mundo.",
    why1: "Planificador IA", why1d: "Planes día a día según presupuesto, intereses y sostenibilidad.",
    why2: "Mapa de joyas ocultas", why2d: "Atractivos poco conocidos con puntuación de impacto local.",
    why3: "Panel de afluencia", why3d: "Niveles de afluencia estimados y alternativas más tranquilas.",
    why4: "Guías locales", why4d: "Guías verificados. El dinero se queda en la comunidad.",
    why5: "Puntuación de impacto", why5d: "Puntuación 0–100 de propiedad local, ambiente y distancia a muchedumbres.",
    why6: "Seguridad y acceso", why6d: "Contactos de emergencia e información de accesibilidad.",
    featured: "Joyas ocultas destacadas", featured_sub: "Experiencias de alto impacto en todo el mundo",
    voices: "Voces del camino y la comunidad",
    cta_title: "Tu próximo viaje con sentido empieza aquí.", cta_sub: "Apoya comunidades locales, evita las muchedumbres.",
    from: "desde", impact: "Impacto", crowd: "Afluencia", low: "baja", medium: "media", high: "alta",
    planner_title: "Crea un itinerario responsable", planner_sub: "Responde unas preguntas. Generamos un plan centrado en joyas ocultas.",
    how: "Cómo funciona", how1: "Indica destino, presupuesto, días e intereses", how2: "Define movilidad y prioridad de sostenibilidad", how3: "Recibe un itinerario personalizado",
    start: "Empezar a planificar", dest: "Destino", budget: "Presupuesto", duration: "Duración (días)", interests: "Intereses",
    mobility: "Necesidades de movilidad", sustain: "Prioridad de sostenibilidad", generate: "Generar itinerario", back: "Atrás",
    crafting: "Creando tu itinerario…", regenerate: "Regenerar", view_map: "Ver en el mapa", edit: "Editar preferencias",
    ai_warn: "Itinerario de muestra generado por IA. Solo datos demo. No hay precios en tiempo real.",
    explore_title: "Explorar joyas ocultas", explore_sub: "Experiencias poco conocidas en todo el mundo",
    search: "Buscar experiencias…", map_title: "Mapa de joyas ocultas", map_sub: "Mapa interactivo · Ubicaciones de muestra",
    dash_title: "Panel de impacto y sostenibilidad", dash_sub: "Tu contribución (datos de muestra)",
    points: "Puntos de impacto", businesses: "Negocios locales", co2: "CO₂ estimado evitado", level: "Viajero responsable",
    crowd_snap: "Instantánea de afluencia", badges: "Tus insignias", tips: "Consejos de viaje", emergency: "Emergencia y accesibilidad",
    book: "Solicitar / Reservar experiencia", report: "Reportar información incorrecta", sent: "¡Solicitud enviada!",
    signin: "Entrar", create: "Crear cuenta", welcome: "Bienvenido a RoamLocal",
    lang: "Idioma", currency: "Moneda", country: "País / Región",
    days: "días", day: "Día", total: "Total", sustain_label: "Sosten."
  },
  ar: {
    brand: "RoamLocal",
    nav_home: "الرئيسية", nav_explore: "استكشف", nav_planner: "مخطط الرحلة بالذكاء الاصطناعي", nav_map: "خريطة الكنوز المخفية", nav_impact: "أثري", nav_signin: "تسجيل الدخول", nav_build: "أنشئ رحلتي",
    hero_badge: "ذكاء اصطناعي · المجتمع أولاً · سفر بعيد عن الازدحام",
    hero_title: "سافر أبعد من الأماكن المزدحمة.",
    hero_sub: "اكتشف تجارب محلية أصيلة، وادعم المجتمعات، واستكشف بمسؤولية مع الذكاء الاصطناعي.",
    hero_search: "أين تريد الاستكشاف بمسؤولية؟",
    hero_cta1: "أنشئ رحلتي", hero_cta2: "استكشف الكنوز المخفية",
    stats_biz: "أعمال محلية مدعومة", stats_gems: "وجهات مخفية", stats_carbon: "كربون مُوفَّر تقديري", stats_travelers: "مسافرون مسؤولون",
    sample_title: "كيف تبدو خطة رحلة بالذكاء الاصطناعي", sample_sub: "مخصصة حسب الميزانية والاهتمامات والاستدامة.",
    sample_label: "عينة بالذكاء الاصطناعي · بيانات تجريبية فقط", sample_link: "أنشئ خطتك الخاصة",
    why_title: "لماذا RoamLocal؟", why_sub: "للحد من الازدحام واكتشاف تجارب أصيلة حول العالم.",
    why1: "مخطط الرحلة", why1d: "خطط يومية حسب الميزانية والاهتمامات والاستدامة.",
    why2: "خريطة الكنوز", why2d: "أماكن أقل شهرة مع درجات أثر محلي.",
    why3: "لوحة الازدحام", why3d: "مستويات ازدحام تقديرية وبدائل أكثر هدوءاً.",
    why4: "مرشدون محليون", why4d: "مرشدون موثوقون. يبقى المال في المجتمع.",
    why5: "درجة الأثر المحلي", why5d: "درجة من 0 إلى 100 للملكية والبيئة والبعد عن الازدحام.",
    why6: "الأمان والوصول", why6d: "جهات اتصال الطوارئ ومعلومات إمكانية الوصول.",
    featured: "كنوز مخفية مميزة", featured_sub: "تجارب عالية الأثر حول العالم",
    voices: "أصوات من الطريق والمجتمع",
    cta_title: "رحلتك ذات المعنى التالية تبدأ هنا.", cta_sub: "ادعم المجتمعات المحلية وتجنب الازدحام.",
    from: "من", impact: "الأثر", crowd: "الازدحام", low: "منخفض", medium: "متوسط", high: "مرتفع",
    planner_title: "أنشئ خطة رحلة مسؤولة", planner_sub: "أجب عن بعض الأسئلة. نُنشئ خطة تركز على الكنوز المخفية.",
    how: "كيف يعمل", how1: "أخبرنا بالوجهة والميزانية والأيام والاهتمامات", how2: "حدد احتياجات التنقل وأولوية الاستدامة", how3: "احصل على خطة مخصصة",
    start: "ابدأ التخطيط", dest: "الوجهة", budget: "الميزانية", duration: "المدة (أيام)", interests: "الاهتمامات",
    mobility: "احتياجات التنقل", sustain: "أولوية الاستدامة", generate: "إنشاء الخطة", back: "رجوع",
    crafting: "جارٍ إعداد خطتك…", regenerate: "إعادة التوليد", view_map: "عرض على الخريطة", edit: "تعديل التفضيلات",
    ai_warn: "خطة عينة بالذكاء الاصطناعي. بيانات تجريبية فقط. لا توجد أسعار فورية.",
    explore_title: "استكشف الكنوز المخفية", explore_sub: "تجارب أقل شهرة حول العالم",
    search: "ابحث عن تجارب…", map_title: "خريطة الكنوز المخفية", map_sub: "خريطة تفاعلية · مواقع تجريبية",
    dash_title: "لوحة الاستدامة والأثر", dash_sub: "مساهمتك (بيانات تجريبية)",
    points: "نقاط الأثر", businesses: "أعمال محلية", co2: "تقدير تجنب CO₂", level: "مسافر مسؤول",
    crowd_snap: "لقطة الازدحام", badges: "شاراتك", tips: "نصائح السفر", emergency: "الطوارئ والوصول",
    book: "طلب / حجز التجربة", report: "الإبلاغ عن معلومات خاطئة", sent: "تم إرسال الطلب!",
    signin: "تسجيل الدخول", create: "إنشاء حساب", welcome: "مرحباً بك في RoamLocal",
    lang: "اللغة", currency: "العملة", country: "البلد / المنطقة",
    days: "أيام", day: "اليوم", total: "المجموع", sustain_label: "استدامة"
  },
  zh: {
    brand: "RoamLocal",
    nav_home: "首页", nav_explore: "探索", nav_planner: "AI行程规划", nav_map: "隐藏瑰宝地图", nav_impact: "我的影响", nav_signin: "登录", nav_build: "规划行程",
    hero_badge: "AI驱动 · 社区优先 · 低人流旅行",
    hero_title: "走出人满为患的景点。",
    hero_sub: "发现真实的在地体验，支持社区，用AI负责任地探索。",
    hero_search: "您想负责任地探索哪里？",
    hero_cta1: "规划行程", hero_cta2: "探索隐藏瑰宝",
    stats_biz: "支持的本地商家", stats_gems: "隐藏目的地", stats_carbon: "预估碳减排", stats_travelers: "负责任旅行者",
    sample_title: "AI行程示例", sample_sub: "根据预算、兴趣与可持续性个性化。",
    sample_label: "AI生成示例 · 仅演示数据", sample_link: "创建您的行程",
    why_title: "为什么选择 RoamLocal？", why_sub: "缓解人流过载，发现全球真实在地体验。",
    why1: "AI行程规划", why1d: "按预算、兴趣与可持续性生成每日计划。",
    why2: "隐藏瑰宝地图", why2d: "小众景点与本地商家，附影响评分。",
    why3: "人流看板", why3d: "预估人流并推荐更安静的替代选择。",
    why4: "本地向导", why4d: "认证本地向导，收益留在社区。",
    why5: "本地影响评分", why5d: "0–100分：所有权、环境、远离人流。",
    why6: "安全与无障碍", why6d: "紧急联系与无障碍信息。",
    featured: "精选隐藏瑰宝", featured_sub: "全球高影响体验",
    voices: "来自旅途与社区的声音",
    cta_title: "您有意义的下一段旅程从这里开始。", cta_sub: "支持本地社区，避开人潮。",
    from: "起", impact: "影响", crowd: "人流", low: "低", medium: "中", high: "高",
    planner_title: "规划负责任的行程", planner_sub: "回答几个问题，我们生成聚焦隐藏瑰宝的计划。",
    how: "如何运作", how1: "告诉我们目的地、预算、天数与兴趣", how2: "设置行动能力与可持续优先度", how3: "获得个性化行程",
    start: "开始规划", dest: "目的地", budget: "预算", duration: "天数", interests: "兴趣",
    mobility: "行动需求", sustain: "可持续优先", generate: "生成行程", back: "返回",
    crafting: "正在生成行程…", regenerate: "重新生成", view_map: "在地图查看", edit: "修改偏好",
    ai_warn: "AI生成示例行程。仅演示数据。无实时价格。",
    explore_title: "探索隐藏瑰宝", explore_sub: "全球小众体验",
    search: "搜索体验…", map_title: "隐藏瑰宝地图", map_sub: "互动地图 · 示例地点",
    dash_title: "可持续与影响看板", dash_sub: "您的贡献（演示数据）",
    points: "影响积分", businesses: "本地商家", co2: "预估减少CO₂", level: "负责任旅行者",
    crowd_snap: "人流快照", badges: "您的徽章", tips: "旅行提示", emergency: "紧急与无障碍",
    book: "预约 / 申请体验", report: "举报错误信息", sent: "申请已发送！",
    signin: "登录", create: "创建账户", welcome: "欢迎来到 RoamLocal",
    lang: "语言", currency: "货币", country: "国家 / 地区",
    days: "天", day: "第", total: "合计", sustain_label: "可持续"
  },
  id: {
    brand: "RoamLocal",
    nav_home: "Beranda", nav_explore: "Jelajahi", nav_planner: "Perencana AI", nav_map: "Peta Permata Tersembunyi", nav_impact: "Dampak Saya", nav_signin: "Masuk", nav_build: "Buat Perjalanan",
    hero_badge: "AI · Komunitas dulu · Perjalanan minim kerumunan",
    hero_title: "Bepergian melampaui tempat yang ramai.",
    hero_sub: "Temukan pengalaman lokal autentik, dukung komunitas, dan jelajahi secara bertanggung jawab dengan AI.",
    hero_search: "Ke mana Anda ingin menjelajah secara bertanggung jawab?",
    hero_cta1: "Buat Perjalanan", hero_cta2: "Jelajahi Permata Tersembunyi",
    stats_biz: "Bisnis lokal didukung", stats_gems: "Destinasi tersembunyi", stats_carbon: "Perkiraan karbon dihemat", stats_travelers: "Pelancong bertanggung jawab",
    sample_title: "Seperti apa itinerary AI", sample_sub: "Dipersonalisasi menurut anggaran, minat, dan keberlanjutan.",
    sample_label: "Contoh AI · Hanya data demo", sample_link: "Buat itinerary Anda",
    why_title: "Mengapa RoamLocal?", why_sub: "Mengurangi kepadatan dan menemukan pengalaman autentik di seluruh dunia.",
    why1: "Perencana AI", why1d: "Rencana harian berdasarkan anggaran, minat, dan keberlanjutan.",
    why2: "Peta permata tersembunyi", why2d: "Tempat kurang dikenal dengan skor dampak lokal.",
    why3: "Dasbor kerumunan", why3d: "Perkiraan tingkat kerumunan dan alternatif lebih sepi.",
    why4: "Pemandu lokal", why4d: "Pemandu terverifikasi. Uang tetap di komunitas.",
    why5: "Skor dampak lokal", why5d: "Skor 0–100 untuk kepemilikan, lingkungan, jarak dari kerumunan.",
    why6: "Keamanan & akses", why6d: "Kontak darurat dan info aksesibilitas.",
    featured: "Permata tersembunyi unggulan", featured_sub: "Pengalaman berdampak tinggi di seluruh dunia",
    voices: "Suara dari perjalanan & komunitas",
    cta_title: "Perjalanan bermakna berikutnya dimulai di sini.", cta_sub: "Dukung komunitas lokal, hindari kerumunan.",
    from: "dari", impact: "Dampak", crowd: "Kerumunan", low: "rendah", medium: "sedang", high: "tinggi",
    planner_title: "Buat itinerary bertanggung jawab", planner_sub: "Jawab beberapa pertanyaan. Kami buat rencana fokus permata tersembunyi.",
    how: "Cara kerja", how1: "Beritahu destinasi, anggaran, hari, dan minat", how2: "Atur kebutuhan mobilitas dan prioritas keberlanjutan", how3: "Terima itinerary personal",
    start: "Mulai merencanakan", dest: "Destinasi", budget: "Anggaran", duration: "Durasi (hari)", interests: "Minat",
    mobility: "Kebutuhan mobilitas", sustain: "Prioritas keberlanjutan", generate: "Buat itinerary", back: "Kembali",
    crafting: "Menyusun itinerary Anda…", regenerate: "Buat ulang", view_map: "Lihat di peta", edit: "Edit preferensi",
    ai_warn: "Itinerary contoh AI. Hanya data demo. Tidak ada harga real-time.",
    explore_title: "Jelajahi permata tersembunyi", explore_sub: "Pengalaman kurang dikenal di seluruh dunia",
    search: "Cari pengalaman…", map_title: "Peta permata tersembunyi", map_sub: "Peta interaktif · Lokasi contoh",
    dash_title: "Dasbor dampak & keberlanjutan", dash_sub: "Kontribusi Anda (data contoh)",
    points: "Poin dampak", businesses: "Bisnis lokal", co2: "Perkiraan CO₂ dihindari", level: "Pelancong bertanggung jawab",
    crowd_snap: "Cuplikan kerumunan", badges: "Lencana Anda", tips: "Tips perjalanan", emergency: "Darurat & akses",
    book: "Minta / Pesan pengalaman", report: "Laporkan info salah", sent: "Permintaan terkirim!",
    signin: "Masuk", create: "Buat akun", welcome: "Selamat datang di RoamLocal",
    lang: "Bahasa", currency: "Mata uang", country: "Negara / Wilayah",
    days: "hari", day: "Hari", total: "Total", sustain_label: "Berkelanjutan"
  }
};

/* Fallback: languages without full translation use English */
["fr","ja","pt","de","ta"].forEach(code => {
  if (!T[code]) T[code] = { ...T.en };
});
/* Minimal FR/JA/PT/DE/TA overrides for nav + hero */
Object.assign(T.fr, { nav_home:"Accueil", nav_explore:"Explorer", nav_planner:"Planificateur IA", nav_map:"Carte des pépites", nav_impact:"Mon impact", nav_signin:"Connexion", nav_build:"Créer mon voyage", hero_title:"Voyagez au-delà des lieux saturés.", hero_sub:"Découvrez des expériences locales authentiques et voyagez de façon responsable avec l'IA.", hero_cta1:"Créer mon voyage", hero_cta2:"Explorer les pépites", lang:"Langue", currency:"Devise" });
Object.assign(T.ja, { nav_home:"ホーム", nav_explore:"探索", nav_planner:"AI旅行プラン", nav_map:"隠れた名所マップ", nav_impact:"マイインパクト", nav_signin:"ログイン", nav_build:"旅行を作成", hero_title:"混雑した場所を超えて旅しよう。", hero_sub:"本物のローカル体験を見つけ、コミュニティを支援し、AIで責任ある旅を。", hero_cta1:"旅行を作成", hero_cta2:"隠れた名所を探す", lang:"言語", currency:"通貨" });
Object.assign(T.pt, { nav_home:"Início", nav_explore:"Explorar", nav_planner:"Planejador IA", nav_map:"Mapa de joias ocultas", nav_impact:"Meu impacto", nav_signin:"Entrar", nav_build:"Criar minha viagem", hero_title:"Viaje além dos lugares lotados.", hero_sub:"Descubra experiências locais autênticas e explore com responsabilidade com IA.", hero_cta1:"Criar minha viagem", hero_cta2:"Explorar joias ocultas", lang:"Idioma", currency:"Moeda" });
Object.assign(T.de, { nav_home:"Start", nav_explore:"Entdecken", nav_planner:"KI-Reiseplaner", nav_map:"Versteckte Schätze", nav_impact:"Mein Impact", nav_signin:"Anmelden", nav_build:"Reise planen", hero_title:"Reisen Sie über die überfüllten Orte hinaus.", hero_sub:"Entdecken Sie authentische lokale Erlebnisse und reisen Sie verantwortungsvoll mit KI.", hero_cta1:"Reise planen", hero_cta2:"Versteckte Schätze", lang:"Sprache", currency:"Währung" });
Object.assign(T.ta, { nav_home:"முகப்பு", nav_explore:"ஆராயுங்கள்", nav_planner:"AI பயணத் திட்டம்", nav_map:"மறைந்த ரத்தின வரைபடம்", nav_impact:"என் தாக்கம்", nav_signin:"உள்நுழை", nav_build:"பயணம் உருவாக்கு", hero_title:"நெரிசலான இடங்களுக்கு அப்பால் பயணியுங்கள்.", hero_sub:"உண்மையான உள்ளூர் அனுபவங்களைக் கண்டறியுங்கள், சமூகங்களை ஆதரியுங்கள்.", hero_cta1:"பயணம் உருவாக்கு", hero_cta2:"மறைந்த ரத்தினங்கள்", lang:"மொழி", currency:"நாணயம்" });


/* —— Extra UI strings for full-site language coverage —— */
Object.assign(T.en, {"nav_guides": "Guides", "nav_earn": "Earn as Guide", "footer_tagline": "Build ur journey · Local guides · Open map data", "explore_title": "Explore famous places", "explore_sub": "Search any city or region — live places with photos & reviews", "search_places": "Search places", "map_title": "Hidden Gems Map", "map_sub": "Search any place · Live food & stays · GPS routes · Reviews", "use_location": "Use my location", "route_selected": "Route to selected", "clear_route": "Clear route", "search_placeholder": "Search real places worldwide…", "search_btn": "Search", "guides_title": "Local Guides · Earn with RoamLocal", "guides_sub": "Verified hosts and guides by country — income stays in their communities", "planner_title": "Build a responsible journey", "planner_sub": "Answer a few questions. We generate a plan focused on hidden gems and local impact.", "start_journey": "Start your journey →", "destination": "Destination", "budget": "Budget", "duration": "Duration (days)", "interests": "Interests", "mobility": "Mobility needs", "sustain": "Sustainability priority", "transport_pref": "Preferred transport", "a11y_needs": "Accessibility needs", "generate": "Build ur journey", "back": "Back", "crafting": "Crafting your journey…", "regenerate": "Regenerate", "view_map": "View on map", "edit_prefs": "Edit preferences", "sign_in": "Sign in", "create_account": "Create account", "profile": "My profile", "sign_out": "Sign out", "guide_dashboard": "Guide dashboard", "open_maps": "Open in Maps", "directions": "Directions", "walk": "Walk", "auto_drive": "Auto / drive", "car": "Car", "transit": "Transit", "how_explore": "How to explore", "nearby_food": "Food nearby", "nearby_rooms": "Rooms / stays nearby", "all_countries": "All countries", "reviews": "reviews", "from": "from", "impact": "Impact", "book_view": "Book / View", "sos_title": "Emergency / SOS", "sos_note": "In danger? Call local emergency services first. Share your live location with a trusted contact.", "dash_title": "Sustainability & Impact Dashboard", "dash_sub": "Your contribution and crowd insights", "transport_section": "Recommended transport", "welcome": "Welcome to RoamLocal", "traveler": "Traveler", "guide_role": "Guide", "save_language": "Save language", "preferred_lang": "Preferred language", "lang_applies": "Applies to the whole site (same as the top language bar)."});
Object.assign(T.hi || (T.hi = {}), {"nav_guides": "गाइड", "nav_earn": "गाइड बनकर कमाएँ", "explore_title": "प्रसिद्ध स्थान खोजें", "explore_sub": "किसी भी शहर की खोज करें — तस्वीरों और समीक्षाओं के साथ", "search_places": "स्थान खोजें", "map_title": "छुपे रत्न मानचित्र", "map_sub": "जगह खोजें · खाना और ठहरना · मार्ग · समीक्षाएँ", "use_location": "मेरा स्थान उपयोग करें", "route_selected": "चयनित तक मार्ग", "clear_route": "मार्ग हटाएँ", "search_btn": "खोजें", "guides_title": "स्थानीय गाइड", "guides_sub": "देश के अनुसार सत्यापित मेज़बान", "planner_title": "जिम्मेदार यात्रा बनाएँ", "planner_sub": "कुछ प्रश्न उत्तर दें; छुपे रत्नों पर केंद्रित योजना", "start_journey": "यात्रा शुरू करें →", "destination": "गंतव्य", "budget": "बजट", "duration": "अवधि (दिन)", "interests": "रुचियाँ", "mobility": "गतिशीलता", "sustain": "स्थिरता प्राथमिकता", "transport_pref": "पसंदीदा परिवहन", "a11y_needs": "पहुँच आवश्यकताएँ", "generate": "यात्रा बनाएँ", "back": "वापस", "crafting": "यात्रा बनाई जा रही है…", "sign_in": "साइन इन", "create_account": "खाता बनाएँ", "profile": "मेरी प्रोफ़ाइल", "sign_out": "साइन आउट", "guide_dashboard": "गाइड डैशबोर्ड", "open_maps": "मानचित्र में खोलें", "directions": "दिशा-निर्देश", "walk": "पैदल", "auto_drive": "ऑटो / ड्राइव", "car": "कार", "transit": "परिवहन", "how_explore": "कैसे घूमें", "nearby_food": "पास का खाना", "nearby_rooms": "पास ठहरना", "reviews": "समीक्षाएँ", "from": "से", "impact": "प्रभाव", "book_view": "बुक / देखें", "sos_title": "आपातकाल / SOS", "sos_note": "खतरे में हों तो पहले स्थानीय आपातकाल कॉल करें।", "dash_title": "स्थिरता और प्रभाव डैशबोर्ड", "dash_sub": "आपका योगदान और भीड़ की जानकारी", "transport_section": "सुझाया गया परिवहन", "traveler": "यात्री", "guide_role": "गाइड", "save_language": "भाषा सहेजें", "preferred_lang": "पसंदीदा भाषा", "lang_applies": "पूरी साइट पर लागू होती है।", "nav_build": "यात्रा बनाएँ", "nav_planner": "यात्रा बनाएँ", "footer_tagline": "यात्रा बनाएँ · स्थानीय गाइड · खुला मानचित्र डेटा"});
Object.assign(T.es || (T.es = {}), {"nav_guides": "Guías", "nav_earn": "Gana como guía", "explore_title": "Explorar lugares famosos", "explore_sub": "Busca cualquier ciudad — lugares en vivo con fotos y reseñas", "search_places": "Buscar lugares", "map_title": "Mapa de joyas ocultas", "map_sub": "Busca lugares · comida y alojamiento · rutas · reseñas", "use_location": "Usar mi ubicación", "route_selected": "Ruta al seleccionado", "clear_route": "Borrar ruta", "search_btn": "Buscar", "guides_title": "Guías locales", "guides_sub": "Anfitriones verificados por país", "planner_title": "Construye un viaje responsable", "start_journey": "Empieza tu viaje →", "destination": "Destino", "budget": "Presupuesto", "duration": "Duración (días)", "interests": "Intereses", "generate": "Crear mi viaje", "back": "Atrás", "crafting": "Creando tu viaje…", "sign_in": "Iniciar sesión", "create_account": "Crear cuenta", "profile": "Mi perfil", "sign_out": "Cerrar sesión", "guide_dashboard": "Panel de guía", "open_maps": "Abrir en Maps", "directions": "Indicaciones", "walk": "A pie", "auto_drive": "Auto / coche", "car": "Coche", "transit": "Transporte", "how_explore": "Cómo explorar", "nearby_food": "Comida cerca", "nearby_rooms": "Alojamiento cerca", "reviews": "reseñas", "sos_title": "Emergencia / SOS", "dash_title": "Panel de impacto", "transport_section": "Transporte recomendado", "traveler": "Viajero", "guide_role": "Guía", "save_language": "Guardar idioma", "preferred_lang": "Idioma preferido", "nav_build": "Crear mi viaje"});
Object.assign(T.fr || (T.fr = {}), {"nav_guides": "Guides", "explore_title": "Explorer des lieux célèbres", "search_places": "Rechercher", "map_title": "Carte des pépites", "use_location": "Ma position", "route_selected": "Itinéraire", "guides_title": "Guides locaux", "planner_title": "Construire un voyage responsable", "generate": "Créer mon voyage", "sign_in": "Connexion", "profile": "Mon profil", "sign_out": "Déconnexion", "walk": "À pied", "car": "Voiture", "directions": "Itinéraire", "open_maps": "Ouvrir dans Maps", "how_explore": "Comment explorer", "sos_title": "Urgence / SOS", "dash_title": "Tableau d'impact", "nav_build": "Créer mon voyage", "traveler": "Voyageur", "guide_role": "Guide"});

/* Fill missing keys in other languages from English so the whole UI never shows raw keys */
(function fillLangGaps() {
  const base = T.en || {};
  Object.keys(T).forEach(function(code) {
    if (code === "en") return;
    T[code] = T[code] || {};
    Object.keys(base).forEach(function(k) {
      if (T[code][k] == null || T[code][k] === "") T[code][k] = base[k];
    });
  });
})();

/** Apply data-i18n / data-i18n-placeholder / data-i18n-title across the page */
function applyI18n() {
  const code = getLang();
  const meta = LANGS.find(function(l) { return l.code === code; });
  document.documentElement.lang = code;
  document.documentElement.dir = (meta && meta.dir) || "ltr";

  document.querySelectorAll("[data-i18n]").forEach(function(el) {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    const val = t(key);
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      if (!el.getAttribute("data-i18n-placeholder")) el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(function(el) {
    el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
  });
  document.querySelectorAll("[data-i18n-title]").forEach(function(el) {
    el.title = t(el.getAttribute("data-i18n-title"));
  });
  document.querySelectorAll("[data-i18n-html]").forEach(function(el) {
    el.innerHTML = t(el.getAttribute("data-i18n-html"));
  });

  // Sync header language dropdown if present
  const sel = document.getElementById("langSelect");
  if (sel && sel.value !== code) sel.value = code;
}


function t(key) {
  const lang = localStorage.getItem("rl_lang") || "en";
  return (T[lang] && T[lang][key]) || T.en[key] || key;
}

function getLang() { return localStorage.getItem("rl_lang") || "en"; }
function getCurrency() { return localStorage.getItem("rl_currency") || "USD"; }
function setLang(code) {
  localStorage.setItem("rl_lang", code);
  const meta = LANGS.find(l => l.code === code);
  document.documentElement.lang = code;
  document.documentElement.dir = (meta && meta.dir) || "ltr";
}
function setCurrency(code) { localStorage.setItem("rl_currency", code); }

function price(usd) { return formatPrice(usd, getCurrency()); }

/* Auto-detect language preference once */
(function initPrefs() {
  if (!localStorage.getItem("rl_lang")) {
    const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    const match = LANGS.find(l => l.code === nav);
    if (match) localStorage.setItem("rl_lang", match.code);
    /* rough currency by language */
    const curMap = { hi: "INR", te: "INR", ta: "INR", id: "IDR", ja: "JPY", zh: "CNY", ar: "AED", es: "EUR", fr: "EUR", de: "EUR", pt: "BRL" };
    if (curMap[nav] && !localStorage.getItem("rl_currency")) localStorage.setItem("rl_currency", curMap[nav]);
  }
  setLang(getLang());
})();
