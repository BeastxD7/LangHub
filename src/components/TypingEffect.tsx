// components/TypingEffect.tsx
import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  features: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  features,
  typingSpeed = 150,
  deletingSpeed = 100,
  delay = 1500,
}) => {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    const currentFeature = features[currentFeatureIndex];

    if (!isDeleting && currentText === currentFeature) {
      // Delay before starting to delete the feature
      typingTimeout = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === '') {
      // Move to the next feature
      setIsDeleting(false);
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    } else {
      typingTimeout = setTimeout(() => {
        if (isDeleting) {
          setCurrentText((prev) => prev.slice(0, -1));
        } else {
          setCurrentText((prev) => currentFeature.slice(0, prev.length + 1));
        }
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(typingTimeout);
  }, [currentText, isDeleting, features, currentFeatureIndex, typingSpeed, deletingSpeed, delay]);

  return (
    <div className="flex items-center justify-center">
      <span className="text-gray-300 text-xl md:text-xl font-bold">{currentText}</span>
      <span className="ml-2  h-8 bg-white animate-blink"></span>
    </div>
  );
};

export default TypingEffect;
