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
  { id: "p1", name: "Alphonso Mangoes", brand: "Farm Fresh", price: 349, mrp: 499, unit: "1 kg", eta: "8 min", rating: 4.8, category: "fruits", emoji: "🥭", tag: "Bestseller" },
  { id: "p2", name: "Avocado Hass", brand: "Imported", price: 199, mrp: 249, unit: "2 pcs", eta: "8 min", rating: 4.6, category: "fruits", emoji: "🥑", tag: "Organic" },
  { id: "p3", name: "Strawberries", brand: "Mahabaleshwar", price: 159, mrp: 199, unit: "250 g", eta: "10 min", rating: 4.7, category: "fruits", emoji: "🍓", tag: "New" },
  { id: "p4", name: "Bananas Robusta", brand: "Local", price: 49, mrp: 69, unit: "1 dozen", eta: "8 min", rating: 4.5, category: "fruits", emoji: "🍌" },
  { id: "p5", name: "Broccoli", brand: "Farm Fresh", price: 89, mrp: 120, unit: "500 g", eta: "10 min", rating: 4.4, category: "veg", emoji: "🥦", tag: "Organic" },
  { id: "p6", name: "Cherry Tomatoes", brand: "Hydroponic", price: 79, mrp: 99, unit: "250 g", eta: "8 min", rating: 4.6, category: "veg", emoji: "🍅" },
  { id: "p7", name: "Bell Pepper Mix", brand: "Premium", price: 129, mrp: 159, unit: "3 pcs", eta: "10 min", rating: 4.5, category: "veg", emoji: "🫑" },
  { id: "p8", name: "Full Cream Milk", brand: "Amul Gold", price: 68, mrp: 70, unit: "1 L", eta: "6 min", rating: 4.9, category: "dairy", emoji: "🥛", tag: "Bestseller" },
  { id: "p9", name: "Free Range Eggs", brand: "Happy Hens", price: 159, mrp: 199, unit: "12 pcs", eta: "8 min", rating: 4.8, category: "dairy", emoji: "🥚", tag: "Organic" },
  { id: "p10", name: "Artisan Sourdough", brand: "Theobroma", price: 220, mrp: 260, unit: "400 g", eta: "12 min", rating: 4.7, category: "bakery", emoji: "🥖", tag: "New" },
  { id: "p11", name: "Butter Croissant", brand: "L'Opera", price: 89, mrp: 110, unit: "2 pcs", eta: "12 min", rating: 4.6, category: "bakery", emoji: "🥐" },
  { id: "p12", name: "Dark Chocolate 70%", brand: "Lindt", price: 299, mrp: 350, unit: "100 g", eta: "8 min", rating: 4.9, category: "snacks", emoji: "🍫", tag: "Flash" },
  { id: "p13", name: "Cold Brew Coffee", brand: "Blue Tokai", price: 180, mrp: 220, unit: "250 ml", eta: "8 min", rating: 4.7, category: "drinks", emoji: "☕" },
  { id: "p14", name: "Sparkling Water", brand: "Perrier", price: 199, mrp: 240, unit: "750 ml", eta: "8 min", rating: 4.5, category: "drinks", emoji: "💧" },
  { id: "p15", name: "Atlantic Salmon", brand: "Fresh Catch", price: 599, mrp: 749, unit: "300 g", eta: "15 min", rating: 4.8, category: "meat", emoji: "🐟", tag: "Bestseller" },
  { id: "p16", name: "Organic Honey", brand: "Conscious Food", price: 449, mrp: 549, unit: "500 g", eta: "10 min", rating: 4.9, category: "snacks", emoji: "🍯", tag: "Organic" },
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
  { id: "#NK-8421", customer: "Aarav S.", items: 7, total: 1240, status: "Packing", eta: "6 min", area: "Indiranagar" },
  { id: "#NK-8420", customer: "Priya M.", items: 3, total: 480, status: "Out for delivery", eta: "2 min", area: "Koramangala" },
  { id: "#NK-8419", customer: "Rohan K.", items: 12, total: 2150, status: "Picking", eta: "9 min", area: "HSR Layout" },
  { id: "#NK-8418", customer: "Sneha R.", items: 5, total: 720, status: "Delivered", eta: "—", area: "Whitefield" },
  { id: "#NK-8417", customer: "Vikram P.", items: 9, total: 1680, status: "Out for delivery", eta: "4 min", area: "Jayanagar" },
];

export const testimonials = [
  { name: "Ananya Iyer", role: "Mom of two, Bengaluru", quote: "Groceries land at my door before my chai is ready. The AI reorder is uncanny — it just knows.", avatar: "👩🏽" },
  { name: "Karthik Menon", role: "Café Owner", quote: "We restock the café through NammaKart Pro. Fresher produce than the wholesale market, no haggling.", avatar: "👨🏽‍🍳" },
  { name: "Divya Shah", role: "Marathon runner", quote: "The nutrition-aware suggestions actually fit my training cycle. Game-changer for meal prep.", avatar: "🏃🏽‍♀️" },
];
