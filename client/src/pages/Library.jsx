import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playlistsAPI } from '../services/api';
import { PlaylistCard } from '../components/ui/PlaylistCard';
import { SkeletonCard } from '../components/ui/Skeleton';
import { useToast } from '../context/ToastContext';
import { HiPlus, HiCollection, HiX } from 'react-icons/hi';

function CreatePlaylistModal({ onClose, onCreate }) {
  const [name, setName] = useState('My Playlist');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('name', name);
      const { data } = await playlistsAPI.create(fd);
      toast.success('Playlist created! 🎵');
      onCreate(data.playlist);
      onClose();
    } catch { toast.error('Failed to create playlist'); }
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass rounded-2xl p-6 w-full max-w-sm"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-white">Create Playlist</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><HiX /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/60 transition-all"
            autoFocus
            required
          />
          <div className="flex gap-3">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 glass rounded-xl text-gray-400 text-sm font-medium">Cancel</button>
            <button type="submit" disabled={loading}
              className="flex-1 gradient-bg text-white py-2.5 rounded-xl text-sm font-medium disabled:opacity-50">
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function Library() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    playlistsAPI.getAll()
      .then(({ data }) => setPlaylists(data.playlists || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = (playlist) => setPlaylists(prev => [playlist, ...prev]);

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <HiCollection className="text-purple-400 text-2xl" />
          <h1 className="text-2xl font-black text-white">Your Library</h1>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="gradient-bg text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold shadow-lg shadow-purple-500/20"
        >
          <HiPlus /> New Playlist
        </motion.button>
      </div>

      {loading
        ? <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({length:6}).map((_,i) => <SkeletonCard key={i} />)}
          </div>
        : playlists.length === 0
          ? <div className="text-center py-20 glass rounded-2xl">
              <HiCollection className="text-5xl text-gray-700 mx-auto mb-3" />
              <p className="text-lg text-white font-semibold">No playlists yet</p>
              <p className="text-gray-500 text-sm mt-1 mb-4">Create your first playlist</p>
              <button onClick={() => setShowModal(true)}
                className="gradient-bg text-white px-5 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2">
                <HiPlus /> Create Playlist
              </button>
            </div>
          : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {playlists.map(pl => <PlaylistCard key={pl._id} playlist={pl} />)}
            </div>}

      {showModal && <CreatePlaylistModal onClose={() => setShowModal(false)} onCreate={handleCreate} />}
    </div>
  );
}
