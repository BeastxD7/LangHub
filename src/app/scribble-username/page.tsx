// /app/scribble-username/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SetUsernamePage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSetUsername = () => {
    if (username) {
      localStorage.setItem("username", username);
      router.push("/scribble"); // Redirect to the scribble page
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl">Set your Username</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        className="border p-2"
      />
      <button
        onClick={handleSetUsername}
        className="bg-blue-500 text-white p-2 mt-4">
        Set Username
      </button>
    </div>
  );
}
