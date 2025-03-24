// app/page.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function MusicCompatibility() {
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <header className="fixed w-full bg-black/80 backdrop-blur-xl z-50 py-5">
        <div className="container mx-auto px-6 lg:px-10 flex items-center justify-between">
          <div className="text-2xl font-semibold tracking-tight">
            Spotify <span className="bg-gradient-to-r from-[#1DB954] to-[#4eda8c] text-transparent bg-clip-text">Max</span>
          </div>
          <button 
            onClick={() => setShowAuthPopup(true)}
            className="bg-gradient-to-r from-[#1DB954] to-[#4eda8c] text-black font-semibold py-3 px-7 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#1DB954]/30"
          >
            Connect with Spotify
          </button>
        </div>
      </header>

      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,_#111111,_#000000_70%)]">
        <div className="absolute inset-0 opacity-20 blur-md scale-110 z-0">
          <Image 
            src="/api/placeholder/1400/800" 
            alt="Background" 
            layout="fill" 
            objectFit="cover" 
          />
        </div>
        <div className="container mx-auto px-6 lg:px-10 text-center z-10 pt-20 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
            Music Compatibility
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-10">
            Discover how your music taste connects with friends and find new shared favorites.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-10 flex flex-col items-center">
          <div className="flex flex-col md:flex-row justify-center gap-8 mb-12 w-full">
            <ProfileCard 
              name="Your Profile"
              topGenre="Indie Rock"
              favoriteArtist="Arctic Monkeys"
              moodProfile="Energetic"
            />
            
            <ProfileCard 
              name="Alex's Profile"
              topGenre="Alternative"
              favoriteArtist="Tame Impala"
              moodProfile="Chill"
            />
          </div>
          
          <div className="w-full max-w-3xl my-12">
            <div className="text-center mb-8">
              <div className="text-sm text-gray-400 mb-2">COMPATIBILITY SCORE</div>
              <div className="text-5xl font-bold bg-gradient-to-r from-[#1DB954] to-[#4eda8c] text-transparent bg-clip-text">
                87%
              </div>
            </div>
            <div className="h-10 bg-white/10 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-[#1DB954] to-[#4eda8c] rounded-full"
                style={{ width: '87%' }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
              <span>Perfect</span>
            </div>
          </div>
          
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
              Shared Favorites
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <MusicCard 
                title="Do I Wanna Know?"
                artist="Arctic Monkeys"
                match="95% match"
              />
              <MusicCard 
                title="The Less I Know The Better"
                artist="Tame Impala"
                match="92% match"
              />
              <MusicCard 
                title="Feels Like We Only Go Backwards"
                artist="Tame Impala"
                match="90% match"
              />
              <MusicCard 
                title="505"
                artist="Arctic Monkeys"
                match="89% match"
              />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
              Recommended for Both
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <MusicCard 
                title="New Person, Same Old Mistakes"
                artist="Tame Impala"
                match="94% prediction"
              />
              <MusicCard 
                title="When You Were Young"
                artist="The Killers"
                match="91% prediction"
              />
              <MusicCard 
                title="Instant Crush"
                artist="Daft Punk ft. Julian Casablancas"
                match="88% prediction"
              />
              <MusicCard 
                title="Last Nite"
                artist="The Strokes"
                match="87% prediction"
              />
            </div>
            
            <div className="flex justify-center">
              <button className="bg-gradient-to-r from-[#1DB954] to-[#4eda8c] text-black font-semibold py-4 px-10 rounded-full text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#1DB954]/30">
                Create Shared Playlist
              </button>
            </div>
          </div>
          
          <div className="w-full mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
              Compatibility Insights
            </h2>
            
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <InsightCard 
                icon="🎵"
                title="Genre Overlap"
                description="You both enjoy indie rock and alternative, with a shared appreciation for psychedelic elements in your music."
              />
              <InsightCard 
                icon="🔄"
                title="Listening Patterns"
                description="You both tend to listen to music most frequently in the evening, creating a perfect window for shared listening sessions."
              />
              <InsightCard 
                icon="⚡"
                title="Energy Profile"
                description="Your energetic style complements Alex's more laid-back approach, creating a balanced dynamic in shared playlists."
              />
            </div>
          </div>
        </div>
      </section>
      
      <footer className="py-20 bg-[#1D1D1F]">
        <div className="container mx-auto px-6 lg:px-10 text-center max-w-2xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-5">Ready to explore more music connections?</h3>
          <p className="text-gray-400 mb-10">Invite more friends to discover your musical compatibility and create shared experiences.</p>
          <button className="bg-white/5 border border-white/10 text-white font-medium py-3 px-8 rounded-full transition-all hover:bg-white/10">
            Invite Friends
          </button>
          <p className="text-gray-600 text-sm mt-20">Spotify Max/Super - Personal Project | Not affiliated with Spotify</p>
        </div>
      </footer>
      
      {showAuthPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowAuthPopup(false)}>
          <div className="bg-[#1D1D1F] rounded-xl p-8 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-4">Connect with Spotify</h3>
            <p className="text-gray-400 mb-6">Sign in with your Spotify account to compare music tastes with friends.</p>
            <button className="w-full bg-[#1DB954] text-black font-semibold py-3 px-8 rounded-full">
              Continue with Spotify
            </button>
            <button className="mt-4 text-gray-400 text-sm w-full text-center" onClick={() => setShowAuthPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

interface ProfileCardProps {
  name: string;
  topGenre: string;
  favoriteArtist: string;
  moodProfile: string;
}

function ProfileCard({ name, topGenre, favoriteArtist, moodProfile }: ProfileCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 w-full max-w-xs text-center transition-all hover:translate-y-2 hover:shadow-xl hover:shadow-black/30">
      <div className="w-24 h-24 rounded-full mx-auto mb-5 overflow-hidden border-2 border-[#1DB954]">
        <Image
          src="/api/placeholder/200/200"
          alt={name}
          width={96}
          height={96}
          className="object-cover w-full h-full"
        />
      </div>
      <h3 className="text-xl font-semibold mb-3">{name}</h3>
      <div className="text-gray-400">
        <div className="mb-3">
          <div className="text-sm">Top Genre</div>
          <div className="text-lg font-semibold text-white">{topGenre}</div>
        </div>
        <div className="mb-3">
          <div className="text-sm">Favorite Artist</div>
          <div className="text-lg font-semibold text-white">{favoriteArtist}</div>
        </div>
        <div>
          <div className="text-sm">Mood Profile</div>
          <div className="text-lg font-semibold text-white">{moodProfile}</div>
        </div>
      </div>
    </div>
  );
}

interface MusicCardProps {
  title: string;
  artist: string;
  match: string;
}

function MusicCard({ title, artist, match }: MusicCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden transition-all hover:translate-y-1 hover:shadow-xl hover:shadow-black/30">
      <div className="w-full h-44 overflow-hidden">
        <Image
          src="/api/placeholder/300/300"
          alt={title}
          width={300}
          height={300}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-5">
        <h4 className="text-lg font-semibold mb-1 truncate">{title}</h4>
        <div className="text-gray-400 text-sm mb-3 truncate">{artist}</div>
        <div className="text-sm text-[#1DB954]">{match}</div>
      </div>
    </div>
  );
}

interface InsightCardProps {
  icon: string;
  title: string;
  description: string;
}

function InsightCard({ icon, title, description }: InsightCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 w-full max-w-xs text-center">
      <div className="text-4xl mb-5 text-[#1DB954]">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}