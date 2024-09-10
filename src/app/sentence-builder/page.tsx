"use client";

import React, { useState, useEffect } from "react";
import SentenceBuilder from "./SentenceBuilder"; // Import the SentenceBuilder component

const SentenceBuilderPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-12 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      <SentenceBuilder />
    </div>
  );
};

export default SentenceBuilderPage;
