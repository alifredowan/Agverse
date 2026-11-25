const express = require('express');
const router = express.Router();
const { askClaude } = require('../services/claude');

// POST /api/ai/ask
router.post('/ask', async (req, res) => {
  const { prompt, system, model } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Field "prompt" is required.',
    });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({
      success: false,
      message: 'Claude API is installed, but ANTHROPIC_API_KEY is not configured yet. Please add your key to server/.env.',
    });
  }

  try {
    const answer = await askClaude(prompt, system, model);
    return res.json({
      success: true,
      answer,
    });
  } catch (err) {
    console.error('Claude API Error:', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Error communicating with Claude API.',
    });
  }
});

// GET /api/ai/status
router.get('/status', (req, res) => {
  const isConfigured = Boolean(process.env.ANTHROPIC_API_KEY);
  res.json({
    installed: true,
    sdk: '@anthropic-ai/sdk',
    configured: isConfigured,
    message: isConfigured
      ? 'Claude API is configured and ready.'
      : 'Claude API SDK is installed. Add ANTHROPIC_API_KEY in server/.env to enable completions.',
  });
});

module.exports = router;
