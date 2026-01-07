const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { generateLearningResponse } = require('./services/geminiService');
const { getPersonaPrompt } = require('./services/personaService');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Main learning endpoint
app.post('/api/learn', async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

