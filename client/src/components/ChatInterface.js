import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatInterface.css';

function ChatInterface({ persona, conversationHistory, setConversationHistory, onNewChat }) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setIsLoading(true);

    // Add user message to history
    const updatedHistory = [
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];
    setConversationHistory(updatedHistory);

    try {
      const response = await axios.post('/api/learn', {
        message: userMessage,
        persona: persona,
        conversationHistory: conversationHistory
      });

      // Add AI response to history
      setConversationHistory([
        ...updatedHistory,
        { role: 'assistant', content: response.data.response }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setConversationHistory([
        ...updatedHistory,
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please make sure your GEMINI_API_KEY is set correctly in the .env file.' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    if (window.confirm('Are you sure you want to clear this conversation?')) {
      setConversationHistory([]);
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2>Learning Conversation</h2>
        <div className="chat-header-actions">
          <button onClick={onNewChat} className="new-chat-button-header">
            New Chat
          </button>
          {conversationHistory.length > 0 && (
            <button onClick={clearConversation} className="clear-button">
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="chat-messages">
        {conversationHistory.length === 0 ? (
          <div className="welcome-message">
            <p>👋 Welcome! Ask me anything, and I'll guide you to discover the answer through thoughtful questions.</p>
            <p className="hint">I won't give you direct answers - instead, I'll help you think through problems from first principles!</p>
          </div>
        ) : (
          conversationHistory.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              <div className="message-content">
                {msg.content}
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="message assistant-message">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a question or share what you're thinking..."
          className="chat-input"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="send-button"
          disabled={isLoading || !message.trim()}
        >
          {isLoading ? '⏳' : '🚀'}
        </button>
      </form>
    </div>
  );
}

export default ChatInterface;

