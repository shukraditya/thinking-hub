# 🧠 Thinking Buddy

A guided learning application that promotes creativity and discovery from first principles. Instead of giving direct answers, Thinking Buddy uses AI-powered system prompts to guide users through thoughtful questions, helping them discover solutions themselves.

## Features

- 🎯 **Guided Learning**: AI guides you through questions instead of giving direct answers
- 👥 **Three Personas**: 
  - 🎒 School Student - For younger learners
  - 🎓 College Student - For advanced learners  
  - 💼 Working Professional - For practical learning
- 🧠 **First Principles Thinking**: Encourages discovery from fundamental concepts
- 💬 **Conversational Interface**: Natural chat-based learning experience
- 🎨 **Modern UI**: Beautiful, responsive design
- 🔄 **Automatic API Key Retry**: Supports multiple API keys with automatic failover when quota is exceeded

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Setup

1. **Clone and install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your Gemini API key(s):
   
   **Single key (basic):**
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=5000
   ```
   
   **Multiple keys (recommended for production):**
   ```
   GEMINI_API_KEY_1=your_first_api_key_here
   GEMINI_API_KEY_2=your_second_api_key_here
   GEMINI_API_KEY_3=your_third_api_key_here
   PORT=5000
   ```
   
   The system will automatically retry with the next key if one hits its quota limit, ensuring uninterrupted service without showing errors to users.

3. **Start the development servers:**
   ```bash
   npm run dev
   ```
   
   This will start both the backend server (port 5000) and frontend React app (port 3000).

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Project Structure

```
thinking-buddy/
├── server/
│   ├── index.js                 # Express server
│   └── services/
│       ├── geminiService.js     # Gemini API integration
│       └── personaService.js    # Persona-based prompts
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PersonaSelector.js
│   │   │   └── ChatInterface.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── .env.example
├── package.json
└── README.md
```

## How It Works

1. **Choose a Persona**: Select your learning style (School Student, College Student, or Working Professional)
2. **Ask Questions**: Type any question or problem you're working on
3. **Get Guided**: The AI will respond with thoughtful questions and hints, not direct answers
4. **Discover**: Work through the guided questions to discover the answer yourself

## System Prompts

Each persona has a carefully crafted system prompt that:
- Never gives direct answers immediately
- Uses the Socratic method and first-principles thinking
- Adapts to the user's level (school/college/professional)
- Encourages creativity and independent discovery

## API Key Management

The app supports multiple API keys for automatic failover:

- **Single Key**: Use `GEMINI_API_KEY` for basic setup
- **Multiple Keys**: Use `GEMINI_API_KEY_1`, `GEMINI_API_KEY_2`, etc. for production
- **Automatic Retry**: When a quota/rate limit error occurs, the system automatically tries the next available key
- **Seamless Experience**: Users never see quota errors - the system handles retries transparently
- **Smart Error Detection**: Only quota-related errors trigger retries; other errors fail immediately to avoid unnecessary retries

## Development

- **Backend only**: `npm run server`
- **Frontend only**: `npm run client`
- **Both**: `npm run dev`

## License

MIT

