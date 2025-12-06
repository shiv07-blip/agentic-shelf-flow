const express = require('express');
const router = express.Router();
const { processMessage } = require('../agents/orchestrator');

router.post('/', async (req, res) => {
  const { message, userId } = req.body;
  
  try {
    const response = await processMessage(message);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Orchestrator Malfunction" });
  }
});

module.exports = router;