"""Conversational multi-language travel assistant for RoamLocal.
Session-aware, longer natural replies (ChatGPT-style tone) without external LLM key.
"""
import re
import random
from collections import defaultdict

_HISTORY = defaultdict(list)
_MAX_TURNS = 12


def _lang(code: str) -> str:
    code = (code or "en").lower()[:2]
    supported = {"en", "hi", "es", "fr", "ar", "zh", "ja", "id", "pt", "de", "te", "ta"}
    return code if code in supported else "en"


COUNTRY_NOTES = {
    "indonesia": {
        "en": "In Indonesia we feature quiet rice-field walks near Ubud and coastal conservation around Nusa Ceningan with local hosts.",
        "hi": "इंडोनेशिया में उबुद के पास शांत चावल के खेत और नुसा सेनिंगन के तटीय संरक्षण अनुभव हैं।",
        "es": "En Indonesia: arrozales cerca de Ubud y conservación costera en Nusa Ceningan.",
        "ja": "インドネシアではウブド近郊の棚田とヌサ・チェニンガンの海岸保全体験があります。",
        "id": "Di Indonesia: sawah tenang di Ubud dan konservasi pantai Nusa Ceningan.",
        "zh": "印尼有乌布附近的稻田漫步与努沙切宁干海岸保护体验。",
    },
    "india": {
        "en": "For India: sunrise Ganges walks in Rishikesh or village textile days near Jaipur — income stays with local families.",
        "hi": "भारत: ऋषिकेश में गंगा किनारे सूर्योदय सैर या जयपुर के पास गाँव की वस्त्र कार्यशालाएँ।",
        "es": "En India: amaneceres junto al Ganges en Rishikesh o textiles cerca de Jaipur.",
        "te": "భారత్: రిషికేష్ గంగా సూర్యోదయ నడకలు లేదా జైపూర్ సమీప గ్రామ వస్త్ర రోజులు.",
        "ta": "இந்தியா: ரிஷிகேஷ் கங்கை சூரிய உதய நடை அல்லது ஜெய்ப்பூர் அருகில் கிராம ஜவுளி.",
        "zh": "印度：瑞诗凯诗恒河日出散步或斋浦尔附近乡村纺织日。",
    },
    "japan": {
        "en": "Around Kyoto: early temple-garden visits and quiet tea walks away from main tourist corridors.",
        "hi": "क्योटो: जल्दी मंदिर-उद्यान और शांत चाय सैर।",
        "ja": "京都周辺では早朝の寺院庭園めぐりや静かな茶の道散策があります。",
        "zh": "京都周边有清晨寺院庭园与安静茶道散步。",
    },
    "mexico": {
        "en": "Oaxaca stands out for market food walks and clay/textile workshops with family producers.",
        "es": "Oaxaca: paseos gastronómicos y talleres de barro y textiles con familias productoras.",
        "zh": "瓦哈卡以市集美食漫步和家庭陶艺/纺织工坊见长。",
    },
    "morocco": {
        "en": "Atlas foothill village days and off-peak food walks near Marrakech keep more money with host families.",
        "fr": "Journées de village dans le Haut Atlas et balades culinaires hors pointe près de Marrakech.",
        "ar": "أيام القرى في سفوح الأطلس وجولات طعام خارج الذروة قرب مراكش.",
    },
    "peru": {
        "en": "In the Cusco region, Quechua weaving circles connect you directly with artisan income.",
        "es": "En Cusco, círculos de tejido quechua conectan el ingreso con artesanos.",
    },
    "italy": {
        "en": "Chianti olive-farm mornings are small-group only — a calm alternative to mass Florence tours.",
        "de": "Olivenhof-Vormittage in Chianti nur in Kleingruppen.",
    },
    "thailand": {
        "en": "Chiang Mai offers quiet temple mornings with cultural context from a local host.",
        "zh": "清迈有安静的清晨寺庙体验，由当地向导介绍文化背景。",
    },
}


def _pick(d, lang, fb="en"):
    return d.get(lang) or d.get(fb) or (next(iter(d.values())) if d else "")


def _remember(session_id, role, content):
    if not session_id:
        return
    h = _HISTORY[session_id]
    h.append({"role": role, "content": content})
    if len(h) > _MAX_TURNS * 2:
        _HISTORY[session_id] = h[-_MAX_TURNS * 2:]


def _recent_user_topics(session_id):
    texts = [m["content"] for m in _HISTORY.get(session_id, []) if m["role"] == "user"]
    return " ".join(texts[-4:]).lower()


def detect_country(text):
    t = (text or "").lower()
    pairs = [
        (r"\b(indonesia|bali|ubud|nusa)\b", "indonesia"),
        (r"\b(india|rishikesh|jaipur|delhi|goa|kerala)\b", "india"),
        (r"\b(japan|kyoto|tokyo|osaka)\b", "japan"),
        (r"\b(mexico|oaxaca)\b", "mexico"),
        (r"\b(morocco|marrakech|atlas|maroc)\b", "morocco"),
        (r"\b(peru|cusco|lima|machu)\b", "peru"),
        (r"\b(italy|italia|chianti|florence|tuscany)\b", "italy"),
        (r"\b(thailand|chiang\s*mai|bangkok)\b", "thailand"),
    ]
    for pat, code in pairs:
        if re.search(pat, t):
            return code
    return None


def detect_intent(text):
    t = (text or "").lower()
    if re.search(r"\b(hi|hello|hey|namaste|hola|bonjour|مرحبا|你好|こんにちは|halo|olá|hallo|నమస్కారం|வணக்கம்|good\s*(morning|evening|afternoon))\b", t):
        return "greeting"
    if re.search(r"\b(route|directions?|navigate|how\s+to\s+get|map|gps|location|near\s+me)\b", t):
        return "route"
    if re.search(r"\b(book|booking|reserve|price|cost|how\s+much|pay|earn|register\s+as\s+guide)\b", t):
        return "booking"
    if re.search(r"\b(guide|guides|host|pemandu|guía|ガイド|مرشد|向导|गाइड|గైడ్|வழிகாட்டி)\b", t):
        return "guides"
    if re.search(r"\b(sustain|impact|carbon|crowd|responsible|eco|green|overtourism)\b", t):
        return "sustainability"
    if re.search(r"\b(plan|itinerary|days?|trip|journey|weekend|budget)\b", t):
        return "planner"
    if re.search(r"\b(experience|experiences|activity|hidden\s*gem|tour|what\s+to\s+do)\b", t):
        return "experiences"
    if re.search(r"\b(thank|thanks|شكرا|merci|ありがとう|धन्यवाद|gracias)\b", t):
        return "thanks"
    if detect_country(t):
        return "country"
    return "general"


def reply_greeting(lang):
    opts = {
        "en": [
            "Hi! I'm your RoamLocal travel companion. I can help you find local guides, plan low-crowd days, check experiences, or work out a route from your live location. What are you curious about?",
            "Hello — great to meet you. Tell me a destination, a budget, or whether you want guides, food, nature, or craft experiences, and I'll shape ideas around that.",
        ],
        "hi": [
            "नमस्ते! मैं आपका RoamLocal यात्रा साथी हूँ। स्थानीय गाइड, कम भीड़ वाले दिन, अनुभव या लाइव लोकेशन से रास्ता — किसमें मदद चाहिए?",
        ],
        "es": ["¡Hola! Soy tu compañero RoamLocal. Guías locales, días sin aglomeraciones, experiencias o rutas — ¿qué te interesa?"],
        "fr": ["Bonjour ! Compagnon RoamLocal ici. Guides locaux, journées calmes, expériences ou itinéraire — que souhaitez-vous ?"],
        "ar": ["مرحبًا! رفيق سفر RoamLocal. مرشدون محليون، تجارب، أو طرق من موقعك — بماذا تهتم؟"],
        "zh": ["你好！我是 RoamLocal 旅行伙伴。可帮你找当地向导、避开人群、体验或从定位规划路线。想聊什么？"],
        "ja": ["こんにちは！RoamLocalの旅の相棒です。現地ガイド、混雑の少ない一日、体験、現在地からのルートなど、何でもどうぞ。"],
        "id": ["Halo! Teman perjalanan RoamLocal. Pemandu lokal, hari sepi, pengalaman, atau rute dari lokasi — mulai dari mana?"],
        "pt": ["Olá! Companheiro RoamLocal. Guias locais, dias calmos, experiências ou rotas — o que te interessa?"],
        "de": ["Hallo! RoamLocal-Reisebegleiter hier. Lokale Guides, ruhige Tage, Erlebnisse oder Route — womit starten?"],
        "te": ["నమస్కారం! RoamLocal ప్రయాణ సహచరుడిని. స్థానిక గైడ్‌లు, తక్కువ జనం, అనుభవాలు లేదా రూట్ — దేని గురించి?"],
        "ta": ["வணக்கம்! RoamLocal பயணத் துணை. உள்ளூர் வழிகாட்டிகள், குறைந்த கூட்டம், அனுபவங்கள் அல்லது வழி — எதைப் பற்றி?"],
    }
    return random.choice(opts.get(lang) or opts["en"])


def reply_country(lang, country):
    note = _pick(COUNTRY_NOTES.get(country, {}), lang)
    openers = {
        "en": f"Glad you asked about {country.title()}.",
        "hi": f"{country.title()} के बारे में पूछना अच्छा रहा।",
        "es": f"Me alegra que preguntes por {country.title()}.",
        "ja": f"{country.title()}についてですね。",
        "zh": f"很高兴你问起{country.title()}。",
        "id": f"Senang kamu tanya soal {country.title()}.",
        "de": f"Schön, dass du nach {country.title()} fragst.",
        "te": f"{country.title()} గురించి అడగడం బాగుంది.",
        "ta": f"{country.title()} பற்றி கேட்டது நல்லது.",
        "fr": f"Avec plaisir pour {country.title()}.",
        "ar": f"سعيد بسؤالك عن {country.title()}.",
        "pt": f"Que bom perguntar sobre {country.title()}.",
    }
    follow = {
        "en": " On the Map page use “Use my location” then “Route to selected” for a driving path (open OSRM data). You can also search real place names there. Want guides, food, nature, or a 2–3 day sketch?",
        "hi": " मैप पर “Use my location” और “Route to selected” से रास्ता देखें। गाइड, खान-पान या 2–3 दिन की रूपरेखा चाहिए?",
        "es": " En el mapa: ubicación y luego ruta. ¿Guías, comida, naturaleza o un boceto de 2–3 días?",
        "ja": " マップで現在地→選択場所へのルート。ガイド、食、自然、2〜3日の案は？",
        "zh": " 地图页可定位并规划路线。想要向导、美食、自然还是 2–3 天草稿？",
        "id": " Di peta aktifkan lokasi lalu buat rute. Mau pemandu, kuliner, alam, atau sketsa 2–3 hari?",
        "de": " Auf der Karte Standort nutzen und Route zeichnen. Guides, Essen, Natur oder 2–3-Tage-Skizze?",
        "te": " మ్యాప్‌లో లొకేషన్ ఇచ్చి రూట్ చూడండి. గైడ్‌లు, ఆహారం లేదా 2–3 రోజుల స్కెచ్?",
        "ta": " வரைபடத்தில் இருப்பிடம் அனுமதித்து பாதை பெறலாம். வழிகாட்டிகள், உணவு அல்லது 2–3 நாள் வரைவு?",
    }
    return " ".join(p for p in [openers.get(lang) or openers["en"], note, follow.get(lang) or follow["en"]] if p)


def reply_guides(lang, country=None):
    base = {
        "en": "Our guides are independent local hosts — farmers, cooks, artisans — listed with languages, hourly rates, and how they earn. Covered: Indonesia, India, Japan, Mexico, Morocco, Peru, Italy, Thailand.",
        "hi": "गाइड स्वतंत्र स्थानीय मेज़बान हैं — भाषाएँ, प्रति घंटा दर और कमाई साफ़ दिखती है। इंडोनेशिया, भारत, जापान, मेक्सिको, मोरक्को, पेरू, इटली, थाईलैंड।",
        "es": "Guías locales independientes con idiomas, tarifa/hora y forma de ingreso. Países: Indonesia, India, Japón, México, Marruecos, Perú, Italia, Tailandia.",
        "ja": "ガイドは独立した現地ホスト。言語・時間単価・収益の仕組み付き。対象国はインドネシア、インド、日本、メキシコ、モロッコ、ペルー、イタリア、タイ。",
        "zh": "向导为独立当地主人，显示语言、时薪与收入方式。覆盖印尼、印度、日本、墨西哥、摩洛哥、秘鲁、意大利、泰国。",
        "id": "Pemandu host lokal mandiri — bahasa, tarif/jam, cara menghasilkan. Ada di Indonesia, India, Jepang, Meksiko, Maroko, Peru, Italia, Thailand.",
        "de": "Unabhängige lokale Guides mit Sprachen, Stundensatz und Verdiensthinweis. Länder: Indonesien, Indien, Japan, Mexiko, Marokko, Peru, Italien, Thailand.",
        "te": "స్వతంత్ర స్థానిక గైడ్‌లు — భాషలు, గంట రేటు, సంపాదన. ఇండోనేషియా, భారత్, జపాన్, మెక్సికో, మొరాకో, పెరూ, ఇటలీ, థాయిలాండ్.",
        "ta": "சுயாதீன உள்ளூர் வழிகாட்டிகள் — மொழிகள், மணிநேர கட்டணம். இந்தோனேசியா, இந்தியா, ஜப்பான், மெக்சிகோ, மொராக்கோ, பெரு, இத்தாலி, தாய்லாந்து.",
    }
    tip = {
        "en": " Open Guides and filter by country, or tell me a country + interest (nature / food / craft).",
        "hi": " Guides पर देश से फ़िल्टर करें, या देश + रुचि बताएँ।",
        "es": " Filtra en Guías o dime país e interés.",
        "ja": "ガイドページで絞るか、国と興味を教えてください。",
        "zh": "可在向导页筛选，或告诉我国家与兴趣。",
        "id": "Saring di Guides, atau sebutkan negara + minat.",
        "de": "Auf Guides filtern oder Land + Interesse nennen.",
        "te": "Guidesలో ఫిల్టర్ చేయండి లేదా దేశం + ఆసక్తి చెప్పండి.",
        "ta": "Guides இல் வடிகட்டவும் அல்லது நாடு + ஆர்வம் சொல்லுங்கள்.",
    }
    extra = (" " + _pick(COUNTRY_NOTES[country], lang)) if country and country in COUNTRY_NOTES else ""
    return (base.get(lang) or base["en"]) + extra + (tip.get(lang) or tip["en"])


def reply_experiences(lang):
    return {
        "en": "Experiences are smaller, high local-impact activities: rice-field walks, home kitchens, quiet temples, artisan workshops, coastal conservation. Each card shows crowd level plus sustainability and local-impact scores. Browse Explore, or name a country and vibe (calm nature / food / craft).",
        "hi": "अनुभव: खेत सैर, घर की रसोई, शांत मंदिर, शिल्प — भीड़ और प्रभाव स्कोर के साथ। Explore देखें या देश + मूड बताएँ।",
        "es": "Experiencias de alto impacto local con nivel de multitud y puntuaciones. Explora o dime país y estilo.",
        "ja": "棚田、家庭料理、静かな寺院、工芸など。混雑度とスコア付き。国と雰囲気をどうぞ。",
        "zh": "稻田、家庭厨房、安静寺庙、手作等，带人群与影响评分。告诉我国家与风格。",
        "id": "Jalan sawah, dapur rumah, kuil tenang, kerajinan — skor keramaian & dampak. Sebutkan negara dan suasana.",
        "de": "Reisfelder, Hausküchen, ruhige Tempel, Werkstätten — mit Andrang- und Impact-Score. Land und Stimmung nennen.",
        "te": "వరి పొలాలు, ఇంటి వంట, ఆలయాలు, కళలు — స్కోర్‌లతో. దేశం + స్టైల్ చెప్పండి.",
        "ta": "நெல் வயல்கள், வீட்டு சமையல், கோயில்கள், கைவினை — மதிப்பெண்களுடன். நாடு + பாணி சொல்லுங்கள்.",
    }.get(lang) or {
        "en": "Experiences are smaller, high local-impact activities. Browse Explore or name a country and vibe."
    }["en"]


def reply_route(lang):
    return {
        "en": "Live routing: open Map → allow “Use my location” → select a pin or list item → “Route to selected”. We draw a driving path via the public OSRM router (open data). Search real places by name with OpenStreetMap Nominatim in the search box. GPS needs your browser permission.",
        "hi": "लाइव रूट: Map → “Use my location” → पिन चुनें → “Route to selected”. OSRM से ड्राइविंग पथ। नाम से जगह खोज भी उपलब्ध।",
        "es": "Ruta en vivo en Mapa: ubicación → lugar → “Route to selected”. Router OSRM público. Busca lugares reales por nombre.",
        "ja": "マップで現在地許可→場所選択→Route。OSRM公開ルーター。地名検索も可。",
        "zh": "地图：允许定位→选点→Route。使用公开 OSRM。可用名称搜索真实地点。",
        "id": "Map: izinkan lokasi → pilih pin → Route. Jalur OSRM publik. Cari tempat nyata by name.",
        "de": "Karte: Standort → Ort → Route. Öffentlicher OSRM-Router. Orte per Name suchen.",
        "te": "Map: లొకేషన్ → పిన్ → Route. OSRM పబ్లిక్ రూటర్. పేరుతో వెతకండి.",
        "ta": "Map: இருப்பிடம் → இடம் → Route. OSRM. பெயரால் தேடலாம்.",
    }.get(lang) or "Open the Map page, allow location, select a place, then Route to selected."


def reply_booking(lang):
    return {
        "en": "Request an experience from its detail page with “Request / Book” — saved as pending for the host. To earn, use Earn as Guide / registration; applications are stored for review. Prices show in USD and convert with the top currency switcher.",
        "hi": "अनुभव पेज पर Request/Book — pending सेव। कमाना हो तो Earn as Guide। कीमतें USD; ऊपर मुद्रा बदलें।",
        "es": "Reserva con Request/Book en la ficha. Para ganar: registro de guía. Precios en USD; cambia moneda arriba.",
        "ja": "体験ページのRequest/Book。収益化はガイド登録。表示USD、上部で通貨変更。",
        "zh": "体验页 Request/Book。赚钱走向导注册。价格美元，顶栏可换币。",
        "id": "Booking lewat Request/Book. Hasil: daftar pemandu. Harga USD; ganti mata uang di atas.",
        "de": "Buchung über Request/Book. Verdienen: Guide-Registrierung. Preise USD, Währung oben.",
        "te": "Request/Bookతో బుకింగ్. సంపాదనకు గైడ్ రిజిస్టర్. USD; పైన కరెన్సీ.",
        "ta": "Request/Book முன்பதிவு. வருவாய்: வழிகாட்டி பதிவு. USD; மேலே நாணயம்.",
    }.get(lang) or "Use Request/Book on an experience page; guide registration is under Earn as Guide."


def reply_sustainability(lang):
    return {
        "en": "RoamLocal pushes spend toward local hosts and away from overcrowded landmarks. Each experience shows sustainability and local-impact scores plus crowd level. A verified local guide usually keeps more money in the community than big bus tours.",
        "hi": "स्थानीय मेज़बानों की ओर खर्च, भीड़भाड़ से दूर। हर अनुभव पर स्थिरता/प्रभाव स्कोर। स्थानीय गाइड से समुदाय में अधिक पैसा।",
        "es": "Priorizamos anfitriones locales y menos masificación. Cada experiencia tiene puntuaciones de sostenibilidad e impacto.",
        "ja": "地元ホストへの支出と混雑回避。各体験にサステナビリティとインパクトのスコア。",
        "zh": "消费导向当地主人、避开过热景点。每项体验有可持续与本地影响评分。",
        "id": "Belanja ke host lokal, hindari kerumunan. Skor keberlanjutan & dampak lokal di setiap pengalaman.",
        "de": "Geld soll bei lokalen Gastgebern landen. Jedes Erlebnis hat Nachhaltigkeits- und Impact-Score.",
        "te": "స్థానిక హోస్ట్‌లకు ఖర్చు, ఎక్కువ జనం నుంచి దూరం. స్థిరత్వ/ప్రభావ స్కోర్‌లు.",
        "ta": "உள்ளூர் விருந்தோம்பலுக்கு செலவு, அதிக கூட்டத்தைத் தவிர்த்தல். நிலைத்தன்மை/தாக்க மதிப்பெண்கள்.",
    }.get(lang) or "We prioritise local hosts and low-crowd places; scores are on every experience card."


def reply_planner(lang):
    return {
        "en": "Open the AI Trip Planner for destination, days, budget and interests — or tell me here: city/region, days, and priorities (nature / food / craft / temples), and I'll sketch a simple day-by-day in chat.",
        "hi": "AI Trip Planner में गंतव्य/दिन/बजट सेट करें, या यहाँ शहर, दिन और प्राथमिकताएँ बताएँ।",
        "es": "Usa el planificador o dime ciudad, días y prioridades y te esbozo un plan.",
        "ja": "AI Trip Plannerか、ここに都市・日数・希望を。簡単な日別案を出します。",
        "zh": "用行程规划器，或告诉我城市、天数与偏好，我草拟日程。",
        "id": "Pakai AI Trip Planner, atau sebutkan kota, hari, prioritas — saya sketsa.",
        "de": "Trip Planner nutzen oder Ort, Tage, Prioritäten nennen — ich skizziere einen Tagesplan.",
        "te": "AI Trip Planner లేదా నగరం, రోజులు, ప్రాధాన్యతలు చెప్పండి.",
        "ta": "AI Trip Planner அல்லது நகரம், நாட்கள், முன்னுரிமைகள் சொல்லுங்கள்.",
    }.get(lang) or "Use the Trip Planner or describe city, days and priorities here."


def reply_thanks(lang):
    return {
        "en": "You're welcome — anytime. For a route, guide match, or quieter alternative to a famous spot, just name the place.",
        "hi": "आपका स्वागत है। रास्ता, गाइड या शांत विकल्प चाहिए तो जगह का नाम लिखें।",
        "es": "De nada. Ruta, guía o alternativa tranquila: dime el nombre del lugar.",
        "ja": "どういたしまして。ルートやガイド、静かな代替は地名をどうぞ。",
        "zh": "不客气。需要路线、向导或安静替代，直接说地名。",
        "id": "Sama-sama. Rute, pemandu, atau alternatif sepi? Sebutkan tempatnya.",
        "de": "Gern. Route, Guide oder ruhige Alternative? Ortsnamen nennen.",
        "te": "స్వాగతం. రూట్/గైడ్/ప్రశాంత ప్రత్యామ్నాయం కావాలంటే పేరు చెప్పండి.",
        "ta": "வரவேற்கிறேன். வழி/வழிகாட்டி/அமைதியான மாற்று வேண்டுமானால் பெயர் சொல்லுங்கள்.",
    }.get(lang) or "You're welcome!"


def reply_general(lang, text, session_id):
    country = detect_country(text) or detect_country(_recent_user_topics(session_id))
    if country:
        return reply_country(lang, country)
    return {
        "en": "I can help with destinations (Indonesia, India, Japan, Mexico, Morocco, Peru, Italy, Thailand), local guides, impact scores, bookings, or map routing from your live location. What would you like to dig into?",
        "hi": "गंतव्य, स्थानीय गाइड, प्रभाव स्कोर, बुकिंग या लाइव लोकेशन से रूटिंग — किस पर बात करें?",
        "es": "Destinos, guías locales, puntuaciones, reservas o rutas desde tu ubicación — ¿qué exploramos?",
        "ja": "目的地、現地ガイド、スコア、予約、現在地からのルート — 何から話しますか？",
        "zh": "目的地、当地向导、影响评分、预订或实时定位路线 — 想先聊哪块？",
        "id": "Destinasi, pemandu, skor dampak, booking, atau rute dari lokasi live — mau bahas apa?",
        "de": "Ziele, lokale Guides, Scores, Buchungen oder Routen ab Standort — womit starten?",
        "te": "గమ్యాలు, గైడ్‌లు, స్కోర్‌లు, బుకింగ్‌లు లేదా లొకేషన్ రూట్ — దేని గురించి?",
        "ta": "இடங்கள், வழிகாட்டிகள், மதிப்பெண்கள், முன்பதிவு அல்லது இருப்பிட வழி — எதைப் பற்றி?",
    }.get(lang) or "Ask me about destinations, guides, experiences, bookings, or map routes."


def get_reply(message: str, lang: str = "en", session_id: str = None) -> str:
    lang = _lang(lang)
    message = (message or "").strip()
    if not message:
        return reply_greeting(lang)

    _remember(session_id, "user", message)
    intent = detect_intent(message)
    country = detect_country(message)

    if intent == "greeting":
        out = reply_greeting(lang)
    elif intent == "thanks":
        out = reply_thanks(lang)
    elif intent == "route":
        out = reply_route(lang)
    elif intent == "guides":
        out = reply_guides(lang, country)
    elif intent == "experiences":
        out = reply_experiences(lang)
    elif intent == "booking":
        out = reply_booking(lang)
    elif intent == "sustainability":
        out = reply_sustainability(lang)
    elif intent == "planner":
        out = reply_planner(lang)
    elif intent == "country" and country:
        out = reply_country(lang, country)
    else:
        out = reply_general(lang, message, session_id or "")

    if session_id and intent in ("guides", "experiences", "planner") and not country:
        prev = detect_country(_recent_user_topics(session_id))
        if prev and prev in COUNTRY_NOTES:
            out = out + " " + _pick(COUNTRY_NOTES[prev], lang)

    _remember(session_id, "assistant", out)
    return out
