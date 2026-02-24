import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Propsoch | Smarter Real Estate",
  description: "Buy your dream home confidently with Propsoch - Bangalore's smartest real estate service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased text-slate-800 bg-white`}>
        {children}
      </body>
    </html>
  );
}
