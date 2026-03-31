import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { songsAPI, artistsAPI, playlistsAPI } from '../services/api';
import { SongCard } from '../components/ui/SongCard';
import { ArtistCard } from '../components/ui/ArtistCard';
import { PlaylistCard } from '../components/ui/PlaylistCard';
import { SkeletonCard, SkeletonArtist } from '../components/ui/Skeleton';
import { useAuth } from '../context/AuthContext';
import { usePlayer } from '../context/PlayerContext';
import { HiHeart, HiPlay, HiSearch, HiSparkles } from 'react-icons/hi';

function Section({ title, children, loading, count = 5 }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">{title}</h2>
      {loading
        ? <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        : children}
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  const { playSong } = usePlayer();
  const [songs, setSongs] = useState([]);
  const [trending, setTrending] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [trendRes, artistRes, playlistRes, allSongsRes] = await Promise.all([
          songsAPI.getTrending(),
          artistsAPI.getAll(),
          playlistsAPI.getPublic(),
          songsAPI.getAll(1, 4)
        ]);
        setTrending(trendRes.data.songs || []);
        setArtists(artistRes.data.artists || []);
        setPlaylists(playlistRes.data.playlists || []);
        setSongs(allSongsRes.data.songs || []);
      } catch {}
      setLoading(false);
    })();
  }, [user]);

  const heroSong = trending[0] || songs[0];

  return (
    <div className="p-10">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-8 uppercase text-[10px] font-bold tracking-[0.2em]">
            <button className="text-primary border-b-2 border-primary pb-1">Music</button>
            <button className="text-gray-500 hover:text-white transition-colors">Podcast</button>
            <button className="text-gray-500 hover:text-white transition-colors">Live</button>
        </div>
        
        <div className="relative w-80">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
                type="text" 
                placeholder="Type here to search" 
                className="w-full bg-[#121214] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 transition-colors"
            />
        </div>

        <div className="flex items-center gap-6">
            <button className="text-gray-500 hover:text-white relative">
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                <HiSparkles className="text-xl" />
            </button>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex items-center gap-3 bg-[#121214] rounded-xl p-1 pr-4 border border-white/5">
                <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username}&background=4d7cfe&color=fff`} className="w-8 h-8 rounded-lg object-cover" />
                <span className="text-xs font-bold text-white">{user?.username || 'Dave Cooper'}</span>
            </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-[40px] overflow-hidden bg-black mb-12 group h-[400px]">
        {heroSong && (
          <img 
            src={heroSong.coverImage} 
            className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        
        <div className="relative h-full flex flex-col justify-center px-12">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-8">Trending New Hits</p>
            <h1 className="text-7xl font-black text-white mb-2 tracking-tight">
                {heroSong?.title || 'In My Feelings'}
            </h1>
            <div className="flex items-center gap-4 text-gray-400 mb-10 font-medium">
                <span>{heroSong?.artist?.name || 'Camila Cabello'}</span>
                <div className="w-1 h-1 bg-gray-600 rounded-full" />
                <span>63Million Plays</span>
            </div>
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => heroSong && playSong(heroSong, trending, 0)}
                    className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl shadow-primary/20"
                >
                    Listen Now
                </button>
                <button className="w-14 h-14 rounded-2xl border-2 border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors">
                    <HiHeart className="text-xl" />
                </button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10">
          {/* Top Artists */}
          <div className="col-span-12">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-white">Top Artists</h2>
                <button className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-white">See all</button>
            </div>
            <div className="flex items-center gap-8 overflow-x-auto pb-4 custom-scrollbar">
                {artists.slice(0, 6).map(artist => (
                    <ArtistCard key={artist._id} artist={artist} />
                ))}
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="col-span-4">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-white">Genres</h2>
                <button className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-white">See all</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {[
                    { name: 'Dance Beat', color: '#31557a' },
                    { name: 'Electro Pop', color: '#7a7261' },
                    { name: 'Alternative Indie', color: '#7a4a31' },
                    { name: 'Hip Hop', color: '#317a63' },
                    { name: 'Classical Period', color: '#7a3155' },
                    { name: 'Hip Hop Rap', color: '#4a317a' },
                ].map(genre => (
                    <div key={genre.name} className="aspect-[4/3] rounded-2xl p-4 flex items-center justify-center text-center leading-tight shadow-lg" style={{ backgroundColor: genre.color }}>
                        <span className="text-sm font-bold text-white">{genre.name}</span>
                    </div>
                ))}
            </div>
          </div>

          <div className="col-span-8">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-white">Top Charts</h2>
                <button className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-white">See all</button>
            </div>
            <div className="space-y-4">
                {trending.slice(1, 5).map((song, i) => (
                    <div key={song._id} className="flex items-center gap-4 bg-[#121214] p-3 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group">
                        <span className="w-6 text-[10px] font-bold text-gray-600 text-center">{String(i + 1).padStart(2, '0')}</span>
                        <img src={song.coverImage} className="w-12 h-12 rounded-xl object-cover shadow-lg" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">{song.title}</p>
                            <p className="text-[10px] font-medium text-gray-500 truncate">{song.artist?.name}</p>
                        </div>
                        <span className="text-[10px] font-bold text-gray-500">{formatTime(song.duration)}</span>
                        <button 
                            onClick={() => playSong(song, trending, i + 1)}
                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary"
                        >
                            <HiPlay />
                        </button>
                        <button className="text-gray-500 hover:text-white transition-colors">
                            <HiPlus className="text-sm" />
                        </button>
                    </div>
                ))}
            </div>
          </div>
      </div>
    </div>
  );
}
