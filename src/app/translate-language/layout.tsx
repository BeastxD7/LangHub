import type { Metadata } from "next";
import { Inter } from "next/font/google";

import React from "react";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
    title: "LangHub - File Translation and Language Services",
    description: "LangHub offers powerful translation services for various file formats, including text, documents, and presentations. Easily translate your files and join our community for seamless language support.",
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
