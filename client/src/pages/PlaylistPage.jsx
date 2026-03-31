import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { playlistsAPI } from '../services/api';
import { SongRow } from '../components/ui/SongCard';
import { SkeletonRow } from '../components/ui/Skeleton';
import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { HiPlay, HiPencil, HiTrash, HiMusicNote } from 'react-icons/hi';

export default function PlaylistPage() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const { playSong, setQueue } = usePlayer();
  const { user } = useAuth();
  const { toast } = useToast();
  const isOwner = playlist?.owner?._id === user?._id || playlist?.owner === user?._id;

  useEffect(() => {
    playlistsAPI.getById(id)
      .then(({ data }) => { setPlaylist(data.playlist); setEditName(data.playlist.name); })
      .catch(() => toast.error('Failed to load playlist'))
      .finally(() => setLoading(false));
  }, [id]);

  const handlePlayAll = () => {
    if (!playlist?.songs?.length) return;
    const songs = playlist.songs.filter(s => s?.audioUrl);
    if (songs.length) { playSong(songs[0], songs, 0); }
  };

  const handleRemoveSong = async (songId) => {
    try {
      await playlistsAPI.removeSong(id, songId);
      setPlaylist(prev => ({ ...prev, songs: prev.songs.filter(s => s._id !== songId) }));
      toast.success('Song removed');
    } catch { toast.error('Failed to remove song'); }
  };

  const handleUpdateName = async () => {
    if (!editName.trim()) return;
    try {
      const fd = new FormData();
      fd.append('name', editName);
      await playlistsAPI.update(id, fd);
      setPlaylist(prev => ({ ...prev, name: editName }));
      setEditing(false);
      toast.success('Playlist updated');
    } catch { toast.error('Failed to update playlist'); }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this playlist?')) return;
    try {
      await playlistsAPI.delete(id);
      toast.success('Playlist deleted');
      window.history.back();
    } catch { toast.error('Failed to delete playlist'); }
  };

  if (loading) return (
    <div className="p-6">
      <div className="skeleton h-56 rounded-2xl mb-6" />
      <div className="space-y-3">{Array.from({length:5}).map((_,i) => <SkeletonRow key={i} />)}</div>
    </div>
  );

  if (!playlist) return (
    <div className="p-8 text-center py-20"><p className="text-gray-400">Playlist not found</p></div>
  );

  const totalDuration = playlist.songs?.reduce((acc, s) => acc + (s?.duration || 0), 0) || 0;
  const formatTotal = (s) => s < 3600 ? `${Math.floor(s/60)} min` : `${Math.floor(s/3600)} hr ${Math.floor((s%3600)/60)} min`;

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center md:items-end gap-8 mb-8">
        <div className="relative w-48 h-48 flex-shrink-0">
          {playlist.coverImage
            ? <img src={playlist.coverImage} alt={playlist.name} className="w-full h-full rounded-2xl object-cover shadow-2xl" />
            : <div className="w-full h-full rounded-2xl gradient-bg-subtle flex items-center justify-center border border-purple-500/20">
                <HiMusicNote className="text-5xl text-purple-400/60" />
              </div>}
        </div>
        <div className="flex-1 text-center md:text-left">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Playlist</p>
          {editing
            ? <div className="flex items-center gap-2 mb-2">
                <input className="bg-white/5 border border-purple-500/40 rounded-xl px-4 py-2 text-white text-2xl font-black focus:outline-none"
                  value={editName} onChange={e => setEditName(e.target.value)} autoFocus />
                <button onClick={handleUpdateName} className="px-4 py-2 gradient-bg rounded-xl text-sm text-white font-medium">Save</button>
                <button onClick={() => setEditing(false)} className="px-4 py-2 glass rounded-xl text-sm text-gray-400">Cancel</button>
              </div>
            : <h1 className="text-4xl font-black text-white mb-2">{playlist.name}</h1>}
          {playlist.description && <p className="text-gray-500 text-sm mb-2">{playlist.description}</p>}
          <p className="text-gray-500 text-sm">
            By <span className="text-gray-300">{playlist.owner?.username || 'Unknown'}</span>
            {' · '}{playlist.songs?.length || 0} songs
            {totalDuration > 0 && ` · ${formatTotal(totalDuration)}`}
          </p>
          <div className="flex items-center gap-3 mt-5 justify-center md:justify-start">
            {playlist.songs?.length > 0 && (
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={handlePlayAll}
                className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center shadow-xl shadow-purple-500/30">
                <HiPlay className="text-white text-2xl ml-0.5" />
              </motion.button>
            )}
            {isOwner && (
              <>
                <button onClick={() => setEditing(true)}
                  className="p-2.5 glass rounded-xl text-gray-400 hover:text-white transition-colors">
                  <HiPencil className="text-lg" />
                </button>
                <button onClick={handleDelete}
                  className="p-2.5 glass rounded-xl text-gray-400 hover:text-red-400 transition-colors">
                  <HiTrash className="text-lg" />
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Songs */}
      {playlist.songs?.length === 0
        ? <div className="text-center py-16 glass rounded-2xl">
            <HiMusicNote className="text-4xl text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">No songs in this playlist yet</p>
          </div>
        : <div className="space-y-1">
            {/* Header row */}
            <div className="flex items-center gap-4 px-4 py-2 text-xs text-gray-600 uppercase tracking-widest border-b border-white/5 mb-2">
              <span className="w-8 text-center">#</span>
              <span className="flex-1">Title</span>
              <span className="hidden sm:block w-24">Album</span>
              <span className="w-16 text-right">Duration</span>
            </div>
            {playlist.songs.filter(s => s?._id).map((song, i) => (
              <SongRow
                key={song._id}
                song={song}
                index={i}
                queue={playlist.songs.filter(s => s?.audioUrl)}
                onRemove={isOwner ? handleRemoveSong : undefined}
              />
            ))}
          </div>}
    </div>
  );
}
