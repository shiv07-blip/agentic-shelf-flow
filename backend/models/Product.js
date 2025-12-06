const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  price: Number,
  description: String,
  tags: [String], // Helping the Recommendation Agent match styles
  stock: {
    online: { type: Number, default: 0 },
    inStore: { 
      available: { type: Boolean, default: false },
      location: String, // e.g., "Connaught Place Store"
      quantity: Number
    }
  },
  imageUrl: String
});

module.exports = mongoose.model('Product', productSchema);