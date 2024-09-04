// src/components/DefinitionCard.tsx

import React from 'react';

interface DefinitionCardProps {
  word: string;
  options: string[];
  onAnswer: (selectedDefinition: string) => void;
}

const DefinitionCard: React.FC<DefinitionCardProps> = ({ word, options, onAnswer }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">What is the definition of "{word}"?</h2>
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className="block px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DefinitionCard;
