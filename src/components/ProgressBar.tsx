// components/ProgressBar.tsx

import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max }) => {
  return (
    <div className="relative w-full h-4 bg-gray-200 rounded">
      <div
        className="absolute top-0 left-0 h-full bg-blue-500 rounded"
        style={{  width: `${(value / max) * 100}%`,
        transition: "width 0.5s ease-in-out" ,
      color: 'purple'}}
      />
    </div>
  );
};

export default ProgressBar;
