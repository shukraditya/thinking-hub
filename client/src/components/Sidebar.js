import React, { useState, useMemo } from 'react';
import './Sidebar.css';

const personaIcons = {
  school_student: '🎒',
  college_student: '🎓',
  working_professional: '💼'
};

const personaNames = {
  school_student: 'School Student',
  college_student: 'College Student',
  working_professional: 'Working Professional'
};

function Sidebar({ isOpen, onToggle, chats, onSelectChat, currentChatId, onDeleteChat }) {
  const [searchQuery, setSearchQuery] = useState('');

  const getChatPreview = (chat) => {
    const firstUserMessage = chat.messages.find(msg => msg.role === 'user');
    return firstUserMessage?.content || '';
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  // Filter chats: only show chats with messages, and filter by search query
  const filteredChats = useMemo(() => {
    // First filter out empty chats (no messages)
    const chatsWithMessages = chats.filter(chat => chat.messages.length > 0);
    
    // Then filter by search query if provided
    if (!searchQuery.trim()) {
      return chatsWithMessages;
    }
    
    const query = searchQuery.toLowerCase();
    return chatsWithMessages.filter(chat => {
      const preview = getChatPreview(chat).toLowerCase();
      const personaName = personaNames[chat.persona].toLowerCase();
      return preview.includes(query) || personaName.includes(query);
    });
  }, [chats, searchQuery]);

  const handleDeleteClick = (e, chatId) => {
    e.stopPropagation(); // Prevent chat selection when clicking delete
    if (window.confirm('Are you sure you want to delete this chat?')) {
      onDeleteChat(chatId);
    }
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onToggle}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Recent Chats</h2>
          <button className="sidebar-toggle" onClick={onToggle}>
            {isOpen ? '←' : '→'}
          </button>
        </div>
        
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className="chat-list">
          {filteredChats.length === 0 ? (
            <div className="empty-chats">
              {searchQuery ? (
                <>
                  <p>No chats found</p>
                  <p className="hint">Try a different search term</p>
                </>
              ) : (
                <>
                  <p>No conversations yet</p>
                  <p className="hint">Select a persona to start learning</p>
                </>
              )}
            </div>
          ) : (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`chat-item ${currentChatId === chat.id ? 'active' : ''}`}
                onClick={() => onSelectChat(chat.id)}
              >
                <div className="chat-item-content">
                  <div className="chat-item-header">
                    <span className="chat-persona-icon">
                      {personaIcons[chat.persona]}
                    </span>
                    <span className="chat-persona-name">
                      {personaNames[chat.persona]}
                    </span>
                    <button
                      className="delete-chat-button"
                      onClick={(e) => handleDeleteClick(e, chat.id)}
                      aria-label="Delete chat"
                    >
                      🗑️
                    </button>
                  </div>
                  <div className="chat-preview">
                    {getChatPreview(chat)}
                  </div>
                  <div className="chat-time">
                    {formatDate(chat.timestamp)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;

