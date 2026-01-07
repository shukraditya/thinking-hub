const { generateLearningResponse } = require('../server/services/geminiService');
const { getPersonaPrompt } = require('../server/services/personaService');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, persona, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!persona || !['school_student', 'college_student', 'working_professional'].includes(persona)) {
      return res.status(400).json({ error: 'Valid persona is required' });
    }

    const systemPrompt = getPersonaPrompt(persona);
    const response = await generateLearningResponse(message, systemPrompt, conversationHistory);

    res.json({ response });
  } catch (error) {
    console.error('Error in /api/learn:', error);
    res.status(500).json({ 
      error: 'Failed to generate learning response',
      message: error.message 
    });
  }
};

