"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import io, { Socket } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Languages, RotateCcw } from "lucide-react";
import Notification from "../../components/Notification";
import { SendHorizontal } from 'lucide-react';
import React from "react";

// Function to generate a bright random color
const getBrightRandomColor = () => {
  const letters = '89ABCDEF'; // Only bright hex values
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 8)];
  }
  return color;
};

// Define supported languages
const supportedLanguages = [
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "it", label: "Italian" },
  { code: "pt", label: "Portuguese" },
  { code: "ru", label: "Russian" },
  { code: "zh", label: "Chinese" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "ar", label: "Arabic" },
  { code: "hi", label: "Hindi" },
  { code: "bn", label: "Bengali" },
  { code: "tr", label: "Turkish" },
  { code: "vi", label: "Vietnamese" },
  { code: "pl", label: "Polish" },
  { code: "nl", label: "Dutch" },
  { code: "sv", label: "Swedish" },
  { code: "no", label: "Norwegian" },
  { code: "da", label: "Danish" },
  { code: "fi", label: "Finnish" },
  { code: "cs", label: "Czech" },
  { code: "sk", label: "Slovak" },
  { code: "hu", label: "Hungarian" },
  { code: "ro", label: "Romanian" },
  { code: "he", label: "Hebrew" },
  { code: "th", label: "Thai" },
  { code: "ms", label: "Malay" },
  { code: "id", label: "Indonesian" },
  { code: "tl", label: "Tagalog" },
  { code: "uk", label: "Ukrainian" },
  { code: "lt", label: "Lithuanian" },
  { code: "lv", label: "Latvian" },
  { code: "et", label: "Estonian" },
  { code: "sr", label: "Serbian" },
  { code: "bs", label: "Bosnian" },
  { code: "mk", label: "Macedonian" },
  { code: "sq", label: "Albanian" },
  { code: "mt", label: "Maltese" },
  // Add more languages as needed
];

interface ChatMessage {
  username: string;
  message: string;
  translated?: string; // Add optional translated field
  timestamp: string; // Add timestamp field
}

const ChatPage = () => {
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [userColors, setUserColors] = useState<Record<string, string>>({});
  const [selectedLanguage, setSelectedLanguage] = useState<string>("es"); // Default: Spanish
  const [translatedMessages, setTranslatedMessages] = useState<Set<number>>(new Set()); // Added state for toggling translation
  const [showNotification, setShowNotification] = useState(true);
  const router = useRouter();
  const socketRef = useRef<Socket | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (!storedUsername) {
      router.push("/chat-username");
      return;
    }

    setUsername(storedUsername);

    // Load stored colors from localStorage
    const storedColors = localStorage.getItem("userColors");
    if (storedColors) {
      setUserColors(JSON.parse(storedColors));
    }

    // socketRef.current = io("https://chat-backend-op91.onrender.com");
    socketRef.current = io("https://chat-backend-op91.onrender.com");


    socketRef.current.on("load-messages", (messages: ChatMessage[]) => {
      setChat(messages);
    });

    socketRef.current.on("message", (msg: ChatMessage) => {
      setChat((prevChat) => [...prevChat, msg]);

      // Assign a bright color to the user if they don't already have one
      setUserColors((prevColors) => {
        if (!prevColors[msg.username]) {
          const newColor = getBrightRandomColor();
          const updatedColors = {
            ...prevColors,
            [msg.username]: newColor,
          };
          // Save the updated colors to localStorage
          localStorage.setItem("userColors", JSON.stringify(updatedColors));
          return updatedColors;
        }
        return prevColors;
      });
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [router]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    // Automatically close the notification after 7 seconds
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 10000);
      return () => clearTimeout(timer); // Cleanup timer on component unmount or notification state change
    }
  }, [showNotification]);

  const sendMessage = () => {
    if (message.trim() !== "" && username) {
      const timestamp = new Date().toISOString();
      socketRef.current?.emit("message", { username, message, timestamp });
      setMessage("");
    }
  };

  const handleTranslate = async (index: number) => {
    const isTranslated = translatedMessages.has(index);
    
    if (isTranslated) {
      // If message is already translated, remove from set and reset to original
      setTranslatedMessages((prev) => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    } else {
      // If message is not translated, fetch the translation and update state
      const originalMessage = chat[index].message;
      try {
        const response = await axios.post("/api/translate", {
          text: originalMessage,
          targetLanguage: selectedLanguage,
        });
        const translatedText = response.data.translatedText;

        setChat((prevChat) =>
          prevChat.map((msg, i) =>
            i === index ? { ...msg, translated: translatedText } : msg
          )
        );
        setTranslatedMessages((prev) => new Set(prev).add(index));
      } catch (error) {
        console.error("Error during translation:", error);
      }
    }
  };

  const handleResetTranslation = (index: number) => {
    // Reset the message to its original state
    setTranslatedMessages((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short",
    };
    return new Intl.DateTimeFormat(navigator.language, options).format(date);
  };

  if (!username) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      <header className="bg-gray-800 bg-opacity-50  backdrop-blur-md p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Chat Room</h1>

        {/* Language Selector Dropdown */}
        <div className="language-selector">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded-md"
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Notification Component */}
      {showNotification && (
        <Notification
          message="The translation API has a limit of 500 characters per message."
          onClose={() => setShowNotification(false)}
        />
      )}

      <main className="flex-grow overflow-hidden flex justify-center">
        <div
          ref={chatContainerRef}
          className="w-full max-w-3xl overflow-y-auto py-4 px-4 space-y-4 scrollbar-hide"
        >
          <AnimatePresence>
            {chat.map((msg, index) => (
              <motion.div
                key={index}
                className={`flex ${msg.username === username ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2 rounded-lg shadow-md ${
                    msg.username === username
                      ? 'bg-purple-800 bg-opacity-50 z-50 text-white'
                      : 'bg-gray-800 bg-opacity-50 text-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p
                      className="font-semibold text-md"
                      style={{ color: userColors[msg.username] }}
                    >
                      {msg.username}
                    </p>
                    <button
                      onClick={() => {
                        if (translatedMessages.has(index)) {
                          handleResetTranslation(index);
                        } else {
                          handleTranslate(index);
                        }
                      }}
                      className={`bg-gray-800 bg-opacity-50 text-white p-1 ml-4 rounded-md hover:bg-gray-700 ${
                        translatedMessages.has(index) ? 'text-green-500' : ''
                      }`}
                      title={translatedMessages.has(index) ? "Reset Translation" : "Translate"}
                    >
                      {translatedMessages.has(index) ? (
                        <RotateCcw className="h-5 w-5" />
                      ) : (
                        <Languages className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1">
                    {translatedMessages.has(index) && msg.translated ? msg.translated : msg.message}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {formatTimestamp(msg.timestamp)}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      <footer className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex justify-center items-center">
  <input
    type="text"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    }}
    className=" lg:max-w-[50%] flex-grow p-2 bg-gray-900 text-white rounded-md"
    placeholder="Type your message..."
  />
  <button
    onClick={sendMessage}
    className="ml-2 bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 flex items-center justify-center"
  >
    <SendHorizontal className="h-5 w-5" />
  </button>
</footer>
    </div>
  );
};

export default ChatPage;
