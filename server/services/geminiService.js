const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

/**
 * Get all available API keys from environment variables
 * Supports GEMINI_API_KEY (single) or GEMINI_API_KEY_1, GEMINI_API_KEY_2, etc. (multiple)
 * @returns {string[]} Array of API keys
 */
function getApiKeys() {
  const keys = [];
  
  // Check for single key
  if (process.env.GEMINI_API_KEY) {
    keys.push(process.env.GEMINI_API_KEY);
  }
  
  // Check for multiple keys (GEMINI_API_KEY_1, GEMINI_API_KEY_2, etc.)
  let index = 1;
  while (process.env[`GEMINI_API_KEY_${index}`]) {
    keys.push(process.env[`GEMINI_API_KEY_${index}`]);
    index++;
  }
  
  if (keys.length === 0) {
    console.warn('Warning: No GEMINI_API_KEY found in environment variables');
  } else {
    console.log(`Loaded ${keys.length} API key(s) for retry mechanism`);
  }
  
  return keys;
}

const apiKeys = getApiKeys();

/**
 * Check if an error is a quota/rate limit error that should trigger retry
 * @param {Error} error - The error object
 * @returns {boolean} True if error indicates quota/rate limit
 */
function isQuotaError(error) {
  const errorMessage = error.message?.toLowerCase() || '';
  const errorCode = error.code || '';
  
  // Common quota/rate limit indicators
  const quotaIndicators = [
    'quota',
    'rate limit',
    'resource exhausted',
    '429',
    'too many requests',
    'quota exceeded',
    'billing',
    'permission denied',
    'api key not valid'
  ];
  
  return quotaIndicators.some(indicator => 
    errorMessage.includes(indicator) || 
    errorCode.toString().includes(indicator)
  );
}

/**
 * Generate a learning response using Gemini AI with automatic retry on quota errors
 * @param {string} userMessage - The user's question or message
 * @param {string} systemPrompt - The persona-based system prompt
 * @param {Array} conversationHistory - Previous messages in the conversation
 * @returns {Promise<string>} The AI's response
 */
async function generateLearningResponse(userMessage, systemPrompt, conversationHistory = []) {
  if (apiKeys.length === 0) {
    throw new Error('No API keys configured. Please set GEMINI_API_KEY in your .env file');
  }

  // Build the conversation context
  let conversationContext = systemPrompt + '\n\n';
  
  // Add conversation history if available
  if (conversationHistory.length > 0) {
    conversationContext += 'Previous conversation:\n';
    conversationHistory.forEach((msg, index) => {
      conversationContext += `${msg.role === 'user' ? 'Student' : 'Guide'}: ${msg.content}\n`;
    });
    conversationContext += '\n';
  }

  conversationContext += `Current question from student: ${userMessage}\n\n`;
  conversationContext += 'Provide your guided learning response:';

  // Try each API key until one works
  let lastError = null;
  
  for (let i = 0; i < apiKeys.length; i++) {
    const apiKey = apiKeys[i];
    
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

      const result = await model.generateContent(conversationContext);
      const response = await result.response;
      
      // Success! Log which key was used (only if multiple keys)
      if (apiKeys.length > 1 && i > 0) {
        console.log(`Successfully used API key ${i + 1} after ${i} failed attempt(s)`);
      }
      
      return response.text();
    } catch (error) {
      lastError = error;
      const isQuota = isQuotaError(error);
      
      console.error(`API key ${i + 1} failed:`, {
        error: error.message,
        isQuotaError: isQuota,
        hasMoreKeys: i < apiKeys.length - 1
      });
      
      // If it's a quota error and we have more keys, try the next one
      if (isQuota && i < apiKeys.length - 1) {
        console.log(`Quota exceeded on key ${i + 1}, retrying with key ${i + 2}...`);
        continue;
      }
      
      // If it's not a quota error, or it's the last key, throw immediately
      // (non-quota errors shouldn't be retried)
      if (!isQuota) {
        throw new Error(`Failed to generate response: ${error.message}`);
      }
    }
  }
  
  // All keys exhausted
  throw new Error(`All API keys have exceeded their quota. Please add more keys or wait for quota reset. Last error: ${lastError?.message || 'Unknown error'}`);
}

module.exports = { generateLearningResponse };

