import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { songsAPI, artistsAPI, playlistsAPI } from '../services/api';
import { SongCard } from '../components/ui/SongCard';
import { ArtistCard } from '../components/ui/ArtistCard';
import { PlaylistCard } from '../components/ui/PlaylistCard';
import { SkeletonCard } from '../components/ui/Skeleton';
import { HiSearch, HiX } from 'react-icons/hi';

const TABS = ['All', 'Songs', 'Artists', 'Playlists'];

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('All');
  const [results, setResults] = useState({ songs: [], artists: [], playlists: [] });
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 350);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (!debouncedQuery.trim()) { setResults({ songs: [], artists: [], playlists: [] }); return; }
    setLoading(true);
    Promise.all([
      songsAPI.search(debouncedQuery),
      artistsAPI.search(debouncedQuery),
      playlistsAPI.getPublic(),
    ]).then(([s, a, p]) => {
      const pFiltered = (p.data.playlists || []).filter(pl =>
        pl.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setResults({ songs: s.data.songs || [], artists: a.data.artists || [], playlists: pFiltered });
    }).catch(() => {}).finally(() => setLoading(false));
  }, [debouncedQuery]);

  const showSongs = tab === 'All' || tab === 'Songs';
  const showArtists = tab === 'All' || tab === 'Artists';
  const showPlaylists = tab === 'All' || tab === 'Playlists';
  const hasResults = results.songs.length || results.artists.length || results.playlists.length;

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-black text-white mb-6">Search</h1>

      {/* Search bar */}
      <div className="relative mb-6">
        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search songs, artists, playlists..."
          className="w-full max-w-2xl bg-white/6 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 transition-all text-base"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
          >
            <HiX />
          </button>
        )}
      </div>

      {/* Filter tabs */}
      {query && (
        <div className="flex gap-2 mb-6">
          {TABS.map(t => (
            <motion.button
              key={t}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${tab === t ? 'gradient-bg text-white shadow-lg' : 'glass text-gray-400 hover:text-white'}`}
            >
              {t}
            </motion.button>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* No results / empty state */}
      {!loading && query && !hasResults && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">🎵</div>
          <p className="text-white font-semibold text-xl mb-2">No results found</p>
          <p className="text-gray-500 text-sm">Try a different search term</p>
        </motion.div>
      )}

      {/* No query state */}
      {!query && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-white font-semibold text-xl mb-2">Search for anything</p>
          <p className="text-gray-500 text-sm">Find your favorite songs, artists, and playlists</p>
        </motion.div>
      )}

      {/* Results */}
      {!loading && hasResults && (
        <div className="space-y-10">
          {showSongs && results.songs.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-4">Songs ({results.songs.length})</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {results.songs.map((song, i) => (
                  <SongCard key={song._id} song={song} queue={results.songs} queueIndex={i} />
                ))}
              </div>
            </div>
          )}
          {showArtists && results.artists.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-4">Artists ({results.artists.length})</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {results.artists.map(a => <ArtistCard key={a._id} artist={a} />)}
              </div>
            </div>
          )}
          {showPlaylists && results.playlists.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-4">Playlists ({results.playlists.length})</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {results.playlists.map(pl => <PlaylistCard key={pl._id} playlist={pl} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
