import type { Metadata } from "next";
import { Inter } from "next/font/google";

import React from "react";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "LangHub - ChatRoom | Made By Beast",
  description: "Join the conversation in the LangHub chat room and connect with other people.",
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
