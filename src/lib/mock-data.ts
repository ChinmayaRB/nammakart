export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  unit: string;
  eta: string;
  rating: number;
  category: string;
  emoji: string;
  tag?: "Bestseller" | "New" | "Flash" | "Organic";
};

export const categories = [
  { id: "fruits", name: "Fresh Fruits", emoji: "🍎", color: "from-fuchsia-400/30 to-purple-300/30" },
  { id: "veg", name: "Vegetables", emoji: "🥦", color: "from-violet-400/30 to-purple-300/30" },
  { id: "dairy", name: "Dairy & Eggs", emoji: "🥛", color: "from-indigo-300/30 to-violet-300/30" },
  { id: "bakery", name: "Bakery", emoji: "🥐", color: "from-purple-300/30 to-pink-300/30" },
  { id: "snacks", name: "Snacks", emoji: "🍿", color: "from-fuchsia-300/30 to-violet-300/30" },
  { id: "drinks", name: "Beverages", emoji: "🥤", color: "from-violet-300/30 to-indigo-300/30" },
  { id: "meat", name: "Meat & Fish", emoji: "🍗", color: "from-purple-300/30 to-rose-300/30" },
  { id: "home", name: "Home Care", emoji: "🧴", color: "from-violet-300/30 to-purple-300/30" },
  { id: "baby", name: "Baby Care", emoji: "🍼", color: "from-pink-300/30 to-fuchsia-300/30" },
  { id: "pet", name: "Pet Care", emoji: "🐾", color: "from-purple-300/30 to-violet-300/30" },
  { id: "frozen", name: "Frozen Foods", emoji: "🧊", color: "from-indigo-300/30 to-cyan-300/30" },
  { id: "breakfast", name: "Breakfast", emoji: "🥣", color: "from-amber-300/30 to-fuchsia-300/30" },
  { id: "sweets", name: "Sweets & Mithai", emoji: "🍬", color: "from-pink-300/30 to-purple-300/30" },
  { id: "icecream", name: "Ice Cream", emoji: "🍦", color: "from-fuchsia-300/30 to-pink-300/30" },
  { id: "tea", name: "Tea & Coffee", emoji: "🫖", color: "from-purple-400/30 to-violet-300/30" },
  { id: "atta", name: "Atta, Rice & Dal", emoji: "🌾", color: "from-amber-300/30 to-violet-300/30" },
  { id: "spices", name: "Masala & Oils", emoji: "🧂", color: "from-orange-300/30 to-fuchsia-300/30" },
  { id: "instant", name: "Instant Food", emoji: "🍜", color: "from-violet-300/30 to-rose-300/30" },
  { id: "beauty", name: "Beauty", emoji: "💄", color: "from-pink-300/30 to-violet-300/30" },
  { id: "health", name: "Pharma & Wellness", emoji: "💊", color: "from-violet-300/30 to-fuchsia-300/30" },
  { id: "stationery", name: "Stationery", emoji: "✏️", color: "from-indigo-300/30 to-purple-300/30" },
  { id: "electronics", name: "Electronics", emoji: "🎧", color: "from-purple-300/30 to-indigo-300/30" },
  { id: "kitchen", name: "Kitchen", emoji: "🍳", color: "from-fuchsia-300/30 to-purple-300/30" },
  { id: "gifts", name: "Gifts & Party", emoji: "🎁", color: "from-pink-300/30 to-fuchsia-300/30" },
];

export const products: Product[] = [
  { id: "p1", name: "Alphonso Mangoes", brand: "Farm Fresh", price: 349, mrp: 499, unit: "1 kg", eta: "10 min", rating: 4.8, category: "fruits", emoji: "🥭", tag: "Bestseller" },
  { id: "p2", name: "Avocado Hass", brand: "Imported", price: 199, mrp: 249, unit: "2 pcs", eta: "10 min", rating: 4.6, category: "fruits", emoji: "🥑", tag: "Organic" },
  { id: "p3", name: "Strawberries", brand: "Mahabaleshwar", price: 159, mrp: 199, unit: "250 g", eta: "10 min", rating: 4.7, category: "fruits", emoji: "🍓", tag: "New" },
  { id: "p4", name: "Bananas Robusta", brand: "Local", price: 49, mrp: 69, unit: "1 dozen", eta: "10 min", rating: 4.5, category: "fruits", emoji: "🍌" },
  { id: "p5", name: "Broccoli", brand: "Farm Fresh", price: 89, mrp: 120, unit: "500 g", eta: "10 min", rating: 4.4, category: "veg", emoji: "🥦", tag: "Organic" },
  { id: "p6", name: "Cherry Tomatoes", brand: "Hydroponic", price: 79, mrp: 99, unit: "250 g", eta: "10 min", rating: 4.6, category: "veg", emoji: "🍅" },
  { id: "p7", name: "Bell Pepper Mix", brand: "Premium", price: 129, mrp: 159, unit: "3 pcs", eta: "10 min", rating: 4.5, category: "veg", emoji: "🫑" },
  { id: "p8", name: "Full Cream Milk", brand: "Amul Gold", price: 68, mrp: 70, unit: "1 L", eta: "10 min", rating: 4.9, category: "dairy", emoji: "🥛", tag: "Bestseller" },
  { id: "p9", name: "Free Range Eggs", brand: "Happy Hens", price: 159, mrp: 199, unit: "12 pcs", eta: "10 min", rating: 4.8, category: "dairy", emoji: "🥚", tag: "Organic" },
  { id: "p10", name: "Artisan Sourdough", brand: "Theobroma", price: 220, mrp: 260, unit: "400 g", eta: "12 min", rating: 4.7, category: "bakery", emoji: "🥖", tag: "New" },
  { id: "p11", name: "Butter Croissant", brand: "L'Opera", price: 89, mrp: 110, unit: "2 pcs", eta: "12 min", rating: 4.6, category: "bakery", emoji: "🥐" },
  { id: "p12", name: "Dark Chocolate 70%", brand: "Lindt", price: 299, mrp: 350, unit: "100 g", eta: "10 min", rating: 4.9, category: "snacks", emoji: "🍫", tag: "Flash" },
  { id: "p13", name: "Cold Brew Coffee", brand: "Blue Tokai", price: 180, mrp: 220, unit: "250 ml", eta: "10 min", rating: 4.7, category: "drinks", emoji: "☕" },
  { id: "p14", name: "Sparkling Water", brand: "Perrier", price: 199, mrp: 240, unit: "750 ml", eta: "10 min", rating: 4.5, category: "drinks", emoji: "💧" },
  { id: "p15", name: "Atlantic Salmon", brand: "Fresh Catch", price: 599, mrp: 749, unit: "300 g", eta: "15 min", rating: 4.8, category: "meat", emoji: "🐟", tag: "Bestseller" },
  { id: "p16", name: "Organic Honey", brand: "Conscious Food", price: 449, mrp: 549, unit: "500 g", eta: "10 min", rating: 4.9, category: "snacks", emoji: "🍯", tag: "Organic" },
  { id: "p17", name: "Greek Yogurt", brand: "Epigamia", price: 70, mrp: 90, unit: "150 g", eta: "10 min", rating: 4.7, category: "dairy", emoji: "🍦" },
  { id: "p18", name: "Mozzarella Cheese", brand: "Go", price: 199, mrp: 249, unit: "200 g", eta: "10 min", rating: 4.6, category: "dairy", emoji: "🧀" },
  { id: "p19", name: "Whole Wheat Bread", brand: "Britannia", price: 55, mrp: 65, unit: "400 g", eta: "10 min", rating: 4.5, category: "bakery", emoji: "🍞" },
  { id: "p20", name: "Choco Chip Cookies", brand: "Unibic", price: 99, mrp: 120, unit: "250 g", eta: "10 min", rating: 4.6, category: "snacks", emoji: "🍪" },
  { id: "p21", name: "Salted Potato Chips", brand: "Lay's", price: 30, mrp: 40, unit: "90 g", eta: "10 min", rating: 4.4, category: "snacks", emoji: "🥔" },
  { id: "p22", name: "Roasted Almonds", brand: "Happilo", price: 399, mrp: 499, unit: "500 g", eta: "10 min", rating: 4.8, category: "snacks", emoji: "🥜", tag: "Bestseller" },
  { id: "p23", name: "Mango Juice", brand: "Tropicana", price: 110, mrp: 140, unit: "1 L", eta: "10 min", rating: 4.5, category: "drinks", emoji: "🧃" },
  { id: "p24", name: "Sparkling Kombucha", brand: "Atmosphere", price: 180, mrp: 220, unit: "300 ml", eta: "10 min", rating: 4.6, category: "drinks", emoji: "🍶", tag: "New" },
  { id: "p25", name: "Cola Pack", brand: "Coca-Cola", price: 220, mrp: 260, unit: "6 × 300 ml", eta: "10 min", rating: 4.7, category: "drinks", emoji: "🥤" },
  { id: "p26", name: "Chicken Breast", brand: "Licious", price: 349, mrp: 449, unit: "500 g", eta: "12 min", rating: 4.8, category: "meat", emoji: "🍗" },
  { id: "p27", name: "Prawns Cleaned", brand: "Fresh Catch", price: 549, mrp: 699, unit: "400 g", eta: "12 min", rating: 4.6, category: "meat", emoji: "🦐" },
  { id: "p28", name: "Floor Cleaner", brand: "Lizol", price: 199, mrp: 240, unit: "975 ml", eta: "10 min", rating: 4.6, category: "home", emoji: "🧽" },
  { id: "p29", name: "Dishwash Liquid", brand: "Pril", price: 169, mrp: 199, unit: "750 ml", eta: "10 min", rating: 4.5, category: "home", emoji: "🧴" },
  { id: "p30", name: "Diapers Pants L", brand: "Pampers", price: 549, mrp: 699, unit: "44 pcs", eta: "10 min", rating: 4.8, category: "baby", emoji: "🍼", tag: "Bestseller" },
  { id: "p31", name: "Baby Wipes", brand: "Mamaearth", price: 199, mrp: 249, unit: "72 pcs", eta: "10 min", rating: 4.7, category: "baby", emoji: "🧷" },
  { id: "p32", name: "Dog Food Adult", brand: "Pedigree", price: 449, mrp: 520, unit: "1.2 kg", eta: "10 min", rating: 4.7, category: "pet", emoji: "🐶" },
  { id: "p33", name: "Cat Litter", brand: "Drools", price: 320, mrp: 380, unit: "5 kg", eta: "10 min", rating: 4.5, category: "pet", emoji: "🐱" },
  { id: "p34", name: "Frozen Peas", brand: "Safal", price: 99, mrp: 120, unit: "500 g", eta: "10 min", rating: 4.6, category: "frozen", emoji: "🫛" },
  { id: "p35", name: "Veg Spring Rolls", brand: "McCain", price: 199, mrp: 240, unit: "300 g", eta: "10 min", rating: 4.5, category: "frozen", emoji: "🥟" },
  { id: "p36", name: "Muesli Fruit & Nut", brand: "Yogabar", price: 399, mrp: 499, unit: "700 g", eta: "10 min", rating: 4.8, category: "breakfast", emoji: "🥣", tag: "Organic" },
  { id: "p37", name: "Oats Rolled", brand: "Quaker", price: 169, mrp: 199, unit: "1 kg", eta: "10 min", rating: 4.7, category: "breakfast", emoji: "🌾" },
  { id: "p38", name: "Kaju Katli", brand: "Haldiram's", price: 525, mrp: 620, unit: "500 g", eta: "10 min", rating: 4.9, category: "sweets", emoji: "🍬", tag: "Bestseller" },
  { id: "p39", name: "Gulab Jamun Tin", brand: "Gits", price: 215, mrp: 260, unit: "1 kg", eta: "10 min", rating: 4.6, category: "sweets", emoji: "🍡" },
  { id: "p40", name: "Choco Almond Tub", brand: "Häagen-Dazs", price: 599, mrp: 699, unit: "473 ml", eta: "10 min", rating: 4.9, category: "icecream", emoji: "🍨", tag: "Flash" },
  { id: "p41", name: "Kulfi Pista", brand: "Amul", price: 90, mrp: 110, unit: "4 pcs", eta: "10 min", rating: 4.7, category: "icecream", emoji: "🍦" },
  { id: "p42", name: "Masala Chai Leaves", brand: "Tata Tea", price: 290, mrp: 340, unit: "500 g", eta: "10 min", rating: 4.7, category: "tea", emoji: "🍵" },
  { id: "p43", name: "Espresso Beans", brand: "Blue Tokai", price: 549, mrp: 620, unit: "250 g", eta: "10 min", rating: 4.8, category: "tea", emoji: "☕", tag: "New" },
  { id: "p44", name: "Basmati Rice", brand: "India Gate", price: 599, mrp: 720, unit: "5 kg", eta: "10 min", rating: 4.8, category: "atta", emoji: "🍚" },
  { id: "p45", name: "Whole Wheat Atta", brand: "Aashirvaad", price: 320, mrp: 380, unit: "5 kg", eta: "10 min", rating: 4.7, category: "atta", emoji: "🌾" },
  { id: "p46", name: "Toor Dal", brand: "Tata Sampann", price: 179, mrp: 220, unit: "1 kg", eta: "10 min", rating: 4.6, category: "atta", emoji: "🫘" },
  { id: "p47", name: "Garam Masala", brand: "MDH", price: 95, mrp: 120, unit: "100 g", eta: "10 min", rating: 4.8, category: "spices", emoji: "🧂" },
  { id: "p48", name: "Cold-Pressed Mustard Oil", brand: "Fortune", price: 220, mrp: 260, unit: "1 L", eta: "10 min", rating: 4.6, category: "spices", emoji: "🫙" },
  { id: "p49", name: "Maggi Masala Pack", brand: "Nestlé", price: 96, mrp: 120, unit: "8 pcs", eta: "10 min", rating: 4.7, category: "instant", emoji: "🍜", tag: "Bestseller" },
  { id: "p50", name: "Korean Ramyun", brand: "Nongshim", price: 220, mrp: 260, unit: "4 pcs", eta: "10 min", rating: 4.7, category: "instant", emoji: "🍲", tag: "New" },
  { id: "p51", name: "Vitamin C Serum", brand: "Minimalist", price: 599, mrp: 699, unit: "30 ml", eta: "10 min", rating: 4.8, category: "beauty", emoji: "🧴" },
  { id: "p52", name: "Matte Lipstick", brand: "Sugar", price: 499, mrp: 599, unit: "1 pc", eta: "10 min", rating: 4.7, category: "beauty", emoji: "💄" },
  { id: "p53", name: "Paracetamol 500mg", brand: "Dolo", price: 32, mrp: 40, unit: "15 tabs", eta: "10 min", rating: 4.9, category: "health", emoji: "💊" },
  { id: "p54", name: "Hand Sanitizer", brand: "Dettol", price: 99, mrp: 130, unit: "500 ml", eta: "10 min", rating: 4.6, category: "health", emoji: "🧼" },
  { id: "p55", name: "A4 Notebook Pack", brand: "Classmate", price: 240, mrp: 300, unit: "6 pcs", eta: "10 min", rating: 4.6, category: "stationery", emoji: "📒" },
  { id: "p56", name: "Gel Pens", brand: "Uniball", price: 220, mrp: 260, unit: "10 pcs", eta: "10 min", rating: 4.7, category: "stationery", emoji: "🖊️" },
  { id: "p57", name: "Wireless Earbuds", brand: "boAt", price: 1499, mrp: 2999, unit: "1 pair", eta: "10 min", rating: 4.5, category: "electronics", emoji: "🎧", tag: "Flash" },
  { id: "p58", name: "USB-C Charger 30W", brand: "Mi", price: 999, mrp: 1499, unit: "1 pc", eta: "10 min", rating: 4.6, category: "electronics", emoji: "🔌" },
  { id: "p59", name: "Non-Stick Tawa", brand: "Prestige", price: 899, mrp: 1199, unit: "28 cm", eta: "10 min", rating: 4.7, category: "kitchen", emoji: "🍳" },
  { id: "p60", name: "Glass Storage Jars", brand: "Borosil", price: 749, mrp: 899, unit: "Set of 3", eta: "10 min", rating: 4.7, category: "kitchen", emoji: "🫙" },
  { id: "p61", name: "Birthday Candles", brand: "Party Hub", price: 99, mrp: 140, unit: "20 pcs", eta: "10 min", rating: 4.5, category: "gifts", emoji: "🕯️" },
  { id: "p62", name: "Gift Wrap Set", brand: "Hallmark", price: 299, mrp: 380, unit: "5 sheets", eta: "10 min", rating: 4.6, category: "gifts", emoji: "🎁", tag: "New" },
];

export const revenueData = [
  { day: "Mon", revenue: 124000, orders: 1240 },
  { day: "Tue", revenue: 138000, orders: 1380 },
  { day: "Wed", revenue: 156000, orders: 1520 },
  { day: "Thu", revenue: 142000, orders: 1410 },
  { day: "Fri", revenue: 198000, orders: 1890 },
  { day: "Sat", revenue: 234000, orders: 2210 },
  { day: "Sun", revenue: 218000, orders: 2050 },
];

export const categoryShare = [
  { name: "Fruits & Veg", value: 32 },
  { name: "Dairy", value: 18 },
  { name: "Snacks", value: 22 },
  { name: "Beverages", value: 14 },
  { name: "Others", value: 14 },
];

export const liveOrders = [
  { id: "#NK-8421", customer: "Aarav S.", items: 7, total: 1240, status: "Packing", eta: "10 min", area: "Indiranagar" },
  { id: "#NK-8420", customer: "Priya M.", items: 3, total: 480, status: "Out for delivery", eta: "2 min", area: "Koramangala" },
  { id: "#NK-8419", customer: "Rohan K.", items: 12, total: 2150, status: "Picking", eta: "9 min", area: "HSR Layout" },
  { id: "#NK-8418", customer: "Sneha R.", items: 5, total: 720, status: "Delivered", eta: "—", area: "Whitefield" },
  { id: "#NK-8417", customer: "Vikram P.", items: 9, total: 1680, status: "Out for delivery", eta: "4 min", area: "Jayanagar" },
];

export const testimonials = [
  { name: "Ananya Iyer", role: "Mom of two, Bengaluru", quote: "Groceries land at my door before my chai is ready. The AI reorder is uncanny — it just knows.", avatar: "👩🏽" },
  { name: "Karthik Menon", role: "Café Owner", quote: "We restock the café through KnightKart Pro. Fresher produce than the wholesale market, no haggling.", avatar: "👨🏽‍🍳" },
  { name: "Divya Shah", role: "Marathon runner", quote: "The nutrition-aware suggestions actually fit my training cycle. Game-changer for meal prep.", avatar: "🏃🏽‍♀️" },
];
