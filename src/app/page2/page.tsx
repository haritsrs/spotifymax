"use client";

import React, { useState, useEffect } from 'react';
import { Play, Music, Heart, TrendingUp, Clock, Users, Headphones, Calendar } from 'lucide-react';

const MonthlyRecap = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    minutes: 0,
    songs: 0,
    artists: 0,
    genres: 0
  });

  // Sample data - in real app this would come from Spotify API
  const recapData = {
    month: "November 2024",
    totalMinutes: 2847,
    totalSongs: 456,
    totalArtists: 89,
    totalGenres: 12,
    topArtist: "Arctic Monkeys",
    topSong: "Do I Wanna Know?",
    topGenre: "Indie Rock",
    discoveredSongs: 34,
    repeatSongs: 67,
    moodBreakdown: {
      energetic: 35,
      chill: 28,
      melancholic: 22,
      upbeat: 15
    },
    listeningTimes: {
      morning: 15,
      afternoon: 25,
      evening: 35,
      night: 25
    }
  };

  const slides = [
    {
      title: "Your November Recap",
      subtitle: "Let's dive into your musical journey",
      gradient: "from-purple-600 via-pink-600 to-blue-600"
    },
    {
      title: "You listened to music for",
      stat: `${recapData.totalMinutes.toLocaleString()}`,
      subtitle: "minutes this month",
      detail: "That's 47+ hours of pure musical bliss!",
      gradient: "from-green-500 via-teal-500 to-blue-500"
    },
    {
      title: "You discovered",
      stat: `${recapData.totalSongs}`,
      subtitle: "songs",
      detail: `Across ${recapData.totalArtists} different artists`,
      gradient: "from-orange-500 via-red-500 to-pink-500"
    },
    {
      title: "Your top artist was",
      stat: recapData.topArtist,
      subtitle: "They dominated your playlists",
      detail: "You couldn't get enough of their sound",
      gradient: "from-indigo-600 via-purple-600 to-pink-600"
    },
    {
      title: "Your anthem this month",
      stat: recapData.topSong,
      subtitle: "by Arctic Monkeys",
      detail: "Played 23 times - clearly a favorite!",
      gradient: "from-yellow-500 via-orange-500 to-red-500"
    },
    {
      title: "Genre Explorer",
      stat: `${recapData.totalGenres}`,
      subtitle: "different genres",
      detail: `${recapData.topGenre} was your go-to vibe`,
      gradient: "from-cyan-500 via-blue-500 to-indigo-500"
    },
    {
      title: "Discovery Mode",
      stat: `${recapData.discoveredSongs}`,
      subtitle: "new songs added",
      detail: "You're always finding fresh beats!",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500"
    },
    {
      title: "Your Musical Personality",
      gradient: "from-rose-500 via-pink-500 to-purple-500"
    }
  ];

  // Animate stats when component mounts
  useEffect(() => {
    const animateValue = (start: number, end: number, duration: number, key: string) => {
      const startTimestamp = Date.now();
      const step = () => {
        const now = Date.now();
        const progress = Math.min((now - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        setAnimatedStats(prev => ({ ...prev, [key]: current }));
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    };

    if (currentSlide === 1) {
      animateValue(0, recapData.totalMinutes, 2000, 'minutes');
    } else if (currentSlide === 2) {
      animateValue(0, recapData.totalSongs, 1500, 'songs');
    } else if (currentSlide === 5) {
      animateValue(0, recapData.totalGenres, 1000, 'genres');
    } else if (currentSlide === 6) {
      animateValue(0, recapData.discoveredSongs, 1200, 'artists');
    }
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  interface MoodBreakdown {
    energetic: number;
    chill: number;
    melancholic: number;
    upbeat: number;
  }

  interface ListeningTimes {
    morning: number;
    afternoon: number;
    evening: number;
    night: number;
  }

  interface RecapData {
    month: string;
    totalMinutes: number;
    totalSongs: number;
    totalArtists: number;
    totalGenres: number;
    topArtist: string;
    topSong: string;
    topGenre: string;
    discoveredSongs: number;
    repeatSongs: number;
    moodBreakdown: MoodBreakdown;
    listeningTimes: ListeningTimes;
  }

  interface Slide {
    title: string;
    subtitle?: string;
    stat?: string;
    detail?: string;
    gradient: string;
  }

  interface AnimatedStats {
    minutes: number;
    songs: number;
    artists: number;
    genres: number;
  }

  const renderSlide = (slide: Slide, index: number): React.ReactNode => {
    if (index === 7) {
      // Musical Personality slide
      return (
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Your Musical Personality
          </h2>
          <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6">
              <div className="text-3xl mb-2">🎵</div>
              <div className="text-lg font-semibold mb-1">Explorer</div>
              <div className="text-sm text-gray-300">Always seeking new sounds</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-lg font-semibold mb-1">Trendsetter</div>
              <div className="text-sm text-gray-300">First to find the hits</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6">
              <div className="text-3xl mb-2">💫</div>
              <div className="text-lg font-semibold mb-1">Night Owl</div>
              <div className="text-sm text-gray-300">Peak listening after dark</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6">
              <div className="text-3xl mb-2">🎸</div>
              <div className="text-lg font-semibold mb-1">Rock Soul</div>
              <div className="text-sm text-gray-300">Indie rock is your essence</div>
            </div>
          </div>
          <div className="mt-12">
            <div className="text-lg text-gray-300 mb-4">Most active listening time</div>
            <div className="flex justify-center space-x-4">
              {Object.entries(recapData.listeningTimes).map(([time, percentage]) => (
                <div key={time} className="text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${slide.gradient} flex items-center justify-center mb-2`}>
                    <span className="text-white font-bold">{percentage}%</span>
                  </div>
                  <div className="text-sm capitalize text-gray-400">{time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          {slide.title}
        </h2>
        
        {slide.stat && (
          <div className="space-y-4">
            <div className={`text-6xl md:text-8xl font-black bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent animate-pulse`}>
              {index === 1 ? animatedStats.minutes.toLocaleString() : 
               index === 2 ? animatedStats.songs.toLocaleString() :
               index === 5 ? animatedStats.genres :
               index === 6 ? animatedStats.artists :
               slide.stat}
            </div>
            <div className="text-2xl md:text-3xl text-gray-300 font-semibold">
              {slide.subtitle}
            </div>
            {slide.detail && (
              <div className="text-lg text-gray-400 mt-4">
                {slide.detail}
              </div>
            )}
          </div>
        )}

        {index === 0 && (
          <div className="space-y-6">
            <div className="text-2xl text-gray-300">
              {recapData.month}
            </div>
            <div className="flex justify-center space-x-8 text-center">
              <div className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-4">
                <Music className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-sm text-gray-400">Songs</div>
                <div className="text-xl font-bold">{recapData.totalSongs}</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-4">
                <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div className="text-sm text-gray-400">Artists</div>
                <div className="text-xl font-bold">{recapData.totalArtists}</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-4">
                <Clock className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <div className="text-sm text-gray-400">Hours</div>
                <div className="text-xl font-bold">{Math.floor(recapData.totalMinutes / 60)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-sans">
      {/* Background gradient that changes with slides */}
      <div className={`fixed inset-0 bg-gradient-to-br ${slides[currentSlide]?.gradient} opacity-20 transition-all duration-1000`}>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute w-96 h-96 rounded-full bg-gradient-to-r ${slides[currentSlide]?.gradient} filter blur-[120px] opacity-30 animate-pulse`} 
             style={{
               top: '10%',
               left: '10%',
               animationDelay: '0s',
               animationDuration: '4s'
             }}></div>
        <div className={`absolute w-64 h-64 rounded-full bg-gradient-to-r ${slides[currentSlide]?.gradient} filter blur-[80px] opacity-20 animate-pulse`}
             style={{
               bottom: '20%',
               right: '15%',
               animationDelay: '2s',
               animationDuration: '6s'
             }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Slide content */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto w-full">
            {slides[currentSlide] && renderSlide(slides[currentSlide], currentSlide)}
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6 flex justify-between items-center">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="bg-white/10 backdrop-blur border border-white/20 text-white px-6 py-3 rounded-full transition-all hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {/* Progress dots */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? `bg-gradient-to-r ${slides[currentSlide]?.gradient}` 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="bg-white/10 backdrop-blur border border-white/20 text-white px-6 py-3 rounded-full transition-all hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {currentSlide === slides.length - 1 ? 'Done' : 'Next'}
          </button>
        </div>
      </div>

      {/* Share button for final slide */}
      {currentSlide === slides.length - 1 && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2">
          <button className="bg-gradient-to-r from-green-500 to-green-400 text-black font-semibold px-8 py-4 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/30">
            Share Your Recap
          </button>
        </div>
      )}
    </div>
  );
};

export default MonthlyRecap;