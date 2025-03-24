"use client"; // Ensures interactivity works

import "~/styles/globals.css";

import { Geist } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { signIn } from "next-auth/react";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        {/* Header */}
        <header className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-700 shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between py-4">
    {/* Logo */}
    <div className="text-2xl font-semibold tracking-tight text-white">
      SPOTIFY <span className="bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">MAX</span>
    </div>

    {/* Button */}
    <button 
      onClick={() => signIn("spotify")} 
      className="bg-gradient-to-r from-green-500 to-green-400 text-black font-semibold py-3 px-6 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
    >
      Connect with Spotify
    </button> 
  </div>
</header>


        <TRPCReactProvider>
          <main className="pt-20">{children}</main> {/* Add padding-top to avoid overlap */}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
