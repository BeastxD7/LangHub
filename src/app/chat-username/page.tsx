"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";

const SetUsernamePage = () => {
  const [username, setUsername] = useState<string>("");
  const [isSet, setIsSet] = useState<boolean>(false);
  const router = useRouter();

  const handleSetUsername = () => {
    if (username) {
      localStorage.setItem("username", username);
      setIsSet(true);
    }
  };

  useEffect(() => {
    if (isSet) {
      // Redirect to /chat after setting the username
      router.push('/chat');
    }
  }, [isSet, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-4">
      <div className="w-full max-w-md bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-lg border border-gray-700 transition-all duration-300 hover:bg-opacity-70">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Set your Username</h1>
        {!isSet ? (
          <>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              onClick={handleSetUsername}
              className="w-full bg-purple-600 text-white p-3 rounded-md font-semibold transition-all duration-300 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
            >
              Set Username
            </button>
          </>
        ) : (
          <p className="text-green-400 text-center text-lg">Username set successfully!</p>
        )}
      </div>
    </div>
  );
};

export default SetUsernamePage;