// backend/agents/recommendation.js
const Product = require('../models/Product');

const getRecommendations = async (userMessage) => {
  console.log("🎨 Recommendation Agent: Analyzing style preferences...");

  // 1. Extract keywords (Basic NLP simulation)
  // If user says "suggest summer outfits", we look for "summer"
  const keywords = userMessage.toLowerCase().split(' ');
  
  // 2. Search DB for products with matching tags
  // We use $in operator to find products that have ANY of the keywords in their tags
  const recommendations = await Product.find({
    tags: { $in: keywords }
  }).limit(3); // Limit to top 3 suggestions

  if (recommendations.length === 0) {
    // Fallback: If no specific tags match, show trending items
    const trending = await Product.find().limit(3);
    return {
      type: 'recommendation_response',
      found: false,
      message: "I couldn't find a specific match for that style, but here are some trending items you might like:",
      data: trending
    };
  }

  return {
    type: 'recommendation_response',
    found: true,
    message: "Based on your request, I think you'll love these styles:",
    data: recommendations
  };
};

module.exports = { getRecommendations };