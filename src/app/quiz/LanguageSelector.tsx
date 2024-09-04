// src/app/quiz/LanguageSelector.tsx
import React from 'react';

interface LanguageSelectorProps {
  onSelectLanguage: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelectLanguage }) => {
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectLanguage(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Select Language for Quiz</h2>
      <select onChange={handleLanguageChange} className="px-4 py-2 border rounded">
        <option value="fr">French</option>
        <option value="es">Spanish</option>
        <option value="de">German</option>
        <option value="it">Italian</option>
        <option value="pt">Portuguese</option>
        <option value="ru">Russian</option>
        <option value="zh-Hans">Chinese (Simplified)</option>
        <option value="ja">Japanese</option>
        <option value="ko">Korean</option>
        <option value="ar">Arabic</option>
        {/* Add more languages if needed */}
      </select>
    </div>
  );
};

export default LanguageSelector;
