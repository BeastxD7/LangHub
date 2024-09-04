import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LangHub | Made By Beast",
  description: "The LangHub app is a language learning tool for children.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
  rel="icon"
  href="/logo.png"
  type="image/png"
  sizes="<generated>"
/>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
