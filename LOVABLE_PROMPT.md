# Thinking Buddy - Lovable Recreation Prompt

## App Overview

Create a guided learning application called "Thinking Buddy" that helps users discover answers through thoughtful questions rather than direct answers. The app uses AI (Gemini API) to guide users through first-principles thinking and the Socratic method, adapted to different learning levels.

## Core Concept

Instead of giving direct answers, the AI acts as a learning guide that:
- Asks thought-provoking questions
- Breaks problems into smaller parts
- Guides users to discover solutions themselves
- Uses first-principles thinking
- Adapts to different user personas (school student, college student, working professional)

## Key Features

### 1. Persona-Based Learning
Three distinct learning personas with tailored guidance styles:

**School Student (🎒)**
- Patient and encouraging
- Uses analogies and real-world examples
- Breaks complex problems into understandable parts
- Makes learning fun and engaging
- Celebrates small discoveries
- Connects new concepts to familiar ones

**College Student (🎓)**
- Uses Socratic method with probing questions
- Encourages first-principles thinking
- Challenges assumptions
- Helps construct logical arguments
- Guides exploration of edge cases
- Develops meta-cognitive skills

**Working Professional (💼)**
- Focuses on practical application
- Develops frameworks and mental models
- Encourages systems thinking
- Considers trade-offs and constraints
- Helps identify patterns
- Strategic and long-term perspective

### 2. User Interface

**Initial Screen:**
- Clean, centered persona selector
- Three large cards with icons (🎒 🎓 💼)
- Each card shows persona name and description
- Gradient purple background (linear-gradient(135deg, #667eea 0%, #764ba2 100%))
- Modern, rounded design with shadows

**Main Interface:**
- Header with hamburger menu (☰) on the left
- App title "🧠 Thinking Buddy" centered
- Subtitle showing current persona when in chat
- Collapsible left sidebar for recent chats
- Main chat interface on the right

**Sidebar Features:**
- Shows list of recent chats
- Each chat item displays:
  - Persona icon and name
  - Preview of first user message (truncated to 2 lines)
  - Relative timestamp (e.g., "5m ago", "2h ago", "3d ago")
- "New Chat" button at the top
- Active chat highlighted with gradient background
- Collapsible on desktop (can minimize to icon-only)
- Slide-in overlay on mobile

**Chat Interface:**
- Message bubbles with different styles for user vs assistant
- User messages: purple gradient background, white text, right-aligned
- Assistant messages: white background, dark text, left-aligned
- Smooth scrolling to latest message
- Typing indicator (three animated dots) when loading
- Input field at bottom with send button (🚀)
- Welcome message when no conversation started

### 3. Chat Management

- All chats saved to localStorage
- Each chat maintains its own conversation history
- Chats sorted by most recent
- Switching between chats preserves full history
- "New Chat" button resets to persona selector
- Clear conversation button with confirmation

### 4. API Integration

**Backend Requirements:**
- Express.js server
- Gemini API integration using @google/generative-ai
- Support for multiple API keys with automatic retry
- Quota error detection and failover
- Conversation history management

**API Endpoints:**
- `GET /api/health` - Health check
- `POST /api/learn` - Main learning endpoint
  - Body: `{ message, persona, conversationHistory }`
  - Returns: `{ response }`

**Multi-Key Support:**
- Supports `GEMINI_API_KEY` (single) or `GEMINI_API_KEY_1`, `GEMINI_API_KEY_2`, etc.
- Automatically retries with next key on quota errors
- Detects quota/rate limit errors (429, "quota exceeded", "rate limit", etc.)
- Only retries on quota errors, fails immediately on other errors
- Logs which key was used for debugging

### 5. System Prompts

Each persona has a detailed system prompt that:
- NEVER gives direct answers immediately
- Asks guiding questions instead
- Uses appropriate methods for the persona level
- Encourages discovery and creativity
- Provides hints when needed
- Celebrates progress

**Example Prompt Structure:**
```
You are a [persona description]. Your role is to help [users] discover answers through guided questions and creative thinking, NOT to give direct answers.

Key principles:
1. NEVER give the direct answer immediately
2. Ask thought-provoking questions that lead to discovery
3. [persona-specific principles...]

Your responses should:
- Start with acknowledging their question
- Ask 1-3 guiding questions
- Provide gentle hints if needed
- Encourage explanation of thinking process
- Celebrate progress
```

### 6. Technical Stack

**Frontend:**
- React 18
- Modern CSS with gradients and animations
- Responsive design (mobile-first)
- localStorage for chat persistence
- Axios for API calls

**Backend:**
- Node.js with Express
- @google/generative-ai for Gemini integration
- dotenv for environment variables
- CORS enabled

**Styling:**
- Purple gradient theme (#667eea to #764ba2)
- Rounded corners (15-20px border-radius)
- Box shadows for depth
- Smooth transitions (0.3s ease)
- Backdrop blur effects
- Modern, clean design

### 7. User Flow

1. User opens app → Sees persona selector
2. User selects persona → Chat interface appears, sidebar shows new chat
3. User asks question → AI responds with guiding questions
4. Conversation continues → Messages saved in real-time
5. User clicks "New Chat" → Returns to persona selector
6. User clicks sidebar chat → Switches to that conversation
7. User toggles sidebar → Shows/hides chat list

### 8. Responsive Behavior

**Mobile (< 768px):**
- Sidebar slides in from left with overlay
- Full-width sidebar when open
- Auto-closes after selecting chat
- Hamburger menu always visible

**Desktop (≥ 768px):**
- Sidebar can collapse to icon-only (60px width)
- No overlay needed
- Persistent sidebar
- Toggle button hidden (click sidebar to collapse)

### 9. Error Handling

- Graceful error messages if API fails
- Clear indication if API keys not configured
- Quota errors handled transparently with retry
- Network errors shown to user
- Conversation history preserved on errors

### 10. Visual Design Details

**Colors:**
- Primary gradient: #667eea → #764ba2
- Background: Gradient purple
- Cards: White with subtle shadows
- Text: Dark gray (#333) on light, white on gradient
- Borders: Light gray (#e0e0e0)

**Typography:**
- Headers: Bold, 1.5-3rem
- Body: 1rem, line-height 1.6
- Small text: 0.75-0.9rem
- Font: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', etc.)

**Animations:**
- Fade in for messages
- Slide transitions for sidebar
- Hover effects on buttons
- Typing indicator animation
- Smooth scroll to bottom

### 11. Implementation Notes

- Use React hooks (useState, useEffect, useRef)
- Implement proper state management for chats
- Handle localStorage for persistence
- Manage conversation history per chat
- Update timestamps when chats are active
- Sort chats by timestamp (newest first)
- Truncate chat previews to 2 lines with ellipsis
- Format timestamps as relative time
- Show persona in header when in chat
- Confirm before clearing conversation

### 12. Environment Setup

```env
GEMINI_API_KEY=your_key_here
# OR multiple keys:
GEMINI_API_KEY_1=key1
GEMINI_API_KEY_2=key2
GEMINI_API_KEY_3=key3
PORT=5000
```

### 13. File Structure

```
/
├── client/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── components/
│   │   │   ├── PersonaSelector.js
│   │   │   ├── PersonaSelector.css
│   │   │   ├── ChatInterface.js
│   │   │   ├── ChatInterface.css
│   │   │   ├── Sidebar.js
│   │   │   └── Sidebar.css
│   │   └── index.js
│   └── package.json
├── server/
│   ├── index.js
│   └── services/
│       ├── geminiService.js
│       └── personaService.js
└── package.json
```

## Success Criteria

The app should:
1. Show persona selector only on initial load or "New Chat"
2. Have a collapsible sidebar with recent chats
3. Persist all chats in localStorage
4. Support multiple API keys with automatic retry
5. Never give direct answers - only guide through questions
6. Adapt responses based on selected persona
7. Have a beautiful, modern UI with purple gradient theme
8. Work seamlessly on mobile and desktop
9. Show current persona in header when in chat
10. Handle errors gracefully without breaking UX

## Key Differentiators

- **No direct answers**: The AI should always guide, never tell
- **Persona-based**: Three distinct learning styles
- **Chat management**: Multiple conversations with history
- **Smart retry**: Multiple API keys with quota handling
- **Beautiful UI**: Modern gradient design with smooth animations

---

**Note for Lovable**: This is a full-stack application requiring both frontend (React) and backend (Node.js/Express) components. The backend handles Gemini API integration with multi-key retry logic, while the frontend provides an intuitive chat interface with persona selection and conversation management.

