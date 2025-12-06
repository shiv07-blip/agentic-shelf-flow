const Product = require('../models/Product');

const checkInventory = async (query) => {
  console.log("🔍 Inventory Agent: Searching database...");
  
  // Simple regex search for now (can be upgraded to vector search later)
  const products = await Product.find({ 
    name: { $regex: query, $options: 'i' } 
  });

  if (products.length === 0) {
    return {
      type: 'inventory_response',
      found: false,
      message: "I couldn't find that item in our catalog."
    };
  }

  // Logic: Check if it's available in-store or online
  const product = products[0]; // Taking the best match
  let message = "";

  if (product.stock.inStore.available && product.stock.inStore.quantity > 0) {
    message = `Good news! We have the **${product.name}** available at our **${product.stock.inStore.location}** branch.`;
  } else if (product.stock.online > 0) {
    message = `The **${product.name}** is out of stock in stores, but I can ship it to you from our online warehouse.`;
  } else {
    message = `Sorry, the **${product.name}** is currently out of stock everywhere.`;
  }

  return {
    type: 'inventory_response',
    found: true,
    product: product,
    message: message
  };
};

module.exports = { checkInventory };