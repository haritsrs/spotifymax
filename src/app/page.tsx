"use client"; // Ensures interactivity works

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { signIn } from "next-auth/react";
import AnimatedBackground from './components/AnimatedBackground';

interface ImageProps {
  src: string;
  alt: string;
  layout: "fill" | "fixed" | "intrinsic" | "responsive";
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  className?: string;
}

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
        {/* Animated Background */}
        <AnimatedBackground />
        
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
            onClick={() => {}}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight">
            Features
          </h2>

          {/* Feature 1 */}
          <div className="relative flex flex-col lg:flex-row items-center mb-48 lg:mb-52">
            <div className="absolute w-96 h-96 rounded-full bg-green-500 filter blur-[100px] opacity-15 -top-24 -left-24 z-0"></div>
            <div className="lg:w-1/2 px-0 lg:px-12 mb-12 lg:mb-0 z-10">
              <span className="text-green-500 uppercase tracking-wider text-sm font-medium block mb-3">
                Insights
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Playlist Intelligence
              </h3>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Discover patterns in your music with detailed analytics that visualize your listening habits like never before. See connections between artists, genres, and moods that shape your unique sound profile.
              </p>
              <div className="inline-block bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                <div className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tighter mb-2">
                  247%
                </div>
                <div className="text-gray-400 text-sm">
                  More insights than standard Spotify
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 h-96 rounded-2xl overflow-hidden shadow-2xl z-10">
              <div className="relative w-full h-full">
                <Image
                  src="/api/placeholder/700/500"
                  alt="Playlist insights visualization"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="relative flex flex-col lg:flex-row-reverse items-center mb-48 lg:mb-52">
            <div className="absolute w-96 h-96 rounded-full bg-purple-600 filter blur-[100px] opacity-15 -bottom-24 -right-24 z-0"></div>
            <div className="lg:w-1/2 px-0 lg:px-12 mb-12 lg:mb-0 z-10">
              <span className="text-green-500 uppercase tracking-wider text-sm font-medium block mb-3">
                AI Powered
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Intelligent Playlist Generation
              </h3>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Our advanced AI engine creates custom playlists based on your mood, activity, or even text input. Just tell us how you feel, and we'll match the perfect soundtrack to your moment.
              </p>
              <div className="inline-block bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                <div className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tighter mb-2">
                  98.2%
                </div>
                <div className="text-gray-400 text-sm">
                  Match accuracy with your preferences
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 h-96 rounded-2xl overflow-hidden shadow-2xl z-10">
              <div className="relative w-full h-full">
                <Image
                  src="/placeholder.png"
                  alt="AI playlist generation"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="relative flex flex-col lg:flex-row items-center mb-48 lg:mb-52">
            <div className="absolute w-96 h-96 rounded-full bg-blue-500 filter blur-[100px] opacity-15 -top-24 -right-24 z-0"></div>
            <div className="lg:w-1/2 px-0 lg:px-12 mb-12 lg:mb-0 z-10">
              <span className="text-green-500 uppercase tracking-wider text-sm font-medium block mb-3">
                Social
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Music Compatibility
              </h3>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Compare your musical taste with friends and discover your compatibility score. Find shared favorites and explore new recommendations based on your collective preferences.
              </p>
              <div className="inline-block bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                <div className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tighter mb-2">
                  5M+
                </div>
                <div className="text-gray-400 text-sm">
                  Compatibility checks performed
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 h-96 rounded-2xl overflow-hidden shadow-2xl z-10">
              <div className="relative w-full h-full">
                <Image
                  src="/placeholder.png"
                  alt="Music compatibility checker"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="relative flex flex-col lg:flex-row-reverse items-center mb-0">
            <div className="absolute w-96 h-96 rounded-full bg-red-500 filter blur-[100px] opacity-15 -bottom-24 -left-24 z-0"></div>
            <div className="lg:w-1/2 px-0 lg:px-12 mb-12 lg:mb-0 z-10">
              <span className="text-green-500 uppercase tracking-wider text-sm font-medium block mb-3">
                Creative
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Custom Playlist Aesthetics
              </h3>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Personalize your playlists with AI-generated artwork and creative names that match the vibe of your music. Create a visual identity for your unique collection of sounds.
              </p>
              <div className="inline-block bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                <div className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tighter mb-2">
                  ∞
                </div>
                <div className="text-gray-400 text-sm">
                  Unique combinations of art & names
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 h-96 rounded-2xl overflow-hidden shadow-2xl z-10">
              <div className="relative w-full h-full">
                <Image
                  src="/placeholder.png"
                  alt="Custom playlist covers"
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