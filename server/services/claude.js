const Anthropic = require('@anthropic-ai/sdk');

// Initialize Anthropic client using environment variable ANTHROPIC_API_KEY
let anthropicClient = null;

function getClient() {
  if (!anthropicClient) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error(
        'ANTHROPIC_API_KEY is not set in environment or server/.env. Please configure it to use Claude API.'
      );
    }
    anthropicClient = new Anthropic({ apiKey });
  }
  return anthropicClient;
}

/**
 * Ask Claude a prompt with system guidance
 * @param {string} prompt - User query or question
 * @param {string} [system] - Optional system prompt
 * @param {string} [model] - Claude model (default: claude-3-5-sonnet-latest)
 */
async function askClaude(prompt, system = '', model = 'claude-3-5-sonnet-latest') {
  const client = getClient();

  const response = await client.messages.create({
    model,
    max_tokens: 1024,
    system: system || 'You are AGverse Intelligence, an autonomous agricultural expert in Dubai specializing in precision farming, robotics, drones, and zero-waste crop production.',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  return response.content[0].text;
}

module.exports = {
  getClient,
  askClaude,
};
