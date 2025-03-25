"use client";

import type { FC, FormEvent } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const PlaylistGenerator: FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  
  const examplePrompts = [
    "Songs for a rainy day with a cup of coffee",
    "Upbeat workout music that will keep me motivated",
    "Music for a road trip along the coast",
    "Songs that feel like autumn in New York",
    "Relaxing instrumental music for deep focus"
  ];
  
  const mockPlaylist = {
    name: "Late Night Coding Session",
    coverUrl: "/api/placeholder/500/500",
    duration: "1 hr 45 min",
    trackCount: 15,
    tracks: [
      { title: "Midnight Algorithm", artist: "Code Beats", duration: "3:45" },
      { title: "Function Calling", artist: "The Developers", duration: "4:12" },
      { title: "Deep Focus", artist: "Neural Network", duration: "5:20" },
      { title: "Ambient Logic", artist: "Binary Dreams", duration: "4:55" },
      { title: "Late Night Commit", artist: "Git Push", duration: "3:38" },
    ]
  };
  
  const handleGeneratePlaylist = (e: FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
      setPlaylistName(prompt.length > 30 ? prompt.substring(0, 30) + "..." : prompt);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans">
      <Head>
        <title>Intelligent Playlist Generator | SPOTIFY MAX</title>
        <meta name="description" content="Create AI-powered playlists based on your prompts" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Header */}
      <header className="fixed w-full z-50 bg-black/80 backdrop-blur py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          <Link href="/">
            <div className="text-2xl font-semibold tracking-tight cursor-pointer">
              SPOTIFY <span className="bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">MAX</span>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/dashboard">
              <span className="text-gray-400 hover:text-white transition cursor-pointer">Dashboard</span>
            </Link>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center">
              <span className="text-black font-medium">U</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight">
              Intelligent Playlist Generator
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Describe your mood, activity, or vibe and our AI will create the perfect playlist just for you.
            </p>
          </div>
          
          {/* Generator Form */}
          <div className="max-w-3xl mx-auto mb-20">
            <form onSubmit={handleGeneratePlaylist} className="relative">
              <div className="relative mb-4">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the mood or vibe you want for your playlist..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-full py-5 px-6 pr-36 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
                />
                <button
                  type="submit"
                  disabled={loading || !prompt}
                  className={`absolute right-2 top-2 bg-gradient-to-r from-green-500 to-green-400 text-black font-semibold py-3 px-8 rounded-full transition-all ${
                    loading || !prompt ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg hover:shadow-green-500/30'
                  }`}
                >
                  {loading ? 'Generating...' : 'Generate'}
                </button>
              </div>
              
              {/* Example prompts */}
              <div className="mt-4 text-center">
                <p className="text-gray-500 text-sm mb-3">Try these examples:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {examplePrompts.map((example, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setPrompt(example)}
                      className="bg-white/5 border border-white/10 text-sm text-gray-300 py-2 px-4 rounded-full hover:bg-white/10 transition"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
          
          {/* Generated Playlist */}
          {generated && (
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute w-96 h-96 rounded-full bg-green-500 filter blur-[100px] opacity-15 -top-24 -left-24 z-0"></div>
              </div>
              
              <div className="bg-zinc-900/60 backdrop-blur border border-white/5 rounded-3xl p-8 shadow-xl relative z-10">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  {/* Playlist Cover */}
                  <div className="md:w-1/3">
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={mockPlaylist.coverUrl}
                        alt="Generated playlist cover"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-2xl"
                      />
                    </div>
                  </div>
                  
                  {/* Playlist Info */}
                  <div className="md:w-2/3">
                    <h2 className="text-3xl font-bold mb-2">{playlistName}</h2>
                    <p className="text-gray-400 mb-6">Created by Spotify MAX AI</p>
                    
                    <div className="flex flex-wrap gap-6 mb-8">
                      <div className="bg-white/5 py-2 px-5 rounded-full">
                        <span className="text-gray-400">{mockPlaylist.trackCount} tracks</span>
                      </div>
                      <div className="bg-white/5 py-2 px-5 rounded-full">
                        <span className="text-gray-400">{mockPlaylist.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <button className="bg-gradient-to-r from-green-500 to-green-400 text-black font-semibold py-3 px-8 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/30">
                        Save to Spotify
                      </button>
                      <button className="bg-white/5 border border-white/10 text-white font-medium py-3 px-8 rounded-full transition-all hover:bg-white/10">
                        Regenerate
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Track List */}
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-xl font-semibold mb-4">Tracks</h3>
                  <div className="space-y-1">
                    {mockPlaylist.tracks.map((track, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between py-3 px-4 hover:bg-white/5 rounded-lg transition cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div className="w-6 text-gray-500 mr-4">{index + 1}</div>
                          <div>
                            <div className="font-medium">{track.title}</div>
                            <div className="text-gray-500 text-sm">{track.artist}</div>
                          </div>
                        </div>
                        <div className="text-gray-500">{track.duration}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-8">
                    <button className="bg-white/5 border border-white/10 text-white font-medium py-2 px-6 rounded-full transition-all hover:bg-white/10">
                      Show all {mockPlaylist.trackCount} tracks
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Recommendations */}
              <div className="mt-20">
                <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight">
                  Other Playlists You Might Like
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-zinc-900/60 backdrop-blur border border-white/5 rounded-xl p-5 transition hover:bg-zinc-900/80 hover:scale-105 cursor-pointer">
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
                        <Image
                          src={`/api/placeholder/300/300?text=${item}`}
                          alt={`Recommended playlist ${item}`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      </div>
                      <h4 className="font-semibold">Recommended Playlist {item}</h4>
                      <p className="text-gray-500 text-sm mt-1">15 tracks • 1hr 30min</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-zinc-900/60">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            SPOTIFY MAX - Personal Project | Not affiliated with Spotify
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PlaylistGenerator;