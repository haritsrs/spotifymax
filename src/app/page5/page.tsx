"use client";

import React, { useState, useEffect } from 'react';
import { Palette, Sparkles, Download, Shuffle, Eye, Image, Type, Wand2, Save, Share2, RefreshCw } from 'lucide-react';

type Playlist = {
  id: number;
  name: string;
  tracks: number;
  duration: string;
  mood: string;
  genres: string[];
};

const CustomAestheticPage = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [generatingAesthetic, setGeneratingAesthetic] = useState(false);
  const [activeAesthetic, setActiveAesthetic] = useState('cosmic');
  const [animatedCount, setAnimatedCount] = useState(0);

  // Animated counter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedCount(47392);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const playlists = [
    {
      id: 1,
      name: "Late Night Drives",
      tracks: 43,
      duration: "2h 47m",
      mood: "Nocturnal",
      genres: ["Synthwave", "Electronic", "Ambient"]
    },
    {
      id: 2,
      name: "Morning Coffee Vibes",
      tracks: 28,
      duration: "1h 52m",
      mood: "Peaceful",
      genres: ["Indie Folk", "Acoustic", "Jazz"]
    },
    {
      id: 3,
      name: "Workout Energy",
      tracks: 35,
      duration: "2h 15m",
      mood: "Energetic",
      genres: ["Hip-Hop", "Electronic", "Rock"]
    }
  ];

  const aestheticTemplates = [
    {
      id: 'cosmic',
      name: 'Cosmic Dreams',
      description: 'Deep space vibes with stellar gradients',
      preview: '🌌',
      colors: ['from-purple-900', 'via-blue-900', 'to-black'],
      style: 'Futuristic'
    },
    {
      id: 'neon',
      name: 'Neon Nights',
      description: 'Cyberpunk aesthetics with electric colors',
      preview: '🌃',
      colors: ['from-pink-500', 'via-purple-500', 'to-blue-500'],
      style: 'Cyberpunk'
    },
    {
      id: 'minimal',
      name: 'Clean Minimal',
      description: 'Simple elegance with soft tones',
      preview: '⚪',
      colors: ['from-gray-100', 'via-gray-200', 'to-white'],
      style: 'Minimalist'
    },
    {
      id: 'vintage',
      name: 'Vintage Film',
      description: 'Retro warmth with film grain texture',
      preview: '📸',
      colors: ['from-orange-400', 'via-red-400', 'to-yellow-300'],
      style: 'Retro'
    },
    {
      id: 'nature',
      name: 'Forest Dreams',
      description: 'Organic textures with earth tones',
      preview: '🌿',
      colors: ['from-green-800', 'via-green-600', 'to-emerald-400'],
      style: 'Organic'
    },
    {
      id: 'abstract',
      name: 'Abstract Flow',
      description: 'Fluid shapes with dynamic gradients',
      preview: '🎨',
      colors: ['from-indigo-500', 'via-purple-500', 'to-pink-500'],
      style: 'Abstract'
    }
  ];

  const generatedAesthetics = [
    {
      playlistName: "Late Night Drives",
      aesthetic: "Neon Highway",
      cover: "🌃",
      colors: "Purple-Pink Gradient",
      font: "Futura Extended",
      elements: ["Neon glow", "City skyline", "Light trails"]
    },
    {
      playlistName: "Morning Coffee Vibes",
      aesthetic: "Cozy Minimalism",
      cover: "☕",
      colors: "Warm Earth Tones",
      font: "Helvetica Light",
      elements: ["Soft shadows", "Paper texture", "Steam wisps"]
    }
  ];

  const handleGenerateAesthetic = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setGeneratingAesthetic(true);
    
    setTimeout(() => {
      setGeneratingAesthetic(false);
    }, 3000);
  };

  const getAestheticGradient = (aestheticId: string) => {
    const aesthetic = aestheticTemplates.find(a => a.id === aestheticId);
    return aesthetic ? `bg-gradient-to-br ${aesthetic.colors.join(' ')}` : 'bg-gradient-to-br from-purple-900 via-blue-900 to-black';
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-purple-900/20 to-orange-900/30"></div>
        <div className="absolute w-96 h-96 rounded-full bg-red-500 filter blur-[150px] opacity-20 -top-24 -left-24"></div>
        <div className="absolute w-64 h-64 rounded-full bg-orange-500 filter blur-[100px] opacity-20 bottom-10 right-10"></div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-orange-500 mb-4 mx-auto">
              <Palette className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-orange-200 bg-clip-text text-transparent tracking-tight">
            Custom Aesthetic Generation
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Transform your playlists into visual masterpieces with AI-generated artwork, creative naming, and aesthetic themes
          </p>

          {/* Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
              <div className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
                {animatedCount.toLocaleString()}+
              </div>
              <div className="text-gray-400 text-sm">Aesthetics generated</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
                ∞
              </div>
              <div className="text-gray-400 text-sm">Unique combinations</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                97%
              </div>
              <div className="text-gray-400 text-sm">User satisfaction rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Your Playlists */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-bold">Your Playlists</h2>
              <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all">
                Import More Playlists
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlists.map((playlist) => (
                <div key={playlist.id} className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-2">{playlist.name}</h3>
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>{playlist.tracks} tracks • {playlist.duration}</div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-orange-500/20 border border-orange-500/30 rounded text-xs">
                            {playlist.mood}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Genres</h4>
                    <div className="flex flex-wrap gap-1">
                      {playlist.genres.map((genre) => (
                        <span key={genre} className="px-2 py-1 bg-gray-700 rounded text-xs">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => handleGenerateAesthetic(playlist)}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <Wand2 className="w-4 h-4" />
                    <span>Generate Aesthetic</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Aesthetic Templates */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-12">Aesthetic Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aestheticTemplates.map((template) => (
                <div 
                  key={template.id}
                  className={`relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeAesthetic === template.id ? 'border-orange-500' : 'border-white/10'
                  }`}
                  onClick={() => setActiveAesthetic(template.id)}
                >
                  <div className={`h-48 ${getAestheticGradient(template.id)} flex items-center justify-center text-6xl`}>
                    {template.preview}
                  </div>
                  <div className="p-6 bg-white/5 backdrop-blur">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{template.name}</h3>
                      <span className="text-xs px-2 py-1 bg-gray-700 rounded">{template.style}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{template.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Generation Studio */}
          {generatingAesthetic && selectedPlaylist && (
            <div className="mb-20">
              <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-orange-500 mb-4 animate-pulse">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Generating Aesthetic for "{selectedPlaylist.name}"</h3>
                  <p className="text-gray-400 mb-8">AI is analyzing your music and creating the perfect visual identity...</p>
                  
                  <div className="max-w-md mx-auto">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Analyzing music patterns</span>
                      <span>Complete</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                      <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full w-full animate-pulse"></div>
                    </div>
                    
                    <div className="space-y-2 text-left">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-300">Mood detection: {selectedPlaylist.mood}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-300">Color palette generation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-300">Typography selection</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-300">Visual elements composition</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Generated Aesthetics Gallery */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-bold">Your Generated Aesthetics</h2>
              <div className="flex items-center space-x-4">
                <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedAesthetics.map((aesthetic, index) => (
                <div key={index} className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all group">
                  <div className="h-48 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex items-center justify-center text-6xl relative">
                    {aesthetic.cover}
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-bold text-white text-lg">{aesthetic.playlistName}</h3>
                      <p className="text-white/80 text-sm">{aesthetic.aesthetic}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Colors:</span>
                        <span className="text-white text-sm">{aesthetic.colors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Font:</span>
                        <span className="text-white text-sm">{aesthetic.font}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Elements</h4>
                      <div className="flex flex-wrap gap-1">
                        {aesthetic.elements.map((element) => (
                          <span key={element} className="px-2 py-1 bg-orange-500/20 border border-orange-500/30 rounded text-xs">
                            {element}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                        <Save className="w-4 h-4" />
                        <span>Apply</span>
                      </button>
                      <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customization Controls */}
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-8">
            <h2 className="text-3xl font-bold mb-8">Advanced Customization</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Palette className="w-6 h-6 mr-2 text-red-400" />
                  Color Schemes
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    'bg-gradient-to-r from-red-500 to-pink-500',
                    'bg-gradient-to-r from-blue-500 to-purple-500',
                    'bg-gradient-to-r from-green-500 to-teal-500',
                    'bg-gradient-to-r from-yellow-500 to-orange-500',
                    'bg-gradient-to-r from-purple-500 to-indigo-500',
                    'bg-gradient-to-r from-pink-500 to-rose-500',
                    'bg-gradient-to-r from-cyan-500 to-blue-500',
                    'bg-gradient-to-r from-orange-500 to-red-500'
                  ].map((gradient, index) => (
                    <button
                      key={index}
                      className={`w-full h-12 rounded-lg ${gradient} hover:scale-105 transition-transform`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Type className="w-6 h-6 mr-2 text-orange-400" />
                  Typography Styles
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Modern Sans', style: 'font-sans font-bold' },
                    { name: 'Elegant Serif', style: 'font-serif font-medium' },
                    { name: 'Tech Mono', style: 'font-mono font-bold' },
                    { name: 'Artistic Script', style: 'font-sans italic font-semibold' }
                  ].map((font) => (
                    <button
                      key={font.name}
                      className={`w-full p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all text-left ${font.style}`}
                    >
                      {font.name} - Sample Text
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex justify-center space-x-4">
                <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all">
                  Generate New Aesthetic
                </button>
                <button className="bg-white/10 text-white px-8 py-3 rounded-full font-medium hover:bg-white/20 transition-all">
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">AI-Powered Creative Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Image className="w-8 h-8" />,
                title: "Smart Cover Art",
                description: "AI generates unique artwork that reflects your playlist's musical DNA and emotional tone."
              },
              {
                icon: <Type className="w-8 h-8" />,
                title: "Creative Naming",
                description: "Discover perfect playlist names that capture the essence and vibe of your music collection."
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Mood Visualization",
                description: "Transform musical emotions into stunning visual themes with dynamic color palettes."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white mb-4">
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
          <h2 className="text-4xl font-bold mb-6">Transform Your Playlists Today</h2>
          <p className="text-xl text-gray-400 mb-10">
            Join thousands of creators who've elevated their music experience with AI-generated aesthetics.
          </p>
          <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold text-lg py-4 px-12 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-500/30">
            Start Creating Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default CustomAestheticPage;