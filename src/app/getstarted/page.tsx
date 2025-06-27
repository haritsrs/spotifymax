"use client";

import React, { useState } from 'react';
import Link from 'next/link';

type Feature = {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  bgColor: string;
  borderColor: string;
};

const GetStarted = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features: Feature[] = [
    {
      id: 1,
      title: "Detailed Analytics",
      description: "Deep dive into your listening patterns with comprehensive insights",
      icon: "📊",
      gradient: "from-green-500 to-emerald-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      id: 2,
      title: "Monthly Recap",
      description: "Your personalized monthly music journey wrapped up beautifully",
      icon: "📅",
      gradient: "from-blue-500 to-cyan-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      id: 3,
      title: "Intelligent Song Workshop",
      description: "Intelligent recommendations and AI-generated playlists tailored for you",
      icon: "🤖",
      gradient: "from-purple-500 to-pink-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      id: 4,
      title: "Music Compatibility",
      description: "Compare musical tastes and find your perfect listening companion",
      icon: "💫",
      gradient: "from-orange-500 to-red-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20"
    },
    {
      id: 5,
      title: "AI Playlist Aesthetics",
      description: "Generate stunning artwork and creative names for your playlists",
      icon: "🎨",
      gradient: "from-teal-500 to-blue-400",
      bgColor: "bg-teal-500/10",
      borderColor: "border-teal-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans">
      {/* Hero Section with Login */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-green-500 filter blur-[120px] opacity-10"></div>
          <div className="absolute bottom-32 right-10 w-96 h-96 rounded-full bg-purple-600 filter blur-[120px] opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500 filter blur-[150px] opacity-5"></div>
        </div>

        {/* Main Content */}
        <div className="container max-w-4xl mx-auto px-4 text-center z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight">
            Get Started
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Unlock the full potential of your music experience with these powerful features
          </p>

          {/* Main Features List */}
          <div className="bg-white/5 backdrop-blur rounded-3xl border border-white/10 p-8  max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-white">Core Features</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Advanced playlist intelligence and insights</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-300">AI-powered music recommendations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-300">Social music compatibility matching</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-300">Custom aesthetic playlist generation</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-300">Detailed monthly listening analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Selection Section */}
       {/* Features Selection Section */}
      <section className="py-0 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight">
            Choose Your Experience
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Select which features you'd like to explore first
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {features.map((feature) => (
              <div
  key={feature.id}
  className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
    hoveredFeature === feature.id ? 'z-10' : 'z-0'
  }`}
  onMouseEnter={() => setHoveredFeature(feature.id)}
  onMouseLeave={() => setHoveredFeature(null)}
>
  <Link
    href={`/page${feature.id}`}
    className="block h-full"
  >
    {/* Glow Effect */}
    <div
      className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
        hoveredFeature === feature.id ? 'opacity-30' : 'opacity-0'
      }`}
      style={{
        background: `linear-gradient(135deg, ${feature.gradient.includes('green') ? '#10b981, #34d399' :
          feature.gradient.includes('blue') ? '#3b82f6, #06b6d4' :
          feature.gradient.includes('purple') ? '#8b5cf6, #ec4899' :
          feature.gradient.includes('orange') ? '#f97316, #ef4444' :
          '#14b8a6, #3b82f6'})`,
        filter: 'blur(20px)',
      }}
    ></div>

    {/* Card Content */}
    <div className={`relative ${feature.bgColor} backdrop-blur border ${feature.borderColor} rounded-2xl p-6 h-full transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/30`}>
      {/* Icon */}
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {feature.icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
          style={{
            backgroundImage: hoveredFeature === feature.id ? 
              `linear-gradient(135deg, ${feature.gradient.includes('green') ? '#10b981, #34d399' :
                feature.gradient.includes('blue') ? '#3b82f6, #06b6d4' :
                feature.gradient.includes('purple') ? '#8b5cf6, #ec4899' :
                feature.gradient.includes('orange') ? '#f97316, #ef4444' :
                '#14b8a6, #3b82f6'})` : 'none'
          }}>
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
        {feature.description}
      </p>

      {/* Arrow */}
      <div className={`absolute bottom-4 right-4 transition-all duration-300 ${
        hoveredFeature === feature.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
      }`}>
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </Link>
</div>
            ))}
          </div>

          {/* Continue Button */}
          <div className="text-center mt-16">
            <button
              className="bg-gradient-to-r from-green-500 to-green-400 text-black font-semibold text-lg py-4 px-12 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
              onClick={() => window.location.href = '/profile'}
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-zinc-900">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            SPOTIFY MAX - Personal Project | Not affiliated with Spotify
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GetStarted;