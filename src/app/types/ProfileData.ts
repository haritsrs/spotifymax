export interface ProfileData {
  name: string
  image: string
  followers: number
  following: number
  topGenres: string[]
  recentlyPlayed: {
    id: string
    name: string
    artist: string
    image: string
    duration: string
  }[]
  topArtists: {
    id: string
    name: string
    image: string
    genre: string
  }[]
  listeningStats: {
    minutesListened: number
    topGenre: string
    uniqueArtists: number
    uniqueTracks: number
  }
  genreDistribution?: {
    genre: string
    percentage: number
  }[]
  currentlyPlaying?: {
    name: string
    artist: string
    image: string
    duration: string
  }
  audioSummary?: {
    danceability: number
    energy: number
    valence: number
  }
  recommendations?: {
    id: string
    name: string
    artist: string
    image: string
  }[]
}
