"use client";

import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function Translate() {
  const [text, setText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [targetLang, setTargetLang] = useState<string>('fr'); // default to French
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    try {
      setError(null); // Clear previous errors

      const apiKey = process.env.NEXT_PUBLIC_TRANSLATOR_API_KEY;
      const endpoint = process.env.NEXT_PUBLIC_TRANSLATOR_ENDPOINT;
      const location = process.env.NEXT_PUBLIC_TRANSLATOR_LOCATION;

      const response = await axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Ocp-Apim-Subscription-Region': location,
          'Content-Type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
        },
        params: {
          'api-version': '3.0',
          'from': 'en',
          'to': targetLang,
        },
        data: [{
          'text': text
        }],
        responseType: 'json'
      });

      setTranslatedText(response.data[0].translations[0].text);
    } catch (err) {
      console.error(err);
      setError('Failed to translate. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 md:p-12 lg:p-24">
      <h1 className="text-3xl font-bold mb-6 text-center">Translation Tool</h1>
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to translate"
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
          <option value="zh">Chinese</option>
          <option value="ru">Russian</option>
          <option value="pt">Portuguese</option>
          <option value="ar">Arabic</option>
          <option value="ko">Korean</option>
          <option value="hi">Hindi</option>
          <option value="kn">Kannada</option>
        </select>
        <button 
          onClick={handleTranslate} 
          className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Translate
        </button>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {translatedText && (
          <p className="mt-4 text-lg text-gray-800 text-center">
            {translatedText}
          </p>
        )}
      </div>
    </div>
  );
}
