"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { signOut, useSession } from "next-auth/react";
import { ArrowLeft, LogOut, Settings, Music, Share2, BarChart2, Heart } from 'lucide-react';

interface ProfileData {
  name: string;
  image: string;
  followers: number;
  following: number;
  topGenres: string[];
  recentlyPlayed: {
    id: string;
    name: string;
    artist: string;
    image: string;
    duration: string;
  }[];
  topArtists: {
    id: string;
    name: string;
    image: string;
    genre: string;
  }[];
  listeningStats: {
    minutesListened: number;
    topGenre: string;
    uniqueArtists: number;
    uniqueTracks: number;
  };
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch Spotify data when session is available
  useEffect(() => {
    async function fetchSpotifyData() {
      if (status !== "authenticated" || !session?.accessToken) {
        return;
      }

      try {
        // Create an object to store all our fetched data
        const data = {
          name: session.user?.name || "Unknown",
          image: session.user?.image || "/placeholder.png",
          followers: 0,
          following: 0,
          topGenres: [] as string[],
          recentlyPlayed: [],
          topArtists: [],
          listeningStats: {
            minutesListened: 0,
            topGenre: "",
            uniqueArtists: 0,
            uniqueTracks: 0
          }
        };

        // Fetch user profile information
        const profileResponse = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        });
        const profileResult = await profileResponse.json();
        
        if (profileResult) {
          data.followers = profileResult.followers?.total || 0;
          // Note: Spotify API doesn't provide following count directly
        }

        // Fetch recently played tracks
        const recentlyPlayedResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=5', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        });
        const recentlyPlayedResult = await recentlyPlayedResponse.json();
        
        if (recentlyPlayedResult?.items) {
          data.recentlyPlayed = recentlyPlayedResult.items.map((item: { track: any; }) => {
            const track = item.track;
            return {
              id: track.id,
              name: track.name,
              artist: track.artists.map((artist: { name: any; }) => artist.name).join(', '),
              image: track.album.images[0]?.url || "/placeholder.png",
              duration: formatDuration(track.duration_ms)
            };
          });
        }

        // Fetch top artists
        const topArtistsResponse = await fetch('https://api.spotify.com/v1/me/top/artists?limit=5&time_range=medium_term', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        });
        const topArtistsResult = await topArtistsResponse.json();
        
        if (topArtistsResult?.items) {
          data.topArtists = topArtistsResult.items.map((artist: { id: any; name: any; images: { url: any; }[]; genres: any[]; }) => {
            return {
              id: artist.id,
              name: artist.name,
              image: artist.images[0]?.url || "/placeholder.png",
              genre: artist.genres[0] || "Unknown"
            };
          });

          // Extract top genres from top artists
          const allGenres = topArtistsResult.items.flatMap((artist: { genres: any; }) => artist.genres);
          const genreCounts: Record<string, number> = {};
          allGenres.forEach((genre: string | number) => {
            genreCounts[genre] = (genreCounts[genre] || 0) + 1;
          });
          
          // Sort by count and take top 5
          data.topGenres = Object.entries(genreCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(entry => entry[0]);
          
          // Set top genre in listening stats
          if (data.topGenres.length > 0) {
            data.listeningStats.topGenre = data.topGenres[0] || "";
          }
        }

        // Fetch user's top tracks to get unique tracks count
        const topTracksResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        });
        const topTracksResult = await topTracksResponse.json();
        
        if (topTracksResult?.items) {
          data.listeningStats.uniqueTracks = topTracksResult.items.length;
          
          // Calculate unique artists from top tracks
          const uniqueArtistIds = new Set();
          topTracksResult.items.forEach((track: { artists: any[]; }) => {
            track.artists.forEach(artist => {
              return uniqueArtistIds.add(artist.id);
            });
          });
          data.listeningStats.uniqueArtists = uniqueArtistIds.size;
        }

        // For minutes listened, we'll approximate from available data
        // This is just an approximation since Spotify API doesn't directly provide total listening time
        const averageTrackLength = 3.5; // minutes
        const estimatedTracksPerMonth = 300; // rough estimate
        data.listeningStats.minutesListened = Math.round(averageTrackLength * estimatedTracksPerMonth);

        setProfileData(data);
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSpotifyData();
  }, [session, status]);

  // Helper function to format duration from milliseconds to mm:ss
  function formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 bg-green-500 opacity-30 rounded-full mb-4"></div>
          <div className="h-6 bg-white/20 rounded w-48 mb-4"></div>
          <div className="h-4 bg-white/10 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please Log In</h1>
          <p className="mb-6">You need to be logged in to view your Spotify profile.</p>
          <button 
            className="bg-green-500 text-black font-semibold py-3 px-8 rounded-full transition-all hover:scale-105"
            onClick={() => window.location.href = "/api/auth/signin"}
          >
            Sign In with Spotify
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans">
      <Head>
        <title>Your Profile | SPOTIFY MAX</title>
        <meta name="description" content="Your personalized music profile on SPOTIFY MAX" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Gradient Background Effect */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 opacity-10 blur-3xl rounded-full"></div>
      </div>

      {/* Header with Navigation */}
      <header className="relative z-10 p-4 md:p-6 flex items-center justify-between">
        <button className="flex items-center text-gray-400 hover:text-white transition">
          <ArrowLeft size={20} className="mr-2" />
          <span>Back</span>
        </button>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition">
            <Settings size={20} />
          </button>
          <button 
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
            onClick={() => signOut()}
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Profile Header Section */}
      <section className="relative z-10 px-4 pt-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 md:mb-0 md:mr-8 border-4 border-white/10">
              <Image 
                src={String(profileData?.image || "/placeholder.png")}
                alt="Profile picture"
                width={160}
                height={160}
                className="object-cover w-full h-full"
              />
            </div>
            
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{profileData?.name}</h1>
              <div className="flex items-center justify-center md:justify-start space-x-6 mb-4 text-gray-400">
                <div>
                  <span className="font-bold text-white">{profileData?.followers}</span> Followers
                </div>
                <div>
                  <span className="font-bold text-white">{profileData?.following}</span> Following
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6">
                {profileData?.topGenres.map((genre, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 rounded-full text-sm bg-white/5 border border-white/10"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="bg-gradient-to-r from-green-500 to-green-400 text-black font-semibold py-2 px-6 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/30">
                  View Analysis
                </button>
                <button className="bg-white/5 border border-white/10 text-white font-medium py-2 px-6 rounded-full transition-all hover:bg-white/10">
                  <Share2 size={18} className="inline mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar">
            <button 
              className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('overview')}
            >
              <Music size={18} className="inline mr-2" />
              Overview
            </button>
            <button 
              className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'stats' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('stats')}
            >
              <BarChart2 size={18} className="inline mr-2" />
              Stats
            </button>
            <button 
              className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'artists' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('artists')}
            >
              <Heart size={18} className="inline mr-2" />
              Top Artists
            </button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <main className="relative z-10 py-10">
        <div className="max-w-4xl mx-auto px-4">
          {/* Overview Tab Content */}
          {activeTab === 'overview' && (
            <div>
              {/* Recently Played Section */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Recently Played</h2>
                <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 text-sm">
                        <th className="text-left py-4 px-6">#</th>
                        <th className="text-left py-4">TITLE</th>
                        <th className="text-left py-4 hidden md:table-cell">ARTIST</th>
                        <th className="text-right py-4 px-6">DURATION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profileData?.recentlyPlayed.map((track, index) => (
                        <tr 
                          key={track.id} 
                          className="hover:bg-white/5 cursor-pointer transition"
                        >
                          <td className="py-3 px-6">{index + 1}</td>
                          <td className="py-3">
                            <div className="flex items-center">
                              <div className="relative w-10 h-10 rounded overflow-hidden mr-4">
                                <Image
                                  src={track.image}
                                  alt={track.name}
                                  width={40}
                                  height={40}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <span className="font-medium">{track.name}</span>
                            </div>
                          </td>
                          <td className="py-3 text-gray-400 hidden md:table-cell">{track.artist}</td>
                          <td className="py-3 px-6 text-gray-400 text-right">{track.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Listening Snapshot */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Your Listening Snapshot</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tighter mb-2">
                      {Math.floor((profileData?.listeningStats?.minutesListened ?? 0) / 60)}h {(profileData?.listeningStats?.minutesListened ?? 0) % 60}m
                    </div>
                    <div className="text-gray-400 text-sm">
                      Time spent listening
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tighter mb-2">
                      {profileData?.listeningStats.topGenre || "N/A"}
                    </div>
                    <div className="text-gray-400 text-sm">
                      Most played genre
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tighter mb-2">
                      {profileData?.listeningStats.uniqueArtists}
                    </div>
                    <div className="text-gray-400 text-sm">
                      Unique artists played
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tighter mb-2">
                      {profileData?.listeningStats.uniqueTracks}
                    </div>
                    <div className="text-gray-400 text-sm">
                      Unique tracks played
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Stats Tab Content */}
          {activeTab === 'stats' && (
            <div>
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-6">Listening Insights</h2>
                <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-8">
                  <p className="text-xl text-center text-gray-400 mb-6">Your detailed listening stats visualization</p>
                  <div className="h-64 bg-white/10 rounded-xl flex items-center justify-center">
                    <p className="text-gray-500">Advanced statistics visualization would appear here</p>
                  </div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="text-2xl font-bold mb-1">Peak Listening</div>
                      <div className="text-gray-400">Evenings, 8-10 PM</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="text-2xl font-bold mb-1">Mood Pattern</div>
                      <div className="text-gray-400">Upbeat & Energetic</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="text-2xl font-bold mb-1">Discovery Rate</div>
                      <div className="text-gray-400">15 new artists/month</div>
                    </div>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-6">Genre Distribution</h2>
                <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-8">
                  <div className="h-64 bg-white/10 rounded-xl flex items-center justify-center">
                    <p className="text-gray-500">Genre distribution chart would appear here</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {profileData?.topGenres.map((genre, index) => {
                      const colors = [
                        "bg-green-500/20 border-green-500/30",
                        "bg-blue-500/20 border-blue-500/30", 
                        "bg-purple-500/20 border-purple-500/30",
                        "bg-red-500/20 border-red-500/30",
                        "bg-yellow-500/20 border-yellow-500/30"
                      ];
                      const color = colors[index % colors.length];
                      const percentage = Math.round(100 / (index + 2));
                      
                      return (
                        <div key={index} className={`${color} px-4 py-2 rounded-full border`}>
                          <span className="font-medium">{genre}</span> <span className="text-gray-400">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Top Artists Tab Content */}
          {activeTab === 'artists' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Top Artists</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {profileData?.topArtists.map(artist => (
                  <div 
                    key={artist.id}
                    className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition cursor-pointer group"
                  >
                    <div className="relative w-full h-48">
                      <Image
                        src={artist.image}
                        alt={artist.name}
                        width={400}
                        height={200}
                        className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-6">
                        <h3 className="text-xl font-bold mb-1">{artist.name}</h3>
                        <p className="text-gray-400">{artist.genre}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Compatibility Score</span>
                        <div className="h-1 w-24 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-green-400" style={{width: `${Math.random() * 40 + 60}%`}}></div>
                        </div>
                      </div>
                      <button className="w-full mt-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm hover:bg-white/10 transition">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 text-center">
                <button className="bg-white/5 border border-white/10 text-white font-medium py-3 px-8 rounded-full transition-all hover:bg-white/10">
                  Explore More Artists
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 bg-zinc-900/50 mt-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            SPOTIFY MAX - Personal Project | Not affiliated with Spotify
          </p>
        </div>
      </footer>
    </div>
  );
}