"use client";

import React, { useState } from "react";
import { vocabularyData } from "../../utils/vocabularyData";

interface VocabularyData {
  [key: string]: { word: string; definition: string }[];
}

const vocabulary: VocabularyData["en"] = vocabularyData["en"];
import DefinitionCard from "../../components/DefinitionCard";

interface VocabularyItem {
  word: string;
  definition: string;
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const VocabularyBuilder: React.FC = () => {
  const [currentItem, setCurrentItem] = useState<VocabularyItem | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);

  const getRandomItem = () => {
    const randomItem =
      vocabulary[Math.floor(Math.random() * vocabulary.length)];
    const shuffledDefinitions = shuffleArray(
      vocabulary.map((item) => item.definition)
    );

    setCurrentItem(randomItem);
    setOptions(
      shuffleArray([
        randomItem.definition,
        ...shuffledDefinitions
          .filter((def) => def !== randomItem.definition)
          .slice(0, 3),
      ])
    );
  };

  const handleAnswer = (selectedDefinition: string) => {
    if (selectedDefinition === currentItem?.definition) {
      setScore(score + 1);
    }
    getRandomItem();
  };

  React.useEffect(() => {
    getRandomItem();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Vocabulary Builder</h1>
      {currentItem ? (
        <DefinitionCard
          word={currentItem.word}
          options={options}
          onAnswer={handleAnswer}
        />
      ) : (
        <p>Loading...</p>
      )}
      <p className="mt-4 text-lg">Score: {score}</p>
    </div>
  );
};

export default VocabularyBuilder;
