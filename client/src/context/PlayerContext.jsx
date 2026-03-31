import { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { songsAPI } from '../services/api';

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [queue, setQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(
    () => parseFloat(localStorage.getItem('musify_volume') || '0.8')
  );
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState('none'); // 'none' | 'all' | 'one'
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(new Audio());

  // Restore progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('musify_progress');
    if (saved) {
      try {
        const { songId, time } = JSON.parse(saved);
        if (currentSong?._id === songId) {
          audioRef.current.currentTime = time;
        }
      } catch {}
    }
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
      if (currentSong) {
        localStorage.setItem('musify_progress', JSON.stringify({
          songId: currentSong._id,
          time: audio.currentTime,
        }));
      }
    };
    const handleDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => handleSongEnd();
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  });

  const handleSongEnd = () => {
    if (repeat === 'one') {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else if (repeat === 'all' || queueIndex < queue.length - 1) {
      playNext();
    } else {
      setIsPlaying(false);
    }
  };

  const playSong = useCallback(async (song, newQueue = null, index = 0) => {
    if (newQueue) {
      setQueue(newQueue);
      setQueueIndex(index);
    }
    if (currentSong?._id === song._id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    setCurrentSong(song);
    setIsLoading(true);
    audioRef.current.src = song.audioUrl;
    audioRef.current.load();

    try {
      await audioRef.current.play();
      setIsPlaying(true);
      songsAPI.recordPlay(song._id).catch(() => {});
    } catch (e) {
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, [currentSong, isPlaying]);

  const togglePlay = () => {
    if (!currentSong) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const playNext = useCallback(() => {
    if (!queue.length) return;
    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = (queueIndex + 1) % queue.length;
    }
    setQueueIndex(nextIndex);
    playSong(queue[nextIndex]);
  }, [queue, queueIndex, shuffle, playSong]);

  const playPrev = useCallback(() => {
    if (!queue.length) return;
    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    const prevIndex = queueIndex === 0 ? queue.length - 1 : queueIndex - 1;
    setQueueIndex(prevIndex);
    playSong(queue[prevIndex]);
  }, [queue, queueIndex, playSong]);

  const seek = (time) => {
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  const changeVolume = (val) => {
    audioRef.current.volume = val;
    setVolume(val);
    localStorage.setItem('musify_volume', val.toString());
  };

  const toggleShuffle = () => setShuffle((s) => !s);
  const toggleRepeat = () => {
    setRepeat((r) => {
      if (r === 'none') return 'all';
      if (r === 'all') return 'one';
      return 'none';
    });
  };

  const addToQueue = (song) => setQueue((q) => [...q, song]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
      if (e.code === 'ArrowRight' && e.shiftKey) playNext();
      if (e.code === 'ArrowLeft' && e.shiftKey) playPrev();
      if (e.code === 'KeyM') changeVolume(volume > 0 ? 0 : 0.8);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isPlaying, volume, playNext, playPrev]);

  return (
    <PlayerContext.Provider value={{
      currentSong, queue, isPlaying, progress, duration, volume,
      shuffle, repeat, isLoading, audioRef,
      playSong, togglePlay, playNext, playPrev, seek, changeVolume,
      toggleShuffle, toggleRepeat, addToQueue, setQueue, setQueueIndex
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
};

export default PlayerContext;
