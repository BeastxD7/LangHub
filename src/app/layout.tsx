import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LangHub | Made By Beast",
  description:
    "LangHub, an engaging language-learning platform where players immerse themselves in exciting multiplayer word games! Challenge friends and players worldwide in real-time to guess words based on creative hints and translations. Enhance your vocabulary and language skills while having fun. Join now to experience a unique blend of competitive gameplay and educational learning designed for all ages!",
};

const features = [
  { name: "WordMaster", description: "Guess words from hints in multiple languages" },
  { name: "Translation Tool", description: "Translate text and files with ease" },
  { name: "Word Scribble", description: "Real-time word guessing game with friends" },
  { name: "Vocabulary Builder", description: "Enhance your vocabulary in multiple languages" },
  { name: "Sentence Builder", description: "Arrange jumbled words to form sentences" },
  { name: "Language Quiz", description: "Test your grammar and language understanding" },
  { name: "Chat with Translation", description: "Real-time chat with automatic translation" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.png" type="image/png" sizes="<generated>" />
      <body className={inter.className}>
        <header className="fixed w-full z-10 bg-gray-900 bg-opacity-100 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold text-white">LangHub</Link>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {features.map((feature) => (
                          <li key={feature.name}>
                            <NavigationMenuLink asChild>
                              <a
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                href={`${feature.name.toLowerCase().replace(/\s+/g, '-')}`}
                              >
                                <div className="text-sm font-medium leading-none">{feature.name}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {feature.description}
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        About
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/contact" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Contact
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </header>
        <main className="pt-16">
          {children}
        </main>
        <footer className="bg-gray-900 bg-opacity-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <p>&copy; 2023 LangHub. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}