import { motion } from 'framer-motion';
import { usePlayer } from '../../context/PlayerContext';
import { useAuth } from '../../context/AuthContext';
import { songsAPI } from '../../services/api';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { HiPlay, HiPause, HiHeart, HiDotsVertical } from 'react-icons/hi';

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00';
  return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
}

export function SongCard({ song, queue = [], queueIndex = 0, onLikeToggle }) {
  const { playSong, currentSong, isPlaying } = usePlayer();
  const { user } = useAuth();
  const isCurrentSong = currentSong?._id === song._id;
  const [liked, setLiked] = useState(user?.likedSongs?.includes(song._id));

  const handleLike = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      await songsAPI.like(song._id);
      setLiked(!liked);
      onLikeToggle?.(song._id);
    } catch {}
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer card-hover"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
      onClick={() => playSong(song, queue, queueIndex)}
    >
      <div className="relative">
        <img
          src={song.coverImage}
          alt={song.title}
          className="w-full aspect-square object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <motion.button
          initial={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
          className="absolute bottom-3 right-3 w-11 h-11 rounded-full gradient-bg flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"
          onClick={(e) => { e.stopPropagation(); playSong(song, queue, queueIndex); }}
        >
          {isCurrentSong && isPlaying
            ? <HiPause className="text-white text-xl" />
            : <HiPlay className="text-white text-xl ml-0.5" />}
        </motion.button>
        {isCurrentSong && isPlaying && (
          <div className="absolute top-2 right-2 flex gap-0.5 items-end h-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-0.5 rounded-full"
                style={{ background: 'linear-gradient(to top, #a855f7, #ec4899)' }}
                animate={{ scaleY: [0.3, 1, 0.3], transition: { duration: 0.8, delay: i * 0.1, repeat: Infinity } }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className={`text-sm font-medium truncate ${isCurrentSong ? 'gradient-text' : 'text-white'}`}>
              {song.title}
            </p>
            <Link
              to={`/artist/${song.artist?._id}`}
              className="text-xs text-gray-500 hover:text-purple-400 transition-colors truncate block"
              onClick={(e) => e.stopPropagation()}
            >
              {song.artist?.name || 'Unknown'}
            </Link>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={handleLike}
              className={`p-1.5 rounded-full transition-colors opacity-0 group-hover:opacity-100 ${liked ? 'text-pink-500' : 'text-gray-600 hover:text-pink-400'}`}
            >
              <HiHeart className={liked ? 'fill-current' : ''} />
            </button>
            <span className="text-xs text-gray-600">{formatTime(song.duration)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SongRow({ song, index, queue = [], showIndex = true, onLikeToggle, onRemove }) {
  const { playSong, currentSong, isPlaying } = usePlayer();
  const { user } = useAuth();
  const isCurrentSong = currentSong?._id === song._id;
  const [liked, setLiked] = useState(user?.likedSongs?.includes(song._id));

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!user) return;
    await songsAPI.like(song._id);
    setLiked(!liked);
    onLikeToggle?.(song._id);
  };

  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
      className={`flex items-center gap-4 px-4 py-2.5 rounded-xl cursor-pointer group transition-all ${isCurrentSong ? 'bg-purple-500/10' : ''}`}
      onClick={() => playSong(song, queue, index)}
    >
      <div className="w-8 text-center flex-shrink-0">
        {isCurrentSong && isPlaying
          ? <div className="flex gap-0.5 items-end h-4 justify-center">
              {[1,2,3].map(i => (
                <motion.div key={i} className="w-0.5 rounded-full"
                  style={{ background: 'linear-gradient(to top, #a855f7, #ec4899)' }}
                  animate={{ scaleY: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.8, delay: i*0.1, repeat: Infinity }} />
              ))}
            </div>
          : showIndex
            ? <span className="text-sm text-gray-500 group-hover:hidden">{index + 1}</span>
            : null}
        <HiPlay className={`text-white mx-auto hidden group-hover:block ${isCurrentSong && isPlaying ? '!hidden' : ''}`} />
      </div>
      <img src={song.coverImage} alt={song.title} className="w-10 h-10 rounded object-cover flex-shrink-0" loading="lazy" />
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isCurrentSong ? 'gradient-text' : 'text-white'}`}>{song.title}</p>
        <Link to={`/artist/${song.artist?._id}`} onClick={e => e.stopPropagation()}
          className="text-xs text-gray-500 hover:text-purple-400 transition-colors truncate block">
          {song.artist?.name || 'Unknown'}
        </Link>
      </div>
      <span className="text-xs text-gray-600 hidden sm:block">{song.album || 'Single'}</span>
      <div className="flex items-center gap-1">
        <button onClick={handleLike}
          className={`p-1.5 transition-colors opacity-0 group-hover:opacity-100 ${liked ? 'text-pink-500 opacity-100' : 'text-gray-600 hover:text-pink-400'}`}>
          <HiHeart className={liked ? 'fill-current' : ''} />
        </button>
        <span className="text-xs text-gray-600 w-10 text-right">{formatTime(song.duration)}</span>
        {onRemove && (
          <button onClick={(e) => { e.stopPropagation(); onRemove(song._id); }}
            className="p-1.5 text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
            ✕
          </button>
        )}
      </div>
    </motion.div>
  );
}
