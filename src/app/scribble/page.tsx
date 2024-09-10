// /app/scribble/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ScribblePage() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      router.push("/scribble-username");
    } else {
      setUsername(storedUsername);
    }
  }, [router]);

  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 9); // Generate random roomId
    router.push(`/scribble/${newRoomId}`);
  };

  const joinRoom = async () => {
    if (roomId.trim()) {
      try {
        const response = await fetch(
          `http://localhost:4000/check-room/${roomId}`
        );
        const data = await response.json();

        if (data.exists) {
          router.push(`/scribble/${roomId}`); // Redirect to the specific roomId route
        } else {
          setErrorMessage("No room exists with the specified Room ID"); // Set error message if room doesn't exist
        }
      } catch (error) {
        console.error("Error checking room:", error);
        setErrorMessage("An error occurred while checking the room ID."); // Set error message on error
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-6 sm:p-10 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md">
        <Card className="bg-gray-800 bg-opacity-50 border-gray-700 hover:bg-opacity-70 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-white text-center">
              Welcome to Scribble
            </CardTitle>
            <CardDescription className="text-gray-300 text-center">
              {username
                ? `Hello, ${username}!`
                : "Create or join a room to start playing"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p> // Display the error message
            )}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={createRoom}
                className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition">
                Create Room
              </Button>
            </motion.div>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={joinRoom}
                  className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition">
                  Join Room
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
