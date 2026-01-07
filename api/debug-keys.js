// Debug endpoint to check if API keys are loaded (remove in production)
module.exports = (req, res) => {
  const keys = [];
  
  // Check for single key
  if (process.env.GEMINI_API_KEY) {
    keys.push('GEMINI_API_KEY: ✓ (hidden)');
  }
  
  // Check for multiple keys
  let index = 1;
  while (process.env[`GEMINI_API_KEY_${index}`]) {
    keys.push(`GEMINI_API_KEY_${index}: ✓ (hidden)`);
    index++;
  }
  
  res.json({
    keysFound: keys.length,
    keys: keys,
    allEnvKeys: Object.keys(process.env).filter(k => k.includes('GEMINI')).map(k => k + ': ✓'),
    message: keys.length > 0 
      ? `Found ${keys.length} API key(s)` 
      : 'No API keys found. Set GEMINI_API_KEY or GEMINI_API_KEY_1, GEMINI_API_KEY_2, etc. in Vercel dashboard.'
  });
};

