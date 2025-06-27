"use client";

import React, { useState, useEffect } from 'react';
import { Brain, Zap, Target, TrendingUp, Music, Play, Heart, Shuffle, Clock, Star } from 'lucide-react';

const AIRecommendationsPage = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  
  // Mock data for recommendations
  const recommendations = [
    {
      id: 1,
      title: "Midnight Echoes",
      artist: "Luna Waves",
      album: "Neon Dreams",
      duration: "3:24",
      mood: "Chill",
      confidence: 97.8,
      reason: "Based on your late-night listening patterns",
      image: "🌙"
    },
    {
      id: 2,
      title: "Electric Pulse",
      artist: "Synthwave Collective",
      album: "Digital Horizon",
      duration: "4:12",
      mood: "Energetic",
      confidence: 94.2,
      reason: "Matches your workout playlist vibes",
      image: "⚡"
    },
    {
      id: 3,
      title: "Velvet Mornings",
      artist: "Jazz Fusion 2077",
      album: "Urban Sunrise",
      duration: "5:18",
      mood: "Smooth",
      confidence: 92.1,
      reason: "Similar to your recently loved tracks",
      image: "☀️"
    },
    {
      id: 4,
      title: "Cosmic Drift",
      artist: "Stellar Sounds",
      album: "Infinite Space",
      duration: "6:05",
      mood: "Ambient",
      confidence: 96.7,
      reason: "Perfect for your focus sessions",
      image: "🌌"
    }
  ];

  const moodCategories = [
    { name: 'Energetic', count: 127, color: 'from-red-500 to-orange-500', icon: '🔥' },
    { name: 'Chill', count: 89, color: 'from-blue-500 to-cyan-500', icon: '❄️' },
    { name: 'Focus', count: 156, color: 'from-purple-500 to-pink-500', icon: '🎯' },
    { name: 'Happy', count: 203, color: 'from-yellow-500 to-green-500', icon: '😊' }
  ];

  const aiInsights = [
    { metric: "Accuracy Rate", value: "97.8%", change: "+2.3%" },
    { metric: "New Discoveries", value: "47", change: "+12" },
    { metric: "Mood Matches", value: "94.2%", change: "+1.8%" },
    { metric: "Skip Rate", value: "8.1%", change: "-3.2%" }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => window.history.back()} 
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              AI Recommendations
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-400">AI Engine Active</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-green-900/20"></div>
        <div className="absolute w-96 h-96 rounded-full bg-purple-600 filter blur-[120px] opacity-20 top-0 right-0"></div>
        <div className="absolute w-80 h-80 rounded-full bg-green-500 filter blur-[100px] opacity-15 bottom-0 left-0"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-300">Powered by Advanced AI</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-green-200 bg-clip-text text-transparent">
            Smart Music Discovery
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Experience music recommendations that understand your taste, mood, and context like never before
          </p>

          {/* AI Insights Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {aiInsights.map((insight, index) => (
              <div key={index} className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-4">
                <div className="text-2xl font-bold text-white mb-1">{insight.value}</div>
                <div className="text-sm text-gray-400 mb-2">{insight.metric}</div>
                <div className={`text-xs ${insight.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {insight.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'discover', label: 'Discover', icon: Target },
              { id: 'moods', label: 'Moods', icon: Heart },
              { id: 'trending', label: 'Trending', icon: TrendingUp },
              { id: 'insights', label: 'Insights', icon: Brain }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-500'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Discover Tab */}
          {activeTab === 'discover' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Personalized for You</h2>
                <p className="text-gray-400">AI-curated tracks based on your unique listening patterns</p>
              </div>

              <div className="grid gap-4">
                {recommendations.map((track, index) => (
                  <div
                    key={track.id}
                    className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-green-500 rounded-xl flex items-center justify-center text-2xl">
                          {track.image}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{track.title}</h3>
                          <p className="text-gray-400">{track.artist} • {track.album}</p>
                          <div className="flex items-center space-x-3 mt-2">
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                              {track.confidence}% match
                            </span>
                            <span className="text-xs text-gray-500">{track.mood}</span>
                            <span className="text-xs text-gray-500">{track.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            setCurrentTrack(track.id);
                            setIsPlaying(!isPlaying);
                          }}
                          className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Play className="w-5 h-5 text-black ml-1" />
                        </button>
                        <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-sm text-gray-400">
                        <Brain className="w-4 h-4 inline mr-2" />
                        {track.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Moods Tab */}
          {activeTab === 'moods' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Music by Mood</h2>
                <p className="text-gray-400">AI-detected emotional patterns in your music</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {moodCategories.map((mood, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${mood.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                      {mood.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{mood.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{mood.count} tracks available</p>
                    <button className="w-full bg-white/10 hover:bg-white/20 rounded-lg py-2 text-sm transition-colors">
                      Explore {mood.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Tab */}
          {activeTab === 'trending' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Trending Now</h2>
                <p className="text-gray-400">Popular tracks among users with similar taste</p>
              </div>

              <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-8">
                <div className="flex items-center justify-center space-x-4 text-gray-400">
                  <TrendingUp className="w-8 h-8" />
                  <span className="text-lg">AI is analyzing trending patterns...</span>
                </div>
              </div>
            </div>
          )}

          {/* Insights Tab */}
          {activeTab === 'insights' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">AI Insights</h2>
                <p className="text-gray-400">Deep analysis of your music preferences</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-purple-400" />
                    Learning Progress
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Taste Profile</span>
                        <span>87%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '87%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Mood Detection</span>
                        <span>94%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{width: '94%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Context Awareness</span>
                        <span>91%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '91%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    Recommendation Quality
                  </h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">97.8%</div>
                    <p className="text-gray-400 mb-4">Average satisfaction rate</p>
                    <div className="inline-flex items-center space-x-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Player Bar */}
      {isPlaying && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 py-3">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-green-500 rounded-lg flex items-center justify-center">
                🎵
              </div>
              <div>
                <div className="font-semibold text-sm">Now Playing</div>
                <div className="text-gray-400 text-xs">AI Recommendation</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white">
                <Shuffle className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsPlaying(false)}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                <div className="w-3 h-3 bg-black"></div>
              </button>
              <button className="text-gray-400 hover:text-white">
                <Clock className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendationsPage;