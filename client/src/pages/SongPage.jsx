import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { songsAPI } from '../services/api';
import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { SkeletonBanner } from '../components/ui/Skeleton';
import { HiPlay, HiPause, HiHeart, HiMusicNote } from 'react-icons/hi';

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00';
  return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
}

export default function SongPage() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { playSong, currentSong, isPlaying, togglePlay } = usePlayer();
  const { user } = useAuth();
  const { toast } = useToast();
  const isCurrentSong = currentSong?._id === id;

  useEffect(() => {
    songsAPI.getById(id)
      .then(({ data }) => {
        setSong(data.song);
        setLiked(user?.likedSongs?.includes(data.song._id));
      })
      .catch(() => toast.error('Failed to load song'))
      .finally(() => setLoading(false));
  }, [id]);

  const handlePlay = () => {
    if (isCurrentSong) togglePlay();
    else if (song) playSong(song, [song], 0);
  };

  const handleLike = async () => {
    if (!user) { toast.info('Login to like songs'); return; }
    try {
      await songsAPI.like(song._id);
      setLiked(!liked);
      toast.success(liked ? 'Removed from liked songs' : 'Added to liked songs ❤️');
    } catch { toast.error('Failed to update like'); }
  };

  if (loading) return (
    <div className="p-6 space-y-6">
      <SkeletonBanner />
      <div className="space-y-3">{Array.from({length:4}).map((_,i) => <div key={i} className="skeleton h-4 rounded w-2/3" />)}</div>
    </div>
  );

  if (!song) return (
    <div className="p-6 text-center py-20">
      <p className="text-2xl mb-2">🎵</p>
      <p className="text-gray-400">Song not found</p>
    </div>
  );

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center md:items-end gap-8 mb-10"
      >
        <div className="relative flex-shrink-0">
          <motion.img
            src={song.coverImage}
            alt={song.title}
            className="w-56 h-56 rounded-3xl object-cover shadow-2xl shadow-purple-500/20"
            animate={isCurrentSong && isPlaying ? { rotate: [0, 360] } : {}}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
          {isCurrentSong && isPlaying && (
            <div className="absolute -inset-2 rounded-3xl border-2 border-purple-500/40 animate-pulse" />
          )}
        </div>

        <div className="flex-1 text-center md:text-left">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-medium">Single</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">{song.title}</h1>
          <Link to={`/artist/${song.artist?._id}`}
            className="text-lg text-gray-400 hover:text-purple-400 transition-colors font-medium">
            {song.artist?.name || 'Unknown Artist'}
          </Link>
          <div className="flex items-center gap-3 text-sm text-gray-600 mt-2 justify-center md:justify-start">
            {song.album !== 'Single' && <span>{song.album}</span>}
            <span>·</span>
            <span>{formatTime(song.duration)}</span>
            <span>·</span>
            <span>{(song.plays || 0).toLocaleString()} plays</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-6 justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={handlePlay}
              className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center shadow-xl shadow-purple-500/30"
            >
              {isCurrentSong && isPlaying
                ? <HiPause className="text-white text-2xl" />
                : <HiPlay className="text-white text-2xl ml-0.5" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={handleLike}
              className={`w-11 h-11 rounded-full flex items-center justify-center text-2xl transition-all ${liked ? 'text-pink-500 bg-pink-500/15' : 'text-gray-600 bg-white/5 hover:text-pink-400 hover:bg-pink-500/10'}`}
            >
              <HiHeart className={liked ? 'fill-current' : ''} />
            </motion.button>
            {song.genre && (
              <span className="px-3 py-1.5 text-xs rounded-full glass text-purple-400 border border-purple-500/20">
                {song.genre}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Lyrics */}
      {song.lyrics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-8"
        >
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <HiMusicNote className="text-purple-400" /> Lyrics
          </h2>
          <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">{song.lyrics}</pre>
        </motion.div>
      )}
    </div>
  );
}
