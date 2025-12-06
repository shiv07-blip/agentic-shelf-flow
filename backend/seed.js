// backend/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Seeding'))
  .catch(err => console.error(err));

// 2. The Sample Data (Fashion & Retail Context)
const sampleProducts = [
  {
    name: "Classic Blue Denim Jacket",
    category: "Men's Fashion",
    price: 1299,
    description: "A vintage style denim jacket perfect for casual outings.",
    tags: ["denim", "jacket", "casual", "winter"],
    stock: {
      online: 50,
      inStore: {
        available: true,
        location: "Connaught Place, New Delhi",
        quantity: 12
      }
    },
    imageUrl: "https://example.com/denim-jacket.jpg"
  },
  {
    name: "Floral Summer Sundress",
    category: "Women's Fashion",
    price: 899,
    description: "Lightweight cotton dress with floral prints.",
    tags: ["summer", "dress", "floral", "casual"],
    stock: {
      online: 100,
      inStore: {
        available: false, // Online Only Scenario
        location: null,
        quantity: 0
      }
    },
    imageUrl: "https://example.com/floral-dress.jpg"
  },
  {
    name: "Urban Streetwear Hoodie",
    category: "Unisex",
    price: 2499,
    description: "Oversized hoodie with premium fabric.",
    tags: ["hoodie", "streetwear", "black", "winter"],
    stock: {
      online: 0,
      inStore: {
        available: true, // In-Store Only Scenario
        location: "Phoenix Mall, Mumbai",
        quantity: 5
      }
    },
    imageUrl: "https://example.com/hoodie.jpg"
  },
  {
    name: "Limited Edition Sneakers",
    category: "Footwear",
    price: 4999,
    description: "High-top sneakers with memory foam insoles.",
    tags: ["sneakers", "shoes", "sports", "running"],
    stock: {
      online: 0, // Out of Stock Scenario
      inStore: {
        available: false,
        location: null,
        quantity: 0
      }
    },
    imageUrl: "https://example.com/sneakers.jpg"
  },
  {
    name: "Smart Watch Series 5",
    category: "Electronics",
    price: 15999,
    description: "Tracks heart rate, steps, and sleep.",
    tags: ["electronics", "watch", "smart", "gadget"],
    stock: {
      online: 200,
      inStore: {
        available: true,
        location: "Cyber Hub, Gurugram",
        quantity: 25
      }
    },
    imageUrl: "https://example.com/smartwatch.jpg"
  }
];

// 3. Insert Data
const importData = async () => {
  try {
    // Clear existing data first to avoid duplicates
    await Product.deleteMany(); 
    console.log('🗑️  Old Data Destroyed...');

    // Insert new data
    await Product.insertMany(sampleProducts);
    console.log('🌱 Data Imported Successfully!');

    process.exit();
  } catch (error) {
    console.error('❌ Error with data import:', error);
    process.exit(1);
  }
};

importData();