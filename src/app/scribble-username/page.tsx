'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ScribbleUsername() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store the username in localStorage
    if (username.trim()) {
      localStorage.setItem('username', username);
      // Redirect to /scribble
      router.push('/scribble');
    } else {
      alert('Please enter a valid username');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-12 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-700">Enter Your Username</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter username"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Join Game
          </button>
        </form>
      </div>
    </div>
  );
}
