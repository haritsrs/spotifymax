"use client";

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Music, Users, Clock, Calendar, Headphones, Star, Activity } from 'lucide-react';

const AnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Sample data for charts
  const listeningData = [
    { month: 'Jan', hours: 45, songs: 1250 },
    { month: 'Feb', hours: 52, songs: 1400 },
    { month: 'Mar', hours: 38, songs: 1100 },
    { month: 'Apr', hours: 67, songs: 1800 },
    { month: 'May', hours: 71, songs: 1950 },
    { month: 'Jun', hours: 58, songs: 1600 }
  ];

  const genreData = [
    { name: 'Electronic', value: 28, color: '#10B981' },
    { name: 'Pop', value: 22, color: '#8B5CF6' },
    { name: 'Hip-Hop', value: 18, color: '#F59E0B' },
    { name: 'Rock', value: 15, color: '#EF4444' },
    { name: 'Indie', value: 10, color: '#3B82F6' },
    { name: 'Other', value: 7, color: '#6B7280' }
  ];

  const moodData = [
    { mood: 'Energetic', value: 85 },
    { mood: 'Chill', value: 70 },
    { mood: 'Focus', value: 60 },
    { mood: 'Happy', value: 90 },
    { mood: 'Nostalgic', value: 45 },
    { mood: 'Intense', value: 75 }
  ];

  const topArtists = [
    { name: 'Flume', plays: 324, change: '+12%' },
    { name: 'Disclosure', plays: 298, change: '+8%' },
    { name: 'ODESZA', plays: 276, change: '-3%' },
    { name: 'Kaytranada', plays: 245, change: '+15%' },
    { name: 'FKA twigs', plays: 198, change: '+22%' }
  ];

  const topTracks = [
    { title: 'Never Be Like You', artist: 'Flume', plays: 87 },
    { title: 'Latch', artist: 'Disclosure', plays: 73 },
    { title: 'Say My Name', artist: 'ODESZA', plays: 68 },
    { title: '10% Free', artist: 'Kaytranada', plays: 61 },
    { title: 'Two Weeks', artist: 'FKA twigs', plays: 54 }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Advanced Playlist Intelligence
              </h1>
              <p className="text-gray-400 mt-2">Deep insights into your music library and listening patterns</p>
            </div>
            <div className="flex space-x-3">
              {['week', 'month', 'year', 'all'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedPeriod === period
                      ? 'bg-green-500 text-black'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <Headphones className="w-8 h-8 text-green-500" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold mb-1">1,847</div>
            <div className="text-gray-400 text-sm">Total Songs Played</div>
            <div className="text-green-500 text-sm mt-2">+12% from last month</div>
          </div>

          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-purple-500" />
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl font-bold mb-1">67.2h</div>
            <div className="text-gray-400 text-sm">Listening Hours</div>
            <div className="text-purple-500 text-sm mt-2">+8% from last month</div>
          </div>

          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-500" />
              <Star className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold mb-1">142</div>
            <div className="text-gray-400 text-sm">Unique Artists</div>
            <div className="text-blue-500 text-sm mt-2">+5 new discoveries</div>
          </div>

          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-orange-500" />
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-3xl font-bold mb-1">8.7</div>
            <div className="text-gray-400 text-sm">Avg. Discovery Score</div>
            <div className="text-orange-500 text-sm mt-2">Above average</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Listening Trends */}
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
              Listening Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={listeningData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
                <Line type="monotone" dataKey="hours" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Genre Distribution */}
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Music className="w-5 h-5 mr-2 text-purple-500" />
              Genre Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  stroke="none"
                >
                  {genreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {genreData.map((genre, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: genre.color }}></div>
                  <span className="text-sm text-gray-400">{genre.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mood Analysis & Top Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Mood Analysis */}
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              Mood Analysis
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={moodData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="mood" className="text-xs" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <PolarRadiusAxis stroke="#374151" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                <Radar name="Mood" dataKey="value" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Artists */}
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-500" />
              Top Artists
            </h3>
            <div className="space-y-4">
              {topArtists.map((artist, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{artist.name}</div>
                      <div className="text-sm text-gray-400">{artist.plays} plays</div>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${artist.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {artist.change}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Tracks */}
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Music className="w-5 h-5 mr-2 text-green-500" />
              Top Tracks
            </h3>
            <div className="space-y-4">
              {topTracks.map((track, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-800 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{track.title}</div>
                    <div className="text-xs text-gray-400">{track.artist}</div>
                  </div>
                  <div className="text-sm text-gray-400">{track.plays}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Pattern */}
        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
            Weekly Listening Pattern
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { day: 'Mon', hours: 8.2 },
              { day: 'Tue', hours: 6.8 },
              { day: 'Wed', hours: 7.5 },
              { day: 'Thu', hours: 9.1 },
              { day: 'Fri', hours: 11.3 },
              { day: 'Sat', hours: 13.7 },
              { day: 'Sun', hours: 10.4 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: 'white'
                }} 
              />
              <Bar dataKey="hours" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button className="bg-gradient-to-r from-green-500 to-green-400 text-black font-semibold py-3 px-8 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/30">
            Export Report
          </button>
          <button className="bg-white/5 text-white border border-white/10 font-medium py-3 px-8 rounded-full transition-all hover:bg-white/10">
            Share Insights
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;