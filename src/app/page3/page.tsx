"use client";

import React, { useState, useEffect } from 'react';
import { Users, Heart, Music, TrendingUp, Star, Play, UserPlus, Share2, Zap, Award } from 'lucide-react';

const MusicCompatibilityPage = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [animatedStats, setAnimatedStats] = useState({ matches: 0, compatibility: 0, connections: 0 });

  // Animated counter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({ matches: 8547, compatibility: 94, connections: 2847 });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const compatibilityMatches = [
    {
      id: 1,
      name: "Alex Chen",
      compatibility: 94,
      avatar: "🎵",
      sharedGenres: ["Indie Rock", "Alternative", "Dream Pop"],
      topArtists: ["Tame Impala", "Arctic Monkeys", "Beach House"],
      status: "online",
      mutualFriends: 12
    },
    {
      id: 2,
      name: "Sarah Martinez",
      compatibility: 89,
      avatar: "🎸",
      sharedGenres: ["Electronic", "Synthwave", "Ambient"],
      topArtists: ["Boards of Canada", "Tycho", "Emancipator"],
      status: "listening",
      mutualFriends: 8
    },
    {
      id: 3,
      name: "Jordan Kim",
      compatibility: 87,
      avatar: "🎤",
      sharedGenres: ["Hip-Hop", "R&B", "Neo-Soul"],
      topArtists: ["Kendrick Lamar", "Frank Ocean", "The Weeknd"],
      status: "offline",
      mutualFriends: 15
    }
  ];

  const sharedPlaylists = [
    {
      title: "Midnight Vibes",
      collaborator: "Alex Chen",
      tracks: 47,
      plays: 1284,
      cover: "🌙"
    },
    {
      title: "Study Session",
      collaborator: "Sarah Martinez",
      tracks: 32,
      plays: 892,
      cover: "📚"
    },
    {
      title: "Road Trip Essentials",
      collaborator: "Jordan Kim",
      tracks: 68,
      plays: 2156,
      cover: "🚗"
    }
  ];

  const getCompatibilityColor = (score) => {
    if (score >= 90) return "text-green-400";
    if (score >= 80) return "text-blue-400";
    if (score >= 70) return "text-yellow-400";
    return "text-orange-400";
  };

  const getCompatibilityBg = (score) => {
    if (score >= 90) return "bg-green-500/20 border-green-500/30";
    if (score >= 80) return "bg-blue-500/20 border-blue-500/30";
    if (score >= 70) return "bg-yellow-500/20 border-yellow-500/30";
    return "bg-orange-500/20 border-orange-500/30";
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans">
      {/* Header */}
      <header className="relative z-50 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              ← Back
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              SPOTIFY MAX
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-black font-bold">
              M
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-pink-900/30"></div>
        <div className="absolute w-96 h-96 rounded-full bg-blue-500 filter blur-[150px] opacity-20 top-10 left-10"></div>
        <div className="absolute w-64 h-64 rounded-full bg-purple-500 filter blur-[100px] opacity-20 bottom-10 right-10"></div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4 mx-auto">
              <Users className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent tracking-tight">
            Music Compatibility
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Discover your music soulmates and build deeper connections through the universal language of sound
          </p>

          {/* Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {animatedStats.matches.toLocaleString()}+
              </div>
              <div className="text-gray-400 text-sm">Compatibility matches found</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {animatedStats.compatibility}%
              </div>
              <div className="text-gray-400 text-sm">Average compatibility score</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {animatedStats.connections.toLocaleString()}+
              </div>
              <div className="text-gray-400 text-sm">Musical connections made</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/5 backdrop-blur rounded-full border border-white/10 p-2 inline-flex">
              {[
                { id: 'discover', label: 'Discover', icon: Zap },
                { id: 'matches', label: 'My Matches', icon: Heart },
                { id: 'playlists', label: 'Shared Playlists', icon: Music }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
                    activeTab === id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Discover Tab */}
          {activeTab === 'discover' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-8">How It Works</h2>
                <div className="space-y-6">
                  {[
                    {
                      step: 1,
                      title: "Analyze Your Music DNA",
                      description: "Our AI analyzes your listening patterns, favorite genres, artists, and emotional preferences to create your unique music profile.",
                      icon: "🧬"
                    },
                    {
                      step: 2,
                      title: "Find Compatible Matches",
                      description: "Advanced algorithms compare your music DNA with millions of other users to find those with complementary tastes.",
                      icon: "🔍"
                    },
                    {
                      step: 3,
                      title: "Connect & Collaborate",
                      description: "Start conversations, share playlists, and discover new music together with your compatibility matches.",
                      icon: "🤝"
                    }
                  ].map(({ step, title, description, icon }) => (
                    <div key={step} className="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {step}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 flex items-center">
                          <span className="mr-2">{icon}</span>
                          {title}
                        </h3>
                        <p className="text-gray-400">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-8">Your Music Profile</h2>
                <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-8">
                  <div className="text-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-black font-bold text-2xl mx-auto mb-4">
                      YOU
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Your Musical Identity</h3>
                    <p className="text-gray-400">Eclectic Explorer with Indie Roots</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 flex items-center">
                        <Music className="w-5 h-5 mr-2 text-blue-400" />
                        Top Genres
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["Indie Rock", "Alternative", "Electronic", "Ambient", "Folk"].map((genre) => (
                          <span key={genre} className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 flex items-center">
                        <Star className="w-5 h-5 mr-2 text-yellow-400" />
                        Listening Traits
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Adventurous</span>
                          <div className="w-24 h-2 bg-gray-700 rounded-full">
                            <div className="w-20 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Nostalgic</span>
                          <div className="w-24 h-2 bg-gray-700 rounded-full">
                            <div className="w-16 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Mood-Driven</span>
                          <div className="w-24 h-2 bg-gray-700 rounded-full">
                            <div className="w-22 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Matches Tab */}
          {activeTab === 'matches' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Your Compatibility Matches</h2>
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all">
                  Find More Matches
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {compatibilityMatches.map((match) => (
                  <div key={match.id} className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl">
                          {match.avatar}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{match.name}</h3>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${match.status === 'online' ? 'bg-green-400' : match.status === 'listening' ? 'bg-blue-400' : 'bg-gray-400'}`}></div>
                            <span className="text-sm text-gray-400 capitalize">{match.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full border ${getCompatibilityBg(match.compatibility)}`}>
                        <span className={`font-bold ${getCompatibilityColor(match.compatibility)}`}>
                          {match.compatibility}%
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Shared Genres</h4>
                      <div className="flex flex-wrap gap-1">
                        {match.sharedGenres.slice(0, 3).map((genre) => (
                          <span key={genre} className="px-2 py-1 bg-gray-700 rounded text-xs">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Top Artists</h4>
                      <div className="space-y-1">
                        {match.topArtists.slice(0, 2).map((artist) => (
                          <div key={artist} className="text-sm text-gray-300">{artist}</div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all">
                        Connect
                      </button>
                      <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shared Playlists Tab */}
          {activeTab === 'playlists' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Collaborative Playlists</h2>
                <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all">
                  Create Playlist
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sharedPlaylists.map((playlist, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all group">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-2xl">
                        {playlist.cover}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{playlist.title}</h3>
                        <p className="text-gray-400 text-sm">with {playlist.collaborator}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{playlist.tracks} tracks</span>
                        <span>{playlist.plays.toLocaleString()} plays</span>
                      </div>
                    </div>

                    <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2">
                      <Play className="w-4 h-4" />
                      <span>Play Playlist</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Music Compatibility Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8" />,
                title: "Proven Algorithm",
                description: "Our compatibility scoring uses advanced machine learning trained on millions of music preferences."
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Real-Time Updates",
                description: "Your compatibility scores update as your music taste evolves, ensuring fresh matches."
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Meaningful Connections",
                description: "Users report 89% satisfaction rate in finding genuine musical connections."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Music Soulmate?</h2>
          <p className="text-xl text-gray-400 mb-10">
            Join thousands of music lovers who've discovered meaningful connections through our compatibility matching.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg py-4 px-12 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30">
            Start Matching Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default MusicCompatibilityPage;