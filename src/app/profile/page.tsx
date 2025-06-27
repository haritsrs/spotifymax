"use client"

import { useState, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { ArrowLeft, LogOut, Settings, Music, Share2, BarChart2, Heart } from "lucide-react"
import type { ProfileData } from "../types/ProfileData"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState("overview")
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch Spotify data when session is available
  useEffect(() => {
    async function fetchSpotifyData() {
      if (status !== "authenticated" || !session?.accessToken) {
        console.log("❌ No session or access token available")
        return
      }

      console.log("🎵 Starting Spotify data fetch...")
      console.log("Access token:", session.accessToken ? "✅ Present" : "❌ Missing")

      try {
        // Create an object to store all our fetched data
        const data: ProfileData = {
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
            uniqueTracks: 0,
          },
        }

        // Fetch user profile information
        console.log("📱 Fetching user profile...")
        try {
          const profileResponse = await fetch("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          })

          console.log("Profile response status:", profileResponse.status)

          if (!profileResponse.ok) {
            const errorText = await profileResponse.text()
            console.error("❌ Profile API error:", profileResponse.status, errorText)
          } else {
            const profileResult = await profileResponse.json()
            console.log("✅ Profile data:", profileResult)

            if (profileResult) {
              data.followers = profileResult.followers?.total || 0
            }
          }
        } catch (error) {
          console.error("❌ Profile fetch error:", error)
        }

        // Fetch recently played tracks
        console.log("🎧 Fetching recently played tracks...")
        try {
          const recentlyPlayedResponse = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=50", {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          })

          console.log("Recently played response status:", recentlyPlayedResponse.status)

          if (!recentlyPlayedResponse.ok) {
            const errorText = await recentlyPlayedResponse.text()
            console.error("❌ Recently played API error:", recentlyPlayedResponse.status, errorText)
          } else {
            const recentlyPlayedResult = await recentlyPlayedResponse.json()
            console.log("✅ Recently played data:", recentlyPlayedResult)

            // Calculate actual minutes listened from recently played tracks
            if (recentlyPlayedResult?.items && recentlyPlayedResult.items.length > 0) {
              data.recentlyPlayed = recentlyPlayedResult.items.slice(0, 5).map((item: { track: any }) => {
                const track = item.track
                return {
                  id: track.id,
                  name: track.name,
                  artist: track.artists.map((artist: { name: any }) => artist.name).join(", "),
                  image: track.album.images[0]?.url || "/placeholder.png",
                  duration: formatDuration(track.duration_ms),
                }
              })

              // Calculate total minutes listened from actual track durations
              const totalMs = recentlyPlayedResult.items.reduce(
                (sum: number, item: { track: { duration_ms: number } }) => sum + item.track.duration_ms,
                0,
              )
              data.listeningStats.minutesListened = Math.floor(totalMs / 60000)
              console.log("⏱️ Calculated listening time:", data.listeningStats.minutesListened, "minutes")
            } else {
              console.log("⚠️ No recently played items found")
            }
          }
        } catch (error) {
          console.error("❌ Recently played fetch error:", error)
        }

        // Fetch top artists
        console.log("🎤 Fetching top artists...")
        try {
          const topArtistsResponse = await fetch(
            "https://api.spotify.com/v1/me/top/artists?limit=10&time_range=medium_term",
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            },
          )

          console.log("Top artists response status:", topArtistsResponse.status)

          if (!topArtistsResponse.ok) {
            const errorText = await topArtistsResponse.text()
            console.error("❌ Top artists API error:", topArtistsResponse.status, errorText)
          } else {
            const topArtistsResult = await topArtistsResponse.json()
            console.log("✅ Top artists data:", topArtistsResult)

            if (topArtistsResult?.items && topArtistsResult.items.length > 0) {
              data.topArtists = topArtistsResult.items
                .slice(0, 5)
                .map((artist: { id: any; name: any; images: { url: any }[]; genres: any[] }) => {
                  return {
                    id: artist.id,
                    name: artist.name,
                    image: artist.images[0]?.url || "/placeholder.png",
                    genre: artist.genres[0] || "Unknown",
                  }
                })

              const allGenres = topArtistsResult.items.flatMap((artist: { genres: any }) => artist.genres)
              const genreCounts: Record<string, number> = {}
              allGenres.forEach((genre: string | number) => {
                genreCounts[genre] = (genreCounts[genre] || 0) + 1
              })

              console.log("🎵 Genre counts:", genreCounts)

              // Sort by count and take top 5
              data.topGenres = Object.entries(genreCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map((entry) => entry[0])

              // Calculate real genre distribution percentages
              const totalGenresPlayed = Object.values(genreCounts).reduce(
                (sum: number, count: number) => sum + count,
                0,
              )
              const genreDistribution = Object.entries(genreCounts).map(([genre, count]) => ({
                genre,
                percentage: Math.round((count / totalGenresPlayed) * 100),
              }))

              // Store genre distribution for use in stats tab
              data.genreDistribution = genreDistribution

              // Set top genre in listening stats
              if (data.topGenres.length > 0) {
                data.listeningStats.topGenre = data.topGenres[0] || ""
              }
            } else {
              console.log("⚠️ No top artists found")
            }
          }
        } catch (error) {
          console.error("❌ Top artists fetch error:", error)
        }

        // Fetch user's top tracks to get unique tracks count
        console.log("🎵 Fetching top tracks...")
        try {
          const topTracksResponse = await fetch(
            "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term",
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            },
          )

          console.log("Top tracks response status:", topTracksResponse.status)

          if (!topTracksResponse.ok) {
            const errorText = await topTracksResponse.text()
            console.error("❌ Top tracks API error:", topTracksResponse.status, errorText)
          } else {
            const topTracksResult = await topTracksResponse.json()
            console.log("✅ Top tracks data:", topTracksResult)

            if (topTracksResult?.items && topTracksResult.items.length > 0) {
              data.listeningStats.uniqueTracks = topTracksResult.items.length

              // Calculate unique artists from top tracks
              const uniqueArtistIds = new Set()
              topTracksResult.items.forEach((track: { artists: any[] }) => {
                track.artists.forEach((artist) => {
                  return uniqueArtistIds.add(artist.id)
                })
              })
              data.listeningStats.uniqueArtists = uniqueArtistIds.size

              // Fetch audio features for top tracks
              const trackIds = topTracksResult.items
                .slice(0, 20)
                .map((track: { id: any }) => track.id)
                .join(",")

              console.log("🎶 Fetching audio features...")
              try {
                const audioFeaturesResponse = await fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIds}`, {
                  headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                  },
                })

                console.log("Audio features response status:", audioFeaturesResponse.status)

                if (!audioFeaturesResponse.ok) {
                  const errorText = await audioFeaturesResponse.text()
                  console.error("❌ Audio features API error:", audioFeaturesResponse.status, errorText)
                } else {
                  const audioFeaturesResult = await audioFeaturesResponse.json()
                  console.log("✅ Audio features data:", audioFeaturesResult)

                  if (audioFeaturesResult?.audio_features) {
                    const features = audioFeaturesResult.audio_features.filter((f: any) => f !== null)
                    if (features.length > 0) {
                      const avgDanceability =
                        features.reduce((sum: number, f: { danceability: number }) => sum + f.danceability, 0) /
                        features.length
                      const avgEnergy =
                        features.reduce((sum: number, f: { energy: number }) => sum + f.energy, 0) / features.length
                      const avgValence =
                        features.reduce((sum: number, f: { valence: number }) => sum + f.valence, 0) / features.length

                      data.audioSummary = {
                        danceability: Math.round(avgDanceability * 100),
                        energy: Math.round(avgEnergy * 100),
                        valence: Math.round(avgValence * 100),
                      }
                      console.log("🎵 Audio summary:", data.audioSummary)
                    }
                  }
                }
              } catch (error) {
                console.error("❌ Audio features fetch error:", error)
              }
            } else {
              console.log("⚠️ No top tracks found")
            }
          }
        } catch (error) {
          console.error("❌ Top tracks fetch error:", error)
        }

        console.log("🎉 Final profile data:", data)
        setProfileData(data)
      } catch (error) {
        console.error("❌ Error fetching Spotify data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSpotifyData()
  }, [session, status])

  // Helper function to format duration from milliseconds to mm:ss
  function formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
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
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please Log In</h1>
          <p className="mb-6">You need to be logged in to view your Spotify profile.</p>
          <button
            className="bg-green-500 text-black font-semibold py-3 px-8 rounded-full transition-all hover:scale-105"
            onClick={() => (window.location.href = "/api/auth/signin")}
          >
            Sign In with Spotify
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans">
      <Head>
        <title>Your Profile | SPOTIFY MAX</title>
        <meta name="description" content="Your personalized music profile on SPOTIFY MAX" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Gradient Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 opacity-10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 opacity-10 blur-3xl rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 md:p-6 flex items-center justify-between">
        <button className="flex items-center text-gray-400 hover:text-white transition">
          <ArrowLeft size={20} className="mr-2" />
          <span>Back</span>
        </button>
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition">
            <Settings size={20} />
          </button>
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition" onClick={() => signOut()}>
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Profile Section */}
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
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6">
                {profileData?.topGenres.map((genre, index) => (
                  <span key={index} className="px-3 py-1 rounded-full text-sm bg-white/5 border border-white/10">
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

      {/* Tabs */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar">
            <button
              className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === "overview" ? "text-green-500 border-b-2 border-green-500" : "text-gray-400 hover:text-white"}`}
              onClick={() => setActiveTab("overview")}
            >
              <Music size={18} className="inline mr-2" />
              Overview
            </button>
            <button
              className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === "stats" ? "text-green-500 border-b-2 border-green-500" : "text-gray-400 hover:text-white"}`}
              onClick={() => setActiveTab("stats")}
            >
              <BarChart2 size={18} className="inline mr-2" />
              Stats
            </button>
            <button
              className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === "artists" ? "text-green-500 border-b-2 border-green-500" : "text-gray-400 hover:text-white"}`}
              onClick={() => setActiveTab("artists")}
            >
              <Heart size={18} className="inline mr-2" />
              Top Artists
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 py-10">
        <div className="max-w-4xl mx-auto px-4">
          {/* Overview */}
          {activeTab === "overview" && (
            <div>
              {/* Currently Playing */}
              {profileData?.currentlyPlaying && (
                <section className="mb-16">
                  <h2 className="text-2xl font-bold mb-6">Currently Playing</h2>
                  <div className="flex items-center bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-4">
                    <Image
                      src={profileData.currentlyPlaying.image || "/placeholder.svg"}
                      alt={profileData.currentlyPlaying.name}
                      width={64}
                      height={64}
                      className="rounded mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{profileData.currentlyPlaying.name}</h3>
                      <p className="text-gray-400 text-sm">{profileData.currentlyPlaying.artist}</p>
                      <p className="text-gray-400 text-sm">{profileData.currentlyPlaying.duration}</p>
                    </div>
                  </div>
                </section>
              )}

              {/* Recently Played */}
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
                        <tr key={track.id} className="hover:bg-white/5 cursor-pointer transition">
                          <td className="py-3 px-6">{index + 1}</td>
                          <td className="py-3">
                            <div className="flex items-center">
                              <div className="relative w-10 h-10 rounded overflow-hidden mr-4">
                                <Image
                                  src={track.image || "/placeholder.svg"}
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
                      {Math.floor((profileData?.listeningStats?.minutesListened ?? 0) / 60)}h{" "}
                      {(profileData?.listeningStats?.minutesListened ?? 0) % 60}m
                    </div>
                    <div className="text-gray-400 text-sm">Time spent listening</div>
                  </div>

                  <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tighter mb-2">
                      {profileData?.listeningStats.topGenre || "N/A"}
                    </div>
                    <div className="text-gray-400 text-sm">Most played genre</div>
                  </div>

                  <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tighter mb-2">
                      {profileData?.listeningStats.uniqueArtists}
                    </div>
                    <div className="text-gray-400 text-sm">Unique artists played</div>
                  </div>

                  <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tighter mb-2">
                      {profileData?.listeningStats.uniqueTracks}
                    </div>
                    <div className="text-gray-400 text-sm">Unique tracks played</div>
                  </div>
                </div>
              </section>

              {/* Recommendations */}
              {profileData?.recommendations && profileData.recommendations.length > 0 && (
                <section className="mt-16">
                  <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profileData.recommendations.map((track) => (
                      <div
                        key={track.id}
                        className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition"
                      >
                        <div className="relative w-full h-48">
                          <Image
                            src={track.image || "/placeholder.svg"}
                            alt={track.name}
                            width={400}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          <div className="absolute bottom-0 left-0 p-4">
                            <h3 className="text-lg font-bold">{track.name}</h3>
                            <p className="text-gray-400 text-sm">{track.artist}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* Stats */}
          {activeTab === "stats" && (
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
                      <div className="text-2xl font-bold mb-1">Discovery Rate</div>
                      <div className="text-gray-400">15 new artists/month</div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="mt-10">
                <h2 className="text-2xl font-bold mb-6">Audio Feature Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/5 rounded-xl p-6">
                    <div className="text-3xl font-bold text-green-400">{profileData?.audioSummary?.danceability}</div>
                    <div className="text-gray-400 text-sm mt-2">Danceability</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6">
                    <div className="text-3xl font-bold text-yellow-400">{profileData?.audioSummary?.energy}</div>
                    <div className="text-gray-400 text-sm mt-2">Energy</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6">
                    <div className="text-3xl font-bold text-purple-400">{profileData?.audioSummary?.valence}</div>
                    <div className="text-gray-400 text-sm mt-2">Positivity (Valence)</div>
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
                    {profileData?.genreDistribution?.slice(0, 5).map((item, index) => {
                      const colors = [
                        "bg-green-500/20 border-green-500/30",
                        "bg-blue-500/20 border-blue-500/30",
                        "bg-purple-500/20 border-purple-500/30",
                        "bg-red-500/20 border-red-500/30",
                        "bg-yellow-500/20 border-yellow-500/30",
                      ]
                      const color = colors[index % colors.length]

                      return (
                        <div key={index} className={`${color} px-4 py-2 rounded-full border`}>
                          <span className="font-medium">{item.genre}</span>{" "}
                          <span className="text-gray-400">{item.percentage}%</span>
                        </div>
                      )
                    }) ||
                      profileData?.topGenres.map((genre, index) => {
                        const colors = [
                          "bg-green-500/20 border-green-500/30",
                          "bg-blue-500/20 border-blue-500/30",
                          "bg-purple-500/20 border-purple-500/30",
                          "bg-red-500/20 border-red-500/30",
                          "bg-yellow-500/20 border-yellow-500/30",
                        ]
                        const color = colors[index % colors.length]
                        const percentage = Math.round(100 / (index + 2))

                        return (
                          <div key={index} className={`${color} px-4 py-2 rounded-full border`}>
                            <span className="font-medium">{genre}</span>{" "}
                            <span className="text-gray-400">{percentage}%</span>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Top Artists */}
          {activeTab === "artists" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Top Artists</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {profileData?.topArtists.map((artist) => (
                  <div
                    key={artist.id}
                    className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition cursor-pointer group"
                  >
                    <div className="relative w-full h-48">
                      <Image
                        src={artist.image || "/placeholder.svg"}
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
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-green-400"
                            style={{ width: `${Math.random() * 40 + 60}%` }}
                          ></div>
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
          <p className="text-gray-600 text-sm">SPOTIFY MAX - Personal Project | Not affiliated with Spotify</p>
        </div>
      </footer>
    </div>
  )
}
