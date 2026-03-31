import { usePlayer } from '../../context/PlayerContext';
import { useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiPlay, HiPause, HiFastForward, HiRewind,
  HiSwitchHorizontal, HiRefresh, HiVolumeUp, HiVolumeOff,
  HiHeart
} from 'react-icons/hi';

function WaveformVisualizer({ isPlaying }) {
  const bars = 28;
  return (
    <div className="flex items-center gap-[2px] h-8">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          animate={isPlaying ? {
            scaleY: [0.2, 1, 0.3, 0.8, 0.2],
            transition: {
              duration: 1 + (i % 5) * 0.15,
              repeat: Infinity,
              delay: (i * 0.08) % 0.8,
              ease: 'easeInOut',
            }
          } : { scaleY: 0.2 }}
          style={{ originY: 1, background: 'linear-gradient(to top, #a855f7, #ec4899)' }}
        />
      ))}
    </div>
  );
}

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function Player() {
  const {
    currentSong, isPlaying, progress, duration, volume,
    shuffle, repeat, isLoading,
    togglePlay, playNext, playPrev, seek, changeVolume,
    toggleShuffle, toggleRepeat,
  } = usePlayer();

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  if (!currentSong) return null;

  return (
    <div className="fixed right-6 top-6 bottom-6 w-[320px] bg-[#121214] rounded-3xl p-6 flex flex-col z-50 shadow-2xl overflow-hidden border border-white/5">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-white">Player</h3>
        <button className="text-gray-500 hover:text-white transition-colors">
          <HiMusicNote />
        </button>
      </div>

      {/* Album Art */}
      <div className="relative aspect-square mb-8 rounded-2xl overflow-hidden shadow-2xl group">
        <img
          src={currentSong.coverImage}
          alt={currentSong.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Song Info */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-black text-white mb-2 truncate">{currentSong.title}</h2>
        <p className="text-gray-500 font-medium truncate">{currentSong.artist?.name || 'Unknown Artist'}</p>
        <p className="text-[10px] text-gray-600 mt-2 uppercase tracking-widest font-bold">Best of 2020</p>
      </div>

      {/* Progress */}
      <div className="mb-10 px-2 text-center relative pt-10">
        <div className="flex items-center justify-between mb-2 text-[10px] font-bold text-gray-500">
           <span>{formatTime(progress)}</span>
           <span>{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={progress}
          onChange={(e) => seek(parseFloat(e.target.value))}
          className="w-full h-1 cursor-pointer"
          style={{
            background: `linear-gradient(to right, #4d7cfe ${progressPercent}%, rgba(255,255,255,0.05) ${progressPercent}%)`
          }}
        />
      </div>

      {/* Controls */}
      <div className="mt-auto bg-primary rounded-3xl p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between px-2 text-white">
           <button onClick={toggleShuffle} className={shuffle ? 'opacity-100' : 'opacity-50'}><HiSwitchHorizontal className="text-lg" /></button>
           <button onClick={playPrev}><HiRewind className="text-2xl" /></button>
           <button
             onClick={togglePlay}
             disabled={isLoading}
             className="w-14 h-14 rounded-2xl bg-white text-primary flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
           >
             {isPlaying ? <HiPause className="text-3xl" /> : <HiPlay className="text-3xl ml-1" />}
           </button>
           <button onClick={playNext}><HiFastForward className="text-2xl" /></button>
           <button onClick={toggleRepeat} className={repeat !== 'none' ? 'opacity-100' : 'opacity-50'}><HiRefresh className="text-lg" /></button>
        </div>
        
        <button className="flex items-center justify-center gap-2 text-[10px] font-bold text-white uppercase tracking-widest hover:opacity-80 transition-opacity">
           <span className="w-1 h-3 bg-white/20 rounded-full" />
           LYRICS
           <span className="w-1 h-3 bg-white/20 rounded-full" />
        </button>
      </div>
    </div>
  );
}
