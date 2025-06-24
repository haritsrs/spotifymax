"use client"; // Ensures interactivity works

import "~/styles/globals.css";
import { Geist } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { signIn, signOut, useSession, SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

// Create a new component for the header that uses useSession
function Header() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  
  // This ensures hydration matching
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold tracking-tight text-white flex items-center gap-1">
          SPOTIFY <span className="bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">MAX</span>
        </Link>

        {/* Auth Button or User Profile */}
        {mounted && (
          <>
            {status === "authenticated" && session?.user ? (
              <div className="flex items-center gap-4">
                {session.user.image && (
                  <Link href="/profile">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                      <img 
                        src={session.user.image} 
                        alt="Profile" 
                        className="absolute w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="text-white bg-gray-800 hover:bg-gray-700 font-medium py-2 px-4 rounded-full text-sm transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => signIn("spotify")} 
                className="bg-gradient-to-r from-green-500 to-green-400 text-black font-semibold py-3 px-6 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
              >
                Connect with Spotify
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <SessionProvider>
          <Header />
          <TRPCReactProvider>
            <main className="pt-20">{children}</main> {/* Add padding-top to avoid overlap */}
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}