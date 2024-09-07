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
      <h2 className="text-xl font-semibold mb-4 text-white">Select Language for Quiz</h2>
      <select onChange={handleLanguageChange} className="px-4 text-gray-300 py-2 border rounded bg-gray-800 bg-opacity-50 border-gray-500">
      <option className='text-white bg-gray-800 bg-opacity-85' value="null">Select Language</option>
        <option className='bg-gray-800 bg-opacity-85' value="fr">French</option>
        <option className='bg-gray-800 bg-opacity-85' value="es">Spanish</option>
        <option className='bg-gray-800 bg-opacity-85' value="de">German</option>
        <option className='bg-gray-800 bg-opacity-85' value="it">Italian</option>
        <option className='bg-gray-800 bg-opacity-85' value="pt">Portuguese</option>
        <option className='bg-gray-800 bg-opacity-85' value="ru">Russian</option>
        <option className='bg-gray-800 bg-opacity-85' value="zh-Hans">Chinese (Simplified)</option>
        <option className='bg-gray-800 bg-opacity-85' value="ja">Japanese</option>
        <option className='bg-gray-800 bg-opacity-85' value="ko">Korean</option>
        <option className='bg-gray-800 bg-opacity-85' value="ar">Arabic</option>
        <option className='bg-gray-800 bg-opacity-85' value="hi">Hindi</option>
        <option className='bg-gray-800 bg-opacity-85' value="kn">Kannada</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
