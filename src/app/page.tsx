"use client"; // Ensures interactivity works

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { signIn } from "next-auth/react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans">
      <Head>
        <title>SPOTIFY MAX</title>
        <meta name="description" content="The future of your music experience" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black overflow-hidden">
      <div className="absolute inset-0 z-10">
  <video 
    autoPlay 
    loop 
    muted 
    playsInline
    className="object-cover w-full h-full opacity-60"
    poster="/placeholder.png" // Add a poster as fallback
  >
    <source src="/waves.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div className="absolute inset-0 bg-gray bg-opacity-40"></div>
</div>
        
        {/* Music waveform effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
        </div>
        
        <div className="container max-w-3xl mx-auto px-4 text-center z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight animate-pulse">
            SPOTIFY MAX
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10">
            The future of your music experience.
          </p>
            <button 
            className="bg-gradient-to-r from-green-500 to-green-400 text-black font-semibold text-lg py-4 px-10 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
            onClick={() => window.location.href = "/getstarted"}
            >
            Get Started
            </button>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight">
            Core Features
          </h2>

          {/* Feature 1 - Advanced playlist intelligence and insights */}
          <div className="relative flex flex-col lg:flex-row items-center mb-48 lg:mb-52">
            <div className="absolute w-96 h-96 rounded-full bg-green-500 filter blur-[100px] opacity-15 -top-24 -left-24 z-0"></div>
            <div className="lg:w-1/2 px-0 lg:px-12 mb-12 lg:mb-0 z-10">
              <span className="text-green-500 uppercase tracking-wider text-sm font-medium block mb-3">
                Intelligence
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Advanced Playlist Intelligence
              </h3>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Unlock deep insights into your music library with advanced analytics that reveal hidden patterns, genre connections, and listening behaviors. Get comprehensive data on your playlist evolution and music discovery journey.
              </p>
              <div className="inline-block bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                <div className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tighter mb-2">
                  360°
                </div>
                <div className="text-gray-400 text-sm">
                  Complete playlist analysis
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 h-96 rounded-2xl overflow-hidden shadow-2xl z-10">
                <a href="/page1" className="relative w-full h-full block">
                <Image
                  src="/home/1.png"
                  alt="Advanced playlist intelligence dashboard"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl cursor-pointer"
                />
                </a>
            </div>
          </div>

          {/* Feature 2 - AI-powered music recommendations */}
          <div className="relative flex flex-col lg:flex-row-reverse items-center mb-48 lg:mb-52">
            <div className="absolute w-96 h-96 rounded-full bg-purple-600 filter blur-[100px] opacity-15 -bottom-24 -right-24 z-0"></div>
            <div className="lg:w-1/2 px-0 lg:px-12 mb-12 lg:mb-0 z-10">
              <span className="text-green-500 uppercase tracking-wider text-sm font-medium block mb-3">
                AI Powered
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Smart Music Recommendations
              </h3>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Experience next-level music discovery with our AI engine that learns your preferences, mood patterns, and listening context. Get personalized recommendations that perfectly match your taste and current vibe.
              </p>
              <div className="inline-block bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                <div className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tighter mb-2">
                  97.8%
                </div>
                <div className="text-gray-400 text-sm">
                  Recommendation accuracy rate
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 h-96 rounded-2xl overflow-hidden shadow-2xl z-10">
              <div className="relative w-full h-full">
                <Image
                  src="/home/2.png"
                  alt="AI-powered music recommendations"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Feature 3 - Social music compatibility matching */}
          <div className="relative flex flex-col lg:flex-row items-center mb-48 lg:mb-52">
            <div className="absolute w-96 h-96 rounded-full bg-blue-500 filter blur-[100px] opacity-15 -top-24 -right-24 z-0"></div>
            <div className="lg:w-1/2 px-0 lg:px-12 mb-12 lg:mb-0 z-10">
              <span className="text-green-500 uppercase tracking-wider text-sm font-medium block mb-3">
                Social
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Music Compatibility Matching
              </h3>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Discover how your musical taste aligns with friends through sophisticated compatibility algorithms. Find your music soulmates, explore shared preferences, and build stronger connections through sound.
              </p>
              <div className="inline-block bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                <div className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tighter mb-2">
                  8.5M+
                </div>
                <div className="text-gray-400 text-sm">
                  Compatibility matches made
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 h-96 rounded-2xl overflow-hidden shadow-2xl z-10">
              <div className="relative w-full h-full">
                <Image
                  src="/home/3.png"
                  alt="Social music compatibility matching"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Feature 4 - Custom aesthetic playlist generation */}
          <div className="relative flex flex-col lg:flex-row-reverse items-center mb-48 lg:mb-52">
            <div className="absolute w-96 h-96 rounded-full bg-red-500 filter blur-[100px] opacity-15 -bottom-24 -left-24 z-0"></div>
            <div className="lg:w-1/2 px-0 lg:px-12 mb-12 lg:mb-0 z-10">
              <span className="text-green-500 uppercase tracking-wider text-sm font-medium block mb-3">
                Creative
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Custom Aesthetic Generation
              </h3>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Transform your playlists into visual masterpieces with AI-generated artwork, creative naming, and aesthetic themes that perfectly capture the essence of your music collection's unique vibe and energy.
              </p>
              <div className="inline-block bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                <div className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tighter mb-2">
                  ∞
                </div>
                <div className="text-gray-400 text-sm">
                  Unique aesthetic combinations
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 h-96 rounded-2xl overflow-hidden shadow-2xl z-10">
              <div className="relative w-full h-full">
                <Image
                  src="/home/4.png"
                  alt="Custom aesthetic playlist generation"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Feature 5 - Detailed monthly listening analytics */}
          <div className="relative flex flex-col lg:flex-row items-center mb-0">
            <div className="absolute w-96 h-96 rounded-full bg-orange-500 filter blur-[100px] opacity-15 -top-24 -left-24 z-0"></div>
            <div className="lg:w-1/2 px-0 lg:px-12 mb-12 lg:mb-0 z-10">
              <span className="text-green-500 uppercase tracking-wider text-sm font-medium block mb-3">
                Analytics
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Monthly Listening Analytics
              </h3>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Get comprehensive monthly reports that dive deep into your listening habits, track your musical evolution, and provide detailed insights about your favorite artists, genres, and discovery patterns.
              </p>
              <div className="inline-block bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                <div className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tighter mb-2">
                  50+
                </div>
                <div className="text-gray-400 text-sm">
                  Data points tracked monthly
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 h-96 rounded-2xl overflow-hidden shadow-2xl z-10">
              <div className="relative w-full h-full">
                <Image
                  src="/home/5.png"
                  alt="Detailed monthly listening analytics"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-zinc-900">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-5">
            Ready to transform your music experience?
          </h3>
          <p className="text-gray-400 mb-10">
            Connect your Spotify account and unlock the future of music exploration.
          </p>
          <button 
            className="bg-white/5 text-white border border-white/10 font-medium py-3 px-8 rounded-full transition-all hover:bg-white/10"
            onClick={() => {}}
          >
            Get Started with SPOTIFY MAX
          </button>
          <p className="text-gray-600 text-sm mt-20">
            SPOTIFY MAX - Personal Project | Not affiliated with Spotify
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;