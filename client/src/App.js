import React, { useState, useEffect } from 'react';
import './App.css';
import PersonaSelector from './components/PersonaSelector';
import ChatInterface from './components/ChatInterface';
import Sidebar from './components/Sidebar';

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

function App() {
  const [persona, setPersona] = useState(null);
  const [personaSelected, setPersonaSelected] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load chats from localStorage on mount
  useEffect(() => {
    const savedChats = localStorage.getItem('thinkingBuddyChats');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      setChats(parsedChats);
      // Set the most recent chat as current if available
      if (parsedChats.length > 0) {
        const mostRecent = parsedChats.sort((a, b) => b.timestamp - a.timestamp)[0];
        setCurrentChatId(mostRecent.id);
        setPersona(mostRecent.persona);
        setPersonaSelected(true);
      }
    }
  }, []);

  // Save chats to localStorage whenever chats change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('thinkingBuddyChats', JSON.stringify(chats));
    }
  }, [chats]);

  const handlePersonaSelect = (selectedPersona) => {
    setPersona(selectedPersona);
    setPersonaSelected(true);
    // Create a new chat
    createNewChat(selectedPersona);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const createNewChat = (chatPersona) => {
    const newChat = {
      id: Date.now().toString(),
      persona: chatPersona,
      messages: [],
      timestamp: Date.now()
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const handleSelectChat = (chatId) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setPersona(chat.persona);
      setPersonaSelected(true);
      // Close sidebar on mobile after selection
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    }
  };

  const handleDeleteChat = (chatId) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    
    // If deleted chat was current, switch to most recent chat or show persona selector
    if (chatId === currentChatId) {
      if (updatedChats.length > 0) {
        const mostRecent = updatedChats.sort((a, b) => b.timestamp - a.timestamp)[0];
        setCurrentChatId(mostRecent.id);
        setPersona(mostRecent.persona);
        setPersonaSelected(true);
      } else {
        // No chats left, show persona selector
        setCurrentChatId(null);
        setPersona(null);
        setPersonaSelected(false);
      }
    }
  };

  const handleUpdateChatMessages = (messages) => {
    if (!currentChatId) return;
    setChats(prev => prev.map(chat => 
      chat.id === currentChatId 
        ? { ...chat, messages, timestamp: Date.now() }
        : chat
    ));
  };

  const handleNewChat = () => {
    // Show persona selector again
    setPersonaSelected(false);
    setPersona(null);
    setCurrentChatId(null);
  };

  const getCurrentChat = () => {
    return chats.find(c => c.id === currentChatId);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button 
          className="menu-button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <div className="header-content">
          <h1>🧠 Thinking Buddy</h1>
          <p className="subtitle">
            {personaSelected && persona 
              ? `${personaIcons[persona]} ${personaNames[persona]}`
              : 'Discover answers through guided learning'}
          </p>
        </div>
      </header>
      
      <div className="App-content">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          chats={chats}
          onSelectChat={handleSelectChat}
          currentChatId={currentChatId}
          onDeleteChat={handleDeleteChat}
        />

        <main className="App-main">
          {!personaSelected ? (
            <PersonaSelector 
              onPersonaSelect={handlePersonaSelect}
            />
          ) : (
            <ChatInterface 
              persona={persona}
              conversationHistory={getCurrentChat()?.messages || []}
              setConversationHistory={handleUpdateChatMessages}
              onNewChat={handleNewChat}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

