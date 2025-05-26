"use client";

import { type FC, type FormEvent, useState, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

interface Track {
  title: string;
  artist: string;
  duration: string;
}

interface MockPlaylist {
  name: string;
  coverUrl: string;
  duration: string;
  trackCount: number;
  tracks: Track[];
}

const examplePrompts = [
  "Songs for a rainy day with a cup of coffee",
  "Upbeat workout music that will keep me motivated",
  "Music for a road trip along the coast",
  "Songs that feel like autumn in New York",
  "Relaxing instrumental music for deep focus"
];

const mockPlaylist: MockPlaylist = {
  name: "Late Night Coding Session",
  coverUrl: "/api/placeholder/500/500",
  duration: "1 hr 45 min",
  trackCount: 15,
  tracks: [
    { title: "Midnight Algorithm", artist: "Code Beats", duration: "3:45" },
    { title: "Function Calling", artist: "The Developers", duration: "4:12" },
    { title: "Deep Focus", artist: "Neural Network", duration: "5:20" },
    { title: "Ambient Logic", artist: "Binary Dreams", duration: "4:55" },
    { title: "Late Night Commit", artist: "Git Push", duration: "3:38" }
  ]
};

const PlaylistGenerator: FC = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const handleGeneratePlaylist = useCallback(
    (e?: FormEvent | null, customPrompt?: string) => {
      if (e) e.preventDefault();
      const input = customPrompt ?? prompt;
      if (!input) return;

      setLoading(true);
      setGenerated(false);

      setTimeout(() => {
        setPlaylistName(input.length > 30 ? input.slice(0, 30) + "..." : input);
        setLoading(false);
        setGenerated(true);
      }, 2000);
    },
    [prompt]
  );

  const handleReset = () => {
    setPrompt("");
    setGenerated(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <Head>
        <title>Intelligent Playlist Generator | SPOTIFY MAX</title>
        <meta name="description" content="Create AI-powered playlists based on your prompts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="pt-24 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Intelligent Playlist Generator
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Describe your mood, activity, or vibe and our AI will create the perfect playlist.
          </p>
        </div>

        {/* Prompt Input */}
        <div className="max-w-3xl mx-auto mb-12">
          <form onSubmit={(e) => handleGeneratePlaylist(e)} className="relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the mood or vibe you want..."
              className="w-full bg-zinc-900 border border-zinc-700 rounded-full py-5 px-6 pr-36 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
            />
            {prompt && !loading && (
              <button
                type="button"
                onClick={handleReset}
                className="absolute right-28 top-2 text-sm text-gray-400 hover:text-red-400"
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              disabled={loading || !prompt}
              className={`absolute right-2 top-2 bg-gradient-to-r from-green-500 to-green-400 text-black font-semibold py-3 px-8 rounded-full transition-all ${
                loading || !prompt ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
              }`}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </form>

          {/* Example Prompts */}
          <div className="mt-5 text-center">
            <p className="text-sm text-gray-500 mb-2">Try an example:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {examplePrompts.map((example, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPrompt(example);
                    handleGeneratePlaylist(null, example);
                  }}
                  className="bg-white/5 border border-white/10 text-sm text-gray-300 py-2 px-4 rounded-full hover:bg-white/10 transition"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Playlist Result */}
        {generated && (
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="absolute w-96 h-96 rounded-full bg-green-500 blur-[100px] opacity-15 -top-24 -left-24" />
            <div className="bg-zinc-900/60 backdrop-blur border border-white/5 rounded-3xl p-8 shadow-xl">
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                {/* Cover */}
                <div className="md:w-1/3 relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={mockPlaylist.coverUrl}
                    alt="Playlist Cover"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                  />
                </div>

                {/* Info */}
                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold mb-2">{playlistName}</h2>
                  <p className="text-gray-400 mb-6">Created by Spotify MAX AI</p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="bg-white/5 py-2 px-5 rounded-full text-gray-400">{mockPlaylist.trackCount} tracks</div>
                    <div className="bg-white/5 py-2 px-5 rounded-full text-gray-400">{mockPlaylist.duration}</div>
                  </div>
                  <div className="flex gap-4">
                    <Link href="https://spotify.com" target="_blank">
                      <button className="bg-gradient-to-r from-green-500 to-green-400 text-black font-semibold py-3 px-8 rounded-full hover:scale-105 hover:shadow-green-500/30 transition-all">
                        Save to Spotify
                      </button>
                    </Link>
                    <button
                      onClick={handleReset}
                      className="bg-white/5 border border-white/10 text-white font-medium py-3 px-8 rounded-full hover:bg-white/10 transition"
                    >
                      Regenerate
                    </button>
                  </div>
                </div>
              </div>

              {/* Track List */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-xl font-semibold mb-4">Tracks</h3>
                <div className="space-y-1">
                  {mockPlaylist.tracks.map((track, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 px-4 hover:bg-white/5 rounded-lg transition">
                      <div className="flex items-center gap-4">
                        <span className="w-5 text-gray-500">{idx + 1}</span>
                        <div>
                          <div className="font-medium">{track.title}</div>
                          <div className="text-gray-500 text-sm">{track.artist}</div>
                        </div>
                      </div>
                      <span className="text-gray-500">{track.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mt-20">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Other Playlists You Might Like
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-zinc-900/60 border border-white/5 rounded-xl p-5 hover:scale-105 hover:bg-zinc-900/80 transition">
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
                      <Image
                        src={`/api/placeholder/300/300?text=${i}`}
                        alt={`Recommended ${i}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                    <h4 className="font-semibold">Recommended Playlist {i}</h4>
                    <p className="text-gray-500 text-sm mt-1">15 tracks • 1hr 30min</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="py-8 bg-zinc-900/60 text-center text-sm text-gray-600">
        SPOTIFY MAX – Personal Project | Not affiliated with Spotify
      </footer>
    </div>
  );
};

export default PlaylistGenerator;
