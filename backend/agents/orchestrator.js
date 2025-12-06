// backend/agents/orchestrator.js
const { checkInventory } = require('./inventory');
const { getRecommendations } = require('./recommendation');
const { processPayment } = require('./payment');

const processMessage = async (userMessage) => {
  const msg = userMessage.toLowerCase();
  console.log(`🤖 Orchestrator received: "${msg}"`);

  // --- INTENT 1: INVENTORY & STOCK ---
  if (msg.includes('have') || msg.includes('stock') || msg.includes('available') || msg.includes('find')) {
    return await checkInventory(msg);
  }
  
  // --- INTENT 2: RECOMMENDATIONS & STYLE ---
  // Matches "suggest", "outfit", "wear", "summer", "winter", "fashion"
  else if (msg.includes('suggest') || msg.includes('recommend') || msg.includes('outfit') || msg.includes('style') || msg.includes('looking for')) {
    return await getRecommendations(msg);
  }

  // --- INTENT 3: PAYMENT & CHECKOUT ---
  // Matches "buy", "pay", "checkout"
  else if (msg.includes('buy') || msg.includes('pay') || msg.includes('checkout')) {
    // For demo purposes, we assume a fixed amount (e.g., ₹1299)
    // In a real app, you'd fetch the cart total from the User model
    return await processPayment(1299, "UPI");
  }

  // --- FALLBACK ---
  else {
    return { 
      type: 'text', 
      message: "I am the BlockBusters Sales Agent. I can help you check stock, find outfits, or process payments." 
    };
  }
};

module.exports = { processMessage };