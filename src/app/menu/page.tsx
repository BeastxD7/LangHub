import Link from 'next/link';

export default function Menu() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">LangHub Main Menu</h1>
      <ul className="space-y-4">

        <li>
          <Link href="/wordgame" className="text-blue-500 hover:underline">
    Word Game
          </Link>
        </li>

        <li>
          <Link href="/translate" className="text-blue-500 hover:underline">
            Translation Tool
          </Link>
        </li>

        <li>
          <Link href="/quiz" className="text-blue-500 hover:underline">
           Language Quiz
          </Link>
        </li>

        <li>
          <Link href="/vocabulary" className="text-blue-500 hover:underline">
          Vocabulary
          </Link>
        </li>

        <li>
          <Link href="/sentence-builder" className="text-blue-500 hover:underline">
          Sentence Builder
          </Link>
        </li> 
      </ul>
    </div>
  );
}
