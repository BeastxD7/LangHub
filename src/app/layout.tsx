import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LangHub | Made By Beast",
  description:
    "LangHub, an engaging language-learning platform where players immerse themselves in exciting multiplayer word games! Challenge friends and players worldwide in real-time to guess words based on creative hints and translations. Enhance your vocabulary and language skills while having fun. Join now to experience a unique blend of competitive gameplay and educational learning designed for all ages!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.png" type="image/png" sizes="<generated>" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
