/* RoamLocal – Global data (prices USD). Images: reliable Unsplash + fallbacks */

const IMG = {
  rice: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  cook: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
  beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  weave: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
  mountain: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
  dinner: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  temple: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
  craft: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
  kayak: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
  market: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
  india1: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
  india2: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
  india3: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80",
  forest: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
  japan: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
  foodjp: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80",
  mexico: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&q=80",
  textile: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
  morocco: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80",
  atlas: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80",
  peru: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80",
  lima: "https://images.unsplash.com/photo-1531968452301-4f2f5c0f345b?w=800&q=80",
  tuscany: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80",
  thailand: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
  hero1: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
  hero2: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80",
  hero3: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80",
  hero4: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1600&q=80",
  hero5: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80",
  person1: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  person2: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  person3: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  person4: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  person5: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  person6: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
  fallback: "https://picsum.photos/seed/roamlocal/800/600"
};

const HERO_BACKGROUNDS = [IMG.hero1, IMG.hero2, IMG.hero3, IMG.hero4, IMG.hero5];

const EXPERIENCES = [
  { id: "exp-1", name: "Terraced Rice Field Walk with Local Farmers", type: "nature", location: "Ubud outskirts", city: "Ubud", country: "Indonesia", description: "Walk quiet terraced rice fields with local farmers. Learn traditional irrigation and share a simple on-site meal.", image: IMG.rice, price: 18, duration: "3h", crowdLevel: "low", accessibility: "Moderate walking", sustainabilityScore: 92, localImpactScore: 95, lat: -8.5069, lng: 115.2625, tags: ["nature","culture","family-friendly","budget-friendly","low-crowd"], safetyInfo: "Closed shoes recommended.", carbonFootprint: "Very low" },
  { id: "exp-1", name: "Terraced Rice Field Walk with Local Farmers", type: "nature", location: "Ubud outskirts", city: "Ubud", country: "Indonesia", description: "Walk quiet terraced rice fields with local farmers. Learn traditional irrigation and share a simple on-site meal.", image: IMG.rice, price: 18, duration: "3h", crowdLevel: "low", accessibility: "Moderate walking", sustainabilityScore: 92, localImpactScore: 95, lat: -8.5069, lng: 115.2625, tags: ["nature","culture","family-friendly","budget-friendly","low-crowd"], safetyInfo: "Closed shoes recommended.", carbonFootprint: "Very low", bestTransport: "Taxi or scooter + short walk" },
  { id: "exp-2", name: "Family Warung Cooking Class", type: "food", location: "Sanur village", city: "Denpasar", country: "Indonesia", description: "Cook Balinese dishes in a family kitchen. Includes recipes and shared lunch.", image: IMG.cook, price: 25, duration: "4h", crowdLevel: "low", accessibility: "Ground floor", sustainabilityScore: 88, localImpactScore: 97, lat: -8.6833, lng: 115.2633, tags: ["food","culture","family-friendly","budget-friendly"], safetyInfo: "Allergies accommodated.", carbonFootprint: "Low" },
  { id: "exp-3", name: "Hidden Coastal Trail & Tide Pools", type: "adventure", location: "Nusa Ceningan", city: "Nusa Ceningan", country: "Indonesia", description: "Lesser-known coastal path and tide pools with a local marine guide.", image: IMG.beach, price: 22, duration: "5h", crowdLevel: "low", accessibility: "Moderate fitness", sustainabilityScore: 90, localImpactScore: 85, lat: -8.703, lng: 115.44, tags: ["adventure","nature","low-crowd"], safetyInfo: "Life jackets provided.", carbonFootprint: "Low" },
  { id: "exp-4", name: "Village Weaving with Grandmothers", type: "artisan", location: "Sidemen Valley", city: "Karangasem", country: "Indonesia", description: "Traditional weaving with elderly artisans. Support a fading craft.", image: IMG.weave, price: 30, duration: "3h", crowdLevel: "low", accessibility: "Seated", sustainabilityScore: 94, localImpactScore: 98, lat: -8.4833, lng: 115.4333, tags: ["culture","artisan","family-friendly","low-crowd"], safetyInfo: "Quiet environment.", carbonFootprint: "Very low" },
  { id: "exp-5", name: "Sunrise Coffee Plantation Bike", type: "adventure", location: "Kintamani", city: "Bangli", country: "Indonesia", description: "Dawn cycle through plantations. Taste coffee with the grower family.", image: IMG.mountain, price: 35, duration: "4h", crowdLevel: "low", accessibility: "Cycling; e-bike optional", sustainabilityScore: 86, localImpactScore: 90, lat: -8.2425, lng: 115.375, tags: ["adventure","nature","food","low-crowd"], safetyInfo: "Helmets provided.", carbonFootprint: "Low" },
  { id: "exp-6", name: "Homestay Dinner under the Stars", type: "food", location: "Munduk", city: "Buleleng", country: "Indonesia", description: "Home-cooked mountain dinner with a local family and short night walk.", image: IMG.dinner, price: 20, duration: "3h", crowdLevel: "low", accessibility: "Ground-level", sustainabilityScore: 91, localImpactScore: 96, lat: -8.2667, lng: 115.0667, tags: ["food","culture","family-friendly","budget-friendly"], safetyInfo: "Mosquito protection.", carbonFootprint: "Very low" },
  { id: "exp-7", name: "Quiet Spring Purification Ritual", type: "culture", location: "Tirta Empul area", city: "Gianyar", country: "Indonesia", description: "Local-led ritual at a less-visited spring — meaning over photo spots.", image: IMG.temple, price: 15, duration: "2h", crowdLevel: "medium", accessibility: "Steps", sustainabilityScore: 80, localImpactScore: 82, lat: -8.415, lng: 115.315, tags: ["culture","family-friendly"], safetyInfo: "Modest clothing.", carbonFootprint: "Very low" },
  { id: "exp-8", name: "Bamboo Craft Studio", type: "artisan", location: "Green Village", city: "Badung", country: "Indonesia", description: "Make bamboo items with designers using regenerative materials.", image: IMG.craft, price: 28, duration: "3h", crowdLevel: "low", accessibility: "Wheelchair accessible", sustainabilityScore: 96, localImpactScore: 93, lat: -8.52, lng: 115.22, tags: ["artisan","culture","family-friendly","wheelchair accessible"], safetyInfo: "Ages 8+.", carbonFootprint: "Very low" },
  { id: "exp-9", name: "Mangrove Kayak & Birds", type: "nature", location: "Serangan", city: "Denpasar", country: "Indonesia", description: "Paddle quiet mangrove channels with a local conservationist.", image: IMG.kayak, price: 32, duration: "3.5h", crowdLevel: "low", accessibility: "Kayak assistance", sustainabilityScore: 93, localImpactScore: 88, lat: -8.72, lng: 115.23, tags: ["nature","adventure","low-crowd"], safetyInfo: "Life jackets mandatory.", carbonFootprint: "Low" },
  { id: "exp-10", name: "Community Market Food Trail", type: "food", location: "Gianyar market", city: "Gianyar", country: "Indonesia", description: "Early market visit and traditional snacks from family stalls.", image: IMG.market, price: 12, duration: "2.5h", crowdLevel: "medium", accessibility: "Walking", sustainabilityScore: 85, localImpactScore: 94, lat: -8.54, lng: 115.325, tags: ["food","culture","budget-friendly","family-friendly"], safetyInfo: "Cash preferred.", carbonFootprint: "Very low" },
  { id: "exp-11", name: "Konaseema Backwater Village Walk", type: "nature", location: "Konaseema", city: "Rajahmundry", country: "India", description: "Quiet canals and village life in the Godavari delta with a local host.", image: IMG.india1, price: 14, duration: "3h", crowdLevel: "low", accessibility: "Gentle paths", sustainabilityScore: 90, localImpactScore: 94, lat: 16.7, lng: 81.9, tags: ["nature","culture","family-friendly","budget-friendly","low-crowd"], safetyInfo: "Sun protection.", carbonFootprint: "Very low", bestTransport: "Boat transfer + short walk" },
  { id: "exp-12", name: "Home Kitchen Andhra Meal", type: "food", location: "Vijayawada outskirts", city: "Vijayawada", country: "India", description: "Cook and share a traditional Andhra meal in a family home.", image: IMG.india2, price: 16, duration: "3h", crowdLevel: "low", accessibility: "Ground floor", sustainabilityScore: 89, localImpactScore: 96, lat: 16.5062, lng: 80.648, tags: ["food","culture","family-friendly","budget-friendly"], safetyInfo: "Spice level adjustable.", carbonFootprint: "Low", bestTransport: "Short taxi or auto-rickshaw" },
  { id: "exp-13", name: "Kondapalli Wooden Toy Workshop", type: "artisan", location: "Kondapalli", city: "Vijayawada", country: "India", description: "Traditional wooden toy making with artisan families (GI craft).", image: IMG.india3, price: 12, duration: "2h", crowdLevel: "low", accessibility: "Seated options", sustainabilityScore: 92, localImpactScore: 97, lat: 16.62, lng: 80.54, tags: ["artisan","culture","family-friendly","budget-friendly","low-crowd"], safetyInfo: "Child-friendly with supervision.", carbonFootprint: "Very low" },
  { id: "exp-14", name: "Araku Valley Tribal Coffee Walk", type: "nature", location: "Araku Valley", city: "Visakhapatnam", country: "India", description: "Walk with Adivasi coffee growers; taste estate coffee; fair local trade.", image: IMG.forest, price: 22, duration: "4h", crowdLevel: "low", accessibility: "Moderate walking", sustainabilityScore: 94, localImpactScore: 95, lat: 18.327, lng: 82.877, tags: ["nature","food","culture","low-crowd"], safetyInfo: "Light jacket for mornings.", carbonFootprint: "Low" },
  { id: "exp-15", name: "Quiet Kyoto Temple Garden Morning", type: "culture", location: "Northern Higashiyama", city: "Kyoto", country: "Japan", description: "Early visit to a lesser-known temple garden with a cultural guide.", image: IMG.japan, price: 40, duration: "2.5h", crowdLevel: "low", accessibility: "Some steps", sustainabilityScore: 85, localImpactScore: 80, lat: 35.0116, lng: 135.7681, tags: ["culture","nature","low-crowd"], safetyInfo: "Quiet respect expected.", carbonFootprint: "Very low" },
  { id: "exp-16", name: "Rural Soba Making Class", type: "food", location: "Nagano countryside", city: "Nagano", country: "Japan", description: "Make soba with a family workshop away from city tourist kitchens.", image: IMG.foodjp, price: 45, duration: "3h", crowdLevel: "low", accessibility: "Seated", sustainabilityScore: 88, localImpactScore: 91, lat: 36.65, lng: 138.18, tags: ["food","culture","family-friendly","low-crowd"], safetyInfo: "Aprons provided.", carbonFootprint: "Low" },
  { id: "exp-17", name: "Oaxaca Market & Mole Tasting", type: "food", location: "Central markets", city: "Oaxaca", country: "Mexico", description: "Local markets with a chef-host; regional moles from family stalls.", image: IMG.mexico, price: 28, duration: "3h", crowdLevel: "medium", accessibility: "Walking", sustainabilityScore: 86, localImpactScore: 93, lat: 17.0732, lng: -96.7266, tags: ["food","culture","family-friendly"], safetyInfo: "Stay with guide.", carbonFootprint: "Low" },
  { id: "exp-18", name: "Zapotec Textile Cooperative", type: "artisan", location: "Teotitlán del Valle", city: "Oaxaca", country: "Mexico", description: "Natural-dye weaving with a women’s cooperative; purchases support artisans.", image: IMG.textile, price: 20, duration: "2.5h", crowdLevel: "low", accessibility: "Ground level", sustainabilityScore: 95, localImpactScore: 98, lat: 17.03, lng: -96.52, tags: ["artisan","culture","family-friendly","low-crowd"], safetyInfo: "Family-friendly.", carbonFootprint: "Very low" },
  { id: "exp-19", name: "Medina Side-Street Food Walk", type: "food", location: "Quiet medina lanes", city: "Fes", country: "Morocco", description: "Snack trail through quieter medina alleys with a local host.", image: IMG.morocco, price: 24, duration: "3h", crowdLevel: "medium", accessibility: "Uneven streets", sustainabilityScore: 84, localImpactScore: 90, lat: 34.0181, lng: -5.0078, tags: ["food","culture"], safetyInfo: "Follow host; modest dress.", carbonFootprint: "Low" },
  { id: "exp-20", name: "Atlas Village Day with Berber Host", type: "culture", location: "High Atlas foothills", city: "Near Marrakech", country: "Morocco", description: "Mountain village day: shared meal, stories, short walk with a local family.", image: IMG.atlas, price: 35, duration: "6h", crowdLevel: "low", accessibility: "Moderate walking", sustainabilityScore: 91, localImpactScore: 95, lat: 31.2, lng: -7.9, tags: ["culture","nature","family-friendly","low-crowd"], safetyInfo: "Sun and modest clothing.", carbonFootprint: "Low" },
  { id: "exp-21", name: "Sacred Valley Weaving Circle", type: "artisan", location: "Chinchero area", city: "Cusco region", country: "Peru", description: "Quechua weaving circle; natural dyes; support community textile work.", image: IMG.peru, price: 30, duration: "3h", crowdLevel: "low", accessibility: "Altitude; seated options", sustainabilityScore: 93, localImpactScore: 96, lat: -13.392, lng: -72.048, tags: ["artisan","culture","family-friendly","low-crowd"], safetyInfo: "Altitude awareness.", carbonFootprint: "Very low" },
  { id: "exp-22", name: "Lima Barranco Art & Café Walk", type: "culture", location: "Barranco", city: "Lima", country: "Peru", description: "Neighborhood murals and independent cafés with a local artist — not the main tourist loop.", image: IMG.lima, price: 18, duration: "2.5h", crowdLevel: "low", accessibility: "Mostly flat", sustainabilityScore: 82, localImpactScore: 85, lat: -12.149, lng: -77.021, tags: ["culture","food","budget-friendly","low-crowd"], safetyInfo: "Daytime recommended.", carbonFootprint: "Very low" },
  { id: "exp-23", name: "Tuscan Farm Olive Oil Morning", type: "food", location: "Chianti hills", city: "Near Florence", country: "Italy", description: "Family farm: olive grove, tasting, simple lunch — away from Florence day-trip crowds.", image: IMG.tuscany, price: 48, duration: "4h", crowdLevel: "low", accessibility: "Uneven farm paths", sustainabilityScore: 87, localImpactScore: 92, lat: 43.5, lng: 11.3, tags: ["food","nature","family-friendly","low-crowd"], safetyInfo: "Comfortable shoes.", carbonFootprint: "Low" },
  { id: "exp-24", name: "Chiang Mai Quiet Temple & Alms", type: "culture", location: "Outer old city", city: "Chiang Mai", country: "Thailand", description: "Respectful early alms and quiet temple with a cultural host.", image: IMG.thailand, price: 20, duration: "2.5h", crowdLevel: "low", accessibility: "Steps", sustainabilityScore: 88, localImpactScore: 86, lat: 18.7883, lng: 98.9853, tags: ["culture","low-crowd"], safetyInfo: "Modest dress.", carbonFootprint: "Very low" }
,
  { id: "exp-25", name: "Undavalli Caves Quiet Morning", type: "culture", location: "Undavalli", city: "Vijayawada", country: "India", description: "Early visit to the rock-cut Undavalli caves — a historic monument with fewer crowds before tour groups.", image: IMG.temple, price: 8, duration: "2h", crowdLevel: "low", accessibility: "Steps and uneven stone", sustainabilityScore: 88, localImpactScore: 90, lat: 16.479, lng: 80.582, tags: ["culture","historical","monuments","low-crowd","budget-friendly"], safetyInfo: "Wear shoes with grip; respect the site.", carbonFootprint: "Very low", bestTransport: "Taxi or local bus + short walk" },
  { id: "exp-26", name: "Bhavani Island Heritage Shore Walk", type: "nature", location: "Bhavani Island", city: "Vijayawada", country: "India", description: "Calm Krishna river island walk with local stories — quieter than the main city viewpoints.", image: IMG.india1, price: 10, duration: "2.5h", crowdLevel: "low", accessibility: "Mostly flat paths", sustainabilityScore: 86, localImpactScore: 88, lat: 16.520, lng: 80.600, tags: ["nature","historical","family-friendly","low-crowd","budget-friendly"], safetyInfo: "Sun protection; boat transfer may apply.", carbonFootprint: "Low" },
  { id: "exp-27", name: "Prakasam Barrage Sunset Viewpoint", type: "culture", location: "Krishna river", city: "Vijayawada", country: "India", description: "Local-led visit to the historic barrage area at softer light — avoid peak selfie rush hours.", image: IMG.india3, price: 6, duration: "1.5h", crowdLevel: "medium", accessibility: "Walking", sustainabilityScore: 80, localImpactScore: 82, lat: 16.506, lng: 80.605, tags: ["culture","historical","monuments","family-friendly","budget-friendly"], safetyInfo: "Stay on public paths.", carbonFootprint: "Very low" },
  { id: "exp-28", name: "Kanaka Durga Temple Off-Peak Visit", type: "culture", location: "Indrakeeladri", city: "Vijayawada", country: "India", description: "Respectful off-peak visit guidance from a local host familiar with temple etiquette and quieter timings.", image: IMG.temple, price: 5, duration: "2h", crowdLevel: "medium", accessibility: "Many steps", sustainabilityScore: 78, localImpactScore: 85, lat: 16.515, lng: 80.610, tags: ["culture","historical","monuments","family-friendly"], safetyInfo: "Modest dress; follow temple rules.", carbonFootprint: "Very low" },
  { id: "exp-29", name: "Borobudur Sunrise Outer Path", type: "culture", location: "Magelang area", city: "Central Java", country: "Indonesia", description: "Quiet approach and outer path perspective of the historic Borobudur complex with a local cultural host.", image: IMG.temple, price: 35, duration: "4h", crowdLevel: "medium", accessibility: "Walking; some slopes", sustainabilityScore: 82, localImpactScore: 84, lat: -7.6079, lng: 110.2038, tags: ["culture","historical","monuments"], safetyInfo: "Early start; official tickets required.", carbonFootprint: "Low" },
  { id: "exp-30", name: "Hampi Boulder & Ruin Circuit (quiet)", type: "culture", location: "Hampi outskirts", city: "Hampi", country: "India", description: "Lesser-used paths among historic ruins with a local guide — focus on stories, not only Instagram spots.", image: IMG.india1, price: 22, duration: "4h", crowdLevel: "low", accessibility: "Uneven rocky paths", sustainabilityScore: 88, localImpactScore: 91, lat: 15.3350, lng: 76.4600, tags: ["culture","historical","monuments","adventure","low-crowd"], safetyInfo: "Hat, water, sturdy shoes.", carbonFootprint: "Low" },
];

const GUIDES = [
  { id: "g1", name: "Made Wijaya", photo: IMG.person1, country: "Indonesia", city: "Ubud", languages: ["English", "Indonesian"], specialties: ["Nature", "Rice fields", "Culture"], bio: "Third-generation farmer-guide. Shows the quiet side of Bali and keeps income in his village.", pricePerHour: 12, phone: "+62 812-3456-1001", rating: 4.9, reviews: 87, verified: true, earningsNote: "Earns from walk & farm experiences", experiences: ["exp-1", "exp-7"] },
  { id: "g2", name: "Ni Wayan Sari", photo: IMG.person2, country: "Indonesia", city: "Sanur", languages: ["English", "Indonesian", "Dutch"], specialties: ["Cooking", "Markets"], bio: "Runs a family warung. Hosts cooking classes that support her household and neighbours.", pricePerHour: 15, phone: "+62 812-3456-1002", rating: 4.95, reviews: 124, verified: true, earningsNote: "Cooking classes & market tours", experiences: ["exp-2", "exp-10"] },
  { id: "g3", name: "Lakshmi Reddy", photo: IMG.person4, country: "India", city: "Vijayawada", languages: ["Telugu", "Hindi", "English"], specialties: ["Home cooking", "Culture", "Family"], bio: "Home-kitchen host in Vijayawada. Shares Andhra recipes and stories with respectful travelers.", pricePerHour: 10, phone: "+91 98765-43210", rating: 4.9, reviews: 56, verified: true, earningsNote: "Home meals & cultural hosting", experiences: ["exp-12"] },
  { id: "g4", name: "Ravi Kondapalli", photo: IMG.person3, country: "India", city: "Kondapalli", languages: ["Telugu", "English"], specialties: ["Artisan crafts", "Toys", "Heritage"], bio: "Part of a wooden-toy artisan family. Teaches the craft and sells community-made toys.", pricePerHour: 8, phone: "+91 98765-43211", rating: 4.8, reviews: 41, verified: true, earningsNote: "Workshops & craft sales", experiences: ["exp-13"] },
  { id: "g5", name: "Sita Naidu", photo: IMG.person6, country: "India", city: "Araku / Vizag", languages: ["Telugu", "Hindi", "English"], specialties: ["Coffee", "Nature", "Tribal culture"], bio: "Works with Adivasi coffee growers. Guides valley walks that pay farmers fairly.", pricePerHour: 12, phone: "+81 90-1234-5678", rating: 5.0, reviews: 33, verified: true, earningsNote: "Coffee walks & grower visits", experiences: ["exp-14", "exp-11"] },
  { id: "g6", name: "Yuki Tanaka", photo: IMG.person5, country: "Japan", city: "Kyoto", languages: ["Japanese", "English"], specialties: ["Temples", "Gardens", "Etiquette"], bio: "Cultural guide focused on quiet temples and proper etiquette for respectful visitors.", pricePerHour: 28, phone: "+52 951-123-4567", rating: 4.9, reviews: 92, verified: true, earningsNote: "Garden & temple mornings", experiences: ["exp-15"] },
  { id: "g7", name: "María López", photo: IMG.person2, country: "Mexico", city: "Oaxaca", languages: ["Spanish", "English"], specialties: ["Food", "Markets", "Mole"], bio: "Chef-host who leads market and mole tastings that support family food stalls.", pricePerHour: 18, phone: "+212 661-234567", rating: 4.85, reviews: 67, verified: true, earningsNote: "Market tours & tastings", experiences: ["exp-17"] },
  { id: "g8", name: "Fatima Amrani", photo: IMG.person4, country: "Morocco", city: "Fes", languages: ["Arabic", "French", "English"], specialties: ["Medina", "Food", "Culture"], bio: "Medina host for side-street food walks that avoid the most aggressive tourist traps.", pricePerHour: 14, phone: "+212 661-234568", rating: 4.9, reviews: 58, verified: true, earningsNote: "Food walks & village days", experiences: ["exp-19", "exp-20"] },
  { id: "g9", name: "José Quispe", photo: IMG.person1, country: "Peru", city: "Cusco region", languages: ["Spanish", "Quechua", "English"], specialties: ["Weaving", "Andes", "Community"], bio: "Connects travelers with Quechua weaving circles so income stays with artisans.", pricePerHour: 16, phone: "+51 984-123-456", rating: 4.95, reviews: 44, verified: true, earningsNote: "Weaving circles & valley walks", experiences: ["exp-21"] },
  { id: "g10", name: "Giulia Rossi", photo: IMG.person6, country: "Italy", city: "Chianti", languages: ["Italian", "English"], specialties: ["Farm", "Olive oil", "Food"], bio: "Family olive farm host. Small groups only — away from mass Florence tours.", pricePerHour: 25, phone: "+39 333-123-4567", rating: 4.9, reviews: 71, verified: true, earningsNote: "Farm mornings & tastings", experiences: ["exp-23"] },
  { id: "g11", name: "Somchai Phan", photo: IMG.person3, country: "Thailand", city: "Chiang Mai", languages: ["Thai", "English"], specialties: ["Temples", "Culture", "Alms"], bio: "Cultural host for quiet temple mornings and respectful alms participation.", pricePerHour: 12, phone: "+66 81-234-5678", rating: 4.85, reviews: 39, verified: true, earningsNote: "Temple & culture walks", experiences: ["exp-24"] },
  { id: "g12", name: "Ketut Adi", photo: IMG.person5, country: "Indonesia", city: "Nusa Ceningan", languages: ["Indonesian", "English"], specialties: ["Coast", "Snorkel", "Conservation"], bio: "Island guide linked to a local marine NGO. Quiet coves over crowded beaches.", pricePerHour: 18, phone: "+62 812-3456-1012", rating: 4.8, reviews: 52, verified: true, earningsNote: "Coastal trails & kayak", experiences: ["exp-3", "exp-9"] }
];

const SAMPLE_ITINERARY = [
  {
    day: 1, title: "Quiet Arrival & Local Flavors", totalCost: 37, sustainabilityScore: 89,
    activities: [
      { time: "09:00", name: "Community Market Food Trail", duration: "2.5h", cost: 12, crowdLevel: "medium", sustainabilityScore: 85, description: "Early market visit with a local host.", accessibility: "Walking" },
      { time: "12:30", name: "Family / Home Kitchen Class", duration: "4h", cost: 25, crowdLevel: "low", sustainabilityScore: 88, description: "Cook and share lunch in a family kitchen.", accessibility: "Ground floor" },
      { time: "17:30", name: "Quiet walk away from tourist core", duration: "1.5h", cost: 0, crowdLevel: "low", sustainabilityScore: 95, description: "Relaxed local neighbourhood or coast.", accessibility: "Flat path" }
    ]
  },
  {
    day: 2, title: "Craft & Countryside", totalCost: 53, sustainabilityScore: 91,
    activities: [
      { time: "07:00", name: "Nature / rice / valley walk", duration: "3h", cost: 18, crowdLevel: "low", sustainabilityScore: 92, description: "Quiet landscapes with a local host.", accessibility: "Moderate walking" },
      { time: "11:30", name: "Artisan workshop", duration: "3h", cost: 30, crowdLevel: "low", sustainabilityScore: 94, description: "Hands-on traditional craft.", accessibility: "Seated options" },
      { time: "16:00", name: "Low-crowd cultural site", duration: "1h", cost: 5, crowdLevel: "low", sustainabilityScore: 80, description: "Off-peak visit.", accessibility: "Varies" }
    ]
  },
  {
    day: 3, title: "Nature & Community", totalCost: 62, sustainabilityScore: 93,
    activities: [
      { time: "06:30", name: "Nature or conservation outing", duration: "3.5h", cost: 32, crowdLevel: "low", sustainabilityScore: 93, description: "Guided nature experience.", accessibility: "Assistance on request" },
      { time: "12:00", name: "Homestay-style lunch", duration: "1.5h", cost: 10, crowdLevel: "low", sustainabilityScore: 90, description: "Meal with a host family.", accessibility: "Ground level" },
      { time: "15:00", name: "Sustainable craft studio", duration: "2h", cost: 20, crowdLevel: "low", sustainabilityScore: 96, description: "Make a small takeaway item.", accessibility: "Often accessible" }
    ]
  }
];

const CROWD_DATA = [
  { location: "Major city landmark", crowd: 85, alternative: "Lesser-known neighbourhood or side museum" },
  { location: "Famous beach / viewpoint", crowd: 88, alternative: "Quieter stretch via local host" },
  { location: "Main temple / historic square", crowd: 80, alternative: "Smaller community site off-peak" },
  { location: "Central market (peak)", crowd: 75, alternative: "Neighbourhood market early morning" },
  { location: "Iconic photo spot", crowd: 92, alternative: "Similar scenery 20–40 min away" }
];

function getExp(id) { return EXPERIENCES.find(e => e.id === id); }
function getGuide(id) { return GUIDES.find(g => g.id === id); }
function guidesByCountry(country) {
  if (!country || country === "all") return GUIDES;
  return GUIDES.filter(g => g.country === country);
}
function crowdClass(level) {
  if (level === "high" || (typeof level === "number" && level >= 70)) return "tag-red";
  if (level === "medium" || (typeof level === "number" && level >= 40)) return "tag-amber";
  return "tag-green";
}
function crowdLabel(level) {
  const key = (level === "low" || level === "medium" || level === "high") ? level : "low";
  return typeof t === "function" ? t(key) : key;
}
function safeImg(url) {
  return url || IMG.fallback;
}
