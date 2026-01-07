import React from 'react';
import './PersonaSelector.css';

const personas = [
  {
    id: 'school_student',
    name: 'School Student',
    icon: '🎒',
    description: 'For younger learners'
  },
  {
    id: 'college_student',
    name: 'College Student',
    icon: '🎓',
    description: 'For advanced learners'
  },
  {
    id: 'working_professional',
    name: 'Working Professional',
    icon: '💼',
    description: 'For practical learning'
  }
];

function PersonaSelector({ onPersonaSelect }) {
  return (
    <div className="persona-selector">
      <h2 className="persona-title">Choose Your Learning Style</h2>
      <p className="persona-subtitle">Select a persona to start your learning journey</p>
      <div className="persona-grid">
        {personas.map((persona) => (
          <button
            key={persona.id}
            className="persona-card"
            onClick={() => onPersonaSelect(persona.id)}
          >
            <span className="persona-icon">{persona.icon}</span>
            <h3 className="persona-name">{persona.name}</h3>
            <p className="persona-description">{persona.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PersonaSelector;

