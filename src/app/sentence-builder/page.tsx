"use client";

import React, { useState, useEffect } from 'react';
import SentenceBuilder from './SentenceBuilder'; // Import the SentenceBuilder component

const SentenceBuilderPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <SentenceBuilder />
    </div>
  );
};

export default SentenceBuilderPage;