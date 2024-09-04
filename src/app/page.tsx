import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      {/* Hero Section */}
      <div className="relative w-full h-screen">
        <Image 
          src="/hero-image.jpg" 
          alt="Hero Image" 
          layout="fill" 
          objectFit="cover" 
          className="absolute inset-0"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50 text-white">
          <h1 className="text-4xl font-bold mb-4">Get Started</h1>
          <Link href="/menu">
            <button className="px-6 py-3 bg-blue-500 text-white rounded">Menu</button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 w-full max-w-screen-lg mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Vocabulary Builder</h3>
            <p>Match words with their definitions or synonyms. Improve your vocabulary through engaging exercises.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Sentence Builder</h3>
            <p>Arrange jumbled words to form a correct sentence. Practice your sentence construction skills.</p>
          </div>
          {/* Add more feature cards as needed */}
        </div>
      </div>
    </div>
  );
}
