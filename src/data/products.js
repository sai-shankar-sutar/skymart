
export const CATEGORY_META = {
  Electronics: { image: "https://loremflickr.com/400/300/electronics,gadgets" },
  Clothing: { image: "https://loremflickr.com/400/300/clothing,fashion" },
  Furniture: { image: "https://loremflickr.com/400/300/furniture,interior" },
  Home: { image: "https://loremflickr.com/400/300/homedecor,kitchen" },
  Sports: { image: "https://loremflickr.com/400/300/sports,fitness" },
  Accessories: { image: "https://loremflickr.com/400/300/accessories,bag" },
};


const IMAGE_STOPWORDS = new Set([
  "with", "and", "for", "the", "a", "an", "of", "to", "in", "on",
  "set", "kit", "pro", "premium", "official", "comfortable", "everyday",
  "adjustable", "modern", "classic", "series",
]);

function keywordsFor(product) {
  const words = product.name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w && !IMAGE_STOPWORDS.has(w));
  const topWords = words.slice(0, 3);
  return [...topWords, product.category.toLowerCase()].join(",");
}


function imageFor(product) {
  return `https://loremflickr.com/600/450/${keywordsFor(product)}`;
}

function descriptionFor(p) {
  return `${p.name} is one of our most-loved picks in ${p.category}, rated ${p.rating} out of 5 stars by ${p.reviews}+ customers. Built for everyday use, it combines solid quality with genuinely good value — the kind of product you buy once and stop thinking about.`;
}

const RAW_PRODUCTS = [
  // Electronics (17)
  { name: "Wireless Bluetooth Headphones", category: "Electronics", price: 99.99, rating: 5, reviews: 120, emoji: "🎧" },
  { name: "Smart Watch Series 5", category: "Electronics", price: 299.99, rating: 4, reviews: 85, emoji: "⌚" },
  { name: "4K Ultra HD Monitor", category: "Electronics", price: 349.99, rating: 5, reviews: 64 },
  { name: "Mechanical Keyboard", category: "Electronics", price: 149.99, rating: 4, reviews: 132 },
  { name: "Wireless Mouse", category: "Electronics", price: 49.99, rating: 5, reviews: 210, emoji: "🖱️" },
  { name: "Wireless Earbuds", category: "Electronics", price: 89.99, rating: 4, reviews: 167 },
  { name: "Smart Home Hub", category: "Electronics", price: 129.99, rating: 5, reviews: 134 },
  { name: "Fitness Tracker", category: "Electronics", price: 79.99, rating: 4, reviews: 189 },
  { name: "Bluetooth Speaker", category: "Electronics", price: 69.99, rating: 4, reviews: 156 },
  { name: "Gaming Headset", category: "Electronics", price: 119.99, rating: 5, reviews: 98 },
  { name: "Digital Camera", category: "Electronics", price: 449.99, rating: 4, reviews: 112 },
  { name: "Portable SSD Drive", category: "Electronics", price: 89.99, rating: 5, reviews: 77 },
  { name: "Noise Cancelling Earphones", category: "Electronics", price: 159.99, rating: 4, reviews: 143 },
  { name: "Smart LED Bulb Kit", category: "Electronics", price: 39.99, rating: 4, reviews: 96 },
  { name: "Portable Projector", category: "Electronics", price: 219.99, rating: 4, reviews: 58 },
  { name: "Action Camera", category: "Electronics", price: 189.99, rating: 5, reviews: 74 },
  { name: "USB-C Docking Station", category: "Electronics", price: 74.99, rating: 4, reviews: 61 },

  // Clothing (2)
  { name: "Comfortable Cotton T-Shirt", category: "Clothing", price: 24.99, rating: 4, reviews: 200 },
  { name: "Running Sneakers", category: "Clothing", price: 89.99, rating: 5, reviews: 175 },

  // Furniture (3)
  { name: "Ergonomic Office Chair", category: "Furniture", price: 199.99, rating: 5, reviews: 65 },
  { name: "Modern Accent Armchair", category: "Furniture", price: 249.99, rating: 4, reviews: 51 },
  { name: "Adjustable Standing Desk", category: "Furniture", price: 329.99, rating: 5, reviews: 88 },

  // Home (14)
  { name: "Stainless Steel Water Bottle", category: "Home", price: 34.99, rating: 4, reviews: 150 },
  { name: "Birthday Celebration Cake", category: "Home", price: 599.99, rating: 5, reviews: 40 },
  { name: "Modern Floor Lamp", category: "Home", price: 39.99, rating: 4, reviews: 145 },
  { name: "Coffee Maker", category: "Home", price: 89.99, rating: 5, reviews: 203 },
  { name: "Ceramic Dinnerware Set", category: "Home", price: 64.99, rating: 4, reviews: 92 },
  { name: "Scented Soy Candle Trio", category: "Home", price: 29.99, rating: 5, reviews: 118 },
  { name: "Memory Foam Pillow", category: "Home", price: 44.99, rating: 4, reviews: 133 },
  { name: "Cast Iron Skillet", category: "Home", price: 54.99, rating: 5, reviews: 101 },
  { name: "Cotton Throw Blanket", category: "Home", price: 42.99, rating: 4, reviews: 87 },
  { name: "Air Purifier", category: "Home", price: 149.99, rating: 4, reviews: 76 },
  { name: "Robot Vacuum Cleaner", category: "Home", price: 279.99, rating: 5, reviews: 164 },
  { name: "Bedside Table Organizer", category: "Home", price: 27.99, rating: 4, reviews: 59 },
  { name: "Wall Art Canvas Print", category: "Home", price: 49.99, rating: 4, reviews: 48 },
  { name: "Indoor Herb Garden Kit", category: "Home", price: 36.99, rating: 5, reviews: 71 },

  // Sports (8)
  { name: "Yoga Mat Premium", category: "Sports", price: 32.99, rating: 5, reviews: 142 },
  { name: "Adjustable Dumbbell Set", category: "Sports", price: 189.99, rating: 5, reviews: 109 },
  { name: "Resistance Bands Set", category: "Sports", price: 19.99, rating: 4, reviews: 167 },
  { name: "Insulated Sports Bottle", category: "Sports", price: 22.99, rating: 4, reviews: 94 },
  { name: "Foam Roller", category: "Sports", price: 26.99, rating: 4, reviews: 63 },
  { name: "Jump Rope Pro", category: "Sports", price: 14.99, rating: 5, reviews: 88 },
  { name: "Cycling Helmet", category: "Sports", price: 64.99, rating: 4, reviews: 55 },
  { name: "Basketball Official Size", category: "Sports", price: 29.99, rating: 5, reviews: 121 },

  // Accessories (6)
  { name: "Tablet Stand", category: "Accessories", price: 29.99, rating: 4, reviews: 87 },
  { name: "Everyday Backpack", category: "Accessories", price: 59.99, rating: 4, reviews: 178 },
  { name: "Classic Aviator Sunglasses", category: "Accessories", price: 44.99, rating: 4, reviews: 96 },
  { name: "Leather Wallet", category: "Accessories", price: 39.99, rating: 5, reviews: 132 },
  { name: "Minimalist Wristwatch", category: "Accessories", price: 79.99, rating: 4, reviews: 68 },
  { name: "Woven Phone Crossbody", category: "Accessories", price: 34.99, rating: 4, reviews: 54 },
];

export const PRODUCTS = RAW_PRODUCTS.map((p, i) => {
  const id = i + 1;
  const withId = { id, ...p };
  return {
    ...withId,
    image: imageFor(withId),
    description: descriptionFor(withId),
  };
});

export const CATEGORY_COUNTS = PRODUCTS.reduce((acc, p) => {
  acc[p.category] = (acc[p.category] || 0) + 1;
  return acc;
}, {});

export const TOP_RATED = [...PRODUCTS]
  .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
  .slice(0, 5);

export const NEW_ARRIVALS = [...PRODUCTS].slice(-5).reverse();
