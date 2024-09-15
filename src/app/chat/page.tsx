"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import io, { Socket } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  username: string;
  message: string;
}

const ChatPage = () => {
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [username, setUsername] = useState<string | null>(null);
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

    socketRef.current = io("https://chat-backend-zeta-beryl.vercel.app/");

    socketRef.current.on("load-messages", (messages: ChatMessage[]) => {
      setChat(messages);
    });

    socketRef.current.on("message", (msg: ChatMessage) => {
      setChat((prevChat) => [...prevChat, msg]);
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

  const sendMessage = () => {
    if (message.trim() !== "" && username) {
      socketRef.current?.emit("message", { username, message });
      setMessage("");
    }
  };

  if (!username) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 text-white">
        <h1 className="text-xl font-bold text-center">Chat Room</h1>
      </header>
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
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-700 text-gray-200'
                  }`}
                >
                  <p className="font-semibold text-sm">{msg.username}</p>
                  <p className="mt-1">{msg.message}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
      <footer className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4">
        <div className="flex items-center max-w-3xl mx-auto">
          <input
            type="text"
            className="flex-grow bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border-none p-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
          />
          <motion.button
            onClick={sendMessage}
            className="bg-purple-600 text-white p-3 rounded-r-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send
          </motion.button>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;