import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { authAPI } from '../services/api';
import { SongRow } from '../components/ui/SongCard';
import { SkeletonRow } from '../components/ui/Skeleton';
import { usePlayer } from '../context/PlayerContext';
import { HiHeart, HiPlay } from 'react-icons/hi';

export default function LikedSongs() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playSong } = usePlayer();

  useEffect(() => {
    authAPI.getProfile()
      .then(({ data }) => setSongs((data.user.likedSongs || []).filter(s => s?.audioUrl)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden p-8 mb-8"
        style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.3), rgba(168,85,247,0.2), rgba(10,10,20,0))' }}>
        <div className="flex items-end gap-6">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
            <HiHeart className="text-white text-4xl fill-current" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Playlist</p>
            <h1 className="text-4xl font-black text-white">Liked Songs</h1>
            <p className="text-gray-400 text-sm mt-1">{songs.length} songs</p>
          </div>
        </div>
        {songs.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => playSong(songs[0], songs, 0)}
            className="mt-5 gradient-bg text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow-xl w-fit"
          >
            <HiPlay /> Play all
          </motion.button>
        )}
      </div>

      {/* Songs list */}
      {loading
        ? <div className="space-y-3">{Array.from({length:5}).map((_,i) => <SkeletonRow key={i} />)}</div>
        : songs.length === 0
          ? <div className="text-center py-20 glass rounded-2xl">
              <HiHeart className="text-5xl text-gray-700 mx-auto mb-3" />
              <p className="text-lg text-white font-semibold">No liked songs yet</p>
              <p className="text-gray-500 text-sm mt-1">Songs you like will appear here</p>
            </div>
          : <div className="space-y-1">
              {songs.map((song, i) => (
                <SongRow key={song._id} song={song} index={i} queue={songs} />
              ))}
            </div>}
    </div>
  );
}
