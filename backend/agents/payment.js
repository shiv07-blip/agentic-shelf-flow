// backend/agents/payment.js

const processPayment = async (amount, method) => {
  console.log(`💳 Payment Agent: Processing ${method} transaction for ₹${amount}...`);

  // Simulate a delay (like a real gateway)
  await new Promise(resolve => setTimeout(resolve, 1500));

  // LOGIC FROM YOUR DIAGRAM: "Detects failed UPI/payments"
  // We simulate a 20% failure rate to show off the "Retry" feature in your demo
  const isSuccess = Math.random() > 0.2; 

  if (!isSuccess) {
    return {
      type: 'payment_response',
      status: 'failed',
      message: `⚠️ Payment Failed. It looks like the ${method} server is not responding.`,
      suggestion: "Would you like to retry or switch to Cash on Delivery (COD)?",
      actionRequired: true
    };
  }

  // LOGIC FROM YOUR DIAGRAM: "Applies Coupons and Discounts"
  // If success, we simulate a small discount applied automatically
  const discount = Math.floor(amount * 0.05); // 5% discount
  const finalAmount = amount - discount;

  return {
    type: 'payment_response',
    status: 'success',
    message: `✅ Payment Successful! We applied a ₹${discount} loyalty discount.`,
    transactionId: "TXN_" + Math.floor(Math.random() * 1000000),
    finalAmount: finalAmount,
    receiptUrl: "https://example.com/receipt.pdf"
  };
};

module.exports = { processPayment };